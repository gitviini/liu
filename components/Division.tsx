import { View, StyleSheet, ViewStyle } from "react-native"
import COLORS from "@/contants/colors"
import CONSTANTS from "@/contants/constants"

export default function Division({ horizontal, style }: { horizontal?: boolean, style?:ViewStyle }) {
    return <View style={{ ...styles.division, width: (horizontal ? 1 : "100%"), height: (horizontal ? "100%" : 1), ...style}}></View>
}

const styles = StyleSheet.create({
    division: {
        backgroundColor: COLORS.shadow,
        marginTop: CONSTANTS.paddingMedium,
        marginBottom: CONSTANTS.paddingMedium
    }
})