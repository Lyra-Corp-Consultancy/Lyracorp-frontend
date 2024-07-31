/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllProductFinishedGoods, getAllProductRawMaterial, getAllUserManagement, getAllVendorMaster, getOrderManagementById, getProductFinishedGoodsBatchNumberByProductId, getType } from "../../../utils/redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "../EditOrderManagement/EditOrderManagement.module.scss";
import { formatDate } from "../../../utils/functions/formats";
import Select from "../../../components/Select";

import { OrderManagementTypes } from "../../../utils/Type/types";

// import styles from "../PurchaseOrder.module.scss"

function ViewOrderManagement() {
  const params: any = useParams();
  const permissions = useSelector((state: any) => state.data?.user?.permissions);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [places, setPlaces] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });
  const [search, setSearch] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });

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
  useEffect(() => {
    const res1 = dispatch(getType("marginSetting"));
    dispatch(getOrderManagementById(params.id)).then((res: any) => {
      console.log(res.payload);
      setData(res.payload);
    });
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
  console.log("daf", data);
  useEffect(() => {
    setSearchValue({
      ...searchValue,
      uom:
        data?.products?.map((e: any) => {
          return dropDowns?.uom?.filter((uom: any) => uom._id === e.uom)[0]?.value?.name;
        }) || [],

      shippingType:
        data?.products?.map((e) => {
          return dropDowns?.shipping?.filter((x: any) => x._id === e.shippingMethod)[0]?.value;
        }) || [],

      shippingAddress: dropDowns?.users[0]?.companyDetails[0]?.shippingAddress?.filter((a: any) => a?.address === data?.shipping?.address)[0]?.address,
      billing: dropDowns?.users[0]?.companyDetails[0]?.billingAddress?.filter((a: any) => a?.address === data?.billing?.address)[0]?.address,
      paymentTerm: dropDowns?.paymentTerm?.filter((a: any) => a?._id === data?.paymentTerm)[0]?.value,
      products: data.products?.map((x) => products?.find((y) => y._id === x.productId).productName) || [],
      batchNumbers: data.products?.map((x) => x.batchNumbers) || [],
    });
  }, [dropDowns]);
  const truncateText = (text:string, maxLength:number) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className=" w-screen px-4 pt-3 shadow-md">
      <h1 className="roboto-bold text-lg">View Order Entry</h1>

      <div className="bg-[#F1F3FF] shadow-md p-3 rounded-lg w-full">
        <h1 className="roboto-medium mt-1">Order Details</h1>
        <div className="grid grid-cols-4 items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
          <div className="flex  items-center gap-x-8">
            <label>Order Number</label>
            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md">{data?.orderNum}</label>
          </div>

          <div className="flex  items-center gap-x-8">
            <label>Order Value</label>
            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md">{data?.orderVal}</label>
          </div>
          <div className="flex  items-center gap-x-8">
            <label>Delivery Date</label>
            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md">{data?.delivery}</label>
          </div>
          <div className="flex gap-x-8 z-[96] items-center">
            <label>Billing Address</label>
            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md">{truncateText(data?.billing?.address, 25)}</label>
          </div>

          <div className="flex gap-x-3  items-center">
            <label>Shipping Address</label>
            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md">{truncateText(data?.shipping?.address, 25)}</label>
          </div>

          <div className="flex gap-x-8 z-[96] items-center">
            <label>PO Number</label>
            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md">{data?.poNum}</label>
          </div>
          <div className="flex  items-center gap-x-[24px]">
            <label>Contact Name</label>
            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md">{data?.contactName}</label>
          </div>
          <div className="flex items-center gap-x-6">
            <label>Contact Number</label>
            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md">{data?.contactNum}</label>
          </div>
          <div className="flex gap-x-5  items-center">
            <label>Payment Terms </label>
            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md">{dropDowns?.paymentTerm?.filter((a: any) => a?._id === data?.paymentTerm)[0]?.value}</label>
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
                    <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md">{products?.find((y) => y._id === x.productId).productName}</label>
                  </div>
                </td>
                <td className="text-center border justify-center py-2 items-center ">{products?.find((x) => x?.productName === searchValue.products[i])?.productDes}</td>
                {/* batch number */}
                <td className="text-center  border  justify-center py-2 items-center ">
                  <div className="flex justify-center items-center">
                    <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md">{x?.batchNumbers}</label>
                  </div>
                </td>
                <td className="text-center border justify-center py-2 items-center ">
                  {/* order Quantity */}
                  <div className="w-full flex">
                    <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md">{x?.orderQuantity}</label>
                  </div>
                </td>
                <td className="text-center border justify-center py-2 items-center ">
                  <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md">{dropDowns?.uom?.filter((uom: any) => uom._id === x.uom)[0]?.value?.name}</label>
                </td>
                <td className="text-center border justify-center py-2 items-center ">
                  <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md">{x?.price}</label>
                </td>
                <td className="text-center border justify-center py-2 items-center ">
                  <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md">{dropDowns?.shipping?.filter((e: any) => e._id === x.shippingMethod)[0]?.value}</label>
                </td>
                <td className="text-center border justify-center py-2 items-center ">
                  <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md">{x?.deliveryDate}</label>
                </td>
                <td className="text-center border justify-center py-2 items-center ">{x.price * x.orderQuantity || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full absolute bottom-4 justify-center items-center gap-3 flex mt-5">
          <button className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" onClick={() => navigate(-1)}>
            Back
          </button>
          {permissions?.edit?.includes("finished goods") && (
            <button className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" onClick={() => navigate("/order-management/edit/" + params?.id)}>
              Edit
            </button>
          )}
          <button className=" rounded-md py-2 px-4 font-semibold bg-[#5970F5] text-white">Print</button>
        </div>
      </div>
    </div>
  );
}

export default ViewOrderManagement;
