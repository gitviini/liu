import { Href, useRouter } from "expo-router";
import { ReactNode } from "react";
import { ActivityIndicator, ColorValue, GestureResponderEvent, TouchableOpacity, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import COLORS from "@/contants/colors";
import CONSTANTS from "@/contants/constants";

export default function Button({ children, styleButton, styleTextButton, href, onPress, loading, activityColor}: { children?: ReactNode, styleButton?: ViewStyle, styleTextButton?: TextStyle, href?: Href, onPress?: ((event: GestureResponderEvent) => void) | null | undefined, loading?: boolean, activityColor?: ColorValue}) {
    const router = useRouter()
    return (
        <>
            {loading
                ?
                <TouchableOpacity style={{ ...styles.button, width: "auto" }}>
                    <ActivityIndicator size={CONSTANTS.fontLarge} color={activityColor || COLORS.background} />
                </TouchableOpacity>
                :
                <TouchableOpacity style={{ ...styles.button, ...styleButton }} onPress={(e) => {
                    onPress ? onPress(e) : {}
                    href ? router.push(href) : {}
                }}>
                    <Text style={{ ...styles.textButton, ...styleTextButton }}>
                        {children}
                    </Text>
                </TouchableOpacity>
            }
        </>
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
