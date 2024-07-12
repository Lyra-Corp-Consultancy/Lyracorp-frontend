/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFGReports } from "../../../utils/redux/actions";
import Select from "../../../components/Select";
import { makeToast } from "../../../utils/redux/slice";
import { Navigate, useNavigate } from "react-router-dom";





function QualityReport()
 {
  const [report, setReports] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const dispatch: any = useDispatch();
  const [search, setSearch] = useState<{ rmName: string; warehouse: string; batchNum: string }>({ rmName: "", warehouse: "", batchNum: "" });
  const [dropDown, setDropDown] = useState<{ finishedGoods: string[]; warehouse: string[]; batchNum: string[] }>({ batchNum: [], warehouse: [], finishedGoods: [] });
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getFGReports()).then((res: any) => {
      console.log(res.payload);
      setReports(res.payload);
      setFiltered(res.payload);
      let finishedGoods = res.payload.map((x: any) => x?.products?.productName);
      let warehouse = res.payload.map((x: any) => x?.warehouse?.warehouseName);
      let batchNum = res.payload.map((x: any) => x?.batchNumbers);
      finishedGoods = [...new Set(finishedGoods)];
      warehouse = [...new Set(warehouse)];
      batchNum = [...new Set(batchNum)];
      setDropDown({ finishedGoods, warehouse, batchNum });
    });
  }, []);
  return (
    <div className="px-10 py-3">
      <h1 className="font-semibold text-[20px]">Quality Report</h1>
      <div className="w-full min-h-[80vh] bg-[#F1F3FF] rounded-2xl shadow-[#00000080] shadow-md px-3">
        <h2>Quality Check Report</h2>
        <div className="bg-white p-3 rounded-2xl">
          <div className="grid grid-cols-4 w-full gap-4">
            <div className="flex gap-3 items-center">
              <label className="text-[14px] w-[200px]">Vendor Name</label>
              <Select value={search.warehouse || ""} onChange={(e) => setSearch({ ...search, warehouse: e.target.value })}>
                {dropDown.warehouse
                  .filter((x) => x?.toLocaleLowerCase()?.includes(search.warehouse))
                  .map((x) => (
                    <li
                      onClick={() => {
                        setSearch({ ...search, warehouse: x });
                        const batchNum = filtered.filter((y) => y?.warehouse?.warehouseName?.toLocaleLowerCase() === x.toLocaleLowerCase() && y?.products?.productName?.toLocaleLowerCase() === search.rmName.toLocaleLowerCase()).map((x: any) => x?.batchNumbers);
                        setDropDown({ ...dropDown, batchNum });
                      }}
                      className="px-1 truncate py-1 hover:bg-slate-300 transition-all duration-150"
                    >
                      {x}
                    </li>
                  ))}
              </Select>
            </div>
            <div className="flex gap-3 items-center">
              <label className="text-[14px]">Raw Material Name</label>
             
              <Select value={search.warehouse || ""} onChange={(e) => setSearch({ ...search, warehouse: e.target.value })}>
                {dropDown.warehouse
                  .filter((x) => x?.toLocaleLowerCase()?.includes(search.warehouse))
                  .map((x) => (
                    <li
                      onClick={() => {
                        setSearch({ ...search, warehouse: x });
                        const batchNum = filtered.filter((y) => y?.warehouse?.warehouseName?.toLocaleLowerCase() === x.toLocaleLowerCase() && y?.products?.productName?.toLocaleLowerCase() === search.rmName.toLocaleLowerCase()).map((x: any) => x?.batchNumbers);
                        setDropDown({ ...dropDown, batchNum });
                      }}
                      className="px-1 truncate py-1 hover:bg-slate-300 transition-all duration-150"
                    >
                      {x}
                    </li>
                  ))}
              </Select>
            </div>
            <div className="flex gap-3 items-center">
              <label className="text-[14px]">GRN Number</label>
              <Select value={search.batchNum || ""} onChange={(e) => setSearch({ ...search, batchNum: e.target.value })}>
                {dropDown.batchNum
                  .filter((x) => x?.toLocaleLowerCase()?.includes(search.batchNum))
                  .map((x) => (
                    <li onClick={() => setSearch({ ...search, batchNum: x })} className="px-1 truncate py-1 hover:bg-slate-300 transition-all duration-150">
                      {x}
                    </li>
                  ))}
              </Select>
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={() => {
                  const filter = report
                    .filter((x) => {
                      if (search.rmName) {
                        if (x?.products?.productName?.toLocaleLowerCase()?.includes(search.rmName.toLocaleLowerCase())) {
                          return x;
                        }
                      } else {
                        return x;
                      }
                    })
                    .filter((x) => {
                      if (search.warehouse) {
                        if (x?.warehouse?.warehouseName?.toLocaleLowerCase()?.includes(search.warehouse.toLocaleLowerCase())) {
                          return x;
                        }
                      } else {
                        return x;
                      }
                    })
                    .filter((x) => {
                      if (search.batchNum) {
                        if (x?.batchNumbers?.toLocaleLowerCase()?.includes(search.batchNum.toLocaleLowerCase())) {
                          return x;
                        }
                      } else {
                        return x;
                      }
                    });
                    if(!filter?.[0]){
                        dispatch(makeToast({heading:"Error",text:"No Data Found"}))
                    }
                  setFiltered([...filter]);
                }}
                className="bg-[#5970F5] text-white flex gap-3 items-center px-3 py-1 rounded-md"
              >
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.6667 12.6667L16 16M1 7.66667C1 9.43478 1.70238 11.1305 2.95262 12.3807C4.20286 13.631 5.89856 14.3333 7.66667 14.3333C9.43478 14.3333 11.1305 13.631 12.3807 12.3807C13.631 11.1305 14.3333 9.43478 14.3333 7.66667C14.3333 5.89856 13.631 4.20286 12.3807 2.95262C11.1305 1.70238 9.43478 1 7.66667 1C5.89856 1 4.20286 1.70238 2.95262 2.95262C1.70238 4.20286 1 5.89856 1 7.66667Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Find
              </button>
            </div>
          </div>
          <table className="w-full mt-5">
            <thead>
              <tr className="bg-[#C3CBFF]">
              <th className="border-r w-1/8">S No</th>
                <th className="border-r w-1/8">Vendor Name</th>
                <th className="border-r w-1/8">Product Name</th>
                <th className="border-r w-1/8">GRN Number</th>
                <th className="border-r w-1/8">Received Quantity</th>
                <th className="border-r w-1/8">Billed Quantity</th>
                <th className="border-r w-1/8">Rejected Quantity</th>
                <th className="border-r w-1/8">UOM</th>
              </tr>
            </thead>
            <tbody>
              {/* {filtered.map((x, i) => ( */}
                <tr>
                  <td className="text-center">
                    {/* {i + 1} */} 1
                    </td>
                  <td className="text-center">2</td>
                  <td className="text-center">3</td>
                  <td className="text-center">4</td>
                  <td className="text-center">5</td>
                  <td className="text-center">6</td>
                  <td className="text-center">7</td>
                  <td className="text-center">8</td>
                  {/* <td className="text-center">{x?.products?.productName || "No Name"}</td>
                  <td className="text-center">{x?.products?.productDes || "No Description"}</td>
                  <td className="text-center">{x?.batchNumbers || "No Batch Number"}</td>
                  <td className="text-center">{x?.quantity || "No value Found"}</td>
                  <td className="text-center">{x?.warehouse?.warehouseName || "No Address Found"}</td> */}
                </tr>
              {/* ))} */}
            </tbody>
          </table>
          <div className="w-full absolute bottom-4 justify-center items-center  gap-3 flex mt-5">
            
            <button type="button" className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className=" rounded-md py-2 px-4 font-semibold bg-[#5970F5] text-white">
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );


}


export default QualityReport;
