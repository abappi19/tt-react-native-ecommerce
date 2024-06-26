import AppBar from "@/components/(customer)/app-bar";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const appBarActions = [
    {
      icon: <Ionicons name="cart" size={18} />,
      onPress() {},
    },
    {
      icon: <Ionicons name="person" size={18} />,
      onPress() {},
    },
  ];

  return (
    <SafeAreaView>
      <AppBar title="Home" actions={appBarActions} />
      <ScrollView>
        <View className="p-2">
          <Text>hi</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
