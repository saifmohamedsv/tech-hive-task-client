import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, Input, ListItem } from "react-native-elements";

const TodoScreen = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      try {
        const response = await axios.get(
          process.env.EXPO_PUBLIC_BASE_API_URL + `todos/${userId}`
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
        await axios.post(process.env.EXPO_PUBLIC_BASE_API_URL + "todos", {
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
        process.env.EXPO_PUBLIC_BASE_API_URL + `todos/${todoId}`
      );
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Todo List</Text>
        <Input
          placeholder="Add Task"
          value={task}
          onChangeText={setTask}
          rightIcon={
            <Button
              title="Add"
              onPress={handleAddTodo}
              buttonStyle={{ backgroundColor: "green" }}
              titleStyle={{ color: "white" }}
            />
          }
        />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.task}</ListItem.Title>
            </ListItem.Content>
            <Button
              title="Remove"
              onPress={() => handleRemoveTodo(item.id)}
              buttonStyle={{ backgroundColor: "red" }}
              titleStyle={{ color: "white" }}
            />
          </ListItem>
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    marginBottom: 10,
  },
});
export default TodoScreen;
