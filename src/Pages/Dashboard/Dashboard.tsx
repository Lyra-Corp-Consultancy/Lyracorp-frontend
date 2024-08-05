import NavigationBar from "../../components/NavigationBar";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
// import axios from "axios";
// import { useQuery } from "../../utils/hooks/hooks";

function Dashboard() {
  const data2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [5000, 7000, 8000, 6000, 9000, 10000, 12000],
        backgroundColor: '#961B00',
        borderColor: '#961B00',
        borderWidth: 1,
        borderRadius:10
      },
      {
        label: 'Expenses',
        data: [3000, 4000, 2000, 5000, 3000, 4000, 3000],
        backgroundColor: '#02006F',
        borderColor: '#02006F',
        borderWidth: 1,
        borderRadius:10
      },
    ],
  };
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sample Data",
        data: [10, 20, 15, 25, 30, 40, 35],
        fill: true,
        backgroundColor: "rgba(75,192,192,0)",
        borderColor: "#62DBDB",
        tension: 0.4,
      },
      {
        label: "Sample Data",
        data: [13, 22, 34, 25, 12, 23, 89],
        fill: true,
        backgroundColor: "rgba(75,192,192,0)",
        borderColor: "#FACEB6",
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="w-screen min-h-screen">
      <NavigationBar />
      <div className="p-5">
        <h1>Dashboard</h1>

        <div className="bg-[#F1F3FF] min-h-[100vh] flex flex-col rounded-md p-4">
          <div className="flex p-5 gap-4">
            <button className="bg-[#007E32] rounded-md flex items-center gap-4 px-7 py-5">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="25" fill="white" />
                <path d="M37.5 18.75L25 12.5L12.5 18.75V31.25L25 37.5L37.5 31.25V18.75Z" stroke="#007E32" stroke-width="4" stroke-linejoin="round" />
                <path d="M12.5 18.75L25 25M25 25V37.5M25 25L37.5 18.75M31.25 15.625L18.75 21.875" stroke="#007E32" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <div className="text-white">
                <p>Total Orders</p>
                <p className="font-bold text-lg">456</p>
              </div>
            </button>
            <button className="bg-[#00068B] rounded-md flex items-center gap-4 px-7 py-5">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="25" fill="white" />
                <path
                  d="M31.5708 33.9819L35.5153 30.0986L34.6458 29.2278L31.5708 32.2597L30.2444 30.9056L29.3736 31.7833L31.5708 33.9819ZM16.8472 18.5708H31.3778V17.1819H16.8458L16.8472 18.5708ZM32.4444 37.1611C30.8972 37.1611 29.5847 36.6218 28.5069 35.5431C27.4282 34.4653 26.8889 33.1528 26.8889 31.6056C26.8889 30.0583 27.4282 28.7454 28.5069 27.6667C29.5856 26.588 30.8981 26.0491 32.4444 26.05C33.9907 26.0509 35.3037 26.5898 36.3833 27.6667C37.463 28.7435 38.0018 30.0565 38 31.6056C38 33.1519 37.4611 34.4644 36.3833 35.5431C35.3037 36.6218 33.9907 37.1611 32.4444 37.1611ZM13 35.2903V14.2444C13 13.6222 13.2185 13.0926 13.6556 12.6556C14.0926 12.2185 14.6222 12 15.2444 12H32.9792C33.5995 12 34.1287 12.2185 34.5667 12.6556C35.0037 13.0926 35.2222 13.6222 35.2222 14.2444V22.5C34.9963 22.4167 34.7722 22.3454 34.55 22.2861C34.3268 22.2269 34.088 22.1806 33.8333 22.1472V14.2444C33.8333 14.0306 33.7444 13.8343 33.5667 13.6556C33.3889 13.4769 33.1926 13.388 32.9778 13.3889H15.2444C15.0306 13.3889 14.8343 13.4778 14.6556 13.6556C14.4769 13.8333 14.388 14.0296 14.3889 14.2444V32.9028H23.2C23.263 33.2824 23.3444 33.6537 23.4444 34.0167C23.5454 34.3796 23.6856 34.7259 23.8653 35.0556L23.8181 35.1028L22.2417 33.9556L20.3722 35.2903L18.5028 33.9556L16.6333 35.2903L14.7625 33.9556L13 35.2903ZM16.8472 29.0403H23.3875C23.4394 28.7856 23.5032 28.5472 23.5792 28.325C23.6551 28.1028 23.744 27.8782 23.8458 27.6514H16.8472V29.0403ZM16.8472 23.8056H27C27.4537 23.4472 27.9398 23.1486 28.4583 22.9097C28.9768 22.6699 29.531 22.5056 30.1208 22.4167H16.8458L16.8472 23.8056Z"
                  fill="#00068B"
                />
              </svg>

              <div className="text-white">
                <p>Production Value</p>
                <p className="font-bold text-lg">456</p>
              </div>
            </button>
            <button className="bg-[#AD0000] rounded-md flex items-center gap-4 px-7 py-5">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="25" fill="white" />
                <path d="M25.5 37.0687V25.7962M29.4704 12.2816C29.7824 12.1072 30.1338 12.0156 30.4912 12.0156C30.8486 12.0156 31.2001 12.1072 31.512 12.2816L36.7725 15.2375C37.1451 15.4482 37.4551 15.754 37.6707 16.1237C37.8864 16.4934 38 16.9137 38 17.3417C38 17.7697 37.8864 18.1901 37.6707 18.5598C37.4551 18.9295 37.1451 19.2353 36.7725 19.446L21.517 28.0381C21.204 28.216 20.8501 28.3095 20.49 28.3095C20.1299 28.3095 19.776 28.216 19.4629 28.0381L14.2275 25.0822C13.8549 24.8716 13.5449 24.5657 13.3293 24.196C13.1136 23.8263 13 23.406 13 22.978C13 22.55 13.1136 22.1297 13.3293 21.76C13.5449 21.3903 13.8549 21.0845 14.2275 20.8738L29.4704 12.2816Z" stroke="#AD0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M35.5206 25.8008V30.648C35.521 31.1207 35.3916 31.5845 35.1465 31.9887C34.9013 32.393 34.5498 32.722 34.1303 32.9401L26.6152 36.7978C26.2709 36.9767 25.8886 37.0701 25.5005 37.0701C25.1125 37.0701 24.7301 36.9767 24.3858 36.7978L16.8708 32.9401C16.4513 32.722 16.0997 32.393 15.8546 31.9887C15.6094 31.5845 15.48 31.1207 15.4805 30.648V25.8008" stroke="#AD0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M36.7725 25.0847C37.1451 24.8741 37.4551 24.5682 37.6707 24.1985C37.8864 23.8288 38 23.4085 38 22.9805C38 22.5525 37.8864 22.1322 37.6707 21.7625C37.4551 21.3928 37.1451 21.087 36.7725 20.8763L21.5296 12.2716C21.2188 12.0936 20.8669 12 20.5088 12C20.1506 12 19.7987 12.0936 19.488 12.2716L14.2275 15.24C13.8549 15.4507 13.5449 15.7565 13.3293 16.1262C13.1136 16.4959 13 16.9162 13 17.3442C13 17.7722 13.1136 18.1926 13.3293 18.5623C13.5449 18.932 13.8549 19.2378 14.2275 19.4485L29.483 28.0406C29.7937 28.2186 30.1456 28.3122 30.5038 28.3122C30.8619 28.3122 31.2138 28.2186 31.5245 28.0406L36.7725 25.0847Z" stroke="#AD0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <div className="text-white">
                <p>Total Amount</p>
                <p className="font-bold text-lg">456</p>
              </div>
            </button>
            <button className="bg-[#6E5600] rounded-md flex items-center gap-4 px-7 py-5">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="25" fill="white" />
                <path d="M18.9211 23.8421H16.2895V33.0526H18.9211V23.8421ZM26.8158 23.8421H24.1842V33.0526H26.8158V23.8421ZM38 35.6842H13V38.3158H38V35.6842ZM34.7105 23.8421H32.0789V33.0526H34.7105V23.8421ZM25.5 14.9737L32.3553 18.5789H18.6447L25.5 14.9737ZM25.5 12L13 18.5789V21.2105H38V18.5789L25.5 12Z" fill="#6E5600" />
              </svg>

              <div className="text-white">
                <p>Inventory Value</p>
                <p className="font-bold text-lg">456</p>
              </div>
            </button>
            <div className="bg-[#C3CBFF] px-4 py-2 flex w-[30%] gap-[10px] rounded-md">
              <div className="bg-[#5970F5] aspect-square h-full rounded-full"></div>
              <div>
                <h1 className="font-bold text-xl">SSKL Pvt Ltd</h1>
                <div className="flex font-semibold text-[13px]">
                  <p>Name : Raghu T</p> <p>GSTIN : G766GHEBGGEB6T4</p>
                </div>
                <p className="flex font-semibold">Address : No.7, Kalati Road, Coimbatore - 29</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col p-3">
              <div className="w-full shadow-md p-3 bg-white flex flex-col gap-4 h-[400px] rounded-md">
                <div className="flex justify-between items-center">
                  <h1>Sales Trend</h1>
                  <select name="" id="">
                    <option value="">Yearly</option>
                  </select>
                </div>
                  <Line data={data} options={options}  className="self-center"/>
              </div>
            </div>
            <div className="flex flex-col p-3">
              <div className="w-full shadow-md p-3 bg-white flex flex-col justify-between gap-4 pb-20 h-[600px] rounded-md">
                <div className="flex justify-between items-center">
                  <h1>Sales Trend</h1>
                  <select name="" id="">
                    <option value="">Yearly</option>
                  </select>
                </div>
                  <Bar data={data2} options={options}  className="self-center"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
