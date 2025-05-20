import React, { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";

function PokemonApp() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const Api = "https://pokeapi.co/api/v2/pokemon?limit=124";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(Api);
      const data = await res.json();

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });

      const detailedResponses = await Promise.all(detailedPokemonData);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((curVal) =>
    curVal.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <section className="container">
      <header>
        <h1>Let's Catch Pokémon</h1>
      </header>

      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {searchData.length === 0 && (
        <p style={{ textAlign: "center", fontSize: "2rem", color: "#888" }}>
          No Pokémon matched your search.
        </p>
      )}

      <ul className="cards">
        {searchData.map((curPokemon) => (
          <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
        ))}
      </ul>
    </section>
  );
}

export default PokemonApp;
