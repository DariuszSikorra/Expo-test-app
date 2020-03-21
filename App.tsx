import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit, setValue, errors } = useForm({
    validateCriteriaMode: "all"
  });

  const onSubmit = data => {
    console.log(errors);
  };

  useEffect(() => {
    register(
      { name: "email" },
      {
        required: "Email address is required",
        pattern: {
          value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "It's not an email"
        }
      }
    );

    register(
      { name: "password" },
      {
        required: "Password is required",
        pattern: {
          // value: /^(?=.*\d)[A-Za-z\d]{5,}$/,
          value: /^(?=.*\d)[A-Za-z\d].*$/,
          message: "Password require at least 1 digit."
        },
        minLength: { value: 6, message: "Password is to short" }
      }
    );
  }, [register]);

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        blurOnSubmit={true}
        autoCapitalize="none"
        placeholder="email"
        textContentType="emailAddress"
        onChangeText={text => {
          setValue("email", text);
        }}
      />
      {errors.email && errors.email.types.minLength && (
        <Text>Email in not valid</Text>
      )}

      {/* password validation (min 6 chars, 1 digit) */}
      <Text>Password</Text>
      <TextInput
        secureTextEntry={true}
        autoCapitalize="none"
        blurOnSubmit={false}
        placeholder="password"
        textContentType="password"
        onChangeText={text => {
          setValue("password", text, true);
        }}
      />
      {/* {errors.password && <Text>{errors.password.message}</Text>} */}
      {errors.password && errors.password.types.minLength && (
        <Text>Password is to short</Text>
      )}
      {errors.password && errors.password.types.pattern && (
        <Text>Password require at least 1 digit.</Text>
      )}

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
