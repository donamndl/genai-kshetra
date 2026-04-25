import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    name: '',
    identifier: '',
    email: '',
    password: '',
    mobile: '',
    code: '',
    newPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, signup, forgotPassword, resetPassword } = useAuth();

  const handle = async () => {
    setError('');
    setSuccess('');

    if (mode === 'login') {
      if (!form.identifier || !form.password) return setError('Enter your email/mobile and password.');
      setLoading(true);
      const res = await login(form.identifier, form.password);
      setLoading(false);
      if (res?.error) return setError(res.error);
      setSuccess('Welcome back! 👋');
      return setTimeout(() => {
        onClose();
        window.location.reload();
      }, 800);
    }

    if (mode === 'signup') {
      if (!form.name) return setError('Name is required.');
      if (!form.email && !form.mobile) return setError('Provide an email or mobile number.');
      if (!form.password) return setError('Password is required.');
      setLoading(true);
      const res = await signup(form.name, form.email || undefined, form.password, form.mobile || undefined);
      setLoading(false);
      if (res?.error) return setError(res.error);
      setSuccess('Account created! 🎉');
      return setTimeout(() => {
        onClose();
        window.location.reload();
      }, 800);
    }

    if (mode === 'forgot') {
      if (!form.email) return setError('Enter the registered email to receive a reset code.');
      setLoading(true);
      const res = await forgotPassword(form.email);
      setLoading(false);
      if (res?.error) return setError(res.error);
      setSuccess(res.reset_code
        ? `Verification code: ${res.reset_code}`
        : 'Verification code generated.');
      setMode('reset');
      return;
    }

    if (mode === 'reset') {
      if (!form.email || !form.code || !form.newPassword) return setError('Email, code, and new password are required.');
      setLoading(true);
      const res = await resetPassword(form.email, form.code, form.newPassword);
      setLoading(false);
      if (res?.error) return setError(res.error);
      setSuccess('Password reset successfully. You can now sign in.');
      setMode('login');
      return;
    }
  };

  const inp = {
    width: '100%', padding: '0.75rem 1rem',
    borderRadius: '10px', border: '1px solid var(--border)',
    background: 'var(--bg3)', color: 'var(--text)',
    fontSize: '0.9rem', outline: 'none',
  };

  const renderInputs = () => {
    if (mode === 'login') {
      return (
        <>
          <input
            style={inp}
            placeholder="Email or mobile number"
            value={form.identifier}
            onChange={e => setForm(f => ({ ...f, identifier: e.target.value }))}
            disabled={loading}
          />
          <div style={{ position: 'relative' }}>
            <input
              style={{ ...inp, paddingRight: '3.2rem' }}
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && handle()}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              style={{
                position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)',
                border: 'none', background: 'transparent', color: 'var(--muted)', cursor: 'pointer',
                fontSize: '0.95rem', padding: 0,
              }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </>
      );
    }

    if (mode === 'signup') {
      return (
        <>
          <input
            style={inp}
            placeholder="Full name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            disabled={loading}
          />
          <input
            style={inp}
            placeholder="Email address (optional)"
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            disabled={loading}
          />
          <input
            style={inp}
            placeholder="Mobile number (optional)"
            value={form.mobile}
            onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))}
            disabled={loading}
          />
          <div style={{ position: 'relative' }}>
            <input
              style={{ ...inp, paddingRight: '3.2rem' }}
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && handle()}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              style={{
                position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)',
                border: 'none', background: 'transparent', color: 'var(--muted)', cursor: 'pointer',
                fontSize: '0.95rem', padding: 0,
              }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </>
      );
    }

    if (mode === 'forgot') {
      return (
        <input
          style={inp}
          placeholder="Registered email address"
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          onKeyDown={e => e.key === 'Enter' && handle()}
          disabled={loading}
        />
      );
    }

    return (
      <>
        <input
          style={inp}
          placeholder="Registered email address"
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          disabled={loading}
        />
        <input
          style={inp}
          placeholder="Verification code"
          value={form.code}
          onChange={e => setForm(f => ({ ...f, code: e.target.value }))}
          disabled={loading}
        />
        <div style={{ position: 'relative' }}>
          <input
            style={{ ...inp, paddingRight: '3.2rem' }}
            placeholder="New password"
            type={showPassword ? 'text' : 'password'}
            value={form.newPassword}
            onChange={e => setForm(f => ({ ...f, newPassword: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && handle()}
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            style={{
              position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)',
              border: 'none', background: 'transparent', color: 'var(--muted)', cursor: 'pointer',
              fontSize: '0.95rem', padding: 0,
            }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </>
    );
  };

  const title = {
    login: 'Welcome back',
    signup: 'Join Kshetra',
    forgot: 'Reset password',
    reset: 'Enter reset code',
  }[mode];

  const subtitle = {
    login: 'Sign in to save your chat history',
    signup: 'Create an account to save your history',
    forgot: 'Enter your registered email to receive a reset code',
    reset: 'Enter the code and a new password to continue',
  }[mode];

  const buttonText = {
    login: loading ? 'Signing in...' : 'Sign in',
    signup: loading ? 'Creating account...' : 'Create account',
    forgot: loading ? 'Sending code...' : 'Send reset code',
    reset: loading ? 'Resetting password...' : 'Reset password',
  }[mode];

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
          {title}
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '1.75rem' }}>
          {subtitle}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {renderInputs()}
          {mode === 'login' && (
            <p style={{ textAlign: 'right', marginTop: '0.25rem', fontSize: '0.8rem' }}>
              <span
                onClick={() => { setMode('forgot'); setError(''); setSuccess(''); }}
                style={{ color: 'var(--accent)', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Forgot password?
              </span>
            </p>
          )}
        </div>

        {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '0.75rem' }}>{error}</p>}
        {success && <p style={{ color: 'var(--green)', fontSize: '0.85rem', marginTop: '0.75rem' }}>{success}</p>}

        <button type="button" onClick={handle} disabled={loading} style={{
          width: '100%', marginTop: '1.25rem', padding: '0.85rem',
          borderRadius: '12px', border: 'none',
          background: loading ? 'var(--border)' : 'linear-gradient(135deg, var(--accent), #6366f1)',
          color: '#fff', fontWeight: 600, fontSize: '1rem',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}>
          {loading ? 'Working...' : buttonText}
        </button>

        <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
          {mode === 'login' && "Don't have an account? "}
          {mode === 'signup' && 'Already have an account? '}
          {mode === 'forgot' && 'Remembered your password? '}
          {mode === 'reset' && 'Back to sign in? '}
          <span onClick={() => {
            setMode(prev => {
              if (prev === 'login') return 'signup';
              if (prev === 'signup') return 'login';
              return 'login';
            });
            setError('');
            setSuccess('');
          }}
            style={{ color: 'var(--accent)', cursor: 'pointer', fontWeight: 600 }}>
            {mode === 'login' && 'Sign up'}
            {mode === 'signup' && 'Sign in'}
            {mode === 'forgot' && 'Sign in'}
            {mode === 'reset' && 'Sign in'}
          </span>
        </p>

        <p style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--muted)' }}>
          🔒 You can still chat without signing in — history just won't be saved.
        </p>
      </div>
    </div>
  );
}