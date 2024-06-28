/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useState } from "react";
import Select from "../../../components/Select";
import { useDispatch } from "react-redux";
import { getRMReports } from "../../../utils/redux/actions";
import { makeToast } from "../../../utils/redux/slice";

function RMReports() {
  const [report, setReports] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const dispatch: any = useDispatch();
  const [search, setSearch] = useState<{ rmName: string; warehouse: string; grn: string }>({ rmName: "", warehouse: "", grn: "" });
  const [dropDown, setDropDown] = useState<{ rawMaterials: string[]; warehouse: string[]; grn: string[] }>({ grn: [], warehouse: [], rawMaterials: [] });
  useEffect(() => {
    dispatch(getRMReports()).then((res: any) => {
      console.log(res.payload);
      setReports(res.payload);
      setFiltered(res.payload);
      let rawMaterials = res.payload.map((x: any) => x?.product?.productName);
      let warehouse = res.payload.map((x: any) => x?.warehouse?.address);
      let grn = res.payload.map((x: any) => x?.grn);
      rawMaterials = [...new Set(rawMaterials)];
      warehouse = [...new Set(warehouse)];
      grn = [...new Set(grn)];
      setDropDown({ rawMaterials, warehouse, grn });
    });
  }, []);
  return (
    <div className="px-10 py-3">
      <h1 className="font-semibold text-[20px]">Inventory Report</h1>
      <div className="w-full min-h-[80vh] bg-[#F1F3FF] rounded-2xl shadow-[#00000080] shadow-md px-3">
        <h2>Raw Material Report</h2>
        <div className="bg-white p-3 rounded-2xl">
          <div className="grid grid-cols-4 w-full gap-4">
            <div className="flex gap-3 items-center">
              <label className="text-[14px]">Raw Material Name</label>
              <Select value={search.rmName || ""} onChange={(e) => setSearch({ ...search, rmName: e.target.value })}>
                {dropDown.rawMaterials
                  .filter((x) => x?.toLocaleLowerCase()?.includes(search.rmName))
                  .map((x) => (
                    <li
                      onClick={() => {
                        setSearch({ ...search, rmName: x });
                        const warehouse = report.filter((y) => y?.product?.productName?.toLocaleLowerCase() === x.toLocaleLowerCase()).map((x: any) => x?.warehouse?.address);
                        const grn = report.filter((y) => y?.product?.productName?.toLocaleLowerCase() === x.toLocaleLowerCase()).map((x: any) => x?.grn);
                        console.log(warehouse, grn);
                        setDropDown({ ...dropDown, warehouse, grn });
                      }}
                      className="px-1 truncate py-1 hover:bg-slate-300 transition-all duration-150"
                    >
                      {x}
                    </li>
                  ))}
              </Select>
            </div>
            <div className="flex gap-3 items-center">
              <label className="text-[14px]">Warehouse Name</label>
              <Select value={search.warehouse || ""} onChange={(e) => setSearch({ ...search, warehouse: e.target.value })}>
                {dropDown.warehouse
                  .filter((x) => x?.toLocaleLowerCase()?.includes(search.warehouse))
                  .map((x) => (
                    <li
                      onClick={() => {
                        setSearch({ ...search, warehouse: x });
                        const grn = filtered.filter((y) => y?.warehouse?.address?.toLocaleLowerCase() === x.toLocaleLowerCase() && y?.product?.productName?.toLocaleLowerCase() === search.rmName.toLocaleLowerCase()).map((x: any) => x?.grn);
                        setDropDown({ ...dropDown, grn });
                      }}
                      className="px-1 truncate py-1 hover:bg-slate-300 transition-all duration-150"
                    >
                      {x}
                    </li>
                  ))}
              </Select>
            </div>
            <div className="flex gap-3 items-center">
              <label className="text-[14px]">GRN Name</label>
              <Select value={search.grn || ""} onChange={(e) => setSearch({ ...search, grn: e.target.value })}>
                {dropDown.grn
                  .filter((x) => x?.toLocaleLowerCase()?.includes(search.grn))
                  .map((x) => (
                    <li onClick={() => setSearch({ ...search, grn: x })} className="px-1 truncate py-1 hover:bg-slate-300 transition-all duration-150">
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
                        if (x?.product?.productName?.toLocaleLowerCase()?.includes(search.rmName.toLocaleLowerCase())) {
                          return x;
                        }
                      } else {
                        return x;
                      }
                    })
                    .filter((x) => {
                      if (search.warehouse) {
                        if (x?.warehouse?.address?.toLocaleLowerCase()?.includes(search.warehouse.toLocaleLowerCase())) {
                          return x;
                        }
                      } else {
                        return x;
                      }
                    })
                    .filter((x) => {
                      if (search.grn) {
                        if (x?.grn?.toLocaleLowerCase()?.includes(search.grn.toLocaleLowerCase())) {
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
                <th>S No</th>
                <th>Raw Material</th>
                <th>Description</th>
                <th>GRN Number</th>
                <th>Quantity</th>
                <th>Warehouse</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((x, i) => (
                <tr>
                  <td className="text-center">{i + 1}</td>
                  <td className="text-center">{x?.product?.productName || "No Name"}</td>
                  <td className="text-center">{x?.product?.productDes || "No Description"}</td>
                  <td className="text-center">{x?.grn || "No GRN Number"}</td>
                  <td className="text-center">{x?.quantity || "No value Found"}</td>
                  <td className="text-center">{x?.warehouse?.address || "No Address Found"}</td>
                  <td className="text-center">{x?.expiryDate || "No Expiry Date Found"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RMReports;
