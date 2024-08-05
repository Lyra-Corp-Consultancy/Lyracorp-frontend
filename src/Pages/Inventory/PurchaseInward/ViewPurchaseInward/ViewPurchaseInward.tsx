/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProductRawMaterial, getAllUserManagement, getAllVendorMaster, getPurchaseInwardById, getType } from "../../../../utils/redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
// import styles from "../PurchaseOrder.module.scss"

function ViewPurchaseInward() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [places, setPlaces] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });
  const [search, setSearch] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });
  const params: any = useParams();
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
  }>({ margin: [], account: [], discount: [], payment: [], document: [], uom: [], products: [], vendor: [], certificate: [], users: [], packing: [], shipping: [] });
  const dispatch: any = useDispatch();
  // const [dragging, setDragging] = useState(false);
  const [data, setData] = useState<any>({
    fileUrls: [],
    products: [{}],
  });

  const navigate = useNavigate();


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
  const [stateCheckForTax] = useState(true);
  function taxPercentage(productId:any) {
    const prod = dropDowns?.products?.filter((y) => y?._id === productId);
    
    if (prod && prod.length > 0) {
      return stateCheckForTax 
        ? prod[0]?.igst 
        : (parseInt(prod[0]?.productDetails?.cgst) + parseInt(prod[0]?.productDetails?.sgst)) || 0;
    }
    return 0; 
  }
  function taxvalue(productId:any, recievedQuantity:string) {
   const product =dropDowns?.products?.filter((y) => y?._id === productId)
   console.log("ppp",product)
   if (product && product.length > 0) {
    const basePrice = parseInt(product[0].mrp)
    const quantity = parseInt(recievedQuantity) || 0;
    
    if (stateCheckForTax) {
      const igst = parseInt(product[0]?.igst) || 0;
      return (igst / 100) * basePrice * quantity;
    } else {
      const cgst = parseInt(product[0]?.productDetails?.cgst) || 0;
      const sgst = parseInt(product[0]?.productDetails?.sgst) || 0;
      return ((cgst + sgst) / 100) * basePrice * quantity;
    }
  }

  return 0;
   
  }

  function totalValue(productId:string,recievedQuantity:string|number){
    const product =dropDowns?.products?.filter((y) => y?._id === productId)
    console.log("ppp",product)
    if (product && product.length > 0) {
     const basePrice = parseInt(product[0].mrp)
     const quantity = parseInt(recievedQuantity+"") || 0;
     let finaltotalValue 
     if (stateCheckForTax) {
       const igst = parseInt(product[0]?.igst) || 0;
      finaltotalValue= ((igst / 100) * basePrice * quantity)+basePrice * quantity ;
     } else {
       const cgst = parseInt(product[0]?.productDetails?.cgst) || 0;
       const sgst = parseInt(product[0]?.productDetails?.sgst) || 0;
       finaltotalValue= (((cgst + sgst) / 100) * basePrice * quantity)+ basePrice * quantity;
     }
     return finaltotalValue
   }
 
   return 0;

  }
  console.log("data",data)
  console.log("pro",dropDowns);
  
  return (
    <div className=" w-screen px-4 pt-3 shadow-md">
      <h1 className="roboto-bold text-lg">View Purchase Inward</h1>
      
        <div className="flex items-center mb-5  ml-[29px] gap-3">
          <label className="font-bold">GRN No</label>
          <input
            value={data?.seq}
            readOnly
            className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md focus:outline-none focus:ring-0"
            type="text"
          />
        </div>

      <div className="bg-[#F1F3FF] shadow-md p-3 rounded-lg w-full">
        <div className="shadow-md bg-white pb-[100px] px-4 h-full z-[0] relative rounded-lg pt-1 w-full">
          <h1 className="roboto-medium mt-1">Vendor Details</h1>
          <div className="grid grid-cols-4 items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            {/* <div className="flex items-center gap-3">
              <label>Serial Number</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md">{data.seq}</label>
            </div> */}
            <div className="flex  items-center gap-3">
              <label>Vendor Name</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md">{dropDowns?.vendor?.filter((x) => x?._id === data?.vendor)[0]?.VendorName}</label>
            </div>
            <div className="flex  items-center gap-3">
              <label>Inward Date</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md">{data?.inwardDate}</label>
            </div>
            <div className="flex items-center gap-3">
              <label>Invoice Number</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md">{data.invoiceNumber}</label>
            </div>
            <div className="flex  items-center gap-3">
              <label>Invoice Date</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md">{data?.invoiceDate}</label>
            </div>
            <div className="flex items-center gap-3">
              <label>DC Number</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md">{data?.dcNumber}</label>
            </div>
            <div className="flex items-center gap-3">
              <label>Transporter</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md">{data?.transporter}</label>
            </div>
            <div className="flex items-center gap-3">
              <label>Vehicle Number</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md">{data?.vehicleNumber}</label>
            </div>
            {/* <div className="flex gap-3 items-center">
              <label>Warehouse</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md">{data?.warehouse?.warehouseName}</label>
            </div> */}
          </div>

          <h1 className="roboto-medium mt-1">Product Details</h1>

          <table className="w-full text-[14px] border-collapse rounded border">
            <thead className="bg-[#5970F5]">
              <tr className=" text-white">
              <th className=" border-r w-1/13">Product Name</th>
                <th className="border-r w-1/13">Received Quantity</th>
                <th className="border-r w-1/13">Billed Quantity</th>
                <th className="border-r w-1/13">UOM</th>
                <th className="border-r w-1/13">Batch Number</th>
                <th className="border-r w-1/13">Expire Date</th>
                <th className="border-r w-1/13">Shortage</th>
                <th className="border-r w-1/13">Unit Price</th>
                <th className="border-r w-1/13">Tax %</th>
                <th className="border-r w-1/13">Tax Value</th>
                <th className="border-r w-1/13">Total Value</th>
                <th className="border-r w-1/13">Remarks</th>
                <th className="border-r w-1/13">Certification</th>
                <th className="w-1/13">Upload</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((x: any, i: number) => (
                <tr className="text-center">
                  <td className="text-center  border  justify-center py-2 items-center ">
                    <div className="flex justify-center items-center">
                      <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{dropDowns?.products?.filter((y) => y?._id === x?.productId)[0]?.productName}</label>
                    </div>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{x.recievedQuantity}</label>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{x.orderQuantity}</label>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{dropDowns?.uom?.filter((y) => y?._id === x?.uom)[0]?.value?.name}</label>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{x?.batchNumber}</label>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{x?.expDate}</label>
                  </td>
                  <td className="text-center border w-[100px] justify-center py-2 items-center ">
                    <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{parseInt(x?.orderQuantity) - parseInt(x?.recievedQuantity) || 0}</label>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{dropDowns?.products?.filter((y) => y?._id === x?.productId)[0]?.mrp}</label>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md"> 
                      {/* tax per */}{taxPercentage(x?.productId)}
                      </label>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md"> 
                      {/* tax value */
                      taxvalue(x?.productId,x?.recievedQuantity)
                      }
                      
                      </label>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md"> 
                      {
                    //     total value
                    // parseFloat(dropDowns?.products?.filter((y) => y?._id === x?.productId)[0]?.mrp) * parseInt(x?.recievedQuantity) || 0
                    totalValue(x?.productId,x?.recievedQuantity)}
                    </label>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <div className="flex justify-center items-center">
                      <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{x.remarks}</label>
                    </div>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <div className="flex justify-center items-center">
                      <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{dropDowns?.certificate?.filter((x) => x?._id === data?.products[i]?.certificate)[0]?.value}</label>
                    </div>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <div className="flex text-[#5970F5] justify-center items-center">
                        {x?.image &&  <label onClick={()=>window.open(x?.image)}>
                        Preview
                      </label>}
                     
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-full absolute bottom-4 justify-center items-center gap-3 flex mt-5">
            <button type="button"  className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button  className=" rounded-md py-2 px-4 font-semibold bg-[#5970F5] text-white" onClick={() => navigate("/inventory/purchase-inward/edit/"+params.id)}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPurchaseInward;
