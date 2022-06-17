import { API_URL } from "../Config";
import { TIME_OUT_SEC } from "../Config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const getJSON = async function (url) {

    try {
        const res = await Promise.race([fetch(url), timeout(TIME_OUT_SEC)]);  //ajax call with certain timeout period

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.Error);
        }

        return data;    //resrerved value for this promise
    }
    catch (error) {
        //console.log(`${err} second thread`);  will keep promise
        throw error;        //will reject promise
    }

}