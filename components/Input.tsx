import { View, TextInput, Pressable } from "react-native";
import Constants from "@/constants/Constants";
import Colors from "@/constants/Colors";
import { stylePattern } from "@/constants/stylePattern";
import * as Lucide from "lucide-react-native"
import { useState } from "react";

export default function Input({
    value,
    onChangeText,
    placeholder,
    secureTextEntry
}: {
    value?: any,
    onChangeText?: ((text: string) => void) | undefined,
    placeholder?: string,
    secureTextEntry?: boolean
}) {

    const [visible, setVisible] = useState<boolean>(false)

    return (
        <View
            style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                padding: Constants.paddingMedium,
                backgroundColor: Colors.light.white,
                borderRadius: Constants.borderRadiusHigh,
                boxShadow: Constants.boxShadow,
            }}
        >

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry ? !visible : undefined}
                style={{
                    ...stylePattern.paragraph,
                    width: secureTextEntry ? "85%" : "100%",
                }}
            />
            {
                secureTextEntry
                    ?
                    <Pressable
                        onPress={() => setVisible(!visible)}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: "15%",
                        }}
                    >
                        {
                            visible
                                ?
                                <Lucide.EyeClosed />
                                :
                                <Lucide.Eye />
                        }
                    </Pressable>
                    :
                    <></>
            }
        </View>
    )
}