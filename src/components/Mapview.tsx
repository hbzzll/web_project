// components/MapView.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// 默认的 marker 图标需要手动设置
import "leaflet/dist/leaflet.css";

L.Icon.Default.prototype.options.iconUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png";
L.Icon.Default.prototype.options.iconRetinaUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png";
L.Icon.Default.prototype.options.shadowUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png";

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
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>{label || "Property location"}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
