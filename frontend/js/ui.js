export const renderRecipeCard = (recipe) => {
    const ingredientsList = recipe.ingredients.slice(0, 3).map(ing => `<li class="small text-muted">${ing}</li>`).join("")
    const recipeImage = recipe.image || "https://images.pexels.com/photos/5190684/pexels-photo-5190684.jpeg"

    return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100 shadow-sm">
                <img src="${recipeImage}" class="card-img-top" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${recipe.name}</h5>
                    <span class="badge bg-primary mb-2" style="width: fit-content;">${recipe.prepTime} min</span>
                    <ul class="list-unstyled">${ingredientsList}</ul>
                    <p class="card-text small text-muted">${recipe.instructions.substring(0, 60)}...</p>
                    <a href="recipe.html?id=${recipe.id}" class="btn btn-sm btn-outline-primary mt-auto">Voir détails</a>
                </div>
            </div>
        </div>`
}

export const clearRecipesList = (container) => { if (container) container.innerHTML = "" }