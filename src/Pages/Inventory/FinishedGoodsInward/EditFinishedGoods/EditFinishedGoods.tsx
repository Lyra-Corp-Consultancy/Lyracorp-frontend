/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Select from "../../../../components/Select";
import { useDispatch, useSelector } from "react-redux";
import { getFinishedGoodsBatchNumberByProductId, getFinishedGoodsInwardIndividual, getProductsFinishedGoods, getType, updateFinishedGoodsInwardIndividual } from "../../../../utils/redux/actions";
import { startLoading } from "../../../../utils/redux/slice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { fileServer } from "../../../../utils/values/publicValues";

function EditFinishedGoods() {
  const dispatch: any = useDispatch();
  const [products, setProducts] = useState<{ productName: string; _id: string }[]>([]);
  const [batchs, setBatchs] = useState<{ batchNumbers: string; quantity: number }[][]>([]);
  const [data, setData] = useState<{ product?: string; batchNumber?: string; productionQuantity?: number; uom?: string; rejected?: number; warehouse?: any; pick?: any; doc?: string; link?: any }[]>([{}]);

  const superAdminCompany = useSelector((state: any) => state?.data?.superAdminCompany);
  const user = useSelector((state: any) => state?.data?.user);
  const params: any = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFinishedGoodsInwardIndividual(params.id)).then((res: any) => {
      setData([res.payload]);
    });
  }, []);
  const handleSave = async () => {
    dispatch(startLoading());
    const temp = [...data];
    for (let i = 0; i < temp.length; i++) {
        if(!temp[i].link.includes("https://fileserver.lyracorp.in")){
            const x = temp[i].link;
            const file = new FormData();
            file.append("file", x);
            const res = await axios.post(fileServer, file);
            temp[i].link = res.data;
        }
    }
    console.log(temp);
    dispatch(updateFinishedGoodsInwardIndividual({data:temp[0],inwardId:params.id})).then(() => {
      navigate(-1);
    });
  };
  const [dropDowns, setDropDowns] = useState<{ uom: any[] }>({ uom: [] });
  useEffect(() => {
    dispatch(getProductsFinishedGoods()).then((res: any) => {
      setProducts(res.payload);
    });
    dispatch(getType("uom")).then((res: any) => {
      setDropDowns({ ...dropDowns, uom: res.payload?.[0]?.uomType });
    });
  }, []);
  return (
    <div className="px-4 py-4">
      <h1 className="font-semibold text-[18px]">Finished Goods Inward</h1>
      <div className="bg-[#F1F3FF] min-h-[80vh] w-full p-2 rounded-3xl">
        <div className="bg-white w-full min-h-[70vh] rounded-3xl p-5">
          <h1 className="font-semibold text-[17px]">Edit Product Details</h1>
          <table className="w-full mt-5">
            <thead className="text-center border border-white">
              <tr className="bg-[#5970F5] text-white">
                <th className="text-center border border-white">Product Name</th>
                <th className="text-center border border-white">Batch Number</th>
                <th className="text-center border border-white">Production Quantity</th>
                <th className="text-center border border-white">UOM</th>
                <th className="text-center border border-white">Rejected Quantity</th>
                <th className="text-center border border-white">Total</th>
                <th className="text-center border border-white">Warehouse Name</th>
                <th className="text-center border border-white">Pick Location</th>
                <th className="text-center border border-white">Inward Documents</th>
                <th className="text-center border border-white">Upload</th>
              </tr>
            </thead>
            <tbody>
              {data.map((x, i) => (
                <tr>
                  <td className="px-3 py-1 border">
                    <Select value={products.find((y) => y._id === x?.product)?.productName || ""}>
                      {products.map((y) => (
                        <li
                          onClick={() => {
                            const temp = [...data];
                            temp[i].product = y._id;
                            setData([...temp]);
                            dispatch(startLoading());
                            dispatch(getFinishedGoodsBatchNumberByProductId(y?._id)).then((res: any) => {
                              const temp = batchs;
                              temp[i] = res.payload;
                              setBatchs([...temp]);
                            });
                          }}
                          className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                        >
                          {y.productName}
                        </li>
                      ))}
                    </Select>
                  </td>
                  <td className="px-3 py-1 border">
                    <Select value={x.batchNumber}>
                      {batchs?.[i]?.map((y) => (
                        <li
                          onClick={() => {
                            const temp = [...data];
                            temp[i].batchNumber = y.batchNumbers;
                            temp[i].productionQuantity = y.quantity;
                            setData([...temp]);
                          }}
                          className="px-3 hover:bg-slate-200 truncate py-1 transition-all duration-100"
                        >
                          {y.batchNumbers}
                        </li>
                      ))}
                    </Select>
                  </td>
                  <td className="px-3 py-1 border">
                  <input type="number" required value={x?.productionQuantity} className="shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] rounded-md"/>
                  </td>
                  <td className="px-3 py-1 border">
                    <Select value={dropDowns?.uom?.find((y) => y?._id === x?.uom)?.value?.name || ""}>
                      {dropDowns.uom?.map((y) => (
                        <li
                          onClick={() => {
                            const temp = [...data];
                            temp[i].uom = y._id;
                            setData([...temp]);
                          }}
                          className="px-3 hover:bg-slate-200 py-1 truncate transition-all duration-100"
                        >
                          {y.value?.name}
                        </li>
                      ))}
                    </Select>
                  </td>
                  <td className="px-3 py-1 border">
                    <input
                      type="number"
                      value={x.rejected}
                      onChange={(e) => {
                        const temp = [...data];
                        temp[i].rejected = parseInt(e.target.value);
                        setData([...temp]);
                      }}
                      className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[100px] remove-spin-wheel rounded-md"
                    />
                  </td>
                  <td className="px-3 py-1 border">
                    <h6 className="shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md h-[25px] w-[100px]">{(x?.productionQuantity || 0) - (x?.rejected || 0)}</h6>
                  </td>
                  <td className="px-3 py-1 border">
                    <Select value={x?.warehouse?.address || ""}>
                      {(user?.companyDetails?.[0]?.warehouse || superAdminCompany?.warehouse || []).map((y: any) => (
                        <li
                          onClick={() => {
                            const temp = [...data];
                            temp[i].warehouse = y;
                            setData([...temp]);
                          }}
                          className="px-3 hover:bg-slate-200 py-1 truncate transition-all duration-100"
                        >
                          {y.address}
                        </li>
                      ))}
                    </Select>
                  </td>
                  <td className="px-3 py-1 border">
                    <Select value={x?.pick?.address || ""}>
                      {(user?.companyDetails?.[0]?.warehouse || superAdminCompany?.warehouse || []).map((y: any) => (
                        <li
                          onClick={() => {
                            const temp = [...data];
                            temp[i].pick = y;
                            setData([...temp]);
                          }}
                          className="px-3 hover:bg-slate-200 py-1 truncate transition-all duration-100"
                        >
                          {y.address}
                        </li>
                      ))}
                    </Select>
                  </td>
                  <td className="px-3 py-1 border">
                    <input
                      type="text"
                      value={x.doc}
                      onChange={(e) => {
                        const temp = [...data];
                        temp[i].doc = e.target.value;
                        setData([...temp]);
                      }}
                      className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px]  rounded-md"
                    />
                  </td>
                  <td className="px-3 py-1 border">
                    {!x.link ? (
                      <label className="flex justify-center items-center">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.5 6V1.925L2.2 3.225L1.5 2.5L4 0L6.5 2.5L5.8 3.225L4.5 1.925V6H3.5ZM1 8C0.725 8 0.489667 7.90217 0.294 7.7065C0.0983332 7.51083 0.000333333 7.27533 0 7V5.5H1V7H7V5.5H8V7C8 7.275 7.90217 7.5105 7.7065 7.7065C7.51083 7.9025 7.27533 8.00033 7 8H1Z" fill="#5970F5" />
                        </svg>

                        <input
                          type="file"
                          onChange={(e) => {
                            const temp = [...data];
                            temp[i].link = e.target.files?.[0];
                            setData([...temp]);
                          }}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div>
                        <p className="text-red-500 cursor-pointer" onClick={()=>{
                            setData([{...x,link:null}])
                        }}>X</p>
                        <p
                          onClick={() => {
                            let url = "";
                            if (x.link.includes("https://fileserver.lyracorp.in")) {
                              url = x.link;
                            } else {
                              url = URL.createObjectURL(x.link);
                            }
                            window.open(url);
                          }}
                          className="text-[9px] cursor-pointer text-[#5970F5] underline"
                        >
                          Preview {i + 1}
                        </p>
                      </div>
                    )}
                  </td>
                  {i > 0 && (
                    <td className="text-red-500">
                      {" "}
                      <button
                        className="h-7 w-7 rounded-full bg-red-500 flex justify-center items-center"
                        onClick={() => {
                          const temp = [...data];
                          temp.splice(i, 1);
                          setData([...temp]);
                        }}
                      >
                        <p
                          onClick={() => {
                            let url = "";
                            if (x.link.includes("https://fileserver.lyracorp.in")) {
                              url = x.link;
                            } else {
                              url = URL.createObjectURL(x.link);
                            }
                            window.open(url);
                          }}
                          className="text-[9px] cursor-pointer text-[#5970F5] underline"
                        >
                          Preview {i + 1}
                        </p>
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-end mt-5"></div>
          <div className="flex gap-5 items-center justify-center mt-5">
            <button onClick={() => navigate(-1)} className="px-3 py-1 rounded-lg border border-[#5970F5] text-[#5970F5]">
              Cancel
            </button>
            <button onClick={handleSave} className="px-3 py-1 rounded-lg bg-[#5970F5] text-white">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditFinishedGoods;
