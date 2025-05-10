import Container from "@/components/Container"
import { Link } from "expo-router"
import { Image } from "expo-image";
import WebView from "react-native-webview";
import { useEffect, useState } from "react";
import * as handlerNotificationRequest from "@/api/NotificationService"
import * as handlerUserRequest from "@/api/UserService"
import { View, Text, StyleSheet, Pressable, ScrollView, TouchableOpacity } from "react-native";
import HomeLoader from "@/components/Loaders/HomeLoader";
import { useUser } from "@clerk/clerk-expo";
import Division from "@/components/Division";
import COLORS from "@/contants/colors";
import CONSTANTS from "@/contants/constants";
import { stylePattern } from "@/contants/stylePattern";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/Button";
import notificationHandler from "@/services/NotificationService";
import hyperLinks from "@/contants/hyperLinks";
import User from "@/components/User";
import UserItem from "@/components/UserItem";
import Input from "@/components/Input";
const blurhash = 'L2PQ4}xu#ixu~qt7%MoL,,axwtax'

export default function Home() {
    const { isSignedIn, user, isLoaded } = useUser();

    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [visibleCode, setVisibleCode] = useState<boolean>(false)
    const [userCode, setUserCode] = useState<string>("")
    const [userType, setUserType] = useState<string>("")
    const [userNeighborhood, setUserNeighborhood] = useState<string>("")
    const [visibleNotificationModal, setVisibleNoticationModal] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [listUsers, setListUsers] = useState<Array<any>>([])
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
        const users = await handlerUserRequest.getUserByNeighborhood(userData.data.content.data[0].neighborhood)
        if (userData.error.message || notificationData.error.message) {
            return
        }

        setUserCode(userData.data.content.data[0].code)
        setUserType(userData.data.content.data[0].type)
        setUserNeighborhood(userData.data.content.data[0].neighborhood)

        setListUsers(users.data.content.data)
        setIsLoading(false)
    };

    function onRefresh() {
        fetchData()
    }

    if (isLoading) {
        return <HomeLoader />
    }

    if (userType == "Paciente") {
        return <User />
    }

    return (
        <>
            <Container statusBarBackgroundColor={COLORS.green} styleGeralContainer={styles.geralContainer} style={styles.container} onRefresh={onRefresh} refreshing={refreshing}>
                <Link href={"/(public)/profile"}>
                    <View style={styles.containerHeader}>
                        <Image
                            placeholder={{ blurhash }}
                            style={styles.userImage}
                            source={"https://upload.wikimedia.org/wikipedia/commons/0/0e/Doutor_Franscisco_%28Tratadas_FULL%29_%286%29_copiar.jpg"}
                            contentFit='cover'
                            transition={1000}
                        />
                        <View style={styles.containerUserInfo}>
                            <Text style={{ ...stylePattern.title, color: COLORS.background, fontWeight: "bold" }}>
                                <Text style={{ fontWeight: "300" }}>Doutor,</Text> {user?.firstName}
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
                    <View style={{ flexDirection: "row", alignItems: "center", gap: CONSTANTS.gapSmall }}>
                        <Ionicons name="location-outline" size={CONSTANTS.fontLarge} />
                        <Text style={stylePattern.subTitle}>{userNeighborhood}</Text>
                    </View>
                    <Division />
                    <View style={styles.containerNotification}>
                        <Text style={stylePattern.subTitle}>
                            Consultar dados do paciente
                        </Text>
                        <Input placeholder="#Código" />
                        <Text style={stylePattern.subTitle}>
                            Filtros <Ionicons name="chevron-down" />
                        </Text>
                        <Input placeholder="Bairro" />
                        <Input placeholder="Situação (Vermelho, Amarelo, Verde)" />
                        <Input placeholder="Tipo (Diabético e/ou Hipertenso)" />
                        <Button>Pesquisar</Button>
                    </View>
                    <Division />
                    <View style={styles.containerNotification}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: CONSTANTS.gapSmall }}>
                            <Text style={{ ...stylePattern.subTitle, fontWeight: "bold" }}>
                                Pacientes
                            </Text>
                            <Division horizontal={true} />
                            <Text style={stylePattern.subTitle}>
                                {listUsers.length}
                            </Text>
                        </View>
                        <ScrollView horizontal={true} style={stylePattern.scrollHorizontal}>
                            {
                                listUsers?.length > 0 ?
                                    listUsers.map((item) => (
                                        item.state == "vermelho" &&
                                        <Link href={{
                                            pathname: "/(public)/modal",
                                            params: {
                                                type: userType,
                                                userCode: item.code,
                                            }
                                        }}
                                            asChild
                                            key={item.id}
                                        >
                                            <TouchableOpacity>
                                                <UserItem item={item} />
                                            </TouchableOpacity>
                                        </Link>
                                    ))
                                    :
                                    ""
                            }
                            {
                                listUsers?.length > 0 ?
                                    listUsers.map((item) => (
                                        item.state == "amarelo" &&
                                        <Link href={{
                                            pathname: "/(public)/modal",
                                            params: {
                                                type: userType,
                                                userCode: item.code,
                                            }
                                        }}
                                            asChild
                                            key={item.id}
                                        >
                                            <TouchableOpacity>
                                                <UserItem item={item} />
                                            </TouchableOpacity>
                                        </Link>
                                    ))
                                    :
                                    ""
                            }
                            {
                                listUsers?.length > 0 ?
                                    listUsers.map((item) => (
                                        item.state == "verde" &&
                                        <Link href={{
                                            pathname: "/(public)/modal",
                                            params: {
                                                type: userType,
                                                userCode: item.code,
                                            }
                                        }}
                                            asChild
                                            key={item.id}
                                        >
                                            <TouchableOpacity>
                                                <UserItem item={item} />
                                            </TouchableOpacity>
                                        </Link>
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
                                <Link
                                    href={{
                                        pathname: "/(public)/web",
                                        params: {uri: item.uri},
                                    }}
                                    asChild
                                    key={item.id}
                                >
                                    <TouchableOpacity
                                        style={styles.hyperLinkEvents}
                                    >
                                        <Image
                                            contentFit="contain"
                                            style={styles.hyperLinksImage}
                                            source={item.image}
                                        />
                                        <Text style={stylePattern.subTitle}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                </Link>
                            ))
                            }
                        </View>
                    </View>
                    <Division />
                    <Button onPress={() => notificationHandler({ title: "Aviso", body: "Paciente (Hugo) está com pressão de 14/8 mmHg" })}>
                        Noticação
                    </Button>
                </View>
            </Container>
        </>
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