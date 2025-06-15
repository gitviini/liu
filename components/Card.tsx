import { View, Text, TouchableOpacity, ViewStyle } from "react-native"
import { stylePattern } from "@/constants/stylePattern"
import { Ionicons } from "@expo/vector-icons"
import Constants from "@/constants/Constants"
import Colors from "@/constants/Colors"
import { ReactNode, useState } from "react"

export default function Card({ style, header, children }: { style?:ViewStyle, header?: ReactNode, children?: ReactNode }) {
    const [visible, setVisible] = useState<boolean>(true)
    return (
        <View style={{ ...stylePattern.card, gap: 0, padding: 0, ...style}}>
            <TouchableOpacity
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: Constants.paddingHigh,
                    borderRadius: Constants.borderRadiusHigh,
                    borderWidth: 1,
                    borderColor: Colors.light.lightGray,
                }}
                onPress={() => setVisible(!visible)}
            >
                {header}
            </TouchableOpacity>
            {visible ?
                <View style={{ padding: Constants.paddingHigh, gap: Constants.gapMedium}}>
                    {children}
                </View>
                :
                <></>
            }
        </View>
    )
}