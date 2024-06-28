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
import { ProductSchema } from "@/library/schema/product.schema";
import LoadingView from "@/components/loading-view";

const CartScreen = () => {
  const { token } = useAuthStore();
  const tokenData = useJWTParser<TokenDataSchema>({ token });
  const { data, isLoading, invalidate } = useGetCartByUserIdService(
    tokenData.sub
  );

  const focused = useIsFocused();

  const products = useMemo(() => {
    if (!data || !data) return [];
    const pds: { productId: number; quantity: number; cartJson: string }[] = [];
    data.forEach((cart) => {
      pds.push(
        ...cart.products.map((p) => ({ ...p, cartJson: JSON.stringify(cart) }))
      );
    });
    return pds;
  }, [data]);

  useEffect(() => {
    if (focused) invalidate();
  }, [focused]);

  if (isLoading)
    return (
      <LoadingView />
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
            cartJson={item.cartJson}
          />
        )}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
