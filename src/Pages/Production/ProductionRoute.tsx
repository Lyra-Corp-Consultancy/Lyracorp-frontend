import { Route, Routes } from "react-router-dom";
import ProductionMasterRoute from "./ProductionMasterSettings/ProductionMasterRoute";
import ProductionSOP from "./ProductionSOP/ProductionSOP";
import RawMaterialUtilization from "./RawMaterialUtilization/RawMaterialUtilization";

function ProductionRoute() {
  return (
    <>
      <Routes>
        <Route path="/master-settings/*" element={<ProductionMasterRoute />} />
        <Route path="/sop" element={<ProductionSOP />} />
        <Route path="/raw-material-utilization" element={<RawMaterialUtilization />} />
      </Routes>
    </>
  );
}

export default ProductionRoute;
