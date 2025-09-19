import {
  Pokemon,
  PokemonListResponse,
  PokemonTypeListResponse,
  PokemonByTypeResponse,
  PaginationInfo,
  PokemonListData,
} from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";
const POKEMON_PER_PAGE = 24;

// Helper function to extract Pokemon ID from URL
function getPokemonIdFromUrl(url: string): number {
  const matches = url.match(/\/pokemon\/(\d+)\//);
  return matches ? parseInt(matches[1]) : 0;
}

// Helper function to create pagination response with Pokemon IDs only
async function createPaginationResponse(
  pokemonIds: number[],
  page: number,
  pageSize: number = POKEMON_PER_PAGE
): Promise<PokemonListData> {
  const totalCount = pokemonIds.length;
  const totalPages = Math.ceil(totalCount / pageSize);

  // Calculate pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedIds = pokemonIds.slice(startIndex, endIndex);

  return {
    pokemonIds: paginatedIds,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  };
}

// Fetch all Pokemon types
export async function fetchPokemonTypes(): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/type`);
    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon types");
    }

    const data: PokemonTypeListResponse = await response.json();
    // Filter out unknown and shadow types that might cause issues
    return data.results
      .map((type) => type.name)
      .filter((name) => !["unknown", "shadow"].includes(name));
  } catch (error) {
    console.error("Error fetching Pokemon types:", error);
    return [];
  }
}

// Fetch Pokemon IDs by multiple types (flexible filtering)
export async function fetchPokemonIdsByMultipleTypes(
  typeNames: string[],
  page: number = 1,
  pageSize: number = POKEMON_PER_PAGE
): Promise<PokemonListData> {
  try {
    if (typeNames.length === 0) {
      return {
        pokemonIds: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalCount: 0,
          hasNext: false,
          hasPrevious: false,
        },
      };
    }

    if (typeNames.length === 1) {
      return await fetchPokemonIdsByType(typeNames[0], page, pageSize);
    }

    // Fetch Pokemon data for each selected type
    const typePromises = typeNames.map(async (typeName) => {
      const response = await fetch(`${BASE_URL}/type/${typeName}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon of type ${typeName}`);
      }
      const data: PokemonByTypeResponse = await response.json();
      return {
        typeName,
        pokemon: data.pokemon.map((pokemonSlot) => ({
          id: getPokemonIdFromUrl(pokemonSlot.pokemon.url),
          name: pokemonSlot.pokemon.name,
          url: pokemonSlot.pokemon.url
        }))
      };
    });

    const typeResults = await Promise.all(typePromises);
    let combinedPokemonIds: number[] = [];

    if (typeNames.length === 1) {
      // Single type - return all Pokemon of that type
      combinedPokemonIds = typeResults[0].pokemon.map(p => p.id);
    } else if (typeNames.length === 2) {
      // Two types - find intersection (Pokemon that have both types)
      const firstTypePokemon = typeResults[0].pokemon;
      const secondTypePokemon = new Set(typeResults[1].pokemon.map(p => p.id));
      
      combinedPokemonIds = firstTypePokemon
        .filter(pokemon => secondTypePokemon.has(pokemon.id))
        .map(pokemon => pokemon.id);
    } else {
      // Multiple types - use flexible counting approach
      const pokemonTypeCount = new Map<number, number>();
      const pokemonData = new Map<number, { id: number; name: string; url: string }>();

      // Count how many of the selected types each Pokemon has
      typeResults.forEach(typeResult => {
        typeResult.pokemon.forEach(pokemon => {
          pokemonData.set(pokemon.id, pokemon);
          pokemonTypeCount.set(
            pokemon.id,
            (pokemonTypeCount.get(pokemon.id) || 0) + 1
          );
        });
      });

      // For 3+ types, require Pokemon to have at least 2 of the selected types
      const minTypes = Math.min(2, typeNames.length);
      combinedPokemonIds = Array.from(pokemonTypeCount.entries())
        .filter(([, count]) => count >= minTypes)
        .map(([id]) => id);
    }

    const uniquePokemonIds = [...new Set(combinedPokemonIds)];

    return await createPaginationResponse(uniquePokemonIds, page, pageSize);
  } catch (error) {
    console.error(`Error fetching Pokemon IDs of multiple types:`, error);
    return {
      pokemonIds: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasNext: false,
        hasPrevious: false,
      },
    };
  }
}

// Fetch Pokemon IDs by type (optimized version)
export async function fetchPokemonIdsByType(
  typeName: string,
  page: number = 1,
  pageSize: number = POKEMON_PER_PAGE
): Promise<PokemonListData> {
  try {
    const response = await fetch(`${BASE_URL}/type/${typeName}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon of type ${typeName}`);
    }

    const data: PokemonByTypeResponse = await response.json();
    const pokemonIds = data.pokemon.map((pokemonSlot) =>
      getPokemonIdFromUrl(pokemonSlot.pokemon.url)
    );

    return await createPaginationResponse(pokemonIds, page, pageSize);
  } catch (error) {
    console.error(`Error fetching Pokemon IDs of type ${typeName}:`, error);
    return {
      pokemonIds: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasNext: false,
        hasPrevious: false,
      },
    };
  }
}

// Fetch single Pokemon by ID
export async function fetchPokemonById(id: number): Promise<Pokemon | null> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`, {
      next: { 
        revalidate: 60 // Cache for 1 hour (3600 seconds)
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon with ID ${id}`);
    }

    const pokemon: Pokemon = await response.json();
    return pokemon;
  } catch (error) {
    console.error(`Error fetching Pokemon ${id}:`, error);
    return null;
  }
}

// Fetch paginated Pokemon list with IDs only (optimized version)
export async function fetchPokemonListIds(
  page: number = 1,
  typeFilters?: string[]
): Promise<PokemonListData> {
  try {
    // If filtering by types, fetch Pokemon IDs with those types
    if (typeFilters && typeFilters.length > 0) {
      return await fetchPokemonIdsByMultipleTypes(
        typeFilters,
        page,
        POKEMON_PER_PAGE
      );
    }

    // Fetch general Pokemon list with pagination (IDs only)
    const offset = (page - 1) * POKEMON_PER_PAGE;
    const response = await fetch(
      `${BASE_URL}/pokemon?limit=${POKEMON_PER_PAGE}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon list");
    }

    const data: PokemonListResponse = await response.json();
    const pokemonIds = data.results.map((pokemonItem) =>
      getPokemonIdFromUrl(pokemonItem.url)
    );

    const totalPages = Math.ceil(data.count / POKEMON_PER_PAGE);

    return {
      pokemonIds,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount: data.count,
        hasNext: data.next !== null,
        hasPrevious: data.previous !== null,
      },
    };
  } catch (error) {
    console.error("Error fetching Pokemon list IDs:", error);
    return {
      pokemonIds: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasNext: false,
        hasPrevious: false,
      },
    };
  }
}
