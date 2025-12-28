


import React from 'react'

const ExpanceList = ({transaction, setTransaction }) => {
  return (
     <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📋 Expense List</h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl shadow hover:scale-105 transition">
          <div>
            <p className="font-semibold">Sample Expense</p>
            <p className="text-sm text-gray-500">Food • 2025-01-01</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-bold text-red-500">$0</span>
            <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">
              Edit
            </button>
            <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpanceList



