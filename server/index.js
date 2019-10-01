'use strict';

const weatherAPI = require('./weatherAPI.js');
const express = require('express');
var bodyParser = require('body-parser');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
    if(!req.body){
        return res.sendStatus(500);
    }
    var city = req.body.queryResult.parameters['geo-city'];

    var weather = await weatherAPI.getWeatherByCityName(city);
    console.log(weather);
    let response = '';
    let responseObj = {
        "fulfillmentText": response,
        "fulfillmentMessages": [{
            "text": {
                "text":[weather]
            },
        }],
        "source": "https://jonnathan-dialogflow-weather.herokuapp.com/"
    };

    return res.json(responseObj);
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Test weahter app listening on port ${port}`);
});
