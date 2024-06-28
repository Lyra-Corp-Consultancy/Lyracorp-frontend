/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProductFinishedGoods, getProductionSOP, getType } from "../../../utils/redux/actions";
import Select from "../../../components/Select";
import { ProductProcess } from "../../../utils/Type/types";

function ProductionMaster() {
  const [data, setData] = useState<any[]>([]);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<any[]>([]);
  const permissions = useSelector((state: any) => state.data?.user?.permissions);
  const [selectedProduct, setSelectedProduct] = useState<any>();
  const [productProcess, setProcess] = useState<ProductProcess[]>([]);

  useEffect(() => {
    dispatch(getAllProductFinishedGoods()).then((res: any) => {
      setData(res.payload.active);
      console.log(res.payload.active);
    });
    dispatch(getType("department")).then((res: any) => {
      setDepartments(res.payload[0].departmentType);
    });
  }, []);
  return (
    <div className="min-h-[83vh] w-screen">
      <div className="w-full px-5 min-h-[90%] pt-2">
        <h1 className="text-xl roboto-bold">Production SOP</h1>
        <div className="bg-[#F1F3FF] shadow-md mt-2 w-full p-4 rounded-lg h-full">
          <div className="bg-white rounded-lg w-full p-3 h-[80%] shadow-md mt-0">
            <h2 className="roboto-bold  text-[20px] text-start">SOP List</h2>
            <div className="shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md w-full items-center justify-between flex px-5 py-3">
              <div className="flex gap-5 items-center w-1/2 ">
                <div className="flex gap-3 items-center w-2/3">
                  <label>Product</label>
                  <Select className="w-[80%]" value={selectedProduct?.productName || ""}>
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
                  </Select>
                </div>
                <button
                  className="text-white bg-[#5970F5] px-4 py-2 rounded-md"
                  onClick={() => {
                    dispatch(getProductionSOP(selectedProduct?._id as string)).then((res: any) => {
                      console.log(res.payload,selectedProduct)
                      setProcess(res.payload.productProcess || []);
                    });
                  }}
                >
                  View
                </button>
              </div>

              {permissions?.delete?.includes("production management master") && (
                <button className="text-white bg-[#5970F5] px-4 py-2 rounded-md" onClick={() => navigate("/production/master-settings/new/" + selectedProduct._id+"?type=Save")}>
                  Create SOP
                </button>
              )}
            </div>
            {productProcess[0] && <div className="shadow-[0px_0px_4px_rgba(0,0,0,0.385)] min-h-[50%] mt-5 rounded-md w-full items-center justify-between flex flex-col px-5 py-3">
              <table className="w-full flex flex-col text-[14px] border-collapse rounded border">
                <thead className="bg-[#5970F5]">
                  <tr className=" text-white flex">
                    <th className=" border-r w-[18%]">Description of Process</th>
                    <th className="border-r w-[18%]">Sub Process</th>
                    <th className="border-r w-[10%]">Raw Material</th>
                    <th className="border-r w-[10%]">Raw Material UOM</th>
                    <th className="border-r w-[10%]">Quantity</th>
                    <th className="border-r w-[10%]">Production Floor</th>
                    <th className="border-r w-[10%] text-[14px]">
                      Time Duration <span className="text-[12px]">(min)</span>{" "}
                    </th>
                    <th className="border-r w-[14%]">Department</th>
                  </tr>
                </thead>
                <tbody className="flex flex-col w-full ">
                  {productProcess?.map((x) => (
                    <tr className="flex w-full transition-all duration-150" style={{ order: x.order }}>
                      <td className="border relative w-[18%] flex justify-center items-center">
                        <div className="flex w-full justify-between px-2 py-5 items-center ">
                          <div className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[100%] rounded-md">{x.moduleName}</div>
                        </div>
                      </td>
                      <td colSpan={7} className="border  py-3 w-[82%]">
                        <div className=" flex flex-col  w-full">
                          {x?.submodule?.map((y) => (
                            <div className="flex pt-2 transition-all duration-100" style={{ order: y.order }}>
                              <div className=" w-[22%]  rounded-md px-2">
                                <div className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[100%] rounded-md">{y.name}</div>
                              </div>

                              <div className=" w-[12.5%] px-2  ">
                                <div className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[100%] rounded-md">{y.rawMaterial}</div>
                              </div>
                              <div className=" w-[12.5%] px-2  ">
                                <div className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[100%] rounded-md">{y.uom}</div>
                              </div>
                              <div className=" w-[12.5%] px-2  ">
                                <div className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[100%] rounded-md">{y.quantity}</div>
                              </div>
                              <div className=" w-[12.5%] px-2  ">
                                <div className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[100%] rounded-md">{y.productionFloor}</div>
                              </div>
                              <div className=" w-[12.5%] px-2  ">
                                <div className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[100%] rounded-md">{y.timeDuration}</div>
                              </div>
                              <div className=" w-[16.5%] px-2  flex items-center gap-2">
                                <div className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[100%] rounded-md">{departments?.filter((z) => z?._id === y?.department)[0]?.value}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="text-white mt-3 bg-[#5970F5] px-4 py-2 rounded-md" onClick={() => navigate("/production/master-settings/new/" + selectedProduct._id+"?type=Update")}>
                  Edit SOP
                </button>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductionMaster;
