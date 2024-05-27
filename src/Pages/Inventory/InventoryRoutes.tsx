
import { Route, Routes } from "react-router-dom";
import PurchaseOrderRoute from "./PurchaseOrder/PurchaseOrderRoute";
import PurchaseInwardRoute from "./PurchaseInward/PurchaseInwardRoute";

function InventoryRoutes() {
  return (
    <>
      <Routes>
        <Route path="/purchase-order/*" element={<PurchaseOrderRoute />} />
        <Route path="/purchase-inward/*" element={<PurchaseInwardRoute />} />
      </Routes>
    </>
  );
}

export default InventoryRoutes;
