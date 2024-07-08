/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Select from "../../../../components/Select";
import { useDispatch, useSelector } from "react-redux";
import {
  editPurchaseInward,
  getAllProductRawMaterial,
  getAllUserManagement,
  getAllVendorMaster,
  getPurchaseInwardById,
  // getPurchaseOrdeBySerialNumber,
  getType,
} from "../../../../utils/redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { fileServer } from "../../../../utils/values/publicValues";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./EditPurchaseInward.module.scss";
import DeleteConfirmationBox from "../../../../components/DeleteConfirmationBox";
import { formatDate } from "../../../../utils/functions/formats";
// import styles from "../PurchaseOrder.module.scss"

function EditPurchaseInward() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [places, setPlaces] = useState<{
    country: any[];
    state: any[];
    city: any[];
  }>({ country: [], state: [], city: [] });
  const [search, setSearch] = useState<{
    country: any[];
    state: any[];
    city: any[];
  }>({ country: [], state: [], city: [] });
  const [confirmation, setConfirmation] = useState(false);
  // const [serialNumber, setSerialNumber] = useState<string>("");
  const params: any = useParams();
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
    packing: any[];
    shipping: any[];
  }>({
    margin: [],
    account: [],
    discount: [],
    payment: [],
    document: [],
    uom: [],
    products: [],
    vendor: [],
    certificate: [],
    users: [],
    packing: [],
    shipping: [],
  });
  const dispatch: any = useDispatch();
  // const [dragging, setDragging] = useState(false);
  const [data, setData] = useState<any>({
    fileUrls: [],
    products: [{}],
  });

  const [searchValue, setSearchValue] = useState<{
    uom: any[];
    document: string;
    certificate: any[];
    products: any[];
    warehouse: string;
    vendor: string;
  }>({
    document: "",
    uom: [],
    products: [],
    vendor: "",
    certificate: [],
    warehouse: "",
  });

  const navigate = useNavigate();

  const handleSave = async () => {
    const val = data;
    for (let i = 0; i < val?.products?.length; i++) {
      if (val?.products[i]?.image) {
        const x = val?.products[i]?.image;
        const file = new FormData();
        file.append("file", x);
        const res = await axios.post(fileServer, file);
        val.products[i].image = res.data;
      }
    }

    let lineOfBusiness: string | null;
    if (user?.superAdmin) {
      lineOfBusiness = superAdminCompany?._id;
    } else {
      lineOfBusiness = user?.company;
    }

    dispatch(editPurchaseInward({ data: { ...val, lineOfBusiness }, id: params.id })).then(() => {
      navigate(-1);
    });
  };

  //   const handleFileSelect = (e: any) => {
  //     const selectedFiles = Array.from(e.target.files);

  //     setFiles([...files, ...selectedFiles]);
  //   };

  useEffect(() => {
    setSearchValue({
      ...searchValue,
      vendor: dropDowns?.vendor?.filter((x) => x?._id === data?.vendor)[0]?.VendorName,

      document: dropDowns?.document?.filter((x) => x?._id === data?.bussinessDocument)[0]?.value,

      uom: data?.products?.map((e: any) => {
        return dropDowns?.uom?.filter((uom: any) => uom._id === e.uom)[0]?.value?.name;
      }),

      warehouse: (user?.companyDetails?.[0]?.warehouse || superAdminCompany?.warehouse)?.filter((a: any) => a?.warehouseName === data?.warehouse?.warehouseName)[0]?.warehouseName,

      certificate: data?.products?.map((e: any) => {
        return dropDowns?.certificate?.filter((u: any) => u._id === e.certificate)[0]?.value;
      }),

      products: data?.products?.map((e: any) => {
        return dropDowns?.products?.filter((u: any) => u._id === e.productId)[0]?.productName;
      }),
    });
  }, [dropDowns, data]);

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

    dispatch(getPurchaseInwardById(params.id)).then((res: any) => {
      setData(res.payload);
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

    dispatch(getAllProductRawMaterial()).then((res: any) => {
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

  //   const handleDrop = (e: any) => {
  //     e.preventDefault();
  //     // setDragging(false);
  //     const droppedFiles = Array.from(e.dataTransfer.files);
  //     setFiles([...files, ...droppedFiles]);
  //   };

  return (
    <div className=" w-screen px-4 pt-3 shadow-md">
      <h1 className="roboto-bold text-lg">Edit Purchase Inward</h1>
      <div className="bg-[#F1F3FF] shadow-md p-3 rounded-lg w-full">
        <div className="flex items-center mb-5 gap-3">
          <label className="font-bold">GRN No</label>
          <input value={data?.seq} readOnly className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md focus:outline-none focus:ring-0" type="text" />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setConfirmation(true);
          }}
          className="shadow-md bg-white pb-[100px] px-4 h-full z-[0] relative rounded-lg pt-1 w-full"
        >
          <h1 className="roboto-medium mt-1">Vendor Details</h1>
          <div className="grid grid-cols-4 items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <div className="flex  items-center gap-3">
              <label>Vendor Name</label>

              <Select
                className="bg-white z-[990]"
                required
                pattern={dropDowns?.vendor?.filter((x) => x?.VendorName === searchValue?.vendor)[0]?.VendorName ? undefined : " "}
                title="Please Select values from drop down"
                onChange={(e) => {
                  setSearchValue({ ...searchValue, vendor: e.target.value });
                }}
                value={searchValue?.vendor || ""}
              >
                {dropDowns?.vendor
                  ?.filter((a) => a?.VendorName?.toLowerCase()?.includes(searchValue?.vendor?.toLowerCase() || ""))
                  .map((x) => (
                    <li
                      onClick={() => {
                        setSearchValue({
                          ...searchValue,
                          vendor: x?.VendorName,
                        });
                        setData({ ...data, vendor: x?._id });
                      }}
                      className="px-3 truncate bg-white hover:bg-slate-200 py-1 transition-all duration-100"
                    >
                      {x?.VendorName}
                    </li>
                  ))}
              </Select>
            </div>
           
            <div className="flex gap-3 items-center z-[99]">
              <label>Inward Date</label>
              <label htmlFor="date" className="w-[200px] flex items-center relative h-[25px] z-[900] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">
                <p>{data?.inwardDate}</p>
                <button type="button" className={styles.calendar}>
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6.11111H7.77778V8.88889H5V6.11111ZM8.88889 1.11111H8.33333V0H7.22222V1.11111H2.77778V0H1.66667V1.11111H1.11111C0.5 1.11111 0 1.61111 0 2.22222V10C0 10.6111 0.5 11.1111 1.11111 11.1111H8.88889C9.5 11.1111 10 10.6111 10 10V2.22222C10 1.61111 9.5 1.11111 8.88889 1.11111ZM8.88889 2.22222V3.33333H1.11111V2.22222H8.88889ZM1.11111 10V4.44444H8.88889V10H1.11111Z" fill="#5970F5" />
                  </svg>
                </button>
                <Calendar
                  value={data.inwardDate}
                  onChange={(e) => {
                    const date = new Date(e?.toString() || "");
                    const formattedDate = formatDate(date); // Extract the date in yyyy-mm-dd format
                    setData({ ...data, inwardDate: formattedDate });
                  }}
                  className={["bg-white absolute bottom-0 z-[909] translate-y-[100%] hidden   items-center  flex-col max-w-[277px_!important] " + styles.enableCalender]}
                />
              </label>
            </div>

            <div className="flex items-center gap-3">
              <label>Invoice Number</label>
              <input required value={data?.invoiceNumber} onChange={(e) => setData({ ...data, invoiceNumber: e.target.value })} className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" type="text" />
            </div>
            <div className="flex  items-center gap-3">
              <label>Invoice Date</label>
              <label htmlFor="date" className="w-[200px] flex items-center relative h-[25px] z-[900] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">
                <p>{data?.invoiceDate}</p>
                <button type="button" className={styles.calendar}>
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6.11111H7.77778V8.88889H5V6.11111ZM8.88889 1.11111H8.33333V0H7.22222V1.11111H2.77778V0H1.66667V1.11111H1.11111C0.5 1.11111 0 1.61111 0 2.22222V10C0 10.6111 0.5 11.1111 1.11111 11.1111H8.88889C9.5 11.1111 10 10.6111 10 10V2.22222C10 1.61111 9.5 1.11111 8.88889 1.11111ZM8.88889 2.22222V3.33333H1.11111V2.22222H8.88889ZM1.11111 10V4.44444H8.88889V10H1.11111Z" fill="#5970F5" />
                  </svg>
                </button>
                <Calendar
                  value={data?.invoiceDate}
                  onChange={(e) => {
                    const date = new Date(e?.toString() || "");
                    const formattedDate = formatDate(date);// Extract the date in yyyy-mm-dd format
                    setData({ ...data, invoiceDate: formattedDate });
                  }}
                  className={["bg-white absolute bottom-0 z-[909] translate-y-[100%] hidden   items-center  flex-col max-w-[277px_!important] " + styles.enableCalender]}
                />
              </label>
            </div>
            <div className="flex items-center gap-3">
              <label>DC Number</label>
              <input required value={data?.dcNumber} onChange={(e) => setData({ ...data, dcNumber: e.target.value })} className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" type="text" />
            </div>
            <div className="flex items-center gap-3">
              <label>Transporter</label>
              <input required value={data?.transporter} onChange={(e) => setData({ ...data, transporter: e.target.value })} className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" type="text" />
            </div>
            <div className="flex items-center gap-3">
              <label>Vehicle Number</label>
              <input required value={data?.vehicleNumber} onChange={(e) => setData({ ...data, vehicleNumber: e.target.value })} className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" type="text" />
            </div>
            <div className="flex gap-3 items-center">
              <label>Warehouse</label>

              <Select
                required
                pattern={(user?.companyDetails?.[0]?.warehouse || superAdminCompany?.warehouse)?.filter((a: any) => a?.address === searchValue?.warehouse)[0]?.address ? undefined : ""}
                title="Please Select values from drop down"
                onChange={(e) => {
                  setSearchValue({ ...searchValue, warehouse: e.target.value });
                }}
                value={searchValue?.warehouse || ""}
              >
                {(user?.companyDetails?.[0]?.warehouse || superAdminCompany?.warehouse)

                  ?.filter((a: any) => a?.address?.toLowerCase()?.includes(searchValue?.warehouse?.toLowerCase() || ""))
                  ?.map((x: any) => (
                    <li
                      onClick={() => {
                        setSearchValue({
                          ...searchValue,
                          warehouse: x?.address,
                        });
                        setData({ ...data, warehouse: x });
                      }}
                      className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                    >
                      {x?.warehouseName}
                    </li>
                  ))}
              </Select>
            </div>
          </div>

          <h1 className="roboto-medium mt-1">Product Details</h1>

          <table className="w-full text-[14px] border-collapse rounded border">
            <thead className="bg-[#5970F5]">
              <tr className=" text-white">
                <th className=" border-r w-1/12">Product Name</th>
                <th className="border-r w-1/12">Received Quantity</th>
                <th className="border-r w-1/12">Billed Quantity</th>
                <th className="border-r w-1/12">UOM</th>
                <th className="border-r w-1/12">Batch Number</th>
                <th className="border-r w-1/12">Expire Date</th>
                <th className="border-r w-1/12">Shortage</th>
                <th className="border-r w-1/12">Unit Price</th>
                <th className="border-r w-1/12">Total Value</th>
                <th className="border-r w-1/12">Remarks</th>
                <th className="border-r w-1/12">Certification</th>
                <th className="w-1/12">Upload</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((x: any, i: number) => (
                <tr className="text-center">
                  <td className="text-center  border  justify-center py-2 items-center ">
                    <div className="flex justify-center items-center">
                      <Select
                        required
                        className="w-[90%] z-[999] shadow-none bg-[#F6F4F4]"
                        pattern={dropDowns?.products?.filter((x) => x?.productName === searchValue?.products[i])[0]?.productName ? undefined : ""}
                        title="Please Select values from drop down"
                        onChange={(e) => {
                          const temp = searchValue?.products;
                          temp[i] = e.target.value;
                          setSearchValue({ ...searchValue, products: temp });
                        }}
                        value={searchValue?.products[i] || ""}
                      >
                        {dropDowns?.products
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
                                product[i] = {
                                  ...product[i],
                                  productId: x?._id,
                                };
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
                      required
                      type="number"
                      value={x.recievedQuantity}
                      onChange={(e) => {
                        const product = data?.products;
                        product[i] = { ...x, recievedQuantity: e.target.value };
                        setData({ ...data, products: product });
                      }}
                      className="px-2 py-1 w-[90%] bg-[#F6F4F4]  h-[25px] rounded-md"
                    />
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <input
                      required
                      type="text"
                      value={x.orderQuantity}
                      onChange={(e) => {
                        const product = data?.products;
                        product[i] = { ...x, orderQuantity: e.target.value };
                        setData({ ...data, products: product });
                      }}
                      className="px-2 py-1 w-[90%] bg-[#F6F4F4]  h-[25px] rounded-md"
                    />
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <Select
                      required
                      className="w-[90%] z-[999] shadow-none bg-[#F6F4F4]"
                      pattern={dropDowns?.uom?.filter((x) => x?.value?.name === searchValue?.uom[i])[0]?.value?.name ? undefined : ""}
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
                      required
                      type="text"
                      value={x?.batchNumber}
                      onChange={(e) => {
                        const product = data?.products;
                        product[i] = { ...x, batchNumber: e.target.value };
                        setData({ ...data, products: product });
                      }}
                      className="px-2 py-1 w-[90%] bg-[#F6F4F4]  h-[25px] rounded-md"
                    />
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <input
                      required
                      type="date"
                      value={x.expDate}
                      onChange={(e) => {
                        const product = data?.products;
                        console.log(e.target.value);
                        product[i] = { ...x, expDate: e.target.value };
                        setData({ ...data, products: product });
                      }}
                      className="px-2 py-1 w-[90%] bg-[#F6F4F4]  h-[25px] rounded-md"
                    />
                  </td>
                  <td className="text-center border w-[100px] justify-center py-2 items-center ">
                    <div className="px-2 py-1 w-[90%]  bg-[#F6F4F4]  h-[25px] rounded-md">
                      <span>{parseInt(x?.orderQuantity) - parseInt(x?.recievedQuantity) || 0}</span>
                    </div>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <div className="px-2 py-1 w-[90%]  bg-[#F6F4F4]  h-[25px] rounded-md">
                      <span>{dropDowns?.products?.filter((y) => y?._id === x?.productId)[0]?.mrp}</span>
                    </div>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <div className="px-2 py-1 w-[90%]  bg-[#F6F4F4]  h-[25px] rounded-md">
                      <span> {parseFloat(dropDowns?.products?.filter((y) => y?._id === x?.productId)[0]?.mrp) * parseInt(x?.recievedQuantity) || 0}</span>
                    </div>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <div className="flex justify-center items-center">
                      <input
                        required
                        type="text"
                        value={x.remarks}
                        onChange={(e) => {
                          const product = data?.products;
                          product[i] = { ...x, remarks: e.target.value };
                          setData({ ...data, products: product });
                        }}
                        className="px-2 py-1 w-[90%] bg-[#F6F4F4]  h-[25px] rounded-md"
                      />
                    </div>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <div className="flex justify-center items-center">
                      <Select
                        required
                        className="w-[90%] shadow-none bg-[#F6F4F4]"
                        pattern={dropDowns?.certificate?.filter((x) => x?.value === searchValue?.certificate[i])[0]?.value ? undefined : ""}
                        title="Please Select values from drop down"
                        onChange={(e) => {
                          const temp = searchValue?.certificate;
                          temp[i] = e.target.value;
                          setSearchValue({ ...searchValue, certificate: temp });
                        }}
                        value={searchValue?.certificate[i] || ""}
                      >
                        {dropDowns?.certificate
                          ?.filter((a) => a?.value?.toLowerCase()?.includes(searchValue?.certificate[i]?.toLowerCase() || ""))
                          ?.map((x) => (
                            <li
                              onClick={() => {
                                const temp = searchValue?.certificate;
                                temp[i] = x?.value;
                                setSearchValue({
                                  ...searchValue,
                                  certificate: temp,
                                });
                                const product = data?.products;
                                product[i] = {
                                  ...product[i],
                                  certificate: x?._id,
                                };
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

          <div className="w-full absolute bottom-4 justify-center items-center gap-3 flex mt-5">
            <button type="button" className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className=" rounded-md py-2 px-4 font-semibold bg-[#5970F5] text-white">
              Update
            </button>
          </div>
        </form>
      </div>
      {confirmation && <DeleteConfirmationBox posColor="bg-[#196000]" RejectFunction={() => setConfirmation(false)} ResolveFunction={handleSave} message="Do you want to update?" pos="update" />}
    </div>
  );
}

export default EditPurchaseInward;
