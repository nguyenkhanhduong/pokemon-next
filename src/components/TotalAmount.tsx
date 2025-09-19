import { fetchPokemonListIds } from "@/lib/pokemon-api";

export default async function TotalAmount({
  page,
  selectedTypes,
}: {
  page: number;
  selectedTypes: string[];
}) {
  const [pokemonData] = await Promise.all([
    fetchPokemonListIds(
      page,
      selectedTypes.length === 0 ? undefined : selectedTypes
    ),
  ]);

  return <p>Total: {pokemonData.pagination.totalCount}</p>;
}
