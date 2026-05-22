import axios from "axios";

function ExpenseList({ expenses, onEdit }) {

  const deleteExpense = async (id) => {
    await axios.delete(`http://localhost:8080/api/expenses/${id}`);
    window.location.reload(); // you can improve later
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Expenses</h2>

      {expenses.map((e) => (
        <div key={e.id} className="flex justify-between items-center bg-gray-50 p-3 mb-2 rounded">

          <div>
            <p className="font-medium">
              ₹{e.amount} - {e.category}
            </p>
            <p className="text-sm text-gray-500">
              {e.description}
            </p>
          </div>

          <div className="flex gap-2">
            {/* EDIT BUTTON */}
            <button 
              className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded hover:bg-yellow-200"
              onClick={() => onEdit(e)}
            >
              Edit
            </button>

            {/* DELETE BUTTON */}
            <button
              className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
              onClick={() => deleteExpense(e.id)}
            >
              Delete
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}

export default ExpenseList;