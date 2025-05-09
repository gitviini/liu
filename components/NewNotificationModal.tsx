import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import { View, Text, StyleSheet, Pressable, StatusBar, TextInput } from "react-native"
import Input from "./Input"
import Button from "./Button"
import COLORS from "@/contants/colors"
import CONSTANTS from "@/contants/constants"
import { Ionicons } from "@expo/vector-icons"
import { stylePattern } from "@/contants/stylePattern"
import DateTimePicker from '@react-native-community/datetimepicker';
import { postNotification } from "@/api/NotificationService"
import { reverseString } from "@/utils/parser"

export default function NewNotificationModal({ children, setVisibleModal, author_code, fetchData }: { children?: ReactNode, setVisibleModal: Dispatch<SetStateAction<boolean>>, author_code?: string, fetchData: Function}) {
    const [notificationTitle, setNotificationTitle] = useState<string>("")
    const [notificationDescription, setNotificationDescription] = useState<string>("")
    const [notificationDate, setNotificationDate] = useState<string>("")
    const [notificationTime, setNotificationTime] = useState<string>("")
    const [newNotificationLoading, SetNewNotificationLoading] = useState<boolean>(false)

    async function handlerNewNotification() {
        SetNewNotificationLoading(true)

        if (notificationDescription && notificationTitle) {

            const notificationData = {
                title: notificationTitle,
                description: notificationDescription,
                date: reverseString(notificationDate),
                time: notificationTime,
                type: "autocuidado",
                occurred: false,
                author_code: author_code || ""
            }

            console.log(notificationData)
            const { data, error } = await postNotification(notificationData)
            if (error.message) {
                console.log(error)
                return
            }
            console.log(data)
            setVisibleModal(false)
            fetchData()
        }

        SetNewNotificationLoading(false)
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.background} />
            <Pressable style={styles.closeButton} onPress={() => setVisibleModal(false)}>
                <Ionicons name="close" size={CONSTANTS.fontMedium} color={COLORS.foreground} />
            </Pressable>
            <View style={styles.containerContent}>
                <Text style={{ ...stylePattern.subTitle, fontWeight: "bold" }}>
                    Nova Notificação
                </Text>
                <Text style={{ ...stylePattern.subTitle, alignSelf: "flex-start", marginLeft: CONSTANTS.paddingMedium }}>Título</Text>
                <Input placeholder="Título da notificação" onChangeText={setNotificationTitle} value={notificationTitle} />
                <Text style={{ ...stylePattern.subTitle, alignSelf: "flex-start", marginLeft: CONSTANTS.paddingMedium }}>Descrição</Text>
                <Input placeholder="Descrição" onChangeText={setNotificationDescription} value={notificationDescription} />
                <Text style={{ ...stylePattern.subTitle, alignSelf: "flex-start", marginLeft: CONSTANTS.paddingMedium }}>Data</Text>
                <Input placeholder="DD-MM-AAAA" onChangeText={setNotificationDate} value={notificationDate} />
                <Text style={{ ...stylePattern.subTitle, alignSelf: "flex-start", marginLeft: CONSTANTS.paddingMedium }}>Hora</Text>
                <Input placeholder="HH:MM:SS" onChangeText={setNotificationTime} value={notificationTime} />
                <Button
                    styleButton={{ marginTop: CONSTANTS.paddingMedium }}
                    loading={newNotificationLoading}
                    onPress={handlerNewNotification}>
                    Enviar
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "fixed",
        width: "100%",
        height: "100%",
        padding: CONSTANTS.paddingLarge,
        backgroundColor: COLORS.background,
        zIndex: 99
    },
    closeButton: {
        padding: CONSTANTS.paddingMedium,
        alignSelf: "flex-start",
        boxShadow: CONSTANTS.boxShadow,
        borderRadius: CONSTANTS.borderRadiusMedium,
        backgroundColor: COLORS.white
    },
    containerDateInput: {
        padding: CONSTANTS.paddingSmall,
        boxShadow: CONSTANTS.boxShadow,
        backgroundColor: COLORS.white,
        borderRadius: CONSTANTS.borderRadiusLarge,
        flexDirection: "row",
        width: "auto",
        alignSelf: "flex-start",
    },
    dateInput: {
        padding: CONSTANTS.paddingSmall,
    },
    containerContent: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: CONSTANTS.paddingLarge,
        gap: CONSTANTS.gapSmall,
    }
})