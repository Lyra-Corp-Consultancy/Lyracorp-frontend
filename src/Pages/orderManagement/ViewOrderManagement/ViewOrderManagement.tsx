import { useNavigate } from "react-router-dom";

function ViewOrderManagement() {
  const navigate = useNavigate();
  return (
    <div className=" w-screen px-4 pt-3 shadow-md">
      <h1 className="roboto-bold text-lg">View Order Entry</h1>

      <div className="bg-[#F1F3FF] shadow-md p-3 rounded-lg w-full">
        <form className="shadow-md bg-white pb-[100px] px-4 h-full z-[0] relative rounded-lg pt-1 w-full">
          <h1 className="roboto-medium mt-1">Order Details</h1>
          <div className="grid grid-cols-4 items-center gap-4 roboto-medium text-[13px] shadow-[0px_0px_4px_rgba(0,0,0,0.485)] w-full rounded-lg px-3 py-2">
            <div className="flex  items-center gap-x-8">
              <label>Order Number</label>
              <input required type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md" />
            </div>

            <div className="flex  items-center gap-x-8">
              <label>Order Value</label>
              <input required type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md" />
            </div>
            <div className="flex  items-center gap-x-8">
              <label>Delivery Date</label>
              <label htmlFor="date" className="w-[200px] flex items-center relative h-[25px] z-[980] justify-between px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] rounded-md">
                <p></p>
                <button type="button">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 6.11111H7.77778V8.88889H5V6.11111ZM8.88889 1.11111H8.33333V0H7.22222V1.11111H2.77778V0H1.66667V1.11111H1.11111C0.5 1.11111 0 1.61111 0 2.22222V10C0 10.6111 0.5 11.1111 1.11111 11.1111H8.88889C9.5 11.1111 10 10.6111 10 10V2.22222C10 1.61111 9.5 1.11111 8.88889 1.11111ZM8.88889 2.22222V3.33333H1.11111V2.22222H8.88889ZM1.11111 10V4.44444H8.88889V10H1.11111Z" fill="#5970F5" />
                  </svg>
                </button>
              </label>
            </div>
            <div className="flex gap-x-8 z-[96] items-center">
              <label>Billing Address</label>
              <input required type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md" />
            </div>

            <div className="flex gap-x-3 z-[96] items-center">
              <label>Shipping Address</label>
              <input required type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md" />
            </div>

            <div className="flex gap-x-8 z-[96] items-center">
              <label>PO Number</label>
              <input required type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md" />
            </div>
            <div className="flex  items-center gap-x-[24px]">
              <label>Contact Name</label>
              <input required type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md" />
            </div>
            <div className="flex items-center gap-x-6">
              <label>Contact Number</label>
              <label className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px] rounded-md"></label>
            </div>
            <div className="flex gap-x-5 z-[96] items-center">
              <label>Payment Terms </label>
              <input required type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] w-[200px]  rounded-md" />
            </div>
          </div>

          <h1 className="roboto-medium mt-1">Product Details</h1>

          <table className="w-full table-fixed text-[14px] border-collapse rounded border">
            <thead className="bg-[#5970F5]">
              <tr className=" text-white">
                <th className=" border-r w-1/9">Product Name</th>
                <th className=" border-r w-2/9">Product Description</th>
                <th className=" border-r w-1/9">Order Quantity</th>
                <th className=" border-r w-1/9">UOM</th>
                <th className=" border-r w-1/9">Shipping Method</th>
                <th className=" border-r w-1/9">Delivery Date</th>
                <th className=" border-r w-1/9">Item Value</th>
                <th className=" border-r w-1/9">Batch Number</th>
              </tr>
            </thead>
          </table>

          <div className="w-full absolute bottom-4 justify-center items-center  gap-3 flex mt-5">
            <button type="button" className="border rounded-md py-2 px-4 font-semibold border-[#5970F5] text-[#5970F5]" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className=" rounded-md py-2 px-4 font-semibold bg-[#5970F5] text-white" onClick={()=> navigate("/order-management/edit")}>
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ViewOrderManagement;
