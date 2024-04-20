import React, { useState } from 'react';
import EditRecipeForm from './EditRecipeForm';
import ConfirmationModal from './ConfirmationModal';
import { X } from "react-feather"

const RecipeFull = ({selectedRecipe, handleUnselectRecipe, onUpdateForm, handleUpdateRecipe, handleDeleteRecipe}) => {
	const [editing, setEditing] = useState(false);
	const [showConfirmationModal, setShowConfirmationModal] = useState(false);

	const handleCancel = () => {
		setEditing(false);
	}

	const recipe_ingredients =  selectedRecipe ? selectedRecipe.ingredients.split('\n') : ['—'];

	if (showConfirmationModal) {
		return (
			<div className='recipe-details'>
				<ConfirmationModal 
					message="Are you sure? Once it's gone, it's gone."
					onCancel={()=> setShowConfirmationModal(false)}
					onConfirm={()=> handleDeleteRecipe(selectedRecipe.id)}
					/>
			</div>
		)
	}
	return (
		<div className='recipe-details'>
			{editing? (
				<EditRecipeForm 
				selectedRecipe={selectedRecipe}
				handleCancel={handleCancel}
				onUpdateForm={onUpdateForm}
				handleUpdateRecipe={handleUpdateRecipe} />
			) : (
				<article>
					<header>
						<figure>
							<img src={selectedRecipe.image_url}  alt={selectedRecipe.title}/>
						</figure>
						<h2>{selectedRecipe.title}</h2>
						<div className='button-container'>
							<button className='edit-button' onClick={()=> setEditing(true)}>Edit</button>
							<button className='cancel-button' onClick={handleUnselectRecipe}><X />Close</button>
							<button className='delete-button' onClick={()=> setShowConfirmationModal(true)}>Delete</button>
						</div>
					</header>

					<h3>Description:</h3>
					<p>{selectedRecipe.description}</p>

					<h3>Ingredients:</h3>

					<ul className='ingredient-list'>
						{recipe_ingredients.map((item, i) => <li className='ingredient' key={i}>{item}</li>)}
					</ul>
					<h3>Instructions:</h3>

					<pre className='formatted-text'>{selectedRecipe.instructions}</pre>

					<h3>Servings: {selectedRecipe.servings}</h3>
				</article>
			)}
		</div>
	);
};

export default RecipeFull;
