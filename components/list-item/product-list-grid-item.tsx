import { AppRouterPath } from "@/library/constants/app-router-path";
import { ProductSchema } from "@/library/schema/product.schema";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

function ProductListGridItem({ item }: { item: ProductSchema }) {
  return (
    <TouchableOpacity
      className="flex-1 w-full p-1"
      onPress={() =>
        router.push(AppRouterPath.customer.products.detail(item.id))
      }
    >
      <View className="xm-1 bg-white rounded-lg xflex-row items-center ">
        <Image
          className="h-[80] w-full rounded-lg xm-2"
          resizeMethod="resize"
          resizeMode="cover"
          source={
            item.image
              ? {
                  uri: item?.image,
                }
              : require("@/assets/images/graphics/image_placeholder.png")
          }
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
  );
}

export default ProductListGridItem;
