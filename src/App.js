import { useEffect, useState } from "react";
import "./App.css";

import {
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Card,
} from "@material-ui/core";
import InfoBox from "./InfoBox.jsx";
import MapBox from "./MapBox.jsx";
import Table from "./Table.jsx";
import { prettifyStats, sort } from "./util";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import LineGraph from "./LineGraph.jsx";
import "leaflet/dist/leaflet.css";

const useCountryInfo = (country) => {
  const [countryData, setCountryData] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setZoomCenter] = useState(3);
  async function countryCovidRec(country) {
    const url =
      country === "worldwide"
        ? "https://astro-cors-server.herokuapp.com/fetch/https://disease.sh/v3/covid-19/all"
        : "https://astro-cors-server.herokuapp.com/fetch/https://disease.sh/v3/covid-19/countries/" +
          country;
    // await sleep(10000);
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("datafix", data);
        covidTrackerCache[country] = data;
        console.log("here-:", covidTrackerCache[country]);
        setCountryData(data);
        if (country !== "worldwide") {
          setMapCenter({
            lat: data?.countryInfo?.lat,
            lng: data?.countryInfo?.long,
          });
          setZoomCenter(4);
        }
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
  console.log("new-:", { countryData });
  return { countryData, mapCenter, mapZoom };
};

const useFetchCountries = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const { countryData, mapCenter, mapZoom } = useCountryInfo(country);

  console.log("info-:", countryData);

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
          console.log("datafix3", data);
          const countries = data.map((country) => {
            return {
              name: country?.country,
              value: country?.countryInfo?.iso3,
            };
          });
          setCountries(countries);
          setMapCountries(data);
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

  console.log({ countryData }, "diditi");

  return {
    isLoaded,
    countries,
    tableData,
    setCountries,
    countryInfo: countryData,
    country,
    setCountry,
    mapCenter,
    setMapCountries,
    mapZoom,
    mapCountries,
  };
};

const covidTrackerCache = {};
function App() {
  const [caseType, setCaseType] = useState("cases");

  const {
    isLoaded,
    countries,
    tableData,
    country,
    setCountry,
    countryInfo,
    mapCenter,
    mapCountries,
    mapZoom,
  } = useFetchCountries();

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
              isRed
              active={caseType === "cases"}
              title="Coronavirus Cases "
              onClick={() => setCaseType("cases")}
              cases={
                countryInfo ? prettifyStats(countryInfo?.todayCases) : "N/A"
              }
              total={countryInfo ? prettifyStats(countryInfo?.cases) : "N/A"}
            />
            <InfoBox
              isGreen={caseType === "recovered"}
              onClick={() => setCaseType("recovered")}
              title="Recovered "
              cases={
                countryInfo ? prettifyStats(countryInfo?.todayRecovered) : "N/A"
              }
              total={
                countryInfo ? prettifyStats(countryInfo?.recovered) : "N/A"
              }
            />
            <InfoBox
              title="Death"
              isBlack={caseType === "deaths"}
              onClick={() => setCaseType("deaths")}
              cases={
                countryInfo ? prettifyStats(countryInfo?.todayDeaths) : "N/A"
              }
              total={countryInfo ? prettifyStats(countryInfo?.deaths) : "N/A"}
            />
          </div>
          <div className="app_mapBox">
            <MapBox
              caseType={caseType}
              zoom={mapZoom}
              center={mapCenter}
              countries={mapCountries}
            />
          </div>
        </div>
        <div className="app_right">
          <Card className="app__card">
            <CardContent>
              <h3>Live cases by country</h3>
              <Table
                countries={tableData}
                setCountry={setCountry}
                country={country}
              ></Table>
              <h3 className="app__lineGraph-head">Worldwide new {caseType}</h3>
              <LineGraph className="app__lineGraph" caseType={caseType} />
            </CardContent>
          </Card>
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
            timeout={10000}
          />
          <h2> Desktop view only...</h2>
        </div>
      )}
    </div>
  );
}

export default App;
