/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import DeleteConfirmationBox from "../../../../components/DeleteConfirmationBox";
// import { useParams } from "react-router-dom";
import NavigationBar from "../../../components/NavigationBar";
import Select from "../../../components/Select";
import { getAllProductFinishedGoods, getAllUserManagement, getProductionSOP, getType, productionProcessDone } from "../../../utils/redux/actions";
import { ProductionSOPTypes } from "../../../utils/Type/types";
import { makeToast } from "../../../utils/redux/slice";
// import DeleteConfirmationBox from "../../../../components/DeleteConfirmationBox";

function ProductionSOP() {
  const [data, setData] = useState<any[]>([]);
  const todayDate = new Date().toLocaleDateString();
  const [users, setUsers] = useState<any[]>([]);
  const [runningInterval, setRunningInterval] = useState<NodeJS.Timeout>();
  const [timer, setTimer] = useState<{ hours: number; min: number; sec: number; totalSec: number }>({ hours: 0, min: 0, sec: 0, totalSec: 0 });
  //   const [order, setOrder] = useState({ order: -1, pi: -1, index: -1 });
  //   const [orderMain, setOrderMain] = useState({ order: -1, index: -1 });
  const [departments, setDepartments] = useState<any[]>([]);
  // const [confirmation, setConfirm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>();

  const dispatch: any = useDispatch();
  //   const params = useParams();
  const navigate = useNavigate();
  const [productProcess, setProcess] = useState<ProductionSOPTypes[]>([]);

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
      <NavigationBar />
      <div className="min-h-[83vh] w-screen">
        <div className="w-full px-5 min-h-[90%] pt-2">
          <h1 className="text-xl roboto-bold">Production SOP</h1>
          <div className="bg-[#F1F3FF] shadow-md mt-2 w-full p-4 rounded-lg min-h-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (productProcess[0]) {
                  const saveData = { productProcess, productId: selectedProduct._id, batchNumber: selectedProduct.batchNumber };
                  dispatch(productionProcessDone(saveData)).then((res:any) => {
                    if(res.status===200){

                      console.log("saved");
                      setSelectedProduct({});
                      setProcess([]);
                      if (runningInterval) clearInterval(runningInterval);
                    }else{
                      dispatch(makeToast({text:"Batch Number Already Used",heading:"Error"}))
                    }
                  });
                console.log(saveData);
                }
              }}
              className="bg-white rounded-lg w-full p-3 min-h-[80%] shadow-md mt-0"
            >
              <h2 className="roboto-bold  text-[20px] text-start"> SOP Process</h2>
              <div className="shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md w-full items-center justify-between flex px-5 py-3">
                <div className="grid grid-cols-4 gap-5 items-center w-full ">
                  <div className="flex gap-3 items-center ">
                    <label className="text-[14px]">Product</label>
                    <Select required placeholder="Product Name" value={selectedProduct?.productName || ""} className="w-[80%]">
                      {data?.map((x) => (
                        <li
                          onClick={() => {
                            setSelectedProduct(x);
                            dispatch(getProductionSOP(x._id as string)).then((res: any) => {
                              clearInterval(runningInterval);
                              setProcess(res.payload.productProcess || []);
                            });
                          }}
                          className="px-3 truncate bg-white hover:bg-slate-200 py-1 transition-all duration-100"
                        >
                          {x?.productName}
                        </li>
                      ))}
                    </Select>
                  </div>
                  <div className="flex gap-3 items-center ">
                    <label className="text-[14px]">Batch Number</label>
                    <input type="text" required placeholder="Batch Number" onChange={(e) => setSelectedProduct({ ...selectedProduct, batchNumber: e.target.value })} value={selectedProduct?.batchNumber || ""} className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md w-[60%]" />
                  </div>
                  <div className="flex gap-3 items-center">
                    <label className="text-[14px] ">Production Date</label>
                    <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[30px] rounded-md w-[60%]">{selectedProduct?.productName ? todayDate : ""}</label>
                  </div>
                  <div className="flex gap-3 items-center">
                    <label className="text-[14px] ">Timer</label>
                    <label className={"px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)]  text-white rounded-md " + (timer.totalSec < 0 ? "bg-[#FF0000]" : "bg-[#00600A]")}>{(timer.totalSec < 0 ? "-" : "") + `${timer.hours < 10 ? `0${Math.abs(timer.hours)}` : Math.abs(timer.hours)}:${Math.abs(timer.min) < 10 ? `0${Math.abs(timer.min)}` : Math.abs(timer.min)}:${Math.abs(timer.sec) < 10 ? `0${Math.abs(timer.sec)}` : Math.abs(timer.sec)} `}</label>
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
                        {productProcess?.map((x, pi) => (
                          <>
                            {x?.submodule?.map((y, i) => (
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
                                <td className="p-2 border relative z-auto">
                                  <Select required style={{ zIndex: 999 - (i + (pi === 0 ? pi - 1 : pi)) }} value={users?.filter((z) => z?._id === y?.user)[0]?.username} className="w-[100%]">
                                    {users?.map((x) => (
                                      <li
                                        onClick={() => {
                                          const temp = y;
                                          temp.user = x?._id;
                                          const procc = [...productProcess];
                                          procc[pi].submodule[i] = temp;
                                          setProcess([...procc]);
                                        }}
                                        className="px-3 truncate bg-white hover:bg-slate-200 py-1 transition-all duration-100"
                                      >
                                        {x?.username}
                                      </li>
                                    ))}
                                  </Select>
                                </td>
                                <td className="p-2 border">
                                  {y.start ? (
                                    y.start.toLocaleTimeString()
                                  ) : (
                                    <button
                                      onClick={() => {
                                        const temp = y;
                                        temp.start = new Date();
                                        const procc = [...productProcess];
                                        procc[pi].submodule[i] = temp;
                                        const duration = (y.timeDuration || 0) * 60;
                                        const hours = Math.floor(duration / 3600);
                                        console.log(duration / 3600);
                                        const min = Math.floor((duration - hours * 3600) / 60);
                                        const sec = duration - (hours * 3600 + min * 60);
                                        const counter = { hours, min, sec, totalSec: duration };
                                        console.log(hours, min, sec, duration, counter);
                                        const interval = setInterval(() => {
                                          if (counter.totalSec > 0) {
                                            if (counter.min <= 0 && counter.hours > 0) {
                                              counter.hours--;
                                              counter.min = 59;
                                            }
                                            if (counter.sec <= 0 && counter.min > 0) {
                                              counter.min--;
                                              counter.sec = 59;
                                            }
                                            counter.sec--;
                                            counter.totalSec--;
                                          } else {
                                            counter.sec--;
                                            counter.totalSec--;
                                            if (counter.sec <= -60) {
                                              counter.min--;
                                              counter.sec = 0;
                                            }
                                            if (counter.min <= -60) {
                                              counter.hours--;
                                              counter.min = 0;
                                            }
                                          }

                                          setTimer({ ...counter });
                                        }, 1000);
                                        setRunningInterval(interval);
                                        setProcess([...procc]);
                                      }}
                                      type="button"
                                      className={"bg-[#5970F5] px-2 py-1 text-[12px] rounded-md text-white " + ((!y?.start && i + pi === 0) || (i > 0 && !y?.start && x.submodule[i - 1]?.end) || (pi > 0 && !y?.start && i === 0 && productProcess[pi - 1].submodule[productProcess[pi - 1]?.submodule.length - 1]?.end) ? "opacity-100" : "opacity-75")}
                                    >
                                      Start
                                    </button>
                                  )}
                                </td>
                                <td className="p-2 border">
                                  {y.end ? (
                                    y.end.toLocaleTimeString()
                                  ) : (
                                    <button
                                      onClick={() => {
                                        const temp = y;
                                        temp.end = new Date();
                                        temp.workedTime = timer.totalSec / 60;
                                        const procc = [...productProcess];
                                        procc[pi].submodule[i] = temp;
                                        setProcess([...procc]);
                                        clearInterval(runningInterval);
                                        setTimer({ hours: 0, min: 0, sec: 0, totalSec: 0 });
                                      }}
                                      type="button"
                                      className={"bg-[#5970F5] px-2 py-1 text-[12px] rounded-md text-white " + ((!y?.start || y?.end) && "opacity-70")}
                                    >
                                      End
                                    </button>
                                  )}
                                </td>
                                <td className="p-2 border">
                                  <input
                                    type="text"
                                    onChange={(e) => {
                                      const temp = y;
                                      temp.remarks = e.target.value;
                                      const procc = [...productProcess];
                                      procc[pi].submodule[i] = temp;
                                      setProcess([...procc]);
                                    }}
                                    placeholder="Remarks"
                                    className=" px-2 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md"
                                  />
                                </td>
                              </tr>
                            ))}
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="w-full flex justify-center gap-4 mt-2 items-center">
                    <button type="button" className="border-[#5970F5] border px-3 py-2 rounded-md text-[#5970F5]" onClick={() => navigate(-1)}>
                      Back
                    </button>
                    <button
                      type="button"
                      className="border-[#5970F5] border px-3 py-2 rounded-md text-[#5970F5]"
                      onClick={() => {
                        setSelectedProduct({});
                        setProcess([]);
                      }}
                    >
                      Reset
                    </button>
                    <button type="submit" className="bg-[#5970F5] px-3 py-2 rounded-md text-white">
                      Save
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
        {/* {confirmation && <DeleteConfirmationBox RejectFunction={() => setConfirm("")} ResolveFunction={() => {}} message="Are You Sure?" />} */}
      </div>
    </div>
  );
}

export default ProductionSOP;
