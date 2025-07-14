import Link from "next/link"

// if at pikachu, --> point at localhost:3000/pikachu
// <PokemonTile name="pikachu" /> -->

interface PokemonTileProps {
    name: string;
}

export function PokemonTile({ name }: PokemonTileProps) {
    return (
        <Link
            href={name}
            className="group rounded-lg border-2 border-transparent m-2 px-5 py-4 transition-colors dark:border-slate-200 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            key={name + "Tile"}
        >
            <h2 className={`text-2xl font-semibold`}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
            </h2>

        </Link>
    )
}