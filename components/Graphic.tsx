import Svg, { Path, Line } from "react-native-svg";
import { View, Text, StyleSheet, ViewStyle, ColorValue, Dimensions } from "react-native";
import Constants from "@/constants/Constants";
import Colors from "@/constants/Colors";
import { stylePattern } from "@/constants/stylePattern";

function max(iterable: Array<number>, defaultElements?: number) {
    let maxElement = defaultElements ? defaultElements : 0;
    iterable.forEach(element => {
        maxElement = element > maxElement ? element : maxElement
    })

    return maxElement
}

function generateAxis({ iterable }: { iterable: Array<string> | number }): Array<{ id: string, content: string }> {

    let resp = []

    if (typeof iterable == "number") {
        for (let i = 0; i < iterable; i++) {
            resp.push({
                id: i.toString(),
                content: i.toString()
            })
        }
    }
    else if (typeof iterable == "object") {
        for (let i = 0; i < iterable.length; i++) {
            resp.push({
                id: i.toString(),
                content: iterable[i],
            })
        }
    }

    return resp
}

function generatePath({ iterable, height, width, defaultElements }: { iterable: Array<number>, height: number, width: number, defaultElements?: number }): string {

    let scaleX = width / (iterable.length - 1)

    const scaleY = height / max(iterable, defaultElements)
    let path = `M 0 ${height - (iterable[0] * scaleY)} `;

    for (let x = 0; x < iterable.length; x++) {
        let y = iterable[x]

        path += `L ${x * scaleX} ${height - (y * scaleY)} `
    }

    return path
}

export default function Graphic({
    style,
    height,
    padding,
    content,
    defaultElements,
    stroke,
    axis
}: {
    style?: ViewStyle,
    height: number,
    padding?: number,
    content: Array<number>,
    defaultElements?: number
    stroke?: ColorValue
    axis?: {
        main: {
            name: string,
            count: Array<string> | undefined,
        },
        cross: {
            name: string,
            count: Array<string> | undefined,
        },
    }
}
) {

    const window = Dimensions.get("screen")
    const width = window.width - ((padding ? padding : 0) * 2)

    const contentPath = generatePath({
        iterable: content,
        height: height,
        width: width,
        defaultElements: defaultElements,
    })

    return (
        <View style={{ ...styles.container, maxHeight: height, ...style }}>
            <Svg
                style={{ height: height }}
            >
                <Path d={contentPath} stroke={stroke ? stroke : "#000"} fillOpacity={0}></Path>
            </Svg>
            <View style={{ ...styles.mainAxis, height: height }}>
                {
                    generateAxis({ iterable: axis?.main.count || max(content, ((defaultElements || 0) + 1)) }).reverse().map((item) => (
                        <Text
                            style={styles.itemAxis}
                            key={item.id}
                        >
                            {item.content}
                        </Text>
                    ))
                }
            </View>
            <View style={{...styles.crossAxis, top: height - stylePattern.paragraph.fontSize}}>
                {
                    generateAxis({ iterable: axis?.cross.count || content.length }).map((item) => (
                        <Text
                            style={styles.itemAxis}
                            key={item.id}
                        >
                            {item.content}
                        </Text>
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainAxis: {
        position: "absolute",
        width: "auto",
        height: "100%",
        justifyContent: "space-between",
        zIndex: 0,
    },
    crossAxis: {
        position: "absolute",
        width: "100%",
        height: Constants.paddingHigh,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.light.white,
        zIndex: 1,
    },
    itemAxis: {
        fontSize: 10,
    },
})