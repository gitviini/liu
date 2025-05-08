import { View, Text, StyleSheet, Pressable } from "react-native"
import { useEffect, useState } from "react"
import { stylePattern } from "@/contants/stylePattern"
import { Ionicons } from "@expo/vector-icons"
import CONSTANTS from "@/contants/constants"
import COLORS from "@/contants/colors"
import * as handlerNotificationRequest from "@/api/NotificationService"

export default function NotificationItem({ item }: { item: any }) {
    const [toggleNotificationOptions, setToggleNotificationOptions] = useState<boolean>(false)

    async function handlerDeleteNotification(
        id: any,
        author_code: any
    ) {
        const {data, error} =  await handlerNotificationRequest.deleteNotification({ id: id, author_code: author_code })
        if(error.message){
            console.error(error)
        }
        else{
            console.log(data)
        }
    }/*  */

    return (
        <View style={styles.container}>
            {toggleNotificationOptions ?
                <Pressable
                    style={styles.deleteNotification}
                    onPress={() => {
                        handlerDeleteNotification(item.id, item.author_code)
                    }}
                >
                    <Text>
                        {item.id}
                    </Text>
                </Pressable>
                : <></>}
            <Pressable
                style={styles.contianerNotification}
                onPress={() => setToggleNotificationOptions(!toggleNotificationOptions)}
            >
                <Text style={{ ...stylePattern.subTitle, fontWeight: "bold" }}>
                    {item.title}
                </Text>
                <Text style={stylePattern.paragraph}>
                    {item.description}
                </Text>
                <View style={styles.containerInfo}>
                    <Ionicons name="alarm-outline" size={CONSTANTS.fontMedium} color={COLORS.foreground} />
                    <Text style={stylePattern.paragraph}>
                        {item.time}
                    </Text>
                </View>
                <View style={styles.containerInfo}>
                    <Ionicons name="calendar" size={CONSTANTS.fontMedium} color={COLORS.foreground} />
                    <Text style={stylePattern.paragraph}>
                        {item.date.slice(0, 10)}
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    deleteNotification: {
        backgroundColor: COLORS.red,
        justifyContent: "center",
        alignItems: "center",
        width: "20%",
        marginRight: CONSTANTS.paddingMedium
    },
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