import React from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { useAdminOrdersList } from "@/src/api/orders";
import OrderListItem from "@/src/components/OrderListItem";
import { useInsertOrderSubscription } from "@/src/api/orders/subscriptions";

const OrdersScreen = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrdersList({ archived: false });

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch</Text>;

  useInsertOrderSubscription();

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
