import { useState } from 'react'
import { useSignIn } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'
import Container from "@/components/Container"
import Input from "@/components/Input"
import Button from "@/components/Button"
import { stylePattern } from '@/contants/stylePattern'

export default function Login() {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()

    const [userEmail, setUserEmail] = useState<string>("")
    const [userPassword, setUserPassword] = useState<string>("")


    // Handle the submission of the sign-in form
    const onSignInPress = async () => {
        if (!isLoaded) return

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: userEmail,
                password: userPassword,
            })

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/')
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }


    return (
        <Container>
            <View style={{ ...stylePattern.containerTitle, alignItems: "center" }}>
                <Text style={stylePattern.title}>
                    Bem vindo
                </Text>
                <Text style={stylePattern.paragraph}>
                    de volta 😎
                </Text>
            </View>
            <Input placeholder="Email" onChangeText={setUserEmail} value={userEmail}/>
            <Input placeholder="Senha" onChangeText={setUserPassword} value={userPassword} secureTextEntry={true}></Input>
            <Text style={{ ...stylePattern.link, width: "100%", textAlign: "right" }} onPress={() => router.replace("/(auth)/forgout")}>
                Esqueceu a senha?
            </Text>
            <Button onPress={onSignInPress}>Entrar</Button>
            <Text style={stylePattern.link} onPress={() => router.replace("/(auth)/signup")}>
                Não é cadastrado? Cadastre-se.
            </Text>
        </Container>
    )
}