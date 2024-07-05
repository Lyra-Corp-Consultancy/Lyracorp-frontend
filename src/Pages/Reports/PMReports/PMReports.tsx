/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProductFinishedGoods, getAllProductRawMaterial, getRMReports, getType } from "../../../utils/redux/actions";
import Select from "../../../components/Select";

function PMReports() {
  const [products, setProducts] = useState<any[]>([]);
  const dispatch: any = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState<any>();
  const [rawMaterials, setRawMaterials] = useState<any[]>([]);
  const [report, setReports] = useState<any[]>([]);
  const [uom,setUom] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getAllProductFinishedGoods()).then((res: any) => {
      setProducts(res.payload.active);
    });
    dispatch(getType("uom")).then((res:any)=>{
      setUom(res.payload[0]?.uomType)
    })
    dispatch(getAllProductRawMaterial()).then((res: any) => {
      setRawMaterials(res.payload.active);
    });
    dispatch(getRMReports()).then((res: any) => {
      console.log(res.payload);
      setReports(res.payload);
    });
  }, []);
  return (
    <div className="px-5">
      <h1 className="text-[20px] font-semibold">Inventory Report</h1>
      <div className="bg-[#F1F3FF] rounded-xl shadow-md w-full min-h-[80vh] px-5 pt-2 pb-5">
        <h1 className="font-semibold text-[17px]">Product Mapping Report</h1>
        <div className="w-full max-h-[80%] rounded-xl bg-white p-3 shadow-md">
          <div className="flex gap-7">
            <h6>Product Name</h6>
            <Select value={selectedProducts?.productName || ""}>
              {products?.map((x) => (
                <li onClick={() =>{
                   setSelectedProducts(x)
                   console.log(x)
                   }} className="px-1 truncate py-1 hover:bg-slate-300 transition-all duration-150">
                  {x.productName}
                </li>
              ))}
            </Select>
            <button className="text-white rounded-md px-3 py-1 bg-[#5970F5] flex items-center gap-3">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6667 12.6667L16 16M1 7.66667C1 9.43478 1.70238 11.1305 2.95262 12.3807C4.20286 13.631 5.89856 14.3333 7.66667 14.3333C9.43478 14.3333 11.1305 13.631 12.3807 12.3807C13.631 11.1305 14.3333 9.43478 14.3333 7.66667C14.3333 5.89856 13.631 4.20286 12.3807 2.95262C11.1305 1.70238 9.43478 1 7.66667 1C5.89856 1 4.20286 1.70238 2.95262 2.95262C1.70238 4.20286 1 5.89856 1 7.66667Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Find
            </button>
          </div>
          {selectedProducts?.productName && (
            <div className="w-full shadow-[0px_0px_4px_rgba(0,0,0,0.385)] mt-5 rounded-lg p-3">
              <div className="flex gap-6">
                <h6>Product Name</h6>
                <p className="shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] px-3 py-1 rounded-md">{selectedProducts?.productName}</p>
              </div>
              <table className="w-full mt-5">
                <thead>
                  <tr className="bg-[#5970F5] text-white">
                    <th>S No</th>
                    <th className="border">Raw Material</th>
                    <th className="border">Required Quantity</th>
                    <th className="border">UOM</th>
                    <th className="border w-1/4">Warehouse</th>
                    <th className="border">Available Quantity</th>
                    <th className="border">UOM</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts?.mappings?.map((x: any, i: number) => (
                    <>
                    <tr className={(report.filter((y) => y?.product?._id === x?.product )[0]?.quantity<x.quantity || !report.filter((y) => y?.product?._id === x?.product )[0]?.quantity) ? "text-red-500":"" }>
                      <td className="border text-center" rowSpan={report.filter((y) => y?.product?._id === x?.product ).length}>{i + 1}</td>
                      <td className="border text-center" rowSpan={report.filter((y) => y?.product?._id === x?.product ).length}>{rawMaterials.filter((y) => y?._id === x?.product)[0]?.productName}</td>
                      <td className="border text-center w-1/4 p-1" rowSpan={report.filter((y) => y?.product?._id === x?.product ).length}>{x?.quantity}</td>
                      <td className="border text-center" rowSpan={report.filter((y) => y?.product?._id === x?.product ).length}>{uom.find((z)=>z._id===rawMaterials.filter((y) => y?._id === x?.product)[0]?.uomType).value.name || "Not Found" }</td>
                      <td className="border text-center">{report.filter((y) => y?.product?._id === x?.product )[0]?.warehouse?.warehouseName || "Out Of Stock"}</td>
                      <td className="border text-center">{report.filter((y) => y?.product?._id === x?.product )[0]?.quantity || 0 }</td>
                      <td className="border text-center">{report.filter((y) => y?.product?._id === x?.product )[0]?.uom?.name ||uom.find((z)=>z._id===rawMaterials.filter((y) => y?._id === x?.product)[0]?.uomType).value.name  || "Not Found" }</td>
                    </tr>
                    {report.filter((y) => y?.product?._id === x?.product ).map((z,i)=>(
                     <> {i>0 && <tr className={(report.filter((y) => y?.product?._id === x?.product )[0]?.quantity<x.quantity || !report.filter((y) => y?.product?._id === x?.product )[0]?.quantity) ? "text-red-500":"" }>
                      <td className="border text-center">{z?.warehouse?.warehouseName || "Out Of Stock"}</td>
                      <td className="border text-center">{z?.quantity || 0 }</td>
                      <td className="border text-center">{z?.uom?.name||uom.find((z)=>z._id===rawMaterials.filter((y) => y?._id === x?.product)[0]?.uomType).value.name || "Not Found" }</td>
                    </tr>}</>
                    ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PMReports;
