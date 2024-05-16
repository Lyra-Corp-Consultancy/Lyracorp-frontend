/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProfileMaster } from "../../utils/redux/actions";
import { setCompany } from "../../utils/redux/slice";
import { useNavigate } from "react-router-dom";

function SelectCompany() {
  const dispatch: any = useDispatch();
  const [companies, setCompanies] = useState<any[]>([]);
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getAllProfileMaster()).then((res: any) => {
      console.log(res.payload);
      setCompanies(res.payload);
    });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-5 bg-select-company-gradient">
      <h1 className="text-[36px] text-center mt-5">Choose your Line of Business</h1>
      <div className="grid grid-cols-5 gap-4 px-[100px] w-full">
        {companies.map((x) => (
          <button onClick={()=>{
            dispatch(setCompany(x))
            navigate(-1)
          }} className="bg-[#5970F5] hover:bg-[#4a5dcb] transition-all duration-150 flex justify-center rounded-md items-center flex-col gap-5 text-white font-bold aspect-square">
            <svg width="44" height="40" viewBox="0 0 55 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30.25 35.75H24.75C23.2375 35.75 22 34.5125 22 33H2.7775V44C2.7775 47.025 5.2525 49.5 8.2775 49.5H46.75C49.775 49.5 52.25 47.025 52.25 44V33H33C33 34.5125 31.7625 35.75 30.25 35.75ZM49.5 11H38.5C38.5 4.9225 33.5775 0 27.5 0C21.4225 0 16.5 4.9225 16.5 11H5.5C2.475 11 0 13.475 0 16.5V24.75C0 27.8025 2.4475 30.25 5.5 30.25H22V27.5C22 25.9875 23.2375 24.75 24.75 24.75H30.25C31.7625 24.75 33 25.9875 33 27.5V30.25H49.5C52.525 30.25 55 27.775 55 24.75V16.5C55 13.475 52.525 11 49.5 11ZM22 11C22 7.975 24.475 5.5 27.5 5.5C30.525 5.5 33 7.975 33 11H21.9725H22Z" fill="white" />
            </svg>
            {x?.companyName}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SelectCompany;
