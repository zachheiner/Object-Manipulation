const fs = require('fs');
const d3 = require('d3-dsv');
const csvData = d3.csvParse(fs.readFileSync('countries.csv', 'utf-8'));

var countries = csvData.reduce((countriesAcc, item) =>{
    // reduce in order to group the elements in the proper order
    var countryIndex = countriesAcc.findIndex(country => country.name == item.Country);
    // set a Country index so you can keep track of where you are in the regions
    if (countryIndex == -1){
        countriesAcc.push({name: item.Country, states: []});
        countryIndex = countriesAcc.length - 1;
    }
    //checked to see if it is the same or a different region, it it is new create that region and give it a states array

    var stateIndex = countriesAcc[countryIndex].states.findIndex(state => state.name == item.State);
    //set a state index so you can keep track of what state you are on.
    if (stateIndex == -1){
        countriesAcc[countryIndex].states.push({name : item.State, cities: []});
        stateIndex = countriesAcc[countryIndex].states.length - 1;

    }
    // check to see if you are on the same or need a new state, if so create it and add a city array
    var cityIndex = countriesAcc[countryIndex].states[stateIndex].cities.findIndex(city => city.name == item.City);
    //set a city index to see where you are in the cities
    if (cityIndex == -1){
        countriesAcc[countryIndex].states[stateIndex].cities.push({name : item.City, population: item.Population});
        cityIndex = countriesAcc[countryIndex].states[stateIndex].cities.length - 1;

    }
    // check to see what city you are on, push it on.

    return countriesAcc;
    // return the total grouped array
},[]);


countries.sort(function(a, b) {
    //Sort the countries based on the ascii value
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
countries.forEach(country => {
    country.states.sort(function(a, b) {
        //sort each state based on ascii value
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
        });
        country.states.forEach(state => {
            state.cities.sort((a, b) => {
                //sort the population based on number lowest to highest
                return a.population - b.population
            });
        });
});

console.log(JSON.stringify(countries, null, 2));