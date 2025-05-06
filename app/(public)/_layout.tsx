import { Stack } from "expo-router";
import COLORS from "@/contants/colors";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />
}
