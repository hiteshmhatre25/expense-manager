import { useState, useEffect } from "react";
import axios from "axios";

function AddExpense({ fetchExpenses, fetchCategoryTotals, editingExpense, setEditingExpense }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  // PREFILL FORM WHEN EDITING
  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDescription(editingExpense.description);
      setDate(editingExpense.date);
    }
  }, [editingExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expense = { amount, category, description, date };

    if (editingExpense) {
      await axios.put(
        `http://localhost:8080/api/expenses/${editingExpense.id}`, 
        expense
      );
      setEditingExpense(null);
    } else {
      await axios.post("http://localhost:8080/api/expenses", expense);
    }

    // CLEAR FORM
    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");

    fetchExpenses();
    fetchCategoryTotals();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <input 
        className="w-full border p-2 rounded"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        className="w-full border p-2 rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">Entertainment</option>
      </select>

      <input 
        className="w-full border p-2 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input 
        type="date"
        className="w-full border p-2 rounded"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>

    </form>
  );
}

export default AddExpense;