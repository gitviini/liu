import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { useAuth } from '@clerk/clerk-expo'
import { Slot, useRouter } from 'expo-router'
import { useEffect } from 'react'

function Verify() {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    console.log("User: ", isSignedIn)

    isSignedIn ? router.replace("/(public)") : router.replace("/(auth)/login")
  }, [isSignedIn])
  return <Slot />
}

export default function RootLayout() {

  return (
    <ClerkProvider tokenCache={tokenCache}>
      < Verify />
    </ClerkProvider>
  )
}