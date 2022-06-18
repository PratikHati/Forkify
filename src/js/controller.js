import 'core-js/stable';                  //polyfilling
import 'regenerator-runtime/runtime';
import * as model from "./model.js";
import recipeView from './views/recipeView.js';


const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const showRecipe = async function () {

  try {
    //async is used to create a new thread with out affecting original application thread

    const id = window.location.hash.slice(1); //get id from query string
    //console.log(id);

    //if null pls return
    if (id == null) {
      return;
    }

    //1.Loading recipe
    recipeView.spinnerRender();

    //call loadRecipe()
    await model.loadRecipe(id); //async method i.e "promise" will return 

    //const { recipe } = model.state;    //remove "recipe" if any error

    //2.Rendering recipe
    recipeView.render(model.state.recipe);
  }

  catch (err) {
    alert(err);
  }
};


const init = function () {
  recipeView.addHandlerRender(showRecipe);
}

init();

