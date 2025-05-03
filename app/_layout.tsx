import COLORS from "@/assets/static/colors";
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ 
    headerShadowVisible: false, 
    headerTintColor: COLORS.foreground, 
    headerStyle: { backgroundColor: COLORS.background }, 
  }}>
    <Stack.Screen name="index" options={{headerShown: false}} />
    <Stack.Screen name="(autentication)/login" options={{title:"Entrar"}} />
    <Stack.Screen name="(autentication)/signup" options={{title:"Cadastrar"}} />
    <Stack.Screen name="(home)" options={{headerShown: false}} />
  </Stack>
}
