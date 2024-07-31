/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllProductFinishedGoods, getAllProductRawMaterial, getAllUserManagement, getAllVendorMaster, getOrderManagementById, getProductFinishedGoodsBatchNumberByProductId, getType, updateOrderManagementById } from "../../../utils/redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./EditOrderManagement.module.scss";
import { formatDate } from "../../../utils/functions/formats";
import Select from "../../../components/Select";
import DeleteConfirmationBox from "../../../components/DeleteConfirmationBox";
import { OrderManagementTypes} from "../../../utils/Type/types";

// import styles from "../PurchaseOrder.module.scss"

function EditOrderManagement() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [places, setPlaces] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });
  const [search, setSearch] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });
  const [confirmation, setConfirmation] = useState(false);
  const [products, setProducts] = useState<any[]>();
  const [batch, setBatch] = useState<any[]>([]);
  const superAdminCompany = useSelector((state: any) => state?.data?.superAdminCompany);
  const user = useSelector((state: any) => state?.data?.user);
  const [dropDowns, setDropDown] = useState<{
    margin: any[];
    account: any[];
    discount: any[];
    paymentTerm: any[];
    uom: any[];
    document: any[];
    certificate: any[];
    products: any[];
    users: any[];
    vendor: any[];
    transporter: any[];
    packing: any[];
    shipping: any[];
  }>({ margin: [], account: [], discount: [], paymentTerm: [], transporter: [], document: [], uom: [], products: [], vendor: [], certificate: [], users: [], packing: [], shipping: [] });
  const dispatch: any = useDispatch();
  // const [dragging, setDragging] = useState(false);
  const [data, setData] = useState<OrderManagementTypes>({
    products: [{}],
  });
  const params:any = useParams()


  const [searchValue, setSearchValue] = useState<{
    uom: any[];
    billing: string;
    shippingType: any[];
    sender: string;
    products: any[];
    grnNumber: any[];
    batchNumbers: any[];
    TransportationMode: string;
    transportationDistance: string;
    shippingAddress: string;
    paymentTerm: string;
  }>({
    uom: [],
    billing: "",
    sender: "",
    products: [],
    grnNumber: [],
    batchNumbers: [],
    TransportationMode: "",
    transportationDistance: "",
    shippingType: [],
    shippingAddress: "",
    paymentTerm: "",
  });

  const [selectedProduct, setSelectedProduct] = useState<any[]>([]);

  const navigate = useNavigate();

  const handleSave = async () => {
   

    // let lineOfBusiness: string | undefined;
    // if (user?.superAdmin) {
    //   lineOfBusiness = superAdminCompany?._id;
    // } else {
    //   lineOfBusiness = user?.company;
    // }
    dispatch(updateOrderManagementById({ data,id:params.id })).then(() => {
      navigate(-1);
    });
  };

  useEffect(() => {
    const res1 = dispatch(getType("marginSetting"));
    dispatch(getOrderManagementById(params.id)).then((res:any)=>{
      console.log(res.payload)
      setData(res.payload)
    })
    res1.then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          margin: res?.payload?.[0]?.marginSettingType,
        };
      });
    });
    dispatch(getAllProductFinishedGoods()).then((res: any) => {
      setProducts(res?.payload?.active);
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

    dispatch(getType("discount")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          discount: res?.payload?.[0]?.discountType,
        };
      });
    });

    dispatch(getType("packing")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          packing: res?.payload?.[0]?.packingType,
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
    dispatch(getType("certification")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          certificate: res?.payload?.[0]?.certificationType,
        };
      });
    });

    dispatch(getType("shipping")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          shipping: res?.payload?.[0]?.shippingType,
        };
      });
    });

    dispatch(getAllProductRawMaterial()).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          products: res?.payload?.active,
        };
      });
    });

    dispatch(getType("paymentTerm")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          paymentTerm: res?.payload?.[0]?.paymentTerm,
        };
      });
    });

    dispatch(getType("document")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          document: res?.payload?.[0]?.documentType,
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
  console.log("daf",data);
  useEffect(()=>{
    setSearchValue({
      ...searchValue,
      uom: data?.products?.map((e: any) => {
        return dropDowns?.uom?.filter((uom: any) => uom._id === e.uom)[0]?.value
          ?.name;
      }) || [],

      shippingType: data?.products?.map((e) => {
        return dropDowns?.shipping?.filter((x: any) => x._id === e.shippingMethod)[0]?.value;
      }) || [],

      shippingAddress:
        dropDowns?.users[0]?.companyDetails[0]?.shippingAddress?.filter(
          (a: any) => a?.address === data?.shipping?.address
        )[0]?.address,
        billing:dropDowns?.users[0]?.companyDetails[0]?.billingAddress?.filter(
          (a: any) => a?.address === data?.billing?.address
        )[0]?.address,
        paymentTerm:dropDowns?.paymentTerm?.filter(
          (a: any) => a?._id === data?.paymentTerm
        )[0]?.value,
        products:data.products?.map((x)=>(products?.find((y)=>y._id===x.productId).productName)) || [],
        batchNumbers:data.products?.map((x)=>(x.batchNumbers)) || [],

    });
  },[dropDowns])
  

  return (
    <div className=" w-screen px-4 pt-3 shadow-md">
      <h1 className="roboto-bold text-lg">Edit Order Entry</h1>

      <div className="bg-[#F1F3FF] shadow-md p-3 rounded-lg w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setConfirmation(true);
          }}
          className="shadow-md bg-white pb-[100px] px-4 h-full z-[0] relative rounded-lg pt-1 w-full"
        >
          <h1 className="roboto-medium mt-1">Order Details</h1>
          <div className="grid grid-cols-4 items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <div className="flex  items-center gap-x-8">
              <label>Order Number</label>
              <input type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md" value={data?.orderNum} onChange={(e) => setData({ ...data, orderNum: e.target.value })} />
            </div>

            <div className="flex  items-center gap-x-8">
              <label>Order Value</label>
              <input type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" value={data?.orderVal} onChange={(e) => setData({ ...data, orderVal: e.target.value })} />
            </div>
            <div className="flex  items-center gap-x-8">
              <label>Delivery Date</label>
              <label htmlFor="date" className="w-[200px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">
                <p>{data?.delivery}</p>
                <button type="button" className={styles.calendar}>
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6.11111H7.77778V8.88889H5V6.11111ZM8.88889 1.11111H8.33333V0H7.22222V1.11111H2.77778V0H1.66667V1.11111H1.11111C0.5 1.11111 0 1.61111 0 2.22222V10C0 10.6111 0.5 11.1111 1.11111 11.1111H8.88889C9.5 11.1111 10 10.6111 10 10V2.22222C10 1.61111 9.5 1.11111 8.88889 1.11111ZM8.88889 2.22222V3.33333H1.11111V2.22222H8.88889ZM1.11111 10V4.44444H8.88889V10H1.11111Z" fill="#5970F5" />
                  </svg>
                </button>
                <Calendar
                  value={data?.delivery}
                  onChange={(e) => {
                    const date = new Date(e?.toString() || "");
                    const formattedDate = formatDate(date); // Extract the date in yyyy-mm-dd format
                    setData({ ...data, delivery: formattedDate });
                  }}
                  className={["bg-white absolute bottom-0 z-[909] translate-y-[100%] hidden   items-center  flex-col max-w-[277px_!important] " + styles.enableCalender]}
                />
              </label>
            </div>
            <div className="flex gap-x-8 z-[96] items-center">
              <label>Billing Address</label>
              <Select
                title="Please Select values from drop down"
                onChange={(e) => {
                  setSearchValue({ ...searchValue, billing: e.target.value });
                }}
                value={searchValue?.billing || ""}
              >
                {(user?.companyDetails?.[0]?.billingAddress || superAdminCompany?.billingAddress)
                  ?.filter((a: any) => a?.address?.toLowerCase()?.includes(searchValue?.billing?.toLowerCase() || ""))
                  ?.map((x: any) => (
                    <li
                      onClick={() => {
                        setSearchValue({ ...searchValue, billing: x?.address });
                        setData({ ...data, billing: x });
                      }}
                      className="px-3 truncate hover:bg-slate-200 py-1 transition-all duration-100"
                    >
                      {x?.address}
                    </li>
                  ))}
              </Select>
            </div>

            <div className="flex gap-x-3  items-center">
              <label>Shipping Address</label>
              <Select
                value={searchValue?.shippingAddress || ""}
                className="z-[999]"
                onChange={(e) => {
                  setSearchValue({
                    ...searchValue,
                    shippingAddress: e.target.value,
                  });
                }}
                title="Please Select values from drop down"
              >
                {(user?.companyDetails?.[0]?.shippingAddress || superAdminCompany?.shippingAddress)
                  ?.filter((a: any) => a?.address?.toLowerCase()?.includes(searchValue?.shippingAddress?.toLowerCase() || ""))
                  ?.map((x: any) => (
                    <li
                      onClick={() => {
                        setSearchValue({
                          ...searchValue,
                          shippingAddress: x?.address,
                        });
                        setData({ ...data, shipping: x });
                      }}
                      className="px-3 truncate hover:bg-slate-200 py-1 transition-all duration-100"
                    >
                      {x?.address}
                    </li>
                  ))}
              </Select>
            </div>

            <div className="flex gap-x-8 z-[96] items-center">
              <label>PO Number</label>
              <input type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" value={data?.poNum} onChange={(e) => setData({ ...data, poNum: e.target.value })} />
            </div>
            <div className="flex  items-center gap-x-[24px]">
              <label>Contact Name</label>
              <input type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" value={data?.contactName} onChange={(e) => setData({ ...data, contactName: e.target.value })} />
            </div>
            <div className="flex items-center gap-x-6">
              <label>Contact Number</label>
              <input type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" value={data?.contactNum} onChange={(e) => setData({ ...data, contactNum: e.target.value })} />
              {/* <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md">{dropDowns?.users?.filter((x) => x?._id === data?.contact)?.[0]?.phoneNumber}</label> */}
            </div>
            <div className="flex gap-x-5  items-center">
              <label>Payment Terms </label>
              <Select
                className="z-[998]"
                title="Please Select values from drop down"
                onChange={(e) => {
                  setSearchValue({
                    ...searchValue,
                    paymentTerm: e.target.value,
                  });
                }}
                value={searchValue?.paymentTerm || ""}
              >
                {dropDowns?.paymentTerm
                  ?.filter((a) => a?.value?.toLowerCase()?.includes(searchValue?.paymentTerm?.toLowerCase() || ""))
                  ?.map((x) => (
                    <li
                      onClick={() => {
                        setSearchValue({
                          ...searchValue,
                          paymentTerm: x?.value,
                        });
                        setData({ ...data, paymentTerm: x?._id });
                      }}
                      className="px-3 hover:bg-slate-200 py-1 transition-all  duration-100"
                    >
                      {x?.value}
                    </li>
                  ))}
              </Select>
            </div>
          </div>

          <h1 className="roboto-medium mt-1">Product Details</h1>

          <table className="w-full  text-[14px] border-collapse rounded border">
            <thead className="bg-[#5970F5]">
              <tr className=" text-white">
                <th className=" border-r w-1/10">Product Name</th>
                <th className=" border-r w-2/10">Product Description</th>
                <th className=" border-r w-1/10">Batch Number</th>
                <th className=" border-r w-1/10">Order Quantity</th>
                <th className=" border-r w-1/10">UOM</th>
                <th className=" border-r w-1/10">Price</th>
                <th className=" border-r w-1/10">Shipping Method</th>
                <th className=" border-r w-1/10">Delivery Date</th>
                <th className=" border-r w-1/10">Item Value</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((x: any, i: number) => (
                <tr className={`text-center relative `} style={{ zIndex: 500 - i }}>
                  <td className="text-center  border  justify-center py-2 items-center ">
                    <div className="flex justify-center items-center">
                      <Select
                        className="w-[90%] z-[999] shadow-none bg-[#e2e2e2]"
                        title="Please Select values from drop down"
                        onChange={(e) => {
                          const temp = searchValue?.products;
                          temp[i] = e.target.value;
                          setSearchValue({ ...searchValue, products: temp });
                        }}
                        value={searchValue?.products[i] || ""}
                      >
                        {products
                          ?.filter((a) => a?.productName?.toLowerCase()?.includes(searchValue?.products[i]?.toLowerCase() || ""))
                          ?.map((x) => (
                            <li
                              onClick={() => {
                                const temp = searchValue?.products;
                                temp[i] = x?.productName;
                                setSearchValue({
                                  ...searchValue,
                                  products: temp,
                                });
                                const product = data?.products;
                                if (product) {
                                  product[i] = {
                                    ...product[i],
                                    productId: x?._id,
                                    price:parseInt(x?.mrp)
                                  };
                                }
                                const tempBatch = batch;

                                dispatch(getProductFinishedGoodsBatchNumberByProductId(x?._id)).then((res: any) => {
                                  tempBatch[i] = res.payload;
                                  console.log(res.payload);
                                  setBatch([...tempBatch]);
                                });
                                setData({ ...data, products: product });
                                const temp1 = selectedProduct;
                                temp1[i] = x;
                                setSelectedProduct(temp1);
                              }}
                              className="px-3 hover:bg-slate-200 py-1 truncate transition-all duration-100"
                            >
                              {x?.productName || "No Name"}
                            </li>
                          ))}
                      </Select>
                    </div>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">{products?.find((x) => x?.productName === searchValue.products[i])?.productDes}</td>
                  {/* batch number */}
                  <td className="text-center  border  justify-center py-2 items-center ">
                    <div className="flex justify-center items-center">
                      <Select
                        style={{ zIndex: 997 - i }}
                        className="w-[90%] shadow-none bg-[#e2e2e2]"
                        title="Please Select values from drop down"
                        onChange={(e) => {
                          const temp = searchValue?.batchNumbers;
                          temp[i] = e.target.value;
                          setSearchValue({ ...searchValue, batchNumbers: temp });
                        }}
                        value={searchValue?.batchNumbers[i] || ""}
                      >
                        {batch[0]
                          ?.filter((a: any) => a?.batchNumbers?.toLowerCase()?.includes(searchValue?.batchNumbers[i]?.toLowerCase() || ""))

                          ?.map((x: any) => (
                            <li
                              onClick={() => {
                                const temp = searchValue?.batchNumbers;
                                temp[i] = x?.batchNumbers;
                                setSearchValue({ ...searchValue, batchNumbers: temp });

                                const product = data?.products;
                                if(product)
                                product[i] = { ...product[i], batchNumbers: x?.batchNumbers };
                                setData({ ...data, products: product });
                              }}
                              className="px-3 hover:bg-slate-200 py-1 truncate transition-all duration-100"
                            >
                              {x?.batchNumbers}
                            </li>
                          ))}
                      </Select>
                    </div>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    {/* order Quantity */}
                    <div className="w-full flex">
                      <input
                        type="number"
                        value={x.orderQuantity}
                        onChange={(e) => {
                          if (parseInt(e.target.value || "0") <= parseInt(searchValue.batchNumbers[i] && batch[0]?.filter((e: any) => e.batchNumbers === searchValue?.batchNumbers[i])?.[0]?.quantity)) {
                            const product = data?.products;
                            if(product)
                            product[i] = { ...x, orderQuantity: parseInt(e.target.value) };
                            setData({ ...data, products: product });
                          }
                        }}
                        className="px-2 py-1 w-[73%] bg-[#e2e2e2]  h-[25px] rounded-md"
                      />
                      <label className="px-2 py-1 w-[15%] ms-1 bg-[#e2e2e2]  h-[25px] rounded-md"> {searchValue.batchNumbers[i] && batch[0]?.filter((e: any) => e.batchNumbers === searchValue?.batchNumbers[i])?.[0]?.quantity}</label>
                    </div>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <Select
                      style={{ zIndex: 997 - i }}
                      className="w-[90%] shadow-none bg-[#e2e2e2]"
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
                              if(product)
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
                      value={x?.price}
                      onChange={(e) => {
                        const product = data?.products;
                        if(product)
                        product[i] = { ...x, price: e.target.value };
                        setData({ ...data, products: product });
                      }}
                      className="px-2 py-1 w-[90%] bg-[#e2e2e2]  h-[25px] rounded-md"
                    />
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <Select
                      style={{ zIndex: 997 - i }}
                      className="w-[90%] shadow-none bg-[#e2e2e2]"
                      title="Please Select values from drop down"
                      onChange={(e) => {
                        const temp = searchValue?.shippingType;
                        temp[i] = e.target.value;
                        setSearchValue({ ...searchValue, shippingType: temp });
                      }}
                      value={searchValue?.shippingType[i] || ""}
                    >
                      {dropDowns?.shipping
                        ?.filter((a) => a?.value.toLowerCase()?.includes(searchValue?.shippingType[i]?.toLowerCase() || ""))
                        ?.map((x) => (
                          <li
                            onClick={() => {
                              const temp = searchValue?.shippingType;
                              temp[i] = x?.value;
                              setSearchValue({ ...searchValue, shippingType: temp });

                              const product = data?.products;
                              if(product)
                              product[i] = { ...product[i], shippingMethod: x?._id };
                              setData({ ...data, products: product });
                            }}
                            className="px-3 hover:bg-slate-200 py-1 truncate transition-all duration-100"
                          >
                            {x?.value}
                          </li>
                        ))}
                    </Select>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <input
                      type="date"
                      value={x.expDate}
                      onChange={(e) => {
                        const product = data?.products;
                        if(product)
                        product[i] = { ...x, deliveryDate: e.target.value };
                        setData({ ...data, products: product });
                      }}
                      className="px-2 py-1 w-[90%] bg-[#e2e2e2]  h-[25px] rounded-md"
                    />
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                   {x.price*x.orderQuantity || 0}
                  </td>

                  {i > 0 && (
                    <td >
                      <button
                        type="button"
                        onClick={() => 
                          {
                           
                          const product = data.products;
                          if(product)
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
            <button type="button" onClick={() => setData({ ...data, products: [...(data.products||[]), {}] })} className="bg-[#5970F5] text-white px-4 py-2 rounded-md">
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

export default EditOrderManagement;
