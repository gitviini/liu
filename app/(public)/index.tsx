import Container from "@/components/Container"
import { Link } from "expo-router"

import { useEffect, useState } from "react";
import * as handlerApiRequest from "@/api/NotificationService"
import { View, Text, StyleSheet } from "react-native";
import NotificationItem from "@/components/NotificationItem";

export default function Home() {
    const [listNotifications, setListNotifications] = useState<Array<any>>([])

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const { data, error } = await handlerApiRequest.getNotifications("gvinicius")
        if (error.message) {
            console.log(error.message)
            return
        }

        const list = data.content.data
        setListNotifications(list)
    };

    return (
        <Container>
            <Link href={"/(public)/profile"}>Perfil</Link>
            {
                listNotifications.map((item) => (
                    <NotificationItem key={item.id} item={item}/>
                ))
            }
        </Container>
    )
}

const styles = StyleSheet.create({
    containerNotification: {

    }
})