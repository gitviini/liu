import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import { View, Text, StyleSheet, Pressable, StatusBar} from "react-native"
import Input from "./Input"
import Button from "./Button"
import COLORS from "@/contants/colors"
import CONSTANTS from "@/contants/constants"
import { Ionicons } from "@expo/vector-icons"
import { stylePattern } from "@/contants/stylePattern"

export default function NewNotificationModal({ children, setVisibleModal}: {children?: ReactNode, setVisibleModal: Dispatch<SetStateAction<boolean>> }) {
    const [notificationTitle, setNotificationTitle] = useState<string>("")

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.background}/>
            <Pressable style={styles.closeButton} onPress={() => setVisibleModal(false)}>
                <Ionicons name="close" size={CONSTANTS.fontMedium} color={COLORS.foreground} />
            </Pressable>
            <View style={styles.containerContent}>
                <Text style={{...stylePattern.subTitle, fontWeight: "bold"}}>
                    Nova 
                </Text>
                <Input placeholder="Título da notificação" onChangeText={setNotificationTitle} value={notificationTitle}/>
                <Input placeholder="Título da notificação" onChangeText={setNotificationTitle} value={notificationTitle}/>
                <Input placeholder="Título da notificação" onChangeText={setNotificationTitle} value={notificationTitle}/>
                <Button>
                    Criar nova notificação
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
    containerContent: {
        marginTop: CONSTANTS.paddingLarge,
        gap: CONSTANTS.gapLarge,
    }
})