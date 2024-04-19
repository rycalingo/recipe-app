import React, { useEffect, useState } from "react";
import Header from "./components/Header";

import RecipeExcerpt from "./components/RecipeExcerpt";

import "./App.css";

const api_url = '/api/recipes';

function App() {
  const [recipes, setRecipes] = useState([]);

  const fetchAllRecipes = async () => {
		try {
			const response = await fetch(api_url);
			if (response.ok) {
				const data = await response.json();
				setRecipes(data);
			} else {
				console.log("Oops! Failed to fetch recipes!", "error");
			}
		} catch (e) {
			console.error("An error occurred during the request:", e);
			console.log("An unexpected error occurred. Please try again later.", "error");
		}
  }

  useEffect(()=>{
    fetchAllRecipes();
  } , []);

  return (
    <div className='recipe-app'>
      <Header />
      <div className="recipe-list">
        {
					recipes.map((recipe) => <RecipeExcerpt key={recipe.id} recipe={recipe}/>)
				}
      </div>
    </div>
  );
}

export default App;