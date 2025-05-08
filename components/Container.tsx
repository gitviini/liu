import { ReactNode, useCallback, useState } from "react"
import { ColorValue, RefreshControl, ScrollView, StatusBar, StyleSheet, View, ViewStyle } from "react-native"
import BackButton from '@/components/BackButton'
import COLORS from "@/contants/colors"
import CONSTANTS from "@/contants/constants"

export default function Container({ children, style, styleGeralContainer, statusBarBackgroundColor, refreshing, onRefresh }: { children?: ReactNode, style?: ViewStyle, styleGeralContainer?: ViewStyle, statusBarBackgroundColor?: ColorValue, refreshing?: boolean, onRefresh?: (() => void) | undefined}) {
    
    return (
        <View style={{ ...styles.geralContainer, ...styleGeralContainer }}>
            <ScrollView contentContainerStyle={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing ? refreshing : false} onRefresh={onRefresh} />}>
                <StatusBar backgroundColor={statusBarBackgroundColor ? statusBarBackgroundColor : COLORS.background} />
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