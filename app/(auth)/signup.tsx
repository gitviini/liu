import Container from "@/components/Container"
import { View, Text, StyleSheet } from "react-native"
import Button from "@/components/Button"
import Input from "@/components/Input"
import Constants from "@/constants/Constants"
import { Link } from "expo-router"
import { stylePattern } from "@/constants/stylePattern"
import BackButton from "@/components/BackButton"


export default function Login() {
    return (
        <Container style={styles.container}>
            <BackButton href={"/"}/>
            <View style={styles.containerTitle}>
                <Text style={stylePattern.title}>Bem vindo</Text>
                <Text style={stylePattern.paragraph}>Vem fazer parte 😉</Text>
            </View>
            <View style={styles.containerInput}>
                <Input placeholder="CPF" />
                <Input placeholder="Senha" />
                <Input placeholder="Confirmar senha" />
            </View>
            <Button>
                <Text style={stylePattern.paragraph}>
                    Enviar
                </Text>
            </Button>
            <Link href={"/(auth)/login"} replace>
                <Text style={stylePattern.paragraph}>
                    Já é cadastrado? Entrar
                </Text>
            </Link>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Constants.paddingHigh,
        gap: Constants.gapHigh
    },
    containerTitle: {
        alignItems: "center",
        marginBottom: Constants.paddingHigh
    },
    containerInput: {
        width: "100%",
        gap: Constants.gapHigh
    }
})