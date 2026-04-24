import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, signup } = useAuth();

  const handle = async () => {
    setError(''); setSuccess('');
    if (!form.email || !form.password) return setError('Please fill all fields.');
    if (mode === 'signup' && !form.name) return setError('Name is required.');

    const res = mode === 'login'
      ? login(form.email, form.password)
      : signup(form.name, form.email, form.password);

    if (res.error) return setError(res.error);
    setSuccess(mode === 'login' ? 'Welcome back! 👋' : 'Account created! 🎉');
    setTimeout(onClose, 800);
  };

  const inp = {
    width: '100%', padding: '0.75rem 1rem',
    borderRadius: '10px', border: '1px solid var(--border)',
    background: 'var(--bg3)', color: 'var(--text)',
    fontSize: '0.9rem', outline: 'none',
  };

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 500,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--card)', borderRadius: '20px',
        border: '1px solid var(--border)',
        padding: '2.5rem', width: '100%', maxWidth: '420px',
        boxShadow: 'var(--shadow)',
      }}>
        <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.8rem', marginBottom: '0.25rem' }}>
          {mode === 'login' ? 'Welcome back' : 'Join Kshetra'}
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '1.75rem' }}>
          {mode === 'login' ? 'Sign in to save your chat history' : 'Create an account to save your history'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {mode === 'signup' && (
            <input style={inp} placeholder="Full name" value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          )}
          <input style={inp} placeholder="Email address" type="email" value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          <input style={inp} placeholder="Password" type="password" value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && handle()} />
          {mode === 'login' && (
            <p style={{ textAlign: 'right', marginTop: '0.25rem', fontSize: '0.8rem' }}>
              <span onClick={() => alert('Forgot password? Contact support at support@kshetra.ai')}
                style={{ color: 'var(--accent)', cursor: 'pointer', textDecoration: 'underline' }}>
                Forgot password?
              </span>
            </p>
          )}
        </div>

        {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '0.75rem' }}>{error}</p>}
        {success && <p style={{ color: 'var(--green)', fontSize: '0.85rem', marginTop: '0.75rem' }}>{success}</p>}

        <button onClick={handle} style={{
          width: '100%', marginTop: '1.25rem', padding: '0.85rem',
          borderRadius: '12px', border: 'none',
          background: 'linear-gradient(135deg, var(--accent), #6366f1)',
          color: '#fff', fontWeight: 600, fontSize: '1rem',
        }}>
          {mode === 'login' ? 'Sign in' : 'Create account'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <span onClick={() => { setMode(m => m === 'login' ? 'signup' : 'login'); setError(''); }}
            style={{ color: 'var(--accent)', cursor: 'pointer', fontWeight: 600 }}>
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </span>
        </p>

        <p style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--muted)' }}>
          🔒 You can still chat without signing in — history just won't be saved.
        </p>
      </div>
    </div>
  );
}