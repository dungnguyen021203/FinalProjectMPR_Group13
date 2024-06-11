import React, { useContext } from 'react';
import { View, Alert, StyleSheet, Text, FlatList, Pressable } from "react-native";
import Button from "../components/ui/Button";
import { NotesContext } from "../components/context/NotesContext";
import { LABELS } from "../data/dummy-data";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

function TrashScreen({ navigation }) {
    const notesCtx = useContext(NotesContext);

    const restoreAllNotes = () => {
        Alert.alert(
            "Restore All Notes",
            "Are you sure you want to restore all notes from trash?",
            [
                { text: "Cancel", onPress: () => navigation.goBack(), style: "cancel" },
                { text: "Restore", onPress: () => notesCtx.restoreAllNotes() },
            ]
        );
    };

    const deleteAllNotes = () => {
        Alert.alert(
            "Delete All Notes Permanently",
            "This action cannot be undone. Are you sure you want to permanently delete all notes from trash?",
            [
                { text: "Cancel", onPress: () => navigation.goBack(), style: "cancel" },
                { text: "Delete", onPress: () => notesCtx.deleteAllNotes() },
            ]
        );
    };

    function NoteItem({ id, color, updateAt, isBookmarked, labelIds, content }) {
        const route = useRoute();

        const getLabelContent = (labelId) => {
            const foundLabel = LABELS.find((label) => label.id === labelId);
            return foundLabel?.label || "";
        };

        function notePressHandler() {
            if (route.name === "Trash") {
                Alert.alert(
                    "Note Action",
                    "What do you want to do with this note?",
                    [
                        { text: "Cancel", onPress: () => navigation.navigate("Trash"), style: "cancel" },
                        { text: "Restore", style: "default", onPress: () => notesCtx.restoreNote(id) },
                        { text: "Delete Permanently", style: "destructive", onPress: () => notesCtx.deleteNote(id) },
                    ]
                );
            }
        }

        return (
            <Pressable onPress={notePressHandler} style={({ pressed }) => [styles.noteItem, { backgroundColor: color || '#ccc' }, pressed && styles.pressed] }>
                <Text style={styles.noteDate}>{new Date(updateAt).toLocaleString()}</Text>
                <View style={styles.labelsContainer}>
                    {labelIds && labelIds.map((labelId, index) => (
                        <View key={index} style={styles.labelTag}>
                            <Text style={styles.labelText}>{getLabelContent(labelId)}</Text>
                        </View>
                    ))}
                </View>
                <Text style={styles.noteContent}>{content}</Text>
                {isBookmarked && <Text style={styles.bookmarked}>★</Text>}
                
            </Pressable>
        );
    }

    const renderNotesItem = (itemData) => {
        return <NoteItem {...itemData.item} />;
    };

    return (
        <View>
            <View style={styles.buttonContainer}>
                <Button onPress={restoreAllNotes} children="Restore All" style={{ margin: 4, backgroundColor: '#00CCFF', borderRadius: 6, }} />
                <Button onPress={deleteAllNotes} children="Delete All" style={{ margin: 4, backgroundColor: '#FF0033', borderRadius: 6, }} />
            </View>
            <FlatList
                data={notesCtx.trash}
                renderItem={renderNotesItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row-reverse",
        padding: 10,
    },
    noteItem: {
        padding: 15,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
    },
    noteDate: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5,
    },
    labelsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10
    },
    labelTag: {
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 3,
        marginRight: 5,
        marginBottom: 5
    },
    labelText: {
        fontSize: 12,
        color: '#333'
    },
    noteContent: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bookmarked: {
        fontSize: 18,
        color: '#FFD700', 
        marginTop: 10,
        position: 'absolute',
        right: 15,
    },
    line: {
        flexDirection: 'row',
    },
    lineColorDate: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    lineLabel: {
        flexDirection: 'row',
    },
    bookMark: {
        marginLeft: 250,
        marginVertical: 5,
    },
    pressed: {
        opacity: 0.75,
    },
});

export default TrashScreen;
