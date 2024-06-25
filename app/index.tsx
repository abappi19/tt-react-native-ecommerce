import { AppRouterPath } from "@/library/constants/app-router-path";
import { useServiceAuthValidate } from "@/library/service/auth.service";
import { useStoreAuth } from "@/library/store/auth.store";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const InitialScreen = () => {
  const { token } = useStoreAuth();
  const [isMounted, setIsMounted] = useState(false);

  const handleInitialRoute = () => {
    if (!token) {
      router.dismissAll();
      router.replace(AppRouterPath.auth.login);
    }
  };

  useEffect(() => {
    if (!isMounted) return;
    handleInitialRoute();
  }, [token, isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <SafeAreaView>
      <View className="h-[100%] items-center justify-center">
        <ActivityIndicator size={32} />
      </View>
    </SafeAreaView>
  );
};

export default InitialScreen;
