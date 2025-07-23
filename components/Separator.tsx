import Colors from "@/constants/Colors";
import Constants from "@/constants/Constants";
import { View } from "react-native";


// * Sessions separator
export default function Separator() {
    return (
        <View
            style={{
                width: "100%",
                paddingHorizontal: Constants.paddingMedium,
            }}
        >
            <View
                style={{
                    width: "100%",
                    height: 2,
                    backgroundColor: Colors.light.whiteGray
                }}
            />
        </View>
    )
}