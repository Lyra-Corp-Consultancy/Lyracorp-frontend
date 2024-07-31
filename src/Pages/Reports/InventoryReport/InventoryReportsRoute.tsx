import { Route, Routes } from "react-router-dom";
import RMReports from "./RMReports/RMReports";

import FGReports from "./FGReports/FGReports";
import PMReports from "./PMReports/PMReports";
import ProductionSOPReport from "./ProductionSOPReport/ProductionSOPReport";

function InventoryReportsRoute() {
  return (
    <div className="overflow-x-hidden">
      <Routes>
        <Route path="/rm-reports" element={<RMReports />} />
        <Route path="/fg-reports" element={<FGReports />} />
        <Route path="/pm-reports" element={<PMReports />} />
        <Route path="/production-sop-reports" element={<ProductionSOPReport />} />
      </Routes>
    </div>
  );
}

export default InventoryReportsRoute;
