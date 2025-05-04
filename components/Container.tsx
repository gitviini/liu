import { ReactNode } from "react"
import { StatusBar, StyleSheet, View, ViewStyle } from "react-native"
import COLORS from "@/contants/colors"
import CONSTANTS from "@/contants/constants"

export default function Container({ children, style }: { children?: ReactNode, style?: ViewStyle }) {
    return (
        <View style={{ ...styles.container, ...style }}>
            <StatusBar backgroundColor={COLORS.background} />
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: CONSTANTS.paddingLarge,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
        gap: CONSTANTS.gapLarge,
    },
})