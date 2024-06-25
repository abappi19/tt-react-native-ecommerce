import React from "react";
import { LogBox, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SplashScreen, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/global.css";

SplashScreen.preventAutoHideAsync();
LogBox.ignoreAllLogs();

const MainLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

const Root = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <SafeAreaProvider>
        <GestureHandlerRootView className="flex-1">
          <MainLayout />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default Root;
