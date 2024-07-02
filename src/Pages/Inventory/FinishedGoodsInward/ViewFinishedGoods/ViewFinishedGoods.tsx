/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {  getFinishedGoodsInwardIndividual, getProductsFinishedGoods, getType } from "../../../../utils/redux/actions";
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
    <div className="px-4 py-4">
      <h1 className="font-semibold text-[18px]">Finished Goods Inward</h1>
      <div className="bg-[#F1F3FF] min-h-[80vh] w-full p-2 rounded-3xl">
        <div className="bg-white w-full min-h-[70vh] rounded-3xl p-5">
          <h1 className="font-semibold text-[17px]">View Product Details</h1>
          <table className="w-full mt-5">
            <thead className="text-center border border-white">
              <tr className="bg-[#5970F5] text-white">
                <th className="text-center border border-white">Product Name</th>
                <th className="text-center border border-white">Batch Number</th>
                <th className="text-center border border-white">Production Quantity</th>
                <th className="text-center border border-white">UOM</th>
                <th className="text-center border border-white">Rejected Quantity</th>
                <th className="text-center border border-white">Total</th>
                <th className="text-center border border-white">Warehouse Name</th>
                <th className="text-center border border-white">Pick Location</th>
                <th className="text-center border border-white">Inward Documents</th>
                <th className="text-center border border-white">Upload</th>
              </tr>
            </thead>
            <tbody>
              {data.map((x, i) => (
                <tr>
                  <td className="px-3 py-1 border">
                    <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[100px] truncate rounded-md">{products.find((y) => y._id === x?.product)?.productName}</label>
                  </td>
                  <td className="px-3 py-1 border">
                    <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[100px] truncate rounded-md">{x?.batchNumber}</label>
                  </td>
                  <td className="px-3 py-1 border">
                    <h6 className="shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] rounded-md">{x?.productionQuantity}</h6>
                  </td>
                  <td className="px-3 py-1 border">
                    <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[100px] truncate rounded-md">{dropDowns?.uom?.find((y) => y?._id === x?.uom)?.value?.name}</label>
                  </td>
                  <td className="px-3 py-1 border">
                    <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[100px] truncate rounded-md">{x?.rejected}</label>
                  </td>
                  <td className="px-3 py-1 border">
                    <h6 className="shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md h-[25px] w-[100px]">{(x?.productionQuantity || 0) - (x?.rejected || 0)}</h6>
                  </td>
                  <td className="px-3 py-1 border">
                    <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[100px] truncate rounded-md">{x?.warehouse?.address}</label>
                  </td>
                  <td className="px-3 py-1 border">
                    <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[100px] truncate rounded-md">{x?.pick?.address}</label>
                  </td>
                  <td className="px-3 py-1 border">
                    <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[100px] truncate rounded-md">{x.doc}</label>
                  </td>
                  <td className="px-3 py-1 border">
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
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-end mt-5"></div>
          <div className="flex gap-5 items-center justify-center mt-5">
            <button onClick={() => navigate(-1)} className="px-3 py-1 rounded-lg border border-[#5970F5] text-[#5970F5]">
              Cancel
            </button>
            <button onClick={()=>navigate("/inventory/finished-goods-inward/edit/"+params.id)} className="px-3 py-1 rounded-lg bg-[#5970F5] text-white">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewFinishedGoods;
