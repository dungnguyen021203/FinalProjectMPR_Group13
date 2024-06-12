import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    Alert,
    StyleSheet
} from 'react-native';
import { LabelsContext } from '../components/context/LabelsContext';
import EditLabelModal from '../components/labelManage/EditLabelModal';

const LabelsScreen = ({ navigation }) => {
    const labelsCtx = useContext(LabelsContext);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredLabels, setFilteredLabels] = useState(labelsCtx.labels);
    const [selectedLabel, setSelectedLabel] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        setFilteredLabels(labelsCtx.labels);
    }, [labelsCtx.labels]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredLabels(labelsCtx.labels);
        } else {
            const filtered = labelsCtx.labels.filter((label) =>
                label.label.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredLabels(filtered);
        }
    };

    const handleLabelPress = (label) => {
        setSelectedLabel(label);
        setIsModalVisible(true);
    };

    const handleSave = (id, newLabel) => {
        labelsCtx.editLabel(id, newLabel);
    };

    const handleDelete = (id) => {
        labelsCtx.deleteLabel(id);
    };

    const handleCreateNewLabel = () => {
        labelsCtx.addLabel(searchQuery);
        setSearchQuery('');  
    };

    const renderLabelItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.labelContainer} onPress={() => handleLabelPress(item)}>
                <Text style={styles.labelText}>{item.label}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.screen}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search labels..."
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <Text style={styles.totalLabelsText}>Total Labels: {labelsCtx.labels.length}</Text>
            <FlatList
                data={filteredLabels}
                keyExtractor={(item) => item.id}
                renderItem={renderLabelItem}
                numColumns={2}
                columnWrapperStyle={styles.row}
                ListHeaderComponent={searchQuery && filteredLabels.length === 0 ? (
                    <TouchableOpacity onPress={handleCreateNewLabel}>
                        <Text style={styles.createLabelText}>Create new label '{searchQuery}'</Text>
                    </TouchableOpacity>
                ) : null}
            />
            {selectedLabel && (
                <EditLabelModal
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    label={selectedLabel}
                    onSave={handleSave}
                    onDelete={handleDelete}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
    },
    searchInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    totalLabelsText: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    row: {
        flex: 1,
        justifyContent: 'space-between',
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
    createLabelText: {
        fontStyle: 'italic',
        color: 'gray',
        marginVertical: 10,
    },
});

export default LabelsScreen;
