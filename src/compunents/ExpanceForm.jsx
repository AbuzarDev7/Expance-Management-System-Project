import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const categories = [
  { 
    value: 'Food', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  { 
    value: 'Transport', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2" ry="2" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    )
  },
  { 
    value: 'Shopping', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
      </svg>
    )
  },
  { 
    value: 'Bills', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    )
  },
  { 
    value: 'Entertainment', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
      </svg>
    )
  },
  { 
    value: 'Other', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
        <polygon points="12 22.08 12 12 3 6.92 3 17 12 22.08" />
        <polygon points="12 22.08 12 12 21 6.92 21 17 12 22.08" />
        <polygon points="12 12 3 6.92 12 1.84 21 6.92 12 12" />
      </svg>
    )
  },
];

const ExpenseForm = ({ transaction, setTransaction, userId }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [saving, setSaving] = useState(false);
  const [activeType, setActiveType] = useState(null);

  const addTransaction = async (type) => {
    if (!name || !amount || !category || !date) {
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Form',
        text: 'Please fill in all the fields.',
        confirmButtonColor: '#6366f1'
      });
      return;
    }

    setSaving(true);
    setActiveType(type);
    try {
      const newTx = { name, amount: +amount, date, category, type, userId, createdAt: serverTimestamp() };
      const ref = await addDoc(collection(db, 'users', userId, 'transactions'), newTx);
      setTransaction([...transaction, { ...newTx, id: ref.id }]);

      Swal.fire({
        icon: 'success',
        title: type === 'in' ? 'Income Added!' : 'Expense Added!',
        text: `${name} - Rs.${amount}`,
        timer: 1500,
        showConfirmButton: false
      });

      setName(''); setAmount(''); setDate(''); setCategory('');
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Database save failed. Please check your internet connection.' });
    } finally {
      setSaving(false); setActiveType(null);
    }
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      padding: '28px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <span style={{ color: '#6366f1', display: 'flex', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z" />
          </svg>
        </span>
        <h3 style={{ color: '#0f172a', fontSize: '18px', fontWeight: '700', margin: 0 }}>
          New Transaction
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Name Input */}
        <div>
          <label className="form-label">Transaction Name</label>
          <input
            className="inp"
            type="text"
            placeholder="e.g. Weekly Groceries, Office Bonus..."
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        {/* Amount Input */}
        <div>
          <label className="form-label">Amount (Rs.)</label>
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8',
              fontWeight: '600',
              fontSize: '14px'
            }}>₨</span>
            <input
              className="inp"
              type="number"
              placeholder="0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              style={{ paddingLeft: '32px' }}
            />
          </div>
        </div>

        {/* Category Selector */}
        <div>
          <label className="form-label">Select Category</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {categories.map(c => (
              <button
                key={c.value}
                type="button"
                onClick={() => setCategory(c.value)}
                style={{
                  padding: '10px 8px',
                  border: '1px solid',
                  borderColor: category === c.value ? '#6366f1' : '#e2e8f0',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  backgroundColor: category === c.value ? '#f5f3ff' : '#ffffff',
                  color: category === c.value ? '#6366f1' : '#475569',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span style={{ color: category === c.value ? '#6366f1' : '#64748b' }}>{c.icon}</span>
                <span>{c.value}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date Input */}
        <div>
          <label className="form-label">Transaction Date</label>
          <input
            className="inp"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '8px' }}>
          <button
            type="button"
            disabled={saving}
            onClick={() => addTransaction('in')}
            style={{
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              cursor: saving ? 'not-allowed' : 'pointer',
              backgroundColor: '#10b981',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '14px',
              fontFamily: "'Inter', sans-serif",
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 2px 4px rgba(16, 185, 129, 0.1)'
            }}
            onMouseEnter={e => { if (!saving) e.target.style.backgroundColor = '#059669'; }}
            onMouseLeave={e => { e.target.style.backgroundColor = '#10b981'; }}
          >
            {saving && activeType === 'in' ? 'Saving...' : 'Cash In'}
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => addTransaction('out')}
            style={{
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              cursor: saving ? 'not-allowed' : 'pointer',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '14px',
              fontFamily: "'Inter', sans-serif",
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 2px 4px rgba(239, 68, 68, 0.1)'
            }}
            onMouseEnter={e => { if (!saving) e.target.style.backgroundColor = '#dc2626'; }}
            onMouseLeave={e => { e.target.style.backgroundColor = '#ef4444'; }}
          >
            {saving && activeType === 'out' ? 'Saving...' : 'Cash Out'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;