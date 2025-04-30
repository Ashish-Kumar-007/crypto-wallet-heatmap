import { useState } from "react";
import axios from "axios";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { addDays } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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
            {/* Heatmap Section */}
            <section className="mt-12">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                🗓️ 6-Month Transaction Heatmap
              </h2>
              <CalendarHeatmap
                startDate={startDate}
                endDate={endDate}
                values={data}
                classForValue={(value) => {
                  if (!value || !value.count) return "bg-gray-200";
                  if (value.count < 2) return "bg-green-200";
                  if (value.count < 5) return "bg-green-400";
                  return "bg-green-600";
                }}
                tooltipDataAttrs={(value) => ({
                  "data-tip": `${value.date}: ${value.count || 0} txs`,
                })}
                showWeekdayLabels
              />
              <p className="text-sm text-gray-500 mt-2">
                Darker shades indicate higher transaction activity.
              </p>
            </section>

            {/* Top Active Days Summary */}
            <section className="mt-12">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                📅 Most Active Days
              </h2>
              <div className="space-y-3">
                {data
                  .slice()
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 7)
                  .map((entry) => (
                    <div key={entry.date}>
                      <div className="flex justify-between text-sm font-medium text-gray-700">
                        <span>{entry.date}</span>
                        <span>{entry.count} txs</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all"
                          style={{ width: `${Math.min(entry.count * 10, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            {/* Bar Chart Section */}
            <section className="mt-12">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                📊 Transaction Activity (Last 30 Days)
              </h2>
              <div className="w-full h-64 bg-white rounded-lg shadow-md p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.slice(-30)}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#4299E1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
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
