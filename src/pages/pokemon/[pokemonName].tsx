import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { pokemonName } = context.params as { pokemonName: string };
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
        throw new Error("Pokemon Not Found!");
    }
    const data = await response.json();
    const pokemon = {
        name: data.name,
        image: data.sprites.front_default,
        weight: data.weight,
        type: data.types[0].type.name,
        hitPoint: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat
    }

    return {
        props: { pokemon: pokemon },
    };
};

export default function PokemonData({
    pokemon,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 px-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
                <h1 className="text-3xl font-bold mb-4 capitalize">{pokemon.name}</h1>
                <div className="mb-4">
                    <Image
                        src={pokemon.image}
                        alt={pokemon.name}
                        width={150}
                        height={150}
                        className="mx-auto"
                    />
                </div>
                <div className="text-left">
                    <p className="text-lg font-semibold mb-2">Weight: <span className="font-normal">{pokemon.weight} kg</span></p>
                    <p className="text-lg font-semibold mb-2">Type: <span className="font-normal capitalize">{pokemon.type}</span></p>
                    <p className="text-lg font-semibold mb-2">Hit Points: <span className="font-normal">{pokemon.hitPoint}</span></p>
                    <p className="text-lg font-semibold mb-2">Attack: <span className="font-normal">{pokemon.attack}</span></p>
                    <p className="text-lg font-semibold mb-2">Defense: <span className="font-normal">{pokemon.defense}</span></p>
                    <p className="text-lg font-semibold mb-2">Speed: <span className="font-normal">{pokemon.speed}</span></p>
                </div>
                <button
                    onClick={() => router.push('/')}
                    className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Back to Home
                </button>
            </div>
        </div>
    )
}