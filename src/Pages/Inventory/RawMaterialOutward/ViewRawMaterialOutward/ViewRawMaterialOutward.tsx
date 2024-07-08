/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  addRawMaterialOutward, getAllProductRawMaterial, getAllUserManagement, getAllVendorMaster, getProductFromPurchaseOrderByGRNAndQuantity, getRawMaterialOutwardById, getType } from "../../../../utils/redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DeleteConfirmationBox from "../../../../components/DeleteConfirmationBox";
import { RawMaterialOutward } from "../../../../utils/Type/types";
// import styles from "../PurchaseOrder.module.scss"

function ViewRawMaterialOutward() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [places, setPlaces] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });
  const [search, setSearch] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });
  const [confirmation, setConfirmation] = useState(false);
  const [products,setProducts] = useState<any[]>()
  const superAdminCompany = useSelector((state: any) => state?.data?.superAdminCompany);
  const user = useSelector((state: any) => state?.data?.user);
  const params:any = useParams()
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
  }>({ margin: [], account: [], discount: [], payment: [],transporter:[] ,document: [], uom: [], products: [], vendor: [], certificate: [], users: [], packing: [], shipping: [] });
  const dispatch: any = useDispatch();
  // const [dragging, setDragging] = useState(false);
  const [data, setData] = useState<RawMaterialOutward>({
    products: [{}],
  });


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
          margin: res?.payload[0]?.marginSettingType,
        };
      });
    });
    dispatch(getProductFromPurchaseOrderByGRNAndQuantity()).then((res: any) => {
        setProducts(res?.payload)
    })
    const res2 = dispatch(getType("uom"));

    res2.then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          uom: res?.payload[0]?.uomType,
        };
      });
    });


    dispatch(getType("transport")).then((res:any)=>{
      setDropDown((prev) => {
        return {
          ...prev,
          transporter: res?.payload[0]?.transportType,
        };
      });
    })

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

    dispatch(getRawMaterialOutwardById(params.id)).then((res:any)=>{
        setData(res?.payload)
    })

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
      <h1 className="roboto-bold text-lg">Add Raw Material Outward</h1>

      <div className="bg-[#F1F3FF] shadow-md p-3 rounded-lg w-full">
        <div
          className="shadow-md bg-white pb-[100px] px-4 h-full z-[0] relative rounded-lg pt-1 w-full"
        >
          <h1 className="roboto-medium mt-1">Transportation Details</h1>
          <div className="grid grid-cols-4 items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <div className="flex  items-center gap-3 justify-between">
              <label>Outward Date</label>
              <label htmlFor="date" className="w-[200px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">
                <p>{data?.outwardDate}</p>
                <button type="button" >
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6.11111H7.77778V8.88889H5V6.11111ZM8.88889 1.11111H8.33333V0H7.22222V1.11111H2.77778V0H1.66667V1.11111H1.11111C0.5 1.11111 0 1.61111 0 2.22222V10C0 10.6111 0.5 11.1111 1.11111 11.1111H8.88889C9.5 11.1111 10 10.6111 10 10V2.22222C10 1.61111 9.5 1.11111 8.88889 1.11111ZM8.88889 2.22222V3.33333H1.11111V2.22222H8.88889ZM1.11111 10V4.44444H8.88889V10H1.11111Z" fill="#5970F5" />
                  </svg>
                </button>
             
              </label>
            </div>
            <div className="flex  items-center gap-3 justify-between">
              <label>Sender</label>
      <label htmlFor="date" className="w-[200px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data?.sender?.warehouseName}</label>

            </div>
            <div className="flex  items-center gap-3 justify-between">
              <label>Supply Chain</label>
      <label htmlFor="date" className="w-[200px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data?.supplyChain}</label>

            </div>
            <div className="flex  items-center gap-3 justify-between">
              <label>Receiver</label>
      <label htmlFor="date" className="w-[200px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{ data?.supplyChain === "own" ? data?.receiver?.warehouseName : data?.receiver?.VendorName }</label>

            
            </div>
            <div className="flex  items-center gap-3 justify-between">
              <label>Transporter</label>
              <label htmlFor="date" className="w-[200px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data?.transporter}</label>
            </div>
            <div className="flex items-center gap-3 justify-between">
              <label>Vehicle Number</label>
              <label htmlFor="date" className="w-[200px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data?.vehicleNumber}</label>
            </div>
            <div className="flex  items-center gap-3 justify-between">
              <label>Transportation Mode</label>
              <label htmlFor="date" className="w-[200px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{dropDowns?.transporter?.filter((x) => x?._id === data?.transporterMode)[0]?.value}</label>
            </div>
            <div className="flex  items-center gap-3 justify-between">
              <label>Transportation Date</label>
              <label htmlFor="date" className="w-[200px] flex items-center relative h-[25px] z-[900] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">
                <p>{data?.transpotationDate}</p>
                <button type="button" >
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6.11111H7.77778V8.88889H5V6.11111ZM8.88889 1.11111H8.33333V0H7.22222V1.11111H2.77778V0H1.66667V1.11111H1.11111C0.5 1.11111 0 1.61111 0 2.22222V10C0 10.6111 0.5 11.1111 1.11111 11.1111H8.88889C9.5 11.1111 10 10.6111 10 10V2.22222C10 1.61111 9.5 1.11111 8.88889 1.11111ZM8.88889 2.22222V3.33333H1.11111V2.22222H8.88889ZM1.11111 10V4.44444H8.88889V10H1.11111Z" fill="#5970F5" />
                  </svg>
                </button>
              </label>
            </div>
            <div className="flex  items-center gap-3 justify-between">
              <label>Transportation Distance</label>
              <label htmlFor="date" className="w-[140px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data?.transportationDistance}</label>
              <label htmlFor="date" className="w-[50px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data?.transportationDistanceUnit}</label>
            </div>
            <div className="flex items-center gap-3 justify-between">
              <label>Remarks</label>
              <label className="w-[200px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data?.remarks}</label>
            </div>
            <div className="flex items-center gap-3 justify-between">
              <label>Bill of Lading</label>
              <label className="w-[200px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data?.billOfLading}</label>
            </div>
          </div>

          <h1 className="roboto-medium mt-1">Product Details</h1>

          <table className="w-full text-[14px] border-collapse rounded border">
            <thead className="bg-[#5970F5]">
              <tr className=" text-white">
                <th className=" border-r w-1/5">Product Name</th>
                <th className=" border-r w-1/5">GRN Number</th>
                <th className="border-r w-1/5">Outward Quantity</th>
                <th className="border-r w-1/5">UOM</th>
                <th className="border-r w-1/5">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((x: any, i: number) => (
                <tr className={`text-center relative `} style={{zIndex:500-i}}>
                  <td className="text-center  border  justify-center py-2 items-center ">
                    <div className="flex justify-center items-center">
              <label className="w-[200px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{products?.filter((y)=>y?._id===x?.productId)[0]?.name}</label>

                    </div>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
              <label className="w-[200px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{x?.grn}</label>

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
    

          <div className="w-full absolute bottom-4 justify-center items-center  gap-3 flex mt-5">
          
            <button type="button" className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" onClick={() => navigate(-1)}>
              Back
            </button>
         
          </div>
        </div>
      </div>
      {confirmation && <DeleteConfirmationBox posColor="bg-[#196000]" RejectFunction={() => setConfirmation(false)} ResolveFunction={handleSave} message="Do you want to save?" pos="save" />}
    </div>
  );
}

export default ViewRawMaterialOutward;
