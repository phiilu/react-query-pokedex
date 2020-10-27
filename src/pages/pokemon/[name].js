import React from "react";
import { useRouter } from "next/router";
import { colors } from "config";
import { getCombinedType } from "utils/pokemon";
import { usePokemon } from "utils/hooks";

const SectionHeading = ({ children }) => {
  return <h2 className="text-2xl font-semibold">{children}</h2>;
};

const PokemonDetail = () => {
  const { name } = useRouter().query;
  const { status, data } = usePokemon(name);

  if (status === "loading") {
    return <p>Loading ...</p>;
  }

  const { types, moves } = data.pokemon;
  const { names } = data.species;
  const { chain } = data.evolutionChain;
  const hasEvolution = chain.evolves_to.length > 0;

  const renderEvolutionChain = (evolves_to) => {
    const evolutions = evolves_to.map((evolution) => {
      if (evolution.evolves_to.length > 0) {
        return (
          <React.Fragment key={evolution.species.name}>
            <li>
              <img
                src={`https://img.pokemondb.net/sprites/home/normal/${evolution.species.name}.png`}
                alt={evolution.species.name}
              />
            </li>
            <ul className="flex">
              {renderEvolutionChain(evolution.evolves_to)}
            </ul>
          </React.Fragment>
        );
      }

      return (
        <li key={evolution.species.name}>
          <img
            src={`https://img.pokemondb.net/sprites/home/normal/${evolution.species.name}.png`}
            alt={evolution.species.name}
          />
        </li>
      );
    });

    return <ul className="flex">{evolutions}</ul>;
  };

  return (
    <div
      className="min-h-full"
      style={{ background: colors[getCombinedType(types)] }}
    >
      <article className="container px-4 py-8 mx-auto space-y-5 md:px-0">
        <section>
          <div className="text-3xl">
            <h1 className="inline font-bold capitalize">{names[5].name}</h1> /{" "}
            {types.map(({ type }) => (
              <span className="mr-2" key={type.name} type={type}>
                {type.name}
              </span>
            ))}
          </div>

          <img
            src={`https://img.pokemondb.net/sprites/home/normal/${name}.png`}
            alt={name}
            className="mx-auto"
          />
        </section>

        {hasEvolution && (
          <section className="space-y-4">
            <SectionHeading>Evolution Chain</SectionHeading>
            <ul className="flex justify-center">
              <li>
                <img
                  src={`https://img.pokemondb.net/sprites/home/normal/${chain.species.name}.png`}
                  alt={chain.species.name}
                />
              </li>
              {renderEvolutionChain(chain.evolves_to)}
            </ul>
          </section>
        )}

        <section className="space-y-4">
          <SectionHeading>Moves</SectionHeading>
          <ul className="grid grid-cols-5 gap-4">
            {moves.map(({ move }) => {
              return (
                <li
                  key={move.name}
                  className="px-6 py-4 text-center bg-gray-300 rounded-md"
                >
                  <span className="font-semibold text-gray-900 uppercase">
                    {move.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </article>
    </div>
  );
};

export default PokemonDetail;
