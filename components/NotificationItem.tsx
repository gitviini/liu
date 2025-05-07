import { View, Text, StyleSheet } from "react-native"
import { stylePattern } from "@/contants/stylePattern"
import { Ionicons } from "@expo/vector-icons"
import CONSTANTS from "@/contants/constants"
import COLORS from "@/contants/colors"

export default function NotificationItem({ item }: { item: any }) {
    return (
        <View style={styles.contianerNotification}>
            <Text style={{ ...stylePattern.title, fontWeight: "bold" }}>
                {item.title}
            </Text>
            <Text style={stylePattern.paragraph}>
                {item.description}
            </Text>
            <View style={styles.containerInfo}>
                <Ionicons name="alarm-outline" size={CONSTANTS.fontMedium} color={COLORS.foreground}/>
                <Text style={stylePattern.paragraph}>
                    {item.time}
                </Text>
            </View>
            <View style={styles.containerInfo}>
                <Ionicons name="calendar" size={CONSTANTS.fontMedium} color={COLORS.foreground}/>
                <Text style={stylePattern.paragraph}>
                    {item.date.slice(0, 10)}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contianerNotification: {
        width: "100%",
        maxWidth: CONSTANTS.maxWidth,
        backgroundColor: COLORS.white,
        padding: CONSTANTS.paddingMedium,
        borderColor: COLORS.green,
        borderLeftWidth: 2,
        borderRadius: CONSTANTS.borderRadiusSmall,
        boxShadow: CONSTANTS.boxShadow
    },
    containerInfo: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: CONSTANTS.gapMedium
    }
})