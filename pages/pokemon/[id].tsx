import { Layout } from "@/components/layouts";
import { useRouter } from "next/router";
import React from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { pokeApi } from "@/api";
import { Pokemon } from "@/interfaces";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const router = useRouter();
  console.log(router.query);
  return (
    <Layout title="Algun pokemon">
      <h1>{pokemon.name}</h1>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => index + 1);
  return {
    paths: pokemons151.map((id) => ({ params: { id: `${id}` } })),
    fallback: false,
  };
};

//This function just execute in the server side and just in build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data,
    },
  };
};

export default PokemonPage;