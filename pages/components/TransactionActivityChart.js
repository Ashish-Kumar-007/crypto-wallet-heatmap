import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function TransactionActivityChart ({ data }) {
  return (
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
  );
};
