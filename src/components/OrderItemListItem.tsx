import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import RemoteImage from "@/src/components/RemoteImage";
// import { Tables } from "@/src/types/types";

// type OrderItemListItemProps = {
//   item: Tables<"order_items"> & {
//     products: Tables<"products">;
//   };
// };
type OrderItemListItemProps = {
  item: {
    created_at: string;
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    size: string;
    products: {
      created_at: string;
      id: number;
      image: string | null;
      name: string;
      price: number;
    } | null;
  };
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  return (
    <View style={styles.container}>
      <RemoteImage
        path={item?.products?.image}
        fallback={defaultPizzaImage}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item?.products?.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>${item?.products?.price.toFixed(2)}</Text>
          <Text>Size: {item?.size}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <Text style={styles.quantity}>{item?.quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: "center",
    marginRight: 10,
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  quantitySelector: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  quantity: {
    fontWeight: "500",
    fontSize: 18,
    marginRight: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});

export default OrderItemListItem;
