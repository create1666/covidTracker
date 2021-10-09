import "./Map.css";
import { Circle, MapContainer, TileLayer } from "react-leaflet";
// eslint-disable-next-line import/named
import { caseTypeColors } from "./util";

const MapBox = ({ center, zoom, countries, caseType }) => {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {countries.map((country) => (
          <Circle
            caseTypeColors
            center={{
              lat: country.countryInfo.lat,
              lng: country.countryInfo.long,
            }}
            key={country.country}
            radius={
              Math.sqrt(country[caseType]) * caseTypeColors[caseType].multiplier
            }
            fillOpacity={0.4}
          >
            {" "}
          </Circle>
        ))}

        {/* <Popup>I'm a pop-UP</Popup> */}
      </MapContainer>
    </div>
  );
};

export default MapBox;
