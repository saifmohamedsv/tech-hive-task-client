import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";
import { Button, View } from "react-native";
import { Icon, Input } from "react-native-elements";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        process.env.EXPO_PUBLIC_BASE_API_URL + "login",
        {
          email,
          password,
        }
      );
      await AsyncStorage.setItem("userId", response.data.id);
      navigation.navigate("Todo");
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
    </View>
  );
};

export default LoginScreen;
