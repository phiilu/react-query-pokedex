import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Api from "api";

export const usePokemon = (name) => {
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState({
    pokemon: {},
    species: {},
    evolutionChain: {},
  });

  const { status: pokemonStatus, data: pokemonData } = useQuery(
    ["pokemon", name],
    Api.pokemon
  );
  const { status: pokemonSpeciesStatus, data: pokemonSpeciesData } = useQuery(
    ["pokemon-species", name],
    Api.pokemonSpecies
  );
  const { status: evolutionChainStatus, data: evolutionChainData } = useQuery(
    pokemonSpeciesData && pokemonSpeciesData.evolution_chain.url,
    Api.evolutionChain
  );

  useEffect(() => {
    if (
      pokemonStatus === "loading" ||
      pokemonSpeciesStatus === "loading" ||
      evolutionChainStatus === "loading"
    ) {
      setStatus("loading");
    }

    if (
      pokemonStatus === "success" &&
      pokemonSpeciesStatus === "success" &&
      evolutionChainStatus === "success"
    ) {
      setStatus("success");
      setData({
        pokemon: pokemonData,
        species: pokemonSpeciesData,
        evolutionChain: evolutionChainData,
      });
    }

    if (
      pokemonStatus === "error" ||
      pokemonSpeciesStatus === "error" ||
      evolutionChainStatus === "error"
    ) {
      setStatus("error");
    }
  }, [pokemonStatus, pokemonSpeciesStatus, evolutionChainStatus]);

  return {
    status,
    data,
  };
};
