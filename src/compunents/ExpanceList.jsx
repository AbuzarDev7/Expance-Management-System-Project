import { useEffect } from "react"

const ExpanceList = ({ transaction, setTransaction }) => {

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

    // console.log([...transaction]);
    // console.log('deleted',updated);
  }
  const editExpance = (idx) => {
    const item = transaction[idx];
    // console.log(item);

    const newName = prompt("Enter new name:", item.name);
    if (!newName) return;
    // console.log(newName);

    const newAmount = prompt("Enter new amount:", item.amount);
    if (!newAmount) return
    // console.log(newAmount);

    const newCategory = prompt("Enter new category:", item.category);
    if (!newCategory) return;
    // console.log(newCategory);

    const newDate = prompt("Enter new date:", item.date);
    if (!newDate) return;
    // console.log(newDate);
    const update = [...transaction]
    console.log(update);
    update[idx] = {
      name: newName,
      amount: +newAmount,
      category: newCategory,
      date: newDate,
      type: item.type
    };
    setTransaction(update)
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📋 Expense List</h2>

      {transaction.length === 0 ? (
        <p className="text-center text-gray-500">No transactions yet!</p>
      ) : (
        <div className="space-y-4">
          {transaction.map((item, idx) => (
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
                  onClick={() => deleteExpance(idx)}>
                  Delete
                </button>
                <button

                  className=" bg-blue-700 text-white px-3 py-1 rounded-lg hover:bg-blue-400 transition"
                  onClick={() => editExpance(idx)}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExpanceList



