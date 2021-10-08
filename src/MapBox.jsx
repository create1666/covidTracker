import "./Map.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { drawMapCircles } from "./util";

const MapBox = ({ center, zoom, countries, caseType }) => {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {drawMapCircles(countries, caseType)}
      </MapContainer>
    </div>
  );
};

export default MapBox;
