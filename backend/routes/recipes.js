import { Router } from "express"
// Ajoutez getRecipeById et deleteRecipe à l'importation
import { getRecipes, getRecipeById, deleteRecipe } from "../controllers/recipesController.js"

const router = Router()

// Route pour toutes les recettes
router.get("/", getRecipes)

// AJOUTEZ CETTE LIGNE : Route pour une seule recette par ID
router.get("/:id", getRecipeById)

// AJOUTEZ CETTE LIGNE : Route pour supprimer une recette
router.delete("/:id", deleteRecipe)

export default router