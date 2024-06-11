import { Pressable } from "react-native";
import { View, StyleSheet } from "react-native";
import {Ionicons} from '@expo/vector-icons';

function IconButton({icon, size, color, onPress}) {
    return ( 
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed} >
            <View style={styles.buttonContainer}>
                <Ionicons name={icon} size={size} color={color}  />
            </View>
        </Pressable>
     );
}

export default IconButton;


const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        right: 20,
        bottom: 50,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f00',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressed: {
        opacity: 0.75,
    },
})