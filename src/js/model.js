import { async } from "regenerator-runtime";
import { API_URL } from "./Config.js";
import { getJSON } from "./views/helper.js";

//to store all the state of entire page in a single state
export const state = {
    recipe: {},
    search: {
        query: '',
        result: [],
    },
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

        console.log(state.recipe);
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

        console.log(data);

        state.search.result = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        });

        //console.log(state.search.result);
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};
