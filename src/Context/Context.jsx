import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react"; // Ensure React is imported for JSX

const GifContext = createContext();

const GifProvider = ({ children }) => {  // Correct prop name
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favourites, setFavourites] = useState([]);

  const addToFavorites = (id) => {
    if (favourites.includes(id)) {
      // If the item is already in favorites, remove it
      const updatedFavorites = favourites.filter((itemId) => itemId !== id);
      localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavorites));
      setFavourites(updatedFavorites);
    } else {
      // If the item is not in favorites, add it
      const updatedFavorites = [...favourites, id];
      localStorage.setItem("favoriteGIFs", JSON.stringify(updatedFavorites));
      setFavourites(updatedFavorites);
    }
  };
 
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteGIFs")) || [];
    setFavourites(favorites);
  }, []);

  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);
  
  return (
    <GifContext.Provider value={{ gf, gifs, setGifs, filter, setFilter, favourites, addToFavorites }}>
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};

export default GifProvider;
