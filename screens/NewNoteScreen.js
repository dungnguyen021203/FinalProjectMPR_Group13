import { useContext, useLayoutEffect } from "react";
import { Text, TextInput, View } from "react-native";
import { NotesContext } from "../components/context/NotesContext";
import NoteForm from "../components/noteManage/NoteForm";

function NewNoteScreen({navigation}) {

    const notesCtx = useContext(NotesContext);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'New note',
        });
    }, [navigation]);

    function confirmHandler(noteData){
        notesCtx.addNote(noteData);
        navigation.goBack();
    }

    return ( 
        <View >
            <NoteForm onSubmit={confirmHandler} />
            
        </View>
    );
}

export default NewNoteScreen;