
import { Route, Routes } from "react-router-dom";
import QCFG from "./QCFG";
import NavigationBar from "../../../components/NavigationBar";
import CheckQCFG from "./CheckQCFG/CheckQCFG";

function QCFGRoute() {
  return (
    <div className="overflow-x-hidden">
      <NavigationBar />
      <Routes>
        <Route path="/" index element={<QCFG />} />
        <Route path="/check/:id" index element={<CheckQCFG />} />
      </Routes>
    </div>
  );
}

export default QCFGRoute;
