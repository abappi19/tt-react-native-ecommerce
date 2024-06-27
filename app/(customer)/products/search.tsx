import ProductListItem from "@/components/list-item/product-list-item";
import { useGetAllProductsService } from "@/library/service/product.service";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchProductScreen = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetAllProductsService();

  const products = useMemo(() => {
    if (!search) return [];
    const msearch = search.trim().toLowerCase();
    return (data || []).filter((p) =>
      p.title.trim().toLowerCase().includes(msearch)
    );
  }, [data, search]);

  return (
    <SafeAreaView>
      <View>
        <View className="py-2 px-3 gap-3 flex-row items-center justify-start">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} />
          </TouchableOpacity>
          <TextInput
            value={search}
            onChangeText={setSearch}
            focusable
            autoFocus
            className="px-2 py-1 flex-grow xflex-shrink-0 bg-[#ddd] rounded-md"
            placeholder="Search..."
          />
        </View>
        <FlatList
          data={products}
          ItemSeparatorComponent={() => <View className="p-1" />}
          renderItem={ProductListItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchProductScreen;

const styles = StyleSheet.create({});
