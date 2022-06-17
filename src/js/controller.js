import 'core-js/stable';                  //polyfilling
import 'regenerator-runtime/runtime';
import * as model from "./model.js";
import recipeView from './views/recipeView.js';


const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
//window.addEventListener('hashchange', showRecipe); //when user clicks on recipe, "showRecipe()" must invoke

