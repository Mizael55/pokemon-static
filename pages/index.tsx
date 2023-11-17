import { NextPage } from "next";
import { GetServerSideProps } from "next";
import { Layout } from "../components/layouts";
import { pokeApi } from "@/api";
import { PokeminListResponse, SmallPokemon } from "@/interfaces";
import { Grid } from "@nextui-org/react";
import {PokemonCard} from '@/components/pokemon';


interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = (props) => {
  console.log(props);
  return (
    <Layout title="Listado de Pokemon">
      <Grid.Container gap={2} justify="flex-start">
        {props.pokemons.map((poke) => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

// This function just execute in the server side and just in build time
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await pokeApi.get<PokeminListResponse>("/pokemon?limit=151");
  let pokemons: SmallPokemon[] = data.results.map((pokemon, index) => {
    return {
      ...pokemon,
      id: index + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        index + 1
      }.svg`,
    };
  });

  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
