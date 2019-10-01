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
        "source": "https://jonnathan-dialogflow-weather.herokuapp.com/",
        "payload": {
          "google": {
            "expectUserResponse": false,
            "richResponse": {
              "items": [
                {
                  "simpleResponse": {
                    "textToSpeech": weather
                  }
                }
              ]
            }
          }
        }
    };

    return res.json(responseObj);
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Test weahter app listening on port ${port}`);
});


/*
{
  "fulfillmentText": "This is a text response",
  "fulfillmentMessages": [
    {
      "card": {
        "title": "card title",
        "subtitle": "card text",
        "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
        "buttons": [
          {
            "text": "button text",
            "postback": "https://assistant.google.com/"
          }
        ]
      }
    }
  ],
  "source": "example.com",
  "payload": {
    "google": {
      "expectUserResponse": true,
      "richResponse": {
        "items": [
          {
            "simpleResponse": {
              "textToSpeech": "this is a simple response"
            }
          }
        ]
      }
    },
    "facebook": {
      "text": "Hello, Facebook!"
    },
    "slack": {
      "text": "This is a text response for Slack."
    }
  },
  "outputContexts": [
    {
      "name": "projects/${PROJECT_ID}/agent/sessions/${SESSION_ID}/contexts/context name",
      "lifespanCount": 5,
      "parameters": {
        "param": "param value"
      }
    }
  ],
  "followupEventInput": {
    "name": "event name",
    "languageCode": "en-US",
    "parameters": {
      "param": "param value"
    }
  }
}
*/
