import NavigationBar from "../../../components/NavigationBar";
import { Routes, Route } from "react-router-dom";
import StockCheckList from "./StockCheckList";

function StockCheckRoute() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" index element={<StockCheckList />} />
     </Routes>
    </div>
  );
}

export default StockCheckRoute;
