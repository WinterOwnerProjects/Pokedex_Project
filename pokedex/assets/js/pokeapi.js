const PokeApi = {}

PokeApi.convert_api_to_object = (pokemon_details) => {
    const pokemon = new Pokemon();
    pokemon.number = pokemon_details.id
    pokemon.name = pokemon_details.name
    const types = pokemon_details.types.map((types) => types.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokemon_details.sprites.front_default
    return pokemon
}
PokeApi.get_pokemon_detail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(PokeApi.convert_api_to_object)       
}
PokeApi.get_pokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((json_body) => json_body.results)
        .then((pokemons) => pokemons.map(PokeApi.get_pokemon_detail))
        .then((pokemon_details) => Promise.all(pokemon_details))
        .then((pokemons) => pokemons);
}
