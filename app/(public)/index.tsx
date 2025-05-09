import Container from "@/components/Container"
import { Link } from "expo-router"
import { Image } from "expo-image";
import WebView from "react-native-webview";
import { useEffect, useState } from "react";
import * as handlerNotificationRequest from "@/api/NotificationService"
import * as handlerUserRequest from "@/api/UserService"
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
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
import hyperLinks from "@/contants/hyperLinks";
const blurhash = 'L2PQ4}xu#ixu~qt7%MoL,,axwtax'

export default function Home() {
    const { isSignedIn, user, isLoaded } = useUser();

    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [visibleCode, setVisibleCode] = useState<boolean>(false)
    const [userCode, setUserCode] = useState<string>("")
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

        const userData = await handlerUserRequest.getUser(email || "")
        const notificationData = await handlerNotificationRequest.getNotifications(email || "")


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

    if (isLoading) {
        return <HomeLoader />
    }

    return (
        <Container statusBarBackgroundColor={COLORS.green} styleGeralContainer={styles.geralContainer} style={styles.container} onRefresh={onRefresh} refreshing={refreshing}>
            {visibleNotificationModal
                ?
                <NewNotificationModal fetchData={fetchData} author_code={user?.emailAddresses[0].emailAddress} setVisibleModal={setVisibleNoticationModal} />
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
                        <Text style={{ ...stylePattern.title, color: COLORS.background, fontWeight: "bold" }}>
                            <Text style={{ fontWeight: "300" }}>Olá,</Text> {user?.firstName}
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
                    <View style={{ flexDirection: "row", alignItems: "center", gap: CONSTANTS.gapSmall }}>
                        <Text style={{ ...stylePattern.subTitle, fontWeight: "bold" }}>
                            Acompanhamento
                        </Text>
                        <Division horizontal={true} />
                        <Text style={stylePattern.subTitle}>
                            {listNotifications.filter((item) => item.type == "acompanhamento").length}
                        </Text>
                    </View>
                    <ScrollView horizontal={true} style={stylePattern.scrollHorizontal}>
                        {
                            listNotifications?.length > 0 ?
                                listNotifications.map((item) => (
                                    item.type == "acompanhamento" &&
                                    <NotificationItem style={{ backgroundColor: COLORS.yellow }} fetchData={fetchData} key={item.id} item={item} />
                                ))
                                :
                                ""
                        }
                    </ScrollView>
                </View>
                <Division />
                <View style={styles.containerNotification}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: CONSTANTS.gapSmall }}>
                        <Text style={{ ...stylePattern.subTitle, fontWeight: "bold" }}>
                            Autocuidado
                        </Text>
                        <Division horizontal={true} />
                        <Text style={stylePattern.subTitle}>
                            {listNotifications.filter((item) => item.type == "autocuidado").length}
                        </Text>
                    </View>
                    <Button onPress={() => setVisibleNoticationModal(true)}>
                        Criar nova notificação
                    </Button>
                    <ScrollView horizontal={true} style={stylePattern.scrollHorizontal}>
                        {
                            listNotifications?.length > 0 ?
                                listNotifications.map((item) => (
                                    item.type == "autocuidado" &&
                                    <NotificationItem fetchData={fetchData} key={item.id} item={item} />
                                ))
                                :
                                ""
                        }
                    </ScrollView>
                </View>
                <Division />
                <View style={styles.containerNotification}>
                    <Text style={{ ...stylePattern.subTitle, fontWeight: "bold" }}>
                        Eventos e Conectando-se
                    </Text>
                    <View style={styles.containerhyperLinkEvents}>
                        {hyperLinks.map((item) => (
                            <Pressable
                                key={item.id}
                                style={styles.hyperLinkEvents}
                                onPress={() => setUriWeb(item.uri)}
                            >
                                <Image
                                    contentFit="contain"
                                    style={styles.hyperLinksImage}
                                    source={item.image}
                                />
                                <Text style={stylePattern.subTitle}>
                                    {item.name}
                                </Text>
                            </Pressable>
                        ))
                        }
                    </View>
                </View>
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
        paddingBottom: 80
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
    containerhyperLinkEvents: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        gap: CONSTANTS.gapLarge,
    },
    hyperLinksImage: {
        width: 100,
        height: 100
    },
    hyperLinkEvents: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: CONSTANTS.paddingLarge,
        boxShadow: CONSTANTS.boxShadow,
        borderRadius: CONSTANTS.borderRadiusMedium,
        gap: CONSTANTS.gapMedium,
        backgroundColor: COLORS.white,
    }
})