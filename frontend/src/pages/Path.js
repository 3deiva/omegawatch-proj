import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for missing marker icons in Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
});

function Path() {
  // State for drone position and path coordinates
  const [dronePosition, setDronePosition] = useState([37.7749, -122.4194]); // Example: San Francisco
  const [pathCoordinates, setPathCoordinates] = useState([
    [37.7749, -122.4194],
    [37.7849, -122.4094],
    [37.7949, -122.3994],
  ]);

  // Simulate drone movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDronePosition((prevPosition) => {
        const newLat = prevPosition[0] + 0.001;
        const newLng = prevPosition[1] + 0.001;
        return [newLat, newLng];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen">
      <h1 className="text-center text-2xl font-bold my-4">Path Display</h1>
      <div className="h-5/6">
        <MapContainer center={dronePosition} zoom={13} className="h-full w-full">
          {/* Tile Layer */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Drone Path */}
          <Polyline positions={pathCoordinates} color="blue" weight={3} />

          {/* Drone Marker */}
          <Marker position={dronePosition}>
            <Popup>Drone is here!</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default Path;
