import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const LoadingView = () => {
  return (
    <View className="h-full w-full items-center justify-center">
      <ActivityIndicator size={44} />
    </View>
  );
};

export default LoadingView;

const styles = StyleSheet.create({});
