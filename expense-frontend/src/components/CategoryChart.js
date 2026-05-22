import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryChart({ data }) {

  if (!data || Object.keys(data).length === 0) {
    return <p>No data available</p>;
  }

 const chartData = {
  labels: Object.keys(data),
  datasets: [
    {
      data: Object.values(data),
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40"
      ],
      borderWidth: 1
    },
  ],
};

  return (
  <div style={{ width: "300px", margin: "auto" }}>
    <h2 className="text-xl font-semibold mb-3 text-center">
  Spending by Category
</h2>
    <Pie key={JSON.stringify(data)} data={chartData} />
  </div>
);
}

export default CategoryChart;