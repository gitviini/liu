import { View, Text, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Picker } from '@react-native-picker/picker';
import Container from "@/components/Container"
import Input from "@/components/Input"
import Button from "@/components/Button"
import CONSTANTS from '@/contants/constants'
import COLORS from '@/contants/colors'
import { stylePattern } from '@/contants/stylePattern'

export default function Signup() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()

    const [userName, setUserName] = useState<string>("")
    const [userEmail, setUserEmail] = useState<string>("")
    const [userType, setUserType] = useState<string>("Paciente")
    const [userPassword, setUserPassword] = useState<string>("")
    const [pendingVerification, setPendingVerification] = useState<boolean>(false)
    const [confirmCode, setConfirmCode] = useState<string>("")
    const [loadingRequest, setLoadingRequest] = useState<boolean>(false)

    // Handle submission of sign-up form
    const onSignUpPress = async () => {
        if (!isLoaded) return

        // Start sign-up process using email and password provided
        try {
            setLoadingRequest(true)
            await signUp.create({
                username: userName,
                emailAddress: userEmail,
                password: userPassword,
            })

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            // Set 'pendingVerification' to true to display second form
            // and capture OTP code
            setPendingVerification(true)
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.log(JSON.stringify(err, null, 2))
        }
        finally {
            setLoadingRequest(false)
        }
    }

    // Handle submission of verification form
    const onVerifyPress = async () => {
        if (!isLoaded) return

        try {
            setLoadingRequest(true)
            // Use the code the user provided to attempt verification
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code: confirmCode,
            })

            // If verification was completed, set the session to active
            // and redirect the user
            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId })
                router.replace('/')
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.log(JSON.stringify(signUpAttempt, null, 2))
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.log(JSON.stringify(err, null, 2))
        } finally {
            setLoadingRequest(false)
        }
    }

    if (pendingVerification) {
        return (
            <Container>
                <Input
                    placeholder="Coloque o código de confirmação"
                    onChangeText={setConfirmCode}
                    value={confirmCode}
                />
                {loadingRequest
                    ?
                    <Button styleButton={{ width: "auto" }}>
                        <ActivityIndicator size={CONSTANTS.fontLarge} color={COLORS.background} />
                    </Button>
                    :
                    <Button onPress={onVerifyPress}>
                        Verificar
                    </Button>
                }
            </Container>
        )
    }

    return (
        <Container>
            <View style={{ ...stylePattern.containerTitle, alignItems: "center" }}>
                <Text style={stylePattern.title}>
                    Seja bem vindo
                </Text>
                <Text style={stylePattern.paragraph}>
                    Vem fazer parte 😉
                </Text>
            </View>
            <Input placeholder="Nome" onChangeText={setUserName} value={userName} />
            <Input placeholder="Email" onChangeText={setUserEmail} value={userEmail} />
            <View style={{
                backgroundColor: COLORS.white,
                boxShadow: CONSTANTS.boxShadow,
                borderRadius: CONSTANTS.borderRadiusLarge,
                height: 41.5,
                justifyContent: "center",
                overflow: "hidden",
                width: "100%"
            }}>
                <Picker
                    selectedValue={userType}
                    onValueChange={(value, index) =>
                        setUserType(value)
                    }>
                    <Picker.Item label="Paciente" value="Paciente" />
                    <Picker.Item label="Colaborador" value="Colaborador" />
                </Picker>
            </View>
            <Input placeholder="Senha" onChangeText={setUserPassword} value={userPassword} secureTextEntry={true} />
            {loadingRequest
                ?
                <Button styleButton={{ width: "auto" }}>
                    <ActivityIndicator size={CONSTANTS.fontLarge} color={COLORS.background} />
                </Button>
                :
                <Button onPress={onSignUpPress}>Entrar</Button>
            }
            <Text style={stylePattern.link} onPress={() => router.replace("/(auth)/login")}>
                Já é cadastrado? Entrar.
            </Text>
        </Container>
    )
}