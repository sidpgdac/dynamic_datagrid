// src/App.js

import React, { useState } from "react";

import "devextreme/dist/css/dx.light.css";
import DatasourceDropdown from "./components/DatasourceDropdown";
import DatasourceGrid from "./components/DatasourceGrid";
import "./home.css";

const Home = () => {
  const [selectedDatasourceId, setSelectedDatasourceId] = useState(null);

  return (
    <div className="App">
      <h5>Datasource Viewer</h5>
      <DatasourceDropdown onDatasourceChange={setSelectedDatasourceId} />
      {selectedDatasourceId && (
        <DatasourceGrid datasourceId={selectedDatasourceId} />
      )}
    </div>
  );
};

export default Home;
