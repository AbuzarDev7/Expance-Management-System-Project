
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

  const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"];

useEffect(() => {
  const getExpance = localStorage.getItem('expances'); 
  if (getExpance) {
    setExpance(JSON.parse(getExpance));
  }
}, []);

useEffect(() => {
  localStorage.setItem("expances", JSON.stringify(expance));
}, [expance]);




  const formHandler = (e) => {
    e.preventDefault();

    const amt = +amount;


    if (!name || !date || !category) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all fields!",
      });
      return;
    }

    // check amount
    if (!amount || amt <= 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Ensure Your Amount",
      });
      return;
    }

    // add expense
    setExpance([...expance, { name, amount: amt, date, category }]);


    setName("");
    setAmount("");
    setDate("");
    setCategory("");

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: "Expense added successfully",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  // delete function
  const deleteExpense = (index) => {
    const newExpenses = expance.filter((_, i) => i !== index);
    setExpance(newExpenses);
  };

  // EDIT function
  const editExpance = (index) => {
    const expanceEdit = expance[index]

    const newName = prompt('Enter your New Expance Name', expanceEdit.name);
    if (!newName) return

    const newAmount = prompt('Enter your Expance Amount', expanceEdit.amount);
    if (+newAmount <= 0) return

    const newDate = prompt('Enter Your Expance Date', expanceEdit.date);
    if (!newDate) return

    const newCategory = prompt("Enter Category", expanceEdit.category);
    if (!newCategory) return

    const updateExpance = [...expance]
    updateExpance[index] = {
      name: newName,
      amount: +newAmount,
      date: newDate,
      category: newCategory,
    }
    setExpance(updateExpance)

  }

  return (
    
  <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-4">
    {/* Header */}
    <header className="text-center text-white mb-8">
      <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
        Expense Management System
      </h1>
      <p className="mt-2 text-lg md:text-xl">Keep track of your expenses easily</p>
    </header>

    {/* Form Section */}
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden md:flex md:flex-row p-6 md:p-8">
      <div className="md:w-1/2">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Expense</h2>
        <form onSubmit={formHandler} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Expense Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>

    {/* Filter Section */}
    <div className="max-w-4xl mx-auto mt-4 p-4 bg-white rounded-2xl shadow-md flex gap-4">
      <input
        type="date"
        value={filteredDate}
        onChange={(e) => setFilteredDate(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <select
        value={filteredCategory}
        onChange={(e) => setFilteredCategory(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">All Categories</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>

    {/* Expense List */}
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded-2xl shadow-2xl">
      <ExpanceList
        expenses={expance.filter(
          (exp) =>
            (filteredDate === "" || exp.date === filteredDate) &&
            (filteredCategory === "" || exp.category === filteredCategory)
        )}
        onDelete={deleteExpense}
        onEdit={editExpance}
      />
    </div>

    {/* Total Expense */}
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded-2xl shadow-2xl">
      <TotalExpance
        expenses={expance.filter(
          (exp) =>
            (filteredDate === "" || exp.date === filteredDate) &&
            (filteredCategory === "" || exp.category === filteredCategory)
        )}
      />
    </div>
  </div>
);

  
};

export default ExpanceInp;
