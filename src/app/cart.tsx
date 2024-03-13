import React from "react";
import { FlatList, Platform, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@/src/providers/CartProvider";
import CartListItem from "@/src/components/CartListItem";
import Button from "@/src/components/Button";

const CartScreen = () => {
  const { items, total, checkout } = useCart();
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>
        Total: ${total}
      </Text>
      <Button text={"Checkout"} onPress={checkout} disabled={!items.length} />
    </View>
  );
};

export default CartScreen;
