import HookformTextInput from "@/components/input/hookform-input";
import { useOnLoginComplete } from "@/library/hooks/auth/use-on-login-complete";
import { useAuthLoginService } from "@/library/service/auth.service";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const { onComplete } = useOnLoginComplete();
  const { hookForm, isLoading, login } = useAuthLoginService({
    onComplete,
  });
  return (
    <SafeAreaView>
      <View className="p-3">
        <HookformTextInput
          className="py-2"
          placeholder="Username"
          name="username"
          hookForm={hookForm}
        />
        <HookformTextInput
          className="py-2"
          placeholder="Password"
          name="password"
          hookForm={hookForm}
        />
        <Button
          title={isLoading ? "- - -" : "Login"}
          onPress={isLoading ? undefined : login}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
