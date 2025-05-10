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
import notificationHandler from "@/services/NotificationService";
import hyperLinks from "@/contants/hyperLinks";
import Input from "@/components/Input";
const blurhash = 'L2PQ4}xu#ixu~qt7%MoL,,axwtax'

export default function EMulti({userCode}:{userCode:string }) {
    const { isSignedIn, user, isLoaded } = useUser();

    const [afericao, setAfericao] = useState<string>("12/8")
    const [showAfericao, setShowAfericao] = useState<boolean>(false)
    const [commentAfericao, setCommentAfericao] = useState<string>("Pressão normal")
    const [userType, setUserType] = useState<string>("")
    const [userInfo, setUserInfo] = useState<any>("")
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [visibleCode, setVisibleCode] = useState<boolean>(false)
    const [visibleNotificationModal, setVisibleNoticationModal] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [listNotifications, setListNotifications] = useState<Array<any>>([])
    const [webview, setWebView] = useState<boolean>(false)
    const [uriWeb, setUriWeb] = useState<string>("")

    useEffect(() => {
        fetchData();
    }, []);

    const feedBackAfericao = () => {
        let result: Array<string> = afericao.split("/")
        let tratament = result.map((item) => (Number(item)))

        if (tratament[0] <= 9 && tratament[1] <= 6) {
            setCommentAfericao("Pressão baixa\nVerifique sua glicose")
        }
        else if (tratament[0] <= 12 && tratament[1] <= 8) {
            setCommentAfericao("Pressão normal\nContiue assim")
        }
        else if (tratament[0] <= 13.9 && tratament[1] <= 8.9) {
            setCommentAfericao("Pressão um pouco alta\nVerifique a medicação")
        }
        else {
            setCommentAfericao("Pressão alta\nProcure um médico")
        }
        console.log(tratament)
    }


    const fetchData = async () => {
        setIsLoading(true)

        const userData = await handlerUserRequest.getUser(userCode)
        const notificationData = await handlerNotificationRequest.getNotifications(userCode)

        if (userData.error.message || notificationData.error.message) {
            return
        }

        setUserInfo(userData.data.content.data[0])
        console.log(userData.data.content.data[0].code)
        setUserType(userData.data.content.data[0].type)
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
        <>
            {visibleNotificationModal
                ?
                <NewNotificationModal fetchData={fetchData} author_code={user?.emailAddresses[0].emailAddress} setVisibleModal={setVisibleNoticationModal} />
                :
                <></>
            }
            <Container statusBarBackgroundColor={COLORS.green} styleGeralContainer={styles.geralContainer} style={styles.container} onRefresh={onRefresh} refreshing={refreshing}>
                <Link href={"/(public)/profile"}>
                    <View style={styles.containerHeader}>
                        <Image
                            placeholder={{ blurhash }}
                            style={styles.userImage}
                            source={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUVhBj0u9z6lQbhAWuzoiJpU7Jgf6Vmq2qvg&s"}
                            contentFit='cover'
                            transition={1000}
                        />
                        <View style={styles.containerUserInfo}>
                            <Text style={{ ...stylePattern.title, color: COLORS.background, fontWeight: "bold" }}>
                                <Text style={{ fontWeight: "300" }}>Acompanhando</Text>{"\n" + userInfo.name}
                            </Text>
                            <Text style={{ ...stylePattern.paragraph, color: COLORS.background }}>
                                ~ {userInfo.dcnt}
                            </Text>
                        </View>
                    </View>
                </Link>
                <View style={styles.containerHome}>
                    <View style={{ width: "100%", justifyContent:"space-between", gap: CONSTANTS.gapMedium,}}>
                        <View style={styles.containerNotification}>
                            <View style={{
                                flex: 1,
                                backgroundColor: COLORS.white,
                                borderRadius: CONSTANTS.borderRadiusLarge,
                                boxShadow: CONSTANTS.boxShadow,
                                padding: CONSTANTS.paddingMedium,
                                gap: CONSTANTS.gapMedium,
                                marginBottom: CONSTANTS.paddingMedium,
                            }}>
                                <Text style={{ ...stylePattern.paragraph, borderRadius: CONSTANTS.borderRadiusHalfLarge, color: COLORS.foreground, textAlign: "center", padding: CONSTANTS.paddingMedium, backgroundColor: COLORS.lightGreen }}>
                                    <Text style={{ fontWeight: "bold" }}>{afericao}</Text> mmHg
                                </Text>
                                <Text style={{ ...stylePattern.paragraph, textAlign: "center" }}>{commentAfericao}</Text>

                                {showAfericao &&
                                    <Input placeholder="Quanto está sua pressão?" onChangeText={setAfericao} value={afericao} />
                                }

                                <View style={{ flexDirection: "row",gap: CONSTANTS.gapMedium }}>
                                    {!showAfericao &&
                                        <>
                                            <Button onPress={() => {
                                                setShowAfericao(true)
                                                showAfericao && feedBackAfericao()
                                            }} styleButton={{ flex: 1 }}>
                                                Aferir
                                            </Button>
                                            <Button onPress={() => {
                                            }} styleButton={{ flex: 1 }}>
                                                Ver aferições
                                            </Button>
                                        </>
                                    }
                                    {showAfericao &&
                                        <>
                                            <Button onPress={() => {
                                                feedBackAfericao()
                                            }} styleButton={{ flex: 1 }}>
                                                Enviar
                                            </Button>
                                            <Button onPress={() => setShowAfericao(false)} styleButton={{ backgroundColor: COLORS.red, flex: 1 }}>
                                                Cancelar
                                            </Button>
                                        </>
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={styles.containerNotification}>
                            <View style={{
                                flex: 1,
                                backgroundColor: COLORS.white,
                                borderRadius: CONSTANTS.borderRadiusLarge,
                                boxShadow: CONSTANTS.boxShadow,
                                padding: CONSTANTS.paddingMedium,
                                gap: CONSTANTS.gapMedium,
                                marginBottom: CONSTANTS.paddingMedium,
                            }}>
                                <Text style={{ ...stylePattern.paragraph, borderRadius: CONSTANTS.borderRadiusHalfLarge, color: COLORS.foreground, textAlign: "center", padding: CONSTANTS.paddingMedium, backgroundColor: COLORS.yellow }}>
                                    <Text style={{ fontWeight: "bold" }}>8/10</Text>
                                </Text>
                                <Text style={{ ...stylePattern.paragraph, textAlign: "center" }}>Medicações semanais</Text>
                            </View>
                        </View>
                    </View>
                    <Division />
                    <View style={styles.containerNotification}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: CONSTANTS.gapSmall }}>
                            <Text style={{ ...stylePattern.subTitle, fontWeight: "bold" }}>
                                Rotina e medicamentos
                            </Text>
                            <Division horizontal={true} />
                            <Text style={stylePattern.subTitle}>
                                {listNotifications.filter((item) => item.type == "acompanhamento").length}
                            </Text>
                        </View>
                        <Button>Editar</Button>
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
                            Plataformas auxiliares
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
                    <Division />
                    <Button onPress={() => notificationHandler({ title: "olá", body: "Oi" })}>
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