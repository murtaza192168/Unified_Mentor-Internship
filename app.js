
const searchBox = document.querySelector('.search-box');
const searchBtn = document.querySelector('.search-btn');
const recipeContainer = document.querySelector('.recipe-container');
// Accessing RecipeDetails elements from html
const recipeDetails = document.querySelector('.recipe-details');
const recipeCloseBtn = document.querySelector('.close-btn');
const recipeDetailsContent = document.querySelector('.recipe-details-content');

// API USED : MEALDB. This Function will be used in fetching recipes on our website. And this function will be inkvoked in the searchBtn.addEventListener funtion so that whenever the button is clicked, the recipes are on screen
const fetchRecipes = async (query) => {
    // this data below, will be returning the promise

    // await: means that untill and unless all data is not fetched, till then it will wait but on the other hand no operations will be hindered due to this waiting time (concurrency)
    recipeContainer.innerHTML = "<h2>Fetching data...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`); // Arrabiata is one example of a dish. But we have to make it dynamic. So how?: Where are we going to enter our dish...? obviously in the search-box. So, in searchBtn.aaddEventListener function, we will construct a local var where in first we will trim the value that will be entered by the user. And then it will take that input and incorporate in his above link and display the result everytime the user enters new recpes name
    
    //Now we will convert this data into json format and sore it in a variable _response_
    const response = await data.json();
    
    recipeContainer.innerHTML = ""
    response.meals.forEach((meal) => {
        console.log(meal);
       
        
        // GIVING DIV & CLASS to EACH RECIPE IN JS ((just like html.. but here syntax varies)) 
        // give a div to each recipe
        const recipeDiv = document.createElement('div');
           recipeDiv.classList.add('recipe');
            // Now innerHTML
            recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strArea} <span>Dish</span></p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>`
            // Now append this div(containing img, h3,p) in main container
            recipeContainer.appendChild(recipeDiv);

            
            // VIEW BUTTON : FOR Ingredients PAGE
            const viewButton = document.createElement('button');
            viewButton.textContent = 'View Recipe';
            viewButton.classList.add('view-btn');
            //Now append the viewButton inside the div
            recipeDiv.appendChild(viewButton);

            // addEventListener to the viewButton of view-recipe
            viewButton.addEventListener('click', () =>{
                // invoke a function here, that contains action-implementation {he response after clicking that viewButton}
                popUpInstruction(meal);
            })

            // SEE VIDEO : FOR YT VIDEO OF THE RECIPE
            const viewYoutube = document.createElement('button');
            viewYoutube.textContent = "See video";
            viewYoutube.classList.add('view-youtube-btn')
            recipeDiv.appendChild(viewYoutube);

            // Add Functionality to this youtube button using addEventListener
            viewYoutube.addEventListener('click', () =>{
            window.location.href = `${meal.strYoutube}`;
            const ytLink = window.location.href;
            console.log(ytLink);
            
            })
            

        
    })
    // // POPUP section (div)
    //         const recipeDetailsDiv = document.createElement('div');
    //         recipeDetailsDiv.classList.add('recipe-details');
            

    //         // create closeBtn inside recipeDetails
    //         const closeButton = createElement('button');
    //         closeButton.classList.add('close-btn');
    //         const buttonIcon = document.createElement('span');
    //         buttonIcon.classList.add('material-symbols-out-close');
    //         //append this closeButton inside its parent i.e.(recipeDetailsDiv)
            
    //         recipeDetailsDiv.appendChild(closeButton);
    //         closeButton.appendChild(buttonIcon);


    // console.log(response.meals[0]);
}
//func to fetch ingredients
const fetchIngredients = (meal) => {
    let ingredientList = ""; // ingredient - measure .. ike this
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} of  ${ingredient}</li>`
        }
        else{
            break; // loop will break if ingredient not found
        }
        
    } 
    return ingredientList;
}


// POP-UP function implementation here
const popUpInstruction = (meal) =>{
    recipeDetailsContent.innerHTML = `
     <h2 class="recipe-name">${meal.strMeal}</h2>
     <h3>Ingrdients:</h3>
     <ul class="ingredient-list">${fetchIngredients(meal)}</ul>
     
     <div class="instructions">
        <h3>Instructions: </h3>
        <p >${meal.strInstructions}</p>
     </div>
     
     `
    
     // By defualt the popup window card will not be visible untill view-recipe button is clicked
     recipeDetailsContent.parentElement.style.display = 'block';
     

}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
})



searchBtn.addEventListener('click', (e) => {
    e.preventDefault(); //this method will stop the auto-submit func & the page will not refresh

    // a local variable searchInput
    const searchInput = searchBox.value.trim();
    
    fetchRecipes(searchInput);  // passed the searchBox-entered data here wrapped in a variable. Now this variable we will give to the function definition as "query"

    // console.log('Button clicked')

})



// API USED : MEALDB