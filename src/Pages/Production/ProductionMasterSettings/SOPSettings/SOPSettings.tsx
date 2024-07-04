/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { createOrUpdateProductionSOP, getAllProductFinishedGoods, getProductionSOP, getRMReports, getType } from "../../../../utils/redux/actions";
// import DeleteConfirmationBox from "../../../../components/DeleteConfirmationBox";
import { useParams } from "react-router-dom";
import Select from "../../../../components/Select";
import { ProductProcess } from "../../../../utils/Type/types";
import { useQuery } from "../../../../utils/hooks/hooks";
// import DeleteConfirmationBox from "../../../../components/DeleteConfirmationBox";

function SOPSettings() {
  const [data, setData] = useState<any[]>([]);
  const [order, setOrder] = useState({ order: -1, pi: -1, index: -1 });
  const [orderMain, setOrderMain] = useState({ order: -1, index: -1 });
  const [departments, setDepartments] = useState<any[]>([]);
  const [rawMaterial,setRawMaterial] = useState<any[]>([])
  // const [confirmation, setConfirm] = useState("");
  const dispatch: any = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [productProcess, setProcess] = useState<ProductProcess[]>([]);
  const location = useQuery()
  useEffect(() => {
    dispatch(getAllProductFinishedGoods()).then((res: any) => {
      setData(res.payload.active);
    });
    dispatch(getType("department")).then((res: any) => {
      setDepartments(res.payload[0].departmentType);
    });
    dispatch(getProductionSOP(params.id as string)).then((res:any)=>{
      setProcess(res.payload.productProcess ||[{moduleName:"",order:0,submodule:[{department:"",name:"",order:0,productionFloor:"",rawMaterial:"",uom:""}]}] )
    })

    dispatch(getRMReports()).then((res: any) => {
     setRawMaterial(res.payload)
     console.log(res.payload)
    })
  }, []);

  const elem = useRef<HTMLElement | null>(null);

  const onMouseDown = (e: React.MouseEvent<HTMLButtonElement>, order: number, index: number, pi: number) => {
    const parent = e.currentTarget.parentElement;
    if (parent) {
      parent.style.transform = "scale(1.01)";
      elem.current = parent;
      setOrder({ order, index, pi });
    }
  };

  const onMouseDownMain = (e: React.MouseEvent<HTMLButtonElement>, index: number, order: number) => {
    const parent = e.currentTarget.parentElement?.parentElement?.parentElement;
    if (parent) {
      parent.style.transform = "scale(1.01)";
      elem.current = parent;
      setOrderMain({ order, index });
    }
  };
  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>, orderTemp: number, index: number, pi: number) => {
    const parent = e.currentTarget;
    if (parent) {
      if (order.order > -1 && pi == order.pi) {
        const temp = [...productProcess];
        temp[pi].submodule[index].order = order.order;
        temp[order?.pi].submodule[order?.index].order = orderTemp;
        setProcess([...temp]);
        setOrder({ ...order, order: orderTemp });
      }
    }
  };
  const onMouseEnterMain = (e: React.MouseEvent<HTMLDivElement>, index: number, order: number) => {
    const parent = e.currentTarget;
    if (parent) {
      if (orderMain.order > -1) {
        const temp = [...productProcess];
        temp[index].order = orderMain.order;
        temp[orderMain.index].order = order;
        setProcess([...temp]);
        setOrderMain({ ...orderMain, order });
      }
    }
  };

  const onMouseUp = () => {
    if (elem.current) {
      elem.current.style.transform = "scale(1)";
      elem.current.style.transform = "translateX(0)";
      elem.current = null;
      setOrder({ order: -1, pi: -1, index: -1 });
      setOrderMain({ order: -1, index: -1 });
    }
  };
  const onMouseUpMain = () => {
    if (elem.current) {
      elem.current.style.transform = "scale(1)";
      elem.current.style.transform = "translateX(0)";
      elem.current = null;
      setOrderMain({ order: -1, index: -1 });
      setOrder({ order: -1, pi: -1, index: -1 });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const temp = [...productProcess];
    temp[index].moduleName = e.target.value;
    setProcess([...temp]);
  };

  const handleChangeSub = (e: ChangeEvent<HTMLInputElement> | { target: { value: string; name: string } }, pi: number, index: number) => {
    const temp = [...productProcess];
    const keyVal: "name" | "uom" | "timeDuration" | "rawMaterial" | "quantity" | "productionFloor" | "department" = e.target.name as "name" | "uom" | "timeDuration" | "rawMaterial" | "quantity" | "productionFloor" | "department";
    if (keyVal === "quantity" || keyVal === "timeDuration") {
      temp[pi].submodule[index][keyVal] =e.target.value ?  parseInt(e.target.value) : undefined;
    } else {
      temp[pi].submodule[index][keyVal] = e.target.value;
    }
    setProcess([...temp]);
  };
  const handleDelete = (pi: number, i: number) => {
    let procc = [...productProcess];
    const submodule = procc[pi].submodule;
    if (submodule.length > 1) {
      submodule.splice(i, 1);
      const sortedModule = submodule.sort((a, b) => a.order - b.order);
      procc[pi].submodule = sortedModule.map((x, i) => ({ ...x, order: i }));
    } else {
      procc.splice(pi, 1);
      procc = procc.sort((a, b) => a.order - b.order).map((x, i) => ({ ...x, order: i }));
    }
    setProcess([...procc]);
  };

  const handleAdd = (pi: number, order: number) => {
    const procc = [...productProcess];
    const submodule = procc[pi].submodule;
    const sortedModule = submodule.sort((a, b) => a.order - b.order);
    sortedModule.splice(order + 1, 0, { department: "", name: "", order: 0, productionFloor: "", quantity: 0, rawMaterial: "", timeDuration: 0, uom: "" });
    procc[pi].submodule = sortedModule.map((x, i) => ({ ...x, order: i }));
    setProcess([...procc]);
  };

  return (
    <div className="min-h-[83vh] w-screen" onMouseUp={onMouseUp}>
      <div className="w-full px-5 min-h-[90%] pt-2">
        <h1 className="text-xl roboto-bold">Production SOP</h1>
        <div className="bg-[#F1F3FF] shadow-md mt-2 w-full p-4 rounded-lg min-h-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (params.id) {
                dispatch(createOrUpdateProductionSOP({ productId: params.id, productProcess })).then(() => {
                  navigate(-1);
                });
              }
            }}
            className="bg-white rounded-lg w-full p-3 min-h-[80%] shadow-md mt-0"
          >
            <h2 className="roboto-bold  text-[20px] text-start">Production SOP Settings</h2>
            <div className="shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md w-full items-center justify-between flex px-5 py-3">
              <div className="flex gap-5 items-center w-1/2 ">
                <div className="flex gap-3 items-center w-2/3">
                  <label>Product</label>
                  <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md w-[80%]">{data.filter((x) => x?._id === params.id)[0]?.productName}</label>
                </div>
              </div>
            </div>
            <div className="shadow-[0px_0px_4px_rgba(0,0,0,0.385)] min-h-[50%] mt-5 rounded-md w-full items-center justify-between flex px-5 py-3">
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
                  {productProcess?.map((x, pi) => (
                    <tr  className="flex w-full transition-all duration-150" style={{ order: x.order,zIndex:999-pi }}>
                      <td className="border relative w-[18%] flex justify-center items-center" onMouseUp={onMouseUpMain} onMouseEnter={(e) => onMouseEnterMain(e, pi, x.order)}>
                        <div className="flex w-full justify-between px-2 py-5 items-center ">
                          <button
                          type="button"
                            className="w-[10%]"
                            onMouseDown={(e) => onMouseDownMain(e, pi, x.order)}
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12 17.5C12.8284 17.5 13.5 18.1716 13.5 19C13.5 19.8284 12.8284 20.5 12 20.5C11.1716 20.5 10.5 19.8284 10.5 19C10.5 18.1716 11.1716 17.5 12 17.5ZM19 17.5C19.8284 17.5 20.5 18.1716 20.5 19C20.5 19.8284 19.8284 20.5 19 20.5C18.1716 20.5 17.5 19.8284 17.5 19C17.5 18.1716 18.1716 17.5 19 17.5ZM5 17.5C5.82843 17.5 6.5 18.1716 6.5 19C6.5 19.8284 5.82843 20.5 5 20.5C4.17157 20.5 3.5 19.8284 3.5 19C3.5 18.1716 4.17157 17.5 5 17.5ZM12 10.5C12.8284 10.5 13.5 11.1716 13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5ZM19 10.5C19.8284 10.5 20.5 11.1716 20.5 12C20.5 12.8284 19.8284 13.5 19 13.5C18.1716 13.5 17.5 12.8284 17.5 12C17.5 11.1716 18.1716 10.5 19 10.5ZM5 10.5C5.82843 10.5 6.5 11.1716 6.5 12C6.5 12.8284 5.82843 13.5 5 13.5C4.17157 13.5 3.5 12.8284 3.5 12C3.5 11.1716 4.17157 10.5 5 10.5ZM12 3.5C12.8284 3.5 13.5 4.17157 13.5 5C13.5 5.82843 12.8284 6.5 12 6.5C11.1716 6.5 10.5 5.82843 10.5 5C10.5 4.17157 11.1716 3.5 12 3.5ZM19 3.5C19.8284 3.5 20.5 4.17157 20.5 5C20.5 5.82843 19.8284 6.5 19 6.5C18.1716 6.5 17.5 5.82843 17.5 5C17.5 4.17157 18.1716 3.5 19 3.5ZM5 3.5C5.82843 3.5 6.5 4.17157 6.5 5C6.5 5.82843 5.82843 6.5 5 6.5C4.17157 6.5 3.5 5.82843 3.5 5C3.5 4.17157 4.17157 3.5 5 3.5Z"
                                fill="#212121"
                              />
                            </svg>
                          </button>
                          <input value={x.moduleName} placeholder="Description of the process" onChange={(e) => handleChange(e, pi)} required className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] min-h-[25px] w-[80%] rounded-md" type="text" />
                        </div>
                      </td>
                      <td colSpan={7} className="border  py-3 w-[82%]">
                        <div  className=" flex flex-col  w-full">
                          {x.submodule.map((y, i) => (
                            <div onMouseUp={onMouseUp} onClick={onMouseUp} onMouseEnter={(e) => onMouseEnter(e, y.order, i, pi)} className="flex pt-2 transition-all duration-100" style={{ order: y.order }}>
                              <button type="button" className="w-[3%]" onMouseDown={(e) => onMouseDown(e, y.order, i, pi)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M12 17.5C12.8284 17.5 13.5 18.1716 13.5 19C13.5 19.8284 12.8284 20.5 12 20.5C11.1716 20.5 10.5 19.8284 10.5 19C10.5 18.1716 11.1716 17.5 12 17.5ZM19 17.5C19.8284 17.5 20.5 18.1716 20.5 19C20.5 19.8284 19.8284 20.5 19 20.5C18.1716 20.5 17.5 19.8284 17.5 19C17.5 18.1716 18.1716 17.5 19 17.5ZM5 17.5C5.82843 17.5 6.5 18.1716 6.5 19C6.5 19.8284 5.82843 20.5 5 20.5C4.17157 20.5 3.5 19.8284 3.5 19C3.5 18.1716 4.17157 17.5 5 17.5ZM12 10.5C12.8284 10.5 13.5 11.1716 13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5ZM19 10.5C19.8284 10.5 20.5 11.1716 20.5 12C20.5 12.8284 19.8284 13.5 19 13.5C18.1716 13.5 17.5 12.8284 17.5 12C17.5 11.1716 18.1716 10.5 19 10.5ZM5 10.5C5.82843 10.5 6.5 11.1716 6.5 12C6.5 12.8284 5.82843 13.5 5 13.5C4.17157 13.5 3.5 12.8284 3.5 12C3.5 11.1716 4.17157 10.5 5 10.5ZM12 3.5C12.8284 3.5 13.5 4.17157 13.5 5C13.5 5.82843 12.8284 6.5 12 6.5C11.1716 6.5 10.5 5.82843 10.5 5C10.5 4.17157 11.1716 3.5 12 3.5ZM19 3.5C19.8284 3.5 20.5 4.17157 20.5 5C20.5 5.82843 19.8284 6.5 19 6.5C18.1716 6.5 17.5 5.82843 17.5 5C17.5 4.17157 18.1716 3.5 19 3.5ZM5 3.5C5.82843 3.5 6.5 4.17157 6.5 5C6.5 5.82843 5.82843 6.5 5 6.5C4.17157 6.5 3.5 5.82843 3.5 5C3.5 4.17157 4.17157 3.5 5 3.5Z"
                                    fill="#212121"
                                  />
                                </svg>
                              </button>
                              <label className=" w-[19%]  rounded-md px-2">
                                <input placeholder="Description of Sub Process" value={y.name} onChange={(e) => handleChangeSub(e, pi, i)} name="name" required className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] min-h-[25px] w-[100%] rounded-md" type="text" />
                              </label>

                              <label className=" w-[12.5%] px-2  ">
                                <select value={y.rawMaterial} name="rawMaterial" onChange={(e)=>handleChangeSub(e, pi, i)}  className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] min-h-[25px] w-[100%] rounded-md">
                                 <option value="">Select</option>
                                  {rawMaterial?.map((x)=>(
                                    <option>{x?.product?.productName || "No Name"}</option>
                                  ))}
                                </select>
                                {/* <input placeholder="Raw Material" required value={y.rawMaterial} onChange={(e) => handleChangeSub(e, pi, i)} name="rawMaterial" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] min-h-[25px] w-[100%] rounded-md" type="text" /> */}
                              </label>
                              <label className=" w-[12.5%] px-2  ">
                                <input placeholder="Unit of Measurement" required value={y.uom} onChange={(e) => handleChangeSub(e, pi, i)} name="uom" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] min-h-[25px] w-[100%] rounded-md" type="text" />
                              </label>
                              <label className=" w-[12.5%] px-2  ">
                                <input required placeholder="quantity" value={y.quantity} onChange={(e) => handleChangeSub(e, pi, i)} name="quantity" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] min-h-[25px] w-[100%] rounded-md" type="number" />
                              </label>
                              <label className=" w-[12.5%] px-2  ">
                                <input required placeholder="Production Floor" value={y.productionFloor} onChange={(e) => handleChangeSub(e, pi, i)} name="productionFloor" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] min-h-[25px] w-[100%] rounded-md" type="text" />
                              </label>
                              <label className=" w-[12.5%] px-2  ">
                                <input required placeholder="Time Duration" value={y.timeDuration} onChange={(e) => handleChangeSub(e, pi, i)} name="timeDuration" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] min-h-[25px] w-[80%] rounded-md" type="number" />
                              </label>
                              <label className=" w-[16.5%] px-2  flex items-center gap-2" style={{zIndex:999-i}}>
                                <Select placeholder="Department" value={departments?.filter((z) => z?._id === y?.department)[0]?.value} className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] min-h-[25px] w-[90%] rounded-md">
                                  {departments.map((x) => (
                                    <li className="ps-2 truncate bg-white hover:bg-slate-300" onClick={() => handleChangeSub({ target: { value: x?._id, name: "department" } }, pi, i)}>
                                      {x?.value}
                                    </li>
                                  ))}
                                </Select>
                                <button type="button" onClick={() => handleDelete(pi, i)} className="bg-red-500 h-4 w-4 rounded-full text-white flex justify-center items-center">
                                  -
                                </button>
                                <button type="button" onClick={() => handleAdd(pi, y.order)} className="bg-[#5970F5] h-4 w-4 text-[12px] rounded-full text-white flex justify-center items-center">
                                  +
                                </button>
                              </label>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full flex justify-end mt-2 items-end">
              <button type="button" className="bg-[#5970F5] px-3 py-2 rounded-md text-white" onClick={() => setProcess([...productProcess, { moduleName: "", submodule: [{ department: "", name: "", order: 0, productionFloor: "", quantity: 0, rawMaterial: "", timeDuration: 0, uom: "" }], order: productProcess.length }])}>
                + Add More
              </button>
            </div>
            <div className="w-full flex justify-center gap-4 mt-2 items-center">
              <button type="button" className="border-[#5970F5] border px-3 py-2 rounded-md text-[#5970F5]" onClick={() => navigate(-1)}>
                Back
              </button>
              <button type="submit" className="bg-[#5970F5] px-3 py-2 rounded-md text-white">{location.get("type")}</button>
            </div>
          </form>
        </div>
      </div>
      {/* {confirmation && <DeleteConfirmationBox RejectFunction={() => setConfirm("")} ResolveFunction={() => {}} message="Are You Sure?" />} */}
    </div>
  );
}

export default SOPSettings;
