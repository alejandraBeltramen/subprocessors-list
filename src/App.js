import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SubprocessorsManagementPage from "./pages/subprocessors-management";

const App = () => {
  return (
    <div>
      <Routes exact>
        <Route path="/" element={<Home />} />
        <Route path="/subprocessors-management" element={<SubprocessorsManagementPage />} />
      </Routes>
    </div>
  );
};

export default App;
