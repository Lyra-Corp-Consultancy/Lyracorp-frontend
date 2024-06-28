
import { Route, Routes } from "react-router-dom";
import PurchaseOrderRoute from "./PurchaseOrder/PurchaseOrderRoute";
import PurchaseInwardRoute from "./PurchaseInward/PurchaseInwardRoute";
import RawMaterialOutwardRoute from "./RawMaterialOutward/RawMaterialOutwardRoutes";
import FinishedGoodsInwardRoute from "./FinishedGoodsInward/FinishedGoodsInwardRoute";

function InventoryRoutes() {
  return (
    <>
      <Routes>
        <Route path="/purchase-order/*" element={<PurchaseOrderRoute />} />
        <Route path="/purchase-inward/*" element={<PurchaseInwardRoute />} />
        <Route path="/raw-material-outward/*" element={<RawMaterialOutwardRoute />} />
        <Route path="/finished-goods-inward/*" element={<FinishedGoodsInwardRoute />} />
      </Routes>
    </>
  );
}

export default InventoryRoutes;
