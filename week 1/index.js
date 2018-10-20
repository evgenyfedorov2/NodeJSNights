'use strict';

const BASE_URL = 'http://swapi.co/api/people/1';

//// ------ Callback style ------------------------------------------------------
/*
const request = require('request');
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
const request = require('request-promise');

request(BASE_URL)
    .then((body) => {
        const vehicles = JSON.parse(body).vehicles;
        vehicles.forEach(url => {
            request(url)
                .then((body) => {
                    console.log(JSON.parse(body).name);
                })
                .catch(err => {
                    console.error(err,'Something went wrong')
                })
        });
    })
    .catch(err => {
        console.error(err, 'Something went wrong');
    })