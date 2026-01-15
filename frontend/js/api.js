const API_BASE_URL = "http://localhost:3000/api/recipes"

export const getAllRecipes = async () => {
    const response = await fetch(API_BASE_URL)
    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`)
    return await response.json()
}

export const createRecipe = async (recipeData) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData)
    })
    if (!response.ok) throw new Error(`Erreur: ${response.status}`)
    return await response.json()
}

export const getOneRecipe = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`)
    return await response.json()
}

export const deletOneRecipe = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" })
    return await response.json()
}