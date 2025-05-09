import COLORS from '@/contants/colors'
import CONSTANTS from '@/contants/constants'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import { useWindowDimensions } from 'react-native'

export default function HomeLoader() {
    const {width, height} = useWindowDimensions()
    return (
        <ContentLoader viewBox={`0 -${CONSTANTS.paddingMedium} ${width} ${height}`} backgroundColor={COLORS.backgroundLoader} foregroundColor={COLORS.foregroundLoader}>
            <Circle cx="60" cy="70" r="40"/>
            <Rect x="120" y="55" rx="4" ry="4" width={width/2} height="13" />
            <Rect x="120" y="75" rx="3" ry="3" width={width/3} height="10" />
            <Rect x="16" y="170" rx="3" ry="3" width={width/3} height="10" />
            <Rect x="16" y="200" rx="20" ry="20" width={width*0.91} height="40" />
            <Rect x="16" y="260" rx="10" ry="10" width={width / 2} height="80" />
            <Rect x={(width / 2) + 40} y="260" rx="10" ry="10" width={width*0.91 / 2} height="80" />
            <Rect x="16" y="360" rx="3" ry="3" width={width/3} height="10" />
            <Rect x="16" y="390" rx="10" ry="10" width={width / 2} height="80" />
            <Rect x={(width / 2) + 40} y="390" rx="10" ry="10" width={width*0.91 / 2} height="80" />
            <Rect x="16" y="490" rx="3" ry="3" width={width/3} height="10" />
            <Rect x="16" y="520" rx="10" ry="10" width={width*0.91} height="80" />
        </ContentLoader>
    )
}