import Colaborador from "@/components/Colaborador";
import EMulti from "@/components/eMulti";
import { useLocalSearchParams } from "expo-router";

export default function Modal(){
    const { type, userCode } = useLocalSearchParams();

    console.log(type, userCode)

    return type == "Colaborador" ? <Colaborador userCode={userCode.toString()} /> : <EMulti userCode={userCode.toString()}/>
}