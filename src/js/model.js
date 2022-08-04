import { async } from "regenerator-runtime";
import { API_URL } from "./Config.js";
import { getJSON } from "./views/helper.js";

//to store all the state of entire page in a single state
export const state = {
    recipe: {},
    search: {
        query: '',
        page: 1,
        result: [],
    },
    bookmark:[],
};

export const loadRecipe = async function (id) {

    try {
        const url = `${API_URL}/${id}`;  //ajax call

        const data = await getJSON(url);
        //console.log(res, data);//testing purpose
        const { recipe } = data.data;

        //"state" is defined above
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };

        if(state.bookmark.some(bookmark=> bookmark.id === id))  //to bookmark all previously selected receipes
            state.recipe.bookmarked = true;
        else
            state.recipe.bookmarked = false;

        //console.log(state.recipe);
    }
    catch (err) {
        console.log(`${err} main thread`);
        throw err;
    }

};

export const loadSearchResult = async function (query) {
    try {
        state.search.query = query;

        const url = `${API_URL}/?search=${query}`;

        const data = await getJSON(url);

        //console.log(data);

        state.search.result = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        });

        state.search.page = 1;      //bug fixed to rerender search resukt from page 1
        //console.log(state.search.result);
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};


export const getResultByPage = function (page = state.search.page) {

    state.search.page = page;
    const start = (page - 1) * 10;
    const end = page * 10;

    return state.search.result.slice(start, end);
};


export const updateServings = function (newserving) {

    state.recipe.ingredients.forEach(x => {
        x.quantity = (x.quantity / state.recipe.servings) * newserving
    });

    state.recipe.servings = newserving;
};

function trackRecipe(){     //to save current bookmark locally in chrome

    localStorage.setItem('bookmarks', JSON.stringify(state.bookmark));      //(key,string)
}

export const receipeAddBookmarked = function(receipe){

    state.bookmark.push(receipe);

    if(state.recipe.id === receipe.id){     //if not already bookmarked, just mark it
        receipe.bookmarked = true;      //a new attribute "bookmarked" added for later use
    }

    trackRecipe();      //to save current bookmark locally in chrome
};


export const receipeRemoveBookmarked = function (i) {

    const index = state.bookmark.findIndex(x => x.id === i);

    state.bookmark.slice(index, 1);  //delete the selected recipe

    if (state.recipe.id === i) {     //if  already bookmarked, just fasle mark it
        state.recipe.bookmarked = false;      //a new attribute "bookmarked" added for later use
    }

    trackRecipe();      //to remove current bookmark locally in chrome
};

function init(){
    
    const storage = localStorage.getItem('bookmarks');

    if(storage){
        state.bookmark = JSON.parse(storage);   //string in chrome storage , then convert to object
    }
}

init();
    