import { View, StyleSheet } from "react-native"
import COLORS from "@/contants/colors"
import CONSTANTS from "@/contants/constants"

export default function Division() {
    return <View style={styles.division}></View>
}

const styles = StyleSheet.create({
    division: {
        width: "100%",
        height: 1,
        backgroundColor: COLORS.shadow,
        marginTop: CONSTANTS.paddingMedium,
        marginBottom: CONSTANTS.paddingMedium
    }
})