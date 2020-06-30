import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-builder-8b7b4.firebaseio.com/"
});

export default instance;