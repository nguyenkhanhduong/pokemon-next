import { fetchPokemonTypes } from "@/lib/pokemon-api";
import Link from "next/link";

interface TypeFilterProps {
  selectedTypes: string[];
  searchParams: {
    page?: string;
    type?: string;
  };
}

export default async function TypeFilter({
  selectedTypes,
  searchParams,
}: TypeFilterProps) {
  const params = new URLSearchParams(searchParams as Record<string, string>);
  const types = await fetchPokemonTypes();

  // Handle type filter change
  const getUrl = (type: string) => {
    const currentTypes = [...selectedTypes];

    if (type === "all") {
      // If "all" is clicked, clear all selections
      params.delete("type");
    } else if (currentTypes.includes(type)) {
      // If type is already selected, remove it
      const newTypes = currentTypes.filter((t) => t !== type);
      if (newTypes.length === 0) {
        params.delete("type");
      } else {
        params.set("type", newTypes.join(","));
      }
    } else {
      // If type is not selected, add it
      const newTypes = [...currentTypes, type];
      params.set("type", newTypes.join(","));
    }

    // Reset to page 1 when filter changes
    params.set("page", "1");
    const queryString = params.toString();
    const url = queryString ? `/?${queryString}` : "/";
    return url;
  };

  return (
    <section className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <span>Types:</span>

      {/* Individual type buttons */}
      {types.map((type) => (
        <Link
          key={type}
          className={
            selectedTypes.includes(type)
              ? "border p-4 bg-blue-500 text-white"
              : "border p-4"
          }
          href={getUrl(type)}
        >
          {type}
        </Link>
      ))}
    </section>
  );
}
