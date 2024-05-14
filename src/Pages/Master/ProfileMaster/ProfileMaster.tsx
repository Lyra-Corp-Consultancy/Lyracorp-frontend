/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { activeAndDeactiveProfileMaster, getAllProfileMaster } from "../../../utils/redux/actions";
import DeleteConfirmationBox from "../../../components/DeleteConfirmationBox";
import styles from "./ProfileMaster.module.scss";

function ProfileMaster() {
  const [data, setData] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const dispatch: any = useDispatch();
  const [confirmation, setConfirmation] = useState<string | null>("");
  const navigate = useNavigate()
  const permissions = useSelector((state: any) => state.data?.user?.permissions);

  const search = (val: string) => {
    const lowerVal = val.toLowerCase();

    const temp = data.filter((x) => {
      if (x?.companyName?.toLowerCase()?.startsWith(lowerVal) || x?.manager?.toLowerCase()?.startsWith(lowerVal)) {
        return x;
      }
    });

    setFiltered([...temp]);
  };

  const [active, setActive] = useState(true);

  useEffect(() => {
    dispatch(getAllProfileMaster()).then((res: any) => {
      setData(res.payload);
      setFiltered(res.payload);
    });
  }, []);
  return (
    <div className="h-[83vh] w-screen">
      <div className="w-full px-5 h-[90%] pt-2">
        <h1 className="text-xl roboto-bold">Line Of Business</h1>
        <div className="bg-[#F1F3FF] shadow-md mt-2 w-full p-4 rounded-lg h-full">
          <div className="bg-white rounded-lg w-full pt-3 h-[80%] shadow-md mt-4">
            <h2 className="roboto-bold ms-3 text-[20px]">Profile List</h2>
            <div className="px-4 flex  justify-start gap-7 items-center">
              <label className="flex px-3 w-1/5  rounded-md py-1  shadow-[0px_0px_4px_rgba(0,0,0,0.385)] items-center gap-3" htmlFor="">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.625 10.625L13.125 13.125M1.875 6.875C1.875 8.20108 2.40178 9.47285 3.33947 10.4105C4.27715 11.3482 5.54892 11.875 6.875 11.875C8.20108 11.875 9.47285 11.3482 10.4105 10.4105C11.3482 9.47285 11.875 8.20108 11.875 6.875C11.875 5.54892 11.3482 4.27715 10.4105 3.33947C9.47285 2.40178 8.20108 1.875 6.875 1.875C5.54892 1.875 4.27715 2.40178 3.33947 3.33947C2.40178 4.27715 1.875 5.54892 1.875 6.875Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <input type="text" onChange={(e) => search(e.target.value)} placeholder="Search" className="placeholder:text-black outline-none border-none w-full" />
              </label>

              {permissions?.add?.includes("profile master") && <Link to={"/master/profile-master/add-profile"} className="bg-[#5970F5] flex px-3 py-2 rounded-md text-white gap-2 items-center">
                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0714 7.92857H7.42857V12.5714C7.42857 12.8177 7.33074 13.0539 7.1566 13.228C6.98246 13.4022 6.74627 13.5 6.5 13.5C6.25373 13.5 6.01754 13.4022 5.8434 13.228C5.66926 13.0539 5.57143 12.8177 5.57143 12.5714V7.92857H0.928571C0.682299 7.92857 0.446113 7.83074 0.271972 7.6566C0.0978315 7.48246 0 7.24627 0 7C0 6.75373 0.0978315 6.51754 0.271972 6.3434C0.446113 6.16926 0.682299 6.07143 0.928571 6.07143H5.57143V1.42857C5.57143 1.1823 5.66926 0.946113 5.8434 0.771972C6.01754 0.597831 6.25373 0.5 6.5 0.5C6.74627 0.5 6.98246 0.597831 7.1566 0.771972C7.33074 0.946113 7.42857 1.1823 7.42857 1.42857V6.07143H12.0714C12.3177 6.07143 12.5539 6.16926 12.728 6.3434C12.9022 6.51754 13 6.75373 13 7C13 7.24627 12.9022 7.48246 12.728 7.6566C12.5539 7.83074 12.3177 7.92857 12.0714 7.92857Z" fill="white" />
                </svg>
                Add Profile
              </Link>}
            </div>
            <div className="flex flex-wrap justify-start p-3 overflow-auto items-start gap-4">
              {filtered.map((x) => (
                <div className="rounded flex shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[348px] justify-between gap-3 px-4 py-2">
                  <div className="flex gap-3">
                    <img src={x?.logo} alt="" className="w-1/3" />
                    <div className="flex flex-col ">
                      <h2 className="roboto-bold">{x?.companyName}</h2>
                      <h4 className="roboto-regular text-[13px]">{x?.manager || "not assigned"}</h4>
                      <div className="flex ">
                        <svg width="14" className="cursor-pointer" onClick={()=>navigate("/master/profile-master/view-profile/"+x?._id)} height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.0039 7.49999C8.32636 7.49999 9.39843 6.42792 9.39843 5.10546C9.39843 3.783 8.32636 2.71094 7.0039 2.71094C5.68144 2.71094 4.60938 3.783 4.60938 5.10546C4.60938 6.42792 5.68144 7.49999 7.0039 7.49999Z" stroke="#5970F5" />
                          <path d="M12.6018 4.3756C12.8673 4.69852 13 4.85929 13 5.1049C13 5.35051 12.8673 5.51129 12.6018 5.83421C11.6303 7.01368 9.48757 9.2098 7 9.2098C4.51243 9.2098 2.36967 7.01368 1.39818 5.83421C1.13273 5.51129 1 5.35051 1 5.1049C1 4.85929 1.13273 4.69852 1.39818 4.3756C2.36967 3.19612 4.51243 1 7 1C9.48757 1 11.6303 3.19612 12.6018 4.3756Z" stroke="#5970F5" />
                        </svg>
                        {permissions?.edit?.includes("profile master") && <svg width="12" className="cursor-pointer" onClick={()=>navigate("/master/profile-master/edit-profile/"+x?._id)} height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M6.5 1.5C6.62744 1.50014 6.75002 1.54894 6.84268 1.63642C6.93535 1.72391 6.99112 1.84348 6.99859 1.9707C7.00605 2.09792 6.96466 2.22319 6.88287 2.32092C6.80107 2.41864 6.68505 2.48145 6.5585 2.4965L6.5 2.5H2.5V9.5H9.5V5.5C9.50014 5.37256 9.54894 5.24998 9.63642 5.15732C9.72391 5.06465 9.84348 5.00888 9.9707 5.00141C10.0979 4.99395 10.2232 5.03534 10.3209 5.11713C10.4186 5.19893 10.4814 5.31495 10.4965 5.4415L10.5 5.5V9.5C10.5001 9.75229 10.4048 9.99528 10.2333 10.1803C10.0617 10.3653 9.82658 10.4786 9.575 10.4975L9.5 10.5H2.5C2.24771 10.5001 2.00472 10.4048 1.81973 10.2333C1.63474 10.0617 1.52142 9.82658 1.5025 9.575L1.5 9.5V2.5C1.49992 2.24771 1.5952 2.00472 1.76675 1.81973C1.93829 1.63474 2.17342 1.52142 2.425 1.5025L2.5 1.5H6.5ZM9.6215 1.6715C9.71148 1.58183 9.83222 1.52976 9.95919 1.52589C10.0862 1.52201 10.2099 1.56661 10.3051 1.65062C10.4004 1.73464 10.4602 1.85178 10.4722 1.97824C10.4842 2.1047 10.4477 2.231 10.37 2.3315L10.3285 2.379L5.3785 7.3285C5.28852 7.41817 5.16778 7.47024 5.04081 7.47411C4.91383 7.47799 4.79014 7.43339 4.69486 7.34938C4.59958 7.26536 4.53985 7.14822 4.5278 7.02176C4.51575 6.8953 4.55229 6.769 4.63 6.6685L4.6715 6.6215L9.6215 1.6715Z"
                            fill="#5970F5"
                          />
                        </svg>}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-center">
                    <h6 className="roboto-regular text-[13px]">Status</h6>
                    <label className={styles.togglerContainer} style={{ background: x?.active ? "#5970F5" : "#C3CBFF" }}>
                      <input
                        type="checkbox"
                        checked={x?.active}
                        onClick={() => {
                          if(permissions?.delete?.includes("profile master")){

                            if (!x?.active) {
                              setActive(false);
                            } else {
                              setActive(true);
                            }
                            setConfirmation(x?._id);
                          }
                        }}
                        className={styles.isChecked}
                      />
                      <div className={styles.toggler} />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {confirmation && (
        <DeleteConfirmationBox
          message={active ? "Do you want to inactive this Profile?" : "Do you want to active this Profile?"}
          pos={active ? "Inactive" : "Active"}
          posColor={!active ? "bg-[#196000]" : ""}
          RejectFunction={() => setConfirmation("")}
          ResolveFunction={() => {
            dispatch(activeAndDeactiveProfileMaster(confirmation)).then(() => {
              dispatch(getAllProfileMaster()).then((res: any) => {
                setData(res.payload);
                setFiltered(res.payload);
              });
            });
            setConfirmation("");
          }}
        />
      )}
    </div>
  );
}

export default ProfileMaster;
