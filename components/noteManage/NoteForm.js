import { Alert, View } from "react-native";
import Input from "./Input";
import React, { useState, useEffect } from "react";
import IconButton from "../ui/IconButton";

// For Adding a New Note
function NoteForm({ onSubmit, bookmarkStatus, initialContent }) {
  const [inputValues, setInputValues] = useState({
    updateAt: new Date(),
    isBookmarked: true,
    content: initialContent || "",
  });

  // useEffect to set initial content
  useEffect(() => {
    setInputValues((curInputValues) => ({
      ...curInputValues,
      content: initialContent || "",
    }));
  }, [initialContent]);

  // Function to handle input changes
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }
  // Function to handle submit
  function submitHandler() {
    const noteData = {
      content: inputValues.content,
      updateAt: inputValues.updateAt,
      isBookmarked: bookmarkStatus,
    };

    const contentIsValid = noteData.content.trim().length > 0;

    if (!contentIsValid) {
      Alert.alert("Invalid content, please enter your note content!");
      return;
    }

    onSubmit(noteData);
  }

  return (
    <View>
      {/* Input for note content */}
      <Input
        textInputConfig={{
          placeholder: "Enter your note content here...",
          onChangeText: inputChangedHandler.bind(this, "content"),
          value: inputValues.content,
        }}
      />
      {/* IconButton for submitting the note */}
      <IconButton
        icon="checkmark"
        size={24}
        color="white"
        onPress={submitHandler}
      />
    </View>
  );
}

export default NoteForm;