import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function LocationInput({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text style={styles.label}>{name}</Text>
        <TextInput
          value={value}
          placeholder={name}
          keyboardType="numeric"
          onChangeText={onChange}
          style={styles.textInput}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingRight: 5,
  },
  input: {
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    marginBottom: 10,
    alignItems: "flex-end",
  },
  textInput: {
    backgroundColor: "#F1F1F1",
    height: 35,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    width: 120,
  },
});
