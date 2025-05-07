import Container from "@/components/Container"
import { Link } from "expo-router"
import { useEffect, useState } from "react";
import * as handlerApiRequest from "@/api/apiService"
import { View, Text } from "react-native";

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
                    <View key={item.id}>
                        <Text>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Text>{item.date.slice(0,10)} - {item.time}</Text>
                    </View>
                ))
            }
        </Container>
    )
}