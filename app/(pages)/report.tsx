import { View, Text, StyleSheet } from "react-native"
import Container from "@/components/Container"
import { useState } from "react"
import Svg, { Path } from "react-native-svg"

function svgPath(statistics:Array<number>){
    const path_heigth = 500
    let path = `M 0 ${path_heigth} `;
    const scale = 100

    for(let x = 0; x < statistics.length; x++){
        let y = statistics[x]

        path += `L ${x*scale} ${path_heigth - (y*scale)} `
    }

    return path
}

export default function Report() {
    const [statistics, setStatistics] = useState<Array<number>>([1,2,1,3,1])

    return (
        <Container>
            <Svg style={styles.containerSvg}>
                <Path d={svgPath(statistics)} stroke={"#000"} fillOpacity={0}/>
            </Svg>
        </Container>
    )
}

const styles = StyleSheet.create({
    containerSvg: {
        flex: 1,
    }
})