import COLORS from '@/contants/colors'
import CONSTANTS from '@/contants/constants'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import { useWindowDimensions } from 'react-native'

export default function HomeLoader() {
    const {width, height} = useWindowDimensions()
    return (
        <ContentLoader viewBox={`0 -${CONSTANTS.paddingMedium} ${width} ${height}`} backgroundColor={COLORS.backgroundLoader} foregroundColor={COLORS.foregroundLoader}>
            <Circle cx="50" cy="50" r="30"/>
            <Rect x="90" y="35" rx="4" ry="4" width={width/2} height="13" />
            <Rect x="90" y="55" rx="3" ry="3" width={width/3} height="10" />
        </ContentLoader>
    )
}