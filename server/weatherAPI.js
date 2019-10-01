'use strict';

const request = require('request');

var weatherAPI = {
    getWeatherByCityName: async function(city){
        return new Promise(function(resolve) {
            var weather;
            var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${process.env.openWeatherMapAPIKey}`;

            request(url, function(err, res, body){
                var result;
                if(err){
                    console.log('Error: ', err);
                    result = `Error retrieving weather from ${city}`;
                } else {
                    weather = JSON.parse(body);
                    if(weather.message ==='city not found'){
                        result = `Unable to find weather for ${city}`;
                    } else {
                        result = `Right now its ${weather.main.temp} celsius with ${weather.weather[0].description}`;
                    }
                }
                resolve(result);
            });
        });
    }
};


module.exports = weatherAPI;
