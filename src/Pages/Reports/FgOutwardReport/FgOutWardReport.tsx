/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllFinishedGoodsOutward, getAllProductFinishedGoods, getType } from "../../../utils/redux/actions";
import Select from "../../../components/Select";


function FgOutWardReport() {
  const [filtered, setFiltered] = useState<any[]>([]);
  const dispatch: any = useDispatch();

  const [dropDown, setDropDown] = useState<{ finishedGoods: any[]; batchNum: any[]; uom: any[] }>({ batchNum: [], finishedGoods: [], uom: [] });
  const [products, setProducts] = useState<any[]>();
  const [searchValue, setSearchValue] = useState<{
    batchNum: string;
    productName: string;
  }>({ batchNum: "", productName: "" });

  useEffect(() => {
    dispatch(getAllFinishedGoodsOutward()).then((res: any) => {
      console.log("res", res);
      setFiltered(res.payload);
     
    });
    dispatch(getAllProductFinishedGoods()).then((res: any) => {
      setProducts(res?.payload?.active);
    });

    dispatch(getType("uom")).then((res: any) => {
      console.log("ddres", res);
      setDropDown((prev) => {
        return {
          ...prev,
          uom: res?.payload?.[0]?.uomType,
        };
      });
    });
  }, []);

  // const batchNumber
  const productName = products?.map((e: any) => e.productName);
  const uniqueProductName = [...new Set(productName)];
  const dropBatchNumber = filtered?.map((e) => e.products?.map((a: any) => a.batchNumber)).flat();
  const uniqueBatchNumbers = [...new Set(dropBatchNumber)];

  console.log("f", filtered);
  return (
    <div className="px-10 py-3">
      <h1 className="font-semibold text-[20px]">Inventory Report</h1>
      <div className="w-full min-h-[80vh] bg-[#F1F3FF] rounded-2xl shadow-[#00000080] shadow-md px-3">
        <h2>Finished Goods Outward Report</h2>
        <div className="bg-white p-3 rounded-2xl">
          <div className="grid grid-cols-4 w-full gap-4">
            <div className="flex gap-3 items-center">
              <label className="text-[14px] w-[200px]">Product Name</label>
              <Select
                className="bg-white z-[990]"
                onChange={(e) => {
                  setSearchValue({ ...searchValue, productName: e.target.value });
                }}
                value={searchValue?.productName || ""}
              >
                {uniqueProductName
                  ?.filter((a) => a?.toLowerCase()?.includes(searchValue?.productName?.toLowerCase() || ""))
                  .map((x) => (
                    <li
                      onClick={() => {
                        setSearchValue({
                          ...searchValue,
                          productName: x,
                        });
                      }}
                      className="px-3 truncate bg-white hover:bg-slate-200 py-1 transition-all duration-100"
                    >
                      {x}
                    </li>
                  ))}
              </Select>
            </div>

            <div className="flex gap-3 items-center">
              <label className="text-[14px]">Batch Number</label>
              <Select
                className="bg-white z-[990]"
                onChange={(e) => {
                  setSearchValue({ ...searchValue, batchNum: e.target.value });
                }}
                value={searchValue?.batchNum || ""}
              >
                {uniqueBatchNumbers
                  ?.filter((a) => a?.toLowerCase()?.includes(searchValue?.batchNum?.toLowerCase() || ""))
                  .map((x) => (
                    <li
                      onClick={() => {
                        setSearchValue({
                          ...searchValue,
                          batchNum: x,
                        });
                      }}
                      className="px-3 truncate bg-white hover:bg-slate-200 py-1 transition-all duration-100"
                    >
                      {x}
                    </li>
                  ))}
              </Select>
            </div>
            <div className="flex justify-center items-center">
              <button className="bg-[#5970F5] text-white flex gap-3 items-center px-3 py-1 rounded-md">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.6667 12.6667L16 16M1 7.66667C1 9.43478 1.70238 11.1305 2.95262 12.3807C4.20286 13.631 5.89856 14.3333 7.66667 14.3333C9.43478 14.3333 11.1305 13.631 12.3807 12.3807C13.631 11.1305 14.3333 9.43478 14.3333 7.66667C14.3333 5.89856 13.631 4.20286 12.3807 2.95262C11.1305 1.70238 9.43478 1 7.66667 1C5.89856 1 4.20286 1.70238 2.95262 2.95262C1.70238 4.20286 1 5.89856 1 7.66667Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Find
              </button>
            </div>
          </div>
          <table className="w-full mt-5">
            <thead>
              <tr className="bg-[#C3CBFF]">
                <th>S No</th>
                <th>Product Name</th>
                <th>Supply Type</th>
                <th>Batch Number</th>
                <th>Outward Quantity</th>
                <th>UOM</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Outward Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered?.map((e: any, j: number) =>
                e.products
                  ?.filter(
                    (x: any) =>
                      x?.batchNumber?.toLowerCase()?.includes(searchValue?.batchNum?.toLowerCase()) &&
                      (searchValue?.productName
                        ? products
                            ?.filter((y) => y?._id === x?.productId)[0]
                            ?.productName?.toLowerCase()
                            ?.includes(searchValue?.productName?.toLowerCase())
                        : true)
                  )
                  ?.map((x: any, i: number) => (
                    <tr>
                      <td className="text-center">{i + j + 1}</td>
                      <td className="text-center">{products?.find((y) => y._id === x.productId).productName || "No Name"}</td>
                      <td className="text-center">{e?.supplyChain || "No Name"}</td>
                      <td className="text-center">{x?.batchNumber || "No Batch Number"}</td>
                      <td className="text-center">{x?.outWardQuantity || "No value Found"}</td>
                      <td className="text-center">{dropDown?.uom?.filter((y) => y?._id === x?.uom)[0]?.value?.name}</td>
                      <td className="text-center">{e?.sender?.warehouseName || "No Value Found"}</td>
                      <td className="text-center">{e?.receiver?.warehouseName || "No Value Found"}</td>
                      <td className="text-center">{e?.outwardDate || "No Value Found"}</td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FgOutWardReport;
