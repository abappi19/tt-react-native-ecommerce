import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import { useGetCartByUserIdService } from "@/library/service/cart.service";
import { useAuthStore } from "@/library/store/auth.store";
import { useJWTParser } from "@/library/hooks/use-jwt-parser";
import { TokenDataSchema } from "@/library/schema/token-data.schema";
import CartProductCard from "@/components/(customer)/cart/cart-product-card";
import { useIsFocused } from "@react-navigation/native";

const CartScreen = () => {
  const { token } = useAuthStore();
  const tokenData = useJWTParser<TokenDataSchema>({ token });
  const { data, isLoading, invalidate } = useGetCartByUserIdService(
    tokenData.sub
  );

  const focused = useIsFocused();

  const products = useMemo(() => {
    if (!data || !data[0]) return [];

    return data[0].products || [];
  }, [data]);

  useEffect(() => {
    if (focused) invalidate();
  }, [focused]);

  if (isLoading)
    return (
      <View className="pt-10 items-center justify-center">
        <ActivityIndicator size={32} />
      </View>
    );

  return (
    <View className="p-2">
      <FlatList
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={invalidate} />
        }
        data={products}
        ItemSeparatorComponent={() => <View className="p-1" />}
        renderItem={({ item }) => (
          <CartProductCard
            key={item.productId}
            productId={item.productId}
            quantity={item.quantity}
            cartJson={JSON.stringify((data || [])[0])}
          />
        )}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
