import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function MonthlyChart({ expenses }) {

  // Group data by month
  const monthlyTotals = {};

  expenses.forEach((e) => {
    const month = e.date.substring(0, 7); // YYYY-MM

    if (monthlyTotals[month]) {
      monthlyTotals[month] += e.amount;
    } else {
      monthlyTotals[month] = e.amount;
    }
  });

  const chartData = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(monthlyTotals),
        backgroundColor: "#3b82f6"
      }
    ]
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3 text-center">
        Monthly Spending
      </h2>
      <Bar data={chartData} />
    </div>
  );
}

export default MonthlyChart;