import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { getPokemonNames } from "./pokemonApi";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getRandomPokemonName() {
  const pokemonNames: [] = await getPokemonNames();
  const randomIndex = Math.floor(Math.random() * pokemonNames.length)
  console.log("randomIndex", pokemonNames[randomIndex])
  return pokemonNames[randomIndex];
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getPokemonColor(type: string) {
  switch (type) {
    case "normal":
      return "#A8A77A";
    case "fire":
      return "#EE8130";
    case "water":
      return "#6390F0";
    case "electric":
      return "#F7D02C";
    case "grass":
      return "#7AC74C";
    case "ice":
      return "#96D9D6";
    case "fighting":
      return "#C22E28";
    case "poison":
      return "#A33EA1";
    case "ground":
      return "#E2BF65";
    case "flying":
      return "#A98FF3";
    case "psychic":
      return "#F95587";
    case "bug":
      return "#A6B91A";
    case "rock":
      return "#B6A136";
    case "ghost":
      return "#735797";
    case "dragon":
      return "#6F35FC";
    case "dark":
      return "#705746";
    case "steel":
      return "#B7B7CE";
    case "fairy":
      return "#D685AD";
    default:
      return "#000000";
  }
}
