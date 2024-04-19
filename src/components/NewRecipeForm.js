import React from 'react';

const NewRecipeForm = ({newRecipe, hideRecipeForm, onUpdateForm}) => {
	return (
		<div className='recipe-details'>
			<div className='recipe-form'>
				<h2>New Recipe</h2>
				<button className='cancel-button' onClick={hideRecipeForm}>Cancel</button>

				<form>
					<label>Title</label>
					<input type='text' name='title' value='' onChange={onUpdateForm} required />

					<label>Ingredients</label>
					<textarea
						name='ingredients'
						value=''
						onChange={onUpdateForm}
						required
						placeholder='Add ingredients separated by commas - i.e. Flour, sugar, almonds'
					/>

					<label>Instructions</label>
					<textarea name='instructions' value='' onChange={onUpdateForm} required />

					<label>Description</label>
					<textarea name='description' value='' onChange={onUpdateForm} required />

					<label>Image</label>
					<input type='text' name='image_url' value='' onChange={onUpdateForm} required />

					<label>Servings</label>
					<input type='number' name='servings' value='' onChange={onUpdateForm} required />

					<button type='submit'>Save Recipe</button>
				</form>
			</div>
		</div>
	);
};

export default NewRecipeForm;
