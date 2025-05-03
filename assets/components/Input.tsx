import { StyleSheet, TextInput, TextStyle, View, ViewStyle } from "react-native";
import COLORS from "../static/colors";
import CONSTANTS from "../static/constants";

export default function Input({ onChangeText, value, placeholder, maxLength, secureTextEntry, styleInput, styleView }: { onChangeText?: ((text: string) => void), value?: string, placeholder?: string, maxLength?: number, secureTextEntry?: boolean, styleInput?: TextStyle, styleView?: ViewStyle }) {
    return (
        <View style={{ ...styles.container, ...styleView }}>
            <TextInput
                style={{ ...styles.input, ...styleInput }}
                placeholderTextColor={COLORS.gray}
                onChangeText={onChangeText}
                placeholder={placeholder}
                maxLength={maxLength}
                secureTextEntry={secureTextEntry}
                value={value}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        maxWidth: CONSTANTS.maxWidth,
        borderRadius: CONSTANTS.borderRadiusLarge,
        boxShadow: `0px 5px 12px ${COLORS.shadow}`,
    },
    input: {
        width: "100%",
        maxWidth: CONSTANTS.maxWidth,
        padding: CONSTANTS.paddingMedium,
        fontSize: CONSTANTS.fontSmall,
        borderRadius: CONSTANTS.borderRadiusLarge,
        backgroundColor: COLORS.white,
        outlineColor: "transparent",
    }
})