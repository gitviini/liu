import { useLocalSearchParams } from "expo-router";
import WebView from "react-native-webview";
import BackButton from "@/components/BackButton";
import { View } from "react-native";
import CONSTANTS from "@/contants/constants";

export default function Web() {
    const { uri } = useLocalSearchParams()

    return (
        <View style={{flex: 1, gap: CONSTANTS.gapMedium}}>
            <BackButton />
            <WebView
                source={{ uri: uri.toString() }}
            />
        </View>
    )
}