import { Pressable, View, Text, StyleSheet } from "react-native";

function Button({ children, onPress, mode, style, disabled }) {
    return (
        <View style={[style, disabled && styles.disabled]}>
            <Pressable onPress={!disabled ? onPress : null} style={({ pressed }) => pressed && !disabled && styles.pressed}>
                <View style={[styles.button, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.buttonText, mode === 'flat' && styles.flatText, disabled && styles.disabledText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    );
}

export default Button;

const styles = StyleSheet.create({
    button: {
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
    },
    disabled: {
        opacity: 0.5,
    },
    disabledText: {
        color: 'gray',
    },
});
