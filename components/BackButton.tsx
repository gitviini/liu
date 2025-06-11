import Button from "./Button";
import { Href, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Constants from "@/constants/Constants";
import { stylePattern } from "@/constants/stylePattern";
import Colors from "@/constants/Colors";
import { StatusBar, ViewStyle } from "react-native";

export default function BackButton({href, style}:{href?:Href, style?:ViewStyle}){
    const router = useRouter()

    if (router.canGoBack() || href) {
        return (
            <Button 
            onPress={()=> href ? router.replace(href) : router.back()}
            style={{
                position: "absolute",
                top: StatusBar.currentHeight,
                left: Constants.paddingHigh,
                alignSelf: "flex-start",
                width: "auto",
                backgroundColor: Colors.light.white,
                boxShadow: Constants.boxShadow,
                ...style
            }}>
                <Ionicons name="arrow-back" style={stylePattern.subtitle}/>
            </Button>
        )
    }

    return <></>
}