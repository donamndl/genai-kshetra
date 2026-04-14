import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onAuthClick }) {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

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
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🌿</span>
        <span style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: '1.3rem',
          color: 'var(--accent)',
          letterSpacing: '-0.5px',
        }}>LokālSāthi</span>
      </Link>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

        {/* Theme toggle */}
        <button onClick={toggle} title="Toggle theme" style={{
          width: '44px', height: '24px',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          background: theme === 'dark' ? '#1e2d45' : '#dbeafe',
          position: 'relative', cursor: 'pointer',
          transition: 'background 0.3s',
        }}>
          <span style={{
            position: 'absolute', top: '3px',
            left: theme === 'dark' ? '3px' : '21px',
            width: '16px', height: '16px',
            borderRadius: '50%',
            background: theme === 'dark' ? '#4f9cf9' : '#f59e0b',
            transition: 'left 0.3s',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '9px',
          }}>{theme === 'dark' ? '🌙' : '☀️'}</span>
        </button>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), var(--purple))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '0.85rem', color: '#fff',
            }}>{user.name[0].toUpperCase()}</div>
            <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{user.name}</span>
            <button onClick={logout} style={{
              padding: '0.35rem 0.9rem', borderRadius: '8px',
              border: '1px solid var(--border)', background: 'transparent',
              color: 'var(--muted)', fontSize: '0.8rem',
            }}>Sign out</button>
          </div>
        ) : (
          <button onClick={onAuthClick} style={{
            padding: '0.4rem 1.2rem', borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(135deg, var(--accent), #6366f1)',
            color: '#fff', fontWeight: 600, fontSize: '0.85rem',
          }}>Sign in</button>
        )}
      </div>
    </nav>
  );
}