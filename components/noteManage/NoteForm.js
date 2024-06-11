import { Alert, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import IconButton from "../ui/IconButton";

function NoteForm({onSubmit}) {
    const [inputValues, setInputValues] = useState({
        color: '',
        updateAt: new Date(),
        isBookmarked: false,
        labelIds: '',
        content: '',
    });
    
    function inputChangedHandler(inputIdentifier, enteredValue){
        setInputValues((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: enteredValue,
            };
        });
    }

    function submitHandler(){
        const noteData = {
            content: inputValues.content,
            updateAt: inputValues.updateAt,
            color: inputValues.color,
            isBookmarked: inputValues.isBookmarked,
            labelIds: inputValues.labelIds,
        };

        const contentIsValid = noteData.content.trim().length > 0;

        if(!contentIsValid) {
            Alert.alert("Invalid content, please enter your note content!")
            return;
        };

        onSubmit(noteData);
    }

    return ( 
        <View>
            <Input textInputConfig={{
                placeholder: 'Type your new note here...',
                onChangeText: inputChangedHandler.bind(this, 'content'),
                value: inputValues.content,
            }} />
            <IconButton icon='checkmark' size={24} color='white' onPress={submitHandler} />
        </View>
    );
}

export default NoteForm;