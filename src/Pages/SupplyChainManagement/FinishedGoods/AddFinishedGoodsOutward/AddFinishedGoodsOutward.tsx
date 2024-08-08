/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Select from "../../../../components/Select";
import { useDispatch, useSelector } from "react-redux";
import {  getAllUserManagement, getAllVendorMaster, getfinshedGoodsGetProductAll, getProductsFinishedGoods, getType, postFinshedGoodsProduct } from "../../../../utils/redux/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./AddFinishedGoodsOutward.module.scss";
import DeleteConfirmationBox from "../../../../components/DeleteConfirmationBox";
import { FinishedGoodsOutwardsTypes } from "../../../../utils/Type/types";
import { formatDate } from "../../../../utils/functions/formats";
// import styles from "../PurchaseOrder.module.scss"

function AddFinishedGoodsOutward() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [places, setPlaces] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });
  const [search, setSearch] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });
  const [confirmation, setConfirmation] = useState(false);
  const [products, setProducts] = useState<any[]>();
  const superAdminCompany = useSelector((state: any) => state?.data?.superAdminCompany);
  const user = useSelector((state: any) => state?.data?.user);
  const [dropDowns, setDropDown] = useState<{
    margin: any[];
    account: any[];
    discount: any[];
    payment: any[];
    uom: any[];
    document: any[];
    certificate: any[];
    products: any[];
    users: any[];
    vendor: any[];
    transporter: any[];
    packing: any[];
    shipping: any[];
  }>({ margin: [], account: [], discount: [], payment: [], transporter: [], document: [], uom: [], products: [], vendor: [], certificate: [], users: [], packing: [], shipping: [] });
  const dispatch: any = useDispatch();
  // const [dragging, setDragging] = useState(false);
  const [data, setData] = useState<FinishedGoodsOutwardsTypes>({
    products: [{}],
  });

  const [searchValue, setSearchValue] = useState<{
    uom: any[];
    Receiver: string;
    sender: string;
    products: any[];
    grnNumber: any[];
    TransportationMode: string;
    transportationDistance: string;
    shippingAddress: string;
    productName: any[];
    batchNumber: any[];
  }>({
    uom: [],
    Receiver: "",
    sender: "",
    products: [],
    grnNumber: [],
    TransportationMode: "",
    transportationDistance: "",
    shippingAddress: "",
    productName: [],
    batchNumber: [],
  });

  // const [selectedProduct, setSelectedProduct] = useState<any[]>([]);

  const navigate = useNavigate();

  const handleSave = async () => {
    const val = data;

    let lineOfBusiness: string | undefined;
    if (user?.superAdmin) {
      lineOfBusiness = superAdminCompany?._id;
    } else {
      lineOfBusiness = user?.company;
    }

    dispatch(postFinshedGoodsProduct({ ...val, lineOfBusiness })).then(() => {
      navigate(-1);
    });
  };

  //   const handleFileSelect = (e: any) => {
  //     const selectedFiles = Array.from(e.target.files);

  //     setFiles([...files, ...selectedFiles]);
  //   };
  useEffect(() => {
    dispatch(getfinshedGoodsGetProductAll()).then((res: any) => {
      console.log(res);
      setDropDown((prev) => ({ ...prev, products: res.payload }));
    });

    const res2 = dispatch(getType("uom"));

    res2.then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          uom: res?.payload?.[0]?.uomType,
        };
      });
    });

    dispatch(getType("transport")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          transporter: res?.payload?.[0]?.transportType,
        };
      });
    });

    dispatch(getAllUserManagement()).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          users: res?.payload?.active,
        };
      });
    });

    dispatch(getAllVendorMaster()).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          vendor: res?.payload?.active,
        };
      });
    });

    dispatch(getProductsFinishedGoods()).then((res: any) => {
      setProducts(res.payload);
    });

    dispatch(getAllVendorMaster()).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          vendor: res?.payload?.active,
        };
      });
    });

    axios.get("https://api.first.org/data/v1/countries").then((res) => {
      const val = [];
      for (const i in res.data.data) {
        val.push(res.data.data[i]);
      }
      setPlaces({ ...places, country: val });
      setSearch({ ...search, country: val });
    });
  }, []);

  //   const handleDrop = (e: any) => {
  //     e.preventDefault();
  //     // setDragging(false);
  //     const droppedFiles = Array.from(e.dataTransfer.files);
  //     setFiles([...files, ...droppedFiles]);
  //   };

  const productIDs = dropDowns.products.map((a: any) => a.product);
  const finalProductNamesWithID = products?.filter((product: any) => productIDs.includes(product._id));
  console.log("data", data);
  console.log("ss", searchValue);
  console.log("dd", dropDowns);

  return (
    <div className=" w-screen px-4 pt-3 shadow-md">
      <h1 className="roboto-bold text-lg">Add Finished Goods Outward</h1>

      <div className="bg-[#F1F3FF] shadow-md p-3 rounded-lg w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setConfirmation(true);
          }}
          className="shadow-md bg-white pb-[100px] px-4 h-full z-[0] relative rounded-lg pt-1 w-full"
        >
          <h1 className="roboto-medium mt-1">Transportation Details</h1>
          <div className="grid grid-cols-4 items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <div className="flex  items-center gap-3 justify-between">
              <label>Outward Date</label>
              <label htmlFor="date" className="w-[200px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">
                <p>{data?.outwardDate}</p>
                <button type="button" className={styles.calendar}>
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6.11111H7.77778V8.88889H5V6.11111ZM8.88889 1.11111H8.33333V0H7.22222V1.11111H2.77778V0H1.66667V1.11111H1.11111C0.5 1.11111 0 1.61111 0 2.22222V10C0 10.6111 0.5 11.1111 1.11111 11.1111H8.88889C9.5 11.1111 10 10.6111 10 10V2.22222C10 1.61111 9.5 1.11111 8.88889 1.11111ZM8.88889 2.22222V3.33333H1.11111V2.22222H8.88889ZM1.11111 10V4.44444H8.88889V10H1.11111Z" fill="#5970F5" />
                  </svg>
                </button>
                <Calendar
                  value={data.outwardDate}
                  onChange={(e) => {
                    const date = new Date(e?.toString() || "");
                    const formattedDate = formatDate(date); // Extract the date in yyyy-mm-dd format
                    setData({ ...data, outwardDate: formattedDate });
                  }}
                  className={["bg-white absolute bottom-0 z-[909] translate-y-[100%] hidden   items-center  flex-col max-w-[277px_!important] " + styles.enableCalender]}
                />
              </label>
            </div>
            <div className="flex  items-center gap-3 justify-between">
              <label>Sender</label>

              <Select
                // 
                // pattern={superAdminCompany?.warehouse?.filter((a: any) => a?.warehouseName === searchValue?.sender || "")?.[0]?.warehouseName ? undefined : ""}
                // title="Please Select values from drop down"
                onChange={(e) => {
                  setSearchValue({ ...searchValue, sender: e.target.value });
                }}
                value={searchValue?.sender || ""}
              >
                {(user?.superAdmin ? superAdminCompany?.warehouse : user?.company)
                  ?.filter((a: any) => a?.address?.toLowerCase()?.includes(searchValue?.sender?.toLowerCase() || ""))
                  ?.map((x: any) => (
                    <li
                      onClick={() => {
                        setSearchValue({ ...searchValue, sender: x?.warehouseName });
                        setData({ ...data, sender: x });
                      }}
                      className="px-3 truncate hover:bg-slate-200 py-1 transition-all duration-100"
                    >
                      {x?.warehouseName}
                    </li>
                  ))}
              </Select>
            </div>
            <div className="flex  items-center gap-3 justify-between">
              <label>Supply Chain</label>
              <label className="w-[200px] flex items-center">
                <input type="radio" name="supplyChain" id="" onChange={() => setData({ ...data, supplyChain: "own" })} />
                <label className="ms-1">Own</label>
                <input type="radio" className="ms-3" name="supplyChain" onChange={() => setData({ ...data, supplyChain: "job work" })} id="" />
                <label className="ms-1">Job Work</label>
              </label>
            </div>
            <div className="flex  items-center gap-3 justify-between">
              <label>Receiver</label>

              <Select
                className="bg-white w-[200px] z-[990]"
                // 
                onChange={(e) => {
                  setSearchValue({ ...searchValue, Receiver: e.target.value });
                }}
                value={searchValue?.Receiver || ""}
              >
                {(data?.supplyChain === "own" ? (user?.superAdmin ? superAdminCompany?.warehouse : user?.company) : dropDowns?.vendor)
                  ?.filter((a: any) => a?.address?.toLowerCase()?.includes(searchValue?.Receiver?.toLowerCase() || ""))
                  ?.map((x: any) => (
                    <li
                      onClick={() => {
                        setSearchValue({ ...searchValue, Receiver: x?.warehouseName || x?.VendorName });
                        setData({ ...data, receiver: x });
                      }}
                      className="px-3 truncate hover:bg-slate-200 py-1 transition-all duration-100"
                    >
                      {data?.supplyChain === "own" ? x?.warehouseName : x?.VendorName}
                    </li>
                  ))}
              </Select>
            </div>
            <div className="flex  items-center gap-3 justify-between">
              <label>Transporter</label>
              <input
                
               type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" value={data?.transporter} onChange={(e) => setData({ ...data, transporter: e.target.value })} />
            </div>
            <div className="flex items-center gap-3 justify-between">
              <label>Vehicle Number</label>
              <input 
               value={data.vehicleNumber} onChange={(e) => setData({ ...data, vehicleNumber: e.target.value })} className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" type="text" />
            </div>
            <div className="flex  items-center gap-3 justify-between">
              <label>Transportation Mode</label>

              <Select
                
                pattern={dropDowns?.transporter?.filter((x) => x?.value === searchValue?.TransportationMode)?.[0]?.value ? undefined : ""}
                title="Please Select values from drop down"
                onChange={(e) => {
                  setSearchValue({ ...searchValue, TransportationMode: e.target.value });
                }}
                value={searchValue?.TransportationMode || ""}
              >
                {dropDowns?.transporter
                  ?.filter((a) => a?.value?.toLowerCase()?.includes(searchValue?.TransportationMode?.toLowerCase() || ""))
                  ?.map((x) => (
                    <li
                      onClick={() => {
                        setSearchValue({ ...searchValue, TransportationMode: x?.value });
                        setData({ ...data, transporterMode: x?._id });
                      }}
                      className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                    >
                      {x?.value}
                    </li>
                  ))}
              </Select>
            </div>
            <div className="flex  items-center gap-3 justify-between">
              <label>Transportation Date</label>
              <label htmlFor="date" className="w-[200px] flex items-center relative h-[25px] z-[900] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">
                <p>{data?.transpotationDate}</p>
                <button type="button" className={styles.calendar}>
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6.11111H7.77778V8.88889H5V6.11111ZM8.88889 1.11111H8.33333V0H7.22222V1.11111H2.77778V0H1.66667V1.11111H1.11111C0.5 1.11111 0 1.61111 0 2.22222V10C0 10.6111 0.5 11.1111 1.11111 11.1111H8.88889C9.5 11.1111 10 10.6111 10 10V2.22222C10 1.61111 9.5 1.11111 8.88889 1.11111ZM8.88889 2.22222V3.33333H1.11111V2.22222H8.88889ZM1.11111 10V4.44444H8.88889V10H1.11111Z" fill="#5970F5" />
                  </svg>
                </button>
                <Calendar
                  value={data.transpotationDate}
                  onChange={(e) => {
                    const date = new Date(e?.toString() || "");
                    const formattedDate = formatDate(date); // Extract the date in yyyy-mm-dd format
                    setData({ ...data, transpotationDate: formattedDate });
                  }}
                  className={["bg-white absolute bottom-0 z-[909] translate-y-[100%] hidden   items-center  flex-col max-w-[277px_!important] " + styles.enableCalender]}
                />
              </label>
            </div>
            <div className="flex  items-center gap-3 justify-between">
              <label>Transportation Distance</label>
              <input  type="text" value={data.transportationDistance} onChange={(e) => setData({ ...data, transportationDistance: e.target.value })} className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[140px] rounded-md" />
              <Select  className="bg-white w-[70px] z-[509]" value={data?.transportationDistanceUnit}>
                {["Km", "Miles"].map((x) => (
                  <li
                    onClick={() => {
                      setData({ ...data, transportationDistanceUnit: x });
                    }}
                    className="px-3 truncate bg-white hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x}
                  </li>
                ))}
              </Select>
            </div>

            <div className="flex items-center gap-3 justify-between">
              <label>Remarks</label>
              <input  value={data.remarks} onChange={(e) => setData({ ...data, remarks: e.target.value })} className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" type="text" />
            </div>
            <div className="flex items-center gap-3 justify-between">
              <label>Bill of Lading</label>
              <input  value={data.billOfLading} onChange={(e) => setData({ ...data, billOfLading: e.target.value })} className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" type="text" />
            </div>
          </div>

          <h1 className="roboto-medium mt-1">Product Details</h1>

          <table className="w-full text-[14px] border-collapse rounded border">
            <thead className="bg-[#5970F5]">
              <tr className=" text-white">
                <th className=" border-r w-1/6">Product Name</th>
                <th className=" border-r w-1/6">Batch Number</th>
                <th className="border-r w-1/6">Outward Quantity</th>
                <th className="border-r w-1/6">UOM</th>
                <th className="border-r w-1/6">Remarks</th>
                <th className="border-r w-1/6">Upload</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((x: any, i: number) => (
                <tr className={`text-center relative `} style={{ zIndex: 500 - i }}>
                  <td className="px-3 py-1 border">
                    {/* <Select  onChange={(e) => {
                const temp = searchValue?.productName;
                temp[i] = e.target.value;
                setSearchValue({ ...searchValue, productName: temp });
              }}
              value={searchValue?.productName[i] || ""}
                  >
                      {
                       products?.filter((a:any) => a?.productName?.toLowerCase()?.includes(searchValue?.productName[i]?.toLowerCase() || ""))?.map((y)=>(<li 
                        onClick={()=>{
                          const temp =[...(data?.products||[])];
                          temp[i].productId = y._id;
                          setData({...data,products:[...temp]})  
                          // setSearchValue({ ...searchValue, productName: temp.map((x)=>x?.batchNumber) });
                        }}
                        className="px-3 hover:bg-slate-200 py-1 transition-all duration-100">
                            {y.productName}
                        </li>))
                      }
                    </Select> */}

                    <Select
                      style={{ zIndex: 997 - i }}
                      
                      className="w-[90%] shadow-none bg-[#e2e2e2]"
                      onChange={(e) => {
                        const temp = searchValue?.productName;
                        temp[i] = e.target.value;
                        setSearchValue({ ...searchValue, productName: temp });
                      }}
                      value={searchValue?.productName[i] || ""}
                    >
                      {finalProductNamesWithID
                        ?.filter((a) => a?.productName?.toLowerCase()?.includes(searchValue?.productName[i]?.toLowerCase() || ""))
                        ?.map((x) => (
                          <li
                            onClick={() => {
                              const temp = searchValue?.productName;
                              temp[i] = x?.productName;
                              setSearchValue({ ...searchValue, productName: temp });

                              const product = data?.products;
                              product[i] = { ...product[i], productId: x?._id };
                              setData({ ...data, products: product });
                            }}
                            className="px-3 hover:bg-slate-200 py-1 truncate transition-all duration-100"
                          >
                            {x?.productName}
                          </li>
                        ))}
                    </Select>
                  </td>
                  <td className="px-3 py-1 border">
                    <Select
                      onChange={(e) => {
                        const temp = searchValue?.batchNumber;
                        temp[i] = e.target.value;
                        setSearchValue({ ...searchValue, batchNumber: temp });
                      }}
                      value={searchValue?.batchNumber[i] || ""}
                    >
                      {dropDowns?.products
                        ?.filter((p) => p.product === x.productId)
                        ?.filter((a: any) => a?.batchNumber?.toLowerCase()?.includes(searchValue?.batchNumber[i]?.toLowerCase() || ""))
                        .map((y: any) => (
                          <li
                            onClick={() => {
                              const temp = [...(data?.products || [])];
                              temp[i].batchNumber = y.batchNumber;
                              console.log("y", y);
                              setData({ ...data, products: [...temp] });
                              setSearchValue({ ...searchValue, batchNumber: temp.map((x) => x?.batchNumber) });
                            }}
                            className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                          >
                            {y.batchNumber}
                          </li>
                        ))}
                    </Select>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <div className="w-full flex">
                      <input
                        
                        type="number"
                        value={x.recievedQuantity}
                        onChange={(e) => {
                          if (
                            parseInt(e.target.value || "0") <=
                            parseInt(
                              dropDowns?.products?.filter((a) => {
                                if (a?.product === x?.productId && a?.batchNumber === x?.batchNumber) {
                                  return true;
                                }
                                return false;
                              })?.[0]?.productionQuantity
                            )
                          ) {
                            const product = data?.products;
                            product[i] = { ...x, outWardQuantity: parseInt(e.target.value) };
                            setData({ ...data, products: product });
                          }
                        }}
                        className="px-2 py-1 w-[73%] bg-[#e2e2e2]  h-[25px] rounded-md"
                      />
                      <label className="px-2 py-1 w-[15%] ms-1 bg-[#e2e2e2]  h-[25px] rounded-md">
                        {/* // selectedProduct?.[i]?.qnGrn?.filter((y: any) => y?.grn === x?.grn)?.[0]?.qn */}
                        {
                          dropDowns?.products?.filter((a) => {
                            if (a?.product === x?.productId && a?.batchNumber === x?.batchNumber) {
                              return true;
                            }
                            return false;
                          })?.[0]?.productionQuantity
                        }
                      </label>
                    </div>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <Select
                      style={{ zIndex: 997 - i }}
                      
                      className="w-[90%] shadow-none bg-[#e2e2e2]"
                      pattern={dropDowns?.uom?.filter((x) => x?.value?.name === searchValue.uom[i])?.[0]?.value?.name ? undefined : ""}
                      title="Please Select values from drop down"
                      onChange={(e) => {
                        const temp = searchValue?.uom;
                        temp[i] = e.target.value;
                        setSearchValue({ ...searchValue, uom: temp });
                      }}
                      value={searchValue?.uom[i] || ""}
                    >
                      {dropDowns?.uom
                        ?.filter((a) => a?.value?.name?.toLowerCase()?.includes(searchValue?.uom[i]?.toLowerCase() || ""))
                        ?.map((x) => (
                          <li
                            onClick={() => {
                              const temp = searchValue?.uom;
                              temp[i] = x?.value?.name;
                              setSearchValue({ ...searchValue, uom: temp });

                              const product = data?.products;
                              product[i] = { ...product[i], uom: x?._id };
                              setData({ ...data, products: product });
                            }}
                            className="px-3 hover:bg-slate-200 py-1 truncate transition-all duration-100"
                          >
                            {x?.value?.name}
                          </li>
                        ))}
                    </Select>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <input
                      
                      type="text"
                      value={x?.remark}
                      onChange={(e) => {
                        const product = data?.products;
                        product[i] = { ...x, remark: e.target.value };
                        setData({ ...data, products: product });
                      }}
                      className="px-2 py-1 w-[90%] bg-[#e2e2e2]  h-[25px] rounded-md"
                    />
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <div className="flex justify-center items-center">
                      <label>
                        <svg width="13" height="13" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.5 6V1.925L2.2 3.225L1.5 2.5L4 0L6.5 2.5L5.8 3.225L4.5 1.925V6H3.5ZM1 8C0.725 8 0.489667 7.90217 0.294 7.7065C0.0983332 7.51083 0.000333333 7.27533 0 7V5.5H1V7H7V5.5H8V7C8 7.275 7.90217 7.5105 7.7065 7.7065C7.51083 7.9025 7.27533 8.00033 7 8H1Z" fill="#5970F5" />
                        </svg>

                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            if (e?.target?.files?.[0]) {
                              const product = data?.products;
                              product[i] = { ...x, image: e.target.files[0] };
                              setData({ ...data, products: product });
                            }
                          }}
                        />
                      </label>
                    </div>
                  </td>

                  {i > 0 && (
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          const product = data.products;
                          product.splice(i, 1);
                          setData({ ...data, products: product });
                        }}
                        className=" rounded-full bg-[#5970F5] text-white h-5 w-5 flex justify-center items-center"
                      >
                        {" "}
                        -{" "}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex mt-3 w-full items-end justify-end">
            <button type="button" onClick={() => setData({ ...data, products: [...data.products, {}] })} className="bg-[#5970F5] text-white px-4 py-2 rounded-md">
              + Add{" "}
            </button>
          </div>

          <div className="w-full absolute bottom-4 justify-center items-center  gap-3 flex mt-5">
            <button type="reset" className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" onClick={() => setData({ products: [{}] })}>
              Reset
            </button>
            <button type="button" className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className=" rounded-md py-2 px-4 font-semibold bg-[#5970F5] text-white">
              Save
            </button>
          </div>
        </form>
      </div>
      {confirmation && <DeleteConfirmationBox posColor="bg-[#196000]" RejectFunction={() => setConfirmation(false)} ResolveFunction={handleSave} message="Do you want to save?" pos="save" />}
    </div>
  );
}

export default AddFinishedGoodsOutward;
