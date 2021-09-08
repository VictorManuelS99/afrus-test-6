import React, { useEffect, useState } from "react";
import { getPokemones } from "../../services/PokemonService";
import { Pokemon } from "../pokemon/Pokemon";

import "./Pokemones.css";

export const Pokemones = ({ url }) => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(async () => {
    const { results } = await getPokemones(url);

    setPokemons(results);
  }, [url]);

  return (
    <div>
      <h1>Pokemones</h1>
      <div className="Pokemones">
        {pokemons &&
          pokemons.map((pokemon, index) => (
            <Pokemon pokemon={pokemon} key={index} />
          ))}
      </div>
    </div>
  );
};
