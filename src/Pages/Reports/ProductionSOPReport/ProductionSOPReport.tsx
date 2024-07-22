/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import DeleteConfirmationBox from "../../../../components/DeleteConfirmationBox";
// import { useParams } from "react-router-dom";
// import Select from "../../../components/Select";
import { getAllProductFinishedGoods, getAllUserManagement, getProductionSOPByBatchNumber, getType } from "../../../utils/redux/actions";
// import { makeToast } from "../../../utils/redux/slice";
// import DeleteConfirmationBox from "../../../../components/DeleteConfirmationBox";

function ProductionSOPReport() {
  const [data, setData] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  // const [runningInterval, setRunningInterval] = useState<NodeJS.Timeout>();
  // const [timer, setTimer] = useState<{ hours: number; min: number; sec: number; totalSec: number }>({ hours: 0, min: 0, sec: 0, totalSec: 0 });
  //   const [order, setOrder] = useState({ order: -1, pi: -1, index: -1 });
  //   const [orderMain, setOrderMain] = useState({ order: -1, index: -1 });
  const [departments, setDepartments] = useState<any[]>([]);
  // const [confirmation, setConfirm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>();

  const dispatch: any = useDispatch();
  //   const params = useParams();
  // const navigate = useNavigate();
  const [productProcess, setProcess] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getAllProductFinishedGoods()).then((res: any) => {
      console.log(res.payload.active);
      setData(res.payload.active);
    });
    dispatch(getType("department")).then((res: any) => {
      setDepartments(res.payload[0].departmentType);
    });
    dispatch(getAllUserManagement()).then((res: any) => {
      console.log(res.payload.active);
      setUsers(res.payload.active);
    });
  }, []);

  return (
    <div>
      <div className="min-h-[83vh] w-screen">
        <div className="w-full px-5 min-h-[90%] pt-2">
          <h1 className="text-xl roboto-bold">Production SOP</h1>
          <div className="bg-[#F1F3FF] shadow-md mt-2 w-full p-4 rounded-lg min-h-full">
            <div
              className="bg-white rounded-lg w-full p-3 min-h-[80%] shadow-md mt-0"
            >
              <h2 className="roboto-bold  text-[20px] text-start"> SOP Process</h2>
              <div className="shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md w-full items-center justify-between flex px-5 py-3">
                <div className="grid grid-cols-4 gap-5 items-center w-full ">
                  <div className="flex gap-3 items-center ">
                    <label className="text-[14px]">Batch Number</label>
                    <input type="text" required placeholder="Batch Number" onChange={(e) => setSelectedProduct({ ...selectedProduct, batchNumber: e.target.value })} value={selectedProduct?.batchNumber || ""} className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md w-[60%]" />
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        dispatch(getProductionSOPByBatchNumber(selectedProduct?.batchNumber)).then((res:any) => {
                          console.log(res.payload);
                          setProcess(res?.payload?.productProcess || []);
                          setSelectedProduct(res?.payload);
                        });
                      }}
                      className="gap-2 flex items-center px-3 py-1 rounded-md bg-[#5970F5] text-white"
                    >
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6667 12.6667L16 16M1 7.66667C1 9.43478 1.70238 11.1305 2.95262 12.3807C4.20286 13.631 5.89856 14.3333 7.66667 14.3333C9.43478 14.3333 11.1305 13.631 12.3807 12.3807C13.631 11.1305 14.3333 9.43478 14.3333 7.66667C14.3333 5.89856 13.631 4.20286 12.3807 2.95262C11.1305 1.70238 9.43478 1 7.66667 1C5.89856 1 4.20286 1.70238 2.95262 2.95262C1.70238 4.20286 1 5.89856 1 7.66667Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      Find
                    </button>
                  </div>
                  <div className="flex gap-3 items-center ">
                    <label className="text-[14px]">Product</label>
                    <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] min-h-[30px] rounded-md w-[60%]">{data.find((x) => x?._id === selectedProduct?.productId)?.productName}</label>
                    {/* <Select required placeholder="Product Name" value={selectedProduct?.productName || ""} className="w-[80%]">
                      {data?.map((x) => (
                        <li
                          onClick={() => {
                            setSelectedProduct(x);
                          }}
                          className="px-3 truncate bg-white hover:bg-slate-200 py-1 transition-all duration-100"
                        >
                          {x?.productName}
                        </li>
                      ))}
                    </Select> */}
                  </div>
                </div>
              </div>
              {productProcess[0] && (
                <>
                  <div className="shadow-[0px_0px_4px_rgba(0,0,0,0.385)] min-h-[50%] mt-5 rounded-md w-full items-center justify-between flex px-5 py-3">
                    <table className="w-full  border-collapse rounded border">
                      <thead className="bg-[#5970F5]">
                        <tr className=" text-white">
                          <th className=" border-r ">Description of Process</th>
                          <th className="border-r ">Sub Process</th>
                          <th className="border-r ">Raw Material</th>
                          <th className="border-r ">Raw Material UOM</th>
                          <th className="border-r ">Quantity</th>
                          <th className="border-r ">Production Floor</th>
                          <th className="border-r  text-[14px]">
                            Time Duration <span className="text-[12px]">(min)</span>{" "}
                          </th>
                          <th className="border-r">Department</th>
                          <th className="border-r">User</th>
                          <th className="border-r">Start</th>
                          <th className="border-r">End</th>
                          <th className="border-r">Remarks</th>
                        </tr>
                      </thead>
                      <tbody className="w-full">
                        {productProcess?.map((x) => (
                          <>
                            {x?.submodule?.map((y: any, i: any) => (
                              <tr className="border">
                                {i == 0 && (
                                  <td className="p-2 border" rowSpan={x.submodule.length}>
                                    {x?.moduleName}
                                  </td>
                                )}
                                <td className="p-2 border">{y.name}</td>
                                <td className="p-2 border">{y.rawMaterial}</td>
                                <td className="p-2 border">{y.uom}</td>
                                <td className="p-2 border">{y.quantity}</td>
                                <td className="p-2 border">{y.productionFloor}</td>
                                <td className="p-2 border">{y.timeDuration}</td>
                                <td className="p-2 border">{departments?.filter((z) => z?._id === y?.department)[0]?.value}</td>
                                <td className="p-2 border relative z-auto">{users?.filter((z) => z?._id === y?.user)[0]?.username}</td>
                                <td className="p-2 border">{new Date(y.start).toLocaleTimeString()}</td>
                                <td className="p-2 border">{new Date(y.end).toLocaleTimeString()}</td>
                                <td className="p-2 border">{y?.remarks}</td>
                              </tr>
                            ))}
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="w-full flex justify-center gap-4 mt-2 items-center">
                    <button type="submit" className="bg-[#5970F5] px-3 py-2 rounded-md text-white">
                      Print
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* {confirmation && <DeleteConfirmationBox RejectFunction={() => setConfirm("")} ResolveFunction={() => {}} message="Are You Sure?" />} */}
      </div>
    </div>
  );
}

export default ProductionSOPReport;
