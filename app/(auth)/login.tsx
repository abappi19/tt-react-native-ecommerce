import HookformTextInput from "@/components/input/hookform-input";
import { AppRouterPath } from "@/library/constants/app-router-path";
import { useOnLoginComplete } from "@/library/hooks/auth/use-on-login-complete";
import { useAuthLoginService } from "@/library/service/auth.service";
import { router } from "expo-router";
import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const { onComplete } = useOnLoginComplete();
  const { hookForm, isLoading, login } = useAuthLoginService({
    onComplete,
  });

  const handleRegisterClick = () => {
    router.replace(AppRouterPath.auth.register);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-3 pt-[100] gap-5">
          <HookformTextInput
            placeholder="Username"
            name="username"
            hookForm={hookForm}
          />
          <HookformTextInput
            placeholder="Password"
            name="password"
            hookForm={hookForm}
          />
          <Button
            title={isLoading ? "- - -" : "Login"}
            onPress={isLoading ? undefined : login}
          />

          <Text className="self-center pt-10 pb-2">Don't have an Account?</Text>

          <Button title={"Register"} onPress={handleRegisterClick} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
