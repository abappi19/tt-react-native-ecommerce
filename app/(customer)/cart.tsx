import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { useGetCartByUserIdService } from "@/library/service/cart.service";
import { useAuthStore } from "@/library/store/auth.store";
import { useJWTParser } from "@/library/hooks/use-jwt-parser";
import { TokenDataSchema } from "@/library/schema/token-data.schema";
import CartProductCard from "@/components/(customer)/cart/cart-product-card";

const CartScreen = () => {
  const { token } = useAuthStore();
  const tokenData = useJWTParser<TokenDataSchema>({ token });
  const { data, isLoading, query } = useGetCartByUserIdService(tokenData.sub);

  const products = useMemo(() => {
    if (!data || !data[0]) return [];
    return data[0].products || [];
  }, [data]);

  return (
    <View className="p-2">
      <FlatList
        data={products}
        ItemSeparatorComponent={() => <View className="p-1" />}
        renderItem={({ item }) => (
          <CartProductCard key={item.productId} {...item} />
        )}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
