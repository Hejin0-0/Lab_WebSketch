"use client";
import Image from "next/image";
import { getPokemon } from "@/app/lib/pokemonApi";
import { PokemonImage } from "@/app/components/PokemonImage";
import { Progress } from "@/app/components/ui/progress";
import { useEffect, useState } from "react";
// pokemonName

// pokemonName = "pikachu" --> show pikachu page with stats and image

export default function PokemonCard({ pokemonName }: { pokemonName: string }) {

    // useState to store the pokemonObject
    const [pokemonObject, setPokemonObject] = useState<Pokemon | null>(null);

    useEffect(() => {
        async function fetchPokemon() {
            const data = await getPokemon(pokemonName);
            setPokemonObject(data);
        }
        fetchPokemon();
    }, [pokemonName])

    // // Object destructuring to get the pokemonName from params
    // const { pokemonName } = params;
    // // pikachu --> Pikachu
    // // get the API data from pikachu
    // const pokemonObject = await getPokemon(pokemonName);
    // console.log(pokemonObject);


    if (!pokemonObject) {
        return <div>Loading...</div>;
    }
    else {

        return (
            <>
                <h1 className="text-4xl text-bold">{pokemonName}</h1>
                <div className="m-4" style={{ position: "relative", width: "300px", height: "300px" }}>
                    <PokemonImage
                        image={pokemonObject.sprites.other['official-artwork'].front_default} //pokemonObject.sprites.front_default
                        name={pokemonName}
                    />
                </div >
                {/* <span><p>Weight: {pokemonObject.weight}</p> <p>Type: {pokemonObject.types[0].type.name}</p ></span > */}

                <div className="flex justify-between p-2 m-3 w-full">
                    <p>Weight: {pokemonObject.weight}</p>
                    <p>Type: {pokemonObject.types[0].type.name}</p>
                </div>
                <br />

                <div className="flex-col">
                    {pokemonObject.stats.map((statObject: any) => {
                        // Store the stats (name, base_stat, etc..) in statObject
                        const statName = statObject.stat.name;
                        const statValue = statObject.base_stat;
                        return (
                            <div className="flex items-stretch" style={{ width: "600px" }} key={statName}>
                                <h3 className="p-3 w-2/4">{statName}: {statValue}</h3>
                                <Progress value={statValue} />
                            </div>
                        )
                    })}
                </div>
            </>
        )

    }
}