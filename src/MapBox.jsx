import "./Map.css";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import { caseTypeColors } from "./util.js";
import numeral from "numeral";

const MapBox = ({ center, zoom, countries, caseType = "cases" }) => {
  console.log("flame", countries);

  const [{ countryInfo }] = countries;
  console.log("flag", countryInfo.flag);

  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countries.map((country) => (
          <Circle
            center={{
              lat: country?.countryInfo?.lat,
              lng: country?.countryInfo?.long,
            }}
            key={country.country}
            radius={
              Math.sqrt(country[caseType]) * caseTypeColors[caseType].multiplier
            }
            fillOpacity={0.4}
            color={caseTypeColors[caseType].hex}
          >
            <Popup>
              <div className="info-container">
                <img
                  alt=""
                  className="info-flag"
                  style={{
                    backgroundImage: `url(${country?.countryInfo?.flag})`,
                  }}
                />
                <div className="info-name">{country.country}</div>
                <div className="info-cases">
                  Cases: {numeral(country.cases).format("0,0")}
                </div>
                <div className="info-deaths">
                  Deaths: {numeral(country.deaths).format("0,0")}
                </div>
                <div className="info-recovered">
                  Recovered: {numeral(country.recovered).format("0,0")}
                </div>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapBox;
