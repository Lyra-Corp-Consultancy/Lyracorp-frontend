/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Select from "../../../../components/Select";
import { useDispatch } from "react-redux";
import {
  editCustomerMaster,
  getCustomerMasterById,
  getType,
} from "../../../../utils/redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  fileServer,
  phoneNumberDetails,
} from "../../../../utils/values/publicValues";

function EditCustomer() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [places, setPlaces] = useState<{
    country: any[];
    state: any[];
    city: any[];
  }>({ country: [], state: [], city: [] });
  const [search, setSearch] = useState<{
    country: any[];
    state: any[];
    city: any[];
  }>({ country: [], state: [], city: [] });
  const [searchValue, setSearchValue] = useState<{
    customer?: string;
    account?: string;
    discount?: string;
    paymentTerm?: string;
    document?: string;
    countryCode: any;
  }>({
    customer: "",
    account: "",
    discount: "",
    paymentTerm: "",
    document: "",
    countryCode: "",
  });

  const [dropDowns, setDropDown] = useState<{
    customer: any[];
    account: any[];
    discount: any[];
    paymentTerm: any[];
    document: any[];
  }>({ customer: [], account: [], discount: [], paymentTerm: [], document: [] });
  const dispatch: any = useDispatch();
  const [phoneLength, setPhoneLength] = useState<any>({});

  // const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [data, setData] = useState<any>({
    customerName: "",
    customerType: "",
    accountType: "",
    contactPerson: "",
    email: "",
    primaryNumber: "",
    secondaryNumber: "",
    country: "",
    state: "",
    district: "",
    city: "",
    zone: "",
    address: "",
    pincode: "",
    purchaseResitriction: "",
    discountType: "",
    paymentTerms: "",
    bussinessDocument: "",
    fileUrls: [],
  });

  const navigate = useNavigate();
  const params: any = useParams();

  const handleSave = async () => {
    try {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const x = files[i];
        const file = new FormData();
        file.append("file", x);
        const res = await axios.post(fileServer, file);
        urls.push(res.data);
      }
      setData({ ...data, fileUrls: [...data.fileUrls, ...urls] });

      dispatch(editCustomerMaster({ data, id: params.id })).then(() => {
        navigate(-1);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileSelect = (e: any) => {
    const selectedFiles = Array.from(e.target.files);

    setFiles([...files, ...selectedFiles]);
  };

  useEffect(() => {
    setSearchValue({
      ...searchValue,
      customer: dropDowns?.customer?.filter(
        (x) => x?._id === data?.customerType
      )[0]?.value,
      account: dropDowns?.account?.filter(
        (x) => x?._id === data?.accountType
      )[0]?.value,
      discount: dropDowns?.discount?.filter(
        (x) => x?._id === data?.discountType
      )[0]?.value,
      paymentTerm: dropDowns?.paymentTerm?.filter(
        (x) => x?._id === data?.paymentTerms
      )[0]?.value,
      document: dropDowns?.document?.filter(
        (x) => x?._id === data?.bussinessDocument
      )[0]?.value,
      countryCode: data?.countryCode,
    });
  }, [dropDowns, data]);

  useEffect(() => {
    const res1 = dispatch(getType("customer"));

    res1.then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          customer: res?.payload[0]?.customerType,
        };
      });
    });

    dispatch(getCustomerMasterById(params.id)).then((res: any) => {
      setData(res.payload);
      //   setFiles([...res.payload.fileUrls]);
      axios
        .post("https://countriesnow.space/api/v0.1/countries/states", {
          country: res?.payload?.country,
        })
        .then((res) => {
          setPlaces((prev)=>({ ...prev, state: res.data.data.states }));
          setSearch((prev)=>({ ...prev, state: res.data.data.states }));
        });
      axios
        .post("https://countriesnow.space/api/v0.1/countries/state/cities", {
          country: res?.payload?.country,
          state: res?.payload?.state,
        })
        .then((res) => {
          setPlaces((prev)=>({ ...prev, city: res.data.data }));
          setSearch((prev)=>({ ...prev, city: res.data.data }));
        });
    });

    const res2 = dispatch(getType("account"));

    res2.then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          account: res?.payload[0]?.accountType,
        };
      });
    });

    dispatch(getType("discount")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          discount: res?.payload[0]?.discountType,
        };
      });
    });

    dispatch(getType("paymentTerm")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          paymentTerm: res?.payload[0]?.paymentTerm,
        };
      });
    });

    dispatch(getType("document")).then((res: any) => {
      setDropDown((prev) => {
        return {
          ...prev,
          document: res?.payload[0]?.documentType,
        };
      });
    });

    axios.get("https://api.first.org/data/v1/countries").then((res) => {
      const val:any[] = [];
      for (const i in res.data.data) {
        val.push(res.data.data[i]);
      }
      console.log(val,"hello wolrd")
      setPlaces((prev)=>({ ...prev, country: val }));
      setSearch((prev)=>({ ...prev, country: val }));
    });
  }, []);

  const handleDrop = (e: any) => {
    e.preventDefault();
    // setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };
 
  return (
    <div className="min-h-[86vh] w-screen px-4 pt-3 shadow-md">
      <h1 className="roboto-bold text-lg">Edit Customer Master</h1>
      <div className="bg-[#F1F3FF] shadow-md p-3 rounded-lg w-full min-h-[90%]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="shadow-md bg-white px-4 h-full pb-[100px] z-[0] relative rounded-lg pt-1 w-full"
        >
          <h1 className="roboto-medium mt-1">Customer Type</h1>
          <div className="grid grid-flow-col items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <label>Customer Code</label>
            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md h-full w-[200px]"> {data.customerId
            }</label>
            <label>Customer Name</label>
            <input
              // pattern="[A-Za-z0-9_]+"
              // title="Users only can enter letter and number"
              
              value={data.customerName}
              onChange={(e) =>
                setData({ ...data, customerName: e.target.value })
              }
              type="text"
              className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md"
            />
            <label>Customer Type</label>
            <Select
              
              pattern={
                dropDowns?.customer?.filter(
                  (a) => a?.value === searchValue?.customer
                )[0]
                  ? undefined
                  : ""
              }
              title="Please Select values from drop down"
              onChange={(e) => {
                setSearchValue({ ...searchValue, customer: e.target.value });
              }}
              value={searchValue?.customer || ""}
            >
              {dropDowns?.customer
                ?.filter((a) =>
                  a?.value
                    ?.toLowerCase()
                    ?.includes(searchValue?.customer?.toLowerCase() || "")
                )
                .map((x) => (
                  <li
                    onClick={() => {
                      setSearchValue({ ...searchValue, customer: x?.value });
                      setData({ ...data, customerType: x?._id });
                    }}
                    className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x?.value}
                  </li>
                ))}
            </Select>
            <label>Account Type</label>
            <Select
              
              pattern={
                dropDowns?.account?.filter(
                  (a) => a?.value === searchValue?.account
                )[0]
                  ? undefined
                  : ""
              }
              title="Please Select values from drop down"
              onChange={(e) => {
                setSearchValue({ ...searchValue, account: e.target.value });
              }}
              value={searchValue?.account || ""}
            >
              {dropDowns?.account
                ?.filter((a) =>
                  a?.value
                    ?.toLowerCase()
                    ?.includes(searchValue?.account?.toLowerCase() || "")
                )
                .map((x) => (
                  <li
                    onClick={() => {
                      setSearchValue({ ...searchValue, account: x?.value });
                      setData({ ...data, accountType: x?._id });
                    }}
                    className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x?.value}
                  </li>
                ))}
            </Select>
          </div>
          <h1 className="roboto-medium mt-1">Contact Details</h1>
          <div className="grid grid-flow-col z-[100] items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <label>Contact Person</label>
            <input
              
              value={data.contactPerson}
              onChange={(e) =>
                setData({ ...data, contactPerson: e.target.value })
              }
              type="text"
              className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md"
            />
            <label>Email Id</label>
            <input
              
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              type="email"
              className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md"
            />
            <label>Primary Number</label>
            <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex rounded-md">
              <Select
                value={searchValue?.countryCode || ""}
                onChange={(e) => {
                  setSearchValue({
                    ...searchValue,
                    countryCode: e.target.value,
                  }); 
                  setData({
                   ...data,
                    countryCode: e.target.value,
                  });
                }}
                className="border-none outline-none w-3/12"
              >
                {phoneNumberDetails
                  .filter((x) =>
                    ("+" + x.phone).includes(searchValue?.countryCode || "")
                  )
                  .map((x) => (
                    <li
                      className="px-3 hover:bg-slate-200 py-1 transition-all truncate duration-100"
                      onClick={() => {
                        const val = x;
                        setPhoneLength(val);
                        // setData({ ...data, country: val.label });
                        setSearchValue({
                          ...searchValue,
                          countryCode: "+" + val.phone,
                        });
                        setData({
                          ...data,
                           countryCode: "+" + val.phone,
                         })
                  
                      }}
                    >
                      +{x.phone}
                    </li>
                  ))}
              </Select>
              <input
                min={phoneLength?.phoneLength || undefined}
                
                className="ps-2 remove-spin-wheel w-9/12 border-none outline-none"
                value={data.primaryNumber}
                onChange={(e) =>
                  e.target.value.length<=10 && setData({ ...data, primaryNumber: e.target.value })
                }
                type="number"
              
              />
            </label>
            <label>Secondary Number</label>
            <input
              
              min={phoneLength?.phoneLength || undefined}
              value={data.secondaryNumber}
              onChange={(e) =>
               e.target.value.length<=10 && setData({ ...data, secondaryNumber: e.target.value })
              }
              type="number"
              className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md remove-spin-wheel"
            />
          </div>
          <h1 className="roboto-medium mt-1">Address Details</h1>
          <div
            className={
              "flex flex-wrap gap-2 items-center  roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2 " +
              (data?.state && "justify-between")
            }
          >
            <div className="w-[22%] flex gap-3 items-center">
              <label>Country</label>
              <Select
                pattern={
                  places?.country?.filter((a) => a?.country === data?.country)[0]
                    ? undefined
                    : ""
                }
                title="Please Select values from drop down"
                
                onChange={(e) => {
                  const filtered = places.country.filter((x) => {
                    return x?.country
                      ?.toLowerCase()
                      .startsWith(e.target.value.toLowerCase() || "");
                  });
                  setSearch({ ...search, country: filtered });
                  setData({ ...data, country: e.target.value });
                }}
                value={data?.country}
              >
                {places?.country?.map((x) => (
                  <li
                    onClick={() => {
                      setData({ ...data, country: x?.country });
                      axios
                        .post(
                          "https://countriesnow.space/api/v0.1/countries/states",
                          { country: x?.country }
                        )
                        .then((res) => {
                          setPlaces({ ...places, state: res.data.data.states });
                          setSearch({ ...search, state: res.data.data.states });
                        });
                      const country = phoneNumberDetails.filter(
                        (y) =>
                          y.label.toLowerCase() === x?.country?.toLowerCase()
                      );
                      console.log(country);
                      // setPhoneLength(country[0]);
                      
                    }}
                    className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x?.country}
                  </li>
                ))}
              </Select>
            </div>
            {data?.country && (
              <div className="w-[22%] flex gap-3 items-center">
                <label>State</label>
                <Select
                  pattern={
                    places?.state?.filter((a) => a?.name === data.state)[0]
                      ? undefined
                      : ""
                  }
                  title="Please Select values from drop down"
                  
                  onChange={(e) => {
                    const filtered = places.state.filter((x) => {
                      return x?.name
                        ?.toLowerCase()
                        .startsWith(e.target.value.toLowerCase() || "");
                    });
                    setSearch({ ...search, state: filtered });
                    setData({ ...data, state: e.target.value });
                  }}
                  className="z-[99]"
                  value={data.state}
                >
                  {search?.state?.map((x) => (
                    <li
                      onClick={() => {
                        setData({ ...data, state: x?.name });
                        axios
                          .post(
                            "https://countriesnow.space/api/v0.1/countries/state/cities",
                            { country: data.country, state: x?.name }
                          )
                          .then((res) => {
                       
                            setPlaces({ ...places, city: res.data.data });
                            setSearch({ ...search, city: res.data.data });
                          });
                      }}
                      className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                    >
                      {x?.name}
                    </li>
                  ))}
                </Select>
              </div>
            )}
            {data?.state && (
              <div className="w-[22%] flex gap-3 items-center">
                <label>District</label>
                <input
                  
                  value={data.district}
                  onChange={(e) =>
                    setData({ ...data, district: e.target.value })
                  }
                  type="text"
                  className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md"
                />
              </div>
            )}
            {data?.state && (
              <div className="w-[22%] z-10 flex gap-3 items-center">
                <label>City/Village</label>
                <Select
                  pattern={
                    places?.city?.filter((a) => a === data.city)[0]
                      ? undefined
                      : ""
                  }
                  title="Please Select values from drop down"
                  
                  onChange={(e) => {
                    const filtered = places.city.filter((x) => {
                      return x
                        ?.toLowerCase()
                        .startsWith(e.target.value.toLowerCase()|| "");
                    });
                    setSearch({ ...search, city: filtered });
                    setData({ ...data, city: e.target.value });
                  }}
                  value={data.city}
                >
                  {search?.city?.map((x) => (
                    <li
                      onClick={() => {
                        setData({ ...data, city: x });
                        // axios.post("https://countriesnow.space/api/v0.1/countries/state/cities", { country: data.country,state:x?.name }).then((res) => {
                        //   console.log(res.data)
                        //   setPlaces({ ...places, city: res.data.data})
                        //   setSearch({ ...search, city: res.data.data})
                        // });
                      }}
                      className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                    >
                      {x}
                    </li>
                  ))}
                </Select>
              </div>
            )}
            {data?.state && (
              <>
                {" "}
                <div className="w-[22%] flex gap-3 items-center">
                  <label>Zone</label>
                  <input
                    
                    value={data.zone}
                    onChange={(e) => setData({ ...data, zone: e.target.value })}
                    type="text"
                    className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md"
                  />
                </div>
                <div className="w-[50%] flex gap-3 items-center">
                  <label>Address</label>
                  <textarea
                    
                    value={data.address}
                    onChange={(e) =>
                      setData({ ...data, address: e.target.value })
                    }
                    className="px-2 py-1 w-[77%] shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md"
                  ></textarea>
                </div>
                <div className="w-[22%] flex gap-3 items-center">
                  <label>Pin code</label>
                  <input
                    
                    value={data.pincode}
                    min={6}
                    onChange={(e) =>
                      setData({ ...data, pincode: e.target.value })
                    }
                    type="number"
                    className="px-2 py-1 remove-spin-wheel shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md"
                  />
                </div>
              </>
            )}
          </div>

          <h1 className="roboto-medium mt-1">Other Details</h1>
          <div className="grid z-[98] grid-flow-col items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <label>Purchase Restriction</label>
            <input
              
              value={data.purchaseResitriction}
              onChange={(e) =>
                setData({ ...data, purchaseResitriction: e.target.value })
              }
              type="text"
              className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md"
            />

            <label>Discount Type</label>
            <Select
              pattern={
                dropDowns?.discount?.filter(
                  (a) => a?.value === searchValue?.discount
                )[0]
                  ? undefined
                  : ""
              }
              title="Please Select values from drop down"
              
              onChange={(e) => {
                setSearchValue({ ...searchValue, discount: e.target.value });
              }}
              value={searchValue?.discount || ""}
            >
              {dropDowns?.discount
                ?.filter((a) =>
                  a?.value
                    ?.toLowerCase()
                    ?.includes(searchValue?.discount?.toLowerCase() || "")
                )
                .map((x) => (
                  <li
                    onClick={() => {
                      setSearchValue({ ...searchValue, discount: x?.value });
                      setData({ ...data, discountType: x?._id });
                    }}
                    className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x?.value}
                  </li>
                ))}
            </Select>
            <label>Payment Terms</label>
            <Select
              pattern={
                dropDowns?.paymentTerm?.filter(
                  (a) => a?.value === searchValue?.paymentTerm
                )[0]
                  ? undefined
                  : ""
              }
              title="Please Select values from drop down"
              
              onChange={(e) => {
                setSearchValue({ ...searchValue, paymentTerm: e.target.value });
              }}
              value={searchValue?.paymentTerm || ""}
            >
              {dropDowns?.paymentTerm
                ?.filter((a) =>
                  a?.value
                    ?.toLowerCase()
                    ?.includes(searchValue?.paymentTerm?.toLowerCase() || "")
                )
                .map((x) => (
                  <li
                    onClick={() => {
                      setSearchValue({ ...searchValue, paymentTerm: x?.value });
                      setData({ ...data, paymentTerms: x?._id });
                    }}
                    className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x?.value}
                  </li>
                ))}
            </Select>
          </div>

          <h1 className="roboto-medium mt-1">Document Details</h1>

          <div className="flex items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <label>Bussiness Document</label>
            <Select
              pattern={
                dropDowns?.document?.filter(
                  (a) => a?.value === searchValue?.document
                )[0]
                  ? undefined
                  : ""
              }
              title="Please Select values from drop down"
              
              className="z-[1]"
              onChange={(e) => {
                setSearchValue({ ...searchValue, document: e.target.value });
              }}
              value={searchValue?.document || ""}
            >
              {dropDowns?.document
                ?.filter((a) =>
                  a?.value
                    ?.toLowerCase()
                    ?.includes(searchValue?.document?.toLowerCase() || "")
                )
                .map((x) => (
                  <li
                    onClick={() => {
                      setSearchValue({ ...searchValue, document: x?.value });
                      setData({ ...data, bussinessDocument: x?._id });
                    }}
                    className="px-3 hover:bg-slate-200 py-1 transition-all duration-100"
                  >
                    {x?.value}
                  </li>
                ))}
            </Select>
            <label
              htmlFor="file"
              className="flex items-center gap-3 justify-center shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[50px] w-[150px] px-3 py-2 rounded-md"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5625 11.25V3.60938L4.125 6.04688L2.8125 4.6875L7.5 0L12.1875 4.6875L10.875 6.04688L8.4375 3.60938V11.25H6.5625ZM1.875 15C1.35938 15 0.918125 14.8166 0.55125 14.4497C0.184375 14.0828 0.000625 13.6412 0 13.125V10.3125H1.875V13.125H13.125V10.3125H15V13.125C15 13.6406 14.8166 14.0822 14.4497 14.4497C14.0828 14.8172 13.6412 15.0006 13.125 15H1.875Z"
                  fill="#5970F5"
                />
              </svg>
              <p className="text-xs text-center">
                Upload Document or Drag the file
              </p>
              <input
                type="file"
                id="file"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
            {[...files, ...data.fileUrls].map((x: any, i: number) => (
              <div className="  flex flex-col justify-center items-center">
                <svg
                  width="13"
                  height="15"
                  viewBox="0 0 13 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0H8.07901L11.7144 3.63536V6.83338H10.4128V5.20639H6.50798V1.3016H1.3016V13.016H6.18259V14.3176H0V0ZM7.80958 1.57103V3.90479H10.1433L7.80958 1.57103ZM9.27388 8.78578C8.79922 8.78578 8.344 8.97434 8.00837 9.30997C7.67274 9.6456 7.48418 10.1008 7.48418 10.5755C7.48418 11.0501 7.67274 11.5053 8.00837 11.841C8.344 12.1766 8.79922 12.3652 9.27388 12.3652C9.74853 12.3652 10.2038 12.1766 10.5394 11.841C10.875 11.5053 11.0636 11.0501 11.0636 10.5755C11.0636 10.1008 10.875 9.6456 10.5394 9.30997C10.2038 8.97434 9.74853 8.78578 9.27388 8.78578ZM6.18259 10.5755C6.18266 10.0948 6.29482 9.62079 6.51015 9.19106C6.72548 8.76133 7.03806 8.38774 7.42305 8.09995C7.80804 7.81217 8.25483 7.61813 8.72794 7.53324C9.20104 7.44835 9.68743 7.47496 10.1484 7.61094C10.6095 7.74693 11.0324 7.98855 11.3837 8.31661C11.735 8.64467 12.005 9.05013 12.1722 9.50078C12.3393 9.95144 12.3991 10.4349 12.3468 10.9127C12.2944 11.3905 12.1314 11.8495 11.8706 12.2532L12.96 13.3407L12.0404 14.2616L10.9503 13.1728C10.4835 13.4741 9.94407 13.6441 9.3888 13.6647C8.83354 13.6854 8.28297 13.556 7.79503 13.2902C7.30709 13.0244 6.89982 12.632 6.61607 12.1542C6.33231 11.6765 6.18257 11.1311 6.18259 10.5755Z"
                    fill="#5970F5"
                  />
                </svg>
                <p
                  onClick={() => {
                    if (x.includes("http")) {
                      window.open(x);
                    } else {
                      const url = URL.createObjectURL(x);
                      window.open(url);
                    }
                  }}
                  className="text-[9px] cursor-pointer text-[#5970F5] underline"
                >
                  Preview {i + 1}
                </p>
              </div>
            ))}
          </div>

          <div className="w-full absolute z-[0] bottom-4 justify-center items-center gap-3 flex mt-5">
            <button
              type="button"
              className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              className=" rounded-md py-2 px-4 font-semibold bg-[#5970F5] text-white"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCustomer;
