import { View, Text, StyleSheet, Pressable } from "react-native"
import Container from "@/components/Container"
import { Image } from "expo-image"
import Constants from "@/constants/Constants"
import Input from "@/components/Input"
import Button from "@/components/Button"
import { stylePattern } from "@/constants/stylePattern"
import * as Lucide from "lucide-react-native"
import Colors from "@/constants/Colors"
import { useState } from "react"
import Separator from "@/components/Separator"

export default function Profile() {
    // user info
    const [userName, setUserName] = useState<string>("Vinicius")
    const [userCpf, setUserCpf] = useState<string>("123.456.789.10")
    const [userPassword, setUserPassword] = useState<string>("12345678")

    return (
        <Container style={styles.container}>
            <View style={styles.containerProfile}>
                <Image
                    style={styles.imageProfile}
                    contentFit="cover"
                    source={"https://images.pexels.com/photos/3789888/pexels-photo-3789888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                />
                <Pressable
                    style={styles.containerIconCamera}
                >
                    <Lucide.Camera />
                </Pressable>
            </View>
            <View style={styles.containerInput}>
                <Text style={styles.inputLabel}>Nome</Text>
                <Input placeholder="Nome" value={userName} onChangeText={setUserName} />
            </View>
            <View style={styles.containerInput}>
                <Text style={styles.inputLabel}>CPF</Text>
                <Input placeholder="CPF" value={userCpf} onChangeText={setUserCpf} />
            </View>
            <View style={styles.containerInput}>
                <Text style={styles.inputLabel}>Senha</Text>
                <Input secureTextEntry placeholder="Senha" value={userPassword} onChangeText={setUserPassword} />
            </View>
            <Separator />
            <Button
                href={"/(pages)/report"}
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: Colors.light.white
                }}
            >
                <Text style={stylePattern.paragraph}>Conexões</Text>
                <Lucide.ChevronRight color={Colors.light.gray} />
            </Button>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        padding: Constants.paddingHigh,
        gap: Constants.gapHigh
    },
    containerProfile: {
        marginTop: Constants.paddingHigh * 2,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        gap: Constants.gapHigh,
    },
    imageProfile: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    containerIconCamera: {
        position: "absolute",
        padding: Constants.paddingMedium,
        borderRadius: Constants.borderRadiusHigh,
        backgroundColor: Colors.light.background,
        transform: [
            { translateX: Constants.paddingMedium },
            { translateY: Constants.paddingMedium }
        ]
    },
    containerInput: {
        width: "100%",
        gap: Constants.gapMedium,
        alignItems: "flex-start",
    },
    inputLabel: {
        ...stylePattern.subtitle,
        marginLeft: Constants.paddingHigh
    }
})