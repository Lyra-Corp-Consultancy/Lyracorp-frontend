
import { Route, Routes } from "react-router-dom";
import QCPO from "./QCPO";
import NavigationBar from "../../../components/NavigationBar";
import CheckQCPO from "./CheckQCPO/CheckQCPO";

function QCPORoute() {
  return (
    <div className="overflow-x-hidden">
      <NavigationBar />
      <Routes>
        <Route path="/" index element={<QCPO />} />
        <Route path="/check/:id" index element={<CheckQCPO />} />
      </Routes>
    </div>
  );
}

export default QCPORoute;
