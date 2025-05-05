import { Stack } from "expo-router";
import COLORS from "@/contants/colors";

export default function RootLayout() {
  return <Stack screenOptions={{
    headerShadowVisible: false,
    headerTintColor: COLORS.foreground,
    headerStyle: { backgroundColor: COLORS.background },
  }}>
    <Stack.Screen name="index" options={{ headerShown: false }} />
  </Stack>
}
