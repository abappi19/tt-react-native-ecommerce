import { Stack } from "expo-router";
import React from "react";

const CustomerLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          title: "Shop",
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

      <Stack.Screen
        name="edit-profile"
        options={{
          title: "Edit Profile",
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="products/[productId]"
        options={{
          title: "Product Detail",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="products/by-category"
        options={{
          title: "Products",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="products/search"
        options={{
          title: "Search",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default CustomerLayout;
