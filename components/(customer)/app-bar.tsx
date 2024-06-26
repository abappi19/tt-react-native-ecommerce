import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { AppRouterPath } from "@/library/constants/app-router-path";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Taction = {
  icon: ReactNode;
  onPress: () => void;
};
const AppBar = ({ title, actions }: { title: string; actions: Taction[] }) => {
  const handleCartClick = () => router.push(AppRouterPath.customer.cart);
  const handleProfileClick = () => router.push(AppRouterPath.customer.profile);

  return (
    <View className="h-12 px-3 bg-[#ddd] border-b-2 border-b-[#cdcdcd] flex-row items-center justify-between ">
      <Text className="font-bold">{title}</Text>
      <View className="flex-row items-center justify-center gap-5">
        {actions.map((action) => (
          <TouchableOpacity onPress={action.onPress}>
            {action.icon}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default AppBar;
