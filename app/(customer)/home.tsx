import AppBar from "@/components/app-bar/app-bar";
import ProductListGridItem from "@/components/list-item/product-list-grid-item";
import { AppRouterPath } from "@/library/constants/app-router-path";
import {
  useGetAllCategoriesService,
  useGetLimitedProductsService,
} from "@/library/service/product.service";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const HomeScreen = () => {
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategoriesService();
  const { data: productsForyou, isLoading: isForYouLoading } =
    useGetLimitedProductsService(9);

  const appBarActions = [
    {
      icon: <Ionicons name="search" size={18} />,
      onPress() {
        router.push(AppRouterPath.customer.products.search);
      },
    },
    {
      icon: <Ionicons name="cart" size={18} />,
      onPress() {
        router.push(AppRouterPath.customer.cart);
      },
    },
    {
      icon: <Ionicons name="person" size={18} />,
      onPress() {
        router.push(AppRouterPath.customer.profile);
      },
    },
  ];

  return (
    <>
      <AppBar title="Shop" actions={appBarActions} />
      <ScrollView>
        <View className="p-2">
          <Image
            className="w-full h-[180px]"
            resizeMethod="resize"
            resizeMode="contain"
            source={require("@/assets/images/graphics/payday-sell.png")}
          />

          <Text className="font-bold text-md py-2">Categories</Text>
          <FlatList
            horizontal
            data={categories}
            keyExtractor={(category) => category}
            ItemSeparatorComponent={() => <View className="p-2" />}
            renderItem={({ item: category }) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: AppRouterPath.customer.products.byCategory,
                    params: {
                      category,
                    },
                  })
                }
              >
                <Text className="bg-white rounded-full p-2 mb-3">
                  {category.replace(/^\w|\s\w/g, (match) =>
                    match.toUpperCase()
                  )}
                </Text>
              </TouchableOpacity>
            )}
          />

          <Text className="font-bold text-md py-2">Just For You</Text>
          <FlatList
            numColumns={3}
            data={productsForyou}
            keyExtractor={(product) => String(product.id)}
            ItemSeparatorComponent={() => <View className="p-1" />}
            renderItem={ProductListGridItem}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
