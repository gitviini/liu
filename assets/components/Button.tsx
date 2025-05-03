import { Href, useRouter } from "expo-router";
import { ReactNode } from "react";
import { GestureResponderEvent, Pressable, StyleSheet, Text } from "react-native";
import COLORS from "../static/colors";
import CONSTANTS from "../static/constants";

export default function Button({ children, href, onPress}: { children?: ReactNode, href?:Href, onPress?: ((event: GestureResponderEvent) => void) | null | undefined }) {
    const router = useRouter()
    return (
        <Pressable style={styles.button} onPress={(e) => {
            onPress ? onPress(e) : {}
            href ? router.push(href) : {}
        }}>
            <Text style={styles.textButton}>
                {children}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "80%",
        maxWidth: CONSTANTS.maxWidth,
        padding: CONSTANTS.paddingMedium,
        backgroundColor: COLORS.green,
        borderRadius: CONSTANTS.borderRadiusLarge,
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    },
    textButton: {
        fontWeight: "bold",
        fontSize: CONSTANTS.fontMedium,
        color: COLORS.white
    }
})
