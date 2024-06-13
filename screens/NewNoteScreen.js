import { useContext, useLayoutEffect } from "react";
import { Text, TextInput, View } from "react-native";
import { UnifiedContext } from "../components/context/Context";
import NoteForm from "../components/noteManage/NoteForm";

function NewNoteScreen({ navigation }) {
    const { addNote } = useContext(UnifiedContext);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'New note',
        });
    }, [navigation]);

    function confirmHandler(noteData) {
        addNote(noteData);
        navigation.goBack();
    }

    return (
        <View>
            <NoteForm onSubmit={confirmHandler} />
        </View>
    );
}

export default NewNoteScreen;
