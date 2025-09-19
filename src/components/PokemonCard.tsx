'use client';

'use client';

import Image from 'next/image';
import { Pokemon } from '@/types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  // Get Pokemon sprite URL
  const getSpriteUrl = () => {
    return pokemon.sprites?.front_default || 
           `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  };

  return (
    <div className="flex flex-col items-center justify-between border p-4">
      <h3>{pokemon.name}</h3>
      <Image
        src={getSpriteUrl()}
        alt={pokemon.name}
        width={80}
        height={80}
        className="w-20"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
        }}
      />
      <p>Number: {pokemon.id}</p>
    </div>
  );
}