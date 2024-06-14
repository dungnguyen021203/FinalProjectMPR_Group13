import React, { useContext, useEffect, useState } from 'react';
import { View, Alert, StyleSheet, Text, FlatList, Pressable } from "react-native";
import Button from "../../components/ui/Button";
import { UnifiedContext } from "../../components/context/Context";
import { useNavigation, useRoute } from "@react-navigation/native";

function TrashScreen({ navigation }) {
    const { trash, restoreAllNotes, deleteAllNotes, restoreNote, deleteNote, labels } = useContext(UnifiedContext);
    const [trashLabels, setTrashLabels] = useState([]);

    useEffect(() => {
        setTrashLabels(labels);
    }, [labels]);

    const restoreAllNotesHandler = () => {
        Alert.alert(
            "Restore All Notes",
            "Are you sure you want to restore all notes from trash?",
            [
                { text: "Cancel", onPress: () => navigation.navigate("Trash"), style: "cancel" },
                { text: "Restore", onPress: restoreAllNotes },
            ]
        );
    };

    const deleteAllNotesHandler = () => {
        Alert.alert(
            "Delete All Notes Permanently",
            "This action cannot be undone. Are you sure you want to permanently delete all notes from trash?",
            [
                { text: "Cancel", onPress: () => navigation.navigate("Trash"), style: "cancel" },
                { text: "Delete", onPress: deleteAllNotes },
            ]
        );
    };

    function NoteItem({ id, color, updateAt, isBookmarked, labelIds = [], content }) {
        const route = useRoute();

        const getLabelContent = (labelId) => {
            const foundLabel = trashLabels.find((label) => label.id === labelId);
            return foundLabel ? foundLabel.label : null;
        };

        function notePressHandler() {
            if (route.name === "Trash") {
                Alert.alert(
                    "Note Action",
                    "What do you want to do with this note?",
                    [
                        { text: "Cancel", onPress: () => navigation.navigate("Trash"), style: "cancel" },
                        { text: "Restore", style: "default", onPress: () => restoreNote(id) },
                        { text: "Delete Permanently", style: "destructive", onPress: () => deleteNote(id) },
                    ]
                );
            }
        }

        return (
            <Pressable onPress={notePressHandler} style={({ pressed }) => [styles.noteItem, { backgroundColor: color || '#ccc' }, pressed && styles.pressed]}>
                <Text style={styles.noteDate}>{new Date(updateAt).toLocaleString()}</Text>
                <View style={styles.labelsContainer}>
                    {labelIds && labelIds.map((labelId, index) => {
                        const labelContent = getLabelContent(labelId);
                        if (!labelContent) return null;
                        return (
                            <View key={index} style={styles.labelTag}>
                                <Text style={styles.labelText}>{labelContent}</Text>
                            </View>
                        );
                    })}
                </View>
                <Text style={styles.noteContent}>{content}</Text>
                {isBookmarked && <Text style={styles.bookmarked}>★</Text>}
            </Pressable>
        );
    }

    const renderNotesItem = ({ item }) => {
        return <NoteItem {...item} />;
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button onPress={restoreAllNotesHandler} children="Restore All" style={{ margin: 4, backgroundColor: '#00CCFF', borderRadius: 6 }} disabled={trash.length === 0} />
                <Button onPress={deleteAllNotesHandler} children="Delete All" style={{ margin: 4, backgroundColor: '#FF0033', borderRadius: 6 }} disabled={trash.length === 0} />
            </View>

            {trash.length === 0 ? (
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <Text style={{ fontSize: 18, color: '#666' }}>Trash is empty</Text>
                </View>
            ) : (
                <FlatList
                    data={trash}
                    renderItem={renderNotesItem}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
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
    pressed: {
        opacity: 0.75,
    },
});

export default TrashScreen;
