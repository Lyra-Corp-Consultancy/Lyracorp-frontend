import NavigationBar from "../../../components/NavigationBar";
import { Routes, Route } from "react-router-dom";
import StockCheckList from "./StockCheckList";

import ViewStockCheck from "./ViewStockCheck/ViewStockCheck";
import EditStockCheck from "./EditStockCheck/EditStockCheck";

function StockCheckRoute() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" index element={<StockCheckList />} />
        <Route path="/edit" element={<EditStockCheck />} />
        <Route path="/view" element={<ViewStockCheck />} />
      </Routes>
    </div>
  );
}

export default StockCheckRoute;
