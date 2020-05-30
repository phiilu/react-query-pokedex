const Api = {
  pokemon: (key, id) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
      res.json()
    );
  },
};

export default Api;
