'use strict';

const request = require('request');
const BASE_URL = 'http://swapi.co/api/people/1';


//// ------ Callback style ------------------------------------------------------
/*
request(BASE_URL, (error, response, body) => {
    const vehicles = JSON.parse(body).vehicles;
    vehicles.forEach((url) => {
        request(url, (error, response, body) => { 
            console.log(JSON.parse(body).name);
        });
    });
});
*/

// ------ Promise style -------------------------------------------------------
