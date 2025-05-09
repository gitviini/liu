import { useClerk, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { stylePattern } from '@/contants/stylePattern';
import { ConnectedUserType } from '@/types/ConnectedUserType';
import * as handlerUserRequest from "@/api/UserService"
import Container from "@/components/Container";
import Button from '@/components/Button'
import CONSTANTS from '@/contants/constants';
import COLORS from '@/contants/colors';
import Division from '@/components/Division';
import ConnectedUserItem from '@/components/ConnectedUserItem';
import Input from '@/components/Input';

const blurhash = 'L2PQ4}xu#ixu~qt7%MoL,,axwtax'

export default function Profile() {
    const { isSignedIn, user, isLoaded } = useUser();

    const [saveUserLoading, setSaveUserLoading] = useState<boolean>(false)
    const [desconnectAccountLoading, setDesconnectAccountLoading] = useState<boolean>(false)
    const [deleteAccountLoading, setDeleteAccountLoading] = useState<boolean>(false)

    const [userName, setUserName] = useState<string>("...")
    const [userType, setUserType] = useState<string>("Paciente")
    const [userCode, setUserCode] = useState<string>("...")
    const [connectedUsersList, setConnectedUserList] = useState<Array<ConnectedUserType>>([])
    const [userCep, setUserCep] = useState<string>("...")
    const [userDCNT, setUserDCNT] = useState<string>("...")
    const [userNeighborhood, setUserNeighborhood] = useState<string>("...")

    useEffect(() => {
        fetchData()
    }, [])

    async function handlerSaveUser() {
        setSaveUserLoading(true)
        const userData = {
            code: userCode,
            type: userType,
            code_connected: "",
            cep: userCep,
            dcnt: userDCNT,
            neighborhood: userNeighborhood,
        }
        const { data, error } = await handlerUserRequest.uploadUser(userData)

        if (error.message) {
            console.log(error.message)
        } else {
            console.log(data.content.data)
        }
        setSaveUserLoading(false)
    }

    async function fetchData() {
        if (!isLoaded) return

        const userData = await handlerUserRequest.getUser(user?.emailAddresses[0].emailAddress || '')

        setUserName(user?.firstName ? user?.firstName : "")
        setUserType(userData.data?.content.data[0].type)
        setUserCode(userData.data.content.data[0].code)
        setUserCep(userData.data.content.data[0].cep)
        setUserDCNT(userData.data.content.data[0].dcnt)
        setUserNeighborhood(userData.data.content.data[0].neighborhood)
    }

    const router = useRouter()
    // Use `useClerk()` to access the `signOut()` function
    const { signOut } = useClerk()
    const handleSignOut = async () => {
        try {
            setDesconnectAccountLoading(true)
            await signOut()
            setDesconnectAccountLoading(false)
            // Redirect to your desired page
            router.replace("/")

        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }

    async function deleteUser() {
        setDeleteAccountLoading(true)
        const { data, error } = await handlerUserRequest.deleteUser({ code: userCode })
        if (error.message) {
            console.error(error.content)
            return
        }
        await user?.delete()
        setDeleteAccountLoading(false)
    }
    return (
        <Container statusBarBackgroundColor={COLORS.green} styleGeralContainer={styles.geralContainer} style={styles.container}>
            <View style={styles.containerProfile}>
                <View style={styles.containerUserImage}>
                    <Image
                        placeholder={{ blurhash }}
                        style={styles.userImage}
                        source={"https://picsum.photos/id/103/100/100"}
                        contentFit='cover'
                        transition={1000}
                    />
                    <Ionicons name='camera' style={styles.editImage} size={CONSTANTS.fontLarge} color={COLORS.foreground} />
                </View>
                <View style={styles.containerUserInfo}>
                    <Text style={stylePattern.subTitle}>
                        Nome de usuário
                    </Text>
                    <Input onChangeText={setUserName} value={userName} />
                    <Text style={stylePattern.subTitle}>
                        Tipo de usuário
                    </Text>
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
                            <Picker.Item label="Profissional" value="Profissional" />

                        </Picker>
                    </View>
                    {userType == "Paciente"
                        ?
                        <>
                            <Text style={stylePattern.subTitle}>
                                DCNT
                            </Text>
                            <Input onChangeText={setUserDCNT} value={userDCNT} styleInput={{ textAlign: "left" }} />
                        </>
                        :
                        <></>
                    }
                    <Text style={stylePattern.subTitle}>
                        Código de compartilhamento
                    </Text>
                    <Input onChangeText={setUserCode} value={userCode} styleInput={{ textAlign: "left" }} />
                    <Text style={stylePattern.subTitle}>
                        CEP
                    </Text>
                    <Input onChangeText={setUserCep} value={userCep} styleInput={{ textAlign: "left" }} />
                    <Text style={stylePattern.subTitle}>
                        Bairro
                    </Text>
                    <Input onChangeText={setUserNeighborhood} value={userNeighborhood} styleInput={{ textAlign: "left" }} />
                </View>
                <Division />
                <View style={styles.containerConnectedUserList}>
                    <Text style={{ ...stylePattern.subTitle }}>
                        <Ionicons name={"person"} /> Usuários conectados
                    </Text>
                    {
                        connectedUsersList.length > 0
                        ?
                        connectedUsersList.map(
                            (item) => <ConnectedUserItem key={item.id} item={item} />
                        )
                        :
                        <Text style={stylePattern.paragraph}>Nenhum usuário conectado</Text>
                    }
                    <Button>
                        Conectar-se
                    </Button>
                </View>
                <Division />
                <View style={styles.containerAccountOptions}>
                    <Text style={stylePattern.subTitle}>
                        <Ionicons name={'cog'} /> Opções da conta
                    </Text>
                    {saveUserLoading ?
                        <Button styleButton={{ alignSelf: "center", width: "auto" }}>
                            <ActivityIndicator size={CONSTANTS.fontLarge} color={COLORS.background} />
                        </Button>
                        :
                        <Button onPress={() => handlerSaveUser()}>
                            Salvar alterações
                        </Button>
                    }
                    {desconnectAccountLoading ?
                        <Button styleButton={{ ...styles.logoutAccountButton, alignSelf: "center", width: "auto" }}>
                            <ActivityIndicator size={CONSTANTS.fontLarge} color={COLORS.red} />
                        </Button>
                        :
                        <Button styleButton={styles.logoutAccountButton} styleTextButton={styles.logoutAccountTextButton} onPress={handleSignOut}>
                            Desconectar conta
                        </Button>
                    }
                    {deleteAccountLoading ?
                        <Button styleButton={{ ...styles.deleteAccountButton, alignSelf: "center", width: "auto" }}>
                            <ActivityIndicator size={CONSTANTS.fontLarge} color={COLORS.background} />
                        </Button>
                        :
                        <Button styleButton={styles.deleteAccountButton} onPress={() => deleteUser()}>
                            Deletar conta
                        </Button>
                    }
                </View>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    geralContainer: {
        backgroundColor: COLORS.green,
    },
    container: {
        justifyContent: "flex-start",
        alignItems: "stretch",
        alignSelf: "center",
        padding: 0,
        paddingTop: 70,
        width: "100%",
        maxWidth: CONSTANTS.maxWidth,
    },
    containerProfile: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: CONSTANTS.paddingLarge,
        paddingTop: 70,
        gap: CONSTANTS.gapLarge,
        /* borderTopLeftRadius: CONSTANTS.borderRadiusLarge,
        borderTopRightRadius: CONSTANTS.borderRadiusLarge, */
        paddingBottom: 100
    },
    containerUserInfo: {
        width: "100%",
        maxWidth: CONSTANTS.maxWidth,
        gap: CONSTANTS.gapMedium
    },
    containerUserImage: {
        position: "absolute",
        justifyContent: "flex-end",
        margin: -50,
    },
    containerConnectedUserList: {
        width: "100%",
        maxWidth: CONSTANTS.maxWidth,
        gap: CONSTANTS.gapMedium
    },
    containerAccountOptions: {
        width: "100%",
        maxWidth: CONSTANTS.maxWidth,
        gap: CONSTANTS.gapMedium
    },
    editImage: {
        position: "absolute",
        alignSelf: "flex-end",
        margin: -CONSTANTS.paddingSmall,
        zIndex: 99,
        backgroundColor: COLORS.background,
        borderRadius: CONSTANTS.borderRadiusLarge,
        padding: CONSTANTS.paddingSmall
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: CONSTANTS.borderRadiusTotal,
        borderWidth: 4,
        borderColor: COLORS.background,
    },
    logoutAccountButton: {
        backgroundColor: COLORS.background,
        borderWidth: 2,
        borderColor: COLORS.red
    },
    logoutAccountTextButton: {
        color: COLORS.red
    },
    deleteAccountButton: {
        backgroundColor: COLORS.red
    }
})