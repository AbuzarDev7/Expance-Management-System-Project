import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ExpanceList from "./ExpanceList";
import TotalExpance from "./TotalExpance";

const ExpanceInp = () => {
  const [expance, setExpance] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [filteredDate, setFilteredDate] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("");
  const [sortExpance, setSortExpance] = useState("");

  const categories = ["Food","Transport","Shopping","Bills","Entertainment","Other",];

  useEffect(() => {
    const data = localStorage.getItem("expances");
    if (data) setExpance(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("expances", JSON.stringify(expance));
  }, [expance]);

  const formHandler = (e) => {
    e.preventDefault();
    const amt = +amount;

    if (!name || !date || !category || !amount || amt <= 0) {
      Swal.fire("Error", "Please fill all fields correctly", "error");
      return;
    }

    setExpance([...expance, { name, amount: amt, date, category }]);
    setName("");
    setAmount("");
    setDate("");
    setCategory("");
    Swal.fire("Added!", "Expense added successfully", "success");
  };

  const deleteExpense = (index) => {
    const newExpenses = expance.filter((i) => i !== index);
    setExpance(newExpenses);
  };

  const editExpance = (index) => {
    const exp = expance[index];
    const newName = prompt("Expense Name", exp.name);
    const newAmount = prompt("Amount", exp.amount);
    const newDate = prompt("Date", exp.date);
    const newCategory = prompt("Category", exp.category);

    if (!newName || !newAmount || !newDate || !newCategory) return;

    const updated = [...expance];
    updated[index] = {
      name: newName,
      amount: +newAmount,
      date: newDate,
      category: newCategory,
    };
    setExpance(updated);
  };

  const filteredExpenses = expance.filter(
    (exp) =>
      (filteredDate === "" || exp.date === filteredDate) &&
      (filteredCategory === "" || exp.category === filteredCategory)
  );

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortExpance === "amount") return a.amount - b.amount;
    if (sortExpance === "date") return new Date(a.date) - new Date(b.date);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-6">
      <header className="text-center text-white mb-10">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">Expense Management</h1>
        <p className="mt-3 text-lg text-white/90">Track your expenses easily</p>
      </header>

      {/* FORM */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Expense</h2>
        <form onSubmit={formHandler} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Expense Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter expense name"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition font-semibold"
          >
            Add Expense
          </button>
        </form>
      </div>

  
      <div className="max-w-2xl mx-auto mt-6 p-6 bg-white rounded-3xl shadow-md flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Filter by Date</label>
          <input
            type="date"
            value={filteredDate}
            onChange={(e) => setFilteredDate(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Filter by Category</label>
          <select
            value={filteredCategory}
            onChange={(e) => setFilteredCategory(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Sort Expenses</label>
          <select
            value={sortExpance}
            onChange={(e) => setSortExpance(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            <option value="">No Sorting</option>
            <option value="amount">Sort by Amount</option>
            <option value="date">Sort by Date</option>
          </select>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-3xl shadow-2xl">
        <ExpanceList expenses={sortedExpenses} onDelete={deleteExpense} onEdit={editExpance} />
      </div>


      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-3xl shadow-2xl">
        <TotalExpance expenses={sortedExpenses} />
      </div>
    </div>
  );
};

export default ExpanceInp;
