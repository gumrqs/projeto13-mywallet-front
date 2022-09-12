import axios from "axios";

const URL = "http://localhost:5000";

const createHeaders= (token) => {
    return {
        headers: {'Authorization': `Bearer ${token}`}
    }
}

export function registerUser(body){
    const promise = axios.post(`${URL}/sign-up`, body);
    return promise;
}

export function loginUser(body){
    const promise = axios.post(`${URL}/sign-in`, body);
    return promise
}

export function homeUser(token){
    const promise = axios.get(`${URL}/home`, createHeaders(token));
    return promise
}