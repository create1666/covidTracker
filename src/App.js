import "./App.css";
import {
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Card,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import InfoBox from "./InfoBox";
import MapBox from "./MapBox";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("worldwide");
  // const initialState = {};
  const [countryInfo, setCountryInfo] = useState({});
  useEffect(() => {
    const getCountriesData = () => {
      fetch(
        "https://astro-cors-server.herokuapp.com/fetch/https://disease.sh/v3/covid-19/countries",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => {
            return {
              name: country.country,
              value: country.countryInfo.iso3,
            };
          });
          setCountries(countries);
          console.log("total countries:", countries);
        })
        .catch((e) => console.log(e.message));
    };
    getCountriesData();
  }, []);

  const onHandleChange = (e) => {
    const countryValue = e.target.value;
    const url =
      countryValue === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : "https://disease.sh/v3/covid-19/countries/" + countryValue;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  // fetch(`https://astro-cors-server.herokuapp.com/fetch/${url}`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((response) => {
  //     console.log(response.json());
  //   })
  //   .then((data) => {
  //     setSelectedCountry(countryValue);
  //     setCountryInfo(data);
  //     console.log("information:::", data);
  //   })
  //   .catch((e) => {
  //     console.log("Error:", e);
  //   });

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
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl>
            <Select
              onChange={onHandleChange}
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
            {selectedCountry}
          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox title="Coronavirus Cases " cases={333} total={7865} />
          <InfoBox title="Recovered " cases={47} total={865} />
          <InfoBox title="Death" cases={247} total={75} />
        </div>
        <div className="app_mapBox">
          <MapBox />
        </div>
      </div>
      <div className="app_right">
        <Card>
          <CardContent>
            <h3>Live cases by country</h3>
            <h3>Worldwide new cases</h3>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
