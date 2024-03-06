import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "@/src/components/Button";
import Colors from "../../../constants/Colors";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { Stack, useLocalSearchParams } from "expo-router";
const Create = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id } = useLocalSearchParams();
  const isUpdating = !!id;
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const resetFields = () => {
    setPrice("");
    setName("");
  };
  const onCreate = () => {
    if (!validateInput()) {
      return;
    }

    resetFields();
  };

  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price is not a number");
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (isUpdating) {
      // update
      // onUpdate();
    } else {
      onCreate();
    }
  };

  const onDelete = () => {};
  const confirmDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this product",
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: onDelete,
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        style={styles.input}
        placeholder={"Name"}
        onChangeText={setName}
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        value={price}
        style={styles.input}
        placeholder={"99.99"}
        keyboardType={"numeric"}
        onChangeText={setPrice}
      />
      <Text style={{ color: "red" }}>{errors}</Text>
      <Button onPress={onSubmit} text={isUpdating ? "Update" : "Create"} />
      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.textButton}>
          Delete
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },

  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
});
export default Create;
