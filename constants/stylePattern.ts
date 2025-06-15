import { StyleSheet } from "react-native"
import Colors from "./Colors"
import Constants from "./Constants"

export const stylePattern = StyleSheet.create({
    title: {
        fontSize: 28,
        fontFamily: "Nunito"
    },
    subtitle: {
        fontSize: 20,
        fontFamily: "Nunito"
    },
    paragraph: {
        fontSize: 16,
        fontFamily: "Nunito",
    },
    card: {
        width: "100%",
        padding: Constants.paddingHigh,
        backgroundColor: Colors.light.white,
        borderRadius: Constants.borderRadiusHigh,
        gap: Constants.gapHigh,
        boxShadow: Constants.boxShadow,
    }
})