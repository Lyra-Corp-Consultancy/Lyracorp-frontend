import { Route, Routes } from "react-router-dom";
import RMReports from "./RMReports/RMReports";
import NavigationBar from "../../components/NavigationBar";
import FGReports from "./FGReports/FGReports";

function ReportsRoute() {
  return (
    <div  className="overflow-x-hidden">
      <NavigationBar />
      <Routes>
        <Route path="/rm-reports" element={<RMReports />} />
        <Route path="/fg-reports" element={<FGReports />} />
      </Routes>
    </div>
  );
}

export default ReportsRoute;
