import Container from "@/components/Container"
import { Link } from "expo-router"

export default function Home() {
    return (
        <Container>
            <Link href={"/(public)/profile"}>Perfil</Link>
        </Container>
    )
}