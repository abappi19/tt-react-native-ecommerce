import CartProductCard from "@/components/(customer)/cart/cart-product-card";
import { AppRouterPath } from "@/library/constants/app-router-path";
import {
  useGetProductsByCategoryService,
  useGetSingleProductService,
} from "@/library/service/product.service";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProductDetailsScreen = () => {
  const { category } = useLocalSearchParams();

  const { data, isLoading, query } = useGetProductsByCategoryService(
    String(category)
  );

  const products = useMemo(() => {
    return data || [];
  }, [data]);

  return (
    <>
      <ScrollView>
        <View className="p-2">
          <Text className="font-bold text-lg py-2">{category}</Text>

          <FlatList
            data={products}
            ItemSeparatorComponent={() => <View className="p-1" />}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  router.push(AppRouterPath.customer.products.detail(item.id))
                }
              >
                <View className="xm-1 bg-white rounded-lg flex-row items-center ">
                  <Image
                    className="h-[80] w-[80] rounded-lg m-2"
                    source={{
                      uri: item?.image,
                    }}
                  />
                  <View className="flex-grow  h-full flex-1">
                    <Text className="text-medium text-lg line-clamp-1">
                      {item?.title}
                    </Text>
                    <Text className="text-[#888787]">{item?.category}</Text>
                    <Text className="flex-grow align-bottom pb-2 xself-end font-bold pt-2">{`$ ${item?.price}`}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default ProductDetailsScreen;
