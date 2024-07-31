/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { getAllQCPO, getAllUserManagement, getAllVendorMaster, getType } from "../../../utils/redux/actions";
import styles from "./StockCheckList.module.scss";

function StockCheckList() {
  // const [data, setData] = useState<any[]>([]);
  // const [filtered, setFiltered] = useState<any[]>([]);
  // const dispatch: any = useDispatch();
  const navigate = useNavigate();
  // const [dropDowns, setDropDown] = useState<{
  //   vendor: any[];
  //   vendorType: any[];
  //   account: any[];
  //   users: any[];
  //   discount: any[];
  //   payment: any[];
  //   document: any[];
  //   shippingMethods: any[];
  // }>({ vendor: [], account: [], discount: [], payment: [], document: [], vendorType: [], users: [], shippingMethods: [] });

  // const search = (val: string) => {
  //   const lowerVal = val.toLowerCase();
  //   const vendor = dropDowns.vendor
  //     .filter((x) => x?.VendorName?.toLowerCase()?.includes(lowerVal))
  //     .map((x) => {
  //       return x?._id;
  //     });

  //   console.log(vendor);

  //   const active = data.filter((x) => {
  //     console.log(x);
  //     if (vendor.includes(x?.vendor) || x?.seq?.toLowerCase()?.includes(lowerVal)) {
  //       return x;
  //     }
  //   });

  //   // setFiltered(active);
  // };

  // useEffect(() => {
  //   dispatch(getAllQCPO()).then((res: any) => {
  //     setData(res.payload);
  //     // setFiltered(res.payload);
  //   });

  //   const res1 = dispatch(getType("vendor"));

  //   res1.then((res: any) => {
  //     setDropDown((prev) => {
  //       return {
  //         ...prev,
  //         vendorType: res?.payload[0]?.vendorType,
  //       };
  //     });
  //   });

  //   dispatch(getAllUserManagement()).then((res: any) => {
  //     setDropDown((prev) => {
  //       return {
  //         ...prev,
  //         users: res?.payload?.active,
  //       };
  //     });
  //     console.log(res.payload);
  //   });
  //   const res2 = dispatch(getType("account"));

  //   res2.then((res: any) => {
  //     setDropDown((prev) => {
  //       return {
  //         ...prev,
  //         account: res?.payload[0]?.accountType,
  //       };
  //     });
  //   });

  //   dispatch(getAllVendorMaster()).then((res: any) => {
  //     console.log(res?.payload?.active);
  //     setDropDown((prev) => {
  //       return {
  //         ...prev,
  //         vendor: res?.payload?.active,
  //       };
  //     });
  //   });

  //   dispatch(getType("discount")).then((res: any) => {
  //     setDropDown((prev) => {
  //       return {
  //         ...prev,
  //         discount: res?.payload[0]?.discountType,
  //       };
  //     });
  //   });

  //   dispatch(getType("shipping")).then((res: any) => {
  //     setDropDown((prev) => {
  //       return {
  //         ...prev,
  //         shippingMethods: res?.payload[0]?.shippingType,
  //       };
  //     });
  //   });

  //   dispatch(getType("payment")).then((res: any) => {
  //     setDropDown((prev) => {
  //       return {
  //         ...prev,
  //         payment: res?.payload[0]?.paymentType,
  //       };
  //     });
  //   });

  //   dispatch(getType("document")).then((res: any) => {
  //     setDropDown((prev) => {
  //       return {
  //         ...prev,
  //         document: res?.payload[0]?.documentType,
  //       };
  //     });
  //   });
  // }, []);
  return (
    <div className="h-[83vh] w-screen">
      <div className="w-full px-5 h-[90%] pt-2">
        <h1 className="text-xl roboto-bold">Stock Check  </h1>
        <div className="bg-[#F1F3FF] shadow-md mt-2 w-full p-4 rounded-lg h-full">
          <div className="bg-white rounded-lg w-full pt-3 h-[80%] shadow-md mt-0">
            <h2 className="roboto-bold ms-3 text-[20px] text-center">Stock Check List</h2>
            <div className="grid grid-cols-4 items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-[98%] ml-[17px] rounded-lg px-3 py-2">
            <div className="flex  items-center gap-3 justify-between">
              <label>Warehouse Name</label>

              {/* <Select
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
              </Select> */}
            </div>

            <div className="flex items-center gap-3 justify-between">
              <label>Product Name</label>
              <input 
              // required value={data.remarks} onChange={(e) => setData({ ...data, remarks: e.target.value })} 
              className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" type="text" />
            </div>
            <div className="flex items-center gap-3 justify-between">
              <label>Batch Number</label>
              <input required
              //  value={data.billOfLading} onChange={(e) => setData({ ...data, billOfLading: e.target.value })} 
              className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" type="text" />
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
            {/* <div className="px-4 flex justify-between">
              <label className="flex px-3 w-2/5 rounded-md py-1 mt-2 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] items-center gap-3" htmlFor="">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.625 10.625L13.125 13.125M1.875 6.875C1.875 8.20108 2.40178 9.47285 3.33947 10.4105C4.27715 11.3482 5.54892 11.875 6.875 11.875C8.20108 11.875 9.47285 11.3482 10.4105 10.4105C11.3482 9.47285 11.875 8.20108 11.875 6.875C11.875 5.54892 11.3482 4.27715 10.4105 3.33947C9.47285 2.40178 8.20108 1.875 6.875 1.875C5.54892 1.875 4.27715 2.40178 3.33947 3.33947C2.40178 4.27715 1.875 5.54892 1.875 6.875Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <input type="text" onChange={(e) => search(e.target.value)} placeholder="Search" className="placeholder:text-black outline-none border-none w-full" />
              </label>
              <div className="flex items-center gap-3">
                <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.33333 6.22222L6.22222 3.11111V5.44444H0V7H6.22222V9.33333M14 10.8889V1.55556C14 1.143 13.8361 0.747335 13.5444 0.455612C13.2527 0.163888 12.857 0 12.4444 0H3.11111C2.69855 0 2.30289 0.163888 2.01117 0.455612C1.71944 0.747335 1.55556 1.143 1.55556 1.55556V3.88889H3.11111V1.55556H12.4444V10.8889H3.11111V8.55556H1.55556V10.8889C1.55556 11.3014 1.71944 11.6971 2.01117 11.9888C2.30289 12.2806 2.69855 12.4444 3.11111 12.4444H12.4444C12.857 12.4444 13.2527 12.2806 13.5444 11.9888C13.8361 11.6971 14 11.3014 14 10.8889Z" fill="#5970F5" />
                </svg>
                <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 6.18182L13.9091 3.09091V5.40909H6.95455V6.95454H13.9091V9.27273M0 10.8182V1.54545C0 1.13557 0.162824 0.742482 0.452653 0.452653C0.742482 0.162824 1.13557 0 1.54545 0H10.8182C11.2281 0 11.6212 0.162824 11.911 0.452653C12.2008 0.742482 12.3636 1.13557 12.3636 1.54545V3.86364H10.8182V1.54545H1.54545V10.8182H10.8182V8.5H12.3636V10.8182C12.3636 11.2281 12.2008 11.6212 11.911 11.911C11.6212 12.2008 11.2281 12.3636 10.8182 12.3636H1.54545C1.13557 12.3636 0.742482 12.2008 0.452653 11.911C0.162824 11.6212 0 11.2281 0 10.8182Z" fill="#5970F5" />
                </svg>
                <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.87481 6.18664V11.6034C6.9023 11.8096 6.83356 12.0296 6.67546 12.1739C6.61187 12.2377 6.53633 12.2882 6.45317 12.3227C6.37001 12.3572 6.28087 12.375 6.19084 12.375C6.10081 12.375 6.01167 12.3572 5.92851 12.3227C5.84535 12.2882 5.76981 12.2377 5.70622 12.1739L4.32454 10.7923C4.24957 10.719 4.19256 10.6293 4.15798 10.5303C4.1234 10.4314 4.11217 10.3257 4.12519 10.2217V6.18664H4.10457L0.145116 1.1136C0.0334875 0.970293 -0.0168817 0.788631 0.005015 0.608305C0.0269117 0.427979 0.119294 0.263652 0.261975 0.151229C0.392582 0.0549924 0.536937 0 0.688166 0H10.3118C10.4631 0 10.6074 0.0549924 10.738 0.151229C10.8807 0.263652 10.9731 0.427979 10.995 0.608305C11.0169 0.788631 10.9665 0.970293 10.8549 1.1136L6.89543 6.18664H6.87481Z" fill="#5970F5" />
                </svg>
                <Link to={"/inventory/stock-check/add"} className="bg-[#5970F5] flex px-3 py-2 rounded-md text-white gap-2 items-center">
                  <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0714 7.92857H7.42857V12.5714C7.42857 12.8177 7.33074 13.0539 7.1566 13.228C6.98246 13.4022 6.74627 13.5 6.5 13.5C6.25373 13.5 6.01754 13.4022 5.8434 13.228C5.66926 13.0539 5.57143 12.8177 5.57143 12.5714V7.92857H0.928571C0.682299 7.92857 0.446113 7.83074 0.271972 7.6566C0.0978315 7.48246 0 7.24627 0 7C0 6.75373 0.0978315 6.51754 0.271972 6.3434C0.446113 6.16926 0.682299 6.07143 0.928571 6.07143H5.57143V1.42857C5.57143 1.1823 5.66926 0.946113 5.8434 0.771972C6.01754 0.597831 6.25373 0.5 6.5 0.5C6.74627 0.5 6.98246 0.597831 7.1566 0.771972C7.33074 0.946113 7.42857 1.1823 7.42857 1.42857V6.07143H12.0714C12.3177 6.07143 12.5539 6.16926 12.728 6.3434C12.9022 6.51754 13 6.75373 13 7C13 7.24627 12.9022 7.48246 12.728 7.6566C12.5539 7.83074 12.3177 7.92857 12.0714 7.92857Z" fill="white" />
                  </svg>
                  Add Stock Check
                </Link>
              </div>
            </div> */}
            <div className="h-[80%] overflow-auto w-full">
              <table className="w-full mt-3 overflow-auto">
                <thead className="border w-full top-0 left-0  text-xs text-center bg-[#5970F5] text-white roboto-thin">
                  <tr className="w-full">
                  {/* <th className="ps-1">
              {selected?.length === data?.length && data?.length > 0 ? (
                <div
                  onClick={() => {
                    setSelected([]);
                  }}
                  className="h-3 w-3 border cursor-pointer border-white bg-none"
                >
                  {" "}
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5.19048L4.66667 8.85714L12 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              ) : (
                <div
                  onClick={() => {
                    const temp = data.map((x) => {
                      return x?._id;
                    });
                    setSelected([...temp]);
                  }}
                  className="h-3 cursor-pointer w-3 border border-white bg-none"
                ></div>
              )}
            </th> */}
                    <th>S No</th>
                    <th>Product Name</th>
                    <th>Batch Number</th>
                    <th>Product Quantity</th>
                    <th>Expiry Date</th>
                    <th>Shortage</th>
                    <th>Overage</th>
                    <th>Warehouse Name</th>
                    <th>Pick Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="overflow-auto text-xs text-center  text-[#5970F5] roboto-thin">
                  {/* {filtered?.map((x: any, i: number) => ( */}
                  <tr className="border relative">
                  {/* <th className="ps-1">
                {selected.includes(x?._id) ? (
                  <div
                    onClick={() => {
                      const temp = selected;
                      const index = temp.indexOf(x?._id);
                      temp.splice(index);
                      setSelected([...temp]);
                    }}
                    className="h-3 w-3 border cursor-pointer border-[#5970f5] bg-none"
                  >
                    {" "}
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5.19048L4.66667 8.85714L12 1" stroke="#5970F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setSelected((prev:any) => [...prev, x?._id]);
                    }}
                    className="h-3 cursor-pointer w-3 border border-[#5970f5] bg-none"
                  ></div>
                )}
              </th> */}
                    {/* <th>{i + 1}</th> */}
                    <th>S No</th>
                    <th>Product Name</th>
                    <th>Batch Number</th>
                    <th>Product Quantity</th>
                    <th>Expiry Date</th>
                    <th>Shortage</th>
                    <th>Overage</th>
                    <th>Warehouse Name</th>
                    <th>Pick Location</th>
                   

                    <th className="relative ">
                      <button className={" cursor-pointer h-full w-full flex items-center justify-center pt-1 " + styles.more}>
                        <svg width="2" height="9" viewBox="0 0 2 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.80618 8.18484C1.80618 7.73465 1.4412 7.36969 0.99098 7.36969C0.540758 7.36969 0.175781 7.73465 0.175781 8.18484C0.175781 8.63504 0.540758 9 0.99098 9C1.4412 9 1.80618 8.63504 1.80618 8.18484Z" fill="#5970F5" />
                          <path d="M1.80618 4.92313C1.80618 4.47293 1.4412 4.10797 0.99098 4.10797C0.540758 4.10797 0.175781 4.47293 0.175781 4.92313C0.175781 5.37332 0.540758 5.73828 0.99098 5.73828C1.4412 5.73828 1.80618 5.37332 1.80618 4.92313Z" fill="#5970F5" />
                          <path d="M1.80618 1.66531C1.80618 1.21512 1.4412 0.850159 0.99098 0.850159C0.540758 0.850159 0.175781 1.21512 0.175781 1.66531C0.175781 2.11551 0.540758 2.48047 0.99098 2.48047C1.4412 2.48047 1.80618 2.11551 1.80618 1.66531Z" fill="#5970F5" />
                        </svg>
                      </button>
                      <div className={"hidden hover:flex flex-col gap-[1px] absolute right-0 z-20 " + styles.option}>
                        <button onClick={() => navigate("/inventory/stock-check/view")} className="bg-[#E0E4FF] rounded-md shadow-md shadow-[#00000040] gap-2 items-center text-black flex px-2 py-1">
                          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.0039 7.49999C8.32636 7.49999 9.39843 6.42792 9.39843 5.10546C9.39843 3.783 8.32636 2.71094 7.0039 2.71094C5.68144 2.71094 4.60938 3.783 4.60938 5.10546C4.60938 6.42792 5.68144 7.49999 7.0039 7.49999Z" stroke="black" />
                            <path d="M12.6018 4.3756C12.8673 4.69852 13 4.85929 13 5.1049C13 5.35051 12.8673 5.51129 12.6018 5.83421C11.6303 7.01368 9.48757 9.2098 7 9.2098C4.51243 9.2098 2.36967 7.01368 1.39818 5.83421C1.13273 5.51129 1 5.35051 1 5.1049C1 4.85929 1.13273 4.69852 1.39818 4.3756C2.36967 3.19612 4.51243 1 7 1C9.48757 1 11.6303 3.19612 12.6018 4.3756Z" stroke="black" />
                          </svg>
                          View
                        </button>
                        <button onClick={() => navigate("/inventory/stock-check/edit")} className="bg-[#E0E4FF] rounded-md shadow-md shadow-[#00000040] gap-2 items-center text-black flex px-2 py-1">
                          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.0039 7.49999C8.32636 7.49999 9.39843 6.42792 9.39843 5.10546C9.39843 3.783 8.32636 2.71094 7.0039 2.71094C5.68144 2.71094 4.60938 3.783 4.60938 5.10546C4.60938 6.42792 5.68144 7.49999 7.0039 7.49999Z" stroke="black" />
                            <path d="M12.6018 4.3756C12.8673 4.69852 13 4.85929 13 5.1049C13 5.35051 12.8673 5.51129 12.6018 5.83421C11.6303 7.01368 9.48757 9.2098 7 9.2098C4.51243 9.2098 2.36967 7.01368 1.39818 5.83421C1.13273 5.51129 1 5.35051 1 5.1049C1 4.85929 1.13273 4.69852 1.39818 4.3756C2.36967 3.19612 4.51243 1 7 1C9.48757 1 11.6303 3.19612 12.6018 4.3756Z" stroke="black" />
                          </svg>
                          Edit
                        </button>
                        <button onClick={() => navigate("")} className="bg-[#E0E4FF] rounded-md shadow-md shadow-[#00000040] gap-2 items-center text-black flex px-2 py-1">
                          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.0039 7.49999C8.32636 7.49999 9.39843 6.42792 9.39843 5.10546C9.39843 3.783 8.32636 2.71094 7.0039 2.71094C5.68144 2.71094 4.60938 3.783 4.60938 5.10546C4.60938 6.42792 5.68144 7.49999 7.0039 7.49999Z" stroke="black" />
                            <path d="M12.6018 4.3756C12.8673 4.69852 13 4.85929 13 5.1049C13 5.35051 12.8673 5.51129 12.6018 5.83421C11.6303 7.01368 9.48757 9.2098 7 9.2098C4.51243 9.2098 2.36967 7.01368 1.39818 5.83421C1.13273 5.51129 1 5.35051 1 5.1049C1 4.85929 1.13273 4.69852 1.39818 4.3756C2.36967 3.19612 4.51243 1 7 1C9.48757 1 11.6303 3.19612 12.6018 4.3756Z" stroke="black" />
                          </svg>
                          Print
                        </button>
                      </div>
                    </th>
                  </tr>
                  {/* ))} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockCheckList;
