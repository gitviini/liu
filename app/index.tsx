import { useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { Image, ImageSource } from "expo-image";
import Container from "@/components/Container";
import { Dimensions } from "react-native";
import { stylePattern } from "@/constants/stylePattern";
import Button from "@/components/Button";
import Constants from "@/constants/Constants";
import Pagination from "@/components/Pagination";

const carousel: Array<{id: string, src: ImageSource, description: string}> = [
  {
    id: "0",
    src: require("../assets/images/init-carrossel/alarm.svg"),
    description: "Crie e gerencie alarmes e notificações",
  },
  {
    id: "1",
    src: require("../assets/images/init-carrossel/statistics.svg"),
    description: "Veja gráficos com informações dos pacientes",
  },
  {
    id: "2",
    src: require("../assets/images/init-carrossel/location.svg"),
    description: "Acesse pacientes com apenas um clique",
  }
]

export default function Index() {
  const [indexPagination, setIndexPagination] = useState<String>(carousel[0].id)
  let widthScreen = Dimensions.get("screen").width
  return (
    <Container style={{
      justifyContent: "center",
      paddingVertical: Constants.paddingMedium,
      gap: Constants.gapMedium
    }}
    >
      <View style={styles.containerCarrossel}>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={(viewableItem) => setIndexPagination(viewableItem.viewableItems[0].key)}
          data={carousel}
          renderItem={({ item }) => (
            <View key={item?.id} style={{ padding: 30, width: widthScreen }}>
              <Image
                source={item?.src}
                style={styles.image}
                contentFit="contain"
              />
              <Text style={{ ...stylePattern.paragraph, textAlign: "center" }}>
                {item?.description}
              </Text>
            </View>
          )}
        />
        <Pagination items={carousel} index={indexPagination} />
      </View>
      <View style={styles.containerButton}>
        <Button>
          <Text style={stylePattern.paragraph}>Entrar</Text>
        </Button>
        <Button>
          <Text style={stylePattern.paragraph}>Cadastrar</Text>
        </Button>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1
  },
  containerCarrossel: {
    flex: 1,
  },
  containerButton: {
    width: "100%",
    padding: Constants.paddingHigh,
    gap: Constants.gapMedium
  }
})