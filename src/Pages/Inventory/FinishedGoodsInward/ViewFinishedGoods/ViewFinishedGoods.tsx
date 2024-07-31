/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFinishedGoodsInwardIndividual, getProductsFinishedGoods, getType } from "../../../../utils/redux/actions";
import { useNavigate, useParams } from "react-router-dom";

function ViewFinishedGoods() {
  const dispatch: any = useDispatch();
  const [products, setProducts] = useState<{ productName: string; _id: string }[]>([]);
  const [data, setData] = useState<{ product?: string; batchNumber?: string; productionQuantity?: number; uom?: string; rejected?: number; warehouse?: any; pick?: any; doc?: string; link?: any }[]>([{}]);

  const params: any = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getFinishedGoodsInwardIndividual(params.id)).then((res: any) => {
      setData([res.payload]);
    });
  }, []);

  const [dropDowns, setDropDowns] = useState<{ uom: any[] }>({ uom: [] });
  useEffect(() => {
    dispatch(getProductsFinishedGoods()).then((res: any) => {
      setProducts(res.payload);
    });
    dispatch(getType("uom")).then((res: any) => {
      setDropDowns({ ...dropDowns, uom: res.payload?.[0]?.uomType });
    });
  }, []);
  
  return (
    <div className=" w-screen px-4 pt-3 shadow-md">
      <h1 className="roboto-bold text-lg">Finished Goods Inward</h1>
      <div className="bg-[#F1F3FF] shadow-md p-3 rounded-lg w-full">
        <div className="shadow-md bg-white pb-[100px] px-4 h-full z-[0] relative rounded-lg pt-1 w-full">
          <h1 className="roboto-medium mt-1">View Product Details</h1>
          <table className="w-full text-[14px] border-collapse rounded border">
            <thead className="bg-[#5970F5]">
              <tr className=" text-white">
                <th className=" border-r w-1/10">Product Name</th>
                <th className=" border-r w-1/10">Batch Number</th>
                <th className=" border-r w-1/10">Production Quantity</th>
                <th className=" border-r w-1/10">UOM</th>
                <th className=" border-r w-1/10">Rejected Quantity</th>
                <th className=" border-r w-1/10">Total</th>
                <th className=" border-r w-1/10">Warehouse Name</th>
                <th className=" border-r w-1/10">Pick Location</th>
                <th className=" border-r w-1/10">Inward Documents</th>
                <th className=" border-r w-1/10">Upload</th>
              </tr>
            </thead>
            <tbody>
              {data.map((x: any,i ) => (
                <tr className="text-center">
                  <td className="text-center  border  justify-center py-2 items-center ">
                    <div className="flex justify-center items-center">
                      <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{products.find((y) => y._id === x?.product)?.productName}</label>
                    </div>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-1 py-1 rounded-md">{x?.batchNumber} </label>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{x?.productionQuantity} </label>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{dropDowns?.uom?.find((y) => y?._id === x?.uom)?.value?.name}</label>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{x?.rejected}</label>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{(x?.productionQuantity || 0) - (x?.rejected || 0)}</label>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{x?.warehouse?.warehouseName}</label>
                  </td>
                  <td className="text-center border w-[100px] justify-center py-2 items-center ">
                    <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{x?.pick?.warehouseName}</label>
                  </td>
                  <td className="text-center border justify-center py-2 items-center ">
                    <label className="h-[30px] w-[90%] truncate shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md">{x.doc}</label>
                  </td>

                  <td className="text-center border justify-center py-2 items-center ">
                  <p
                      onClick={() => {
                        let url = "";
                        if (x.link.includes("https://fileserver.lyracorp.in")) {
                          url = x.link;
                        } else {
                          url = URL.createObjectURL(x.link);
                        }
                        window.open(url);
                      }}
                      className="text-[9px] cursor-pointer text-[#5970F5] underline"
                    >
                      Preview {i + 1}
                    </p>  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="w-full absolute bottom-4 justify-center items-center gap-3 flex mt-5">
            <button type="button" className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button className=" rounded-md py-2 px-4 font-semibold bg-[#5970F5] text-white" onClick={() => navigate("/inventory/purchase-inward/edit/" + params.id)}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewFinishedGoods;
