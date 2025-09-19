import PokemonItem from "./PokemonItem";
import { fetchPokemonListIds } from "@/lib/pokemon-api";
import Pagination from "./Pagination";

interface PokemonGridProps {
  isLoading?: boolean;
  selectedTypes: string[];
  page?: number;
}

// Loading skeleton component
function PokemonCardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-between border p-4 animate-pulse">
      <div className="w-16 h-6 bg-gray-300 rounded mb-2"></div>
      <div className="w-20 h-20 bg-gray-300 rounded mb-2"></div>
      <div className="w-20 h-4 bg-gray-300 rounded"></div>
    </div>
  );
}

export default async function PokemonGrid({
  isLoading = false,
  selectedTypes,
  page = 1,
}: PokemonGridProps) {
  const [pokemonData] = await Promise.all([
    fetchPokemonListIds(page, selectedTypes.length === 0 ? undefined : selectedTypes),
  ]);

  if (isLoading) {
    return (
      <section className="grid grid-cols-6 gap-x-16 gap-y-6">
        {Array.from({ length: 24 }).map((_, index) => (
          <PokemonCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (pokemonData.pokemonIds.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No Pokemon found</p>
      </div>
    );
  }

  return (
    <>
      <section className="grid grid-cols-6 gap-x-16 gap-y-6">
        {pokemonData.pokemonIds.map((pokemonId) => (
          <PokemonItem key={pokemonId} pokemonId={pokemonId} />
        ))}
      </section>
      <Pagination pagination={pokemonData.pagination} />
    </>
  );
}
