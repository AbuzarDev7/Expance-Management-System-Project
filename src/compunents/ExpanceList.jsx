import React from "react";

const ExpanceList = ({ expenses = [], onDelete, onEdit }) => {
  if (expenses.length === 0) {
    return <p className="text-center mt-4 text-gray-500">No expenses found</p>;
  }

  return (
    <ul className="divide-y divide-gray-200">
      {expenses.map((exp, index) => (
        <li key={index} className="flex justify-between items-center py-2">
          <div>
            <p className="font-medium">{exp.name}</p>
            <p className="text-sm text-gray-500">{exp.category} - {exp.date}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">${exp.amount}</span>

            {/* Delete */}
            <button
              onClick={() => onDelete(index)}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Delete
            </button>

            {/* Edit */}
            <button
              onClick={() => onEdit(index)}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Edit
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExpanceList;
