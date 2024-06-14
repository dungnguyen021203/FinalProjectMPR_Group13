import React, { useContext, useLayoutEffect } from "react";
import { View } from "react-native";
import { UnifiedContext } from "../../components/context/Context";
import NoteForm from "../../components/noteManage/NoteForm";

function NewNoteInFolderScreen({ route, navigation }) {
    const { addNote } = useContext(UnifiedContext);
    const folderId = route.params?.folderId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'New Note in Folder',
        });
    }, [navigation]);

    function confirmHandler(noteData) {
        const noteWithFolder = {
            ...noteData,
            folderId: folderId || null,
        };
        addNote(noteWithFolder);
        navigation.goBack();
    }

    return (
        <View>
            <NoteForm onSubmit={confirmHandler} />
        </View>
    );
}

export default NewNoteInFolderScreen;
