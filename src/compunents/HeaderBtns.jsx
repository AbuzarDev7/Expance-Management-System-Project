import React from 'react'

const HeaderBtns = ({ cashIn, cashOut, balance }) => {
  const isNeg = balance < 0;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    }}>
      {/* CASH IN CARD */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', backgroundColor: '#10b981' }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Cash Inflow
          </span>
          <span style={{
            backgroundColor: '#d1fae5',
            color: '#069669',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </span>
        </div>
        <h2 style={{ color: '#0f172a', fontSize: '32px', fontWeight: '800', margin: 0, letterSpacing: '-0.03em' }}>
          Rs.{cashIn.toLocaleString()}
        </h2>
        <p style={{ margin: '8px 0 0 0', color: '#10b981', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
          Total income added
        </p>
      </div>

      {/* CASH OUT CARD */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', backgroundColor: '#ef4444' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Cash Outflow
          </span>
          <span style={{
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </span>
        </div>
        <h2 style={{ color: '#0f172a', fontSize: '32px', fontWeight: '800', margin: 0, letterSpacing: '-0.03em' }}>
          Rs.{cashOut.toLocaleString()}
        </h2>
        <p style={{ margin: '8px 0 0 0', color: '#ef4444', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
          Total expenses recorded
        </p>
      </div>

      {/* BALANCE CARD */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', backgroundColor: isNeg ? '#ef4444' : '#6366f1' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Net Balance
          </span>
          <span style={{
            backgroundColor: isNeg ? '#fdf2f8' : '#e0e7ff',
            color: isNeg ? '#db2777' : '#4f46e5',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </span>
        </div>
        <h2 style={{ color: isNeg ? '#ef4444' : '#6366f1', fontSize: '32px', fontWeight: '800', margin: 0, letterSpacing: '-0.03em' }}>
          Rs.{balance.toLocaleString()}
        </h2>
        <p style={{ margin: '8px 0 0 0', color: '#64748b', fontSize: '12px', fontWeight: '500' }}>
          {isNeg ? '⚠️ Net balance is negative' : '✓ Safe spending range'}
        </p>
      </div>
    </div>
  );
}

export default HeaderBtns;