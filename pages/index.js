// pages/index.tsx
import { useState } from 'react';
import Heatmap from './components/Heatmap';
import axios from 'axios';

export default function Home() {
  const [wallet, setWallet] = useState('');
  const [data, setData] = useState([]);

  const fetchTxs = async () => {
    const res = await axios.get(`/api/txs?wallet=${wallet}`);
    setData(res.data);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <input value={wallet} onChange={(e) => setWallet(e.target.value)} placeholder="Enter wallet address" className="border p-2 w-full" />
      <button onClick={fetchTxs} className="bg-blue-600 text-white px-4 py-2 mt-2">Generate Heatmap</button>
      {data.length > 0 && <Heatmap data={data} />}
    </div>
  );
}
