import 'core-js/stable';                  //polyfilling
import 'regenerator-runtime/runtime';
import * as model from "./model.js";
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {

  try {
    //async is used to create a new thread with out affecting original application thread

    const id = window.location.hash.slice(1); //get id from query string
    //console.log(id);

    //if null pls return
    if (!id) {
      return;
    }

    //1.Loading recipe
    recipeView.spinnerRender();

    //call loadRecipe()
    await model.loadRecipe(id); //async method i.e "promise" will return 

    //const { recipe } = model.state;    //remove "recipe" if any error

    console.log(model.state.recipe);

    //2.Rendering recipe
    recipeView.render(model.state.recipe);
  }

  catch (err) {
    //alert(err);
    recipeView.renderError();
  }
};

const controlSearch = async function () {
  try {

    resultsView.spinnerRender();

    //1. GET
    const query = searchView.getQuery();

    //console.log("query is", query);

    if (!query) {
      return;
    }

    //2.  Load
    await model.loadSearchResult(query);

    //3.Render
    resultsView.render(model.state.search.result);
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};


//first init() will run when page load
const init = function () {
  recipeView.addHandlerRender(controlRecipe);  //publisher subscriber pattern

  searchView.addHandlerSearch(controlSearch);
};

init();

