import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from "react-native";

import * as RxDB from "rxdb";
import userSchema from "./Schema";

RxDB.plugin(require('pouchdb-adapter-asyncstorage').default);
const dbName = "userDatabase";

type state = {
  user: string;
  password: string;
};

export default function App() {
  const [state, setState] = useState<state>({
    user: "",
    password: ""
  });
  const [userName, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  let db;

  const createDatabase = async() => {
    console.log("Database Creating....")
    const db = await RxDB.create({
      name: "user-database",
      adapter: "node-asyncstorage"
    })
    console.log("Database Created")
    console.dir(db)
    // const userCollection = db.collection({
    //   name: dbName,
    //   //@ts-ignore
    //   userSchema
    // });
    // userCollection.sync({
    //   options: {
    //     live: true,
    //     retry: true
    //   }
    // });
    return db;
  };

  useEffect(
    () => async() => {
      const db = await createDatabase();
    },
    []
  );

  const handleSubscribe = async() => {
    setState({ user: userName, password: userPassword });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>User name:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={text => setUserName(text)}
          value={userName}
          style={styles.input}
          placeholder="name"
        />
      </View>

      <Text style={styles.text}>User password:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={text => setUserPassword(text)}
          value={userPassword}
          style={styles.input}
          placeholder="password"
        />
      </View>

      <Button title="Submit" onPress={handleSubscribe} />
      <Button title="Show state" onPress={() => console.log(db)} />
      {state && (
        <Text>{"Name:" + state.user + " Password: " + state.password}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  inputContainer: {
    borderColor: "darkred",
    borderWidth: 2,
    borderRadius: 17,
    width: 300,
    height: 35,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    fontSize: 23
  },
  text: {
    fontSize: 25
  }
});
