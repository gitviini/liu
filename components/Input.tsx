import { TextInput } from "react-native";
import { Dispatch, SetStateAction } from "react";
import Constants from "@/constants/Constants";
import Colors from "@/constants/Colors";
import { stylePattern } from "@/constants/stylePattern";
export default function Input({ value, onChangeText, placeholder }: { value?: any, onChangeText?: ((text: string) => void) | undefined, placeholder?: string }) {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={{
                ...stylePattern.paragraph,
                width: "100%",
                padding: Constants.paddingHigh,
                backgroundColor: Colors.light.white,
                borderRadius: Constants.borderRadiusHigh,
                boxShadow: Constants.boxShadow,
            }}
        />
    )
}