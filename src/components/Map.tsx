"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

//get color by risk rating
const getColorByRiskRating = (riskRating: number) => {
  if (riskRating >= 0.75) return "#E76F61"; //red
  if (riskRating >= 0.5) return "#F5A071"; //orange
  if (riskRating >= 0.25) return "#F7DC75"; //yellow
  return "#82C596"; //green
};

// Set up the icon for the markers
const getCustomMarkerIcon = (riskRating: number) => {
  const color = getColorByRiskRating(riskRating);
  const markerHtmlStyles = `
    background-color: ${color};
    width: 2rem;
    height: 2rem;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`;

  return L.divIcon({
    className: "my-custom-pin",
    iconAnchor: [0, 24],
    iconSize: [25, 41],
    popupAnchor: [0, -36],
    html: `<span style="${markerHtmlStyles}" />`,
  });
};

const MapComponent = ({ data, onSelectLocation }) => {
  // const markerKeysCount = new Map();

  return (
    <MapContainer
      center={[56.1304, -106.3468]}
      zoom={4}
      scrollWheelZoom={true}
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((item, index) => {
        // // count number of duplicate entries in terms of lattiude and longitude in order to check if if there should be more markers
        // const markerKey = `${item.Lat}-${item.Long}`;

        // markerKeysCount.set(
        //   markerKey,
        //   (markerKeysCount.get(markerKey) || 0) + 1
        // );

        // const duplicateCount = Array.from(markerKeysCount.values()).reduce(
        //   (acc, count) => (count > 1 ? acc + count - 1 : acc),
        //   0
        // );

        // console.log(`Number of duplicate entries: ${duplicateCount}`);

        const customMarkerIcon = getCustomMarkerIcon(item["Risk Rating"]);

        return (
          <Marker
            key={index}
            position={[item.Lat, item.Long]}
            icon={customMarkerIcon}
            eventHandlers={{
              click: () => {
                onSelectLocation(item);
              },
            }}
          >
            <Popup>
              {item["Asset Name"]} - {item["Business Category"]}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

//only renders teh component if "data" prop changes. This prevents unneccessary re-renders.
export default React.memo(MapComponent);
