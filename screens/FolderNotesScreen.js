import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { UnifiedContext } from '../components/context/Context';

const FolderNotesScreen = ({ route, navigation }) => {
    const { notes } = useContext(UnifiedContext);
    const { notes: folderNoteIds = [] } = route.params;

    // Find notes that belong to the selected folder
    const folderNotes = notes.filter(note => folderNoteIds.includes(note.id));

    const renderNoteItem = (itemData) => {
        const { content, updateAt } = itemData.item;
        return (
            <View style={styles.noteContainer}>
                <Text style={styles.noteContent}>{content}</Text>
                <Text style={styles.noteDate}>{new Date(updateAt).toLocaleString()}</Text>
            </View>
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
                style={styles.addButton}
                onPress={() => navigation.navigate('NewNote')}
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
    noteContainer: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5
    },
    noteContent: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    noteDate: {
        fontSize: 12,
        color: '#666',
        marginTop: 5
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
