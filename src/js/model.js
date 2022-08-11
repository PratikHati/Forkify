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
    bookmark: [],
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

        if (state.bookmark.some(bookmark => bookmark.id === id))  //to bookmark all previously selected receipes
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

function trackRecipe() {     //to save current bookmark locally in chrome

    localStorage.setItem('bookmarks', JSON.stringify(state.bookmark));      //(key,string)

    //localStorage.setItem( state.recipe.id , JSON.stringify(state.bookmark));      //(key,string)

}

function clearBookmark(id) {
    localStorage.clear(id);
}

//clearBookmark();

export const receipeAddBookmarked = function (receipe) {

    state.bookmark.push(receipe);

    if (state.recipe.id === receipe.id) {     //if not already bookmarked, just mark it
        receipe.bookmarked = true;      //a new attribute "bookmarked" added for later use
    }

    console.log(state.bookmark);

    trackRecipe();      //to save current bookmark locally in chrome
};


export const receipeRemoveBookmarked = function (i) {

    const index = state.bookmark.findIndex(x => x.id === i);

    debugger;

    var temp = state.bookmark;
    temp.slice(index, 1);  //delete the selected recipe (error)
    state.bookmark = temp;

    if (state.recipe.id === i) {     //if  already bookmarked, just fasle mark it
        state.recipe.bookmarked = false;      //a new attribute "bookmarked" added for later use
    }

    trackRecipe();      //to remove current bookmark locally in chrome
    //debugger;
    //clearBookmark(state.recipe.id);
};

function init() {

    const storage = localStorage.getItem('bookmarks');

    if (storage) {
        state.bookmark = JSON.parse(storage);   //string in chrome storage , then convert to object
    }
}

init();


//BELOW FUNCTION IS "AWSOME", just think......................................
export const uploadRecipe = async function (newRecipe) {        //if async method, then throw err in proper try catch block

    try {
        //debugger;
        console.log(newRecipe);

        //debugger;
        const ingredients = Object.entries(newRecipe)
            .filter(x => x[0].startsWith('ingredient') && x[1] !== '')
            .map(y => {
                const temp = y[1].replaceAll(' ', '').split(',');

                if (temp.length !== 3) {
                    throw new Error("wrong input in ingrdients! Please try again");
                }

                const [quantity, unit, description] = temp;
                return { quantity: quantity ? +quantity : null, unit, description };
            });

        console.log(ingredients);

        const recipe = {
            title: newRecipe.title,
            publisher: newRecipe.publisher,
            sourceUrl: newRecipe.source_url,
            image: newRecipe.image_url,
            servings: newRecipe.servings,
            cookingTime: newRecipe.cooking_time,
            ingredients
        };

        console.log(recipe);


        return recipe;
    }
    catch (err) {
        throw err;
    }

}