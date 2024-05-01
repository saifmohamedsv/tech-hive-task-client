import React, { useState } from "react";
import { Button, View } from "react-native";
import { Icon, Input } from "react-native-elements";
import { TechHiveAPI } from "../api/axios";
import { useAuth } from "../hooks/useAuth";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId } = useAuth();

  const handleRegister = async () => {
    try {
      const response = await TechHiveAPI.post("/register", {
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
      <Button
        title="Already have an account? Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default RegisterScreen;
