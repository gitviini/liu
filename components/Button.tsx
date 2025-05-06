import { Href, useRouter } from "expo-router";
import { ReactNode } from "react";
import { GestureResponderEvent, Pressable, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import COLORS from "@/contants/colors";
import CONSTANTS from "@/contants/constants";

export default function Button({ children, styleButton, styleTextButton, href, onPress }: { children?: ReactNode, styleButton?: ViewStyle, styleTextButton?: TextStyle,  href?: Href, onPress?: ((event: GestureResponderEvent) => void) | null | undefined }) {
    const router = useRouter()
    return (
        <Pressable style={{...styles.button, ...styleButton}} onPress={(e) => {
            onPress ? onPress(e) : {}
            href ? router.push(href) : {}
        }}>
            <Text style={{...styles.textButton, ...styleTextButton}}>
                {children}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
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
