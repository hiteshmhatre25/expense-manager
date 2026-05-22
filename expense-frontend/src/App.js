import { useEffect, useState } from "react";
import axios from "axios";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import CategoryChart from "./components/CategoryChart";
import MonthlyChart from "./components/MonthlyChart";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = () => {
    axios.get("http://localhost:8080/api/expenses")
      .then((res) => setExpenses(res.data));
  };

  const fetchCategoryTotals = () => {
    axios.get("http://localhost:8080/api/expenses/category-total")
      .then((res) => setCategoryData(res.data));
  };

  useEffect(() => {
    fetchExpenses();
    fetchCategoryTotals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <h1 className="text-3xl font-bold text-center mb-6">
        Expense Manager
      </h1>

      {/* TOTAL CARD */}
      <div className="bg-white p-4 rounded shadow mb-6 text-center">
        <h2 className="text-lg font-semibold">Total Expenses</h2>
        <p className="text-2xl font-bold text-blue-600">
          ₹{expenses.reduce((sum, e) => sum + e.amount, 0)}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* ADD / EDIT FORM */}
        <div className="bg-white p-4 rounded shadow">
          <AddExpense 
            fetchExpenses={fetchExpenses} 
            fetchCategoryTotals={fetchCategoryTotals} 
            editingExpense={editingExpense}
            setEditingExpense={setEditingExpense}
          />
        </div>

        {/* EXPENSE LIST */}
        <div className="bg-white p-4 rounded shadow">
          <ExpenseList 
            expenses={expenses} 
            onEdit={setEditingExpense}   // ✅ FIXED
          />
        </div>

        {/* CATEGORY CHART */}
        <div className="bg-white p-4 rounded shadow md:col-span-2">
          <CategoryChart data={categoryData} />
        </div>

        {/* MONTHLY CHART */}
        <div className="bg-white p-4 rounded shadow md:col-span-2">
          <MonthlyChart expenses={expenses} />
        </div>

      </div>
    </div>
  );
}

export default App;