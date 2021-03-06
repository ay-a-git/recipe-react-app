import "./App.css";
import { React, useState, useEffect } from "react";
import Recipe from "./Recipe";

require("dotenv").config();
const cors = require("cors");

console.log(process.env);
const API_KEY = process.env.REACT_APP_API_KEY;
const APP_ID = process.env.REACT_APP_APP_ID;
console.log(API_KEY);
console.log(process.env.REACT_APP_API_KEY);

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch(""); //to reset the search bar after hitting search.
  };

  return (
    <div className="App">
      <h1 className="title-h1">LockDown's Chow</h1>{" "}
      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button">search</button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
