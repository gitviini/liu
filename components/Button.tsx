import { TouchableOpacity, ViewStyle, StyleSheet } from "react-native"
import Colors from "@/constants/Colors"
import Constants from "@/constants/Constants"
import { ReactNode } from "react"
import { useRouter, Href } from "expo-router";
export default function Button({ style, children, href, onPress }: { style?: ViewStyle, children?: ReactNode, href?: Href, onPress?: Function}) {
    const router = useRouter()
    return (
        <TouchableOpacity
            style={{ ...styles.button, ...style }}
            onPress={() => {
                if (href && !onPress) {
                    router.push(href)
                    return
                }

                onPress ? onPress() : {}
            }}
        >
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: Constants.paddingHigh,
        backgroundColor: Colors.light.green,
        borderRadius: Constants.borderRadiusHigh,
    }
})