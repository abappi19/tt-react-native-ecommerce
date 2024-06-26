import AppBar from "@/components/app-bar/app-bar";
import { AppRouterPath } from "@/library/constants/app-router-path";
import { useGetAllCategoriesService } from "@/library/service/product.service";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetAllCategoriesService();

  const appBarActions = [
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
      <AppBar title="Home" actions={appBarActions} />
      <ScrollView>
        <View className="p-2">
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
                  {category}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
