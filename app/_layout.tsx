import "@/global.css";
import { AppRouterPath } from "@/library/constants/app-router-path";
import { useErrorStore } from "@/library/store/error.store";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { SplashScreen, Stack } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

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
        name="(customer)"
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

const ErrorView = () => {
  const { top } = useSafeAreaInsets();

  const { errors, removeError } = useErrorStore();

  return (
    <View className="absolute top-0 left-0 bg-red-500 w-[100%]" style={{ top }}>
      {errors.map((error) => (
        <View
          key={error.id}
          className="p-2 flex-row justify-between items-center"
        >
          <Text className="text-yellow-200 font-medium">{error?.text}</Text>
          <TouchableOpacity
            onPress={() => {
              removeError(error.id);
            }}
          >
            <Ionicons color="#ddd" size={18} name="close-circle" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const Root = () => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24,
      },
    },
  });

  const asyncStoragePersistor = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  return (
    <PersistQueryClientProvider
      client={client}
      persistOptions={{
        persister: asyncStoragePersistor,
      }}
    >
      <SafeAreaProvider>
        <GestureHandlerRootView className="flex-1">
          <MainLayout />
          <ErrorView />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PersistQueryClientProvider>
  );
};

export default Root;
