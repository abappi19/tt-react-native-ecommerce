import HookformTextInput from "@/components/input/hookform-input";
import { AppRouterPath } from "@/library/constants/app-router-path";
import { useAuthRegisterService } from "@/library/service/auth.service";
import { useErrorStore } from "@/library/store/error.store";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen = () => {
  const { addError } = useErrorStore();
  const [currentLocation, setCurrentLocation] =
    useState<Location.LocationObject | null>(null);
  const { hookForm, isLoading, register } = useAuthRegisterService({
    onComplete() {
      router.replace(AppRouterPath.auth.login);
    },
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== Location.PermissionStatus.GRANTED) {
        addError(
          "Location permission is not granted. Please grant permission to use current location."
        );
        return;
      }
      const l: Location.LocationObject =
        await Location.getCurrentPositionAsync();
      setCurrentLocation(l);
    })();
  }, []);

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

  console.log("current location is: ", currentLocation);

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
          <Text>Geolocation: </Text>
          <Text>{`Latitude: ${currentLocation?.coords.latitude}`}</Text>
          <Text>{`Longitude: ${currentLocation?.coords.longitude}`}</Text>
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
