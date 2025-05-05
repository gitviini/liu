import { Stack, Redirect} from "expo-router";
import { useAuth } from '@clerk/clerk-expo'
import COLORS from "@/contants/colors";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/'} />
  }

  return <Stack screenOptions={{headerShown: false}}/>
}
