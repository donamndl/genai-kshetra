import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onAuthClick }) {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  const navItemStyle = {
    padding: '0.65rem 1rem',
    borderRadius: '999px',
    color: 'var(--text)',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease',
    border: '1px solid transparent',
    background: 'transparent',
  };

  const popOut = (event) => {
    event.currentTarget.style.transform = 'translateY(-2px)';
    event.currentTarget.style.boxShadow = '0 12px 30px rgba(79,156,249,0.18)';
    event.currentTarget.style.background = 'rgba(79,156,249,0.08)';
    event.currentTarget.style.borderColor = 'rgba(79,156,249,0.22)';
  };

  const resetPopOut = (event) => {
    event.currentTarget.style.transform = 'none';
    event.currentTarget.style.boxShadow = 'none';
    event.currentTarget.style.background = 'transparent';
    event.currentTarget.style.borderColor = 'transparent';
  };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 200,
      background: 'var(--bg2)',
      borderBottom: '1px solid var(--border)',
      padding: '0 2rem',
      height: '64px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      backdropFilter: 'blur(12px)',
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <img src="/logo.jpg" alt="Kshetra logo" style={{ width: '34px', height: '34px', borderRadius: '10px' }} />
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '1.3rem',
          fontWeight: '600',
          color: 'var(--accent)',
          letterSpacing: '-0.5px',
        }}>Kshetra</span>
      </Link>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Link
          to="/#about"
          style={navItemStyle}
          onMouseEnter={popOut}
          onMouseLeave={resetPopOut}
        >
          About
        </Link>
        <Link
          to="/#contact"
          style={navItemStyle}
          onMouseEnter={popOut}
          onMouseLeave={resetPopOut}
        >
          Contact Us
        </Link>
        <button
          onClick={toggle}
          title="Toggle theme"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.55rem 0.95rem',
            borderRadius: '999px',
            border: '1px solid var(--border)',
            background: theme === 'dark' ? 'rgba(79,156,249,0.14)' : 'rgba(253,224,71,0.18)',
            color: theme === 'dark' ? '#dbeafe' : '#b45309',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.95rem',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
          }}
          onMouseEnter={popOut}
          onMouseLeave={resetPopOut}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: theme === 'dark' ? '#1e293b' : '#fef3c7' }}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </span>
          <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </button>

        {user ? (
          <>
            <button
              onClick={() => setProfileOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.55rem 0.95rem',
                borderRadius: '999px',
                border: '1px solid var(--border)',
                background: 'rgba(99,102,241,0.12)',
                color: 'var(--text)',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent), var(--purple))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.95rem', color: '#fff',
              }}>{user.name[0].toUpperCase()}</div>
              <span>{user.name}</span>
            </button>
            <button
              onClick={logout}
              style={{
                padding: '0.65rem 1rem',
                borderRadius: '999px',
                border: '1px solid var(--border)',
                background: 'transparent',
                color: 'var(--text)',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={popOut}
              onMouseLeave={resetPopOut}
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            onClick={onAuthClick}
            style={{
              padding: '0.65rem 1rem',
              borderRadius: '999px',
              border: '1px solid transparent',
              background: 'rgba(99,102,241,0.14)',
              color: '#3f51ff',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={popOut}
            onMouseLeave={resetPopOut}
          >
            Sign in
          </button>
        )}
      </div>

      {profileOpen && user && (
        <div
          onClick={() => setProfileOpen(false)}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.32)',
            zIndex: 250,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '320px',
              maxWidth: '100%',
              height: '100%',
              background: 'var(--card)',
              boxShadow: '-24px 0 80px rgba(0,0,0,0.16)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>Profile</p>
                <h2 style={{ margin: '0.35rem 0 0', fontSize: '1.6rem' }}>{user.name}</h2>
              </div>
              <button
                onClick={() => setProfileOpen(false)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--muted)',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: '1rem', borderRadius: '18px', background: 'var(--bg3)', border: '1px solid var(--border)' }}>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.85rem' }}>Email</p>
              <p style={{ margin: '0.45rem 0 0', color: 'var(--text)' }}>{user.email || 'Not provided'}</p>
            </div>
            <div style={{ padding: '1rem', borderRadius: '18px', background: 'var(--bg3)', border: '1px solid var(--border)' }}>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.85rem' }}>Mobile</p>
              <p style={{ margin: '0.45rem 0 0', color: 'var(--text)' }}>{user.mobile || 'Not provided'}</p>
            </div>
            <button
              onClick={() => { logout(); setProfileOpen(false); window.location.reload(); }}
              style={{
                marginTop: 'auto',
                width: '100%',
                padding: '0.95rem',
                border: 'none',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #ef4444, #f97316)',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}