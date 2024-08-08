/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { getAllQCPO, getAllUserManagement, getAllVendorMaster, getType } from "../../../utils/redux/actions";
import styles from "./StockCheckList.module.scss";

import { getAllProductRawMaterial, getAllPurchaseInward } from "../../../utils/redux/actions";
import Select from "../../../components/Select";

function StockCheckList() {
  const [data, setData] = useState<any[]>([]);

  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const [dropDowns, setDropDown] = useState<{
    products: any[];
  }>({ products: [] });

  const [searchValue, setSearchValue] = useState<{
    warehouse: string;
    batchNum: string;
    productName: string;
  }>({ warehouse: "", batchNum: "", productName: "" });
  useEffect(() => {
    dispatch(getAllPurchaseInward()).then((res: any) => {
      setData(res.payload.active);
      console.log(res);
    });
    dispatch(getAllProductRawMaterial()).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          products: res?.payload?.active,
        };
      });
    });
  }, []);
  // const batchNumber
  const productName = dropDowns?.products?.map((e: any) => e.productName);
  const uniqueProductName = [...new Set(productName)];
  const dropBatchNumber = data?.map((e) => e.products?.map((a: any) => a.batchNumber)).flat();
  const uniqueBatchNumbers = [...new Set(dropBatchNumber)];

  console.log("uniNUm", uniqueProductName);
  console.log("uni", uniqueBatchNumbers);
  return (
    <div className="h-[83vh] w-screen">
      <div className="w-full px-5 h-[90%] pt-2">
        <h1 className="text-xl roboto-bold">Stock Check </h1>
        <div className="bg-[#F1F3FF] shadow-md mt-2 w-full p-4 rounded-lg h-full">
          <div className="bg-white rounded-lg w-full pt-3 h-[80%] shadow-md mt-0">
            <h2 className="roboto-bold ms-3 text-[20px] text-center">Stock Check List</h2>
            <div className="grid grid-cols-4 items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-[98%] ml-[17px] rounded-lg px-3 py-2">
              <div className="flex items-center gap-3 justify-between">
                <label>Product Name</label>
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
              <div className="flex items-center gap-3 justify-between">
                <label>Batch Number</label>

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
              <button type="submit">
                <svg width="71" height="35" viewBox="0 0 71 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="71" height="35" rx="5" fill="#5970F5" />
                  <path d="M21.6667 21.6667L25 25M10 16.6667C10 18.4348 10.7024 20.1305 11.9526 21.3807C13.2029 22.631 14.8986 23.3333 16.6667 23.3333C18.4348 23.3333 20.1305 22.631 21.3807 21.3807C22.631 20.1305 23.3333 18.4348 23.3333 16.6667C23.3333 14.8986 22.631 13.2029 21.3807 11.9526C20.1305 10.7024 18.4348 10 16.6667 10C14.8986 10 13.2029 10.7024 11.9526 11.9526C10.7024 13.2029 10 14.8986 10 16.6667Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path
                    d="M37.5327 12.7578V22H35.9395V12.7578H37.5327ZM41.3032 16.8013V18.0645H37.1265V16.8013H41.3032ZM41.8301 12.7578V14.0273H37.1265V12.7578H41.8301ZM44.585 15.1318V22H43.0488V15.1318H44.585ZM42.9473 13.3291C42.9473 13.0964 43.0234 12.9038 43.1758 12.7515C43.3324 12.5949 43.5482 12.5166 43.8232 12.5166C44.0941 12.5166 44.3078 12.5949 44.4644 12.7515C44.6209 12.9038 44.6992 13.0964 44.6992 13.3291C44.6992 13.5576 44.6209 13.748 44.4644 13.9004C44.3078 14.0527 44.0941 14.1289 43.8232 14.1289C43.5482 14.1289 43.3324 14.0527 43.1758 13.9004C43.0234 13.748 42.9473 13.5576 42.9473 13.3291ZM47.7778 16.5981V22H46.248V15.1318H47.689L47.7778 16.5981ZM47.5049 18.312L47.0098 18.3057C47.014 17.819 47.0817 17.3726 47.2129 16.9663C47.3483 16.5601 47.5345 16.2109 47.7715 15.9189C48.0127 15.627 48.3005 15.4027 48.6348 15.2461C48.9691 15.0853 49.3415 15.0049 49.752 15.0049C50.082 15.0049 50.3804 15.0514 50.647 15.1445C50.9178 15.2334 51.1484 15.3794 51.3389 15.5825C51.5335 15.7856 51.6816 16.0501 51.7832 16.376C51.8848 16.6976 51.9355 17.0933 51.9355 17.563V22H50.3994V17.5566C50.3994 17.2266 50.3507 16.9663 50.2534 16.7759C50.1603 16.5812 50.0228 16.4437 49.8408 16.3633C49.6631 16.2786 49.4409 16.2363 49.1743 16.2363C48.9119 16.2363 48.6771 16.2913 48.4697 16.4014C48.2624 16.5114 48.0868 16.6616 47.9429 16.8521C47.8032 17.0425 47.6953 17.2625 47.6191 17.5122C47.543 17.7619 47.5049 18.0285 47.5049 18.312ZM57.6865 20.5781V12.25H59.2227V22H57.8325L57.6865 20.5781ZM53.2178 18.6421V18.5088C53.2178 17.9883 53.2791 17.5143 53.4019 17.0869C53.5246 16.6553 53.7023 16.285 53.9351 15.9761C54.1678 15.6629 54.4513 15.4238 54.7856 15.2588C55.12 15.0895 55.4966 15.0049 55.9155 15.0049C56.3302 15.0049 56.6942 15.0853 57.0073 15.2461C57.3205 15.4069 57.5871 15.6375 57.8071 15.938C58.0272 16.2342 58.2028 16.5897 58.334 17.0044C58.4652 17.4149 58.5583 17.8719 58.6133 18.3755V18.8008C58.5583 19.2917 58.4652 19.7402 58.334 20.1465C58.2028 20.5527 58.0272 20.904 57.8071 21.2002C57.5871 21.4964 57.3184 21.7249 57.001 21.8857C56.6878 22.0465 56.3218 22.127 55.9028 22.127C55.4881 22.127 55.1136 22.0402 54.7793 21.8667C54.4492 21.6932 54.1678 21.4499 53.9351 21.1367C53.7023 20.8236 53.5246 20.4554 53.4019 20.0322C53.2791 19.6048 53.2178 19.1414 53.2178 18.6421ZM54.7476 18.5088V18.6421C54.7476 18.9552 54.7751 19.2472 54.8301 19.5181C54.8893 19.7889 54.9803 20.028 55.103 20.2354C55.2257 20.4385 55.3844 20.5993 55.5791 20.7178C55.778 20.832 56.015 20.8892 56.29 20.8892C56.637 20.8892 56.9227 20.813 57.147 20.6606C57.3713 20.5083 57.5469 20.3031 57.6738 20.0449C57.805 19.7826 57.8939 19.4906 57.9404 19.1689V18.02C57.915 17.7703 57.8621 17.5376 57.7817 17.3218C57.7056 17.106 57.6019 16.9176 57.4707 16.7568C57.3395 16.5918 57.1766 16.4648 56.9819 16.376C56.7915 16.2829 56.5651 16.2363 56.3027 16.2363C56.0234 16.2363 55.7865 16.2956 55.5918 16.4141C55.3971 16.5326 55.2363 16.6955 55.1094 16.9028C54.9867 17.1102 54.8957 17.3514 54.8364 17.6265C54.7772 17.9015 54.7476 18.1956 54.7476 18.5088Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
            <table className="w-full mt-3 ">
              <thead className="border w-full top-0 left-0  text-xs text-center bg-[#5970F5] text-white roboto-thin">
                <tr className="w-full">
                  <th className="border-r w-1/8">S No</th>
                  <th className="border-r w-1/8">Product Name</th>
                  <th className="border-r w-1/8">Batch Number</th>
                  <th className="border-r w-1/8">Product Quantity</th>
                  <th className="border-r w-1/8">Expiry Date</th>
                  <th className="border-r w-1/8">Shortage</th>
                  <th className="border-r w-1/8">Overage</th>
                  {/* <th className="border-r w-1/8">Warehouse Name</th> */}
                  <th className="border-r w-1/8">Action</th>
                </tr>
              </thead>
              <tbody className="overflow-auto text-xs text-center  text-[#5970F5] roboto-thin">
                {data?.map((e, j) =>
                  e?.products
                    .filter(
                      (x: any) =>
                        x?.batchNumber?.toLowerCase()?.includes(searchValue?.batchNum?.toLowerCase()) &&
                        (searchValue?.productName
                          ? dropDowns?.products
                              ?.filter((y) => y?._id === x?.productId)[0]
                              ?.productName?.toLowerCase()
                              ?.includes(searchValue?.productName?.toLowerCase())
                          : true)
                    )
                    .map((x: any, i: number) => (
                      <tr>
                        <th>{j + i + 1}</th>
                        <th>{dropDowns?.products?.filter((y) => y?._id === x?.productId)[0]?.productName}</th>
                        <th>{x?.batchNumber}</th>
                        <th>{x?.rejectedQuantity ? parseInt(x?.recievedQuantity) - parseInt(x?.rejectedQuantity) : x?.recievedQuantity}</th>
                        <th>{x?.expDate}</th>
                        <th>{parseInt(x?.orderQuantity) - parseInt(x?.recievedQuantity) > 0 ? parseInt(x?.orderQuantity) - parseInt(x?.recievedQuantity) : 0}</th>
                        {/* <th>s{x?.orderQuantity - x?.recievedQuantity}</th> */}
                        <th>{parseInt(x?.recievedQuantity) > parseInt(x?.orderQuantity) ? parseInt(x?.recievedQuantity) - parseInt(x?.orderQuantity) : 0}</th>

                        <th className="relative ">
                          <button className={" cursor-pointer h-full w-full flex items-center justify-center pt-1 " + styles.more}>
                            <svg width="2" height="9" viewBox="0 0 2 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.80618 8.18484C1.80618 7.73465 1.4412 7.36969 0.99098 7.36969C0.540758 7.36969 0.175781 7.73465 0.175781 8.18484C0.175781 8.63504 0.540758 9 0.99098 9C1.4412 9 1.80618 8.63504 1.80618 8.18484Z" fill="#5970F5" />
                              <path d="M1.80618 4.92313C1.80618 4.47293 1.4412 4.10797 0.99098 4.10797C0.540758 4.10797 0.175781 4.47293 0.175781 4.92313C0.175781 5.37332 0.540758 5.73828 0.99098 5.73828C1.4412 5.73828 1.80618 5.37332 1.80618 4.92313Z" fill="#5970F5" />
                              <path d="M1.80618 1.66531C1.80618 1.21512 1.4412 0.850159 0.99098 0.850159C0.540758 0.850159 0.175781 1.21512 0.175781 1.66531C0.175781 2.11551 0.540758 2.48047 0.99098 2.48047C1.4412 2.48047 1.80618 2.11551 1.80618 1.66531Z" fill="#5970F5" />
                            </svg>
                          </button>
                          <div className={"hidden hover:flex flex-col gap-[1px] absolute right-0 z-20 " + styles.option}>
                            <button onClick={() => navigate("/inventory/purchase-inward/view/" + e?._id)} className="bg-[#E0E4FF] rounded-md shadow-md shadow-[#00000040] gap-2 items-center text-black flex px-2 py-1">
                              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.0039 7.49999C8.32636 7.49999 9.39843 6.42792 9.39843 5.10546C9.39843 3.783 8.32636 2.71094 7.0039 2.71094C5.68144 2.71094 4.60938 3.783 4.60938 5.10546C4.60938 6.42792 5.68144 7.49999 7.0039 7.49999Z" stroke="black" />
                                <path d="M12.6018 4.3756C12.8673 4.69852 13 4.85929 13 5.1049C13 5.35051 12.8673 5.51129 12.6018 5.83421C11.6303 7.01368 9.48757 9.2098 7 9.2098C4.51243 9.2098 2.36967 7.01368 1.39818 5.83421C1.13273 5.51129 1 5.35051 1 5.1049C1 4.85929 1.13273 4.69852 1.39818 4.3756C2.36967 3.19612 4.51243 1 7 1C9.48757 1 11.6303 3.19612 12.6018 4.3756Z" stroke="black" />
                              </svg>
                              View
                            </button>
                            <button onClick={() => navigate("/inventory/purchase-inward/edit/" + e?._id)} className="bg-[#E0E4FF] rounded-md shadow-md shadow-[#00000040] gap-2 items-center text-black flex px-2 py-1">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M6.5 1.5C6.62744 1.50014 6.75002 1.54894 6.84268 1.63642C6.93535 1.72391 6.99112 1.84348 6.99859 1.9707C7.00605 2.09792 6.96466 2.22319 6.88287 2.32092C6.80107 2.41864 6.68505 2.48145 6.5585 2.4965L6.5 2.5H2.5V9.5H9.5V5.5C9.50014 5.37256 9.54894 5.24998 9.63642 5.15732C9.72391 5.06465 9.84348 5.00888 9.9707 5.00141C10.0979 4.99395 10.2232 5.03534 10.3209 5.11713C10.4186 5.19893 10.4814 5.31495 10.4965 5.4415L10.5 5.5V9.5C10.5001 9.75229 10.4048 9.99528 10.2333 10.1803C10.0617 10.3653 9.82658 10.4786 9.575 10.4975L9.5 10.5H2.5C2.24771 10.5001 2.00472 10.4048 1.81973 10.2333C1.63474 10.0617 1.52142 9.82658 1.5025 9.575L1.5 9.5V2.5C1.49992 2.24771 1.5952 2.00472 1.76675 1.81973C1.93829 1.63474 2.17342 1.52142 2.425 1.5025L2.5 1.5H6.5ZM9.6215 1.6715C9.71148 1.58183 9.83222 1.52976 9.95919 1.52589C10.0862 1.52201 10.2099 1.56661 10.3051 1.65062C10.4004 1.73464 10.4602 1.85178 10.4722 1.97824C10.4842 2.1047 10.4477 2.231 10.37 2.3315L10.3285 2.379L5.3785 7.3285C5.28852 7.41817 5.16778 7.47024 5.04081 7.47411C4.91383 7.47799 4.79014 7.43339 4.69486 7.34938C4.59958 7.26536 4.53985 7.14822 4.5278 7.02176C4.51575 6.8953 4.55229 6.769 4.63 6.6685L4.6715 6.6215L9.6215 1.6715Z"
                                  fill="black"
                                />
                              </svg>
                              Edit
                            </button>
                          </div>
                        </th>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockCheckList;
