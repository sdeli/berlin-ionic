import axios from 'axios';

const app_id = "fff59c36";
const app_key = "fa6268c27c4b30a7ecadc17413031770";
const endpoint = "entries";
const language_code = "de";
const word_id = "gehen";
const url = `https://od-api-sandbox.oxforddictionaries.com/api/v2/${endpoint}/${language_code}/${word_id.toLowerCase()}`;

axios.get(url, {
    headers: {
        'app_id': app_id,
        'app_key': app_key
    }
})
.then(response => {
    console.log(`code ${response.status}\n`);
    console.log(`text \n${response.data}\n`);
    console.log(`json \n${JSON.stringify(response.data, null, 2)}\n`);
})
.catch(error => {
    console.error(error);
});