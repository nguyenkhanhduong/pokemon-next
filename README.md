# Pokemon Explorer 🔍

A modern Pokemon exploration app built with [Next.js](https://nextjs.org) that allows users to browse, filter, and discover Pokemon using the [PokéAPI](https://pokeapi.co/).

## ✨ Features

- **Pokemon Grid**: Browse Pokemon with a responsive grid layout
- **Type Filtering**: Filter Pokemon by one or multiple types
- **Pagination**: Navigate through Pokemon with efficient pagination
- **Total Count Display**: View total Pokemon count based on applied filters
- **Responsive Design**: Optimized for desktop and mobile devices
- **Server-Side Rendering**: Fast loading with Next.js App Router

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main page with Pokemon grid and filters
│   ├── layout.tsx        # Root layout component
│   └── globals.css       # Global styles
├── components/
│   ├── PokemonGrid.tsx   # Grid layout for Pokemon cards
│   ├── PokemonCard.tsx   # Individual Pokemon card component
│   ├── PokemonItem.tsx   # Pokemon item display
│   ├── TypeFilter.tsx    # Type filtering component
│   ├── TotalAmount.tsx   # Total Pokemon count display
│   └── Pagination.tsx    # Pagination controls
├── lib/
│   └── pokemon-api.ts    # API functions for PokéAPI integration
└── types/
    └── pokemon.ts        # TypeScript type definitions
```

## 🚀 Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the Pokemon Explorer.

## 🎮 How to Use

1. **Browse Pokemon**: The main page displays a grid of Pokemon cards
2. **Filter by Type**: Use the type filter to narrow down Pokemon by their types
3. **Multiple Type Filtering**: Select multiple types to find Pokemon that match ALL selected types
4. **Navigate Pages**: Use pagination controls to browse through all Pokemon
5. **View Total Count**: See how many Pokemon match your current filters

## 🛠️ Technologies Used

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **PokéAPI** - RESTful Pokemon data API
- **pnpm** - Fast, disk space efficient package manager

## 📊 API Integration

The app integrates with PokéAPI to provide:

- **Pokemon Data**: Fetch individual Pokemon details
- **Type Information**: Get all available Pokemon types
- **Filtered Results**: Find Pokemon by specific types
- **Pagination**: Efficient data loading with pagination
- **Caching**: Optimized API calls with Next.js caching

## 🔧 API Functions

Key API functions in `lib/pokemon-api.ts`:

- `fetchPokemonListIds()` - Get paginated Pokemon IDs with optional type filtering
- `fetchPokemonById()` - Get detailed Pokemon information
- `fetchPokemonTypes()` - Get all available Pokemon types
- `fetchTotalPokemonCount()` - Get total count with optional type filtering
- `fetchPokemonIdsByMultipleTypes()` - Find Pokemon matching multiple types

## 🎨 Component Architecture

- **Server Components**: Used for data fetching and initial rendering
- **Client Components**: Used for interactive elements like filters
- **Suspense Boundaries**: Provide loading states for better UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [PokéAPI Documentation](https://pokeapi.co/docs/v2) - Explore the Pokemon API
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
