const searchbox = document.querySelector(".searchbox");
const Searchbtn = document.querySelector(".Searchbtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeClosebtn = document.querySelector(".recipe-closebtn");


//Function To fatchRecipies
const fetchrecipe = async (query) =>{
    recipeContainer.innerHTML = "<h2>Fetching Recipies.....</h2>";
    
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    try{
    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        //console.log(meal);
        const recipediv = document.createElement("div");
        recipediv.classList.add("recipe");
        recipediv.innerHTML =`
        <img src = "${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span>Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `

        const button = document.createElement("button")
        button.textContent = "View Recipe";
        button.addEventListener("click" , ()=>{
            openrecipepoppup(meal);
        })
        recipediv.appendChild(button);
            recipeContainer.appendChild(recipediv);
    });
    }  catch(error){
        recipeContainer.innerHTML = "<h3>erroe in fetching recipies</h3>";
        // recipeContainer.innerHTML = `<video   autoplay loop controls src ="memv.mp4">`;

    }
    // console.log(response.meals[0]);
}

// function to fetch ingrediants
const fetchIngredents = (meal) =>{
    // console.log(meal);
    let ingrediantlist ="";
    for(let i=1;i<=20;i++){
        const ingrident = meal[`strIngredient${i}`];
        if(ingrident){
            const measurment = meal[`strMeasure${i}`];
            ingrediantlist += `<li>${measurment} ${ingrident}</li>`
        }
        else{
            break;
        }
    }
    return ingrediantlist;
}

const openrecipepoppup = (meal) =>{
    recipeDetailsContent.innerHTML = `
    <h3 class = "recipename">${meal.strMeal}</h3>
    <h4>Ingredents:</h4>
    <ul class = "IngredientList">${fetchIngredents(meal)}</ul>
    <div class = "Instructions">
        <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
    </div>
    `
    
    recipeDetailsContent.parentElement.style.display = "block";
}

Searchbtn.addEventListener("click", (e)=>{
    e.preventDefault();     // e is passed to prevent auto refresh of the page.
    const searchInput = searchbox.value.trim();
    fetchrecipe(searchInput);
    // console.log("button clicked");
})

recipeClosebtn.addEventListener("click" , ()=>{
    recipeDetailsContent.parentElement.style.display = "none";
})


