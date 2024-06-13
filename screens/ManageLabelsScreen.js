import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { UnifiedContext } from "../components/context/Context";
import IconButton from "../components/ui/IconButton";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";

const ManageLabelsScreen = ({ navigation, route }) => {
  const { labels, notes, editNote } = useContext(UnifiedContext);
  const noteIndex = route.params.noteIndex;
  const chosenLabels = route.params.labelArray;
  const allLabelsArray = labels.map((label) => label.label);
  const [highlightedLabels, setHighlightedLabels] = useState(chosenLabels);

  const highlightedLabelIDs = labels.reduce((acc, label) => {
    if (highlightedLabels.includes(label.label)) {
      acc.push(label.id);
    }
    return acc;
  }, []);

  // function to toggle labels
  function toggleLabel(label) {
    if (highlightedLabels.includes(label)) {
      setHighlightedLabels((prev) => prev.filter((l) => l !== label));
    } else {
      setHighlightedLabels((prev) => [...prev, label]);
    }
  }

  // function to render labels
  const renderLabel = ({ item }) => (
    <View
      style={
        highlightedLabels.includes(item)
          ? styles.highlightedLabelTag
          : styles.labelTag
      }
    >
      <Pressable onPress={() => toggleLabel(item)}>
        <Text>{item}</Text>
      </Pressable>
    </View>
  );

  // function to handle submit
  function submitHandler() {
    const updatedNote = {
      ...notes[noteIndex],
      labelIds: highlightedLabelIDs,
    };

    editNote(noteIndex, updatedNote);
    alert("Note updated successfully!");
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      {/* FlatList to render labels */}
      <FlatList
        data={allLabelsArray}
        renderItem={renderLabel}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        style={styles.labelsContainer}
      />
      {/* IconButton to submit the labels */}
      <IconButton
        icon="checkmark"
        size={24}
        color="white"
        onPress={submitHandler}
        style={styles.submitButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  labelsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  labelTag: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH / 2,
    margin: 5,
  },
  highlightedLabelTag: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 5,
    flex: 1,
    width: SCREEN_WIDTH / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "skyblue",
    margin: 5,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  submitButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default ManageLabelsScreen;
