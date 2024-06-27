import HookformTextInput from "@/components/input/hookform-input";
import { useJWTParser } from "@/library/hooks/use-jwt-parser";
import { TokenDataSchema } from "@/library/schema/token-data.schema";
import {
  useGetSingleUserService,
  useUpdateUserService,
} from "@/library/service/user.service";
import { useAuthStore } from "@/library/store/auth.store";
import { useErrorStore } from "@/library/store/error.store";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const EditProfileScreen = () => {
  const [isGeoLocationUpdating, setIsGeoLocationUpdating] = useState(false);

  const { addError } = useErrorStore();

  const { token } = useAuthStore();
  const tokenData = useJWTParser<TokenDataSchema>({ token });
  const { data, isLoading, query } = useGetSingleUserService(tokenData.sub);

  const {
    hookForm,
    isLoading: isupdateUesrLoding,
    update,
  } = useUpdateUserService({
    defaultValues: data,
    onComplete(user) {
      Alert.alert("Message!", "User has been udpated successfully");
    },
  });

  const handleUpdateGeoLocation = async () => {
    setIsGeoLocationUpdating(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED) {
      addError(
        "Location permission is not granted. Please grant permission to use current location."
      );
      return;
    }
    // await Location.watchPositionAsync({
    // });
    const l: Location.LocationObject = await Location.getCurrentPositionAsync();
    // await Location.stopLocationUpdatesAsync("taska");

    hookForm.setValue("address.geolocation", {
      lat: String(l.coords.latitude),
      long: String(l.coords.longitude),
    });
    setIsGeoLocationUpdating(false);
  };

  if (isLoading) return <ActivityIndicator size={32} />;

  return (
    <ScrollView>
      <View className="p-3 xpt-[100] gap-5">
        <Text>Email: </Text>
        <HookformTextInput
          placeholder="Email"
          name="email"
          hookForm={hookForm}
        />
        <Text>Username: </Text>
        <HookformTextInput
          placeholder="Username"
          name="username"
          hookForm={hookForm}
        />

        <Text>First Name: </Text>
        <HookformTextInput
          placeholder="First Name"
          name="name.firstname"
          hookForm={hookForm}
        />

        <Text>Last Name: </Text>
        <HookformTextInput
          placeholder="Last Name"
          name="name.lastname"
          hookForm={hookForm}
        />

        <Text>City: </Text>
        <HookformTextInput
          placeholder="City"
          name="address.city"
          hookForm={hookForm}
        />

        <Text>Street: </Text>
        <HookformTextInput
          placeholder="Street"
          name="address.street"
          hookForm={hookForm}
        />

        <Text>Zipcode: </Text>
        <HookformTextInput
          placeholder="Zipcode"
          name="address.zipcode"
          hookForm={hookForm}
        />
        <View className="flex-row items-center justify-between">
          <Text>Geolocation: </Text>
          <TouchableOpacity
            onPress={handleUpdateGeoLocation}
            disabled={isGeoLocationUpdating}
          >
            <Ionicons name="refresh" size={24} />
          </TouchableOpacity>
        </View>

        <Text>Latitude: </Text>
        <HookformTextInput
          placeholder="Latitude"
          name="address.geolocation.lat"
          hookForm={hookForm}
          editable={false}
        />

        <Text>Longitude: </Text>
        <HookformTextInput
          placeholder="Longitude"
          name="address.geolocation.long"
          hookForm={hookForm}
          editable={false}
        />

        <Text>Phone: </Text>
        <HookformTextInput
          placeholder="Phone"
          name="phone"
          hookForm={hookForm}
        />
        <Text>Password: </Text>
        <HookformTextInput
          placeholder="Password"
          name="password"
          hookForm={hookForm}
        />
        <Button
          title={isupdateUesrLoding ? "- - -" : "Update"}
          onPress={isupdateUesrLoding ? undefined : update}
        />
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;
