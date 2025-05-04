import { View, Text, StyleSheet } from "react-native"
import Button from "@/components/Button"
import Container from "@/components/Container"

export default function App() {
  return (
    <Container>
      <Button href={"/(autentication)/login"}>
        Login
      </Button>
      <Button href={"/(autentication)/signup"}>
        Cadastrar
      </Button>
    </Container>
  )
}

const styles = StyleSheet.create({
})