import COLORS from "@/contants/colors"
import CONSTANTS from "@/contants/constants"
import { stylePattern } from "@/contants/stylePattern"
import { Ionicons } from "@expo/vector-icons"
import { View, Text } from "react-native"
import Division from "./Division"

export default function UserItem({ item }: { item?: any }) {
    let cep = item.cep.split("")
    cep.splice(6,0,"-")
    cep = cep.join("")

    return (
        <View style={{padding: CONSTANTS.paddingMedium, backgroundColor: (item.state == "vermelho" ? COLORS.red : item.state == "amarelo" ? COLORS.oldYellow : item.state == "verde" ? COLORS.green : ""), borderRadius: CONSTANTS.borderRadiusLarge, marginRight: CONSTANTS.paddingMedium}}>
            <Text style={{...stylePattern.title, color: COLORS.background, fontWeight: "bold"}}>
                <Ionicons name="person" size={CONSTANTS.fontMedium}/> {item.name}
            </Text>
            <Text style={{...stylePattern.subTitle, color: COLORS.background}}>
                {item.dcnt}
            </Text>
            <Division style={{backgroundColor: COLORS.background}}/>
            <Text style={{...stylePattern.subTitle, color: COLORS.background}}>
                <Ionicons name="map-outline" size={CONSTANTS.fontMedium}/> {cep}
            </Text>
        </View>
    )
}