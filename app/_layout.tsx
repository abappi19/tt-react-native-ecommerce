import "@/global.css";
import { AppRouterPath } from "@/library/constants/app-router-path";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: AppRouterPath.initial,
};

//hide. otherwise remain visible always. don't know why
SplashScreen.hideAsync();

const MainLayout = () => {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="index"
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
