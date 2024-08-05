
import { Route, Routes } from "react-router-dom";
import QCPORoute from "./QCPO/QCPORoute";
import QCFGRoute from "./QCFG/QCFGRoute";

function QCRoute() {
  return (
    <>
      <Routes>
        <Route path="/qc-po/*" element={<QCPORoute />} />
        <Route path="/qc-fg/*" element={<QCFGRoute />} />
      </Routes>
    </>
  );
}

export default QCRoute;
