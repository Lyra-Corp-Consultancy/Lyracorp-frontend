/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Route, Routes } from "react-router-dom";
import QualityRMReport from "./QualityRMReport/QualityRMReport";
import QualityFGReport from "./QualityFGReport/QualityFGReport";

function QualityReport() {
  return (
    <Routes>
      <Route path="/rm-reports" element={<QualityRMReport />} />
      <Route path="/fg-reports" element={<QualityFGReport />} />
    </Routes>
  );
}

export default QualityReport;
