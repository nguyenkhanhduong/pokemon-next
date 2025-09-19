export interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: PokemonTypeSlot[];
}

export interface PokemonTypeSlot {
  slot: number;
  type: PokemonType;
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonTypeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonType[];
}

export interface PokemonByTypeResponse {
  id: number;
  name: string;
  pokemon: PokemonByTypeSlot[];
}

export interface PokemonByTypeSlot {
  pokemon: PokemonListItem;
  slot: number;
}

export interface PokemonBasicInfo {
  id: number;
  name: string;
  url: string;
}

export interface PokemonListData {
  pokemonIds: number[];
  pagination: PaginationInfo;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
}