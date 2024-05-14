/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
// import Select from "../../../../components/Select";
import { useDispatch, useSelector } from "react-redux";
import { getProductMasterById, getType } from "../../../../utils/redux/actions";
import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

function ViewProduct() {
  //   const fileServer = "http://192.168.1.42:3000/upload";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const [places, setPlaces] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });
  //   const [search, setSearch] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });

  const [dropDowns, setDropDown] = useState<{
    margin: any[];
    account: any[];
    discount: any[];
    uom: any[];
    document: any[];
  }>({ margin: [], account: [], discount: [], uom: [], document: [] });
  const dispatch: any = useDispatch();
  // const [dragging, setDragging] = useState(false);
  //   const [files, setFiles] = useState<any[]>([]);
  const [data, setData] = useState<any>({});
  const params: any = useParams();
  const permissions = useSelector((state: any) => state.data?.user?.permissions);

  const navigate = useNavigate();

  //   const handleSave = async () => {
  //     const urls: string[] = [];
  //     for (let i = 0; i < files.length; i++) {
  //       const x = files[i];
  //       const file = new FormData();
  //       file.append("file", x);
  //       const res = await axios.post(fileServer, file);
  //       urls.push(res.data);
  //     }
  //     setData({ ...data, fileUrls: urls });

  //     dispatch(addCustomerMaster(data)).then(() => {
  //       navigate(-1);
  //     });
  //   };

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
          margin: res.payload[0].marginSettingType,
        };
      });
    });

    dispatch(getProductMasterById(params.id)).then((res: any) => {
      setData(res.payload);
    });

    const res2 = dispatch(getType("account"));

    res2.then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          account: res.payload[0].accountType,
        };
      });
    });

    dispatch(getType("discount")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          discount: res.payload[0].discountType,
        };
      });
    });

    dispatch(getType("uom")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          uom: res.payload[0].uomType,
        };
      });
    });

    dispatch(getType("document")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          document: res.payload[0].documentType,
        };
      });
    });

    // axios.get("https://api.first.org/data/v1/countries").then((res) => {
    //   const val = [];
    //   for (const i in res.data.data) {
    //     val.push(res.data.data[i]);
    //   }
    //   setPlaces({ ...places, country: val });
    //   setSearch({ ...search, country: val });
    // });
  }, []);

  //   const handleDrop = (e: any) => {
  //     e.preventDefault();
  //     // setDragging(false);
  //     const droppedFiles = Array.from(e.dataTransfer.files);
  //     setFiles([...files, ...droppedFiles]);
  //   };
  return (
    <div className="h-[110vh] w-screen px-4 pt-3 shadow-md">
      <h1 className="roboto-bold text-lg">Add Customer Master</h1>
      <div className="bg-[#F1F3FF] shadow-md p-3 rounded-lg w-full h-[90%]">
        <div className="shadow-md bg-white px-4 h-full z-[0] relative rounded-lg pt-1 w-full">
          <h1 className="roboto-medium mt-1">Product Type</h1>
          <div className="grid grid-flow-col items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <label>Product Name</label>
            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.productName}</label>
            <label>Product Code</label>
            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.productCode}</label>
            <label>Product Description</label>
            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.productDes}</label>
          </div>
          <h1 className="roboto-medium mt-1">Specifications</h1>
          <div className="grid grid-cols-4 items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <div className="flex gap-3 items-center z-[999]">
              <label>Margin Setting</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{dropDowns?.margin?.filter((x) => x?._id === data?.marginType)[0]?.value}</label>
            </div>
            <div className="flex gap-3 z-[999] items-center">
              <label>Discount</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{dropDowns?.discount?.filter((x) => x?._id === data?.discountType)[0]?.value}</label>
            </div>

            <div className="flex gap-3 z-[999] items-center">
              <label>UOM</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{dropDowns?.uom?.filter((x) => x?._id === data?.uomType)[0]?.value?.name}</label>
            </div>

            <div className="flex gap-3 z-[999] items-center">
              <label>UOM Description</label>
              <label htmlFor="" className="px-2 py-1 w-[60%] shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">
                {dropDowns?.uom?.filter((x) => x?._id === data?.uomType)[0]?.value?.des}
              </label>
            </div>
            <div className="flex gap-3 items-center">
              <label>Storage Specification</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.storageSpec}</label>
            </div>
          </div>
          <h1 className="roboto-medium mt-1">Price Details</h1>
          <div className="grid grid-cols-4 items-center justify-between roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)]  w-full rounded-lg px-3 py-2">
            <div className="flex gap-3 items-center">
              <label>Pricing MRP</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.mrp}</label>
            </div>
            <div className="flex gap-3 items-center">
              <label>Pricing Date</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.pricingDate}</label>
            </div>

            <div className="flex gap-3 items-center">
              <label>Net Price</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.netPrice}</label>
            </div>

            <div className="flex gap-5 items-end">
              <label>Tax</label>
              <label htmlFor="" className="flex flex-col items-center justify-center">
                CGST
                <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.cgst}</label>
              </label>
              <label htmlFor="" className="flex flex-col">
                SGST
                <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.sgst}</label>
              </label>
              <label htmlFor="" className="flex flex-col">
                IGST
                <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.igst}</label>
              </label>
            </div>

            <div className="flex gap-3 items-center">
              <label>Cost Price</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.costPrice}</label>
            </div>

            <div className="flex gap-3 items-center">
              <label>Target Price</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.targetPrice}</label>
            </div>

            <div className="flex gap-3 items-center">
              <label>Floor Price</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.floorPrice}</label>
            </div>

            <div className="flex gap-3 items-center mt-3">
              <label>HSN</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,c0.385)] rounded-md">{data.hsn}</label>
            </div>
          </div>

          <h1 className="roboto-medium mt-1">Manufacturing Details</h1>
          <div className="grid grid-cols-4 items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <div className="flex gap-3 items-center  z-[998]">
              <label>Country of Origin</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.country}</label>
            </div>
            <div className="flex gap-3 items-center">
              <label>Manufacturing Unit</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.manufacturingUnit}</label>
            </div>
            <div className="flex gap-3 items-center">
              <label>ECCN</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.eccn}</label>
            </div>

            <div className="flex gap-3 items-center">
              <label>EAN Number</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.eanNumber}</label>
            </div>

            <div className="flex gap-3 items-center">
              <label>Weight</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.weight}</label>
            </div>

            <div className="flex gap-5 items-end">
              <label>Dimensions</label>
              <label htmlFor="" className="flex flex-col items-center justify-center">
                L<label className="px-2 py-1 w-[50px] shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.dimenL}</label>
              </label>
              <label htmlFor="" className="flex flex-col items-center">
                W<label className="px-2 py-1 w-[50px] shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.dimenW}</label>
              </label>
              <label htmlFor="" className="flex flex-col items-center">
                H<label className="px-2 py-1 w-[50px] shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.dimenH}</label>
              </label>
            </div>
          </div>

          <h1 className="roboto-medium mt-1">Document Details</h1>

          <div className="flex items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <label>Bussiness Document</label>
            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{dropDowns?.document?.filter((x) => x?._id === data?.bussinessDocument)[0]?.value}</label>

            
            {data?.fileUrls?.map((x: any, i: number) => (
              <div className="  flex flex-col justify-center items-center">
                <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 0H8.07901L11.7144 3.63536V6.83338H10.4128V5.20639H6.50798V1.3016H1.3016V13.016H6.18259V14.3176H0V0ZM7.80958 1.57103V3.90479H10.1433L7.80958 1.57103ZM9.27388 8.78578C8.79922 8.78578 8.344 8.97434 8.00837 9.30997C7.67274 9.6456 7.48418 10.1008 7.48418 10.5755C7.48418 11.0501 7.67274 11.5053 8.00837 11.841C8.344 12.1766 8.79922 12.3652 9.27388 12.3652C9.74853 12.3652 10.2038 12.1766 10.5394 11.841C10.875 11.5053 11.0636 11.0501 11.0636 10.5755C11.0636 10.1008 10.875 9.6456 10.5394 9.30997C10.2038 8.97434 9.74853 8.78578 9.27388 8.78578ZM6.18259 10.5755C6.18266 10.0948 6.29482 9.62079 6.51015 9.19106C6.72548 8.76133 7.03806 8.38774 7.42305 8.09995C7.80804 7.81217 8.25483 7.61813 8.72794 7.53324C9.20104 7.44835 9.68743 7.47496 10.1484 7.61094C10.6095 7.74693 11.0324 7.98855 11.3837 8.31661C11.735 8.64467 12.005 9.05013 12.1722 9.50078C12.3393 9.95144 12.3991 10.4349 12.3468 10.9127C12.2944 11.3905 12.1314 11.8495 11.8706 12.2532L12.96 13.3407L12.0404 14.2616L10.9503 13.1728C10.4835 13.4741 9.94407 13.6441 9.3888 13.6647C8.83354 13.6854 8.28297 13.556 7.79503 13.2902C7.30709 13.0244 6.89982 12.632 6.61607 12.1542C6.33231 11.6765 6.18257 11.1311 6.18259 10.5755Z"
                    fill="#5970F5"
                  />
                </svg>
                <p
                  onClick={() => {
                    // const url = URL.createObjectURL(x);
                    window.open(x);
                  }}
                  className="text-[9px] cursor-pointer text-[#5970F5] underline"
                >
                  Preview {i + 1}
                </p>
              </div>
            ))}
          </div>

          <div className="w-full absolute bottom-4 justify-center items-center gap-3 flex mt-5">
          <button className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" onClick={() => navigate(-1)}>
              Back
            </button>
            {permissions?.edit?.includes("product master") &&<button className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" onClick={() => navigate("/master/product-master/edit-products/"+params?.id)}>
              Edit
            </button>}
            <button className=" rounded-md py-2 px-4 font-semibold bg-[#5970F5] text-white" >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
