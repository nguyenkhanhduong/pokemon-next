import { Suspense } from "react";
import PokemonGrid from "@/components/PokemonGrid";
import TypeFilter from "@/components/TypeFilter";
import TotalAmount from "@/components/TotalAmount";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    type?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");

  // Handle multiple types from URL parameters
  const typeParam = params.type;
  const selectedTypes = typeParam ? typeParam.split(",").filter(Boolean) : [];

  return (
    <section className="flex flex-col gap-4 px-10">
      <p className="py-4 text-center">Welcome to Pokemon world</p>
      <Suspense fallback={<div>Loading total...</div>}>
        <TotalAmount page={page} selectedTypes={selectedTypes} />
      </Suspense>
      {/* Type Filter */}
      <Suspense fallback={<div>Loading types...</div>}>
        <TypeFilter searchParams={params} selectedTypes={selectedTypes} />
      </Suspense>

      {/* Pokemon Grid */}
      <PokemonGrid page={page} selectedTypes={selectedTypes} />
    </section>
  );
}
