import Select from "../../../../components/Select";

function AddFinishedGoods() {
  return (
    <div className="px-4 py-4">
      <h1 className="font-semibold text-[18px]">Add Product Details</h1>
      <div className="bg-[#F1F3FF] min-h-[80vh] w-full p-2 rounded-3xl">
        <div className="bg-white w-full min-h-[70vh] rounded-3xl p-5">
          <h1 className="font-semibold text-[17px]">Add Product Details</h1>
          <table className="w-full mt-5">
            <thead className="text-center border border-white">
              <tr className="bg-[#5970F5] text-white">
                <th className="text-center border border-white">Product Name</th>
                <th className="text-center border border-white">Batch Number</th>
                <th className="text-center border border-white">Production Quantity</th>
                <th className="text-center border border-white">UOM</th>
                <th className="text-center border border-white">Rejected Quantity</th>
                <th className="text-center border border-white">Total</th>
                <th className="text-center border border-white">Warehouse Name</th>
                <th className="text-center border border-white">Pick Location</th>
                <th className="text-center border border-white">Inward Documents</th>
                <th className="text-center border border-white">Upload</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-1 border">
                  <Select></Select>
                </td>
                <td className="px-3 py-1 border">
                  <Select></Select>
                </td>
                <td className="px-3 py-1 border">
                  <h6 className="shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] "></h6>
                </td>
                <td className="px-3 py-1 border">
                  <h6 className="shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] "></h6>
                </td>
                <td className="px-3 py-1 border">
                  <h6 className="shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] "></h6>
                </td>
                <td className="px-3 py-1 border">
                  <h6 className="shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px] "></h6>
                </td>
                <td className="px-3 py-1 border">
                  <Select></Select>
                </td>
                <td className="px-3 py-1 border">
                  <Select></Select>
                </td>
                <td className="px-3 py-1 border">
                  <input type="text" className="px-2 py-1 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] h-[25px]  rounded-md" />
                </td>
                <td className="px-3 py-1 border">
                  <label className="flex justify-center items-center">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.5 6V1.925L2.2 3.225L1.5 2.5L4 0L6.5 2.5L5.8 3.225L4.5 1.925V6H3.5ZM1 8C0.725 8 0.489667 7.90217 0.294 7.7065C0.0983332 7.51083 0.000333333 7.27533 0 7V5.5H1V7H7V5.5H8V7C8 7.275 7.90217 7.5105 7.7065 7.7065C7.51083 7.9025 7.27533 8.00033 7 8H1Z" fill="#5970F5" />
                    </svg>

                    <input type="file" className="hidden" />
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddFinishedGoods;
