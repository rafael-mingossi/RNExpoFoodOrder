import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Tables } from "@/src/types/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useSegments } from "expo-router";
// import dayjs, { Dayjs } from "dayjs"; /// second option to calculate hours ago
// import utc from "dayjs/plugin/utc"; /// second option to calculate hours ago

// dayjs.extend(utc); ///this was a second option

dayjs.extend(relativeTime);

type OrderListProps = {
  order: Tables<"orders">;
};

// function getHours(date: Dayjs | string): number {
//   return dayjs.utc(date).hour();
// }
const OrderListItem = ({ order }: OrderListProps) => {
  const segments = useSegments();

  return (
    // @ts-ignore
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.header}>Order #{order?.id}</Text>
          {/*<Text style={styles.hourTxt}>*/}
          {/*  {getHours(order.created_at)} hours ago*/}
          {/*</Text>*/}
          <Text style={styles.hourTxt}>
            {dayjs(order?.created_at).fromNow()}
          </Text>
        </View>
        <Text style={styles.statusTxt}>{order?.status}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  statusTxt: {
    fontWeight: "500",
  },
  hourTxt: {
    color: "gray",
  },
});

export default OrderListItem;
