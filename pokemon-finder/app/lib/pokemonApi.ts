
const POKEMON_API_BASE = "https://pokeapi.co/api/v2/";
const POKEMON_NUM_LIMIT = "pokemon?limit=151&offset=0"; // 151 pokemon, starting from 0


// getPokemonList -> get the first 151 pokemon from PokemonAPI
export async function getPokemonList() {
    const response = await fetch(POKEMON_API_BASE + POKEMON_NUM_LIMIT);
    const data = await response.json();
    return data.results;
}
// getPokemon -> given a string "pikachu", get the pokemon information
export async function getPokemon(name: string) {
    //pokemon/ditto
    const response = await fetch(POKEMON_API_BASE + "pokemon/" + name);
    const data = await response.json();
    return data;
}

export async function getPokemonNames() {
    try {
        const pokemonList = await getPokemonList();
        return pokemonList.map((pokemon: any) => pokemon.name);
    } catch (error) {
        console.error('Failed to fetch Pokemon list:', error);
        return [];
    }
}


// getPokemon -> given a string "pikachu", get the information of that pokemon