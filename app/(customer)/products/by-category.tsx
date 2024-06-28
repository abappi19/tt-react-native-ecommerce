import CartProductCard from "@/components/(customer)/cart/cart-product-card";
import ProductListItem from "@/components/list-item/product-list-item";
import LoadingView from "@/components/loading-view";
import { AppRouterPath } from "@/library/constants/app-router-path";
import {
  useGetProductsByCategoryService,
  useGetSingleProductService,
} from "@/library/service/product.service";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useMemo } from "react";
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
  const navigation = useNavigation();

  const { data, isLoading } = useGetProductsByCategoryService(String(category));

  const products = useMemo(() => {
    return data || [];
  }, [data]);

  useEffect(() => {
    navigation.setOptions({
      title: (category as string).replace(/^\w|\s\w/g, (match) =>
        match.toUpperCase()
      ),
    });
  }, [category]);

  if (isLoading) return <LoadingView />;

  return (
    <>
      <View className="p-2">
        {/* <Text className="font-bold text-lg py-2">{category}</Text> */}

        <FlatList
          data={products}
          ItemSeparatorComponent={() => <View className="p-1" />}
          renderItem={ProductListItem}
        />
      </View>
    </>
  );
};

export default ProductDetailsScreen;
