import React, { useState } from 'react'

import HeaderBtns from './compunents/HeaderBtns'
import ExpanceList from './compunents/ExpanceList'
import ExpanceForm from './compunents/ExpanceForm'

const App = () => {
const [trasiction, setTransection] = useState([]);
const cashIn = trasiction
.filter((e)=> e.type === "in")
.reduce((acc,cVal)=> acc + cVal.amount ,0)
const cashOut = trasiction
.filter((e)=> e.type === "out")
.reduce((acc,cVal)=> acc + cVal.amount ,0)
const balance = cashIn - cashOut
  return (
 <>
  <h1 className="text-5xl font-extrabold mb-10 text-center  drop-shadow-lg">
  Expense Management System
</h1>


    <HeaderBtns  cashIn={cashIn} cashOut={cashOut} balance={balance}/>
      <ExpanceForm 
          transaction={trasiction} 
          setTransaction={setTransection}
        />
        <br />
    <ExpanceList/>
    
 </>
 
  )
}

export default App