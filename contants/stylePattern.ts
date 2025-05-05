import { StyleSheet } from "react-native"
import CONSTANTS from "./constants"
import COLORS from "./colors"

export const stylePattern = StyleSheet.create({
    containerTitle: {
        gap: 0
    },
    title: {
        fontSize: CONSTANTS.fontLarge,
        color: COLORS.foreground,
    },
    subTitle: {
        fontSize: CONSTANTS.fontMedium,
        color: COLORS.foreground,
    },
    paragraph: {
        fontSize: CONSTANTS.fontSmall,
        color: COLORS.foreground,
    },
    link: {
        fontSize: CONSTANTS.fontSmall,
        padding: CONSTANTS.paddingMedium,
        color: COLORS.foreground,
    }
})