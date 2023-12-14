// PokemonPicker.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const PokemonPicker = ({ onSelectPokemon }) => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => {
        setPokemon(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <select onChange={(event) => onSelectPokemon(event.target.value)}>
      {pokemon.map((pkmn, index) => (
        <option key={index} value={pkmn.name}>
          {pkmn.name}
        </option>
      ))}
    </select>
  );
};

export default PokemonPicker;
