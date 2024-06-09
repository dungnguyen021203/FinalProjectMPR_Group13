import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const NewNoteScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <TextInput style={styles.input} placeholder="Enter your note here" />
      <Button title="Save" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default NewNoteScreen;
