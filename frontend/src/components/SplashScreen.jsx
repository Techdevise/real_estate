import React, { useEffect, useState } from "react";
import Layout from "../layout/Index";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMap,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const { BaseLayer } = LayersControl;

function SetViewOnLocation({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 13);
    }
  }, [coords, map]);
  return null;
}

// Custom button to center map on user's location
function LocateControl({ coords }) {
  const map = useMap();

  useEffect(() => {
    if (!coords) return;

    const locateControl = L.control({ position: "bottomright" });
    locateControl.onAdd = function () {
      const div = L.DomUtil.create("div", "leaflet-bar leaflet-control");
      div.style.background = "white";
      div.style.padding = "6px";
      div.style.cursor = "pointer";
      div.style.borderRadius = "50%";
      div.title = "Go to my location";

      div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>`;

      div.onclick = () => {
        map.setView(coords, 15); // zoom closer to user
      };
      return div;
    };

    locateControl.addTo(map);

    return () => locateControl.remove(); // cleanup
  }, [coords, map]);

  return null;
}

const SplashScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationName, setLocationName] = useState("Loading...");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(coords);

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${coords[0]}&lon=${coords[1]}&format=json`
            );
            const data = await res.json();
            setLocationName(data.display_name || "Unknown location");
          } catch (err) {
            console.error("Reverse geocoding error:", err);
            setLocationName("Unknown location");
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
          alert("Cannot access your location. Please allow location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <Layout>
      <div className="relative w-full h-[96vh] rounded-lg overflow-hidden shadow-lg">
        {/* Search Bar */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-lg">
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2a7.5 7.5 0 010 14.65z"
                />
              </svg>
            </span>

            <input
              type="text"
              placeholder="Search location..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white shadow-md border border-gray-400 placeholder:text-black focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {userLocation && (
          <MapContainer
            center={userLocation}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
          >
            <LayersControl position="bottomright">
              <BaseLayer checked name="OpenStreetMap">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </BaseLayer>

              <BaseLayer name="Satellite">
                <TileLayer
                  attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
              </BaseLayer>

              <BaseLayer name="Dark Mode">
                <TileLayer
                  attribution='&copy; <a href="https://carto.com/">Carto</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
              </BaseLayer>
            </LayersControl>

            <ZoomControl position="bottomright" />

            {/* User location marker */}
            <Marker position={userLocation}>
              <Popup>📍 {locationName}</Popup>
            </Marker>

            <SetViewOnLocation coords={userLocation} />
            <LocateControl coords={userLocation} />
          </MapContainer>
        )}
      </div>
    </Layout>
  );
};

export default SplashScreen;
