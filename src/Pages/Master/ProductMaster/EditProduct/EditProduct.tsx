/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useState } from "react";
import Select from "../../../../components/Select";
import { useDispatch } from "react-redux";
import { editProductMaster, getProductMasterById, getType } from "../../../../utils/redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { fileServer } from "../../../../utils/values/publicValues";

function EditProduct() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [places, setPlaces] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });
  const [search, setSearch] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });

  const [dropDowns, setDropDown] = useState<{
    margin: any[];
    account: any[];
    discount: any[];
    payment: any[];
    uom: any[];
    document: any[];
  }>({ margin: [], account: [], discount: [], payment: [], document: [], uom: [] });
  const dispatch: any = useDispatch();
  // const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [data, setData] = useState<any>({
    fileUrls: [],
  });

  const navigate = useNavigate();
  const params: any = useParams();

  const handleSave = async () => {
    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const x = files[i];
      const file = new FormData();
      file.append("file", x);
      const res = await axios.post(fileServer, file);
      urls.push(res.data);
      if(data?.fileUrls){
          setData({ ...data, fileUrls: [...data.fileUrls, ...urls] });
        }else{
          setData({ ...data, fileUrls:urls });

        }

    }
    console.log(urls)

    dispatch(editProductMaster({data:{ ...data, fileUrls: urls },id:params.id})).then(() => {
      navigate(-1);
    });
  };



  const handleFileSelect = (e: any) => {
    const selectedFiles = Array.from(e.target.files);

    setFiles([...files, ...selectedFiles]);
  };
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

    dispatch(getProductMasterById(params.id)).then((res: any) => {
      setData(res.payload);
    //   setFiles([...res.payload.fileUrls]);
     
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

    dispatch(getType("discount")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          discount: res?.payload[0]?.discountType,
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

  const handleDrop = (e: any) => {
    e.preventDefault();
    // setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };
  return (
    <div className="h-[110vh] w-screen px-4 pt-3 shadow-md">
      <h1 className="roboto-bold text-lg">Add Product Master</h1>
      <div className="bg-[#F1F3FF] shadow-md p-3 rounded-lg w-full h-[90%]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="shadow-md bg-white px-4 h-full z-[0] relative rounded-lg pt-1 w-full"
        >
          <h1 className="roboto-medium mt-1">Product Type</h1>
          <div className="grid grid-flow-col items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <label>Product Name</label>
            <input required value={data.productName} name="productName" onChange={(e) => setData({ ...data, productName: e.target.value })} type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
            <label>Product Code</label>
            <input required value={data.productCode} name="productCode" onChange={(e) => setData({ ...data, productCode: e.target.value })} type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
            <label>Product Description</label>
            <textarea required value={data.productDes} onChange={(e) => setData({ ...data, productDes: e.target.value })} cols={70} className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md"></textarea>
          </div>
          <h1 className="roboto-medium mt-1">Specifications</h1>
          <div className="grid grid-cols-4 items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <div className="flex gap-3 items-center z-[999]">
              <label>Margin Setting</label>
              <Select required value={dropDowns?.margin?.filter((x) => x?._id === data?.marginType)[0]?.value}>
                {dropDowns?.margin?.map((x) => (
                  <li
                    onClick={() => {
                      setData({ ...data, marginType: x?._id });
                    }}
                    className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x?.value}
                  </li>
                ))}
              </Select>
            </div>
            <div className="flex gap-3 z-[999] items-center">
              <label>Discount</label>
              <Select required value={dropDowns?.discount?.filter((x) => x?._id === data?.discountType)[0]?.value}>
                {dropDowns?.discount?.map((x) => (
                  <li
                    onClick={() => {
                      setData({ ...data, discountType: x?._id });
                    }}
                    className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x?.value}
                  </li>
                ))}
              </Select>
            </div>

            <div className="flex gap-3 z-[999] items-center">
              <label>UOM</label>
              <Select required value={dropDowns?.uom?.filter((x) => x?._id === data?.uomType)[0]?.value?.name}>
                {dropDowns?.uom?.map((x) => (
                  <li
                    onClick={() => {
                      setData({ ...data, uomType: x?._id });
                    }}
                    className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x?.value?.name}
                  </li>
                ))}
              </Select>
            </div>

            <div className="flex gap-3 z-[999] items-center">
              <label>UOM Description</label>
              <label htmlFor="" className="px-2 py-1 w-[60%] shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">
                {dropDowns?.uom?.filter((x) => x?._id === data?.uomType)[0]?.value?.des}
              </label>
            </div>
            <div className="flex gap-3 items-center">
              <label>Storage Specification</label>
              <input required value={data.storageSpec} name="storageSpec" onChange={(e) => setData({ ...data, storageSpec: e.target.value })} className="px-2 py-1 w-[60%] shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
            </div>
          </div>
          <h1 className="roboto-medium mt-1">Price Details</h1>
          <div className="grid grid-cols-4 items-center justify-between roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)]  w-full rounded-lg px-3 py-2">
            <div className="flex gap-3 items-center">
              <label>Pricing MRP</label>
              <input required value={data.mrp} name="mrp" onChange={(e) => setData({ ...data, mrp: e.target.value })} type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
            </div>
            <div className="flex gap-3 items-center">
              <label>Pricing Date</label>
              <input required value={data.pricingDate} name="pricingDate" onChange={(e) => setData({ ...data, pricingDate: e.target.value })} type="date" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
            </div>

            <div className="flex gap-3 items-center">
              <label>Net Price</label>
              <input required value={data.netPrice} name="netPrice" onChange={(e) => setData({ ...data, netPrice: e.target.value })} type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
            </div>

            <div className="flex gap-5 items-end">
              <label>Tax</label>
              <label htmlFor="" className="flex flex-col items-center justify-center">
                CGST
                <input required value={data.cgst} name="cgst" onChange={(e) => setData({ ...data, cgst: e.target.value })} type="text" className="px-2 py-1 w-[50px] shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
              </label>
              <label htmlFor="" className="flex flex-col">
                SGST
                <input required value={data.sgst} name="sgst" onChange={(e) => setData({ ...data, sgst: e.target.value })} type="text" className="px-2 py-1 w-[50px] shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
              </label>
              <label htmlFor="" className="flex flex-col">
                IGST
                <input required value={data.igst} name="netPrice" onChange={(e) => setData({ ...data, igst: e.target.value })} type="text" className="px-2 py-1 w-[50px] shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
              </label>
            </div>

            <div className="flex gap-3 items-center">
              <label>Cost Price</label>
              <input required value={data.costPrice} name="costPrice" onChange={(e) => setData({ ...data, costPrice: e.target.value })} type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
            </div>

            <div className="flex gap-3 items-center">
              <label>Target Price</label>
              <input required value={data.targetPrice} name="targetPrice" onChange={(e) => setData({ ...data, targetPrice: e.target.value })} type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
            </div>

            <div className="flex gap-3 items-center">
              <label>Floor Price</label>
              <input required value={data.floorPrice} name="floorPrice" onChange={(e) => setData({ ...data, floorPrice: e.target.value })} type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
            </div>

            <div className="flex gap-3 items-center mt-3">
              <label>HSN</label>
              <input required value={data.hsn} name="hsn" onChange={(e) => setData({ ...data, hsn: e.target.value })} type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
            </div>
          </div>

          <h1 className="roboto-medium mt-1">Manufacturing Details</h1>
          <div className="grid grid-cols-4 items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <div className="flex gap-3 items-center  z-[998]">
              <label>Country of Origin</label>
              <Select required
                onChange={(e) => {
                  const filtered = places.country.filter((x) => {
                    return x?.country?.toLowerCase().startsWith(e.target.value.toLowerCase());
                  });
                  setSearch({ ...search, country: filtered });
                  setData({ ...data, country: e.target.value });
                }}
                value={data.country}
              >
                {search?.country?.map((x) => (
                  <li
                    onClick={() => {
                      setData({ ...data, country: x?.country });
                      axios.post("https://countriesnow.space/api/v0.1/countries/states", { country: x?.country }).then((res) => {
                        setPlaces({ ...places, state: res.data.data.states });
                        setSearch({ ...search, state: res.data.data.states });
                      });
                    }}
                    className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x?.country}
                  </li>
                ))}
              </Select>
            </div>
            <div className="flex gap-3 items-center">
              <label>Manufacturing Unit</label>
              <input required value={data.manufacturingUnit} name="manufacturingUnit" onChange={(e) => setData({ ...data, manufacturingUnit: e.target.value })} type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
            </div>
            <div className="flex gap-3 items-center">
              <label>ECCN</label>
              <input required value={data.eccn} name="eccn" onChange={(e) => setData({ ...data, eccn: e.target.value })} type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
            </div>

            <div className="flex gap-3 items-center">
              <label>EAN Number</label>
              <input required value={data.eanNumber} name="eanNumber" onChange={(e) => setData({ ...data, eanNumber: e.target.value })} type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
            </div>

            <div className="flex gap-3 items-center">
              <label>Weight</label>
              <input required value={data.weight} name="weight" onChange={(e) => setData({ ...data, weight: e.target.value })} type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
            </div>

            <div className="flex gap-5 items-end">
              <label>Dimensions</label>
              <label htmlFor="" className="flex flex-col items-center justify-center">
                L
                <input required value={data.dimenL} name="dimenL" onChange={(e) => setData({ ...data, dimenL: e.target.value })} type="text" className="px-2 py-1 w-[50px] shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
              </label>
              <label htmlFor="" className="flex flex-col items-center">
                W
                <input required value={data.dimenW} name="dimenW" onChange={(e) => setData({ ...data, dimenW: e.target.value })} type="text" className="px-2 py-1 w-[50px] shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
              </label>
              <label htmlFor="" className="flex flex-col items-center">
                H
                <input required value={data.dimenH} name="dimenH" onChange={(e) => setData({ ...data, dimenH: e.target.value })} type="text" className="px-2 py-1 w-[50px] shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
              </label>
            </div>
          </div>

          <h1 className="roboto-medium mt-1">Document Details</h1>

          <div className="flex items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <label>Bussiness Document</label>
            <Select  value={dropDowns?.document?.filter((x) => x?._id === data?.bussinessDocument)[0]?.value}>
              {dropDowns?.document?.map((x) => (
                <li
                  onClick={() => {
                    setData({ ...data, bussinessDocument: x?._id });
                  }}
                  className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                >
                  {x?.value}
                </li>
              ))}
            </Select>
            <label htmlFor="file" className="flex items-center gap-3 justify-center shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[50px] w-[150px] px-3 py-2 rounded-md" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onDragEnter={(e) => e.preventDefault()}>
              <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5625 11.25V3.60938L4.125 6.04688L2.8125 4.6875L7.5 0L12.1875 4.6875L10.875 6.04688L8.4375 3.60938V11.25H6.5625ZM1.875 15C1.35938 15 0.918125 14.8166 0.55125 14.4497C0.184375 14.0828 0.000625 13.6412 0 13.125V10.3125H1.875V13.125H13.125V10.3125H15V13.125C15 13.6406 14.8166 14.0822 14.4497 14.4497C14.0828 14.8172 13.6412 15.0006 13.125 15H1.875Z" fill="#5970F5" />
              </svg>
              <p className="text-xs text-center">Upload Document or Drag the file</p>
              <input  type="file" id="file" onChange={handleFileSelect} className="hidden" />
            </label>
            {[...files,...data.fileUrls].map((x: any, i: number) => (
              <div className="  flex flex-col justify-center items-center">
                <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 0H8.07901L11.7144 3.63536V6.83338H10.4128V5.20639H6.50798V1.3016H1.3016V13.016H6.18259V14.3176H0V0ZM7.80958 1.57103V3.90479H10.1433L7.80958 1.57103ZM9.27388 8.78578C8.79922 8.78578 8.344 8.97434 8.00837 9.30997C7.67274 9.6456 7.48418 10.1008 7.48418 10.5755C7.48418 11.0501 7.67274 11.5053 8.00837 11.841C8.344 12.1766 8.79922 12.3652 9.27388 12.3652C9.74853 12.3652 10.2038 12.1766 10.5394 11.841C10.875 11.5053 11.0636 11.0501 11.0636 10.5755C11.0636 10.1008 10.875 9.6456 10.5394 9.30997C10.2038 8.97434 9.74853 8.78578 9.27388 8.78578ZM6.18259 10.5755C6.18266 10.0948 6.29482 9.62079 6.51015 9.19106C6.72548 8.76133 7.03806 8.38774 7.42305 8.09995C7.80804 7.81217 8.25483 7.61813 8.72794 7.53324C9.20104 7.44835 9.68743 7.47496 10.1484 7.61094C10.6095 7.74693 11.0324 7.98855 11.3837 8.31661C11.735 8.64467 12.005 9.05013 12.1722 9.50078C12.3393 9.95144 12.3991 10.4349 12.3468 10.9127C12.2944 11.3905 12.1314 11.8495 11.8706 12.2532L12.96 13.3407L12.0404 14.2616L10.9503 13.1728C10.4835 13.4741 9.94407 13.6441 9.3888 13.6647C8.83354 13.6854 8.28297 13.556 7.79503 13.2902C7.30709 13.0244 6.89982 12.632 6.61607 12.1542C6.33231 11.6765 6.18257 11.1311 6.18259 10.5755Z"
                    fill="#5970F5"
                  />
                </svg>
                <p
                  onClick={() => {
                    if(x?.includes("http")){
                      window.open(x)
                    }else{
                      const url = URL.createObjectURL(x);
                      window.open(url);
                    }
                  }}
                  className="text-[9px] cursor-pointer text-[#5970F5] underline"
                >
                  Preview {i + 1}
                </p>
              </div>
            ))}
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
    </div>
  );
}

export default EditProduct;
