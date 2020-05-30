import React from "react";
import { useQuery } from "react-query";
import Api from "../../api";
import { useRouter } from "next/router";

const PokemonDetail = () => {
  const { name } = useRouter().query;
  const { status, data } = useQuery(["pokemon", name], Api.pokemon);

  console.log(status, data);
  return <div>{name}</div>;
};

export default PokemonDetail;
