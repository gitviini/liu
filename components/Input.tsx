import { StyleSheet, TextInput, TextStyle, View, ViewStyle, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/contants/colors";
import CONSTANTS from "@/contants/constants";

export default function Input({ onChangeText, value, placeholder, maxLength, secureTextEntry, styleInput, styleView }: { onChangeText?: ((text: string) => void), value?: string, placeholder?: string, maxLength?: number, secureTextEntry?: boolean, styleInput?: TextStyle, styleView?: ViewStyle }) {
    if (secureTextEntry) {
        const [visiblePassword, setVisiblePassword] = useState<boolean>(false)
        return (
            <View style={styles.containerSecurityInput}>
                <TextInput
                    style={{ ...styles.input, width: "80%", ...styleInput }}
                    placeholderTextColor={COLORS.gray}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    secureTextEntry={!visiblePassword}
                    value={value}
                />
                <Pressable style={styles.visibleToggle}
                    onPress={() => setVisiblePassword(!visiblePassword)}>
                    <Ionicons name={visiblePassword ? 'eye' : 'eye-off'} size={CONSTANTS.fontMedium} color={COLORS.foreground} />
                </Pressable>
            </View>
        )
    }

    return (
        <View style={{ ...styles.container, ...styleView }}>
            <TextInput
                style={{ ...styles.input, ...styleInput }}
                placeholderTextColor={COLORS.gray}
                onChangeText={onChangeText}
                placeholder={placeholder}
                maxLength={maxLength}
                value={value}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        maxWidth: CONSTANTS.maxWidth,
        borderRadius: CONSTANTS.borderRadiusLarge,
        boxShadow: CONSTANTS.boxShadow,
    },
    containerSecurityInput: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: COLORS.white,
        boxShadow: CONSTANTS.boxShadow,
        justifyContent: "space-between",
        borderRadius: CONSTANTS.borderRadiusLarge,
        overflow: "hidden"
    },
    input: {
        width: "100%",
        maxWidth: CONSTANTS.maxWidth,
        padding: CONSTANTS.paddingMedium,
        fontSize: CONSTANTS.fontSmall,
        borderRadius: CONSTANTS.borderRadiusLarge,
        backgroundColor: COLORS.white,
        outlineColor: "transparent",
    },
    visibleToggle: { 
        padding: CONSTANTS.paddingMedium, 
        backgroundColor: COLORS.white, 
        justifyContent: "center", 
        alignItems: "center" 
    },
})