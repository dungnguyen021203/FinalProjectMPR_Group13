import React, { useContext, useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { UnifiedContext } from "../components/context/Context";
import { GlobalStyles } from "../constants/colors";
import NoteForm from "../components/noteManage/NoteForm";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

function EditNoteScreen({ route, navigation }) {
  // State to manage attributes of Note
  const { notes, trash, labels, editNote, deleteNote } = useContext(UnifiedContext);
  const editedNoteID = route.params.noteId;
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["25%", "50%"];
  const [selectedColor, setSelectedColor] = useState(null);

  // Function to handle opening the bottom sheet
  const handleOpenBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  // Function to handle changes in the bottom sheet
  const handleSheetChanges = (index) => {
    console.log("bottom sheet state changed to", index);
  };

  // Find the index and details of the note to be edited
  var noteIndex = notes.findIndex((note) => note.id === editedNoteID);
  if (noteIndex === -1) {
    noteIndex = trash.findIndex((note) => note.id === editedNoteID);
  }

  const note = notes[noteIndex] || trash[noteIndex];
  const updatedTime = new Date(note.updateAt).toLocaleString();
  const bookMark = note.isBookmarked;
  const labelID = note.labelIds || []; // Ensure labelID is an array
  const foundLabels = labels.filter((label) => labelID.includes(label.id));
  const labelNames = foundLabels.map((label) => label.label);

  const [bookmarkStatus, setBookmarkStatus] = useState(bookMark);

  // Function to toggle bookmark status
  function toggleBookmark() {
    const newBookmarkStatus = !bookmarkStatus;
    setBookmarkStatus(newBookmarkStatus); // Update state to trigger re-render
  }

  // Function to delete note
  function deleteNoteHandler() {
    Alert.alert(
      "Delete this note!",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            deleteNote(editedNoteID);
            navigation.goBack();
          },
        },
      ]
    );
  }

  // Function to handle color press
  function handleColorPress(color) {
    const updatedColorNote = {
      ...note,
      color: color,
    };

    editNote(editedNoteID, updatedColorNote);
  }

  // Function to cancel edit note
  function cancelNoteHandler() {
    navigation.goBack();
  }

  // Function to edit note
  function editNoteHandler(NoteData) {
    editNote(editedNoteID, NoteData);
    alert("Note updated successfully!");
    navigation.goBack();
  }

  // Function to render labels
  const renderLabel = ({ item }) => (
    <View style={styles.labelTag}>
      <Text>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Display labels */}
      <FlatList
        data={labelNames}
        renderItem={renderLabel}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        style={styles.labelsContainer}
      />
      {/* Display NoteForm */}
      <NoteForm
        onCancel={cancelNoteHandler}
        onSubmit={editNoteHandler}
        bookmarkStatus={bookmarkStatus}
        initialContent={note.content}
      />

      {/* Display Bottom Tab */}
      <View style={styles.bottomTab}>
        <Text style={styles.timeText}>{updatedTime}</Text>
        <Ionicons
          name={bookmarkStatus ? "bookmark" : "bookmark-outline"}
          size={30}
          color="black"
          onPress={toggleBookmark}
        />
        <TouchableOpacity onPress={handleOpenBottomSheet}>
          <Icon name="dots-vertical" size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Display Bottom Sheet Modal */}
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            isVisible={false}
          >
            <BottomSheetView style={styles.contentContainer}>
              <View style={styles.colorContainer}>
                {[
                  "lightseagreen",
                  "skyblue",
                  "lightcoral",
                  "lightpink",
                  "lightgreen",
                  "lightblue",
                  "orange",
                  "palegreen",
                ].map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedColor(color);
                      handleColorPress(color);
                    }}
                    style={[styles.colorPicker, { backgroundColor: color }]}
                  >
                    {selectedColor === color && (
                      <View style={styles.checkMarkContainer}>
                        <Text style={styles.checkMark}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              
              <View style={[styles.labelTag, { marginRight: 70, marginLeft: 70, marginTop: 20 }]}>
                <TouchableOpacity
                  labelID={labelNames}
                  onPress={() =>
                    navigation.navigate("ManageLabels", {
                      editedNoteID: editedNoteID,
                      labelArray: labelNames,
                      noteIndex: noteIndex,
                    })
                  }
                >
                  <Text style={styles.labelText}>+ Manage labels</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.deleteButton}>
                <Ionicons
                  name={"trash"}
                  size={30}
                  color="black"
                  onPress={deleteNoteHandler}
                  text="Delete"
                />
                <Text
                  style={styles.bottomSheetText}
                  onPress={deleteNoteHandler}
                >
                  Delete
                </Text>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  colorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
  colorPicker: {
    width: 30,
    height: 30,
    borderRadius: 20,
    margin: 4,
  },
  checkMarkContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  checkMark: {
    color: "white",
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: "left",
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
    paddingLeft: "30%",
  },
  cancelbutton: {
    minWidth: 120,
    marginHorizontal: 8,
    backgroundColor: "yellow",
  },
  bottomTab: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#808080",
    padding: 10,
    marginBottom: 0,
  },
  timeText: {
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  deleteButton: {
    flexDirection: "row",
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  bottomSheetText: {
    marginLeft: 10,
    fontSize: 20,
  },
  labelTag: {
    marginLeft: 30,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 5,
    marginBottom: 5,
  },
  labelText: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
  },
  labelsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
});

export default EditNoteScreen;
