import { useOnLogoutComplete } from "@/library/hooks/auth/use-on-logout-complete";
import { useJWTParser } from "@/library/hooks/use-jwt-parser";
import { TokenDataSchema } from "@/library/schema/token-data.schema";
import { useAuthLogoutService } from "@/library/service/auth.service";
import { useGetSingleUserService } from "@/library/service/user.service";
import { useAuthStore } from "@/library/store/auth.store";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Alert, Button, Text, View } from "react-native";

const ProfileScreen = () => {
  const { token } = useAuthStore();
  const tokenData = useJWTParser<TokenDataSchema>({ token });
  const { data, isLoading, query } = useGetSingleUserService(tokenData.sub);

  const { onComplete } = useOnLogoutComplete();

  const { logout } = useAuthLogoutService({
    onLogout: onComplete,
  });

  const handleLogoutPress = () => {
    logout();
  };

  if (isLoading)
    return (
      <View>
        <ActivityIndicator size={24} />
      </View>
    );

  return (
    <View className="items-center gap-2">
      <Ionicons name="person" size={64} />
      <Text className="font-bold text-xl text-[#000]">{`${data?.name.firstname} ${data?.name.lastname}`}</Text>
      <Text className="text-[#757575]">{data?.username}</Text>
      <View className="flex-row gap-3">
        <Text className="font-medium">Email: </Text>
        <Text>{data?.email}</Text>
      </View>


      <Text className="font-bold text-lg p-3">Address:</Text>

      <View className="flex-row gap-3">
        <Text className="font-medium">City: </Text>
        <Text>{data?.address.city}</Text>
      </View>

      <View className="flex-row gap-3">
        <Text className="font-medium">Street: </Text>
        <Text> {data?.address.street}</Text>
      </View>

      <View className="flex-row gap-3">
        <Text className="font-medium">Zipcode: </Text>
        <Text> {data?.address.zipcode}</Text>
      </View>

      <View className="flex-row gap-3">
        <Text className="font-medium">Phone: </Text>
        <Text> {data?.phone}</Text>
      </View>

      <View className="p-8" />
      <Button onPress={handleLogoutPress} title="Logout" />
    </View>
  );
};

export default ProfileScreen;
