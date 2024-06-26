import AppBar from "@/components/app-bar/app-bar";
import { AppRouterPath } from "@/library/constants/app-router-path";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
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
          <Text>hi</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
