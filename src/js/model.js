import { async } from "regenerator-runtime";
import { API_URL } from "./Config.js";
import { getJSON } from "./views/helper.js";

export const state = {
    recipe: {}
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
    }

}