import Card from "@/components/Card"
import Container from "@/components/Container"
import Colors from "@/constants/Colors"
import Constants from "@/constants/Constants"
import { stylePattern } from "@/constants/stylePattern"
import { getDate, getCurrentDate } from "@/utils/Date"
import * as Lucide from 'lucide-react-native';
import { Image } from "expo-image"
import { useRef, useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"

export default function DashBoard() {
    const flatListRef = useRef<any>(null)
    const [currentDate, setCurrentDate] = useState(getCurrentDate())
    const [date, setDate] = useState(getDate())
    const [userName, setUserName] = useState<string>("Vinicius")
    const [afericao, setAfericao] = useState<string>("12/8")

    function scrollToIndex(index: number) {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index, animated: true });
        }
    }

    return (
        <Container style={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={stylePattern.title}>
                    Olá, {userName} 👋
                </Text>
                <Image
                    style={styles.imageProfile}
                    contentFit="cover"
                    source={"https://images.pexels.com/photos/3789888/pexels-photo-3789888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                />
            </View>
            <View style={stylePattern.card}>
                <Text style={stylePattern.title}>
                    {date.month} {date.year}
                </Text>
                <FlatList
                    horizontal
                    ref={flatListRef}
                    contentContainerStyle={styles.containerDays}
                    onScrollToIndexFailed={() => { }}
                    data={date.days}
                    onScrollEndDrag={() => {
                        setTimeout(() => {
                            scrollToIndex(currentDate.day - 4)
                        }, 500)
                    }}
                    onContentSizeChange={() => {
                        setTimeout(() => {
                            scrollToIndex(currentDate.day - 4)
                        }, 500)
                    }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View
                            key={item.id}
                            style={{
                                ...styles.dayItem,
                                ...currentDate.year == date.year && currentDate.month == date.monthNumber && currentDate.day == item.dayNumber ? { opacity: 1, backgroundColor: Colors.light.blue } : { opacity: 0.5 }
                            }}
                        >
                            <Text style={{ ...stylePattern.paragraph, fontWeight: "bold" }}>
                                {item.dayName[0].toUpperCase()}
                            </Text>
                            <Text style={stylePattern.paragraph}>
                                {item.dayNumber}
                            </Text>
                        </View>
                    )}
                />
            </View>
            <View style={styles.containerTitle}>
                <Text style={stylePattern.title}>
                    Plano diário
                </Text>
            </View>
            <Card
                header={<>
                    <Text style={stylePattern.paragraph}>Aferição</Text>
                    <Lucide.Heart size={stylePattern.subtitle.fontSize} color={Colors.light.red} />
                </>}
            >
                <Text style={stylePattern.paragraph}>
                    {afericao} <Text style={{ color: Colors.light.gray }}>mmHg</Text>
                </Text>
            </Card>
            <View style={styles.containerCard}>
                <Card
                    style={styles.cardHorizontal}
                    header={<>
                        <Text style={stylePattern.paragraph}>Visita</Text>
                        <Lucide.Home size={stylePattern.subtitle.fontSize} color={Colors.light.blue} />
                    </>}
                >
                    <Text style={stylePattern.paragraph}>
                        15:00 <Text style={{ color: Colors.light.gray }}>Horas</Text>
                    </Text>
                    <Text style={stylePattern.paragraph}>
                        Maria Vitória
                    </Text>
                </Card>
                <Card
                    style={styles.cardHorizontal}
                    header={<>
                        <Text style={stylePattern.paragraph}>Exercício</Text>
                        <Lucide.Dumbbell size={stylePattern.subtitle.fontSize} color={Colors.light.green} />
                    </>}
                >
                    <Text style={stylePattern.paragraph}>
                        0 <Text style={{ color: Colors.light.gray }}>hr</Text> 15 <Text style={{ color: Colors.light.gray }}>min</Text>
                    </Text>
                    <Text style={stylePattern.paragraph}>
                        Caminhada
                    </Text>
                </Card>
            </View>
        </Container >
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        padding: Constants.paddingHigh,
        gap: Constants.gapHigh,
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
    containerDays: {
        flexDirection: "row",
        gap: Constants.gapMedium
    },
    dayItem: {
        justifyContent: "center",
        alignItems: "center",
        minWidth: Constants.paddingMedium * 4,
        padding: Constants.paddingMedium,
        backgroundColor: Colors.light.lightGray,
        borderRadius: Constants.borderRadiusHigh,
    },
    containerCard: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: Constants.gapHigh
    },
    cardHorizontal: {
        width: "47%"
    }
})