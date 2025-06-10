import { TouchableOpacity, ViewStyle, StyleSheet } from "react-native"
import Colors from "@/constants/Colors"
import Constants from "@/constants/Constants"
import { ReactNode } from "react"
import { useRouter, Href } from "expo-router";
export default function Button({ style, children, href }: { style?: ViewStyle, children?: ReactNode, href?: Href }) {
    const router = useRouter()
    return (
        <TouchableOpacity
            style={{ ...styles.button, ...style }}
            onPress={() => {
                if (href) {
                    router.push(href)
                }
            }}
        >
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: Constants.componentsHeight,
        justifyContent: "center",
        alignItems: "center",
        padding: Constants.paddingMedium,
        backgroundColor: Colors.light.green,
        borderRadius: Constants.borderRadiusHigh,
    }
})