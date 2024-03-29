import {ACCESS_TOKEN, API_BASE_URL} from "../constants";
import fetch from 'isomorphic-fetch';


const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);


    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + '/login/',
        method: 'POST',
        body:loginRequest
    });
}

export function getCurrentUser() {


    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject('No access token set.');
    }
    return request({
        url: API_BASE_URL+"/current_user/",
        method: 'GET'
    })


}