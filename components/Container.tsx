import { ReactNode } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView, View, StyleSheet, ViewStyle, StatusBar} from "react-native"
import Colors from "@/constants/Colors"

export default function Container({ children, style }: { children?: ReactNode, style?: ViewStyle }) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Colors.light.background} />
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={{...styles.containerView, ...style}}>
                    {children}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.light.background,
    }
})