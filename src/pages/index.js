import { ReactQueryConfigProvider } from "react-query";
import Link from "next/link";
import { colors, Pokedex } from "config";
import { usePokemon } from "utils/hooks";
import { getCombinedType } from "utils/pokemon";

const Type = ({ type }) => {
  return (
    <div>
      <span className="text-xs font-semibold leading-3 tracking-wide uppercase">
        {type.name}
      </span>
    </div>
  );
};

const Pokemon = ({ name }) => {
  const { status, data } = usePokemon(name);

  if (status === "loading") {
    return <div className="rounded loading" />;
  }

  console.log(status, data);

  const { types } = data.pokemon;
  const { names } = data.species;

  const pokemonName = names[5].name;
  const background = colors[getCombinedType(types)] ?? "pink";

  return (
    <Link href="/pokemon/[name]" as={`/pokemon/${name}`}>
      <a>
        <div
          className="p-4 space-y-1 transition-transform duration-300 ease-in-out transform rounded-md shadow-lg cursor-pointer pokemon-box hover:scale-110"
          style={{ background }}
        >
          <img
            style={{ width: 128, height: 128 }}
            className="mx-auto"
            src={`https://img.pokemondb.net/sprites/home/normal/${name}.png`}
            alt={pokemonName}
          ></img>
          <h1 className="text-lg font-bold text-center capitalize">
            {pokemonName}
          </h1>
          <div className="flex justify-center space-x-2">
            {types.map(({ type }) => (
              <Type key={type.name} type={type} />
            ))}
          </div>
        </div>
      </a>
    </Link>
  );
};

const PokemonList = () => {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {Pokedex.map((name) => {
        return (
          <li key={name}>
            <Pokemon name={name} />
          </li>
        );
      })}
    </ul>
  );
};

export default function IndexPage() {
  const queryConfig = { refetchAllOnWindowFocus: false };

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <article className="container px-4 py-8 mx-auto space-y-5 md:px-0 ">
        <PokemonList />
      </article>
    </ReactQueryConfigProvider>
  );
}
