import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { useForm } from "react-hook-form";

export default function App() {
  const onSubmit = data => {
    console.log(data)

  };
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register("firstName");
    register("password");
  }, [register]);

  return (
    <View style={styles.container}>
      <Text>First Name</Text>
      <TextInput
        onChangeText={text => {
          setValue("firstName", text);
        }}
      />

      <Text>Password</Text>
      <TextInput
        onChangeText={text => {
          setValue("password", text);
        }}
      />

      <Button title="submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
