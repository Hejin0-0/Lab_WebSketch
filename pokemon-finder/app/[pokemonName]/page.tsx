// Server Component
import Image from "next/image";
import { getPokemon } from "@/app/lib/pokemonApi";
import { PokemonImage } from "@/app/components/PokemonImage";
import { Progress } from "@/app/components/ui/progress";
import { Card, CardHeader } from "@/app/components/ui/card";
import { getPokemonColor } from "@/app/lib/utils";
// pokemonName

// pokemonName = "pikachu" --> show pikachu page with stats and image

export default async function PokemonPage({ params }: { params: { pokemonName: string } }) {
    // Object destructuring to get the pokemonName from params
    const { pokemonName } = params;
    // pikachu --> Pikachu
    // get the API data from pikachu
    const pokemonObject = await getPokemon(pokemonName);
    console.log(pokemonObject);

    const pokemonColor = getPokemonColor(pokemonObject.types[0].type.name);
    console.log(pokemonColor);

    const cardStyle = {
        backgroundColor: pokemonColor, // This sets the background color  bg-slate-600
    };

    return (
        <>
            <Card className=" border-black border-8" style={cardStyle}>
                <div className="border-4 border-yellow-500  p-4">
                    <h1 className="text-4xl text- text-bold text-border pb-2">{pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}</h1>
                    <CardHeader className="flex items-center justify-center border-4 border-yellow-300 bg-slate-600">
                        <div className="m-4" style={{ position: "relative", width: "300px", height: "300px" }}>
                            <PokemonImage
                                image={pokemonObject.sprites.other['official-artwork'].front_default} //pokemonObject.sprites.front_default
                                name={pokemonName}
                            />
                        </div >

                    </CardHeader>

                    {/* <span><p>Weight: {pokemonObject.weight}</p> <p>Type: {pokemonObject.types[0].type.name}</p ></span > */}

                    <div className="flex justify-between p-2 mr-4 w-full text-black">
                        <p>Weight: {pokemonObject.weight}</p>
                        <p>Type: {pokemonObject.types[0].type.name}</p>
                    </div>
                    <br />

                    <div className="flex-col text-black">
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
                </div>
            </Card>
        </>
    )
};