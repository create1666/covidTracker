import { useEffect, useState } from "react";
import "./App.css";

import {
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Card,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import MapBox from "./MapBox";
import Table from "./Table";
import { sort } from "./util";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import LineGraph from "./LineGraph";

const useCountryInfo = (country) => {
  const [countryData, setCountryData] = useState("");

  async function countryCovidRec(country) {
    const url =
      country === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : "https://disease.sh/v3/covid-19/countries/" + country;
    // await sleep(10000);
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        covidTrackerCache[country] = data;
        setCountryData(data);
      })
      .catch(() => setCountryData(false));
  }

  useEffect(() => {
    console.log("finding country");
    if (!country) {
      setCountryData({});
    } else if (covidTrackerCache[country]) {
      setCountryData(covidTrackerCache[country]);
    } else {
      countryCovidRec(country);
    }
  }, [country]);
  // function sleep(period) {
  //   return new Promise((resolve) => setTimeout(resolve, period));
  // }

  return [countryData];
};

const useFetchCountries = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo] = useCountryInfo(country);
  useEffect(() => {
    async function getCountriesData() {
      await fetch(
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
          const sortedData = sort(data);
          console.log("sortedvalue:", sortedData);
          setTableData(sortedData);
          setIsLoaded(true);
          console.log("total countries:", countries);
        })
        .catch((e) => console.log(e.message));
    }
    getCountriesData();
  }, []);

  return {
    isLoaded,
    countries,
    tableData,
    setCountries,
    countryInfo,
    country,
    setCountry,
  };
};

const covidTrackerCache = {};
function App() {
  const { isLoaded, countries, tableData, country, setCountry, countryInfo } =
    useFetchCountries();

  const onHandleChange = (e) => {
    const countryValue = e.target.value;
    setCountry(countryValue);
  };

  const CovidTracker = () => {
    return (
      <div className="app">
        <div className="app_left">
          <div className="app_header">
            <h1>COVID-19 TRACKER</h1>
            <FormControl>
              <Select
                onBlur={onHandleChange}
                onChange={onHandleChange}
                variant="outlined"
                value={country}
              >
                <MenuItem value="worldwide">Worldwide</MenuItem>

                {countries.map((country, index) => (
                  <MenuItem key={index} value={country.value}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="app_stats">
            <InfoBox
              title="Coronavirus Cases "
              cases={countryInfo ? countryInfo.todayCases : "N/A"}
              total={countryInfo ? countryInfo.cases : "N/A"}
            />
            <InfoBox
              title="Recovered "
              cases={countryInfo ? countryInfo.todayRecovered : "N/A"}
              total={countryInfo ? countryInfo.recovered : "N/A"}
            />
            <InfoBox
              title="Death"
              cases={countryInfo ? countryInfo.todayDeaths : "N/A"}
              total={countryInfo ? countryInfo.deaths : "N/A"}
            />
          </div>
          <div className="app_mapBox">
            <MapBox />
          </div>
        </div>
        <div className="app_right">
          <Card>
            <CardContent>
              <h3>Live cases by country</h3>
              <Table countries={tableData}></Table>
              <h3>Worldwide new cases</h3>
            </CardContent>
          </Card>
          <LineGraph />
        </div>
      </div>
    );
  };

  return (
    <div>
      {isLoaded ? (
        <CovidTracker />
      ) : (
        <div className="spinLoader">
          {" "}
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={10000} //3 secs
          />
        </div>
      )}
    </div>
  );
}

export default App;
