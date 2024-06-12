import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const EditLabelModal = ({ visible, onClose, label, onSave, onDelete }) => {
    const [newLabel, setNewLabel] = useState('');

    useEffect(() => {
        if (label) {
            setNewLabel(label.label);
        }
    }, [label]);

    const handleSave = () => {
        if (label) {
            onSave(label.id, newLabel);
            onClose();
        }
    };

    const handleDelete = () => {
        if (label) {
            onDelete(label.id);
            onClose();
        }
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Edit Label</Text>
                    <TextInput
                        style={styles.input}
                        value={newLabel}
                        onChangeText={setNewLabel}
                        placeholder="Label name"
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    saveButton: {
        backgroundColor: '#00CCFF',
        padding: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: '#FF0033',
        padding: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    cancelButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default EditLabelModal;
