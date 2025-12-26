import React from "react";

const TotalExpance = ({ expenses }) => {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  return (
    <div className="mt-4 text-xl font-bold text-center">
      Total Expense: ${total}
    </div>
  );
};

export default TotalExpance;
