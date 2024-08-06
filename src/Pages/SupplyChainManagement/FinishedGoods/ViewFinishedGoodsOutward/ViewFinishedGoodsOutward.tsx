/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllFinishedGoodsOutwardById, getAllUserManagement, getAllVendorMaster, getProductsFinishedGoods, getType } from "../../../../utils/redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./../AddFinishedGoodsOutward/AddFinishedGoodsOutward.module.scss";

import { RawMaterialOutward } from "../../../../utils/Type/types";
import { formatDate } from "../../../../utils/functions/formats";
// import styles from "../PurchaseOrder.module.scss"

function ViewFinishedGoodsOutward() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [places, setPlaces] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });
  const [search, setSearch] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });

  const [products, setProducts] = useState<any[]>();

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
  const params: any = useParams();

  const navigate = useNavigate();

  //   const handleFileSelect = (e: any) => {
  //     const selectedFiles = Array.from(e.target.files);

  //     setFiles([...files, ...selectedFiles]);
  //   };
  useEffect(() => {
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
    dispatch(getProductsFinishedGoods()).then((res: any) => {
      setProducts(res.payload);
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

    dispatch(getAllFinishedGoodsOutwardById(params.id)).then((res: any) => {
      console.log("res", res);
      setData(res?.payload);
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
  console.log("data", data);
  return (
    <div className=" w-screen px-4 pt-3 shadow-md">
      <h1 className="roboto-bold text-lg">View Finished Goods Outward</h1>

      <div className="bg-[#F1F3FF] shadow-md p-3 rounded-lg w-full">
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
                value={data?.outwardDate}
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
            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md">{data?.sender?.warehouseName}</label>
          </div>

          <div className="flex  items-center gap-3 justify-between">
            <label>Receiver</label>

            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md">{data?.receiver?.VendorName}</label>
          </div>
          <div className="flex  items-center gap-3 justify-between">
            <label>Transporter</label>
            <input required type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" value={data?.transporter} onChange={(e) => setData({ ...data, transporter: e.target.value })} />
          </div>
          <div className="flex items-center gap-3 justify-between">
            <label>Vehicle Number</label>
            <input required value={data?.vehicleNumber} onChange={(e) => setData({ ...data, vehicleNumber: e.target.value })} className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" type="text" />
          </div>
          <div className="flex  items-center gap-3 justify-between">
            <label>Transportation Mode</label>
            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md">{dropDowns?.transporter?.filter((x) => x?._id === data?.transporterMode)[0]?.value}</label>
          </div>
          <div className="flex  items-center gap-3 justify-between">
            <label>Transportation Date</label>
            <label htmlFor="date" className="w-[200px] flex items-center relative h-[25px] z-[900] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">
              <p>{data?.transpotationDate}</p>
            </label>
          </div>
          <div className="flex  items-center gap-3 justify-between">
            <label>Transportation Distance</label>

            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md">
              {data?.transportationDistance} {data?.transportationDistanceUnit}
            </label>
          </div>
          <div className="flex  items-center gap-3 justify-between">
            <label>Supply Type</label>
            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md">{data?.supplyChain}</label>
          </div>
          <div className="flex items-center gap-3 justify-between">
            <label>Remarks</label>
            <input required value={data?.remarks} onChange={(e) => setData({ ...data, remarks: e.target.value })} className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" type="text" />
          </div>
          <div className="flex items-center gap-3 justify-between">
            <label>Bill of Lading</label>
            <input required value={data?.billOfLading} onChange={(e) => setData({ ...data, billOfLading: e.target.value })} className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" type="text" />
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
                <td className="text-center  border  justify-center py-2 items-center ">
                  <div className="flex justify-center items-center">
                    <label className="w-[200px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">

                      {products?.filter((a)=>a._id===x.productId)[0]?.productName}
                    </label>
                  </div>
                </td>
                <td className="text-center border justify-center py-2 items-center ">
                  <label className="w-[200px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{x?.batchNumber}</label>
                </td>
                <td className="text-center border justify-center py-2 items-center ">
                  <div className="w-full flex">
                    <label className="w-[200px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{x?.recievedQuantity}</label>
                  </div>
                </td>
                <td className="text-center border justify-center py-2 items-center ">
                  <label className="w-[200px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{dropDowns?.uom?.filter((y) => y?._id === x?.uom)[0]?.value?.name}</label>
                </td>
                <td className="text-center border justify-center py-2 items-center ">
                  <label className="w-[200px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{x?.remark}</label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex mt-3 w-full items-end justify-end"></div>

        <div className="w-full absolute bottom-4 justify-center items-center  gap-3 flex mt-5">
          <button type="reset" className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" onClick={() => setData({ products: [{}] })}>
            Cancel
          </button>
          <button type="button" className=" rounded-md py-2 px-4 font-semibold bg-[#5970F5] text-white" onClick={() => navigate(-1)}>
            Print
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewFinishedGoodsOutward;
