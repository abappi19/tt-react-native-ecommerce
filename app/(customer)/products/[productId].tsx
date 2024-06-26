import { useGetSingleProductService } from "@/library/service/product.service";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Button, Image, ScrollView, Text, View } from "react-native";

const ProductDetailsScreen = () => {
  const { productId } = useLocalSearchParams();

  const { data, isLoading, query } = useGetSingleProductService(
    Number(productId)
  );

  return (
    <>
      <ScrollView>
        <View className="p-2 pb-10 rounded-lg xflex-row items-center ">
          <Image
            resizeMode="cover"
            className="h-[240] w-full rounded-lg m-2"
            source={{
              uri: data?.image,
            }}
          />
          <View className="flex-grow  h-full flex-1">
            <Text className="font-bold text-lg ">{data?.title}</Text>
            <Text className="text-[#888787]">{data?.category}</Text>
            <Text className="py-2 text-[#525252]">{data?.description}</Text>
          </View>
        </View>
      </ScrollView>
      <View className="p-2 bg-white absolute bottom-0 left-0 right-0 flex-row items-center justify-between">
        <Text className="flex-grow align-bottom pb-2 xself-end font-bold pt-2">{`$ ${data?.price}`}</Text>

        <View className="flex-row gap-2">
          <Button color="#51cc18" title="Add to cart" />
          <Button color="#E99F00" title="Buy" />
        </View>
      </View>
    </>
  );
};

export default ProductDetailsScreen;
