import React from "react";
import { Route, Routes } from "react-router-dom";
import QCPORoute from "./QCPO/QCPORoute";

function QCRoute() {
  return (
    <>
      <Routes>
        <Route path="/qc-po/*" element={<QCPORoute />} />
      </Routes>
    </>
  );
}

export default QCRoute;
