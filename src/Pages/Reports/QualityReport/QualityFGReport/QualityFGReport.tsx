/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProductFinishedGoods, getAllUserManagement, getAllVendorMaster, getFinishedGoodsInwards, getType, saveQCPO } from "../../../../utils/redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DeleteConfirmationBox from "../../../../components/DeleteConfirmationBox";
import Select from "../../../../components/Select";
// import styles from "../PurchaseOrder.module.scss"

function QualityFGReport() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [places, setPlaces] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });
  const [search, setSearch] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });
  const [searchValue, setSearchValue] = useState<any>();
  const [confirmation, setConfirmation] = useState(false);
  const [rejected] = useState<{ productId: string; rejected: number }[]>([]);
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
  const [data, setData] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);

  const navigate = useNavigate();

  const handleSave = async () => {
    dispatch(saveQCPO({ data: rejected, id: params.id })).then(() => {
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

    dispatch(getFinishedGoodsInwards()).then((res: any) => {
      setData(res.payload);
      setFiltered(res.payload);
      console.log(res.payload);
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

    dispatch(getAllProductFinishedGoods()).then((res: any) => {
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
  return (
    <div className=" w-screen px-4 pt-3 shadow-md">
      <h1 className="roboto-bold text-lg">Quality FG Report</h1>

      <div className="bg-[#F1F3FF] shadow-md p-3 rounded-lg w-full">
        <div className="shadow-md bg-white pb-[100px] px-4 h-full z-[0] relative rounded-lg pt-1 w-full">
          <h1 className="roboto-medium mt-1">Quality FG Report</h1>
          <div className="grid grid-cols-4 items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
           
            <div className="flex  items-center gap-3">
              <label>Finished Goods Name</label>
              <Select
                className="w-[90%] z-[999] "
                title="Please Select values from drop down"
                onChange={(e) => {
                  let temp = searchValue?.products;
                  temp = e.target.value;
                  setSearchValue({ ...searchValue, products: temp });
                }}
                value={searchValue?.products || ""}
              >
                {dropDowns?.products
                  ?.filter((a) => a?.productName?.toLowerCase()?.includes(searchValue?.products?.toLowerCase() || ""))
                  ?.map((x) => (
                    <li
                      onClick={() => {
                        let temp = searchValue?.products;
                        temp = x?.productName;
                        setSearchValue({
                          ...searchValue,
                          products: temp,
                          productId: x?._id
                        });
                        temp = data.filter((y: any) =>y?.product===x?._id);
                        console.log(temp);
                        setFiltered([...temp]);
                      }}
                      className="px-3 hover:bg-slate-200 py-1 truncate transition-all duration-100"
                    >
                      {x?.productName || "No Name"}
                    </li>
                  ))}
              </Select>
            </div>
            <div className="flex  items-center gap-3">
              <label>Batch Number</label>
              <Select
                className="w-[90%] z-[999]  "
                title="Please Select values from drop down"
                onChange={(e) => {
                  let temp = searchValue?.products;
                  temp = e.target.value;
                  setSearchValue({ ...searchValue, seq: temp });
                }}
                value={searchValue?.seq || ""}
              >
                {data
                  ?.filter((x: any) =>x?.product===searchValue?.productId)
                  ?.map((x) => (
                    <li
                      onClick={() => {
                        let temp = searchValue?.seq;
                        temp = x?.batchNumber;
                        setSearchValue({
                          ...searchValue,
                          seq: temp,
                        });
                        temp = data.filter((y: any) =>y?.batchNumber===x?.batchNumber)
                        console.log(temp);
                        setFiltered([...temp]);
                      }}
                      className="px-3 hover:bg-slate-200 py-1 truncate transition-all duration-100"
                    >
                      {x?.batchNumber || "No Name"}
                    </li>
                  ))}
              </Select>
            </div>
            <div className="flex  items-center gap-3">
              <button
                className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#5970F5] text-white text-[16px]"
                onClick={() => {
                  setFiltered([...data]);
                  setSearchValue({})
                }}
              >
                Reset
              </button>
            </div>
          </div>


          <table className="w-full text-[14px] border-collapse rounded border mt-5">
            <thead className="bg-[#C3CBFF]">
              <tr className=" text-black">
                <th className="  w-1/12">S No</th>
                <th className=" w-1/12">Finished Goods Name</th>
                <th className=" w-1/12">Batch Number</th>
                <th className=" w-1/12">Production Quantity </th>
                <th className=" w-1/12">Rejected Quantity</th>
                <th className=" w-1/12">Total Quantity</th>
                <th className=" w-1/12">UOM</th>
                <th className=" w-1/12">QC</th>
              </tr>
            </thead>
            <tbody>
              {filtered?.map((x: any, i: number) => (
                <>
                    <tr className="text-center">
                      <td className="text-center  border  justify-center py-2 items-center ">
                        <div className="flex justify-center items-center">
                          <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{i}</label>
                        </div>
                      </td>
                      
                      <td className="text-center border justify-center py-2 items-center ">
                        <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{dropDowns?.products?.find((z) => z?._id === x?.product)?.productName}</label>
                      </td>
                      <td className="text-center border justify-center py-2 items-center ">
                        <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{x?.batchNumber}</label>
                      </td>
                      <td className="text-center border justify-center py-2 items-center ">
                        <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{x?.productionQuantity}</label>
                      </td>
                      <td className="text-center border justify-center py-2 items-center ">
                        <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{x?.rejected}</label>
                      </td>
                      <td className="text-center border justify-center py-2 items-center ">
                        <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{+x?.productionQuantity - +x?.rejected}</label>
                      </td>
                      <td className="text-center border justify-center py-2 items-center ">
                        <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{dropDowns?.uom?.filter((z) => z?._id === x?.uom)[0]?.value?.name}</label>
                      </td>
                      <td className="text-center border justify-center py-2 items-center ">
                        <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{x?.qcfg ? "Done":"Not Done" }</label>
                      </td>
                    </tr>
                </>
              ))}
            </tbody>
          </table>

          <div className="w-full absolute bottom-4 justify-center items-center gap-3 flex mt-5">
            <button type="button" className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" >
              Cancel
            </button>
            <button className=" rounded-md py-2 px-4 font-semibold bg-[#5970F5] text-white" >
              Print
            </button>
          </div>
        </div>
      </div>
      {confirmation && <DeleteConfirmationBox posColor="bg-[#196000]" RejectFunction={() => setConfirmation(false)} ResolveFunction={handleSave} message="Do you want to save?" pos="save" />}
    </div>
  );
}

export default QualityFGReport;
