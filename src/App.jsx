import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import { Pokemones } from "./components/pokemones/Pokemones";
import { Pokemon } from "./components/pokemon/Pokemon";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");

  const [pokemon, setPokemon] = useState();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const URL = "https://pokeapi.co/api/v2/pokemon-form";

    try {
      const response = await (await axios.get(URL + "/" + data.field)).data;
      setPokemon(response.pokemon);
    } catch (error) {
      toast.error("Ups! Ese pokemon no existe");
      console.error(error);
    }
  };

  useEffect(() => {
    getPreviousandNext();
  }, [url]);

  const getPreviousandNext = async () => {
    try {
      const { next, previous } = await (await axios.get(url)).data;

      setNext(next);
      setPrevious(previous);
    } catch (error) {
      console.error(error);
    }
  };

  const clickNext = async () => {
    try {
      const { next } = await (await axios.get(url)).data;

      setUrl(next);
    } catch (error) {
      console.error(error);
    }
  };

  const clickPrev = async () => {
    try {
      const { previous } = await (await axios.get(url)).data;

      setUrl(previous);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://i.imgur.com/xaUcgXY.png" alt="PokeApp logo" />
        <div className="App-browser">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="App-browser__input"
              {...register("field")}
            />
            <button type="submit">Enter</button>
          </form>
        </div>
      </header>
      {pokemon && <Pokemon pokemon={pokemon} />}
      <div>
        <button disabled={!previous} onClick={clickPrev}>
          {"<-"}
        </button>
        <button disabled={!next} onClick={clickNext}>
          {"->"}
        </button>
      </div>
      <Pokemones url={url} />
      <ToastContainer />
    </div>
  );
}

export default App;
