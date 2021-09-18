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
import Table from "./Table";

function App() {
  const covidTrackerCache = {};

  const useCountryInfo = (country) => {
    const [countryData, setCountryData] = useState("");
    if (!country) {
      setCountryData({});
    } else if (covidTrackerCache[country]) {
      setCountryData(covidTrackerCache[country]);
    } else {
      countryCovidRec(country);
      async function countryCovidRec(country) {
        const url =
          country === "worldwide"
            ? "https://disease.sh/v3/covid-19/all"
            : "https://disease.sh/v3/covid-19/countries/" + country;

        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            covidTrackerCache[country] = data;
            setCountryData(data);
          })
          .catch((err) => console.log(err));
      }
    }

    return [countryData];
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("worldwide");
  const [tableData, setTableData] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [country, setCountry] = useState("worldwide");
  const [counryData] = useCountryInfo(country);
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
          setTableData(data);
          setIsLoaded(true);
          console.log("total countries:", countries);
        })
        .catch((e) => console.log(e.message));
    }
    getCountriesData();
  }, []);

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
              {/* {selectedCountry} */}
            </FormControl>
          </div>
          <div className="app_stats">
            <InfoBox
              title="Coronavirus Cases "
              cases={countryInfo.todayCases}
              total={countryInfo.cases}
            />
            <InfoBox
              title="Recovered "
              cases={countryInfo.todayRecovered}
              total={countryInfo.recovered}
            />
            <InfoBox
              title="Death"
              cases={countryInfo.todayDeaths}
              total={countryInfo.deaths}
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
        </div>
      </div>
    );
  };

  const Loader = () => <h1>I am loading</h1>;

  return <div>{isLoaded ? <CovidTracker /> : <Loader />}</div>;
}

export default App;
