/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Select from "../../../../components/Select";
import { useDispatch, useSelector } from "react-redux";
import {  addPurchaseOrder, getAllProductMaster, getAllUserManagement, getAllVendorMaster, getType } from "../../../../utils/redux/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fileServer } from "../../../../utils/values/publicValues";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./AddPurchaseOrder.module.scss";
import DeleteConfirmationBox from "../../../../components/DeleteConfirmationBox";
// import styles from "../PurchaseOrder.module.scss"

function AddPurchaseOrder() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [places, setPlaces] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });
  const [search, setSearch] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });
  const [confirmation,setConfirmation] = useState(false)
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
    vendor:any[]; 
    packing:any[];
    shipping:any[];
  }>({ margin: [], account: [], discount: [], payment: [], document: [], uom: [], products: [],vendor:[] ,certificate: [], users: [],packing:[],shipping:[] });
  const dispatch: any = useDispatch();
  // const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [data, setData] = useState<any>({
    fileUrls: [],
    products: [{}],
  });

  const navigate = useNavigate();

  const handleSave = async () => {
    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const x = files[i];
      const file = new FormData();
      file.append("file", x);
      const res = await axios.post(fileServer, file);
      urls.push(res.data);
    }
    console.log(urls);
    setData({ ...data, fileUrls: urls });

    let lineOfBusiness:string | null
    if(user?.superAdmin){
      lineOfBusiness = superAdminCompany?._id
    }else{
      lineOfBusiness = user?.company
    }


    dispatch(addPurchaseOrder({ ...data, fileUrls: urls,lineOfBusiness })).then(() => {
      navigate(-1);
    });
  };

  const handleFileSelect = (e: any) => {
    const selectedFiles = Array.from(e.target.files);

    setFiles([...files, ...selectedFiles]);
  };
  useEffect(() => {
    const res1 = dispatch(getType("marginSetting"));

    res1.then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          margin: res?.payload[0]?.marginSettingType,
        };
      });
    });

    const res2 = dispatch(getType("uom"));

    res2.then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          uom: res?.payload[0]?.uomType,
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
      console.log(res.payload);
    });

    dispatch(getAllVendorMaster()).then((res: any) => {
      console.log(res?.payload?.active);
      setDropDown((prev) => {
        return {
          ...prev,
          vendor: res?.payload?.active,
        };
      });
    });

    dispatch(getType("discount")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          discount: res?.payload[0]?.discountType,
        };
      });
    });

    dispatch(getType("packing")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          packing: res?.payload[0]?.packingType,
        };
      });
    });

    dispatch(getAllVendorMaster()).then((res: any) => {
      console.log(res?.payload?.active);
      setDropDown((prev) => {
        return {
          ...prev,
          vendor: res?.payload?.active,
        };
      });
    });
    dispatch(getType("certification")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          certificate: res?.payload[0]?.certificationType,
        };
      });
      console.log(res.payload);
    });

    dispatch(getType("shipping")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          shipping: res?.payload[0]?.shippingType,
        };
      });
      console.log(res.payload);
    });

    dispatch(getAllProductMaster()).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          products: res?.payload?.active,
        };
      });
    });

    dispatch(getType("payment")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          payment: res?.payload[0]?.paymentType,
        };
      });
    });

    dispatch(getType("document")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          document: res?.payload[0]?.documentType,
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

  const handleDrop = (e: any) => {
    e.preventDefault();
    // setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };
  return (
    <div className=" w-screen px-4 pt-3 shadow-md">
      <h1 className="roboto-bold text-lg">Add Purchase Order</h1>
      <div className="bg-[#F1F3FF] shadow-md p-3 rounded-lg w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setConfirmation(true)
          }}
          className="shadow-md bg-white pb-[100px] px-4 h-full z-[0] relative rounded-lg pt-1 w-full"
        >
          <h1 className="roboto-medium mt-1">Vendor Details</h1>
          <div className="grid grid-cols-4 items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <div className="flex  items-center gap-3">
              <label>Vendor Name</label>
              <Select className="bg-white z-[990]" value={dropDowns?.vendor?.filter((x) => x?._id === data?.vendor)[0]?.VendorName}>
                {dropDowns?.vendor?.map((x) => (
                  <li
                    onClick={() => {
                      setData({ ...data, vendor: x?._id });
                    }}
                    className="px-3 truncate bg-white hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x?.VendorName}
                  </li>
                ))}
              </Select>
            </div>
            <div className="flex  items-center gap-3">
              <label>Contact Name</label>
              <Select className="bg-white z-[100]" value={dropDowns?.users?.filter((x) => x?._id === data?.contact)[0]?.username}>
                {dropDowns?.users?.map((x) => (
                  <li
                    onClick={() => {
                      setData({ ...data, contact: x?._id });
                    }}
                    className="px-3 truncate bg-white hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x?.username}
                  </li>
                ))}
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <label>Contact Number</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md">{dropDowns?.users?.filter((x) => x?._id === data?.contact)[0]?.phoneNumber}</label>
            </div>
          </div>

          <h1 className="roboto-medium mt-1">Delivery Details</h1>
          <div className="grid grid-cols-4 items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <div className="flex gap-3 items-center z-[99]">
              <label>Delivery Date</label>
              <label htmlFor="date" className="w-[200px] flex items-center relative h-[25px] z-[900] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">
                <p>{data?.deliveryDate}</p>
                <button type="button" className={styles.calendar}>
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6.11111H7.77778V8.88889H5V6.11111ZM8.88889 1.11111H8.33333V0H7.22222V1.11111H2.77778V0H1.66667V1.11111H1.11111C0.5 1.11111 0 1.61111 0 2.22222V10C0 10.6111 0.5 11.1111 1.11111 11.1111H8.88889C9.5 11.1111 10 10.6111 10 10V2.22222C10 1.61111 9.5 1.11111 8.88889 1.11111ZM8.88889 2.22222V3.33333H1.11111V2.22222H8.88889ZM1.11111 10V4.44444H8.88889V10H1.11111Z" fill="#5970F5" />
                  </svg>
                </button>
                <Calendar
                  value={data.deliveryDate}
                  onChange={(e) => {
                    setData({ ...data, deliveryDate: e?.toLocaleString().split(",")[0] });
                    console.log("delivery date");
                  }}
                  className={["bg-white absolute bottom-0 z-[909] translate-y-[100%] hidden   items-center  flex-col max-w-[277px_!important] " + styles.enableCalender]}
                />
              </label>
            </div>
            <div className="flex gap-3 items-center">
              <label>Delivery to Name</label>
              <Select className="z-[99]" value={dropDowns?.users?.filter((x) => x?._id === data?.deliveryTo)[0]?.username}>
                {dropDowns?.users?.map((x) => (
                  <li
                    onClick={() => {
                      setData({ ...data, deliveryTo: x?._id });
                    }}
                    className="px-3 truncate  hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x?.username}
                  </li>
                ))}
              </Select>
            </div>

            <div className="flex gap-3  z-[999] items-center">
              <label className="text-[12px] w-[170px]">Delivery to Contact Number</label>
              <label htmlFor="" className="px-2 py-1 w-[60%] shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] rounded-md">
                {dropDowns?.users?.filter((x) => x?._id === data?.deliveryTo)[0]?.phoneNumber}
              </label>
            </div>

            <div className="flex gap-3 z-[999] items-center">
              <label>Shipping Method</label>
              <Select value={dropDowns?.shipping?.filter((x) => x?._id === data?.shippingMethod)[0]?.value}>
                {dropDowns?.shipping?.map((x) => (
                  <li
                    onClick={() => {
                      setData({ ...data, shippingMethod: x?._id });
                    }}
                    className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x?.value}
                  </li>
                ))}
              </Select>
            </div>

            <div className="flex gap-3 z-[96] items-center">
              <label>Shipping Address</label>
              <Select value={data?.shippingAddress?.address}>
                {(user?.companyDetails[0]?.shippingAddress || superAdminCompany?.shippingAddress)?.map((x:any) => (
                  <li
                    onClick={() => {
                      setData({ ...data, shippingAddress: x });
                    }}
                    className="px-3 truncate hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x?.address}
                  </li>
                ))}
              </Select>
            </div>

            <div className="flex gap-3 items-center">
              <label>Billing Address</label>
              <Select value={data?.billingAddress?.address}>
                {(user?.companyDetails[0]?.billingAddress || superAdminCompany?.billingAddress)?.map((x:any) => (
                  <li
                    onClick={() => {
                      setData({ ...data, billingAddress: x });
                    }}
                    className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x?.address}
                  </li>
                ))}
              </Select>
            </div>
          </div>
          <h1 className="roboto-medium mt-1">Price Details</h1>
          <div className="grid grid-cols-4 items-center justify-between roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)]  w-full rounded-lg px-3 py-2">
            <div className="flex gap-3 items-center">
              <label>Payment Terms</label>
              <Select value={dropDowns?.payment?.filter((x) => x?._id === data?.paymentTerm)[0]?.value}>
                {dropDowns?.payment?.map((x) => (
                  <li
                    onClick={() => {
                      setData({ ...data, paymentTerm: x?._id });
                    }}
                    className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x?.value}
                  </li>
                ))}
              </Select>
            </div>

            <div className="flex gap-3 items-center">
              <label>Payment Type</label>
              <Select value={data?.paymentType}>
                {["Cash", "Credit"]?.map((x) => (
                  <li
                    onClick={() => {
                      setData({ ...data, paymentType: x });
                    }}
                    className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x}
                  </li>
                ))}
              </Select>
            </div>
          </div>

          <h1 className="roboto-medium mt-1">Document Details</h1>

          <div className="flex items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <label>Bussiness Document</label>
            <Select value={dropDowns?.document?.filter((x) => x?._id === data?.bussinessDocument)[0]?.value}>
              {dropDowns?.document?.map((x) => (
                <li
                  onClick={() => {
                    setData({ ...data, bussinessDocument: x?._id });
                  }}
                  className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                >
                  {x?.value}
                </li>
              ))}
            </Select>
            <label htmlFor="file" className="flex items-center gap-3 justify-center shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[50px] w-[150px] px-3 py-2 rounded-md" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onDragEnter={(e) => e.preventDefault()}>
              <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5625 11.25V3.60938L4.125 6.04688L2.8125 4.6875L7.5 0L12.1875 4.6875L10.875 6.04688L8.4375 3.60938V11.25H6.5625ZM1.875 15C1.35938 15 0.918125 14.8166 0.55125 14.4497C0.184375 14.0828 0.000625 13.6412 0 13.125V10.3125H1.875V13.125H13.125V10.3125H15V13.125C15 13.6406 14.8166 14.0822 14.4497 14.4497C14.0828 14.8172 13.6412 15.0006 13.125 15H1.875Z" fill="#5970F5" />
              </svg>
              <p className="text-xs text-center">Upload Document or Drag the file</p>
              <input type="file" id="file" onChange={handleFileSelect} className="hidden" />
            </label>
            {files.map((x: any, i: number) => (
              <div className="  flex flex-col justify-center items-center">
                <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 0H8.07901L11.7144 3.63536V6.83338H10.4128V5.20639H6.50798V1.3016H1.3016V13.016H6.18259V14.3176H0V0ZM7.80958 1.57103V3.90479H10.1433L7.80958 1.57103ZM9.27388 8.78578C8.79922 8.78578 8.344 8.97434 8.00837 9.30997C7.67274 9.6456 7.48418 10.1008 7.48418 10.5755C7.48418 11.0501 7.67274 11.5053 8.00837 11.841C8.344 12.1766 8.79922 12.3652 9.27388 12.3652C9.74853 12.3652 10.2038 12.1766 10.5394 11.841C10.875 11.5053 11.0636 11.0501 11.0636 10.5755C11.0636 10.1008 10.875 9.6456 10.5394 9.30997C10.2038 8.97434 9.74853 8.78578 9.27388 8.78578ZM6.18259 10.5755C6.18266 10.0948 6.29482 9.62079 6.51015 9.19106C6.72548 8.76133 7.03806 8.38774 7.42305 8.09995C7.80804 7.81217 8.25483 7.61813 8.72794 7.53324C9.20104 7.44835 9.68743 7.47496 10.1484 7.61094C10.6095 7.74693 11.0324 7.98855 11.3837 8.31661C11.735 8.64467 12.005 9.05013 12.1722 9.50078C12.3393 9.95144 12.3991 10.4349 12.3468 10.9127C12.2944 11.3905 12.1314 11.8495 11.8706 12.2532L12.96 13.3407L12.0404 14.2616L10.9503 13.1728C10.4835 13.4741 9.94407 13.6441 9.3888 13.6647C8.83354 13.6854 8.28297 13.556 7.79503 13.2902C7.30709 13.0244 6.89982 12.632 6.61607 12.1542C6.33231 11.6765 6.18257 11.1311 6.18259 10.5755Z"
                    fill="#5970F5"
                  />
                </svg>
                <p
                  onClick={() => {
                    const url = URL.createObjectURL(x);
                    window.open(url);
                  }}
                  className="text-[9px] cursor-pointer text-[#5970F5] underline"
                >
                  Preview {i + 1}
                </p>
              </div>
            ))}
          </div>

          <h1 className="roboto-medium mt-1">Product Details</h1>

          <table className="w-full border-collapse rounded border">
            <thead className="bg-[#5970F5]">
              <tr className=" text-white">
                <th className=" border-r w-1/5">Product Name</th>
                <th className="border-r w-1/5">Order Quantity</th>
                <th className="border-r w-1/5">UOM</th>
                <th className="border-r w-1/5">Packing Type</th>
                <th className=" w-1/5">Certification</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((x: any, i: number) => (
                <tr className="">
                  <td className="text-center  border w-1/5  justify-center py-2 items-center ">
                    <div className="flex justify-center items-center">
                      <Select className="w-[50%] z-[999] shadow-none bg-[#F6F4F4]" value={dropDowns?.products?.filter((x) => x?._id === data?.products[i]?.productId)[0]?.productName}>
                        {dropDowns?.products?.map((x: any) => (
                          <li
                            onClick={() => {
                              const product = data?.products;
                              product[i] = { ...product[i], productId: x?._id };
                              setData({ ...data, products: product });
                            }}
                            className="px-3 hover:bg-slate-200 py-1 truncate transition-all duration-100"
                          >
                            {x?.productName || "No Name"}
                          </li>
                        ))}
                      </Select>
                    </div>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <input
                      type="text"
                      value={data?.products[i].orderQuantity}
                      onChange={(e) => {
                        const product = data?.products;
                        product[i] = { ...product[i], orderQuantity: e.target.value };
                        setData({ ...data, products: product });
                      }}
                      className="px-2 py-1 w-[60%] bg-[#F6F4F4]  h-[25px] rounded-md"
                    />
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <div className="flex justify-center items-center">
                      <Select className="w-[50%] shadow-none bg-[#F6F4F4]" value={dropDowns?.uom?.filter((x) => x?._id === data?.products[i]?.uom)[0]?.value?.name}>
                        {dropDowns?.uom?.map((x: any) => (
                          <li
                            onClick={() => {
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
                    </div>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <div className="flex justify-center items-center">
                    <Select className="w-[50%] shadow-none bg-[#F6F4F4]" value={dropDowns?.packing?.filter((x) => x?._id === data?.products[i]?.packing)[0]?.value}>
                        {dropDowns?.packing?.map((x: any) => (
                          <li
                            onClick={() => {
                              const product = data?.products;
                              product[i] = { ...product[i], packing: x?._id };
                              setData({ ...data, products: product });
                            }}
                            className="px-3 hover:bg-slate-200 py-1 truncate transition-all duration-100"
                          >
                            {x?.value}
                          </li>
                        ))}
                      </Select>
                    </div>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <div className="flex justify-center items-center">
                    <Select className="w-[50%] shadow-none bg-[#F6F4F4]" value={dropDowns?.certificate?.filter((x) => x?._id === data?.products[i]?.certificate)[0]?.value}>
                        {dropDowns?.certificate?.map((x: any) => (
                          <li
                            onClick={() => {
                              const product = data?.products;
                              product[i] = { ...product[i], certificate: x?._id };
                              setData({ ...data, products: product });
                            }}
                            className="px-3 hover:bg-slate-200 py-1 truncate transition-all duration-100"
                          >
                            {x?.value}
                          </li>
                        ))}
                      </Select>
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

          <div className="w-full absolute bottom-4 justify-center items-center gap-3 flex mt-5">
            <button type="reset" className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" onClick={() => setData({ accountType: "", address: "", bussinessDocument: "", city: "", contactPerson: "", country: "", VendorName: "", vendorType: "", discountType: "", district: "", email: "", fileUrls: [], paymentTerms: "", pincode: "", primaryNumber: "", purchaseResitriction: "", secondaryNumber: "", state: "", zone: "" })}>
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
      {confirmation && <DeleteConfirmationBox
        posColor="bg-[#196000]"
          RejectFunction={() => setConfirmation(false)}
          ResolveFunction={handleSave}
          message="Do you want to save?"
          pos="save"
        />}
    </div>
  );
}

export default AddPurchaseOrder;
