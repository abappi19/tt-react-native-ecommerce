import ProductListItem from "@/components/list-item/product-list-item";
import { CartSchema } from "@/library/schema/cart.schema";
import {
  useGetProductsByCategoryService,
  useGetSingleProductService,
} from "@/library/service/product.service";
import { useErrorStore } from "@/library/store/error.store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProductDetailsScreen = () => {
  const { addError } = useErrorStore();
  const {
    productId,
    quantity: cartQuantity,
    fromCart,
    cartJson,
  } = useLocalSearchParams();

  const [quantity, setQuantity] = useState(Number(cartQuantity) || 1);

  const { data, isLoading, query } = useGetSingleProductService(
    Number(productId)
  );

  const {
    data: _productsByCategory,
    isLoading: isProductByCatLoading,
    invalidate: invalidProductsByCat,
  } = useGetProductsByCategoryService(String(data?.category));

  const cartData: CartSchema = useMemo(() => {
    if (typeof cartJson != "string") return null;
    return JSON.parse(cartJson);
  }, [cartJson]);

  const productsByCategory = useMemo(
    () => _productsByCategory?.filter((p) => p.id !== Number(productId)),
    [productId, _productsByCategory]
  );

  const nav = useNavigation();

  useEffect(() => {
    if (!data?.category) return;

    invalidProductsByCat();
  }, [data]);

  useEffect(() => {
    if (!data?.title) return;

    nav.setOptions({
      title: data.title,
    });
  }, [data]);

  useFocusEffect(() => {
    query.refetch();
    addError("working");
  });

  const handleAddQuantity = () => setQuantity((o) => ++o);
  const handleSubQuantity = () => setQuantity((o) => Math.max(1, --o));

  const handleUpdateCart = () => {
    if (!cartData || fromCart != "true") {
      return;
    }
  };

  const handleAddToCart = () => {};

  return (
    <>
      <FlatList
        ListFooterComponent={() => <View className="pt-[100]" />}
        ListHeaderComponent={() => (
          <View className="p-2  rounded-lg xflex-row items-center ">
            <Image
              resizeMode="cover"
              className="h-[240] w-full rounded-lg m-2"
              source={
                data?.image
                  ? {
                      uri: data?.image,
                    }
                  : require("@/assets/images/graphics/image_placeholder.png")
              }
            />
            <View className="flex-grow  h-full flex-1">
              <Text className="font-bold text-lg ">{data?.title}</Text>
              <Text className="text-[#888787]">{data?.category}</Text>
              <Text className="flex-grow align-bottom pb-2 text-[#b4451a] xself-end font-bold pt-2">{`$ ${data?.price}`}</Text>
              <Text className="py-2 text-[#525252]">{data?.description}</Text>
            </View>

            <View className="self-stretch">
              <Text className="self-start w-full font-bold text-lg pt-3">
                Similar Products:{" "}
              </Text>
            </View>
          </View>
        )}
        data={productsByCategory}
        ItemSeparatorComponent={() => <View className="p-1" />}
        renderItem={ProductListItem}
      />
      <View className="p-2 bg-white absolute bottom-0 left-0 right-0 flex-row items-center justify-between">
        <View className="flex-row flex-grow-0 flex-shrink items-center justify-center gap-2">
          <TouchableOpacity onPress={handleSubQuantity}>
            <MaterialCommunityIcons name="minus-box" size={24} />
          </TouchableOpacity>
          <Text className="flex-grow-0 align-bottom pb-2 xself-end font-bold pt-2">{`${quantity}`}</Text>

          <TouchableOpacity onPress={handleAddQuantity}>
            <MaterialCommunityIcons name="plus-box" size={24} />
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-3">
          <Text className=" align-bottom pb-2 xself-end font-bold text-lg pt-2">{`$ ${
            Number(data?.price) * quantity
          }`}</Text>
          <Button
            onPress={fromCart === "true" ? handleUpdateCart : handleAddToCart}
            color="#36A005"
            disabled={Number(cartQuantity) === quantity}
            title={fromCart === "true" ? "Update cart" : "Add to cart"}
          />
          {/* <Button color="#E99F00" title="Buy" /> */}
        </View>
      </View>
    </>
  );
};

export default ProductDetailsScreen;
