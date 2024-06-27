import React from "react";
import { Route, Routes } from "react-router-dom";
import RMReports from "./RMReports/RMReports";
import NavigationBar from "../../components/NavigationBar";

function ReportsRoute() {
  return (
    <div  className="overflow-x-hidden">
      <NavigationBar />
      <Routes>
        <Route path="/rm-reports" element={<RMReports />} />
      </Routes>
    </div>
  );
}

export default ReportsRoute;
