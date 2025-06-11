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
                <Text style={stylePattern.paragraph}>de volta 😎</Text>
            </View>
            <View style={styles.containerInput}>
                <Input placeholder="CPF" />
                <Input placeholder="Senha" />
            </View>
            <Link href={"/"} style={styles.containerForgoutPassword}>
                <Text style={stylePattern.paragraph}>
                    Esqueceu a senha?
                </Text>
            </Link>
            <Button>
                <Text style={stylePattern.paragraph}>
                    Enviar
                </Text>
            </Button>
            <Link href={"/(auth)/signup"} replace>
                <Text style={stylePattern.paragraph}>
                    Não é cadastrado? Cadastre-se
                </Text>
            </Link>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Constants.paddingHigh,
        gap: Constants.gapHigh,
    },
    containerTitle: {
        alignItems: "center",
        marginBottom: Constants.paddingHigh
    },
    containerInput: {
        width: "100%",
        gap: Constants.gapHigh
    },
    containerForgoutPassword: {
        width: "100%",
        paddingHorizontal: Constants.paddingHigh,
        textAlign: "right"
    }
})