import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    StyleSheet,
} from 'react-native';
import { LABELS } from '../data/dummy-data';

const LabelsScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredLabels, setFilteredLabels] = useState(LABELS);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredLabels(LABELS);
        } else {
            const filtered = LABELS.filter((label) =>
                label.label.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredLabels(filtered);
        }
    };

    const renderLabelItem = ({ item }) => {
        const { label } = item;

        return (
            <View style={styles.labelContainer}>
                <Text style={styles.labelText}>{label}</Text>
            </View>
        );
    };

    return (
        <View style={styles.screen}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search labels..."
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>
            <Text style={styles.totalLabelsText}>Total Labels: {LABELS.length}</Text>

            <FlatList
                data={filteredLabels}
                keyExtractor={(item) => item.id}
                renderItem={renderLabelItem}
                numColumns={2}
                columnWrapperStyle={styles.row}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    inputContainer: {
        padding: 20,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    totalLabelsText: {
        paddingLeft: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    row: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    labelContainer: {
        flex: 1,
        margin: 5,
        padding: 15,
        backgroundColor: '#657ADD',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '48%',
    },
    labelText: {
        fontSize: 16,
        color: 'white',
    },
});

export default LabelsScreen;
