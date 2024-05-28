import { Route, Routes } from "react-router-dom";
import NavigationBar from "../../../components/NavigationBar";
import RawMaterialOutward from "./RawMaterialOutward";
import AddRawMaterialOutward from "./AddRawMaterialOutward/AddRawMaterialOutward";
import ViewRawMaterialOutward from "./ViewRawMaterialOutward/ViewRawMaterialOutward";

function RawMaterialOutwardRoute() {
  return (
    <div className="overflow-x-hidden">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<RawMaterialOutward />} />
        <Route path="/add" element={<AddRawMaterialOutward />} />
        <Route path="/view/:id" element={<ViewRawMaterialOutward />} />
      </Routes>
    </div>
  );
}

export default RawMaterialOutwardRoute;
