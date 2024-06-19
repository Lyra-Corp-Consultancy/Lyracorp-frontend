/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import NavigationBar from "../../../../components/NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { deleteTypeMaster, getType, postType, updateType } from "../../../../utils/redux/actions";
import ConfirmationBox from "../../../../components/ConfirmationBox";
import DeleteConfirmationBox from "../../../../components/DeleteConfirmationBox";

function PackingType() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch: any = useDispatch();
  const [input, setInput] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [values, setValues] = useState<any[]>();
  const [search, setSearch] = useState<any[]>();
  const [deleteType, setDelete] = useState<string[]>([]);
  const permissions = useSelector((state: any) => state.data?.user?.permissions);

  const fetchPackingType = () => {
    const res = dispatch(getType("packing"));
    res.then((res: any) => {
      setValues(res?.payload[0]?.packingType);
      setSearch(res?.payload[0]?.packingType);
      setInput("");
    });
  };
  useEffect(() => {
    fetchPackingType();
  }, []);

  useEffect(() => {
    if (deleteType.length === 1) {
      setInput(values?.filter((x) => x._id === deleteType[0])[0].value);
    } else {
      setInput("");
    }
  }, [deleteType]);

  const removePackingType = () => {
    const res = dispatch(deleteTypeMaster({ values: deleteType, type: "packing" }));
    res.then(() => {
      setDelete([]);
      fetchPackingType();
    });
    setConfirmation("");
  };

  const addPackingType = () => {
    const res = dispatch(postType({ value: input, type: "packing" }));
    res.then(() => {
      fetchPackingType();
    });
    setConfirmation("");
  };

  const editPackingType = () => {
    const res = dispatch(updateType({ id: deleteType[0], val: input, type: "packing" }));
    res.then(() => {
      setDelete([]);
      setInput(" ");
      fetchPackingType();
    });
    setConfirmation("");
  };
  return (
    <div className="min-h-screen">
      <NavigationBar />
      <div className="px-10 pt-4">
        <h1 className="text-[20px] roboto-bold">Packing Type Master</h1>
        <div className="w-full  justify-between rounded-lg shadow-md shadow-[#00000055] pt-2 px-5 pb-16 bg-[#F1F3FF] h-[60vh]">
          <div className="bg-[#ffffff] w-full flex justify-between  shadow-md shadow-[#00000055] h-full rounded-lg ">
            <div className="w-1/2 h-full px-5 py-2">
              <h2 className="text-black font-semibold">Packing Type List</h2>
              <div className="w-full rounded-lg h-[85%] shadow-md shadow-[#00000055]">
                <div className="flex justify-between px-3 py-2 items-center">
                  <label className="flex px-3 w-3/5 rounded-md py-1 shadow-md shadow-[#00000055] items-center gap-3" htmlFor="">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.625 10.625L13.125 13.125M1.875 6.875C1.875 8.20108 2.40178 9.47285 3.33947 10.4105C4.27715 11.3482 5.54892 11.875 6.875 11.875C8.20108 11.875 9.47285 11.3482 10.4105 10.4105C11.3482 9.47285 11.875 8.20108 11.875 6.875C11.875 5.54892 11.3482 4.27715 10.4105 3.33947C9.47285 2.40178 8.20108 1.875 6.875 1.875C5.54892 1.875 4.27715 2.40178 3.33947 3.33947C2.40178 4.27715 1.875 5.54892 1.875 6.875Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search"
                      onChange={(e) => {
                        const filteredValues = values?.filter((x) => x?.value?.toLowerCase().includes(e.target.value.toLowerCase()));

                        // Update the search state with the filtered values
                        setSearch(filteredValues || []);
                      }}
                      className="placeholder:text-black outline-none border-none"
                    />
                  </label>
                  {deleteType.length > 0 ? (
                    <svg onClick={() => setConfirmation("delete")} className="cursor-pointer" width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.58722 13.4234C2.19566 13.4234 1.8688 13.2923 1.60663 13.0302C1.3439 12.7674 1.21253 12.4403 1.21253 12.0487V1.50662H0.361328V0.655424H3.76613V0H8.87333V0.655424H12.2781V1.50662H11.4269V12.0487C11.4269 12.4403 11.2958 12.7671 11.0337 13.0293C10.7709 13.2921 10.4438 13.4234 10.0522 13.4234H2.58722ZM4.4539 10.8698H5.3051V3.20902H4.4539V10.8698ZM7.33436 10.8698H8.18556V3.20902H7.33436V10.8698Z" fill="#5970F5" />
                    </svg>
                  ) : (
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path opacity="0.5" d="M2.22589 13.4234C1.83434 13.4234 1.50748 13.2923 1.24531 13.0302C0.982568 12.7674 0.8512 12.4403 0.8512 12.0487V1.50662H0V0.655424H3.4048V0H8.512V0.655424H11.9168V1.50662H11.0656V12.0487C11.0656 12.4403 10.9345 12.7671 10.6723 13.0293C10.4096 13.2921 10.0825 13.4234 9.69091 13.4234H2.22589ZM4.09257 10.8698H4.94377V3.20902H4.09257V10.8698ZM6.97303 10.8698H7.82423V3.20902H6.97303V10.8698Z" fill="#5970F5" />
                    </svg>
                  )}
                </div>
                <div className="flex gap-5 items-center bg-[#5970F5] px-2 py-1">
                  {deleteType.length === values?.length && deleteType.length > 0 ? (
                    <div
                      onClick={() => {
                        setDelete([]);
                      }}
                      className="h-3 w-3 border cursor-pointer border-white bg-none"
                    >
                      {" "}
                      <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5.19048L4.66667 8.85714L12 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        const allValues = values?.map((x) => {
                          return x?._id;
                        });
                        if (allValues) {
                          setDelete([...allValues]);
                        }
                      }}
                      className="h-3 cursor-pointer w-3 border border-white bg-none"
                    ></div>
                  )}
                  <p className="text-white ">Packing Type</p>
                </div>
                <div className="overflow-auto h-[70%] rounded-[0_0_10px_10px]">
                  {search?.map((x: any) => (
                    <div className="flex gap-5 items-center bg-white px-2 py-1">
                      {deleteType.includes(x?._id) ? (
                        <div
                          onClick={() => {
                            const filter = [...deleteType];
                            const index = filter.indexOf(x?._id);
                            filter.splice(index, 1);
                            setDelete([...filter]);
                          }}
                          className="h-3 w-3 border cursor-pointer border-[#5970f5] bg-none"
                        >
                          {" "}
                          <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5.19048L4.66667 8.85714L12 1" stroke="#5970F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </div>
                      ) : (
                        <div onClick={() => setDelete((prev) => [...prev, x?._id])} className="h-3 cursor-pointer w-3 border border-[#5970f5] bg-none"></div>
                      )}
                      <p className="text-black ">{x?.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {((deleteType?.length === 1 && permissions?.edit?.includes("packing type")) || permissions?.add?.includes("packing type")) && (
              <div className="w-1/2 h-full px-5 py-2">
                <h2 className="text-black font-semibold">{deleteType.length === 1 ? "Edit" : "Add"} Packing Type</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (input.length > 0) {
                      setConfirmation(deleteType.length === 1 ? "edit" : "add");
                    }
                  }}
                  className="w-full flex flex-col justify-between rounded-lg h-[85%] shadow-md shadow-[#00000055]"
                >
                  <div className="flex gap-28 px-5 pt-5 items-center">
                    <label htmlFor="" className="font-semibold text-[14px]">
                      Type Name
                    </label>
                    <input required type="text" onChange={(e) => setInput(e.target.value)} value={input} className="rounded-md w-1/3 shadow-[0px_0px_4px_rgba(0,0,0,0.685)] outline-none border-none px-3 shadow-[#00000037]" />
                  </div>
                  <div className="flex gap-3 items-center justify-end px-3 py-5">
                    <button
                      type="reset"
                      className="border border-[#5970F5] text-[#5970F5] px-4 py-2 rounded-md font-semibold"
                      onClick={() => {
                        setInput("");
                      }}
                    >
                      Reset
                    </button>
                    <button className=" bg-[#5970F5] text-white px-4 py-2 rounded-md font-semibold">{deleteType.length === 1 ? "Update" : "Save"}</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      {confirmation === "add" && <ConfirmationBox RejectButtonText="Cancel" RejectFunction={() => setConfirmation("")} ResolveButtonText="Save" ResolveFunction={addPackingType} message="Are You sure want to save?" />}

      {confirmation === "edit" && <ConfirmationBox RejectButtonText="No" RejectFunction={() => setConfirmation("")} ResolveButtonText="Yes" ResolveFunction={editPackingType} message="Are You sure want to change?" />}

      {confirmation === "delete" && <DeleteConfirmationBox RejectFunction={() => setConfirmation("")} ResolveFunction={removePackingType} message="Are you sure want to delete?" />}
    </div>
  );
}

export default PackingType;
