/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import NavigationBar from "../../../../components/NavigationBar";
import Select from "../../../../components/Select";
import { useDispatch } from "react-redux";
import {
  editProductFinishedGoods,
  getAllProductFinishedGoods,
  getAllProductRawMaterial,
} from "../../../../utils/redux/actions";

function ProductMapping() {
  const [finishedGoods, setFinishedGoods] = useState<any[]>([]);
  const [mappings, setMappings] = useState<any[]>([{}]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [rawMaterials, setRawMaterials] = useState<any[]>([]);
  // const [fetchedMapping, setFetchedMapping] = useState<any[]>([]);

  const [searchValue, setSearchValue] = useState<{
    fgMaterial: string;
    fgMaterialAdd: string;
    raw: any[];
  }>({
    fgMaterial: "",
    raw: [],
    fgMaterialAdd: "",
  });

  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(getAllProductFinishedGoods()).then((res: any) => {
      // console.log(res.payload.active)
      setFinishedGoods(res.payload.active);
    });
    dispatch(getAllProductRawMaterial()).then((res: any) => {
      // console.log(res.payload.active)
      setRawMaterials(res.payload.active);
    });
  }, []);
    // const fil= finishedGoods ?.filter(
    //   (x) =>
    //     x?.productName ===
    //   searchValue.fgMaterial
    // )[0]?.productName

  return (
    <div>
      <NavigationBar />
      <div className="min-h-[83vh] w-screen">
        <div className="w-full px-5 min-h-[90%] pt-2">
          <h1 className="text-xl roboto-bold">Product mapping</h1>
          <div className="bg-[#F1F3FF] grid grid-cols-2 gap-36 shadow-md mt-2 w-full p-4 rounded-lg h-full">
            <div className="bg-white w-full h-full shadow-md rounded-md px-3 py-2">
              <h1 className="font-bold">Mapped Material List</h1>
              <div className="shadow-[0px_0px_4px_rgba(0,0,0,0.385)] mt-3 rounded-md w-full flex items-center justify-between px-7 py-2">
                <label className="flex gap-4">
                  FG Material
                  <Select
                  required
                  pattern={
                    finishedGoods ?.filter(
                        (x) =>
                          x?.productName ===
                        searchValue.fgMaterial
                      )[0]?.productName
                        ? undefined
                        : ""
                    }
                    title="Please Select values from drop down"
                    onChange={(e) => {
                      setSearchValue({
                        ...searchValue,
                        fgMaterial: e.target.value,
                      });
                    }}
                    value={searchValue.fgMaterial || ""}
                  >
                    {finishedGoods
                      .filter((item) =>
                        item?.productName
                          ?.toLowerCase()
                          .includes(
                            searchValue?.fgMaterial?.toLowerCase() || ""
                          )
                      )
                      .map((x) => (
                        <li
                          className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                          onClick={() => {
                            const temp = selectedProducts;
                            temp[0] = x;
                            setSelectedProducts([...temp]);
                            setSearchValue({
                              ...searchValue,
                              fgMaterial: x.productName,
                            });
                          }}
                        >
                          {x?.productName}
                        </li>
                      ))}
                  </Select>
                </label>
                {/* <button  className="bg-[#5970F5] px-3 py-1 flex text-white justify-between items-center gap-3 rounded-md text-[14px]">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.6667 12.6667L16 16M1 7.66667C1 9.43478 1.70238 11.1305 2.95262 12.3807C4.20286 13.631 5.89856 14.3333 7.66667 14.3333C9.43478 14.3333 11.1305 13.631 12.3807 12.3807C13.631 11.1305 14.3333 9.43478 14.3333 7.66667C14.3333 5.89856 13.631 4.20286 12.3807 2.95262C11.1305 1.70238 9.43478 1 7.66667 1C5.89856 1 4.20286 1.70238 2.95262 2.95262C1.70238 4.20286 1 5.89856 1 7.66667Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  Find
                </button> */}
              </div>
              <h1 className="font-bold mt-3">FG Material Details</h1>
              {selectedProducts[0]?.mappings && (
                <>
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#5970F5] text-white">
                        <th className="border">Raw Material</th>
                        <th className="border">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProducts[0]?.mappings?.map((x: any) => (
                        <tr>
                          <td className="border">
                            {
                              rawMaterials.filter(
                                (y) => y?._id === x?.product
                              )[0]?.productName
                            }
                          </td>
                          <td className="border w-1/4 p-1">{x?.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-center py-3 items-center gap-4 w-full">
                    <button
                      onClick={() => {
                        const temp = selectedProducts;
                        temp[0] = {};
                        setSelectedProducts([...temp]);
                      }}
                      className=" border border-[#5970F5] px-3 py-1 rounded text-[#5970F5] text-[14px]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const temp = selectedProducts;
                        temp[1] = temp[0];
                        temp[0] = {};
                        setMappings([...(temp[1].mappings || [])]);
                        setSelectedProducts([...temp]);
                      }}
                      type="submit"
                      className="bg-[#5970F5] px-3 py-1 rounded text-white text-[14px]"
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="bg-white w-full h-full shadow-md rounded-md px-3 py-2">
              <h1 className="font-bold">Add Mapped Material</h1>
              <div className="shadow-[0px_0px_4px_rgba(0,0,0,0.385)] mt-3 rounded-md w-full flex items-center justify-between px-7 py-2">
                <label className="flex gap-4">
                  FG Material
                  <Select   required
                   pattern={
                  finishedGoods ?.filter(
                      (x) =>
                        x?.productName ===
                      searchValue.fgMaterialAdd 
                    )[0]?.productName
                      ? undefined
                      : ""
                  }
                  title="Please Select values from drop down"
                    onChange={(e) => {
                      setSearchValue({
                        ...searchValue,
                        fgMaterialAdd: e.target.value,
                      });
                    }}
                    value={searchValue.fgMaterialAdd || ""}
                  >
                    {finishedGoods
                      .filter((item) =>
                        item?.productName
                          ?.toLowerCase()
                          .includes(
                            searchValue?.fgMaterialAdd?.toLowerCase() || ""
                          )
                      )
                      .map((x) => (
                        <li
                          className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                          onClick={() => {
                            const temp = selectedProducts;
                            temp[1] = x;
                            setSelectedProducts([...temp]);
                            setSearchValue({
                              ...searchValue,
                              fgMaterialAdd: x.productName,
                            });
                          }}
                        >
                          {x?.productName}
                        </li>
                      ))}
                  </Select>
                </label>
                {/* <button className="bg-[#5970F5] px-3 py-1 flex text-white justify-between items-center gap-3 rounded-md text-[14px]">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.6667 12.6667L16 16M1 7.66667C1 9.43478 1.70238 11.1305 2.95262 12.3807C4.20286 13.631 5.89856 14.3333 7.66667 14.3333C9.43478 14.3333 11.1305 13.631 12.3807 12.3807C13.631 11.1305 14.3333 9.43478 14.3333 7.66667C14.3333 5.89856 13.631 4.20286 12.3807 2.95262C11.1305 1.70238 9.43478 1 7.66667 1C5.89856 1 4.20286 1.70238 2.95262 2.95262C1.70238 4.20286 1 5.89856 1 7.66667Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  Find
                </button> */}
              </div>
              <h1 className="font-bold mt-3">FG Material Details</h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(selectedProducts[1]);
                  dispatch(
                    editProductFinishedGoods({
                      id: selectedProducts[1]?._id,
                      data: { mappings },
                    })
                  ).then(() => {
                    const temp = [...selectedProducts];
                    temp[1] = {};
                    setSelectedProducts([...temp]);
                  });
                }}
                className="w-full py-5"
              >
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#5970F5] text-white">
                      <th className="border">Raw Material</th>
                      <th className="border">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mappings.map((x, i) => (
                      <tr>
                        <td className="border">
                          <Select
                            required
                            className="w-[90%] z-[999] shadow-none bg-[#F6F4F4]"
                            pattern={
                              rawMaterials?.filter(
                                (x) =>
                                  x?.productName ===
                                  searchValue.raw[i]
                              )[0]?.productName
                                ? undefined
                                : ""
                            }
                            title="Please Select values from drop down"
                            onChange={(e) => {
                              const temp = searchValue.raw;
                              temp[i] = e.target.value;
                              setSearchValue({
                                ...searchValue,
                                raw: temp,
                              });
                            }}
                            value={searchValue.raw[i] || ""}
                          >
                            {rawMaterials
                              ?.filter((a) =>
                                a?.productName
                                  ?.toLowerCase()
                                  ?.includes(
                                    searchValue?.raw[
                                      i
                                    ]?.toLowerCase() || ""
                                  )
                              )
                              ?.map((x) => (
                                <li
                                  onClick={() => {
                                    const temp1 = [...mappings];
                                    temp1[i].product = x?._id;

                                    setMappings([...temp1]);
                                    const temp = searchValue.raw;
                                    temp[i] = x?.productName;
                                    setSearchValue({
                                      ...searchValue,
                                      raw: temp,
                                    });
                                  }}
                                  className="px-3 hover:bg-slate-200 py-1 truncate transition-all duration-100"
                                >
                                  {x?.productName || "No Name"}
                                </li>
                              ))}
                          </Select>
                        </td>
                        <td className="border w-1/4 p-1">
                          <input
                            type="number"
                            value={x?.quantity || ""}
                            onChange={(e) => {
                              const temp = [...mappings];
                              temp[i].quantity = parseInt(e.target.value);
                              console.log(temp);
                              setMappings([...temp]);
                            }}
                            className="px-2 shadow-[0px_0px_4px_rgba(0,0,0,0.485)] rounded-md"
                            min={0}
                          />
                        </td>
                        {i > 0 && (
                          <td>
                            <button
                              className="h-7 w-7 rounded-full bg-red-500 flex justify-center items-center"
                              onClick={() => {
                                const temp = [...mappings];
                                temp.splice(i, 1);
                                setMappings([...temp]);
                              }}
                            >
                              <svg
                                width="16"
                                height="20"
                                viewBox="0 0 20 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M17.722 8.87101L17.322 20.978C17.2879 22.0149 16.8511 22.9977 16.1043 23.7178C15.3575 24.4379 14.3594 24.8387 13.322 24.835H5.722C4.68522 24.8387 3.68775 24.4385 2.94104 23.7193C2.19434 23 1.75709 22.0182 1.722 20.982L1.322 8.87101C1.31325 8.60579 1.41021 8.34796 1.59156 8.15424C1.77291 7.96051 2.02378 7.84676 2.289 7.83801C2.55422 7.82926 2.81205 7.92622 3.00577 8.10757C3.1995 8.28892 3.31325 8.53979 3.322 8.80501L3.722 20.915C3.74192 21.432 3.96139 21.9211 4.33433 22.2797C4.70726 22.6383 5.20464 22.8384 5.722 22.838H13.322C13.84 22.8384 14.338 22.6377 14.711 22.2783C15.0841 21.9188 15.3031 21.4287 15.322 20.911L15.722 8.80501C15.7308 8.53979 15.8445 8.28892 16.0382 8.10757C16.232 7.92622 16.4898 7.82926 16.755 7.83801C17.0202 7.84676 17.2711 7.96051 17.4524 8.15424C17.6338 8.34796 17.7308 8.60579 17.722 8.87101ZM19.045 4.84201C19.045 5.10723 18.9396 5.36158 18.7521 5.54912C18.5646 5.73665 18.3102 5.84201 18.045 5.84201H1C0.734784 5.84201 0.480429 5.73665 0.292893 5.54912C0.105357 5.36158 0 5.10723 0 4.84201C0 4.57679 0.105357 4.32244 0.292893 4.1349C0.480429 3.94737 0.734784 3.84201 1 3.84201H4.1C4.41685 3.84286 4.72268 3.7258 4.95798 3.51361C5.19328 3.30141 5.34122 3.00926 5.373 2.69401C5.44679 1.9545 5.79326 1.26894 6.34489 0.770918C6.89653 0.272894 7.61382 -0.00192331 8.357 1.01329e-05H10.687C11.4302 -0.00192331 12.1475 0.272894 12.6991 0.770918C13.2507 1.26894 13.5972 1.9545 13.671 2.69401C13.7028 3.00926 13.8507 3.30141 14.086 3.51361C14.3213 3.7258 14.6272 3.84286 14.944 3.84201H18.044C18.3092 3.84201 18.5636 3.94737 18.7511 4.1349C18.9386 4.32244 19.044 4.57679 19.044 4.84201H19.045ZM7.109 3.84201H11.937C11.8056 3.54175 11.7196 3.22359 11.682 2.89801C11.6572 2.65152 11.5418 2.423 11.3582 2.25672C11.1746 2.09045 10.9357 1.99825 10.688 1.99801H8.358C8.11027 1.99825 7.87144 2.09045 7.6878 2.25672C7.50416 2.423 7.38877 2.65152 7.364 2.89801C7.32603 3.22365 7.24075 3.54181 7.109 3.84201ZM8.116 18.993V10.478C8.116 10.2128 8.01064 9.95844 7.82311 9.7709C7.63557 9.58337 7.38122 9.47801 7.116 9.47801C6.85078 9.47801 6.59643 9.58337 6.40889 9.7709C6.22136 9.95844 6.116 10.2128 6.116 10.478V18.997C6.116 19.2622 6.22136 19.5166 6.40889 19.7041C6.59643 19.8917 6.85078 19.997 7.116 19.997C7.38122 19.997 7.63557 19.8917 7.82311 19.7041C8.01064 19.5166 8.116 19.2622 8.116 18.997V18.993ZM12.93 18.993V10.478C12.93 10.2128 12.8246 9.95844 12.6371 9.7709C12.4496 9.58337 12.1952 9.47801 11.93 9.47801C11.6648 9.47801 11.4104 9.58337 11.2229 9.7709C11.0354 9.95844 10.93 10.2128 10.93 10.478V18.997C10.93 19.2622 11.0354 19.5166 11.2229 19.7041C11.4104 19.8917 11.6648 19.997 11.93 19.997C12.1952 19.997 12.4496 19.8917 12.6371 19.7041C12.8246 19.5166 12.93 19.2622 12.93 18.997V18.993Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end items-center py-2">
                  <button
                    type="button"
                    className="bg-[#5970F5] px-3 py-1 rounded text-white text-[14px]"
                    onClick={() => setMappings([...mappings, {}])}
                  >
                    + Add More
                  </button>
                </div>
                <div className="flex justify-center items-center gap-4 w-full">
                  <button
                    type="reset"
                    onClick={() => {
                      const temp = selectedProducts;
                      temp[1] = {};
                      setSelectedProducts([...temp]);
                      setMappings([{}]);
                    }}
                    className=" border border-[#5970F5] px-3 py-1 rounded text-[#5970F5] text-[14px]"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="bg-[#5970F5] px-3 py-1 rounded text-white text-[14px]"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductMapping;
