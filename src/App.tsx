/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MasterRoutes from "./Pages/Master/MasterRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { makeToastFalse } from "./utils/redux/slice";
import InventoryRoutes from "./Pages/Inventory/InventoryRoutes";

function App() {
  const data = useSelector((state: any) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.toaster) {
      const elem = document.getElementById("toaster");
      if (elem) {
        elem.style.transform = "translateX(0)";
        setTimeout(() => {
          elem.style.transform = "translateX(100%)";
        }, 3000);
      }
      dispatch(makeToastFalse())
    }
  }, [data]);
  return (
    <div>
      <div id="toaster" className="w-[360px] flex p-5 gap-3 transition-all duration-500 ease-in-out translate-x-[100%] bg-[#E0E4FF] rounded-[20px_0_0_0] absolute z-[999] right-0 top-24 shadow-md shadow-[#00000040]">
        <svg width={29} height={31} viewBox="0 0 29 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_631_40936" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x={0} y={0} width={29} height={31}>
            <path d="M14.5 2L17.9521 4.51827L22.2257 4.51038L23.538 8.57694L27 11.0821L25.6719 15.1434L27 19.2047L23.538 21.7098L22.2257 25.7764L17.9521 25.7685L14.5 28.2867L11.0479 25.7685L6.77433 25.7764L5.46196 21.7098L2 19.2047L3.32814 15.1434L2 11.0821L5.46196 8.57694L6.77433 4.51038L11.0479 4.51827L14.5 2Z" fill="white" stroke="white" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.89844 15.1452L13.1843 18.4311L19.756 11.8594" stroke="black" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
          </mask>
          <g mask="url(#mask0_631_40936)">
            <path d="M-1.26953 -0.628906H30.2746V30.9152H-1.26953V-0.628906Z" fill="#196000" />
          </g>
        </svg>
        <div>
          <p className="text-[14px]">{data?.submsg}</p>
          <p className="text-[16px] roboto-medium">{data?.msg}</p>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/master/*" element={<MasterRoutes />} />
        <Route path="/inventory/*" element={<InventoryRoutes/>}/>
      </Routes>
    </div>
  );
}

export default App;
