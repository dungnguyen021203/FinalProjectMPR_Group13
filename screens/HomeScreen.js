import React, { useState, useLayoutEffect, useContext, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    StyleSheet
} from 'react-native';
import { UnifiedContext } from "../components/context/Context";
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
    const { notes, labels } = useContext(UnifiedContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [filteredNotes, setFilteredNotes] = useState(notes);

    useEffect(() => {
        setFilteredNotes(notes);
    }, [notes]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => isSearchVisible
                ? (<TextInput
                    style={styles.searchInput}
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                    autoFocus/>)
                : (
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold'
                    }}>Home</Text>
                ),

            headerRight: () => (
                <TouchableOpacity onPress={() => setIsSearchVisible(!isSearchVisible)}>
                    <Icon
                        name={isSearchVisible
                        ? "close-outline"
                        : "search"}
                        size={25}
                        color="black"
                        style={{
                        marginRight: 15
                    }}/>
                </TouchableOpacity>
            )
        });
    }, [navigation, isSearchVisible, searchQuery]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredNotes(notes);
        } else {
            const filtered = notes.filter((note) => note.content.toLowerCase().includes(query.toLowerCase()));
            setFilteredNotes(filtered);
        }
    };

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
                onPress={() => navigation.navigate('EditNote', {noteId: id})}
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
                {notes.length > 0 ? <Text style={styles.noteContent}>{content}</Text>
                : <Text style={styles.noteContent}>No notes found!</Text>
                }
                {isBookmarked && <Text style={styles.bookmarked}>★</Text>}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.screen}>
            {filteredNotes.length > 0
                ? (<FlatList
                    data={filteredNotes}
                    keyExtractor={(item) => item.id}
                    renderItem={renderNoteItem}/>)
                : (
                    <View style={styles.notFoundContainer}>
                        <Text style={styles.notFoundText}>Not found!</Text>
                    </View>
                )}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('NewNote')}>
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
    searchInput: {
        flex: 1,
        borderColor: '#ccc',
        padding: 5,
        backgroundColor: '#fff'
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
        alignItems: 'center'
    },
    notFoundText: {
        fontSize: 18,
        color: '#666'
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

export default HomeScreen;
