import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import OrderListItem from "@/src/components/OrderListItem";
import { useMyOrdersList } from "@/src/api/orders";
import { useUpdateOrderSubscriptionList } from "@/src/api/orders/subscriptions";
import { useAuth } from "@/src/providers/AuthProvider";

const OrdersScreen = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  const { data: orders, isLoading, error } = useMyOrdersList();

  useUpdateOrderSubscriptionList(id);

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch</Text>;

  if (!orders?.length) {
    return (
      <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
        <Text>You have no orders</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </>
  );
};

export default OrdersScreen;
