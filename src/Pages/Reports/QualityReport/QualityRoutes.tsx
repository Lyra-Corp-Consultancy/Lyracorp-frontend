/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Route, Routes } from "react-router-dom";
import QualityRMReport from "./QualityRMReport/QualityRMReport";

function QualityReport() {
  return (
    <Routes>
      <Route path="/rm-reports" element={<QualityRMReport />} />
    </Routes>
  );
}

export default QualityReport;
