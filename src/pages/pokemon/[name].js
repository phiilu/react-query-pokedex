import React from "react";
import { useRouter } from "next/router";
import { colors } from "config";
import { getCombinedType } from "utils/pokemon";
import { usePokemon } from "utils/hooks";

const SectionHeading = ({ children }) => {
  return <h1 className="text-lg font-semibold">{children}</h1>;
};

const PokemonDetail = () => {
  const { name } = useRouter().query;
  const { status, data } = usePokemon(name);

  if (status === "loading") {
    return <p>Loading ...</p>;
  }

  // console.log(status, data);

  const { types, moves } = data.pokemon;
  const { names } = data.species;
  const { chain } = data.evolutionChain;

  console.log({ data });

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
    <article className="container px-4 py-8 mx-auto space-y-5 md:px-0 ">
      <div
        className="grid p-6 rounded-md shadow-xl md:grid-cols-2"
        style={{ background: colors[getCombinedType(types)] }}
      >
        <img
          src={`https://img.pokemondb.net/sprites/home/normal/${name}.png`}
          alt={name}
          className="mx-auto"
        />
        <div>
          <div className="text-3xl">
            <h1 className="inline capitalize">{names[5].name}</h1> /{" "}
            {types.map(({ type }) => (
              <span className="mr-2" key={type.name} type={type}>
                {type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section>
        <SectionHeading>Evolution Chain</SectionHeading>
        <ul className="flex">
          <li>
            <img
              src={`https://img.pokemondb.net/sprites/home/normal/${chain.species.name}.png`}
              alt={chain.species.name}
            />
          </li>
          {renderEvolutionChain(chain.evolves_to)}
        </ul>
      </section>

      <section>
        <SectionHeading>Moves</SectionHeading>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {moves.map(({ move }) => {
              return (
                <tr key={move.name}>
                  <td>{move.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </article>
  );
};

export default PokemonDetail;
