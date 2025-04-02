import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const StatisticsChart = ({ year, month }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/statistics", {
          params: { year, month }
        });
        const formattedData = response.data.map((item) => ({
          month: `${item._id.month}/${item._id.year}`,
          totalSales: item.totalSales,
          totalPurchases: item.totalPurchases
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [year, month]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>Thống kê giá bán & giá nhập</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalSales" stroke="#8884d8" name="Giá bán" />
          <Line type="monotone" dataKey="totalPurchases" stroke="#82ca9d" name="Giá nhập" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatisticsChart;