import React, { useEffect, useState } from "react";
import Header from "./components/Header";

import RecipeExcerpt from "./components/RecipeExcerpt";
import RecipeFull from './components/RecipeFull';

import "./App.css";

const api_url = '/api/recipes';

function App() {
	const [recipes, setRecipes] = useState([]);
	const [selectedRecipe, setSelectedRecipe] = useState(null);

	const fetchAllRecipes = async () => {
		try {
			const response = await fetch(api_url);
			if (response.ok) {
				const data = await response.json();
				setRecipes(data);
			} else {
				console.log("Oops - could not fetch recipes!", "error");
			}
		} catch (e) {
			console.error("An error occurred during the request:", e);
			console.log("An unexpected error occurre  d. Please try again later.", "error");
		}
	};

	useEffect(() => {
		fetchAllRecipes();
	}, []);

	function handleSelectRecipe(recipe) {
		setSelectedRecipe(recipe);
	}

	const handleUnselectRecipe = () => {
		setSelectedRecipe(null);
	};


	return (
		<div className='recipe-app'>
			<Header />
			<div className='recipe-list'>
				{ selectedRecipe && (
					<RecipeFull selectedRecipe={selectedRecipe} handleUnselectRecipe={handleUnselectRecipe}/>
					)
				}
				{ !selectedRecipe && recipes.map((recipe) => (
					<RecipeExcerpt key={recipe.id} recipe={recipe} handleSelectRecipe={handleSelectRecipe}/>
					))
				}
			</div>
		</div>
	);
}

export default App;
