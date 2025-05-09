import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Icon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",

  iconSize: [25, 41],
  shadowSize: [41, 41],
});
interface MapProps {
  lat: number;
  lng: number;
  zoom?: number;
  label?: string;
}

const MapView: React.FC<MapProps> = ({ lat, lng, zoom = 16, label }) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: "400px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={Icon}>
        <Popup>{label || "Property location"}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
