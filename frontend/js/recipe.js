import { getOneRecipe, deletOneRecipe } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("id");

    if (!recipeId) {
        window.location.href = "index.html";
        return;
    }

    try {
        // 1. Récupérer la recette via l'API
        const recipe = await getOneRecipe(recipeId);

        // 2. Remplir le HTML (IDs basés sur ton fichier recipe.html)
        document.getElementById("recipe-name").textContent = recipe.name;
        document.getElementById("recipe-preptime").innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock me-1" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
            </svg> ${recipe.prepTime} min`;
        
        document.getElementById("recipe-id").textContent = recipe.id;
        document.getElementById("recipe-instructions").textContent = recipe.instructions;

        const ingredientsContainer = document.getElementById("recipe-ingredients");
        ingredientsContainer.innerHTML = recipe.ingredients
            .map(ing => `<li class="mb-2"><span class="badge bg-primary rounded-pill me-2">•</span>${ing}</li>`)
            .join("");

        // 3. Afficher la carte et cacher le chargement
        document.getElementById("loading-spinner").classList.add("d-none");
        document.getElementById("recipe-detail").classList.remove("d-none");

        // 4. Logique de suppression
        document.getElementById("delete-recipe-btn").addEventListener("click", async () => {
            if (confirm("Supprimer cette recette ?")) {
                await deletOneRecipe(recipeId);
                window.location.href = "index.html";
            }
        });

    } catch (error) {
        console.error(error);
        document.getElementById("loading-spinner").classList.add("d-none");
        document.getElementById("error-message").classList.remove("d-none");
        document.getElementById("error-text").textContent = "Erreur de connexion au serveur.";
    }
});