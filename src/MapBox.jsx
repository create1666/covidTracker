import "./Map.css";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import { caseTypeColors } from "./util.js";

const MapBox = ({ center, zoom, countries, caseType = "cases" }) => {
  console.log("colors", caseTypeColors["cases"]);
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
            <Popup>I'm a pop-UP</Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapBox;
