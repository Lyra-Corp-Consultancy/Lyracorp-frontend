import { Route, Routes } from "react-router-dom";
import FinishedGoodsRoute from "./FinishedGoods/FinishedGoodsRoute";

function SupplyChainManagementRoute() {
  return (
    <>
      <Routes>
        <Route path="/finished-goods-outward/*" element={<FinishedGoodsRoute />} />
      </Routes>
    </>
  );
}

export default SupplyChainManagementRoute;
