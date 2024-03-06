import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import OrderListItem from "@/src/components/OrderListItem";

const OrderDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const order = orders.find((o) => o.id.toString() === id)!;

  return (
    <View style={{ padding: 10, gap: 20, flex: 1 }}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});
export default OrderDetailsScreen;