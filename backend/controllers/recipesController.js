import path from "path"
import { readRecipes, writeRecipes } from "../helpers/index.js"

const recipesPath = path.resolve("./data/recipes.json")

export const getRecipes = (req, res) => {
    try {
        const recipes = readRecipes(recipesPath)
        res.json(recipes)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getRecipeById = (req, res) => {
    try {
        const recipes = readRecipes(recipesPath)
        const id = parseInt(req.params.id)
        const recipe = recipes.find(r => r.id === id)
        if (recipe) {
            res.json(recipe)
        } else {
            res.status(404).json({ message: "Recette non trouvée" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const createRecipe = (req, res) => {
    try {
        const recipes = readRecipes(recipesPath)
        const newRecipe = { id: Date.now(), ...req.body }
        recipes.push(newRecipe)
        writeRecipes(recipesPath, recipes)
        res.status(201).json(newRecipe)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateRecipe = (req, res) => {
    try {
        const recipes = readRecipes(recipesPath)
        const id = parseInt(req.params.id)
        const index = recipes.findIndex(r => r.id === id)
        if (index === -1) return res.status(404).json({ message: "Recette non trouvée" })
        recipes[index] = { ...recipes[index], ...req.body, id: id }
        writeRecipes(recipesPath, recipes)
        res.json(recipes[index])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteRecipe = (req, res) => {
    try {
        const recipes = readRecipes(recipesPath)
        const id = parseInt(req.params.id)
        const filteredRecipes = recipes.filter(r => r.id !== id)
        if (recipes.length === filteredRecipes.length) {
            return res.status(404).json({ message: "Recette non trouvée" })
        }
        writeRecipes(recipesPath, filteredRecipes)
        res.status(200).json({ message: "Recette supprimée avec succès" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const searchRecipes = (req, res) => {
    try {
        const recipes = readRecipes(recipesPath)
        const searchTerm = req.query.search
        if (!searchTerm) return res.json(recipes)
        const filteredRecipes = recipes.filter(r => 
            r.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        res.json(filteredRecipes)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}