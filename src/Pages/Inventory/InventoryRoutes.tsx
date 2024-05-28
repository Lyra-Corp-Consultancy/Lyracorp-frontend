
import { Route, Routes } from "react-router-dom";
import PurchaseOrderRoute from "./PurchaseOrder/PurchaseOrderRoute";
import PurchaseInwardRoute from "./PurchaseInward/PurchaseInwardRoute";
import RawMaterialOutwardRoute from "./RawMaterialOutward/RawMaterialOutwardRoutes";

function InventoryRoutes() {
  return (
    <>
      <Routes>
        <Route path="/purchase-order/*" element={<PurchaseOrderRoute />} />
        <Route path="/purchase-inward/*" element={<PurchaseInwardRoute />} />
        <Route path="/raw-material-outward/*" element={<RawMaterialOutwardRoute />} />
      </Routes>
    </>
  );
}

export default InventoryRoutes;
