import { TextInput, View, Text, StyleSheet } from "react-native";

function Input({ textInputConfig}) {
    return ( 
        <View style={styles.inputContainer}>
            <TextInput style={styles.inputMultiline} {...textInputConfig} />
        </View>
     );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 24,
        color: 'black',
        marginBottom: 4,
    },
    inputMultiline: {
        minHeight: 400,
        textAlignVertical:  'top',
        backgroundColor: '#EEEEEE',
        padding: 6,
        borderRadius: 6,
        fontSize: 15,
        color: 'black',
    }
});