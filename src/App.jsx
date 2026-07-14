import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase/firebaseConfig'
import HeaderBtns from './compunents/HeaderBtns'
import ExpanceList from './compunents/ExpanceList'
import ExpanceForm from './compunents/ExpanceForm'
import Login from './compunents/Login'
import Swal from 'sweetalert2'

const App = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [trasiction, setTransection] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
      if (!u) setTransection([]);
    });
    return () => unsub();
  }, []);

  const cashIn  = trasiction.filter(e => e.type==='in').reduce((s,e) => s+e.amount, 0);
  const cashOut = trasiction.filter(e => e.type==='out').reduce((s,e) => s+e.amount, 0);
  const balance = cashIn - cashOut;

  const handleLogout = async () => {
    const res = await Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#6366f1',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel',
      background: '#ffffff', color: '#1f2937'
    });
    if (res.isConfirmed) {
      await signOut(auth);
    }
  };

  /* ── Loading Screen ── */
  if (authLoading) return (
    <div style={{
      minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', gap:'16px',
      backgroundColor: '#f3f4f6',
      fontFamily:"'Inter',sans-serif"
    }}>
      <div style={{
        width:'40px', height:'40px',
        border:'3px solid #e5e7eb',
        borderTop:'3px solid #6366f1', borderRadius:'50%',
        animation:'spin 0.8s linear infinite'
      }} />
      <p style={{ color:'#6b7280', fontSize:'14px', fontWeight:'500' }}>Loading...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!user) return <Login />;

  /* ── Clean Dashboard ── */
  return (
    <div style={{ minHeight:'100vh', backgroundColor:'#f9fafb', fontFamily:"'Inter',sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position:'sticky', top:0, zIndex:100,
        backgroundColor: '#ffffff',
        borderBottom:'1px solid #e5e7eb',
        padding:'0 24px', height:'64px',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      }}>
        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap: '10px' }}>
          <div style={{ color: '#6366f1', display: 'flex', alignItems: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M12 11h.01" />
              <path d="M16 8h-4a2 2 0 0 0 0 4h4" />
            </svg>
          </div>
          <h1 style={{ color:'#1f2937', margin:0, fontSize:'18px', fontWeight:'700', letterSpacing:'-0.3px' }}>
            Expense Manager
          </h1>
        </div>

        {/* Right side */}
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          {/* User Email Info */}
          <div style={{
            display:'flex',
            alignItems:'center',
            gap:'8px',
            backgroundColor:'#f3f4f6',
            borderRadius:'20px',
            padding:'6px 12px'
          }}>
            <div style={{
              width:'24px', height:'24px', borderRadius:'50%',
              backgroundColor:'#6366f1',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'12px', fontWeight:'700', color:'#fff'
            }}>
              {user.email?.[0]?.toUpperCase()}
            </div>
            <span style={{
              color:'#4b5563', fontSize:'13px', fontWeight:'500',
              maxWidth:'150px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'
            }}>
              {user.email}
            </span>
          </div>

          {/* Logout Button */}
          <button onClick={handleLogout} style={{
            background:'#ffffff',
            border:'1px solid #d1d5db',
            borderRadius:'8px',
            padding:'6px 12px',
            color:'#4b5563',
            fontWeight:'600',
            fontSize:'13px',
            cursor:'pointer',
            fontFamily:"'Inter',sans-serif",
            transition:'all 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor='#f9fafb'; e.currentTarget.style.color='#1f2937'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor='#ffffff'; e.currentTarget.style.color='#4b5563'; }}>
            Logout
          </button>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main style={{ maxWidth:'1000px', margin:'0 auto', padding:'32px 20px 60px' }}>

        <div style={{ marginBottom:'24px' }}>
          <h2 style={{ color:'#1f2937', fontSize:'22px', fontWeight:'700', margin:'0 0 4px' }}>
            Overview
          </h2>
          <p style={{ color:'#6b7280', fontSize:'14px', margin:0 }}>
            Manage your budget and track transactions
          </p>
        </div>

        <HeaderBtns cashIn={cashIn} cashOut={cashOut} balance={balance} />

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(320px, 1fr))', gap:'24px', marginTop:'32px', alignItems:'start' }}>
          <ExpanceForm transaction={trasiction} setTransaction={setTransection} userId={user.uid} />
          <ExpanceList transaction={trasiction} setTransaction={setTransection} userId={user.uid} />
        </div>
      </main>
    </div>
  );
}

export default App;