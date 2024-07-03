/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { activeAndDeactivePurchaseOrder, getAllPurchaseOrder, getAllUserManagement, getAllVendorMaster, getType } from "../../../utils/redux/actions";
import Active from "./Active";
import Inactive from "./Inactive";
import DeleteConfirmationBox from "../../../components/DeleteConfirmationBox";

function PurchaseOrder() {
  const [data, setData] = useState<{ active: any[]; deactive: any[] }>({ active: [], deactive: [] });
  const [filtered, setFiltered] = useState<{ active: any[]; deactive: any[] }>({ active: [], deactive: [] });
  const dispatch: any = useDispatch();
  const [ActiveSelectUsers, setActiveSelectedUsers] = useState<any[]>([]);
  const [InactiveSelectUsers, setInactiveSelectedUsers] = useState<any[]>([]);
  const [confirmation, setConfirmation] = useState(false);
  const [dropDowns, setDropDown] = useState<{
    vendor: any[];
    vendorType: any[];
    account: any[];
    users: any[];
    discount: any[];
    payment: any[];
    document: any[];
    shippingMethods: any[];
  }>({ vendor: [], account: [], discount: [], payment: [], document: [], vendorType: [], users: [], shippingMethods: [] });

  const search = (val: string) => {
    const lowerVal = val.toLowerCase();
    const vendor = dropDowns?.vendor
      ?.filter((x) => x?.VendorName?.toLowerCase()?.includes(lowerVal))
      ?.map((x) => {
        return x?._id;
      });

    //constact Name
    const user = dropDowns?.users
      ?.filter((x) => x?.username?.toLowerCase()?.includes(lowerVal))
      ?.map((x) => {
        return x?._id;
      });

    const shippingMethod = dropDowns?.shippingMethods
      ?.filter((x) => x?.value?.toLowerCase()?.includes(lowerVal))
      ?.map((x) => {
        return x?._id;
      });

    //paymentTerms

    const paymentTerms = dropDowns?.payment
      ?.filter((x) => x?.value?.toLowerCase()?.includes(lowerVal))
      ?.map((x) => {
        return x?._id;
      });

    const active = data.active.filter((x) => {
      if (vendor?.includes(x?.vendor) || user?.includes(x?.contact) || paymentTerms?.includes(x?.paymentTerm) || shippingMethod?.includes(x?.shippingMethod) || x?.deliveryDate?.toLowerCase().includes(lowerVal) || x?.paymentType?.toLowerCase().includes(lowerVal) || x?.billingAddress?.address?.toLowerCase().includes(lowerVal) || x?.seq?.toLowerCase().includes(lowerVal)) {
        return x;
      }
    });
    const deactive = data.deactive.filter((x) => {
      if (vendor?.includes(x?.vendor) || user?.includes(x?.contact) || paymentTerms?.includes(x?.paymentTerm) || shippingMethod?.includes(x?.shippingMethod) || x?.deliveryDate?.toLowerCase().includes(lowerVal) || x?.paymentType?.toLowerCase().includes(lowerVal) || x?.billingAddress?.address?.toLowerCase().includes(lowerVal) || x?.seq?.toLowerCase().includes(lowerVal)) {
        return x;
      }
    });

    setFiltered({ active, deactive });
  };

  const [active, setActive] = useState(true);

  useEffect(() => {
    dispatch(getAllPurchaseOrder()).then((res: any) => {
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
  console.log("data ", data);
  console.log("dropdown ", dropDowns);
  return (
    <div className="h-[83vh] w-screen">
      <div className="w-full px-5 h-[90%] pt-2">
        <h1 className="text-xl roboto-bold">Purchase Order</h1>
        <div className="bg-[#F1F3FF] shadow-md mt-2 w-full p-4 rounded-lg h-full">
          <div className="flex gap-4">
            <button onClick={() => setActive(true)} className={"flex flex-col  rounded-md px-4 py-2 " + (active ? "bg-[#5970F5] text-white" : "bg-[#C3CBFF] text-black ")}>
              <div className="flex items-center gap-3">
                <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.38316 0.800781C6.40409 0.800781 5.46512 1.18971 4.77282 1.88202C4.08051 2.57432 3.69158 3.51329 3.69158 4.49236C3.69158 5.47143 4.08051 6.41039 4.77282 7.1027C5.46512 7.795 6.40409 8.18394 7.38316 8.18394C8.36223 8.18394 9.30119 7.795 9.9935 7.1027C10.6858 6.41039 11.0747 5.47143 11.0747 4.49236C11.0747 3.51329 10.6858 2.57432 9.9935 1.88202C9.30119 1.18971 8.36223 0.800781 7.38316 0.800781ZM7.38316 2.91025C7.80276 2.91025 8.20517 3.07694 8.50188 3.37364C8.79858 3.67034 8.96526 4.07276 8.96526 4.49236C8.96526 4.91196 8.79858 5.31437 8.50188 5.61108C8.20517 5.90778 7.80276 6.07446 7.38316 6.07446C6.96356 6.07446 6.56114 5.90778 6.26444 5.61108C5.96774 5.31437 5.80105 4.91196 5.80105 4.49236C5.80105 4.07276 5.96774 3.67034 6.26444 3.37364C6.56114 3.07694 6.96356 2.91025 7.38316 2.91025ZM14.2389 3.96499C13.8592 3.96499 13.5006 4.04937 13.1842 4.19703V4.49236C13.1842 5.75804 12.7729 6.98154 12.0029 7.98354C12.1295 8.18394 12.2666 8.34215 12.4248 8.50036C12.9111 8.97212 13.5614 9.2368 14.2389 9.23867C14.703 9.23867 15.1355 9.11211 15.5152 8.90116C16.3168 8.44762 16.8758 7.59329 16.8758 6.60183C16.8758 5.9025 16.598 5.23181 16.1035 4.7373C15.609 4.2428 14.9383 3.96499 14.2389 3.96499ZM7.38316 10.2934C4.91507 10.2934 0 11.5275 0 13.985V15.5671H14.7663V13.985C14.7663 11.5275 9.85124 10.2934 7.38316 10.2934ZM15.0722 10.8735C16.148 11.5802 16.8758 12.4662 16.8758 13.5315V15.5671H20.04V13.985C20.04 12.1497 17.1078 11.1161 15.0722 10.8735ZM7.38316 11.8755C8.99691 11.8755 12.6568 11.8755 13.7116 14.5124H1.58211C1.58211 12.4029 5.76941 11.8755 7.38316 11.8755Z"
                    fill={active ? "white" : "black"}
                  />
                  <path fill={active ? "white" : "black"} stroke={active ? "white" : "black"} d="M18.2657 6.07031L20.0377 7.85493L11.7728 16.1958L7.38086 11.7659L9.15282 9.98128L11.7728 12.6139L18.2657 6.07031Z" />
                </svg>
                <p className=" roboto-regular text-[15px]">Active Purchase Order</p>
              </div>
              <p className=" roboto-regular flex justify-center items-center w-full text-[15px]">{data?.active?.length}</p>
            </button>

            <button onClick={() => setActive(false)} className={"flex flex-col  rounded-md px-4 py-2 " + (!active ? "bg-[#5970F5] text-white" : "bg-[#C3CBFF] text-black ")}>
              <div className="flex items-center gap-3">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17.8799 19.1667L14.7419 16.0287V16.1867H0.293483V13.6582C0.293483 13.1465 0.425324 12.6763 0.689007 12.2477C0.95269 11.8191 1.30246 11.4916 1.73832 11.2652C2.67144 10.7987 3.61962 10.4489 4.58284 10.2159C5.54607 9.98293 6.52434 9.86613 7.51767 9.86553C7.69828 9.86553 7.88279 9.86944 8.07122 9.87727C8.25965 9.8851 8.44387 9.89624 8.62387 9.91068L7.6757 8.96251H7.51767C6.52434 8.96251 5.674 8.60882 4.96663 7.90146C4.25926 7.19409 3.90558 6.34374 3.90558 5.35041V5.19239L0 1.28681L1.28681 0L19.1667 17.8799L17.8799 19.1667ZM14.4258 10.001C15.1934 10.0913 15.9158 10.2457 16.5931 10.4642C17.2703 10.6828 17.9024 10.9498 18.4894 11.2652C19.0312 11.5662 19.4451 11.9009 19.7311 12.2694C20.017 12.6378 20.16 13.0406 20.16 13.4776V16.1867H20.0471L16.435 12.5746C16.2996 12.0779 16.0624 11.6078 15.7234 11.1641C15.3845 10.7204 14.952 10.3327 14.4258 10.001ZM7.51767 11.6716C6.67485 11.6716 5.83955 11.7733 5.01178 11.9768C4.18401 12.1803 3.36376 12.4849 2.55104 12.8907C2.41559 12.9659 2.30632 13.0713 2.22324 13.2067C2.14017 13.3422 2.09893 13.4927 2.09953 13.6582V14.3807H12.9358V14.2226L10.9717 12.2585C10.3998 12.0629 9.82429 11.9163 9.24515 11.8188C8.66602 11.7212 8.09019 11.6722 7.51767 11.6716ZM12.0779 8.21751C12.3639 7.7961 12.5785 7.34459 12.7218 6.86298C12.8651 6.38137 12.9364 5.87718 12.9358 5.35041C12.9358 4.7183 12.8268 4.10876 12.6089 3.52179C12.391 2.93483 12.0785 2.40054 11.6716 1.91892C11.8823 1.84367 12.093 1.79491 12.3037 1.77264C12.5144 1.75036 12.7251 1.73892 12.9358 1.73832C13.9291 1.73832 14.7795 2.092 15.4869 2.79937C16.1942 3.50674 16.5479 4.35709 16.5479 5.35041C16.5479 6.34374 16.1756 7.19409 15.4309 7.90146C14.6862 8.60882 13.8169 8.96251 12.8229 8.96251L12.0779 8.21751ZM10.7686 6.90813L9.32372 5.46329V5.35041C9.32372 4.85375 9.14703 4.42873 8.79364 4.07535C8.44026 3.72196 8.01494 3.54497 7.51767 3.54437H7.40479L5.95995 2.09953C6.20076 1.97913 6.44909 1.88882 6.70495 1.82862C6.96081 1.76842 7.23171 1.73832 7.51767 1.73832C8.511 1.73832 9.36134 2.092 10.0687 2.79937C10.7761 3.50674 11.1298 4.35709 11.1298 5.35041C11.1298 5.63637 11.0997 5.90728 11.0395 6.16314C10.9793 6.41899 10.889 6.66732 10.7686 6.90813Z"
                    fill={!active ? "white" : "black"}
                  />
                </svg>

                <p className=" roboto-regular text-[15px]">Inactive Purchase Order</p>
              </div>
              <p className=" roboto-regular flex justify-center items-center w-full text-[15px]">{data?.deactive?.length}</p>
            </button>
          </div>

          <div className="bg-white rounded-lg w-full pt-3 h-[80%] shadow-md mt-4">
            <h2 className="roboto-bold ms-3 text-[20px] text-center">Purchase Order List</h2>
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
                {active ? (
                  <svg
                    className={ActiveSelectUsers?.length > 0 ? "cursor-pointer" : ""}
                    onClick={() => {
                      setConfirmation(true);
                    }}
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity={ActiveSelectUsers?.length > 0 ? "1" : "0.5"}
                      d="M15.2192 16.3145L12.5481 13.6435V13.778H0.24981V11.6258C0.24981 11.1902 0.362032 10.79 0.586476 10.4251C0.81092 10.0603 1.10864 9.78152 1.47964 9.58885C2.27391 9.19171 3.08099 8.89399 3.90087 8.69568C4.72076 8.49737 5.55346 8.39796 6.39897 8.39745C6.5527 8.39745 6.70976 8.40078 6.87015 8.40744C7.03054 8.4141 7.18734 8.42358 7.34056 8.43588L6.53348 7.6288H6.39897C5.55346 7.6288 4.82965 7.32775 4.22755 6.72564C3.62544 6.12354 3.32439 5.39973 3.32439 4.55422V4.41971L0 1.09532L1.09532 0L16.3145 15.2192L15.2192 16.3145ZM12.2791 8.51274C12.9325 8.58961 13.5474 8.72105 14.1239 8.90706C14.7003 9.09307 15.2384 9.32033 15.738 9.58885C16.1992 9.84506 16.5515 10.13 16.7949 10.4436C17.0383 10.7572 17.16 11.1 17.16 11.472V13.778H17.0639L13.9893 10.7034C13.874 10.2806 13.6721 9.88042 13.3836 9.50276C13.0951 9.1251 12.727 8.79509 12.2791 8.51274ZM6.39897 9.93474C5.68157 9.93474 4.97057 10.0213 4.26598 10.1945C3.56139 10.3677 2.8632 10.627 2.17142 10.9724C2.05613 11.0365 1.96312 11.1261 1.8924 11.2414C1.82169 11.3567 1.78659 11.4848 1.7871 11.6258V12.2407H11.0108V12.1062L9.33904 10.4344C8.85223 10.2678 8.36234 10.143 7.86939 10.06C7.37643 9.97701 6.88629 9.93525 6.39897 9.93474ZM10.2806 6.99467C10.524 6.63597 10.7067 6.25165 10.8287 5.8417C10.9506 5.43176 11.0114 5.0026 11.0108 4.55422C11.0108 4.01617 10.9181 3.49734 10.7326 2.99772C10.5471 2.4981 10.2811 2.04331 9.93474 1.63337C10.1141 1.56932 10.2934 1.52781 10.4728 1.50885C10.6521 1.48989 10.8315 1.48015 11.0108 1.47964C11.8563 1.47964 12.5802 1.78069 13.1823 2.3828C13.7844 2.98491 14.0854 3.70871 14.0854 4.55422C14.0854 5.39973 13.7685 6.12354 13.1346 6.72564C12.5007 7.32775 11.7608 7.6288 10.9148 7.6288L10.2806 6.99467ZM9.16609 5.88014L7.93626 4.6503V4.55422C7.93626 4.13147 7.78586 3.76969 7.48506 3.46889C7.18427 3.1681 6.82224 3.01744 6.39897 3.01693H6.30289L5.07306 1.7871C5.27803 1.68461 5.48941 1.60775 5.70719 1.55651C5.92497 1.50526 6.15557 1.47964 6.39897 1.47964C7.24448 1.47964 7.96829 1.78069 8.57039 2.3828C9.1725 2.98491 9.47355 3.70871 9.47355 4.55422C9.47355 4.79763 9.44793 5.02822 9.39668 5.246C9.34544 5.46379 9.26858 5.67516 9.16609 5.88014Z"
                      fill={"#5970F5"}
                    />
                  </svg>
                ) : (
                  <svg
                    className={InactiveSelectUsers?.length > 0 ? "cursor-pointer" : ""}
                    onClick={() => {
                      setConfirmation(true);
                    }}
                    opacity={InactiveSelectUsers?.length > 0 ? "1" : "0.5"}
                    width="21"
                    height="17"
                    viewBox="0 0 21 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.38316 0.800781C6.40409 0.800781 5.46512 1.18971 4.77282 1.88202C4.08051 2.57432 3.69158 3.51329 3.69158 4.49236C3.69158 5.47143 4.08051 6.41039 4.77282 7.1027C5.46512 7.795 6.40409 8.18394 7.38316 8.18394C8.36223 8.18394 9.30119 7.795 9.9935 7.1027C10.6858 6.41039 11.0747 5.47143 11.0747 4.49236C11.0747 3.51329 10.6858 2.57432 9.9935 1.88202C9.30119 1.18971 8.36223 0.800781 7.38316 0.800781ZM7.38316 2.91025C7.80276 2.91025 8.20517 3.07694 8.50188 3.37364C8.79858 3.67034 8.96526 4.07276 8.96526 4.49236C8.96526 4.91196 8.79858 5.31437 8.50188 5.61108C8.20517 5.90778 7.80276 6.07446 7.38316 6.07446C6.96356 6.07446 6.56114 5.90778 6.26444 5.61108C5.96774 5.31437 5.80105 4.91196 5.80105 4.49236C5.80105 4.07276 5.96774 3.67034 6.26444 3.37364C6.56114 3.07694 6.96356 2.91025 7.38316 2.91025ZM14.2389 3.96499C13.8592 3.96499 13.5006 4.04937 13.1842 4.19703V4.49236C13.1842 5.75804 12.7729 6.98154 12.0029 7.98354C12.1295 8.18394 12.2666 8.34215 12.4248 8.50036C12.9111 8.97212 13.5614 9.2368 14.2389 9.23867C14.703 9.23867 15.1355 9.11211 15.5152 8.90116C16.3168 8.44762 16.8758 7.59329 16.8758 6.60183C16.8758 5.9025 16.598 5.23181 16.1035 4.7373C15.609 4.2428 14.9383 3.96499 14.2389 3.96499ZM7.38316 10.2934C4.91507 10.2934 0 11.5275 0 13.985V15.5671H14.7663V13.985C14.7663 11.5275 9.85124 10.2934 7.38316 10.2934ZM15.0722 10.8735C16.148 11.5802 16.8758 12.4662 16.8758 13.5315V15.5671H20.04V13.985C20.04 12.1497 17.1078 11.1161 15.0722 10.8735ZM7.38316 11.8755C8.99691 11.8755 12.6568 11.8755 13.7116 14.5124H1.58211C1.58211 12.4029 5.76941 11.8755 7.38316 11.8755Z"
                      fill="#5970F5"
                    />
                    <path d="M18.2638 6.07031L20.0357 7.85493L11.7708 16.1958L7.37891 11.7659L9.15086 9.98128L11.7708 12.6139L18.2638 6.07031Z" fill="#5970F5" stroke="#5970F5" />
                  </svg>
                )}

                <Link to={"/inventory/purchase-order/add-purchase-order"} className="bg-[#5970F5] flex px-3 py-2 rounded-md text-white gap-2 items-center">
                  <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0714 7.92857H7.42857V12.5714C7.42857 12.8177 7.33074 13.0539 7.1566 13.228C6.98246 13.4022 6.74627 13.5 6.5 13.5C6.25373 13.5 6.01754 13.4022 5.8434 13.228C5.66926 13.0539 5.57143 12.8177 5.57143 12.5714V7.92857H0.928571C0.682299 7.92857 0.446113 7.83074 0.271972 7.6566C0.0978315 7.48246 0 7.24627 0 7C0 6.75373 0.0978315 6.51754 0.271972 6.3434C0.446113 6.16926 0.682299 6.07143 0.928571 6.07143H5.57143V1.42857C5.57143 1.1823 5.66926 0.946113 5.8434 0.771972C6.01754 0.597831 6.25373 0.5 6.5 0.5C6.74627 0.5 6.98246 0.597831 7.1566 0.771972C7.33074 0.946113 7.42857 1.1823 7.42857 1.42857V6.07143H12.0714C12.3177 6.07143 12.5539 6.16926 12.728 6.3434C12.9022 6.51754 13 6.75373 13 7C13 7.24627 12.9022 7.48246 12.728 7.6566C12.5539 7.83074 12.3177 7.92857 12.0714 7.92857Z" fill="white" />
                  </svg>
                  Add Purchase Order
                </Link>
              </div>
            </div>
            {active ? (
              <Active
                setSelected={setActiveSelectedUsers}
                selected={ActiveSelectUsers}
                inActiveCustomer={() => {
                  dispatch(getAllPurchaseOrder()).then((res: any) => {
                    setData(res.payload);
                    setFiltered(res.payload);
                  });
                }}
                data={filtered?.active}
                dropDowns={dropDowns}
              />
            ) : (
              <Inactive
                selected={InactiveSelectUsers}
                setSelected={setInactiveSelectedUsers}
                data={filtered?.deactive}
                dropDowns={dropDowns}
                ActiveCustomer={() => {
                  dispatch(getAllPurchaseOrder()).then((res: any) => {
                    setData(res.payload);
                    setFiltered(res.payload);
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
      {confirmation && (
        <DeleteConfirmationBox
          message={active ? "Do you want to inactive this vendor?" : "Do you want to active this vendor?"}
          pos={active ? "Inactive" : "Active"}
          posColor={!active ? "bg-[#196000]" : ""}
          RejectFunction={() => setConfirmation(false)}
          ResolveFunction={() => {
            if (active) {
              if (ActiveSelectUsers?.length > 0) {
                dispatch(activeAndDeactivePurchaseOrder(ActiveSelectUsers)).then(() => {
                  dispatch(getAllPurchaseOrder()).then((res: any) => {
                    setData(res.payload);
                    setFiltered(res.payload);
                  });
                });
              }
              setActiveSelectedUsers([]);
            } else {
              if (InactiveSelectUsers?.length > 0) {
                dispatch(activeAndDeactivePurchaseOrder(InactiveSelectUsers)).then(() => {
                  dispatch(getAllPurchaseOrder()).then((res: any) => {
                    setData(res.payload);
                    setFiltered(res.payload);
                  });
                });
              }
              setInactiveSelectedUsers([]);
            }
            setConfirmation(false);
          }}
        />
      )}
    </div>
  );
}

export default PurchaseOrder;
