import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";
import { Button, View } from "react-native";
import { Icon, Input } from "react-native-elements";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        process.env.EXPO_PUBLIC_BASE_API_URL + "register",
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
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
