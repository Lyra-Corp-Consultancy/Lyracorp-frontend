/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Select from "../../../../components/Select";
import { useDispatch, useSelector } from "react-redux";
import { getFinishedGoodsBatchNumberByProductId, getProductsFinishedGoods, getType, postFinishedGoodsInward } from "../../../../utils/redux/actions";
import { startLoading } from "../../../../utils/redux/slice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fileServer } from "../../../../utils/values/publicValues";

function AddFinishedGoods() {
  const dispatch: any = useDispatch();
  const [products, setProducts] = useState<{ productName: string; _id: string }[]>([]);
  const [batchs, setBatchs] = useState<{ batchNumbers: string; quantity: number }[][]>([]);
  const superAdminCompany = useSelector((state: any) => state?.data?.superAdminCompany);
  const user = useSelector((state: any) => state?.data?.user);
  const navigate = useNavigate();
  const handleSave = async () => {
    dispatch(startLoading());
    const temp = [...data];
    for (let i = 0; i < temp.length; i++) {
      const x = temp[i].link;
      const file = new FormData();
      file.append("file", x);
      const res = await axios.post(fileServer, file);
      temp[i].link = res.data;
    }
    console.log(temp);
    dispatch(postFinishedGoodsInward(temp)).then(()=>{
      navigate(-1);
    })
  };
  const [data, setData] = useState<{ product?: string; batchNumber?: string; productionQuantity?: number; uom?: string; rejected?: number; warehouse?: any; pick?: any; doc?: string; link?: any }[]>([{}]);
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
          <h1 className="font-semibold text-[17px]">Add Product Details</h1>
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
                    <Select value={x?.warehouse?.warehouseName || ""}>
                      {(user?.companyDetails?.[0]?.warehouse || superAdminCompany?.warehouse || []).map((y: any) => (
                        <li
                          onClick={() => {
                            const temp = [...data];
                            temp[i].warehouse = y;
                            setData([...temp]);
                          }}
                          className="px-3 hover:bg-slate-200 py-1 truncate transition-all duration-100"
                        >
                          {y.warehouseName}
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
                          {y.warehouseName}
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
                        <svg width="16" height="20" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M17.722 8.87101L17.322 20.978C17.2879 22.0149 16.8511 22.9977 16.1043 23.7178C15.3575 24.4379 14.3594 24.8387 13.322 24.835H5.722C4.68522 24.8387 3.68775 24.4385 2.94104 23.7193C2.19434 23 1.75709 22.0182 1.722 20.982L1.322 8.87101C1.31325 8.60579 1.41021 8.34796 1.59156 8.15424C1.77291 7.96051 2.02378 7.84676 2.289 7.83801C2.55422 7.82926 2.81205 7.92622 3.00577 8.10757C3.1995 8.28892 3.31325 8.53979 3.322 8.80501L3.722 20.915C3.74192 21.432 3.96139 21.9211 4.33433 22.2797C4.70726 22.6383 5.20464 22.8384 5.722 22.838H13.322C13.84 22.8384 14.338 22.6377 14.711 22.2783C15.0841 21.9188 15.3031 21.4287 15.322 20.911L15.722 8.80501C15.7308 8.53979 15.8445 8.28892 16.0382 8.10757C16.232 7.92622 16.4898 7.82926 16.755 7.83801C17.0202 7.84676 17.2711 7.96051 17.4524 8.15424C17.6338 8.34796 17.7308 8.60579 17.722 8.87101ZM19.045 4.84201C19.045 5.10723 18.9396 5.36158 18.7521 5.54912C18.5646 5.73665 18.3102 5.84201 18.045 5.84201H1C0.734784 5.84201 0.480429 5.73665 0.292893 5.54912C0.105357 5.36158 0 5.10723 0 4.84201C0 4.57679 0.105357 4.32244 0.292893 4.1349C0.480429 3.94737 0.734784 3.84201 1 3.84201H4.1C4.41685 3.84286 4.72268 3.7258 4.95798 3.51361C5.19328 3.30141 5.34122 3.00926 5.373 2.69401C5.44679 1.9545 5.79326 1.26894 6.34489 0.770918C6.89653 0.272894 7.61382 -0.00192331 8.357 1.01329e-05H10.687C11.4302 -0.00192331 12.1475 0.272894 12.6991 0.770918C13.2507 1.26894 13.5972 1.9545 13.671 2.69401C13.7028 3.00926 13.8507 3.30141 14.086 3.51361C14.3213 3.7258 14.6272 3.84286 14.944 3.84201H18.044C18.3092 3.84201 18.5636 3.94737 18.7511 4.1349C18.9386 4.32244 19.044 4.57679 19.044 4.84201H19.045ZM7.109 3.84201H11.937C11.8056 3.54175 11.7196 3.22359 11.682 2.89801C11.6572 2.65152 11.5418 2.423 11.3582 2.25672C11.1746 2.09045 10.9357 1.99825 10.688 1.99801H8.358C8.11027 1.99825 7.87144 2.09045 7.6878 2.25672C7.50416 2.423 7.38877 2.65152 7.364 2.89801C7.32603 3.22365 7.24075 3.54181 7.109 3.84201ZM8.116 18.993V10.478C8.116 10.2128 8.01064 9.95844 7.82311 9.7709C7.63557 9.58337 7.38122 9.47801 7.116 9.47801C6.85078 9.47801 6.59643 9.58337 6.40889 9.7709C6.22136 9.95844 6.116 10.2128 6.116 10.478V18.997C6.116 19.2622 6.22136 19.5166 6.40889 19.7041C6.59643 19.8917 6.85078 19.997 7.116 19.997C7.38122 19.997 7.63557 19.8917 7.82311 19.7041C8.01064 19.5166 8.116 19.2622 8.116 18.997V18.993ZM12.93 18.993V10.478C12.93 10.2128 12.8246 9.95844 12.6371 9.7709C12.4496 9.58337 12.1952 9.47801 11.93 9.47801C11.6648 9.47801 11.4104 9.58337 11.2229 9.7709C11.0354 9.95844 10.93 10.2128 10.93 10.478V18.997C10.93 19.2622 11.0354 19.5166 11.2229 19.7041C11.4104 19.8917 11.6648 19.997 11.93 19.997C12.1952 19.997 12.4496 19.8917 12.6371 19.7041C12.8246 19.5166 12.93 19.2622 12.93 18.997V18.993Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-end mt-5">
            <button onClick={() => setData([...data, {}])} className="px-3 py-1 rounded-lg bg-[#5970F5] text-white">
              +Add More
            </button>
          </div>
          <div className="flex gap-5 items-center justify-center mt-5">
            <button onClick={() => navigate(-1)} className="px-3 py-1 rounded-lg border border-[#5970F5] text-[#5970F5]">
              Cancel
            </button>
            <button onClick={handleSave} className="px-3 py-1 rounded-lg bg-[#5970F5] text-white">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFinishedGoods;
