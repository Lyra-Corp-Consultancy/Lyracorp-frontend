/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProfileMasterById, getType } from "../../../../utils/redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ViewProfile() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [places, setPlaces] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });
  const [search, setSearch] = useState<{ country: any[]; state: any[]; city: any[] }>({ country: [], state: [], city: [] });

  const [dropDowns, setDropDown] = useState<{
    margin: any[];
    account: any[];
    discount: any[];
    payment: any[];
    uom: any[];
    document: any[];
  }>({ margin: [], account: [], discount: [], payment: [], document: [], uom: [] });
  const dispatch: any = useDispatch();
  // const [dragging, setDragging] = useState(false);
  const [data, setData] = useState<any>({
    fileUrls: [],
  });

  const navigate = useNavigate();





  const params: any = useParams();



  useEffect(() => {
    dispatch(getProfileMasterById(params.id)).then((res: any) => {
      setData(res.payload);
    });

    const res1 = dispatch(getType("marginSetting"));

    res1.then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          margin: res.payload[0].marginSettingType,
        };
      });
    });

    const res2 = dispatch(getType("uom"));

    res2.then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          uom: res.payload[0].uomType,
        };
      });
    });

    dispatch(getType("discount")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          discount: res.payload[0].discountType,
        };
      });
    });

    dispatch(getType("account")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          account: res.payload[0].accountType,
        };
      });
    });

    dispatch(getType("payment")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          payment: res.payload[0].paymentType,
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
    <div className="h-[100vh] w-screen px-4 pt-3 shadow-md">
      <h1 className="roboto-bold text-lg">Add Product Master</h1>
      <div className="bg-[#F1F3FF] shadow-md px-3 pt-3 pb-10 rounded-lg w-full h-[90%]">
        <div
          className="shadow-md bg-white px-4 h-full z-[0] relative rounded-lg pt-1 w-full"
        >
          <h1 className="roboto-medium mt-1">Company Details</h1>
          <div className="grid grid-flow-col items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <label>Company Logo</label>
            <div className="flex gap-3">
              <div className="  flex flex-col justify-center items-center">
                <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 0H8.07901L11.7144 3.63536V6.83338H10.4128V5.20639H6.50798V1.3016H1.3016V13.016H6.18259V14.3176H0V0ZM7.80958 1.57103V3.90479H10.1433L7.80958 1.57103ZM9.27388 8.78578C8.79922 8.78578 8.344 8.97434 8.00837 9.30997C7.67274 9.6456 7.48418 10.1008 7.48418 10.5755C7.48418 11.0501 7.67274 11.5053 8.00837 11.841C8.344 12.1766 8.79922 12.3652 9.27388 12.3652C9.74853 12.3652 10.2038 12.1766 10.5394 11.841C10.875 11.5053 11.0636 11.0501 11.0636 10.5755C11.0636 10.1008 10.875 9.6456 10.5394 9.30997C10.2038 8.97434 9.74853 8.78578 9.27388 8.78578ZM6.18259 10.5755C6.18266 10.0948 6.29482 9.62079 6.51015 9.19106C6.72548 8.76133 7.03806 8.38774 7.42305 8.09995C7.80804 7.81217 8.25483 7.61813 8.72794 7.53324C9.20104 7.44835 9.68743 7.47496 10.1484 7.61094C10.6095 7.74693 11.0324 7.98855 11.3837 8.31661C11.735 8.64467 12.005 9.05013 12.1722 9.50078C12.3393 9.95144 12.3991 10.4349 12.3468 10.9127C12.2944 11.3905 12.1314 11.8495 11.8706 12.2532L12.96 13.3407L12.0404 14.2616L10.9503 13.1728C10.4835 13.4741 9.94407 13.6441 9.3888 13.6647C8.83354 13.6854 8.28297 13.556 7.79503 13.2902C7.30709 13.0244 6.89982 12.632 6.61607 12.1542C6.33231 11.6765 6.18257 11.1311 6.18259 10.5755Z"
                    fill="#5970F5"
                  />
                </svg>
                <p
                  onClick={() => {
                    window.open(data?.logo);
                  }}
                  className="text-[9px] cursor-pointer text-[#5970F5] underline"
                >
                  logo
                </p>
              </div>
            </div>
            <label>Company Name</label>
            <label className="px-2 py-1   shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] rounded-md">{data.companyName}</label>
            <label>Business Type</label>
            <label className="px-2 py-1   shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] rounded-md">{dropDowns?.account?.filter((x) => x?._id === data?.businessType)[0]?.value}</label>

            <label>Contact Number</label>
            <label className="px-2 py-1   shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] rounded-md">{data.contactNumber}</label>
          </div>
          <h1 className="roboto-medium mt-1">Address Details</h1>
          <div className="flex flex-wrap gap-2 items-center justify-between roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <div className="w-[22%] flex gap-3 items-center">
              <label>Country</label>
              <label className="px-2 py-1   shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] rounded-md">{data.country}</label>
            </div>
            <div className="w-[22%] flex gap-3 items-center">
              <label>State</label>
              <label className="px-2 py-1   shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] rounded-md">{data.state}</label>
            </div>
            <div className="w-[22%] flex gap-3 items-center">
              <label>District</label>
              <label className="px-2 py-1   shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] rounded-md">{data.district}</label>
            </div>
            <div className="w-[22%] z-10 flex gap-3 items-center">
              <label>City/Village</label>
              <label className="px-2 py-1   shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] rounded-md">{data.city}</label>
            </div>
            <div className="w-[22%] flex gap-3 items-center">
              <label>Zone</label>
              <label className="px-2 py-1   shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] rounded-md">{data.zone}</label>
            </div>
            <div className="w-[50%] flex gap-3 items-center">
              <label>Address</label>
              <label className="px-2 py-1 w-[77%]  shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">{data.address}</label>
            </div>
            <div className="w-[22%] flex gap-3 items-center">
              <label>Pin code</label>
              <label className="px-2 py-1   shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] rounded-md">{data.pincode}</label>
            </div>
          </div>

          <h1 className="roboto-medium mt-1">Identity Details</h1>
          <div className="grid grid-cols-4 items-center justify-between roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)]  w-full rounded-lg px-3 py-2">
            <div className="flex gap-3 items-center">
              <label>Aadhar Number</label>
              <label className="px-2 py-1   shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] rounded-md">{data.aadharNumber}</label>
            </div>
            <div className="flex gap-3 items-center">
              <label>Pan Number</label>
              <label className="px-2 py-1   shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] rounded-md">{data.panNumber}</label>
            </div>

            <div className="flex gap-3 items-center">
              <label>Registration No</label>
              <label className="px-2 py-1   shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] rounded-md">{data.regNumber}</label>
            </div>

            <div className="flex gap-3 items-center">
              <label>GSTIN No</label>
              <label className="px-2 py-1   shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] rounded-md">{data.gstinNumber}</label>
            </div>
          </div>

          <h1 className="roboto-medium mt-1">Payment Details</h1>
          <div className="grid grid-cols-4 items-center justify-between roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)]  w-full rounded-lg px-3 py-2">
            <div className="flex gap-3 items-center">
              <label>Bank Account No</label>
              <label className="px-2 py-1   shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] rounded-md">{data.bankAccNo}</label>
            </div>
            <div className="flex gap-3 items-center">
              <label>Account Branch</label>
              <label className="px-2 py-1   shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] rounded-md">{data.accBranch}</label>
            </div>

            <div className="flex gap-3 items-center">
              <label>IFSC Code</label>
              <label className="px-2 py-1   shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] rounded-md">{data.ifscCode}</label>
            </div>
          </div>

          <h1 className="roboto-medium mt-1">Document Details</h1>

          <div className="flex items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <label>Bussiness Document</label>
            <label className="px-2 py-1   shadow-[0px_0px_4px_rgba(0,0,0,0.385)] w-[200px] rounded-md">{dropDowns?.document?.filter((x) => x?._id === data?.bussinessDocument)[0]?.value}</label>

            {data?.fileUrls?.map((x: any, i: number) => (
              <div className="  flex flex-col justify-center items-center">
                <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0 0H8.07901L11.7144 3.63536V6.83338H10.4128V5.20639H6.50798V1.3016H1.3016V13.016H6.18259V14.3176H0V0ZM7.80958 1.57103V3.90479H10.1433L7.80958 1.57103ZM9.27388 8.78578C8.79922 8.78578 8.344 8.97434 8.00837 9.30997C7.67274 9.6456 7.48418 10.1008 7.48418 10.5755C7.48418 11.0501 7.67274 11.5053 8.00837 11.841C8.344 12.1766 8.79922 12.3652 9.27388 12.3652C9.74853 12.3652 10.2038 12.1766 10.5394 11.841C10.875 11.5053 11.0636 11.0501 11.0636 10.5755C11.0636 10.1008 10.875 9.6456 10.5394 9.30997C10.2038 8.97434 9.74853 8.78578 9.27388 8.78578ZM6.18259 10.5755C6.18266 10.0948 6.29482 9.62079 6.51015 9.19106C6.72548 8.76133 7.03806 8.38774 7.42305 8.09995C7.80804 7.81217 8.25483 7.61813 8.72794 7.53324C9.20104 7.44835 9.68743 7.47496 10.1484 7.61094C10.6095 7.74693 11.0324 7.98855 11.3837 8.31661C11.735 8.64467 12.005 9.05013 12.1722 9.50078C12.3393 9.95144 12.3991 10.4349 12.3468 10.9127C12.2944 11.3905 12.1314 11.8495 11.8706 12.2532L12.96 13.3407L12.0404 14.2616L10.9503 13.1728C10.4835 13.4741 9.94407 13.6441 9.3888 13.6647C8.83354 13.6854 8.28297 13.556 7.79503 13.2902C7.30709 13.0244 6.89982 12.632 6.61607 12.1542C6.33231 11.6765 6.18257 11.1311 6.18259 10.5755Z"
                    fill="#5970F5"
                  />
                </svg>
                <p
                  onClick={() => {
                    window.open(x);
                  }}
                  className="text-[9px] cursor-pointer text-[#5970F5] underline"
                >
                  Preview {i + 1}
                </p>
              </div>
            ))}
          </div>

          <div className="w-full absolute bottom-4 justify-center items-center gap-3 flex mt-5">
            <button type="button" className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button onClick={()=>navigate("/master/profile-master/edit-profile/"+params.id)} className=" rounded-md py-2 px-4 font-semibold bg-[#5970F5] text-white">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
