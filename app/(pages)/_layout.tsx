import CustomTabBar from "@/components/TabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashBoard from '@/app/(pages)/dashBoard';
import Report from '@/app/(pages)/report';
import Profile from '@/app/(pages)/profile';
import Colors from "@/constants/Colors";

export default function Layout() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            screenOptions={{headerShown: false}}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen name="dashBoard" component={DashBoard} options={{tabBarLabel:"Início", tabBarActiveTintColor: Colors.light.blue, tabBarInactiveTintColor: Colors.light.foreground}}/>
            <Tab.Screen name="report" component={Report} options={{tabBarLabel:"Relatório", tabBarActiveTintColor: Colors.light.red, tabBarInactiveTintColor: Colors.light.foreground}}/>
            <Tab.Screen name="profile" component={Profile} options={{tabBarLabel:"Perfil", tabBarActiveTintColor: Colors.light.green, tabBarInactiveTintColor: Colors.light.foreground}}/>
        </Tab.Navigator>
    );
}