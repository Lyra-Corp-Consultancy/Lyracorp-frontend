/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Select from "../../../../components/Select";
import { useDispatch, useSelector } from "react-redux";
import { addRawMaterialOutward, getAllProductRawMaterial, getAllUserManagement, getAllVendorMaster, getProductFromPurchaseOrderByGRNAndQuantity, getType } from "../../../../utils/redux/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./AddStockCheck.module.scss";
import DeleteConfirmationBox from "../../../../components/DeleteConfirmationBox";
import { RawMaterialOutward } from "../../../../utils/Type/types";
// import { formatDate } from "../../../../utils/functions/formats";
// import styles from "../PurchaseOrder.module.scss"

function ViewStockCheck() {
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
  const [data, setData] = useState<RawMaterialOutward>({
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
  }>({
    uom: [],
    Receiver: "",
    sender: "",
    products: [],
    grnNumber: [],
    TransportationMode: "",
    transportationDistance: "",
    shippingAddress: "",
  });

  const [selectedProduct, setSelectedProduct] = useState<any[]>([]);

  const navigate = useNavigate();

  const handleSave = async () => {
    const val = data;

    let lineOfBusiness: string | undefined;
    if (user?.superAdmin) {
      lineOfBusiness = superAdminCompany?._id;
    } else {
      lineOfBusiness = user?.company;
    }

    dispatch(addRawMaterialOutward({ ...val, lineOfBusiness })).then(() => {
      navigate(-1);
    });
  };

  //   const handleFileSelect = (e: any) => {
  //     const selectedFiles = Array.from(e.target.files);

  //     setFiles([...files, ...selectedFiles]);
  //   };
  useEffect(() => {
    const res1 = dispatch(getType("marginSetting"));

    res1.then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          margin: res?.payload?.[0]?.marginSettingType,
        };
      });
    });
    dispatch(getProductFromPurchaseOrderByGRNAndQuantity()).then((res: any) => {
      setProducts(res?.payload);
      console.log("res ", res);
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
          certificate: res?.payload?.[0]?.certificationType,
        };
      });
      console.log(res.payload);
    });

    dispatch(getType("shipping")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          shipping: res?.payload?.[0]?.shippingType,
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
          payment: res?.payload?.[0]?.paymentType,
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

  //   const handleDrop = (e: any) => {
  //     e.preventDefault();
  //     // setDragging(false);
  //     const droppedFiles = Array.from(e.dataTransfer.files);
  //     setFiles([...files, ...droppedFiles]);
  //   };

  return (
    <div className=" w-screen px-4 pt-3 shadow-md">
      <h1 className="roboto-bold text-lg">View Stock Check</h1>

      <div className="bg-[#F1F3FF] shadow-md p-3 rounded-lg w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(data);
            setConfirmation(true);
          }}
          className="shadow-md bg-white pb-[100px] px-4 h-full z-[0] relative rounded-lg pt-1 w-full"
        >
          <h1 className="roboto-medium mt-1">Storage Location Details</h1>
          <div className="grid grid-cols-4 items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <div className="flex  items-center gap-3 justify-between">
              <label>Warehouse Name</label>

              <Select
                required
                pattern={superAdminCompany?.warehouse?.filter((a: any) => a?.warehouseName === searchValue?.sender || "")?.[0]?.warehouseName ? undefined : ""}
                title="Please Select values from drop down"
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

            <div className="flex items-center gap-3 justify-between">
              <label>Product Name</label>
              <input required value={data.remarks} onChange={(e) => setData({ ...data, remarks: e.target.value })} className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" type="text" />
            </div>
            <div className="flex items-center gap-3 justify-between">
              <label>Batch Number</label>
              <input required value={data.billOfLading} onChange={(e) => setData({ ...data, billOfLading: e.target.value })} className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" type="text" />
            </div>
            <button type="submit">
              <svg width="71" height="35" viewBox="0 0 71 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="71" height="35" rx="5" fill="#5970F5" />
                <path d="M21.6667 21.6667L25 25M10 16.6667C10 18.4348 10.7024 20.1305 11.9526 21.3807C13.2029 22.631 14.8986 23.3333 16.6667 23.3333C18.4348 23.3333 20.1305 22.631 21.3807 21.3807C22.631 20.1305 23.3333 18.4348 23.3333 16.6667C23.3333 14.8986 22.631 13.2029 21.3807 11.9526C20.1305 10.7024 18.4348 10 16.6667 10C14.8986 10 13.2029 10.7024 11.9526 11.9526C10.7024 13.2029 10 14.8986 10 16.6667Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M37.5327 12.7578V22H35.9395V12.7578H37.5327ZM41.3032 16.8013V18.0645H37.1265V16.8013H41.3032ZM41.8301 12.7578V14.0273H37.1265V12.7578H41.8301ZM44.585 15.1318V22H43.0488V15.1318H44.585ZM42.9473 13.3291C42.9473 13.0964 43.0234 12.9038 43.1758 12.7515C43.3324 12.5949 43.5482 12.5166 43.8232 12.5166C44.0941 12.5166 44.3078 12.5949 44.4644 12.7515C44.6209 12.9038 44.6992 13.0964 44.6992 13.3291C44.6992 13.5576 44.6209 13.748 44.4644 13.9004C44.3078 14.0527 44.0941 14.1289 43.8232 14.1289C43.5482 14.1289 43.3324 14.0527 43.1758 13.9004C43.0234 13.748 42.9473 13.5576 42.9473 13.3291ZM47.7778 16.5981V22H46.248V15.1318H47.689L47.7778 16.5981ZM47.5049 18.312L47.0098 18.3057C47.014 17.819 47.0817 17.3726 47.2129 16.9663C47.3483 16.5601 47.5345 16.2109 47.7715 15.9189C48.0127 15.627 48.3005 15.4027 48.6348 15.2461C48.9691 15.0853 49.3415 15.0049 49.752 15.0049C50.082 15.0049 50.3804 15.0514 50.647 15.1445C50.9178 15.2334 51.1484 15.3794 51.3389 15.5825C51.5335 15.7856 51.6816 16.0501 51.7832 16.376C51.8848 16.6976 51.9355 17.0933 51.9355 17.563V22H50.3994V17.5566C50.3994 17.2266 50.3507 16.9663 50.2534 16.7759C50.1603 16.5812 50.0228 16.4437 49.8408 16.3633C49.6631 16.2786 49.4409 16.2363 49.1743 16.2363C48.9119 16.2363 48.6771 16.2913 48.4697 16.4014C48.2624 16.5114 48.0868 16.6616 47.9429 16.8521C47.8032 17.0425 47.6953 17.2625 47.6191 17.5122C47.543 17.7619 47.5049 18.0285 47.5049 18.312ZM57.6865 20.5781V12.25H59.2227V22H57.8325L57.6865 20.5781ZM53.2178 18.6421V18.5088C53.2178 17.9883 53.2791 17.5143 53.4019 17.0869C53.5246 16.6553 53.7023 16.285 53.9351 15.9761C54.1678 15.6629 54.4513 15.4238 54.7856 15.2588C55.12 15.0895 55.4966 15.0049 55.9155 15.0049C56.3302 15.0049 56.6942 15.0853 57.0073 15.2461C57.3205 15.4069 57.5871 15.6375 57.8071 15.938C58.0272 16.2342 58.2028 16.5897 58.334 17.0044C58.4652 17.4149 58.5583 17.8719 58.6133 18.3755V18.8008C58.5583 19.2917 58.4652 19.7402 58.334 20.1465C58.2028 20.5527 58.0272 20.904 57.8071 21.2002C57.5871 21.4964 57.3184 21.7249 57.001 21.8857C56.6878 22.0465 56.3218 22.127 55.9028 22.127C55.4881 22.127 55.1136 22.0402 54.7793 21.8667C54.4492 21.6932 54.1678 21.4499 53.9351 21.1367C53.7023 20.8236 53.5246 20.4554 53.4019 20.0322C53.2791 19.6048 53.2178 19.1414 53.2178 18.6421ZM54.7476 18.5088V18.6421C54.7476 18.9552 54.7751 19.2472 54.8301 19.5181C54.8893 19.7889 54.9803 20.028 55.103 20.2354C55.2257 20.4385 55.3844 20.5993 55.5791 20.7178C55.778 20.832 56.015 20.8892 56.29 20.8892C56.637 20.8892 56.9227 20.813 57.147 20.6606C57.3713 20.5083 57.5469 20.3031 57.6738 20.0449C57.805 19.7826 57.8939 19.4906 57.9404 19.1689V18.02C57.915 17.7703 57.8621 17.5376 57.7817 17.3218C57.7056 17.106 57.6019 16.9176 57.4707 16.7568C57.3395 16.5918 57.1766 16.4648 56.9819 16.376C56.7915 16.2829 56.5651 16.2363 56.3027 16.2363C56.0234 16.2363 55.7865 16.2956 55.5918 16.4141C55.3971 16.5326 55.2363 16.6955 55.1094 16.9028C54.9867 17.1102 54.8957 17.3514 54.8364 17.6265C54.7772 17.9015 54.7476 18.1956 54.7476 18.5088Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>

          <h1 className="roboto-medium mt-1">Product Details</h1>

          <table className="w-full text-[14px] border-collapse rounded border">
            <thead className="bg-[#5970F5]">
              <tr className=" text-white">
                <th className="border-r w-1/8">Product Name</th>
                <th className="border-r w-1/8">Batch Number</th>
                <th className="border-r w-1/8">Product Quantity</th>
                <th className="border-r w-1/8">Expiry Date</th>
                <th className="border-r w-1/8">Shortage</th>
                <th className="border-r w-1/8">Overage</th>
                <th className="border-r w-1/8">Warehouse Name</th>
                <th className="border-r w-1/8">Pick Location</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((x: any, i: number) => (
                <tr className={`text-center relative `} style={{ zIndex: 500 - i }}>
                  <td className="text-center  border  justify-center py-2 items-center ">
                    <div className="flex justify-center items-center">
                      <Select
                        required
                        className="w-[90%] z-[999] shadow-none bg-[#e2e2e2]"
                        pattern={products?.filter((x) => x?.name === searchValue.products[i])[0]?.name ? undefined : ""}
                        title="Please Select values from drop down"
                        onChange={(e) => {
                          const temp = searchValue?.products;
                          temp[i] = e.target.value;
                          setSearchValue({ ...searchValue, products: temp });
                        }}
                        value={searchValue?.products[i] || ""}
                      >
                        {products
                          ?.filter((a) => a?.name?.toLowerCase()?.includes(searchValue?.products[i]?.toLowerCase() || ""))
                          ?.map((x) => (
                            <li
                              onClick={() => {
                                const temp = searchValue?.products;
                                temp[i] = x?.name;
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
                                const temp1 = selectedProduct;
                                temp1[i] = x;
                                setSelectedProduct(temp1);
                              }}
                              className="px-3 hover:bg-slate-200 py-1 truncate transition-all duration-100"
                            >
                              {x?.name || "No Name"}
                            </li>
                          ))}
                      </Select>
                    </div>
                  </td>
                  <td>2</td>
                  <td>3</td>
                  <td>4</td>
                  <td>5</td>
                  <td>6</td>
                  <td>7</td>
                  <td>8</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex mt-3 w-full items-end justify-end">
            <button type="button" onClick={() => setData({ ...data, products: [...data.products, {}] })} className="bg-[#5970F5] text-white px-4 py-2 rounded-md">
              + Add More{" "}
            </button>
          </div>

          <div className="w-full absolute bottom-4 justify-center items-center  gap-3 flex mt-5">
            <button type="button" className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="button" className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" onClick={() => navigate("/inventory/stock-check/edit")}>
              Edit
            </button>
            <button type="submit" className=" rounded-md py-2 px-4 font-semibold bg-[#5970F5] text-white">
              Print
            </button>
          </div>
        </form>
      </div>
      {confirmation && <DeleteConfirmationBox posColor="bg-[#196000]" RejectFunction={() => setConfirmation(false)} ResolveFunction={handleSave} message="Do you want to save?" pos="save" />}
    </div>
  );
}

export default ViewStockCheck;
