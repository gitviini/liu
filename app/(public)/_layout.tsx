import { Tabs, Stack } from "expo-router";
import COLORS from "@/contants/colors";
import { Ionicons } from "@expo/vector-icons";
import NavTab from "@/components/NavTab";

export default function RootLayout() {

  return <Tabs screenOptions={{ headerShown: false }}
  >
    <Tabs.Screen
      name="index"
      options={{
        title: "Principal",
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarIcon: ({ color }) => <Ionicons size={28} name="home-outline" color={color} />
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: "Perfil",
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarIcon: ({ color }) => <Ionicons size={28} name="person-outline" color={color} />
      }} />
      <Tabs.Screen name="modal" options={{headerShown: false, href:null}}/>
      <Tabs.Screen name="web" options={{headerShown: false, href:null}}/>
  </Tabs>
}
