import React from "react";
import { Route, Routes } from "react-router-dom";
import PurchaseOrderRoute from "./PurchaseOrder/PurchaseOrderRoute";

function InventoryRoutes() {
  return (
    <>
      <Routes>
        <Route path="/purchase-order/*" element={<PurchaseOrderRoute />} />
      </Routes>
    </>
  );
}

export default InventoryRoutes;
