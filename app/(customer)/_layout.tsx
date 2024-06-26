import React from "react";
import { SplashScreen, Stack } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Text, View } from "react-native";

const CustomerLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="cart"
        options={{
          title: "Cart",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default CustomerLayout;
