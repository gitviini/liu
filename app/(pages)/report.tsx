import { View, Text, StyleSheet } from "react-native"
import { stylePattern } from "@/constants/stylePattern"
import { useState } from "react"
import { Image } from "expo-image"
import Container from "@/components/Container"
import Graphic from "@/components/Graphic"
import Card from "@/components/Card"
import * as Lucide from "lucide-react-native"
import Colors from "@/constants/Colors"
import Constants from "@/constants/Constants"
import { getCurrentDate, getDate } from "@/utils/Date"
import Button from "@/components/Button"
import { Link } from "expo-router"

export default function Report() {
    const defaultElements = 3
    const [userName, setUserName] = useState<string>("Vinicius")
    const [date, setDate] = useState(getDate())
    const [scouting, setScouting] = useState<Array<number>>([0, 1, 1, 1, 2, 1, 1])
    const [visits, setVisits] = useState<Array<number>>([0, 1, 1, 1, 0, 1, 1])
    const [exercises, setExercises] = useState<Array<number>>([0, 1, 1, 2, 2, 1, 1])

    return (
        <Container style={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={stylePattern.title}>
                    Relatório
                </Text>
                <Link href={"/(pages)/profile"}>
                    <Image
                        style={styles.imageProfile}
                        contentFit="cover"
                        source={"https://images.pexels.com/photos/3789888/pexels-photo-3789888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                    />
                </Link>
            </View>
            <View style={styles.containerDate}>
                <Button
                    onPress={() => {
                        const month = date.monthNumber - 1
                        setDate(getDate(month))
                    }}
                    style={styles.buttonDate}
                >
                    <Lucide.ChevronLeft size={stylePattern.title.fontSize} color={Colors.light.foreground} />
                </Button>
                <Text style={stylePattern.title}>
                    {date.month}
                </Text>
                <Button
                    onPress={() => {
                        const month = date.monthNumber + 1
                        setDate(getDate(month))
                    }}
                    style={styles.buttonDate}
                >
                    <Lucide.ChevronRight size={stylePattern.title.fontSize} color={Colors.light.foreground} />
                </Button>
            </View>
            <Card
                header={
                    <>
                        <Text style={stylePattern.paragraph}>Aferição</Text>
                        <Lucide.Heart size={stylePattern.subtitle.fontSize} color={Colors.light.red} />
                    </>
                }
            >
                <Graphic
                    height={200}
                    stroke={Colors.light.darkBlue}
                    padding={Constants.paddingHigh * 2}
                    defaultElements={defaultElements}
                    axis={{
                        main: {
                            name: "",
                            count: ["0", "11/8", "12/8", "13/8"],
                        },
                        cross: {
                            name: "",
                            count: undefined,
                        }
                    }}
                    content={scouting}
                />
            </Card>
            <Card
                header={
                    <>
                        <Text style={stylePattern.paragraph}>Visita</Text>
                        <Lucide.Home size={stylePattern.subtitle.fontSize} color={Colors.light.blue} />
                    </>
                }
            >
                <Graphic
                    height={200}
                    stroke={Colors.light.darkBlue}
                    padding={Constants.paddingHigh * 2}
                    defaultElements={defaultElements}
                    axis={{
                        main: {
                            name: "",
                            count: undefined,
                        },
                        cross: {
                            name: "",
                            count: undefined,
                        }
                    }}
                    content={visits}
                />
            </Card>
            <Card
                header={
                    <>
                        <Text style={stylePattern.paragraph}>Exercício</Text>
                        <Lucide.Dumbbell size={stylePattern.subtitle.fontSize} color={Colors.light.green} />
                    </>
                }
            >
                <Graphic
                    height={200}
                    stroke={Colors.light.darkBlue}
                    padding={Constants.paddingHigh * 2}
                    defaultElements={defaultElements}
                    axis={{
                        main: {
                            name: "",
                            count: undefined,
                        },
                        cross: {
                            name: "",
                            count: undefined,
                        }
                    }}
                    content={exercises}
                />
            </Card>
        </Container >
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        padding: Constants.paddingHigh,
        gap: Constants.gapHigh
    },
    containerTitle: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Constants.paddingHigh,
        gap: Constants.gapHigh,
    },
    imageProfile: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    containerDate: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonDate: {
        width: "auto",
        padding: Constants.paddingMedium,
        backgroundColor: Colors.light.lightGray,
        borderRadius: Constants.borderRadiusAll
    },
    card: {
    }
})