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
      <View style={{ marginBottom: 5 }}>
        <Text>{name}</Text>
      </View>
      <TextInput
        value={value}
        placeholder={name}
        keyboardType="numeric"
        onChangeText={onChange}
        style={styles.textInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: "#F1F1F1",
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});
