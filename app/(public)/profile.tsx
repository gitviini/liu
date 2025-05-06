import { useClerk } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { View, Text, StyleSheet } from "react-native"
import { Image } from 'expo-image';
import { useState } from 'react';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { stylePattern } from '@/contants/stylePattern';
import { ConnectedUserType } from '@/types/ConnectedUserType';
import Container from "@/components/Container";
import Button from '@/components/Button'
import CONSTANTS from '@/contants/constants';
import COLORS from '@/contants/colors';
import Division from '@/components/Division';
import ConnectedUserItem from '@/components/ConnectedUserItem';
import Input from '@/components/Input';

const blurhash = 'L2PQ4}xu#ixu~qt7%MoL,,axwtax'

const connectedUserList: Array<ConnectedUserType> = [
    {
        id: "0",
        name: "Luis Guilherme",
        codigo: "123345567"
    }
]

export default function Profile() {
    const [userName, setUserName] = useState<string>("User Name")
    const [userCode, setUserCode] = useState<string>("User code")

    const router = useRouter()
    // Use `useClerk()` to access the `signOut()` function
    const { signOut } = useClerk()
    const handleSignOut = async () => {
        try {
            await signOut()
            // Redirect to your desired page
            router.replace("/")

        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }
    return (
        <Container statusBarBackgroundColor={COLORS.green} styleGeralContainer={styles.geralContainer} style={styles.container}>
            <View style={styles.containerProfile}>
                <View style={styles.containerUserImage}>
                    <Image
                        placeholder={{ blurhash }}
                        style={styles.userImage}
                        source={"https://picsum.photos/id/64/100/100"}
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
                        Código de compartilhamento
                    </Text>
                    <Input onChangeText={setUserCode} value={userCode} />
                </View>
                <Division />
                <View style={styles.containerConnectedUserList}>
                    <Text style={{ ...stylePattern.subTitle }}>
                        <Ionicons name={"person"} /> Usuários conectados
                    </Text>
                    {
                        connectedUserList.map(
                            (item) => <ConnectedUserItem key={item.id} item={item} />
                        )
                    }
                </View>
                <Division />
                <View style={styles.containerAccountOptions}>
                    <Text style={stylePattern.subTitle}>
                        <Ionicons name={'cog'} /> Opções da conta
                    </Text>
                    <Button styleButton={styles.logoutAccountButton} styleTextButton={styles.logoutAccountTextButton} onPress={handleSignOut}>
                        Desconectar conta
                    </Button>
                    <Button styleButton={styles.deleteAccountButton}>
                        Deletar conta
                    </Button>
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
        justifyContent: "flex-start",
        alignItems: "stretch",
        padding: 0,
        paddingTop: 70
    },
    containerProfile: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: CONSTANTS.paddingLarge,
        paddingTop: 70,
        gap: CONSTANTS.gapLarge,
        borderTopLeftRadius: CONSTANTS.borderRadiusLarge,
        borderTopRightRadius: CONSTANTS.borderRadiusLarge
    },
    containerUserInfo: {
        width: "100%",
        gap: CONSTANTS.gapMedium
    },
    containerUserImage: {
        position: "absolute",
        justifyContent: "flex-end",
        margin: -50,
    },
    containerConnectedUserList: {
        width: "100%",
        gap: CONSTANTS.gapMedium
    },
    containerAccountOptions: {
        width: "100%",
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