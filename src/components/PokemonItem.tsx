import { Suspense } from "react";
import { fetchPokemonById } from "@/lib/pokemon-api";
import PokemonCard from "./PokemonCard";

interface PokemonItemProps {
  pokemonId: number;
}

// Loading skeleton component for individual Pokemon card
function PokemonCardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-between border p-4 animate-pulse">
      <div className="w-16 h-6 "></div>
      <div className="w-20 h-20 bg-gray-300 rounded "></div>
      <div className="w-20 h-6"></div>
    </div>
  );
}

// Server component that fetches individual Pokemon data
async function PokemonItemContent({ pokemonId }: PokemonItemProps) {
  const pokemon = await fetchPokemonById(pokemonId);

  if (!pokemon) {
    return (
      <div className="flex flex-col items-center justify-between border p-4">
        <p className="text-gray-500">Failed to load Pokemon</p>
      </div>
    );
  }

  return <PokemonCard pokemon={pokemon} />;
}

// Main component with Suspense boundary
export default function PokemonItem({ pokemonId }: PokemonItemProps) {
  return (
    <Suspense fallback={<PokemonCardSkeleton />}>
      <PokemonItemContent pokemonId={pokemonId} />
    </Suspense>
  );
}
