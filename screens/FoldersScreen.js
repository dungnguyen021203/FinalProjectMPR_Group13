import React, { useContext } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { UnifiedContext } from '../components/context/Context';
import Icon from 'react-native-vector-icons/Ionicons';

const FoldersScreen = ({ navigation }) => {
    const { folders } = useContext(UnifiedContext);
    console.log(folders);

    const renderFolderItem = (itemData) => {
        const { id, name, updateAt, notes } = itemData.item;
        return (
            <TouchableOpacity
                style={styles.folderContainer}
                onPress={() => navigation.navigate('FolderNotes', { folderId: id, notes })}
            >
                <View style={styles.folderContent}>
                    <View>
                        <Text style={styles.folderTextHeader}>{name}</Text>
                        <Text style={styles.folderBodyText1}>{notes.length} notes</Text>
                        <Text style={styles.folderBodyText2}>Last updated: {new Date(updateAt).toLocaleString()}</Text>
                    </View>
                    <Icon name="chevron-forward-outline" size={24} color="#000" />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.screen}>
            <View>
                <Text style={{ color: "#5271ff", fontWeight: "bold" }}>3 folders</Text>
            </View>

            <FlatList
                data={folders}
                keyExtractor={(item) => item.id}
                renderItem={renderFolderItem}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => {}}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10
    },
    folderContainer: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    folderContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    folderTextHeader: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    folderBodyText1: {
        fontSize: 16,
        color: "#5271ff",
        marginTop: 5
    },
    folderBodyText2: {
        fontSize: 14
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

export default FoldersScreen;
