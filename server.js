"use strict";
require('dotenv').config();
// using enviornment variables
const PORT = process.env.PORT || 3002;
// importing 3rd party software
const express = require('express');
let data = require('./data/weather.json');
// importing 3rd part software
const cors = require('cors');
// creating instance of express

const app = express();
app.use(cors());

app.get('/', (request, response) => {
  response.send('welcome')
});

app.get('/weather', (request, response) => {
  try {

    let city = request.query.city_name;
    let cityObject = data.find(localCity => {
      return localCity.city_name.toLowerCase() === city.toLowerCase();
    }); 
    // localCity.city_name.toLowerCase() === city.toLowerCase();
    console.log(cityObject);
    let cityForecast = new Forecast(cityObject);
    response.send(cityForecast);
  } catch (error) {
    console.log(error);
  }
})

// app.get('*', (request, response)=>{
// response.status(404).send(error.message)
// });

app.get('*', (request, response) => {
  console.log('Invalid path');
  response.status(500).send('Invalid path')
});

// instead of 2 lines you'll need 3
class Forecast {
  constructor(cityObject) {
    console.log(cityObject);
    this.location = cityObject.city_name;
    this.forecastOne = cityObject.data[0].weather.description;
    this.forecastTwo = cityObject.data[1].weather.description;
    this.forecastThree = cityObject.data[2].weather.description;
    this.dateOne = cityObject.data[0].valid_date;
    this.dateTwo = cityObject.data[1].valid_date;
    this.dateThree = cityObject.data[2].valid_date;
  }
}


// app.listen(PORT,() => console.log('listenting on port', PORT));
app.listen(PORT, () => console.log(`listening on port ${PORT}`));