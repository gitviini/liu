import { View, Text, StyleSheet, Pressable, TextStyle } from "react-native"
import { useEffect, useState } from "react"
import { stylePattern } from "@/contants/stylePattern"
import { Ionicons } from "@expo/vector-icons"
import CONSTANTS from "@/contants/constants"
import COLORS from "@/contants/colors"
import * as handlerNotificationRequest from "@/api/NotificationService"
import { reverseString } from "@/utils/parser"
import Division from "./Division"

export default function NotificationItem({ item, fetchData, style}: { item: any, fetchData: Function, style?: TextStyle}) {
    const [toggleNotificationOptions, setToggleNotificationOptions] = useState<boolean>(false)

    let data:any = reverseString(item.date.slice(0, 10))
    data = data.split("")
    data.splice(2,1,"/")
    data.splice(5,1,"/")

    async function handlerDeleteNotification(
        id: any,
        author_code: any
    ) {
        const { data, error } = await handlerNotificationRequest.deleteNotification({ id: id, author_code: author_code })
        if (error.message) {
            console.error(error)
        }
        else {
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
                        fetchData()
                    }}
                >
                    <Text>
                        <Ionicons name="trash" size={CONSTANTS.fontLarge} color={COLORS.background} />
                    </Text>
                </Pressable>
                : <></>}
            <Pressable
                style={styles.contianerNotification}
                onPress={() => setToggleNotificationOptions(!toggleNotificationOptions)}
            >
                <Text style={{...stylePattern.subTitle, textAlign: "center", fontWeight: "bold", padding: CONSTANTS.paddingMedium, borderRadius: CONSTANTS.borderRadiusLarge, backgroundColor: COLORS.shadow, ...style}}>
                    {item.title}
                </Text>
                <Division />
                <Text style={stylePattern.paragraph}>
                    {item.description}
                </Text>
            </Pressable>
            <View style={styles.containerTime}>
                <Ionicons name="alarm-outline" size={CONSTANTS.fontMedium} color={COLORS.background} />
                <Text style={{ ...stylePattern.paragraph, color: COLORS.background }}>
                    {item.time}
                </Text>
                <Division horizontal={true} style={{backgroundColor: COLORS.background}}/>
                <Ionicons name="calendar" size={CONSTANTS.fontMedium} color={COLORS.background} />
                <Text style={{...stylePattern.paragraph, color: COLORS.background}}>
                    {data}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "auto",
        marginHorizontal: CONSTANTS.paddingMedium,
        gap: CONSTANTS.gapMedium
    },
    deleteNotification: {
        backgroundColor: COLORS.red,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 50,
        marginRight: CONSTANTS.paddingMedium,
        borderRadius: CONSTANTS.borderRadiusLarge
    },
    contianerNotification: {
        width: "auto",
        maxWidth: CONSTANTS.maxWidth,
        backgroundColor: COLORS.white,
        padding: CONSTANTS.paddingMedium,
        borderRadius: CONSTANTS.borderRadiusLarge,
        boxShadow: CONSTANTS.boxShadow,
        gap: CONSTANTS.gapSmall,
        borderBottomLeftRadius: CONSTANTS.borderRadiusSmall,
        borderBottomRightRadius: CONSTANTS.borderRadiusSmall,
    },
    containerInfo: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: CONSTANTS.gapMedium
    },
    containerTime: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: CONSTANTS.gapSmall,
        padding: CONSTANTS.paddingMedium,
        backgroundColor: COLORS.green,
        borderRadius: CONSTANTS.borderRadiusHalfLarge,
        borderTopLeftRadius: CONSTANTS.borderRadiusSmall,
        borderTopRightRadius: CONSTANTS.borderRadiusSmall,
        marginBottom: CONSTANTS.gapMedium
    }
})