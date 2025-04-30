// pages/api/txs.js
import axios from "axios";

export default async function handler(req, res) {
  const { wallet } = req.query;
  const API_KEY = process.env.ETHERSCAN_API_KEY;

  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&sort=asc&apikey=${API_KEY}`;

  const response = await axios.get(url);
  const txs = response.data.result;

  const txMap = {};
  txs.forEach((tx) => {
    const date = new Date(tx.timeStamp * 1000).toISOString().split('T')[0];
    txMap[date] = (txMap[date] || 0) + 1;
  });

  const heatmapData = Object.entries(txMap).map(([date, count]) => ({ date, count }));
  res.json(heatmapData);
}
