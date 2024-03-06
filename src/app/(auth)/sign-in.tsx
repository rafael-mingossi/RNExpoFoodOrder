import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "@/src/constants/Colors";
import Button from "@/src/components/Button";
import { Link, Stack } from "expo-router";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {};

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign in" }} />
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={username}
        style={styles.input}
        placeholder={"Email"}
        keyboardType={"email-address"}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        style={styles.input}
        placeholder={"Password"}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button onPress={onLogin} text={"Sign In"} />
      <Link href={"/sign-up"} asChild>
        <Text style={styles.textButton}>Create an account</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});
export default SignIn;
