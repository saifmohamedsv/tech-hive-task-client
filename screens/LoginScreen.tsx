import React, { useState } from "react";
import { Button, View } from "react-native";
import { Icon, Input } from "react-native-elements";
import { TechHiveAPI } from "../api/axios";
import { useAuth } from "../hooks/useAuth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await TechHiveAPI.post("/login", {
        email,
        password,
      });
      setUserId(response.data.id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Input
        autoCapitalize="none"
        placeholder="Email"
        leftIcon={<Icon name="email" type="material" size={24} color="black" />}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        leftIcon={<Icon name="lock" type="material" size={24} color="black" />}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Don't have an account? Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default LoginScreen;
