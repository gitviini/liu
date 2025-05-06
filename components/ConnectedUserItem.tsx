import { View, Text, StyleSheet } from "react-native"
import { stylePattern } from "@/contants/stylePattern"
import { ConnectedUserType } from "@/types/ConnectedUserType"
import CONSTANTS from "@/contants/constants"
import COLORS from "@/contants/colors"


export default function ConnectedUserItem({ item }: { item: ConnectedUserType }) {
    return (
        <View style={styles.containerConnectedUserItem}>
            <Text style={stylePattern.paragraph}>
                {item.name}
            </Text>
            <Text style={stylePattern.paragraph}>
                #{item.codigo}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerConnectedUserItem: {
        backgroundColor: COLORS.white,
        padding: CONSTANTS.paddingMedium,
        borderColor: COLORS.green,
        borderLeftWidth: 2,
        borderRadius: CONSTANTS.borderRadiusSmall,
        boxShadow: CONSTANTS.boxShadow
    }
})