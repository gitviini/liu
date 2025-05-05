import { Pressable, StatusBar, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import CONSTANTS from "@/contants/constants"
import COLORS from "@/contants/colors"

export default function BackButton() {
    const router = useRouter()
    if (!router.canGoBack()) return
    return (
        <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
        >
            <Ionicons name={"arrow-back"} size={CONSTANTS.fontMedium} color={COLORS.foreground}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    backButton: {
        alignSelf: "flex-start",
        marginTop: (StatusBar.currentHeight != undefined && !(StatusBar.currentHeight >= 25) ? StatusBar.currentHeight : 0 ) + CONSTANTS.paddingMedium,
        marginLeft: CONSTANTS.paddingLarge,
        padding: CONSTANTS.paddingMedium,
        backgroundColor: COLORS.white,
        borderRadius: CONSTANTS.borderRadiusMedium,
        boxShadow: `0px 5px 12px ${COLORS.shadow}`,
        zIndex: 99,
    },
})