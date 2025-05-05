import { ReactNode } from "react"
import { ScrollView, StatusBar, StyleSheet, View, ViewStyle } from "react-native"
import BackButton from '@/components/BackButton'
import COLORS from "@/contants/colors"
import CONSTANTS from "@/contants/constants"

export default function Container({ children, style }: { children?: ReactNode, style?: ViewStyle }) {
    return (
        <View style={styles.geralContainer}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <StatusBar backgroundColor={COLORS.background} />
                <BackButton />
                <View style={{ ...styles.container, ...style }}>
                    {children}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1
    },
    geralContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: CONSTANTS.paddingLarge,
        gap: CONSTANTS.gapLarge,
    },
})