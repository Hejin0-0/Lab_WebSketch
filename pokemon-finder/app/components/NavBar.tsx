"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'
import { SiPokemon } from "react-icons/si"
import { CgPokemon } from "react-icons/cg";
import classNames from 'classnames'; // https://www.npmjs.com/package/classnames
import { getRandomInt, getRandomPokemonName } from '@/app/lib/utils';
import { getPokemon, getPokemonList } from '@/app/lib/pokemonApi';
import { useRouter } from 'next/navigation';

// blue #0075BE and yellow #FFCC00, pokemon colors


const NavBar = () => {

    const [randomPokemon, setRandomPokemon] = useState('');

    const router = useRouter();

    // useEffect(() => {
    //     getRandomPokemonName().then((pokemonName) => {
    //         setRandomPokemon(pokemonName);
    //     }).catch((error) => {
    //         console.error("Error fetchin random Pokemon name: ", error);
    //     })
    // }, [onclick, setRandomPokemon]);

    const handleRandomPokemonClick = async (e: any) => {
        e.preventDefault();
        try {
            console.log("Getting random pokemon")
            const newName = await getRandomPokemonName();
            setRandomPokemon(newName);
            router.push(`/${newName}`);
        }
        catch (error) {
            console.error("Error fetching random Pokemon name: ", error);
        }
    }

    const currentPath = usePathname();
    console.log(currentPath);

    const links = [
        {
            id: 0,
            label: <div className="flex flex-row flex-wrap justify-between items-center"><CgPokemon className="w-6 h-6 text-blue-500" />
                <span>Pokemon Finder</span></div>,
            href: '/'
        },
        {
            id: 1,
            label: <div onClick={handleRandomPokemonClick}>Random Pokemon</div>,
            href: `/${randomPokemon} `

        },
    ];


    return (
        <nav className='flex space-x-6 border-b-2 border-black bg-amber-400 mb-5 px-5 h-10 items-center fixed w-full z-10' >
            {/* <Link href={"/"} className="flex items-center ">
                <CgPokemon className="w-6 h-6" />
                <span className="flex-shrink-0">Pokemon Finder</span>
            </Link> */}
            < ul className='flex space-x-6' >
                {
                    links.map((link) => (
                        <Link key={link.id} href={link.href}
                            className={classNames({
                                'text-blue-400': link.href === currentPath,
                                'text-blue-600': link.href !== currentPath,
                                'hover:text-blue-800 transision-colors': true,
                            })}
                        >
                            {link.label}
                        </Link>
                    ))
                }
            </ul >
        </nav >
    )
}

export default NavBar