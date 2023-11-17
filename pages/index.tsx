import { NextPage } from "next";
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { Layout } from "../components/layouts";
import { pokeApi } from "@/api";
import { PokeminListResponse, SmallPokemon } from "@/interfaces";
import { Card, Grid, Row, Text } from "@nextui-org/react";

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = (props) => {
  console.log(props);
  return (
    <Layout title="Listado de Pokemon">
      <Grid.Container gap={2} justify='flex-start'>
        {props.pokemons.map(({ id, name }) => (
          <Grid xs={6} sm={3} md={2} xl={1} key={id}>
            <Card hoverable clickable>
              <Card.Body>
                <Card.Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                  width={100}
                  height={100}
                  alt={name}
                 />
              </Card.Body>
              <Card.Footer>
                <Row justify='space-between'>
                  <Text transform="capitalize">{name}</Text>
                  <Text>#{id}</Text>
                </Row>
              </Card.Footer>

            </Card>
          </Grid>
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
