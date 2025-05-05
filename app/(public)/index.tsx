import { useClerk } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Text } from "react-native"
import Container from "@/components/Container"
import Button from '@/components/Button'

export default function Home() {
    const router = useRouter()
    // Use `useClerk()` to access the `signOut()` function
    const { signOut } = useClerk()
    const handleSignOut = async () => {
        try {
            await signOut()
            // Redirect to your desired page
            router.replace("/")
            
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }
    return (
        <Container>
            <Button onPress={handleSignOut}>
                Sair
            </Button>
            <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, tempore quam! Voluptas perspiciatis quasi porro sequi officia quos aperiam commodi ratione repudiandae iste laboriosam reprehenderit sit obcaecati eveniet, assumenda itaque!
                Harum vero eos doloribus eligendi, quasi quam recusandae nesciunt necessitatibus rem voluptate dolor ex impedit minima, odio maiores sed corrupti omnis ad quaerat? Est facere vitae animi, necessitatibus ducimus unde!
                Ab cupiditate aliquam laborum assumenda eius animi eos corrupti placeat in? Deserunt, ipsa, beatae corporis aliquam asperiores blanditiis dolore debitis natus placeat animi ab! Blanditiis exercitationem eius expedita ducimus eos!
                Corrupti eligendi quam eaque dolorem. Cumque repellat unde veritatis modi illum illo doloribus, debitis tempore at minus nesciunt explicabo reprehenderit eaque beatae repellendus itaque? Laudantium a magni reprehenderit possimus perspiciatis.
                Molestias quam nihil cum illum, voluptas enim a est, magnam iure voluptatum earum odit assumenda soluta quia exercitationem voluptate facilis harum deserunt alias sit porro fuga saepe ratione. Non, fuga!
                Vel quaerat deleniti magni qui architecto magnam repellendus ea blanditiis placeat suscipit perspiciatis sapiente maxime, quidem maiores. Eum, sit dolorem sequi, ullam commodi pariatur excepturi quis perferendis eius optio voluptatum?
                Alias, minus? Dolorum, eligendi libero pariatur iusto, id ullam quaerat eius voluptatem sequi quisquam natus! Pariatur nostrum deserunt ipsa laudantium quis inventore ullam eveniet! In quo quod laudantium unde maxime.
                Veniam accusantium soluta natus vel ratione facere itaque odit nam eaque placeat exercitationem iure est temporibus pariatur illo reprehenderit ipsum alias asperiores incidunt, esse fugit! Recusandae quos saepe iure dolorem.
                Eligendi molestiae aliquam voluptate cupiditate iure, nisi ipsum hic id velit nostrum placeat quia fugiat ullam atque voluptatibus voluptates quae sit tempore necessitatibus dolores reprehenderit minus, accusantium voluptas repellendus? Iure.
                Ratione maiores corrupti suscipit aut quo animi asperiores totam. Quam, quasi aspernatur. Dolore, blanditiis quibusdam reprehenderit, quam nisi, odit mollitia sapiente esse nihil distinctio aperiam vel in rem? Dolorem, deleniti?
                Sapiente repellat minima porro excepturi doloremque magnam vitae! Consequuntur autem dicta possimus nesciunt assumenda dolorem repellendus rerum, quisquam corporis quidem deserunt eos quibusdam nobis eaque enim quam, labore ducimus accusamus?
                Molestiae voluptate blanditiis repellendus quam tempora fugiat fuga hic veritatis quidem, suscipit atque, quod explicabo est. Quidem omnis officia nemo aliquam velit perspiciatis doloribus culpa corrupti suscipit sed? Facere, numquam.
                Nihil eaque, incidunt, corrupti minima animi consectetur aliquid molestiae ut placeat dolores maxime magnam dolorum ex sit accusantium quod doloribus iure ducimus, ea saepe hic impedit maiores nulla praesentium. Deleniti!
                Excepturi corporis maxime itaque ipsum autem velit deserunt in officia sed repellendus, assumenda expedita beatae animi cumque voluptas aliquid id. Dolores soluta temporibus doloremque, autem illum dolore nulla nesciunt voluptatibus?
                Magnam, eos assumenda. Assumenda earum excepturi autem quisquam, praesentium suscipit voluptatibus commodi. Rerum consequatur nisi totam nobis odio. Natus temporibus itaque neque ea doloribus perspiciatis repellat dignissimos excepturi sapiente at.
                Voluptates mollitia, laudantium commodi tenetur neque rerum veniam, deleniti aut quibusdam iure beatae vitae perferendis repudiandae, obcaecati alias! Velit quis, non minima fuga odit iusto doloremque similique quasi odio omnis.
                Porro animi nemo dignissimos necessitatibus fugit, officia tempora iste! Eaque, praesentium officia! Velit voluptate nemo commodi atque at pariatur vero quis, provident maxime magni voluptatibus sapiente veniam! Repudiandae, ducimus aliquam!
                Labore, corporis eum? Necessitatibus maiores pariatur, qui odit facilis recusandae non nemo tempora voluptatibus, porro dignissimos consequuntur itaque, voluptates libero quia alias? Consectetur, cum obcaecati dignissimos impedit aut sint repellat.
                Placeat quidem maxime sunt sapiente velit reprehenderit, vel cupiditate officiis! Rerum natus eius quia optio rem inventore et cupiditate laborum veritatis? Fuga nam sequi ullam dolor quibusdam enim est. Sequi.
                Vel dolores at velit. Saepe, magni dignissimos incidunt veritatis, aspernatur rem quidem aut ab praesentium veniam cupiditate, quasi ut! Sequi nihil mollitia expedita debitis doloremque reiciendis perferendis facilis magni voluptas.</Text>
        </Container>
    )
}