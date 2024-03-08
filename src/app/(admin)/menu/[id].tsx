import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import Button from "@/src/components/Button";
import products from "@/assets/data/products";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/src/constants/Colors";
import { useProduct } from "@/src/api/products";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();

  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: product, error, isLoading } = useProduct(id);

  const { onAddItem } = useCart();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch from React Query</Text>;
  }

  const defaultPizzaImage =
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

  const addToCart = () => {
    onAddItem(product, selectedSize);
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />

      {/*<Text>Select Size</Text>*/}
      {/*<View style={styles.sizes}>*/}
      {/*  {sizes.map((size) => (*/}
      {/*    <Pressable*/}
      {/*      onPress={() => {*/}
      {/*        setSelectedSize(size);*/}
      {/*      }}*/}
      {/*      style={[*/}
      {/*        styles.size,*/}
      {/*        {*/}
      {/*          backgroundColor: selectedSize === size ? "gainsboro" : "white",*/}
      {/*        },*/}
      {/*      ]}*/}
      {/*      key={size}*/}
      {/*    >*/}
      {/*      <Text*/}
      {/*        style={[*/}
      {/*          styles.sizeText,*/}
      {/*          {*/}
      {/*            color: selectedSize === size ? "black" : "gray",*/}
      {/*          },*/}
      {/*        ]}*/}
      {/*      >*/}
      {/*        {size}*/}
      {/*      </Text>*/}
      {/*    </Pressable>*/}
      {/*  ))}*/}
      {/*</View>*/}

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      {/*<Button onPress={addToCart} text="Add to cart" />*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    // marginTop: "auto",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});

export default ProductDetailsScreen;
