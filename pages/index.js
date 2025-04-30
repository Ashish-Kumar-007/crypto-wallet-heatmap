import { useState } from "react";
import axios from "axios";
import  TransactionHeatmap  from "./components/TransactionHeatmap";
import  TopActiveDays  from "./components/TopActiveDays";
import  TransactionActivityChart  from "./components/TransactionActivityChart";
import { addDays } from "date-fns";


export default function Home() {
  const [wallet, setWallet] = useState("");
  const [data, setData] = useState([]);

  const fetchTxs = async () => {
    const res = await axios.get(`/api/txs?wallet=${wallet}`);
    setData(res.data);
  };

  const endDate = new Date();
  const startDate = addDays(endDate, -180);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-10 border border-blue-100">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8 tracking-tight">
        🧊 Crypto Wallet Heatmap
        </h1>
        <p className="text-center text-gray-600 text-lg mb-6">
          Visualize your wallet’s daily transaction history using a calendar heatmap and bar graph.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <input
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            placeholder="Enter Ethereum wallet address"
            className="flex-grow border border-gray-300 rounded-xl p-3 text-gray-500 overflow-hidden text-ellipsis text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={fetchTxs}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-lg transition duration-300 shadow-md cursor-pointer"
          >
            🔍 Generate Heatmap
          </button>
        </div>

        {data.length > 0 ? (
          <>
                   <TransactionHeatmap startDate={startDate} endDate={endDate} data={data} />
        <TopActiveDays data={data} />
        <TransactionActivityChart data={data} />
          </>
        ) : (
          <p className="text-gray-500 text-center mt-6">
            🧾 No data yet. Please enter a valid Ethereum wallet address to view transaction activity.
          </p>
        )}
      </div>
    </div>
  );
}
