import React, { useContext, useEffect, useState } from "react";
import * as S from "./styles";
import axios from "axios";
import { APIkey } from "../../utils/constantes";

//Components
import HeaderCity from "../../components/HeaderCity";
import { FlatList } from "react-native";
import CardForecast from "../../components/Cards/Forecast";

//interfaces
import { ICidades } from "../../interfaces/cidade.interface";
import { SearchContext } from "../../contexts/SearchContext";

type props = {
  route: any;
};

export default function Cidade({ route }: props) {
  const [climas, setClimas] = useState<IForecast | null>(null);
  const { language } = useContext(SearchContext);

  const cidade: ICidades = route.params.cidade;

  //Busca na API as informações da cidade
  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${
          cidade.lat
        }&lon=${cidade.lon}&appid=${APIkey}&lang=${
          language === "pt-br" ? "pt_br" : "en"
        }${language === "pt-br" && "&units=metric"}`
      )
      .then((res) => {
        setClimas(res.data);
      });
  }, []);

  //Gera a renderList
  function gerarRenderList() {
    if (!!climas) {
      const renderList: IDias[] = [];

      for (let i = 0; i < climas.list.length; i++) {
        const index = renderList.findIndex(
          (item) =>
            item.dt_txt.substring(0, 10) ===
            climas.list[i].dt_txt.substring(0, 10)
        );
        index === -1 && renderList.push(climas.list[i] as any);
      }
      return renderList.slice(0, 5);
    }
  }

  return (
    <HeaderCity nome={cidade.name}>
      <S.Container>
        <S.SubTitle>Previsão para os próximos 5 dias</S.SubTitle>

        <FlatList
          data={gerarRenderList()}
          scrollEnabled
          renderItem={({ item, index }) => (
            <CardForecast data={item} index={index} />
          )}
          contentContainerStyle={{ paddingBottom: 150 }}
          keyExtractor={() => Math.random().toString()}
        />
      </S.Container>
    </HeaderCity>
  );
}
