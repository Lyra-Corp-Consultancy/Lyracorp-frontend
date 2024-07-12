import { Route, Routes } from "react-router-dom";
import RMReports from "./RMReports/RMReports";

import FGReports from "./FGReports/FGReports";
import PMReports from "./PMReports/PMReports";

function InventoryReportsRoute() {
  return (
    <div className="overflow-x-hidden">
      <Routes>
        <Route path="/rm-reports" element={<RMReports />} />
        <Route path="/fg-reports" element={<FGReports />} />
        <Route path="/pm-reports" element={<PMReports />} />
      </Routes>
    </div>
  );
}

export default InventoryReportsRoute;
