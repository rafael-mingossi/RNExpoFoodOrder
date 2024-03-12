import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useAdminOrdersList } from "@/src/api/orders";
import OrderListItem from "@/src/components/OrderListItem";

const Archive = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrdersList({ archived: true });

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch</Text>;
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
};

export default Archive;
