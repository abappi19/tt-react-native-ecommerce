import HookformTextInput from "@/components/input/hookform-input";
import { AppRouterPath } from "@/library/constants/app-router-path";
import { useOnLoginComplete } from "@/library/hooks/auth/use-on-login-complete";
import {
  useAuthLoginService,
  useAuthRegisterService,
} from "@/library/service/auth.service";
import { router } from "expo-router";
import React from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen = () => {
  const { hookForm, isLoading, register } = useAuthRegisterService({
    onComplete() {
      router.replace(AppRouterPath.auth.login);
    },
  });

  const handleLoginClick = () => {
    router.replace(AppRouterPath.auth.login);
  };

  /**
   * {
                    email:'John@gmail.com',
                    username:'johnd',
                    password:'m38rmF$',
                    name:{
                        firstname:'John',
                        lastname:'Doe'
                    },
                    address:{
                        city:'kilcoole',
                        street:'7835 new road',
                        number:3,
                        zipcode:'12926-3874',
                        geolocation:{
                            lat:'-37.3159',
                            long:'81.1496'
                        }
                    },
                    phone:'1-570-236-7033'
                }
   */

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-3 xpt-[100] gap-5">
          <HookformTextInput
            placeholder="Email"
            name="email"
            hookForm={hookForm}
          />
          <HookformTextInput
            placeholder="Username"
            name="username"
            hookForm={hookForm}
          />

          <HookformTextInput
            placeholder="First Name"
            name="name.firstname"
            hookForm={hookForm}
          />

          <HookformTextInput
            placeholder="Last Name"
            name="name.lastname"
            hookForm={hookForm}
          />

          <HookformTextInput
            placeholder="City"
            name="address.city"
            hookForm={hookForm}
          />

          <HookformTextInput
            placeholder="Street"
            name="address.street"
            hookForm={hookForm}
          />

          <HookformTextInput
            placeholder="Zipcode"
            name="address.zipcode"
            hookForm={hookForm}
          />
          <HookformTextInput
            placeholder="Phone"
            name="phone"
            hookForm={hookForm}
          />
          <HookformTextInput
            placeholder="Password"
            name="password"
            hookForm={hookForm}
          />
          <Button
            title={isLoading ? "- - -" : "Register"}
            onPress={isLoading ? undefined : register}
          />

          <Text className="self-center pt-10 pb-2">
            Already have an Account?
          </Text>

          <Button title={"Login"} onPress={handleLoginClick} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
