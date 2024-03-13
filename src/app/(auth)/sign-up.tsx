import React, { useRef, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "@/src/constants/Colors";
import Button from "@/src/components/Button";
import { Link, Stack } from "expo-router";
import { supabase } from "@/src/lib/supabase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef<TextInput | null>(null);
  async function signUpWithEmail() {
    setLoading(true);
    const { error, data } = await supabase.auth.signUp({ email, password });

    if (error) Alert.alert(error.message);

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Sign up" }} />
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        style={styles.input}
        placeholder={"Email"}
        keyboardType={"email-address"}
        onChangeText={setEmail}
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        style={styles.input}
        placeholder={"****"}
        onChangeText={setPassword}
        secureTextEntry
        onSubmitEditing={() => signUpWithEmail()}
      />

      <Button
        onPress={signUpWithEmail}
        disabled={loading}
        text={loading ? "Creating..." : "Create account"}
      />
      <Link href={"/sign-in"} asChild>
        <Text style={styles.textButton}>Back to Sign In</Text>
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
export default SignUp;
