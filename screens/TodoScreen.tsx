// screens/TodoScreen.tsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

const TodoScreen = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      try {
        const response = await axios.get(
          process.env.EXPO_PUBLIC_BASE_API_URL + `/todos/${userId}`
        );
        setTodos(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      try {
        await axios.post(process.env.EXPO_PUBLIC_BASE_API_URL + "/todos", {
          userId,
          task,
        });
        setTask("");
        fetchTodos();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleRemoveTodo = async (todoId) => {
    try {
      await axios.delete(
        process.env.EXPO_PUBLIC_BASE_API_URL + `/todos/${todoId}`
      );
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Add Todo</Text>
      <TextInput placeholder="Task" value={task} onChangeText={setTask} />
      <Button title="Add Todo" onPress={handleAddTodo} />

      <Text>Todos</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.task}</Text>
            <Button title="Remove" onPress={() => handleRemoveTodo(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default TodoScreen;
