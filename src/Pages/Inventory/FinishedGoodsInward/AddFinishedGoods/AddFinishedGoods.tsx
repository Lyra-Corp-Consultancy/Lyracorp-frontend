function AddFinishedGoods() {
  return (
    <div className="px-4 py-4">
      <h1 className="font-semibold text-[18px]">Add Product Details</h1>
      <div className="bg-[#F1F3FF] min-h-[80vh] w-full p-2 rounded-3xl">
        <div className="bg-white w-full min-h-[70vh] rounded-3xl p-5">
          <h1>Add Product Details</h1>
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
            {/* <tbody>
              <tr>

              </tr>
            </tbody> */}
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddFinishedGoods;
