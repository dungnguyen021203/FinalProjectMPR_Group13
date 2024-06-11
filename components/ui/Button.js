import { Pressable, View, Text, StyleSheet } from "react-native";


function Button({children, onPress, mode, style}) {
    return ( 
        <View style={style}>
            <Pressable onPress={onPress}>
                <View style={[styles.button, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
     );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        borderRadius: 10,
    },
    flat: {
        backgroundColor: 'transparent'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    flatText: {
        color: 'black',
    },
    pressed: {
        opacity: 0.75,
        borderRadius: 4,
    }
})