const fs = require('fs');
const d3 = require('d3-dsv');
const csvData = d3.csvParse(fs.readFileSync('countries.csv', 'utf-8'));
// console.log(csvData[0]);

let unsortedArray = csvData.slice(0, 5);
// console.log(unsortedArray);

function groupBy(objectArray, countryProperty, stateProperty, cityProperty, populationProperty) {
    return objectArray.reduce((acc, obj) => {
        var countryKey = obj[countryProperty];
        //console.log(key);
        if (!acc[countryKey]) {
            acc[countryKey] = [];
        }
        var statesObj = objectArray.reduce((acc2, obj2) => {
            let stateKey = obj2[stateProperty];
            if (!acc2[stateKey]) {
                acc2[stateKey] = [];
            }

            var citiesObj = objectArray.reduce((acc3, obj3) => {
                let cityKey = obj3[cityProperty];
                // console.log(obj2);
                // console.log(obj3);
                
              
                if(obj2.State = obj3.state)    
                

            
                let cities = {
                    name: obj3[cityProperty],
                    population: obj3[populationProperty]
                };
                // add city object
                return acc3.concat(cities);
                //}
            }, []);
            let states = {
                name: obj2[stateProperty],
                cities: citiesObj
            };
            // add state object
            return acc2[stateKey].concat(states);
        }, []);
        
        //     console.log('Accumulator:', acc);
        //     console.log(key);
        //     console.log('Accumulator key:', acc[key]);
        //     console.log(obj);
        //    console.log(typeof acc);
        
        let country = {
            name: obj[countryProperty],
            states: statesObj
        };
        // return country object
        //console.log(acc);
        return acc[countryKey].concat(country);
    }, []);
}
//console.log(csvData.length)
let countries = groupBy(csvData, "Country", "State", "City", "Population");

// countries.sort();
//console.log(countries);
//console.log(countries.length);
console.log(JSON.stringify(countries, null, 2));