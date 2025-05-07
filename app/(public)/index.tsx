import Container from "@/components/Container"
import { Link } from "expo-router"
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import * as handlerApiRequest from "@/api/NotificationService"
import { View, Text, StyleSheet, Pressable } from "react-native";
import NotificationItem from "@/components/NotificationItem";
import HomeLoader from "@/components/Loaders/HomeLoader";
import Division from "@/components/Division";
import COLORS from "@/contants/colors";
import CONSTANTS from "@/contants/constants";
import { stylePattern } from "@/contants/stylePattern";
import { Ionicons } from "@expo/vector-icons";
const blurhash = 'L2PQ4}xu#ixu~qt7%MoL,,axwtax'

export default function Home() {
    const [visibleCode, setVisibleCode] = useState<boolean>(false)
    const [visibleNotification, setVisibleNotification] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [listNotifications, setListNotifications] = useState<Array<any>>([])

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true)

        const { data, error } = await handlerApiRequest.getNotifications("gvinicius")

        const list = data.content.data
        console.log(list)
        setListNotifications(list)
    };

    /* if (isLoading) {
        return <HomeLoader />
    } */

    return (
        <Container statusBarBackgroundColor={COLORS.green} styleGeralContainer={styles.geralContainer} style={styles.container}>
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
                            Vinicius Gabriel
                        </Text>
                        <Pressable onPress={() => setVisibleCode(!visibleCode)} style={styles.toggleUserCode}>
                            <Ionicons name={visibleCode ? "eye" : "eye-off"} size={CONSTANTS.fontLarge} color={COLORS.background} />
                            <Text style={{ ...stylePattern.subTitle, color: COLORS.background }}>
                                {visibleCode ? "123345ABC" : "****"}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Link>
            <View style={styles.containerHome}>
                <View style={styles.containerNotification}>
                    <Pressable style={styles.toggleNotification} onPress={()=>setVisibleNotification(!visibleNotification)}>
                        <Text style={{ ...stylePattern.subTitle, fontWeight: "bold" }}>
                            Cronograma
                        </Text>
                        <Ionicons name={visibleNotification ? "chevron-up-outline" : "chevron-down-outline"} size={CONSTANTS.fontLarge} color={COLORS.foreground} />
                    </Pressable>
                    {
                        listNotifications.length > 0 && visibleNotification?
                            listNotifications.map((item) => (
                                <NotificationItem key={item.id} item={item} />
                            ))
                            :
                            ""
                    }
                    <Division />
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
})