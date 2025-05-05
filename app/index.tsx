import { ActivityIndicator } from "react-native"
import Container from "@/components/Container"
import CONSTANTS from "@/contants/constants"
import COLORS from "@/contants/colors"

export default function Index() {
  return (
    <Container>
      <ActivityIndicator size={CONSTANTS.fontLarge} color={COLORS.foreground}/>
    </Container>
  )
}