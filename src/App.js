import React, { useEffect, useState } from "react";
import Header from "./components/Header";

import RecipeExcerpt from "./components/RecipeExcerpt";
import RecipeFull from './components/RecipeFull';
import NewRecipeForm from "./components/NewRecipeForm";

import "./App.css";

import { displayToast } from "./utils/toastHelper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"


const api_url = '/api/recipes';

const recipeForm = {
	title: "",
	ingredients: "",
	instructions: "",
	servings: 1, // conservative default
	description: "",
	image_url: "https://images.pexels.com/photos/9986228/pexels-photo-9986228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" //default
}

function App() {
	const [recipes, setRecipes] = useState([]);
	const [selectedRecipe, setSelectedRecipe] = useState(null);
	const [newRecipe, setNewRecipe] = useState(recipeForm);
	const [showNewRecipeForm, setShowNewRecipeForm] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');


	const handleNewRecipe = async(e, newRecipe) => {
		e.preventDefault();
		try {
			const response = await fetch(api_url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(newRecipe)
			});
			
			if  (response.ok) {
				const data = await response.json();
				setRecipes([...recipes, data.recipe]);
				setNewRecipe(recipeForm);
				setShowNewRecipeForm(false);
				displayToast('Recipe added successfully!', 'success');
			} else {
				throw new Error('Server responded with an error.');
			}
		} catch(e) {
			displayToast('Oops, could not add recipe!', 'error');
			console.log('Something went wrong,',  e);
		}
	}

	const handleUpdateRecipe = async(e, selectedRecipe) => {
		e.preventDefault();
		const {id} =  selectedRecipe;
		try {
			const response = await fetch(`${api_url}/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(selectedRecipe)
			});
			
			if  (response.ok) {
				const data = await response.json();
				setRecipes(recipes.map(recipe=> recipe.id === id ? data.recipe : recipe ));
				displayToast("Recipe was successfully updated!", 'success');
			} else {
				throw new Error("Server responded with an error.");
			}
		} catch(e) {
			displayToast('Oops, could not update recipe!', 'error');
			console.log('Something went wrong,', e);
		}
		setSelectedRecipe(null);
	}

	const handleDeleteRecipe = async(recipeId) => {
		try {
			const response = await fetch(`${api_url}/${selectedRecipe.id}`, {method: 'DELETE'});
			if (response.ok) {
				setRecipes(recipes.filter((recipe)=> recipe.id !== recipeId));
				setSelectedRecipe(null);
				displayToast('Recipe was successfully removed!', 'success');
			} else {
				throw new Error('Unable to remove recipe.');
			}
		} catch(e) {
			console.log('Something went wrong,', e);
		}
	}

	const fetchAllRecipes = async () => {
		try {
			const response = await fetch(api_url);
			if (response.ok) {
				const data = await response.json();
				setRecipes(data);
			} else {
				throw new Error("Oops - could not fetch recipes!");
			}
		} catch (e) {
			console.error("An error occurred during the request:", e);
		}
	};

	useEffect(() => {
		fetchAllRecipes();
	}, []);


	const handleSelectRecipe = (recipe) => {
		setSelectedRecipe(recipe);
	}

	const handleUnselectRecipe = () => {
		setSelectedRecipe(null);
	};

	const hideRecipeForm = () => {
		setShowNewRecipeForm(false);
	}

	const showRecipeForm = () => {
		setShowNewRecipeForm(true);
		setSelectedRecipe(null);
	}

	const onUpdateForm = (e, action = 'new') => {
		const {name, value} = e.target;
		if (action === 'update') setSelectedRecipe({...selectedRecipe, [name]: value});
		if (action === 'new') setNewRecipe({ ...newRecipe, [name]: value });
	}

	const updateSearchTerm = (e) => {
		setSearchTerm(e.target.value);
	}

	const handleSearch = () => {
		const searchResults = recipes.filter(recipe=> {
			const valuesToSearch = [recipe.title, recipe.ingredients, recipe.description];
			return valuesToSearch.some(value=> value.toLowerCase().includes(searchTerm.toLowerCase()));
		});
		return searchResults;
	}

	const displayAllRecipes = () => {
		setSearchTerm('');
		setSelectedRecipe(null);
		setShowNewRecipeForm(false);
	}

	const displayedRecipes = searchTerm ?  handleSearch() : recipes;

	return (
		<div className='recipe-app'>
			<Header showRecipeForm={showRecipeForm} searchTerm={searchTerm} 
				updateSearchTerm={updateSearchTerm} displayAllRecipes={displayAllRecipes} />
			{showNewRecipeForm && <NewRecipeForm newRecipe={newRecipe} hideRecipeForm={hideRecipeForm}
															onUpdateForm={onUpdateForm} handleNewRecipe={handleNewRecipe} /> }
			
			{
				selectedRecipe
			&&
				<RecipeFull
					selectedRecipe={selectedRecipe} handleUnselectRecipe={handleUnselectRecipe}
					onUpdateForm={onUpdateForm} handleUpdateRecipe={handleUpdateRecipe} handleDeleteRecipe={handleDeleteRecipe} />
			}
			{
				(!selectedRecipe && !showNewRecipeForm)
			&&
				<div className='recipe-list'>
					{ !selectedRecipe && displayedRecipes.map((recipe) => (
						<RecipeExcerpt key={recipe.id} recipe={recipe} handleSelectRecipe={handleSelectRecipe}/>
						))
					}
				</div>
			}
			<ToastContainer />
		</div>
	);
}

export default App;
