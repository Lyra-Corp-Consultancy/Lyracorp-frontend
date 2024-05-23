/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./QC.module.scss"
import { getAllQCPO, getAllUserManagement, getAllVendorMaster, getType } from "../../../utils/redux/actions";

function QCPO() {
  const [data, setData] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const dispatch: any = useDispatch();
  const [ActiveSelectUsers, setActiveSelectedUsers] = useState<any[]>([]);
  const navigate = useNavigate()
  const [dropDowns, setDropDown] = useState<{
    vendor: any[];
    vendorType: any[];
    account: any[];
    users:any[];
    discount: any[];
    payment: any[];
    document: any[];
    shippingMethods: any[];
  }>({ vendor: [], account: [], discount: [], payment: [], document: [],vendorType:[],users:[],shippingMethods:[] });

  const search = (val: string) => {
    const lowerVal = val.toLowerCase();
    const vendor = dropDowns.vendor
      .filter((x) => x?.VendorName?.toLowerCase()?.startsWith(lowerVal))
      .map((x) => {
        return x?._id;
      });
  
  
    console.log(vendor);

    const active = data.filter((x) => {
      if ( vendor.includes(x?.vendor)) {
        return x;
      }
    });

    setFiltered(active);
  };


  useEffect(() => {
    dispatch(getAllQCPO()).then((res: any) => {
      setData(res.payload);
      setFiltered(res.payload);
    });

    const res1 = dispatch(getType("vendor"));

    res1.then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          vendorType: res?.payload[0]?.vendorType,
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
    const res2 = dispatch(getType("account"));

    res2.then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          account: res?.payload[0]?.accountType,
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

    dispatch(getType("discount")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          discount: res?.payload[0]?.discountType,
        };
      });
    });

    
    dispatch(getType("shipping")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          shippingMethods: res?.payload[0]?.shippingType,
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
  }, []);
  return (
    <div className="h-[83vh] w-screen">
      <div className="w-full px-5 h-[90%] pt-2">
        <h1 className="text-xl roboto-bold">Quality Check</h1>
        <div className="bg-[#F1F3FF] shadow-md mt-2 w-full p-4 rounded-lg h-full">
       

          <div className="bg-white rounded-lg w-full pt-3 h-[80%] shadow-md mt-0">
            <h2 className="roboto-bold ms-3 text-[20px] text-center">Quality Check List</h2>
            <div className="px-4 flex justify-between">
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
               

              </div>
            </div>
            <div className="h-[80%] overflow-auto w-full">
      <table className="w-full mt-3 overflow-auto">
        <thead className="border w-full top-0 left-0  text-xs text-center bg-[#5970F5] text-white roboto-thin">
          <tr className="w-full">
            <th className="ps-1">
              {ActiveSelectUsers?.length === filtered?.length && filtered?.length > 0 ? (
                <div
                  onClick={() => {
                    setActiveSelectedUsers([]);
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
                    const temp = filtered?.map((x) => {
                      return x?._id;
                    });
                    setActiveSelectedUsers([...temp]);
                  }}
                  className="h-3 cursor-pointer w-3 border border-white bg-none"
                ></div>
              )}
            </th>
            <th>S No</th>
            <th>Serial No.</th>
            <th>Vendor Name</th>
            <th>Inward Date</th>
            <th>Invoice Number</th>
            <th>DC Number</th>
            <th>Transporter</th>
            <th>Vehicle Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="overflow-auto text-xs text-center  text-[#5970F5] roboto-thin">
          {filtered?.map((x: any, i: number) => (
            <tr className="border relative">
              <th className="ps-1">
                {ActiveSelectUsers.includes(x?._id) ? (
                  <div
                    onClick={() => {
                      const temp = ActiveSelectUsers;
                      const index = temp.indexOf(x?._id);
                      temp.splice(index);
                      setActiveSelectedUsers([...temp]);
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
                      setActiveSelectedUsers((prev:any) => [...prev, x?._id]);
                    }}
                    className="h-3 cursor-pointer w-3 border border-[#5970f5] bg-none"
                  ></div>
                )}
              </th>
              <th>{i + 1}</th>
              <th>{x?.seq}</th>
              <th>{dropDowns?.vendor?.filter((y) => y?._id === x?.vendor)[0]?.VendorName  }</th>
              <th>{x?.inwardDate}</th>
              <th>{x?.invoiceNumber}</th>
              <th>{x?.dcNumber}</th>
              <th>{x?.transporter}</th>
              <th>{x?.vehicleNumber}</th>
              <th className="relative ">
                <button className={" cursor-pointer h-full w-full flex items-center justify-center pt-1 " + styles.more}>
                  <svg width="2" height="9" viewBox="0 0 2 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.80618 8.18484C1.80618 7.73465 1.4412 7.36969 0.99098 7.36969C0.540758 7.36969 0.175781 7.73465 0.175781 8.18484C0.175781 8.63504 0.540758 9 0.99098 9C1.4412 9 1.80618 8.63504 1.80618 8.18484Z" fill="#5970F5" />
                    <path d="M1.80618 4.92313C1.80618 4.47293 1.4412 4.10797 0.99098 4.10797C0.540758 4.10797 0.175781 4.47293 0.175781 4.92313C0.175781 5.37332 0.540758 5.73828 0.99098 5.73828C1.4412 5.73828 1.80618 5.37332 1.80618 4.92313Z" fill="#5970F5" />
                    <path d="M1.80618 1.66531C1.80618 1.21512 1.4412 0.850159 0.99098 0.850159C0.540758 0.850159 0.175781 1.21512 0.175781 1.66531C0.175781 2.11551 0.540758 2.48047 0.99098 2.48047C1.4412 2.48047 1.80618 2.11551 1.80618 1.66531Z" fill="#5970F5" />
                  </svg>
                </button>
                <div className={"hidden hover:flex flex-col gap-[1px] absolute right-0 z-20 " + styles.option}>
                  <button onClick={()=>navigate("/inventory/purchase-inward/view/"+x?._id)} className="bg-[#E0E4FF] rounded-md shadow-md shadow-[#00000040] gap-2 items-center text-black flex px-2 py-1">
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.0039 7.49999C8.32636 7.49999 9.39843 6.42792 9.39843 5.10546C9.39843 3.783 8.32636 2.71094 7.0039 2.71094C5.68144 2.71094 4.60938 3.783 4.60938 5.10546C4.60938 6.42792 5.68144 7.49999 7.0039 7.49999Z" stroke="black" />
                      <path d="M12.6018 4.3756C12.8673 4.69852 13 4.85929 13 5.1049C13 5.35051 12.8673 5.51129 12.6018 5.83421C11.6303 7.01368 9.48757 9.2098 7 9.2098C4.51243 9.2098 2.36967 7.01368 1.39818 5.83421C1.13273 5.51129 1 5.35051 1 5.1049C1 4.85929 1.13273 4.69852 1.39818 4.3756C2.36967 3.19612 4.51243 1 7 1C9.48757 1 11.6303 3.19612 12.6018 4.3756Z" stroke="black" />
                    </svg>
                    Check
                  </button>
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default QCPO;
