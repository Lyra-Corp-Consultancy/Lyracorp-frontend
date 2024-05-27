import React from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "../../../components/NavigationBar";
import RawMaterialOutward from "./RawMaterialOutward";
import AddRawMaterialOutward from "./AddRawMaterialOutward/AddRawMaterialOutward";

function RawMaterialOutwardRoute() {
  return (
    <div className="overflow-x-hidden">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<RawMaterialOutward />} />
        <Route path="/add" element={<AddRawMaterialOutward />} />
      </Routes>
    </div>
  );
}

export default RawMaterialOutwardRoute;
