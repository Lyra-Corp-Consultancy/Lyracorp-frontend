/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import NavigationBar from "../../../components/NavigationBar";
import Select from "../../../components/Select";
import { useDispatch } from "react-redux";
import { getAllProductFinishedGoods, getAllProductRawMaterial, getFinishedGoodsBatchNumberByProductId, getGrnNumberByProduct, getType, postRawMaterialUtilization } from "../../../utils/redux/actions";
import { useNavigate } from "react-router-dom";
import { RawMaterialUtilizationTypes } from "../../../utils/Type/types";

function RawMaterialUtilization() {
  const [products, setProducts] = useState<any[]>([]);
  const [batchNumbers, setBatchNumbers] = useState<any[]>([]);
  const [rawMaterial, setRawMaterial] = useState<any[]>([]);
  const [uom, setuom] = useState<any[]>([]);
  const [grnNum, setGrnNum] = useState<any[]>([]);
  const [data, setData] = useState<RawMaterialUtilizationTypes>({ product: "", batchNumber: "",used:[] });
  const dispatch: any = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getAllProductFinishedGoods()).then((res: any) => {
      console.log(res.payload);
      setProducts(res.payload?.active);
    });
    dispatch(getAllProductRawMaterial()).then((res: any) => {
      setRawMaterial(res.payload?.active);
    });
    dispatch(getType("uom")).then((res: any) => {
      setuom(res.payload?.[0]?.uomType);
    });
  }, []);
  return (
    <div>
      <NavigationBar />
      <div className="min-h-[83vh] w-screen">
        <div className="w-full px-5 min-h-[90%] pt-2">
          <h1 className="text-xl roboto-bold">Raw Material Utilization</h1>
          <div className="bg-[#F1F3FF] shadow-md mt-2 w-full p-4 rounded-lg min-h-full">
            <form onSubmit={(e)=>{
                e.preventDefault()
                dispatch(postRawMaterialUtilization(data)).then(()=>{
                  setData({batchNumber:"",product:"",used:[]});
                })
            }} className="bg-white w-full rounded-md p-5">
              <h1>Raw Material Utilization Process</h1>
              <div className="flex mt-5 gap-5">
                <label className="flex gap-3">
                  Product{" "}
                  <Select value={products.find((a) => a?._id === data?.product)?.productName || ""}>
                    {products.map((x) => (
                      <li
                        onClick={() => {
                          dispatch(getFinishedGoodsBatchNumberByProductId(x?._id)).then((res: any) => {
                            console.log(res.payload);
                            setBatchNumbers(res.payload);
                          });
                          dispatch(getGrnNumberByProduct(x?.mappings?.map((x: any) => x?.product))).then((res: any) => {
                            setGrnNum(res.payload);
                          });
                          setData({ ...data, used: x?.mappings?.map((x:any)=>({...x,usedQuantity:parseInt(x.quantity)})), product: x?._id });
                        }}
                        className="px-3 truncate bg-white hover:bg-slate-200 py-1 transition-all duration-100"
                      >
                        {x.productName}
                      </li>
                    ))}
                  </Select>
                </label>
                <label className="flex gap-3">
                  Batch Number{" "}
                  <Select className="z-[997]" value={data?.batchNumber || " "}>
                    {batchNumbers.map((x) => (
                      <li
                        onClick={() => {
                          setData({ ...data, batchNumber: x?.batchNumbers });
                        }}
                        className="px-3 truncate bg-white hover:bg-slate-200 py-1 transition-all duration-100"
                      >
                        {x.batchNumbers}
                      </li>
                    ))}
                  </Select>
                </label>
              </div>
              <table className="w-full mt-5">
                <thead>
                  <tr className="text-white bg-[#5970F5]">
                    <th className="border">Raw Material</th>
                    <th className="border">GRN Number</th>
                    <th className="border">Raw Material UOM</th>
                    <th className="border">Quantity</th>
                    <th className="border">Total Quantity used</th>
                    <th className="border">Additional Consumption</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.used?.map((x: any, i: any) => (
                    <tr>
                      <td className="border p-1 text-center">{rawMaterial.find((a) => a?._id === x?.product)?.productName}</td>
                      <td className="border p-1 text-center">
                        <div className="flex justify-center item-center">
                          <Select value={x?.grnNumber} style={{ zIndex: 996 - i }}>
                            {grnNum?.[i]?.map((x: any) => (
                              <li
                                onClick={() => {
                                  const  temp = [...data.used]
                                  temp[i].grnNumber = x?.seq
                                   setData({...data, used: temp });
                                //   setData({ ...data, batchNumber: x?.batchNumbers });
                                }}
                                className="px-3 truncate bg-white hover:bg-slate-200 py-1 transition-all duration-100"
                              >
                                {x.seq}
                              </li>
                            ))}
                          </Select>
                        </div>
                      </td>
                      <td className="border p-1 text-center">{uom.find((b) => b?._id === rawMaterial.find((a) => a?._id === x?.product)?.uomType).value.name}</td>
                      <td className="border p-1 text-center">{x.quantity}</td>
                      <td className="border p-1 text-center">
                        <input type="number" value={x?.usedQuantity} onChange={(e)=>{
                            const temp = [...data.used]
                            temp[i].usedQuantity = parseInt(e.target.value) 
                            setData({...data,used:temp})
                        }} className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
                      </td>
                      <td className="border p-1 text-center">{x.quantity-(x?.usedQuantity || 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="w-full mt-5 pb-5 flex justify-center gap-4 items-center">
                    <button type="button" className="border-[#5970F5] border px-3 py-2 rounded-md text-[#5970F5]" onClick={() => navigate(-1)}>
                      Back
                    </button>
                    <button
                      type="button"
                      className="border-[#5970F5] border px-3 py-2 rounded-md text-[#5970F5]"
                      onClick={() => {
                        setData({batchNumber:"",product:"",used:[]});
                      }}
                    >
                      Reset
                    </button>
                    <button type="submit" className="bg-[#5970F5] px-3 py-2 rounded-md text-white">
                      Save
                    </button>
                  </div>
            </form>
          </div>
        </div>
        {/* {confirmation && <DeleteConfirmationBox RejectFunction={() => setConfirm("")} ResolveFunction={() => {}} message="Are You Sure?" />} */}
      </div>
    </div>
  );
}

export default RawMaterialUtilization;
