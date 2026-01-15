import { getAllRecipes, createRecipe } from "./api.js"
import { renderRecipeCard, clearRecipesList } from "./ui.js"

document.addEventListener("DOMContentLoaded", () => {
    loadRecipes()
    setupEventListeners()
})

const loadRecipes = async () => {
    try {
        const recipes = await getAllRecipes()
        const container = document.getElementById("recipes-container")
        clearRecipesList(container)
        recipes.forEach(r => container.innerHTML += renderRecipeCard(r))
    } catch (e) { console.error(e) }
}

const setupEventListeners = () => {
    document.getElementById("addRecipeForm")?.addEventListener("submit", async (e) => {
        e.preventDefault()
        const newRecipe = {
            name: document.getElementById('recipeName').value,
            ingredients: document.getElementById('recipeIngredients').value.split(',').map(i => i.trim()),
            instructions: document.getElementById('recipeInstructions').value,
            prepTime: parseInt(document.getElementById('recipePrepTime').value),
            image: document.getElementById('recipeImageUrl').value
        }
        await createRecipe(newRecipe)
        const modal = bootstrap.Modal.getInstance(document.getElementById('addRecipeModal'))
        modal.hide()
        e.target.reset()
        loadRecipes()
    })
}