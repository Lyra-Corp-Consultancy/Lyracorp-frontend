/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import styles from "./CustomerMaster.module.scss";
import DeleteConfirmationBox from "../../../components/DeleteConfirmationBox";
import { useDispatch, useSelector } from "react-redux";
import { activeAndDeactiveCustomerMaster } from "../../../utils/redux/actions";
import { useNavigate } from "react-router-dom";

interface Prop {
  data: any[];
  dropDowns: {
    customer: any[];
    account: any[];
    discount: any[];
    payment: any[];
    document: any[];
  };
  ActiveCustomer: () => void;
  selected: any[];
  setSelected: (val: any) => void;
}
function DeactiveUsers({ data, dropDowns, ActiveCustomer, selected, setSelected }: Prop) {
  const [inactive, setInactive] = useState("");
  const dispatch: any = useDispatch();
  const permissions = useSelector((state: any) => state.data?.user?.permissions);

  const navigate = useNavigate();

  return (
    <div className="h-[80%] overflow-auto w-full">
      <table className="w-full mt-3 overflow-auto">
        <thead className="border w-full top-0 left-0  text-xs text-center bg-[#5970F5] text-white roboto-thin">
          <tr className="w-full">
            <th>
              {selected.length === data.length && data.length > 0 ? (
                <div
                  onClick={() => {
                    setSelected([]);
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
                    const temp = data.map((x) => {
                      return x?._id;
                    });
                    setSelected([...temp]);
                  }}
                  className="h-3 cursor-pointer w-3 border border-white bg-none"
                ></div>
              )}
            </th>
            <th>S No</th>
            <th>Customer Acc No</th>
            <th>Customer Name</th>
            <th>Customer Type</th>
            <th>Account Type</th>
            <th>Contact Person</th>
            <th>Primary Number</th>
            <th>Address</th>
            <th>Email ID</th>
            <th>Purchase Restriction</th>
            <th>Discount Type</th>
            <th>Payment Terms</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="overflow-auto text-xs text-center  text-[#5970F5] roboto-thin">
          {data?.map((x: any, i: number) => (
            <tr className="border relative">
              <th>
                {selected.includes(x?._id) ? (
                  <div
                    onClick={() => {
                      const temp = selected;
                      const index = temp.indexOf(x?._id);
                      temp.splice(index);
                      setSelected([...temp]);
                    }}
                    className="h-3 w-3 border cursor-pointer border-[#5970f5] bg-none"
                  >
                    {" "}
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5.19048L4.66667 8.85714L12 1" stroke="#5970F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setSelected((prev: any) => [...prev, x?._id]);
                    }}
                    className="h-3 cursor-pointer w-3 border border-[#5970f5] bg-none"
                  ></div>
                )}
              </th>
              <th>{i + 1}</th>
              <th>{x?.customerId}</th>
              <th>{x?.customerName}</th>
              <th>{dropDowns?.customer?.filter((y) => y?._id === x?.customerType)[0]?.value}</th>
              <th>{dropDowns?.account?.filter((y) => y?._id === x?.accountType)[0]?.value}</th>
              <th>{x?.contactPerson}</th>
              <th>{x?.primaryNumber}</th>
              <th className="truncate">{x?.address}</th>
              <th>{x?.email}</th>
              <th>{x?.purchaseResitriction}</th>
              <th>{dropDowns?.discount?.filter((y) => y?._id === x?.discountType)[0]?.value}</th>
              <th>{dropDowns?.payment?.filter((y) => y?._id === x?.paymentTerms)[0]?.value}</th>
              <th className="relative ">
                <button className={" cursor-pointer h-full w-full flex items-center justify-center pt-1 " + styles.more}>
                  <svg width="2" height="9" viewBox="0 0 2 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.80618 8.18484C1.80618 7.73465 1.4412 7.36969 0.99098 7.36969C0.540758 7.36969 0.175781 7.73465 0.175781 8.18484C0.175781 8.63504 0.540758 9 0.99098 9C1.4412 9 1.80618 8.63504 1.80618 8.18484Z" fill="#5970F5" />
                    <path d="M1.80618 4.92313C1.80618 4.47293 1.4412 4.10797 0.99098 4.10797C0.540758 4.10797 0.175781 4.47293 0.175781 4.92313C0.175781 5.37332 0.540758 5.73828 0.99098 5.73828C1.4412 5.73828 1.80618 5.37332 1.80618 4.92313Z" fill="#5970F5" />
                    <path d="M1.80618 1.66531C1.80618 1.21512 1.4412 0.850159 0.99098 0.850159C0.540758 0.850159 0.175781 1.21512 0.175781 1.66531C0.175781 2.11551 0.540758 2.48047 0.99098 2.48047C1.4412 2.48047 1.80618 2.11551 1.80618 1.66531Z" fill="#5970F5" />
                  </svg>
                </button>
                <div className={"hidden hover:flex flex-col gap-[1px] absolute right-0 z-20 " + styles.option}>
                  {permissions?.delete?.includes("department type") && (
                    <button
                      onClick={() => {
                        setInactive(x?._id);
                      }}
                      className="bg-[#E0E4FF] rounded-md shadow-md shadow-[#00000040] gap-2 items-center text-black flex px-2 py-1"
                    >
                      <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10.7847 11.5609L8.89192 9.66809V9.7634H0.177021V8.2383C0.177021 7.92965 0.256545 7.64605 0.415591 7.38751C0.574638 7.12896 0.785611 6.93143 1.04851 6.79489C1.61135 6.51348 2.18326 6.3025 2.76426 6.16197C3.34525 6.02145 3.93532 5.951 4.53447 5.95064C4.6434 5.95064 4.7547 5.953 4.86836 5.95772C4.98201 5.96244 5.09313 5.96916 5.2017 5.97787L4.62979 5.40596H4.53447C3.93532 5.40596 3.42241 5.19262 2.99574 4.76596C2.56908 4.33929 2.35574 3.82638 2.35574 3.22723V3.13191L0 0.77617L0.77617 0L11.5609 10.7847L10.7847 11.5609ZM8.70128 6.03234C9.16426 6.08681 9.6 6.17995 10.0085 6.31176C10.417 6.44357 10.7983 6.60462 11.1523 6.79489C11.4791 6.97645 11.7288 7.17835 11.9013 7.40058C12.0738 7.62281 12.16 7.86574 12.16 8.12936V9.7634H12.0919L9.91319 7.58468C9.83149 7.28511 9.68842 7.00151 9.48398 6.73389C9.27955 6.46627 9.01864 6.23242 8.70128 6.03234ZM4.53447 7.04C4.0261 7.04 3.52227 7.10137 3.02298 7.2241C2.52369 7.34684 2.02894 7.53058 1.53872 7.77532C1.45702 7.82071 1.39111 7.88426 1.341 7.96596C1.29089 8.04766 1.26602 8.13844 1.26638 8.2383V8.67404H7.80255V8.57872L6.61787 7.39404C6.27291 7.27603 5.92576 7.18761 5.57644 7.12878C5.22712 7.06996 4.8798 7.04036 4.53447 7.04ZM7.28511 4.9566C7.45759 4.70241 7.58704 4.43007 7.67346 4.13957C7.75989 3.84908 7.80292 3.54496 7.80255 3.22723C7.80255 2.84596 7.73683 2.4783 7.60538 2.12426C7.47393 1.77021 7.28547 1.44794 7.04 1.15745C7.16709 1.11206 7.29418 1.08264 7.42128 1.06921C7.54837 1.05577 7.67546 1.04887 7.80255 1.04851C8.4017 1.04851 8.91461 1.26184 9.34128 1.68851C9.76794 2.11518 9.98128 2.62809 9.98128 3.22723C9.98128 3.82638 9.75669 4.33929 9.30751 4.76596C8.85833 5.19262 8.33398 5.40596 7.73447 5.40596L7.28511 4.9566ZM6.49532 4.16681L5.62383 3.29532V3.22723C5.62383 2.92766 5.51725 2.6713 5.3041 2.45814C5.09095 2.24499 4.83441 2.13824 4.53447 2.13787H4.46638L3.59489 1.26638C3.74014 1.19376 3.88993 1.13929 4.04426 1.10298C4.19858 1.06667 4.36199 1.04851 4.53447 1.04851C5.13362 1.04851 5.64652 1.26184 6.07319 1.68851C6.49986 2.11518 6.71319 2.62809 6.71319 3.22723C6.71319 3.39972 6.69503 3.56312 6.65872 3.71745C6.62241 3.87177 6.56794 4.02156 6.49532 4.16681Z"
                          fill="black"
                        />
                      </svg>
                      Active
                    </button>
                  )}
                  <button onClick={() => navigate("/master/customer-master/view-customers/" + x?._id)} className="bg-[#E0E4FF] rounded-md shadow-md shadow-[#00000040] gap-2 items-center text-black flex px-2 py-1">
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.0039 7.49999C8.32636 7.49999 9.39843 6.42792 9.39843 5.10546C9.39843 3.783 8.32636 2.71094 7.0039 2.71094C5.68144 2.71094 4.60938 3.783 4.60938 5.10546C4.60938 6.42792 5.68144 7.49999 7.0039 7.49999Z" stroke="black" />
                      <path d="M12.6018 4.3756C12.8673 4.69852 13 4.85929 13 5.1049C13 5.35051 12.8673 5.51129 12.6018 5.83421C11.6303 7.01368 9.48757 9.2098 7 9.2098C4.51243 9.2098 2.36967 7.01368 1.39818 5.83421C1.13273 5.51129 1 5.35051 1 5.1049C1 4.85929 1.13273 4.69852 1.39818 4.3756C2.36967 3.19612 4.51243 1 7 1C9.48757 1 11.6303 3.19612 12.6018 4.3756Z" stroke="black" />
                    </svg>
                    View
                  </button>
                  {permissions?.edit?.includes("department type") && (
                    <button onClick={() => navigate("/master/customer-master/edit-customers/" + x?._id)} className="bg-[#E0E4FF] rounded-md shadow-md shadow-[#00000040] gap-2 items-center text-black flex px-2 py-1">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6.5 1.5C6.62744 1.50014 6.75002 1.54894 6.84268 1.63642C6.93535 1.72391 6.99112 1.84348 6.99859 1.9707C7.00605 2.09792 6.96466 2.22319 6.88287 2.32092C6.80107 2.41864 6.68505 2.48145 6.5585 2.4965L6.5 2.5H2.5V9.5H9.5V5.5C9.50014 5.37256 9.54894 5.24998 9.63642 5.15732C9.72391 5.06465 9.84348 5.00888 9.9707 5.00141C10.0979 4.99395 10.2232 5.03534 10.3209 5.11713C10.4186 5.19893 10.4814 5.31495 10.4965 5.4415L10.5 5.5V9.5C10.5001 9.75229 10.4048 9.99528 10.2333 10.1803C10.0617 10.3653 9.82658 10.4786 9.575 10.4975L9.5 10.5H2.5C2.24771 10.5001 2.00472 10.4048 1.81973 10.2333C1.63474 10.0617 1.52142 9.82658 1.5025 9.575L1.5 9.5V2.5C1.49992 2.24771 1.5952 2.00472 1.76675 1.81973C1.93829 1.63474 2.17342 1.52142 2.425 1.5025L2.5 1.5H6.5ZM9.6215 1.6715C9.71148 1.58183 9.83222 1.52976 9.95919 1.52589C10.0862 1.52201 10.2099 1.56661 10.3051 1.65062C10.4004 1.73464 10.4602 1.85178 10.4722 1.97824C10.4842 2.1047 10.4477 2.231 10.37 2.3315L10.3285 2.379L5.3785 7.3285C5.28852 7.41817 5.16778 7.47024 5.04081 7.47411C4.91383 7.47799 4.79014 7.43339 4.69486 7.34938C4.59958 7.26536 4.53985 7.14822 4.5278 7.02176C4.51575 6.8953 4.55229 6.769 4.63 6.6685L4.6715 6.6215L9.6215 1.6715Z"
                          fill="black"
                        />
                      </svg>
                      Edit
                    </button>
                  )}
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      {inactive && (
        <DeleteConfirmationBox
          posColor="bg-[#196000]"
          RejectFunction={() => setInactive("")}
          ResolveFunction={() => {
            dispatch(activeAndDeactiveCustomerMaster([inactive])).then(() => {
              ActiveCustomer();
              setInactive("");
            });
          }}
          message="Do you want to inactive this customer?"
          pos="Active"
        />
      )}
    </div>
  );
}

export default DeactiveUsers;
