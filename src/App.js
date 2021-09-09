import "./App.css";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);

  // useEffect(() => {
  //   const getCountriesData = async () => {
  //     await fetch("https://disease.sh/v3/covid-19/countries", {
  //       mode: "no-cors",
  //       method: "get",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const countries = data.map((country) => {
  //           return {
  //             name: country.country,
  //             value: country.countryInfo.iso3,
  //           };
  //         });
  //         setCountries(countries);
  //         console.log(countries);
  //       })
  //       .catch();
  //   };
  //   getCountriesData();
  // }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      try {
        const response = await fetch(
          "https://disease.sh/v3/covid-19/countries",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        let countries = await response.json();

        countries = countries.map((country) => {
          return {
            name: country.country,
            value: country.countryInfo.iso3,
          };
        });

        setCountries(countries);
        console.log(countries);
      } catch (e) {
        console.log(e);
      }
    };
    getCountriesData();
  }, []);
  return (
    <div className="app">
      <div className="app_header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl>
          <Select variant="outlined" value="">
            {countries.map((country, index) => (
              <MenuItem key={index} value={country.value}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
