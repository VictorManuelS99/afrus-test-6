import React, { useEffect, useState } from "react";

import { getPokemon } from "../../services/PokemonService";
import "./Pokemon.css";

export const Pokemon = ({ pokemon }) => {
  const { name, url } = pokemon;

  const [pokemonState, setPokemonState] = useState();

  useEffect(async () => {
    setPokemonState(await getPokemon(url));
  }, [pokemon]);

  return (
    <div className="Pokemon">
      <h3>{name.toUpperCase()}</h3>
      {pokemonState && (
        <div>
          <div>
            <strong>Tipo:</strong>
            <ul>
              {pokemonState.types.map((value, index) => (
                <li key={index}> {value.type.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <strong>Peso: </strong>
            <span>{pokemonState.weight} Kg.</span>
          </div>

          <div>
            <strong>Altura: </strong>
            <span>{pokemonState.height} Mtrs.</span>
          </div>
          <img src={pokemonState.sprites.back_default} alt="aea" />
        </div>
      )}
    </div>
  );
};
