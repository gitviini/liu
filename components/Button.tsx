import { Pressable, ViewStyle, StyleSheet } from "react-native"
import Colors from "@/constants/Colors"
import Constants from "@/constants/Constants"
import { ReactNode } from "react"

export default function Button({ style, children }: { style?: ViewStyle, children?: ReactNode }) {
    return (
        <Pressable style={{ ...styles.button, ...style }}>
            {children}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: Constants.paddingMedium,
        backgroundColor: Colors.light.green,
        borderRadius: Constants.borderRadiusHigh,
    }
})