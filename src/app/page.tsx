// Home.tsx or your equivalent Home component file
"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import climateData from "../../data/climateData.json";
import ColorBar from "../components/RiskColorBar";
import Head from "next/head";

//lazy loading components
const DynamicMapComponent = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const DynamicLineGraph = dynamic(() => import("../components/Graph"), {
  loading: () => <div>Loading...</div>,
});

const DynamicDataTable = dynamic(() => import("../components/Table"), {
  loading: () => <div>Loading...</div>,
});

const columns = [
  {
    Header: "Asset Name",
    accessor: "Asset Name",
  },
  {
    Header: "Latitude",
    accessor: "Lat",
  },
  {
    Header: "Longitude",
    accessor: "Long",
  },
  {
    Header: "Business Category",
    accessor: "Business Category",
  },
  {
    Header: "Risk Rating",
    accessor: "Risk Rating",
  },
  {
    Header: "Year",
    accessor: "Year",
  },
  {
    Header: "Risk Factors",
    id: "Risk Factors",
    accessor: (row) => JSON.stringify(row["Risk Factors"]),
  },
];

export default function Home() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedDecade, setSelectedDecade] = useState(2030);
  //store selected location from map to render in line graphy
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [selectedBusinessCategory, setSelectedBusinessCategory] = useState("");

  //style selected decade
  const isSelected = (decade) => {
    return selectedDecade === decade
      ? { backgroundColor: "#007bff", color: "white" }
      : {};
  };

  // filter data based on selected decade
  const filteredData = climateData.filter(
    (item) => item.Year === selectedDecade
  );

  // console.log(`Filtered data for ${selectedDecade}:`, filteredData.length);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ColorBar />

      <div className="map-chart-container">
        <div className="map-container">
          <div className="select-bar-container">
            <button
              className="select-bar-item"
              style={isSelected(2030)}
              value={2030}
              onClick={() => setSelectedDecade(2030)}
            >
              2030
            </button>
            <button
              className="select-bar-item"
              style={isSelected(2040)}
              value={2040}
              onClick={() => setSelectedDecade(2040)}
            >
              2040
            </button>
            <button
              className="select-bar-item"
              style={isSelected(2050)}
              value={2050}
              onClick={() => setSelectedDecade(2050)}
            >
              2050
            </button>
            <button
              className="select-bar-item"
              style={isSelected(2060)}
              value={2060}
              onClick={() => setSelectedDecade(2060)}
            >
              2060
            </button>
            <button
              className="select-bar-item"
              style={isSelected(2070)}
              value={2070}
              onClick={() => setSelectedDecade(2070)}
            >
              2070
            </button>
          </div>

          <DynamicMapComponent
            key={selectedDecade}
            data={filteredData}
            onSelectLocation={setSelectedLocation}
          />
        </div>
        <div className="chart-container">
          {/* <h2 className="chart-heading"> Average Risk Rating Over Time</h2> */}
          <DynamicLineGraph
            data={filteredData}
            selectedLocation={selectedLocation}
          />
        </div>
      </div>

      <DynamicDataTable columns={columns} data={filteredData} />
    </>
  );
}
