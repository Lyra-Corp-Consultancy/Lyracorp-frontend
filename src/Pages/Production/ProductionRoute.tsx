import { Route, Routes } from "react-router-dom";
import ProductionMasterRoute from "./ProductionMasterSettings/ProductionMasterRoute";
import ProductionSOP from "./ProductionSOP/ProductionSOP";

function ProductionRoute() {
  return (
    <>
      <Routes>
        <Route path="/master-settings/*" element={<ProductionMasterRoute />} />
        <Route path="/sop" element={<ProductionSOP />} />
      </Routes>
    </>
  );
}

export default ProductionRoute;
