import { View, StyleSheet } from "react-native"
import COLORS from "@/contants/colors"
import CONSTANTS from "@/contants/constants"

export default function Division({ horizontal }: { horizontal?: boolean }) {
    return <View style={{ ...styles.division, width: (horizontal ? 1 : "100%"), height: (horizontal ? "100%" : 1) }}></View>
}

const styles = StyleSheet.create({
    division: {
        backgroundColor: COLORS.shadow,
        marginTop: CONSTANTS.paddingMedium,
        marginBottom: CONSTANTS.paddingMedium
    }
})