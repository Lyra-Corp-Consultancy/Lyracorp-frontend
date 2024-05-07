/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Select from "../../../components/Select";
import { useDispatch } from "react-redux";
import {  addUser, getType } from "../../../utils/redux/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fileServer } from "../../../utils/values/publicValues";
import { UserData } from "../../../utils/Type/types";

function AddUser() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [places, setPlaces] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });
  const [search, setSearch] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });

  const [dropDowns, setDropDown] = useState<{
    customer: any[];
    account: any[];
    department: any[];
    role: any[];
    document: any[];
  }>({ customer: [], account: [], department: [], role: [], document: [] });
  const dispatch: any = useDispatch();
  const [files1, setFiles1] = useState<any[]>([]);

  // const [dragging, setDragging] = useState(false);
  const [data, setData] = useState<UserData>({department:"",email:"",role:"",employeeId:"",password:"",phoneNumber:"",username:"",userPhoto:""});

  const navigate = useNavigate();

  const handleFileSelect2 = (e: any) => {
    const selectedFiles = Array.from(e.target.files);

    setFiles1([...files1, ...selectedFiles]);
  };
  const handleDrop2 = (e: any) => {
    e.preventDefault();
    // setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles1([...files1, ...droppedFiles]);
  };

  const handleSave = async () => {
    const x = files1[0];
    const file = new FormData();
    file.append("file", x);
    const res = await axios.post(fileServer, file);
    const userPhoto = res.data
    setData({ ...data,userPhoto });

    dispatch(addUser({ ...data, userPhoto })).then(() => {
      navigate(-1);
    });
  };

 
  useEffect(() => {
    const res1 = dispatch(getType("customer"));

    res1.then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          customer: res.payload[0].customerType,
        };
      });
    });

    const res2 = dispatch(getType("account"));

    res2.then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          account: res.payload[0].accountType,
        };
      });
    });

    dispatch(getType("department")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          department: res.payload[0].departmentType,
        };
      });
    });

    dispatch(getType("role")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          role: res.payload[0].roleType,
        };
      });
    });

    dispatch(getType("document")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          document: res.payload[0].documentType,
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

  return (
    <div className="h-[56vh] w-screen px-4 pt-3 shadow-md">
      <h1 className="roboto-bold text-lg">Add User</h1>
      <div className="bg-[#F1F3FF] shadow-md p-3 rounded-lg w-full h-[90%]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="shadow-md bg-white px-4 h-[90%] z-[0] relative rounded-lg pt-1 w-full"
        >
          <h1 className="roboto-medium mt-1">User Details</h1>
          <div className="grid grid-cols-4 items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <div className="flex gap-2 items-center">
              <label>User Photo</label>
              <div className="flex gap-3">
                <label htmlFor="file" className="flex items-center gap-3 justify-center shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[40px] bg-[#ECECEC] w-[40px] px-3 py-2 rounded-md" onDrop={handleDrop2} onDragOver={(e) => e.preventDefault()} onDragEnter={(e) => e.preventDefault()}>
                  <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      opacity="0.5"
                      d="M13.2692 1.73077H11.2702L10.2873 0.256731C10.2346 0.177802 10.1633 0.113079 10.0796 0.0682973C9.99598 0.0235155 9.90258 5.69747e-05 9.80769 0H5.19231C5.09742 5.69747e-05 5.00402 0.0235155 4.92037 0.0682973C4.83672 0.113079 4.7654 0.177802 4.71274 0.256731L3.72909 1.73077H1.73077C1.27174 1.73077 0.831513 1.91312 0.506931 2.2377C0.182348 2.56228 0 3.00251 0 3.46154V11.5385C0 11.9975 0.182348 12.4377 0.506931 12.7623C0.831513 13.0869 1.27174 13.2692 1.73077 13.2692H13.2692C13.7283 13.2692 14.1685 13.0869 14.4931 12.7623C14.8177 12.4377 15 11.9975 15 11.5385V3.46154C15 3.00251 14.8177 2.56228 14.4931 2.2377C14.1685 1.91312 13.7283 1.73077 13.2692 1.73077ZM13.8462 11.5385C13.8462 11.6915 13.7854 11.8382 13.6772 11.9464C13.569 12.0546 13.4222 12.1154 13.2692 12.1154H1.73077C1.57776 12.1154 1.43102 12.0546 1.32282 11.9464C1.21463 11.8382 1.15385 11.6915 1.15385 11.5385V3.46154C1.15385 3.30853 1.21463 3.16179 1.32282 3.05359C1.43102 2.9454 1.57776 2.88462 1.73077 2.88462H4.03846C4.13347 2.88468 4.22702 2.86128 4.3108 2.81649C4.39459 2.7717 4.46602 2.70692 4.51875 2.62789L5.50096 1.15385H9.49832L10.4812 2.62789C10.534 2.70692 10.6054 2.7717 10.6892 2.81649C10.773 2.86128 10.8665 2.88468 10.9615 2.88462H13.2692C13.4222 2.88462 13.569 2.9454 13.6772 3.05359C13.7854 3.16179 13.8462 3.30853 13.8462 3.46154V11.5385ZM7.5 4.03846C6.87242 4.03846 6.25894 4.22456 5.73713 4.57322C5.21532 4.92188 4.80862 5.41745 4.56846 5.99725C4.3283 6.57706 4.26546 7.21506 4.38789 7.83058C4.51033 8.44609 4.81253 9.01148 5.2563 9.45524C5.70006 9.89901 6.26545 10.2012 6.88096 10.3236C7.49648 10.4461 8.13448 10.3832 8.71428 10.1431C9.29409 9.90292 9.78965 9.49622 10.1383 8.97441C10.487 8.4526 10.6731 7.83911 10.6731 7.21154C10.6721 6.37028 10.3375 5.56375 9.74265 4.96889C9.14779 4.37403 8.34126 4.03942 7.5 4.03846ZM7.5 9.23077C7.10063 9.23077 6.71024 9.11234 6.37818 8.89047C6.04611 8.66859 5.7873 8.35323 5.63447 7.98427C5.48164 7.6153 5.44166 7.2093 5.51957 6.81761C5.59748 6.42591 5.78979 6.06612 6.07219 5.78373C6.35458 5.50133 6.71438 5.30902 7.10607 5.23111C7.49776 5.15319 7.90376 5.19318 8.27273 5.34601C8.64169 5.49884 8.95705 5.75765 9.17893 6.08971C9.4008 6.42178 9.51923 6.81217 9.51923 7.21154C9.51923 7.74707 9.30649 8.26067 8.92781 8.63935C8.54913 9.01803 8.03553 9.23077 7.5 9.23077Z"
                      fill="black"
                    />
                  </svg>
                </label>
                <input type="file" id="file" onChange={handleFileSelect2} className="hidden" />
              </div>

              {files1.map((x: any, i: number) => (
                <div className="  flex flex-col justify-center items-center">
                  <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0 0H8.07901L11.7144 3.63536V6.83338H10.4128V5.20639H6.50798V1.3016H1.3016V13.016H6.18259V14.3176H0V0ZM7.80958 1.57103V3.90479H10.1433L7.80958 1.57103ZM9.27388 8.78578C8.79922 8.78578 8.344 8.97434 8.00837 9.30997C7.67274 9.6456 7.48418 10.1008 7.48418 10.5755C7.48418 11.0501 7.67274 11.5053 8.00837 11.841C8.344 12.1766 8.79922 12.3652 9.27388 12.3652C9.74853 12.3652 10.2038 12.1766 10.5394 11.841C10.875 11.5053 11.0636 11.0501 11.0636 10.5755C11.0636 10.1008 10.875 9.6456 10.5394 9.30997C10.2038 8.97434 9.74853 8.78578 9.27388 8.78578ZM6.18259 10.5755C6.18266 10.0948 6.29482 9.62079 6.51015 9.19106C6.72548 8.76133 7.03806 8.38774 7.42305 8.09995C7.80804 7.81217 8.25483 7.61813 8.72794 7.53324C9.20104 7.44835 9.68743 7.47496 10.1484 7.61094C10.6095 7.74693 11.0324 7.98855 11.3837 8.31661C11.735 8.64467 12.005 9.05013 12.1722 9.50078C12.3393 9.95144 12.3991 10.4349 12.3468 10.9127C12.2944 11.3905 12.1314 11.8495 11.8706 12.2532L12.96 13.3407L12.0404 14.2616L10.9503 13.1728C10.4835 13.4741 9.94407 13.6441 9.3888 13.6647C8.83354 13.6854 8.28297 13.556 7.79503 13.2902C7.30709 13.0244 6.89982 12.632 6.61607 12.1542C6.33231 11.6765 6.18257 11.1311 6.18259 10.5755Z"
                      fill="#5970F5"
                    />
                  </svg>
                  <p
                    onClick={() => {
                      const url = URL.createObjectURL(x);
                      window.open(url);
                    }}
                    className="text-[9px] cursor-pointer text-[#5970F5] underline"
                  >
                    Preview {i + 1}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 items-center">
              <label>Username</label>
              <input value={data.username} name="username" onChange={(e) => setData({ ...data, username: e.target.value })} type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
            </div>
            <div className="flex gap-2 items-center">
              <label>Phone Number</label>
              <input value={data.phoneNumber} name="phoneNumber" onChange={(e) => setData({ ...data, phoneNumber: e.target.value })} type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
            </div>
            <div className="flex gap-2 items-center">
              <label>Email ID</label>
              <input value={data.email} name="email" onChange={(e) => setData({ ...data, email: e.target.value })} type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
            </div>
            <div className="flex gap-2 items-center">
              <label>Employee ID</label>
              <input value={data.employeeId} name="employeeId" onChange={(e) => setData({ ...data, employeeId: e.target.value })} type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
            </div>
            <div className="flex gap-2 items-center">
              <label>Password</label>
              <input value={data.password} name="password" onChange={(e) => setData({ ...data, password: e.target.value })} type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md" />
            </div>
          </div>
          <h1 className="roboto-medium mt-1">Position Details</h1>

          <div className="grid grid-cols-4 items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <div className="flex gap-2 items-center">
              <label>Department</label>
              <Select value={dropDowns?.department?.filter((x) => x?._id === data?.department)[0]?.value}>
                {dropDowns?.department?.map((x) => (
                  <li
                    onClick={() => {
                      setData({ ...data, department: x?._id });
                    }}
                    className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x?.value}
                  </li>
                ))}
              </Select>
            </div>
            <div className="flex gap-2 items-center">
              <label>Role</label>
              <Select value={dropDowns?.role?.filter((x) => x?._id === data?.role)[0]?.value?.value}>
                {dropDowns?.role
                  ?.filter((x) => x?.value?.department === (data?.department || ""))
                  ?.map((x) => (
                    <li
                      onClick={() => {
                        setData({ ...data, role: x?._id });
                      }}
                      className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                    >
                      {x?.value?.value}
                    </li>
                  ))}
              </Select>
            </div>
          </div>

       
          <div className="w-full absolute bottom-4 justify-center items-center gap-3 flex mt-5">
            <button type="reset" className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" onClick={() => setData({ department:"",email:"",employeeId:"",password:"",phoneNumber:"",role:"",username:"",userPhoto:""})}>
              Reset
            </button>
            <button type="button" className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className=" rounded-md py-2 px-4 font-semibold bg-[#5970F5] text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
