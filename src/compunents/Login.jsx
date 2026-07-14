import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import Swal from 'sweetalert2';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please enter both email and password.',
        confirmButtonColor: '#6366f1'
      });
      return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        await signOut(auth);
        
        Swal.fire({
          icon: 'success',
          title: 'Account Created!',
          text: 'Please sign in using your registered credentials.',
          confirmButtonColor: '#6366f1'
        });
        
        setPassword('');
        setIsLogin(true);
      }
    } catch (err) {
      const msgs = {
        'auth/user-not-found': 'Email is not registered.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/email-already-in-use': 'This email is already in use.',
        'auth/weak-password': 'Password should be at least 6 characters.',
        'auth/invalid-email': 'Please enter a valid email address.',
        'auth/invalid-credential': 'Invalid email or password.',
      };
      Swal.fire({
        icon: 'error',
        title: 'Authentication Failed',
        text: msgs[err.code] || 'Something went wrong. Please try again.',
        confirmButtonColor: '#6366f1'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '40px 32px',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.02)'
      }}>
        {/* Logo/Icon */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '12px',
            backgroundColor: '#e0e7ff',
            color: '#6366f1',
            marginBottom: '16px'
          }}>
            {/* Wallet SVG Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M12 11h.01" />
              <path d="M16 8h-4a2 2 0 0 0 0 4h4" />
            </svg>
          </div>
          <h1 style={{ color: '#0f172a', fontSize: '24px', fontWeight: '800', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
            Expense Manager
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            Track your income and expenses in one place
          </p>
        </div>

        {/* Tab Selection */}
        <div style={{
          display: 'flex',
          backgroundColor: '#f1f5f9',
          borderRadius: '8px',
          padding: '4px',
          marginBottom: '28px'
        }}>
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            style={{
              flex: 1,
              padding: '10px 0',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              backgroundColor: isLogin ? '#ffffff' : 'transparent',
              color: isLogin ? '#6366f1' : '#475569',
              boxShadow: isLogin ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            style={{
              flex: 1,
              padding: '10px 0',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              backgroundColor: !isLogin ? '#ffffff' : 'transparent',
              color: !isLogin ? '#6366f1' : '#475569',
              boxShadow: !isLogin ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label className="form-label">Email Address</label>
            <input
              className="inp"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                className="inp"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ paddingRight: '44px' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#64748b',
                  padding: 0
                }}
              >
                {showPass ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#6366f1',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '15px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '8px'
            }}
            onMouseEnter={e => { if (!loading) e.target.style.backgroundColor = '#4f46e5'; }}
            onMouseLeave={e => { e.target.style.backgroundColor = '#6366f1'; }}
          >
            {loading && (
              <span style={{
                width: '16px',
                height: '16px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTop: '2px solid #ffffff',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite'
              }} />
            )}
            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span
              onClick={() => setIsLogin(!isLogin)}
              style={{ color: '#6366f1', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}
            >
              {isLogin ? 'Register' : 'Sign In'}
            </span>
          </p>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login;
