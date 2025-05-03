import Button from "@/assets/components/Button"
import Container from "@/assets/components/Container"

export default function App(){
  return(
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