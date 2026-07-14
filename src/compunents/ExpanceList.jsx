import { useEffect, useState } from "react"
import { collection, onSnapshot, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";

const catEmoji = { Food: '🍔', Transport: '🚗', Shopping: '🛍️', Bills: '📄', Entertainment: '🎬', Other: '📦' };
const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other'];

const ExpanceList = ({ transaction, setTransaction, userId }) => {
  const [filteredCat, setFilteredCat] = useState('all');
  const [filteredDate, setFilteredDate] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [loading, setLoading] = useState(true);

  /* ── Realtime Firestore ── */
  useEffect(() => {
    if (!userId) return;
    const q = query(collection(db, 'users', userId, 'transactions'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snap => {
      setTransaction(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, err => {
      console.error(err);
      setLoading(false);
    });
    return () => unsub();
  }, [userId]);

  /* ── Delete ── */
  const deleteExpance = async (id, name) => {
    const res = await Swal.fire({
      title: `Delete "${name}"?`,
      text: 'This transaction will be permanently removed.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel'
    });
    if (res.isConfirmed) {
      try {
        await deleteDoc(doc(db, 'users', userId, 'transactions', id));
        Swal.fire({ icon: 'success', title: 'Deleted Successfully!', timer: 1000, showConfirmButton: false });
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'Failed', text: 'Could not delete transaction. Please try again.' });
      }
    }
  };

  /* ── Edit ── */
  const editExpance = async (item) => {
    const { value } = await Swal.fire({
      title: 'Edit Transaction',
      html: `
        <style>
          .swal-inp {
            width: 80%;
            padding: 10px 14px;
            margin: 8px 0;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            font-size: 14px;
            outline: none;
          }
          .swal-inp:focus {
            border-color: #6366f1;
          }
        </style>
        <input id="s-name" class="swal-inp" placeholder="Name" value="${item.name}">
        <input id="s-amount" class="swal-inp" type="number" placeholder="Amount" value="${item.amount}">
        <input id="s-date" class="swal-inp" type="date" value="${item.date}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: '#6366f1',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Save Changes',
      preConfirm: () => ({
        name: document.getElementById('s-name').value,
        amount: +document.getElementById('s-amount').value,
        date: document.getElementById('s-date').value,
      })
    });
    if (value?.name && value?.amount) {
      try {
        await updateDoc(doc(db, 'users', userId, 'transactions', item.id), value);
        Swal.fire({ icon: 'success', title: 'Updated Successfully!', timer: 1000, showConfirmButton: false });
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'Failed', text: 'Could not update transaction. Please try again.' });
      }
    }
  };

  /* ── Filter & Sort Logic ── */
  let list = transaction.filter(item => {
    const catOk = filteredCat === 'all' || item.category === filteredCat;
    const dateOk = filteredDate === '' || item.date === filteredDate;
    return catOk && dateOk;
  });
  if (sortBy === 'amount') list = [...list].sort((a, b) => b.amount - a.amount);
  if (sortBy === 'date') list = [...list].sort((a, b) => new Date(b.date) - new Date(a.date));

  const uniqueDates = [...new Set(transaction.map(t => t.date))].sort().reverse();
  const totalIn = list.filter(t => t.type === 'in').reduce((s, t) => s + t.amount, 0);
  const totalOut = list.filter(t => t.type === 'out').reduce((s, t) => s + t.amount, 0);

  if (loading) {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '28px',
        textAlign: 'center',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          width: '32px', height: '32px', margin: '0 auto 12px',
          border: '3px solid #e2e8f0', borderTop: '3px solid #6366f1',
          borderRadius: '50%', animation: 'spin 0.8s linear infinite'
        }} />
        <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Loading transactions...</p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '16px',
      padding: '28px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>📋</span>
          <h3 style={{ color: '#0f172a', fontSize: '18px', fontWeight: '700', margin: 0 }}>
            History ({list.length})
          </h3>
        </div>
        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
          Realtime synced
        </span>
      </div>

      {/* Filters Area */}
      <div style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <div>
            <label className="form-label" style={{ fontSize: '11px', color: '#64748b' }}>Filter Category</label>
            <select
              className="inp"
              value={filteredCat}
              onChange={e => setFilteredCat(e.target.value)}
              style={{ padding: '8px 12px', fontSize: '13px', backgroundColor: '#ffffff' }}
            >
              <option value="all">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{catEmoji[c]} {c}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label" style={{ fontSize: '11px', color: '#64748b' }}>Filter Date</label>
            <select
              className="inp"
              value={filteredDate}
              onChange={e => setFilteredDate(e.target.value)}
              style={{ padding: '8px 12px', fontSize: '13px', backgroundColor: '#ffffff' }}
            >
              <option value="">All Dates</option>
              {uniqueDates.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '600' }}>Sort by:</span>
          {[['date', 'Date'], ['amount', 'Amount']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setSortBy(val)}
              style={{
                padding: '6px 12px',
                border: '1px solid',
                borderColor: sortBy === val ? '#6366f1' : '#cbd5e1',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: sortBy === val ? '#eef2ff' : '#ffffff',
                color: sortBy === val ? '#6366f1' : '#475569',
                fontSize: '12px',
                fontWeight: '600',
                fontFamily: "'Inter', sans-serif",
                transition: 'all 0.2s'
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Mini Summary Strip */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '20px',
        fontSize: '13px',
        fontWeight: '700'
      }}>
        <div style={{ color: '#069669', backgroundColor: '#d1fae5', border: '1px solid #a7f3d0', padding: '8px 12px', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
          Inflow: Rs.{totalIn.toLocaleString()}
        </div>
        <div style={{ color: '#b91c1c', backgroundColor: '#fee2e2', border: '1px solid #fecaca', padding: '8px 12px', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
          Outflow: Rs.{totalOut.toLocaleString()}
        </div>
      </div>

      {/* Transaction List */}
      {list.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
          <p style={{ fontSize: '36px', margin: '0 0 8px 0' }}>📂</p>
          <p style={{ fontSize: '14px', margin: 0, fontWeight: '500' }}>No transactions match the filter.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
          {list.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Left detail */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                <span style={{
                  fontSize: '18px',
                  backgroundColor: '#f1f5f9',
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {catEmoji[item.category] || '📦'}
                </span>
                <div style={{ minWidth: 0 }}>
                  <p style={{ color: '#0f172a', fontWeight: '600', fontSize: '14px', margin: '0 0 2px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.name}
                  </p>
                  <p style={{ color: '#64748b', fontSize: '11px', margin: 0 }}>
                    {item.category} • {item.date}
                  </p>
                </div>
              </div>

              {/* Right action & amount */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                <span style={{
                  color: item.type === 'in' ? '#0f766e' : '#be123c',
                  fontWeight: '700',
                  fontSize: '15px'
                }}>
                  {item.type === 'in' ? '+' : '-'}Rs.{item.amount}
                </span>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => editExpance(item)}
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      color: '#475569',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => e.target.style.backgroundColor = '#f1f5f9'}
                    onMouseLeave={e => e.target.style.backgroundColor = '#ffffff'}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteExpance(item.id, item.name)}
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #fecaca',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      color: '#ef4444',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.target.style.backgroundColor = '#fee2e2'; e.target.style.borderColor = '#fca5a5'; }}
                    onMouseLeave={e => { e.target.style.backgroundColor = '#ffffff'; e.target.style.borderColor = '#fecaca'; }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpanceList;