import { Route, Routes } from "react-router-dom";
import NavigationBar from "../../../components/NavigationBar";
import FinishedGoodsOutwardList from "./FinishedGoodsOutward";
import AddFinishedGoodsOutward from "./AddFinishedGoodsOutward/AddFinishedGoodsOutward";
import ViewFinishedGoodsOutward from "./ViewFinishedGoodsOutward/ViewFinishedGoodsOutward";

function FinishedGoodsRoute() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" index element={<FinishedGoodsOutwardList />} />
        <Route path="/add" element={<AddFinishedGoodsOutward />} />
        <Route path="/view/:id" element={<ViewFinishedGoodsOutward />} />
      </Routes>
    </div>
  );
}

export default FinishedGoodsRoute;
