import Container from "@/components/Container"
import { Link } from "expo-router"
import { Image } from "expo-image";
import WebView from "react-native-webview";
import { useEffect, useState } from "react";
import * as handlerNotificationRequest from "@/api/NotificationService"
import * as handlerUserRequest from "@/api/UserService"
import { View, Text, StyleSheet, Pressable } from "react-native";
import NotificationItem from "@/components/NotificationItem";
import HomeLoader from "@/components/Loaders/HomeLoader";
import { useUser } from "@clerk/clerk-expo";
import Division from "@/components/Division";
import COLORS from "@/contants/colors";
import CONSTANTS from "@/contants/constants";
import { stylePattern } from "@/contants/stylePattern";
import { Ionicons } from "@expo/vector-icons";
import NewNotificationModal from "@/components/NewNotificationModal";
import Button from "@/components/Button";
import Input from "@/components/Input";
const blurhash = 'L2PQ4}xu#ixu~qt7%MoL,,axwtax'

export default function Home() {
    const { isSignedIn, user, isLoaded } = useUser();

    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [visibleCode, setVisibleCode] = useState<boolean>(false)
    const [userCode, setUserCode] = useState<string>("")
    const [visibleNotification, setVisibleNotification] = useState<boolean>(false)
    const [visibleNotificationModal, setVisibleNoticationModal] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [listNotifications, setListNotifications] = useState<Array<any>>([])
    const [webview, setWebView] = useState<boolean>(false)
    const [uriWeb, setUriWeb] = useState<string>("")

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        setIsLoading(true)

        const email = user?.emailAddresses[0].emailAddress

        const userData = await handlerUserRequest.getUser(email ? email : "")
        const notificationData = await handlerNotificationRequest.getNotifications("gvinicius")


        if (userData.error.message || notificationData.error.message) {
            return
        }

        console.log(userData.data.content.data[0].code)

        setUserCode(userData.data.content.data[0].code)
        const list = notificationData.data.content.data
        setListNotifications(list)
        setIsLoading(false)
    };

    function onRefresh() {
        fetchData()
    }

    /* if (isLoading) {
        return <HomeLoader />
    } */

    return (
        <Container statusBarBackgroundColor={COLORS.green} styleGeralContainer={{...styles.geralContainer}} style={styles.container} onRefresh={onRefresh} refreshing={refreshing}>
            {visibleNotificationModal
                ?
                <NewNotificationModal setVisibleModal={setVisibleNoticationModal} />
                :
                <></>
            }
            <Link href={"/(public)/profile"}>
                <View style={styles.containerHeader}>
                    <Image
                        placeholder={{ blurhash }}
                        style={styles.userImage}
                        source={"https://picsum.photos/id/103/100/100"}
                        contentFit='cover'
                        transition={1000}
                    />
                    <View style={styles.containerUserInfo}>
                        <Text style={{ ...stylePattern.subTitle, color: COLORS.background, fontWeight: "bold" }}>
                            {user?.firstName}
                        </Text>
                        <Pressable onPress={() => setVisibleCode(!visibleCode)} style={styles.toggleUserCode}>
                            <Ionicons name={visibleCode ? "eye" : "eye-off"} size={CONSTANTS.fontLarge} color={COLORS.background} />
                            <Text style={{ ...stylePattern.subTitle, color: COLORS.background }}>
                                {visibleCode ? userCode : "********"}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Link>
            <View style={styles.containerHome}>
                <View style={styles.containerNotification}>
                    <Pressable style={styles.toggleNotification} onPress={() => setVisibleNotification(!visibleNotification)}>
                        <Text style={{ ...stylePattern.subTitle, fontWeight: "bold" }}>
                            Autocuidado
                        </Text>
                        <Ionicons name={visibleNotification ? "chevron-up-outline" : "chevron-down-outline"} size={CONSTANTS.fontLarge} color={COLORS.foreground} />
                    </Pressable>
                    <Button onPress={() => setVisibleNoticationModal(true)}>
                        Criar nova notificação
                    </Button>
                    {
                        listNotifications?.length > 0 && visibleNotification ?
                            listNotifications.map((item) => (
                                <NotificationItem key={item.id} item={item} />
                            ))
                            :
                            ""
                    }
                </View>
                <Division />
                <Text style={{ ...stylePattern.subTitle, fontWeight: "bold" }}>
                    Acompanhamento
                </Text>
                <Division />
                <Text style={{ ...stylePattern.subTitle, fontWeight: "bold" }}>
                    Eventos recomendados
                </Text>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    geralContainer: {
        backgroundColor: COLORS.green
    },
    container: {
        paddingHorizontal: 0,
        justifyContent: "flex-start",
    },
    containerHeader: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: CONSTANTS.paddingLarge,
        paddingBottom: CONSTANTS.paddingMedium,
        gap: CONSTANTS.gapLarge
    },
    containerUserInfo: {
    },
    toggleUserCode: {
        flexDirection: "row",
        gap: CONSTANTS.gapSmall
    },
    containerHome: {
        width: "100%",
        height: "100%",
        padding: CONSTANTS.paddingLarge,
        backgroundColor: COLORS.background,
        borderTopLeftRadius: CONSTANTS.borderRadiusLarge,
        borderTopRightRadius: CONSTANTS.borderRadiusLarge
    },
    containerNotification: {
        gap: CONSTANTS.gapMedium,
    },
    toggleNotification: {
        justifyContent: "space-between",
        flexDirection: "row",
        gap: CONSTANTS.gapSmall,
    },
    userImage: {
        width: 80,
        height: 80,
        borderRadius: CONSTANTS.borderRadiusTotal,
        borderWidth: 4,
        borderColor: COLORS.background,
    },
    containerWebView: {
        width: "100%",
        height: "100%",
    },
    actionBarWebView: {
        width: "100%",
        padding: CONSTANTS.paddingLarge,
        backgroundColor: COLORS.green,
        borderBottomWidth: 2,
        borderColor: COLORS.shadow
    },
    webView: {
        width: "100%",
        height: "100%",
    },
    linkEvents: {

    }
})