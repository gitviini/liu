import { View, Text } from "react-native"
import Colors from "@/constants/Colors"
import Constants from "@/constants/Constants"

export default function Pagination({ items, index }: { items: Array<any>, index: String }) {
    return (
        <View style={{flexDirection: "row", justifyContent: "center", gap: Constants.gapMedium}}>
            {
                items.map((items) => (
                    <View
                        key={items?.id}
                        style={{
                            width: 10,
                            height: 10,
                            backgroundColor: items.id == index ? Colors.light.gray : Colors.light.lightGray,
                            borderRadius: Constants.borderRadiusMedium
                        }}
                    >
                    </View>
                ))
            }
        </View>
    )
}