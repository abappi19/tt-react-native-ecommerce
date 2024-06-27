import { AppRouterPath } from "@/library/constants/app-router-path";
import { CartSchema } from "@/library/schema/cart.schema";
import { useGetSingleProductService } from "@/library/service/product.service";
import { router } from "expo-router";
import { useMemo } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CartProductCard({
  productId,
  quantity,
  cartJson,
}: {
  productId: number;
  quantity: number;
  cartJson: string;
}) {
  const { data, isLoading, query } = useGetSingleProductService(productId);


  const handleProductClick = () => {
    router.push({
      pathname: AppRouterPath.customer.products.detail(productId),
      params: {
        quantity,
        fromCart: "true",
        cartJson
      },
    });
  };

  if (isLoading)
    return (
      <View>
        <ActivityIndicator size={22} />
      </View>
    );

  return (
    <TouchableOpacity onPress={handleProductClick}>
      <View className="xm-1 bg-white rounded-lg flex-row items-center ">
        <Image
          className="h-[80] w-[80] rounded-lg m-2"
          source={
            data?.image
              ? {
                  uri: data?.image,
                }
              : require("@/assets/images/graphics/image_placeholder.png")
          }
        />
        <View className="flex-grow  h-full flex-1">
          <Text className="text-medium text-lg line-clamp-1">
            {data?.title}
          </Text>
          <Text className="text-[#888787]">{data?.category}</Text>
          <Text className="flex-grow align-bottom pb-2 xself-end font-bold pt-2">{`$ ${data?.price}`}</Text>
        </View>
        <Text className="text-xl ps-2 pe-5 font-bold">{quantity}</Text>
      </View>
    </TouchableOpacity>
  );
}
