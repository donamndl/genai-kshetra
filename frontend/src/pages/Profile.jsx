import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user, token, getProfile, updateProfile } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', mobile: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const load = async () => {
      setLoading(true);
      const response = await getProfile();
      setLoading(false);
      if (response.error) {
        setError(response.error);
        return;
      }
      setForm({
        name: response.user.name || '',
        email: response.user.email || '',
        mobile: response.user.mobile || '',
      });
    };

    load();
  }, [token, navigate, getProfile]);

  const handleSave = async () => {
    setError('');
    setMessage('');
    if (!form.name) {
      setError('Name is required.');
      return;
    }

    setLoading(true);
    const response = await updateProfile(form.name, form.email || undefined, form.mobile || undefined);
    setLoading(false);

    if (response.error) {
      setError(response.error);
      return;
    }

    setMessage('Profile updated successfully.');
  };

  const inputStyle = {
    width: '100%',
    padding: '0.85rem 1rem',
    borderRadius: '14px',
    border: '1px solid var(--border)',
    background: 'var(--bg3)',
    color: 'var(--text)',
    fontSize: '0.95rem',
    outline: 'none',
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '520px', background: 'var(--card)', borderRadius: '24px', border: '1px solid var(--border)', padding: '2rem', boxShadow: 'var(--shadow)' }}>
        <h1 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>My profile</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>Update your account details and keep your profile current.</p>

        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'grid', gap: '0.5rem' }}>
            Full name
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
              style={inputStyle}
              disabled={loading}
            />
          </label>
          <label style={{ display: 'grid', gap: '0.5rem' }}>
            Email address
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
              style={inputStyle}
              disabled={loading}
            />
          </label>
          <label style={{ display: 'grid', gap: '0.5rem' }}>
            Mobile number
            <input
              type="text"
              value={form.mobile}
              onChange={(e) => setForm(f => ({ ...f, mobile: e.target.value }))}
              style={inputStyle}
              disabled={loading}
            />
          </label>
        </div>

        {error && <p style={{ color: '#f87171', marginTop: '1rem' }}>{error}</p>}
        {message && <p style={{ color: 'var(--green)', marginTop: '1rem' }}>{message}</p>}

        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          style={{
            marginTop: '1.5rem',
            width: '100%',
            padding: '0.95rem',
            borderRadius: '14px',
            border: 'none',
            background: loading ? 'var(--border)' : 'linear-gradient(135deg, var(--accent), #6366f1)',
            color: '#fff',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Saving profile...' : 'Save profile'}
        </button>
      </div>
    </div>
  );
}
