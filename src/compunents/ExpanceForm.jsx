import React, { useState } from 'react'
import Swal from 'sweetalert2';

const ExpenseForm = ({ transaction, setTransaction }) => {
  // Form input states
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  
  const addTransaction = (type) => {
   
    if (!name || !amount || !category || !date) {
     

Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Plzz Fill The Form!",
  footer: '<a href="#">Why do I have this issue?</a>'
});
      return;
    }

    const newTransaction = {

      name: name,
      amount: +amount, 
      date: date,
      category: category,
      type: type 
    };


    //  console.log([...transaction,newTransaction]);
    setTransaction([...transaction, newTransaction]);
 
    setName("");
    setAmount("");
    setDate("");
    setCategory("");
  };


  const categories = ["Food","Transport","Shopping","Bills","Entertainment","Other"];

  return (
    <div className="max-w-xl mx-auto mt-12">
      <div className="bg-white rounded-3xl shadow-2xl p-8 transition-all duration-300 hover:-translate-y-2">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add Expense
        </h1>

        {/* Form */}
        <div className="space-y-5">
          
          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Amount
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Date
            </label>
            <input
              type="date"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            
            {/* Cash In Button */}
            <button
              type="button"
              className="bg-green-500 text-white rounded-xl py-3 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-green-600"
              onClick={() => addTransaction("in")}
            >
              💰 Cash In
            </button>

            {/* Cash Out Button */}
            <button
              type="button"
              className="bg-red-500 text-white rounded-xl py-3 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-red-600"
              onClick={() => addTransaction("out")}
            >
              💸 Cash Out
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;