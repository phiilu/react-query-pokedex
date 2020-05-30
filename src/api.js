const Api = {
  pokemon: (key, id) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
      res.json()
    );
  },
  pokemonSpecies: (key, id) => {
    return fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    ).then((res) => res.json());
  },
  evolutionChain: (key) => {
    return fetch(key).then((res) => res.json());
  },
  types: () => {
    return fetch(`https://pokeapi.co/api/v2/type`).then((res) => res.json());
  },
};

export default Api;
