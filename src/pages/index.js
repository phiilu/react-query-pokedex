
import { useQuery, ReactQueryConfigProvider } from 'react-query'
import { colors, Pokedex } from '../config';

const Api = {
  pokemon: (key, id) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json());
  }
}

const Type = ({ type }) => {
  return (
    <div>
      <span className="text-xs font-semibold leading-3 tracking-wide uppercase">{type.name}</span>
    </div>
  )
}

const Pokmeon = ({ nr }) => {
  const { status, data } = useQuery(['pokemon', nr], Api.pokemon);

  if (status === 'loading') {
    return <div className='rounded loading' />;
  }

  const { types } = data;
  const combinedType = data.types.reduce((backgroundColor, type) => {
    backgroundColor += type.type.name;
    return backgroundColor;
  }, '');
  const background = colors[combinedType] ?? 'pink';

  return (
    <div className='p-4 space-y-1 transition-transform duration-300 ease-in-out transform rounded-md shadow-lg cursor-pointer pokemon-box hover:scale-110' style={{ background }}>
      <img style={{ width: 128, height: 128 }} className="mx-auto" src={`https://img.pokemondb.net/sprites/home/normal/${data.name}.png`} alt={data.name}></img>
      <h1 className="text-lg font-bold text-center capitalize">
        {data.name}
      </h1>
      <div className='flex justify-center space-x-2'>
        {types.map(({ type }) => <Type key={type.name} type={type} />)}
      </div>
    </div>
  )
}

const PokemonList = () => {
  return (
    <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
      {Pokedex.map(nr => {
        return <li key={nr}>
          <Pokmeon nr={nr} />
        </li>
      })}
    </ul>
  )
}

export default function IndexPage() {
  const queryConfig = { refetchAllOnWindowFocus: false }

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <div className='bg-orange-100'>
        <main className='container py-8 mx-auto space-y-5 '>
          <h1 className="text-center text-red-600 text-10xl font-chelsea">Pokédex</h1>
          <PokemonList ></PokemonList>
        </main>
        <footer className="bg-red-200">
          <div className="container p-4 mx-auto text-center text-red-900">
            Made by <a className="pb-1 font-bold " href='https://github.com/phiilu'>@phiilu</a>
          </div>
        </footer>
      </div>
    </ReactQueryConfigProvider>
  )
}
