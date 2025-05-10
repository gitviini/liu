import { View, Text, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Picker } from '@react-native-picker/picker';
import { Image } from 'expo-image';
import * as handlerUserRequest from "@/api/UserService"
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
    const [userCep, setUserCep] = useState<string>("")
    const [userDCNT, setUserDCNT] = useState<string>("Diabetes")
    const [userNeighborhood, setUserNeighborhood] = useState<string>("")
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
                firstName: userName,
                emailAddress: userEmail,
                password: userPassword,
            })

            const { data, error } = await handlerUserRequest.postUser({
                type: userType,
                code: userEmail,
                code_connected: "",
                cep: userCep,
                dcnt: userDCNT,
                neighborhood: userNeighborhood,
            })

            if (error.message) {
                console.log(error.message ? error.content : data.content)
            }
            else {
                // Send user an email with verification code
                await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
                setPendingVerification(true)
            }

            // Set 'pendingVerification' to true to display second form
            // and capture OTP code
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

            await setActive({ session: signUpAttempt.createdSessionId })

            if (signUpAttempt.status === 'complete') {
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
            <Container styleGeralContainer={{ backgroundColor: COLORS.lightGreen }}>
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
                    <>
                        <Text style={{ ...stylePattern.subTitle, textAlign: "center" }}>
                            Verifique o código enviado para{"\n"}{userEmail}
                        </Text>
                        <Button onPress={onVerifyPress}>
                            Verificar
                        </Button>
                    </>
                }
            </Container>
        )
    }

    return (
        <Container styleGeralContainer={{ backgroundColor: COLORS.lightGreen }}>
            <View style={{ ...stylePattern.containerTitle, flexDirection: "row", alignItems: "center" }}>
                <Image
                    source={require("@/assets/images/favicon.png")}
                    style={{ width: 100, height: 100 }}
                    contentFit='contain'
                />
                <View>
                    <Text style={stylePattern.title}>
                        Seja bem vindo
                    </Text>
                    <Text style={stylePattern.paragraph}>
                        Vem fazer parte
                    </Text>
                </View>
            </View>
            <Input placeholder="Nome" onChangeText={setUserName} value={userName} />
            <Input placeholder="Email" onChangeText={setUserEmail} value={userEmail} />
            <Input placeholder="Bairro" onChangeText={setUserNeighborhood} value={userNeighborhood} />
            <Input placeholder="CEP" onChangeText={setUserCep} value={userCep} />
            <View style={stylePattern.containerPicker}>
                <Picker
                    style={stylePattern.picker}
                    selectionColor={COLORS.white}
                    selectedValue={userType}
                    onValueChange={(value, index) =>
                        setUserType(value)
                    }>
                    <Picker.Item label="Paciente" value="Paciente" />
                    <Picker.Item label="Colaborador" value="Colaborador" />
                    <Picker.Item label="eMulti" value="eMulti" />

                </Picker>
            </View>
            {userType == "Paciente" ?
                <View style={stylePattern.containerPicker}>
                    <Picker
                        style={stylePattern.picker}
                        selectionColor={COLORS.white}
                        selectedValue={userDCNT}
                        onValueChange={(value, index) =>
                            setUserDCNT(value)
                        }>
                        <Picker.Item label="Hipertensão" value="Hipertensão" />
                        <Picker.Item label="Diabetes" value="Diabetes" />
                        <Picker.Item label="Diabetes e hipertensão" value="Diabetes e hipertensão" />
                    </Picker>
                </View>
                :
                <></>
            }
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