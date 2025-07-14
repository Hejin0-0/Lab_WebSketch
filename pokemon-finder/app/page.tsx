import { PokemonTile } from '@/app/components/PokemonTile'
import { PokemonGrid } from '@/app/components/PokemonGrid'
import { getPokemonList } from '@/app/lib/pokemonApi'
import Image from 'next/image'

export default async function Home() {

  // Load in data
  const pokemonList = await getPokemonList();

  // We can pass the data to a client component.


  // Text input: Filter the pokemon Tiles under it:
  // Text input -> "use client" we need to access to useState to handle the data
  // When the text is inputted -> filter through our current pokemon data.
  // ("use client") PokemonGrid -> (Text input, showing all the Tiles that match the filter)

  // We are going to get data for the 151 pokemon from a server component.

  // Pass the data to PokemonGrid

  // 1. Create PokemonGrid (and more components)
  // 2. Load in the data from Pokemon API (151 Pokemon)
  // 3. Pass the data to PokemonGrid, show all the pokemon from API call.


  return (
    <PokemonGrid pokemonList={pokemonList} />
  )
}
