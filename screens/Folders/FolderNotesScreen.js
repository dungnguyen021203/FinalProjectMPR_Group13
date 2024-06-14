import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { UnifiedContext } from '../../components/context/Context';
import Icon from 'react-native-vector-icons/Ionicons';

const FolderNotesScreen = ({ route, navigation }) => {
    const { notes, labels, folders } = useContext(UnifiedContext);
    const { folderId } = route.params;

    const [folderNotes, setFolderNotes] = useState([]);

    useEffect(() => {
        const folder = folders.find((folder) => folder.id === folderId);
        if (folder) {
            const folderNotes = notes.filter((note) => folder.notes.includes(note.id));
            setFolderNotes(folderNotes);
        }
    }, [folderId, folders, notes]);

    const renderNoteItem = (itemData) => {
        const {
            id,
            color,
            labelIds = [],
            content,
            updateAt,
            isBookmarked
        } = itemData.item;

        const noteLabels = (labelId) => {
            const label = labels.find((label) => label.id === labelId);
            return label ? label.label : '';
        };

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('EditNote', { noteId: id })}
                style={[
                    styles.noteItem, {
                        backgroundColor: color || '#ccc'
                    }
                ]}>
                <Text style={styles.noteDate}>{new Date(updateAt).toLocaleString()}</Text>
                <View style={styles.labelsContainer}>
                    {labelIds && labelIds.map((labelId, index) => (
                        <View key={index} style={styles.labelTag}>
                            <Text style={styles.labelText}>{noteLabels(labelId)}</Text>
                        </View>
                    ))}
                </View>
                <Text style={styles.noteContent}>{content}</Text>
                {isBookmarked && <Text style={styles.bookmarked}>★</Text>}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.screen}>
            {folderNotes.length > 0 ? (
                <FlatList
                    data={folderNotes}
                    keyExtractor={(item) => item.id}
                    renderItem={renderNoteItem}
                />
            ) : (
                <View style={styles.notFoundContainer}>
                    <Text style={styles.notFoundText}>No notes found!</Text>
                </View>
            )}
            <TouchableOpacity
                style={[styles.addButton, folderNotes.length > 0 && { backgroundColor: '#ccc' }]}
                onPress={() => navigation.navigate('NewNoteInFolder', { folderId })}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10
    },
    noteItem: {
        padding: 15,
        marginVertical: 10,
        borderRadius: 10
    },
    noteDate: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5
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
        fontWeight: 'bold'
    },
    bookmarked: {
        fontSize: 18,
        color: '#FFD700',
        marginTop: 10,
        position: 'absolute',
        right: 15,
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFoundText: {
        fontSize: 18,
        color: '#666',
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f00',
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24
    }
});

export default FolderNotesScreen;
