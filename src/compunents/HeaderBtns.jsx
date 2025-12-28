import React from 'react'

const HeaderBtns = ({cashIn , cashOut,balance}) => {
  return (
   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

  {/* CASH IN */}
  <div className="relative overflow-hidden rounded-3xl p-6 
    bg-gradient-to-br from-green-400 to-green-600 text-white 
    shadow-xl transition-all duration-300 ease-out
    hover:-translate-y-3 hover:shadow-2xl cursor-pointer">
    
    <div className="absolute top-4 right-4 text-5xl opacity-20">💰</div>
    <p className="text-sm tracking-widest uppercase opacity-80">
      Cash In
    </p>
    <h2 className="text-5xl font-extrabold mt-4">{cashIn}</h2>
    <div className="mt-6 h-1 w-16 bg-white/40 rounded"></div>
  </div>

  {/* CASH OUT */}
  <div className="relative overflow-hidden rounded-3xl p-6 
    bg-gradient-to-br from-rose-400 to-red-600 text-white 
    shadow-xl transition-all duration-300 ease-out
    hover:-translate-y-3 hover:shadow-2xl cursor-pointer">
    
    <div className="absolute top-4 right-4 text-5xl opacity-20">💸</div>
    <p className="text-sm tracking-widest uppercase opacity-80">
      Cash Out
    </p>
    <h2 className="text-5xl font-extrabold mt-4">{cashOut}</h2>
    <div className="mt-6 h-1 w-16 bg-white/40 rounded"></div>
  </div>

  {/* BALANCE */}
  <div className="relative overflow-hidden rounded-3xl p-6 
    bg-gradient-to-br from-sky-400 to-blue-600 text-white 
    shadow-xl transition-all duration-300 ease-out
    hover:-translate-y-3 hover:shadow-2xl cursor-pointer">
    
    <div className="absolute top-4 right-4 text-5xl opacity-20">🪙</div>
    <p className="text-sm tracking-widest uppercase opacity-80">
      Balance
    </p>
    <h2 className="text-5xl font-extrabold mt-4">{balance}</h2>
    <div className="mt-6 h-1 w-16 bg-white/40 rounded"></div>
  </div>

</div>

  )
}

export default HeaderBtns