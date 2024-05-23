import React from "react";
import { Route, Routes } from "react-router-dom";
import QCPO from "./QCPO";
import NavigationBar from "../../../components/NavigationBar";

function QCPORoute() {
  return (
    <div className="overflow-x-hidden">
      <NavigationBar />
      <Routes>
        <Route path="/" index element={<QCPO />} />
      </Routes>
    </div>
  );
}

export default QCPORoute;
