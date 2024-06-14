import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

function FolderForm({ onSubmit }) {
  const [folderName, setFolderName] = useState("");

  function submitHandler() {
    const folderData = {
      name: folderName,
      updateAt: new Date(),
      notes: [],
    };

    onSubmit(folderData);
  }

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Folder Name"
        onChangeText={setFolderName}
        value={folderName}
      />
      <Button title="Create Folder" onPress={submitHandler} disabled={folderName === ""}/>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default FolderForm;
