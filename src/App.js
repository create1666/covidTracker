import "./App.css";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("worldwide");
  useEffect(() => {
    const getCountriesData = () => {
      fetch("https://disease.sh/v3/covid-19/countries", {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => {
            return {
              name: country.country,
              value: country.countryInfo.iso3,
            };
          });
          setCountries(countries);
          console.log(countries);
        })
        .catch();
    };
    getCountriesData();
  }, []);

  const onhandleChange = (e) => {
    const countryCode = e.target.value;
    console.log("i love u:", countryCode);
    setSelectedCountry(countryCode);
  };

  // useEffect(() => {
  //   const getCountriesData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://disease.sh/v3/covid-19/countries",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       let countries = await response.json();

  //       countries = countries.map((country) => {
  //         return {
  //           name: country.country,
  //           value: country.countryInfo.iso3,
  //         };
  //       });

  //       setCountries(countries);
  //       console.log(countries);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   getCountriesData();
  // }, []);
  return (
    <div className="app">
      <div className="app_header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl>
          <Select
            onChange={onhandleChange}
            variant="outlined"
            value={selectedCountry}
          >
            <MenuItem value="worldwide">worldwide</MenuItem>

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
