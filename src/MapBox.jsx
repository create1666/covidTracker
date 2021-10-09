import "./Map.css";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { caseTypeColors } from "./util";

const MapBox = ({ center, zoom, countries, caseType = "deaths" }) => {
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
              lat: country.countryInfo.lat,
              lng: country.countryInfo.long,
            }}
            key={country.country}
            radius={
              Math.sqrt(country[caseType]) * caseTypeColors[caseType].multiplier
            }
            fillOpacity={0.4}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapBox;
