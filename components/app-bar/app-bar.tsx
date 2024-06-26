import { AppRouterPath } from "@/library/constants/app-router-path";
import { router } from "expo-router";
import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Taction = {
  icon: ReactNode;
  onPress: () => void;
};
const AppBar = ({ title, actions }: { title: string; actions: Taction[] }) => {
  const { top } = useSafeAreaInsets();
  const handleCartClick = () => router.push(AppRouterPath.customer.cart);
  const handleProfileClick = () => router.push(AppRouterPath.customer.profile);

  return (
    <View
      style={{
        paddingTop: top + 18,
      }}
      className="xh-12 pb-5 px-3 bg-[#fff] border-b-2 border-b-[#cdcdcd] flex-row items-center justify-between "
    >
      <Text className="font-medium text-xl ps-5">{title}</Text>
      <View className="flex-row items-center justify-center gap-5">
        {actions.map((action, index) => (
          <TouchableOpacity key={String(index)} onPress={action.onPress}>
            {action.icon}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default AppBar;
