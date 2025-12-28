import { useEffect, useState } from "react"

const ExpanceList = ({ transaction, setTransaction }) => {
  const [filteredCat, setFilteredCat] = useState('all');
  const [filteredDate, setFilteredDate] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('transactions');
    if (saved) {
      setTransaction(JSON.parse(saved));
    }
  }, []);


  useEffect(() => {
    if (transaction.length > 0) {
      localStorage.setItem('transactions', JSON.stringify(transaction));
    }
  }, [transaction]);

  const deleteExpance = (idx) => {
    const updated = transaction.filter((item, index) => index !== idx)
    setTransaction(updated)
  }
  
  const editExpance = (idx) => {
    const item = transaction[idx];

    const newName = prompt("Enter new name:", item.name);
    if (!newName) return;

    const newAmount = prompt("Enter new amount:", item.amount);
    if (!newAmount) return

    const newCategory = prompt("Enter new category:", item.category);
    if (!newCategory) return;

    const newDate = prompt("Enter new date:", item.date);
    if (!newDate) return;
    
    const update = [...transaction]
    update[idx] = {
      name: newName,
      amount: +newAmount,
      category: newCategory,
      date: newDate,
      type: item.type
    };
    setTransaction(update)
  }

  const categories = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Other"];

  const uniqueDates = [...new Set(transaction.map(item => item.date))].sort();

  const filteredTransactions = transaction.filter((item) => {
    const categoryOK = item.category === filteredCat || filteredCat === 'all';
    const dateOK = item.date === filteredDate || filteredDate === '';
    return categoryOK && dateOK;
  });

  // Sort Expance
  const sortAmount = () => {
    const sorted = [...transaction]
    sorted.sort((a, b) => {
      return b.amount - a.amount
    })
    setTransaction(sorted)
  }
  
  const sortDate = () => {
    const sorted = [...transaction];
    sorted.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
    setTransaction(sorted)
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📋 Expense List</h2>

      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="font-semibold mb-3"> Filter Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Filter by Category:</label>
            <select
              value={filteredCat}
              onChange={(e) => setFilteredCat(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Filter by Date:</label>
            <select
              value={filteredDate}
              onChange={(e) => setFilteredDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Dates</option>
              {uniqueDates.map(date => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 mb-4">
        <button
          onClick={sortAmount}
          className="px-4 py-2 rounded-lg font-semibold bg-purple-500 text-white hover:bg-purple-600"
        >
          Sort by Amount
        </button>
        <button
          onClick={sortDate}
          className="px-4 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600"
        >
          Sort by Date
        </button>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="text-center text-gray-500">
          {transaction.length === 0 ? "No transactions yet!" : "No transactions match your filters."}
        </p>
      ) : (
        <div className="space-y-4">
          {filteredTransactions.map((item, idx) => {
            const originalIdx = transaction.findIndex(t =>
              t.name === item.name &&
              t.amount === item.amount &&
              t.date === item.date &&
              t.category === item.category
            );

            return (
              <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl shadow">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.category} • {item.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`font-bold ${item.type === "in" ? "text-green-500" : "text-red-500"}`}>
                    {item.type === "in" ? "+" : "-"}${item.amount}
                  </span>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                    onClick={() => deleteExpance(originalIdx)}>
                    Delete
                  </button>
                  <button
                    className=" bg-blue-700 text-white px-3 py-1 rounded-lg hover:bg-blue-400 transition"
                    onClick={() => editExpance(originalIdx)}>
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default ExpanceList