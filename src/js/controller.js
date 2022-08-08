import 'core-js/stable';                  //polyfilling
import 'regenerator-runtime/runtime';
import * as model from "./model.js";
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { async } from 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {

  try {
    //async is used to create a new thread with out affecting original application thread

    const id = window.location.hash.slice(1); //get id from query string
    //console.log(id);

    //if null pls return
    if (!id) {
      return;
    }

    //0.Mark preview for currently selected receipe
    resultsView.update(model.getResultByPage());

    //1.use render() not update()
    bookmarksView.update(model.state.bookmark);

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

    console.log(model);

    //3.Render
    //resultsView.render(model.state.search.result);

    resultsView.render(model.getResultByPage(1));

    //4.Pagination 
    paginationView.render(model.state.search);

  }
  catch (err) {
    console.error(err);
    throw err;
  }
};

const controlPagination = async function (gotoValue) {

  //1.Render 
  resultsView.render(model.getResultByPage(gotoValue));   //variable 'page' gets updated in this line in model.js

  //2.Pagination 
  paginationView.render(model.state.search);    //then as new page value is in model, view.js->render()->paginationView.js->_generateMarkup() has internal logic to render only that page
};

const controlServings = async function (newserving) {
  //1. update quantity
  model.updateServings(newserving);

  //2. display in UI
  // recipeView.render(model.state.recipe);

  recipeView.update(model.state.recipe);
};


const controlAddBookmark = async function () {

  if (!model.state.recipe.bookmarked) {

    //1.make bookmarked = yes
    model.receipeAddBookmarked(model.state.recipe);
  }
  else {

    //1.make bookmarked = No
    model.receipeRemoveBookmarked(model.state.recipe.id);
  }

  //console.log(model.state.recipe);
  //2.rerender/update on UI
  recipeView.update(model.state.recipe);

  //3.Render bookmark only at left upper side of UI
  bookmarksView.render(model.state.bookmark);
}

const controlRecipeUpload = async function (Recipe) {
  //console.log(Recipe);
  try {
    await model.uploadRecipe(Recipe);
  }
  catch (err) {
    console.log(err);
  }
}

const controlBookmarkView = async function () {

  bookmarksView.render(model.state.bookmark);
}
//first init() will run when page load
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarkView);  //at first load already saved bookmarks from chrome db

  recipeView.addHandlerRender(controlRecipe);  //publisher subscriber pattern

  recipeView.addHandlerServing(controlServings);

  recipeView.addHandlerBookmark(controlAddBookmark);

  searchView.addHandlerSearch(controlSearch);

  paginationView.addHandlerRender(controlPagination);

  addRecipeView._addHendlerUpload(controlRecipeUpload);

};

init();

