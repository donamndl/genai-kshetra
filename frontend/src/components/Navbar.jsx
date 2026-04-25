import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { to: '/agriculture', label: '🌾 Agriculture', color: '#2dd4a0' },
  { to: '/education',   label: '📚 Education',   color: '#9d7ff4' },
  { to: '/medical',     label: '🏥 Medical',      color: '#f06292' },
];

export default function Navbar({ onAuthClick }) {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 200,
        background: scrolled
          ? theme === 'dark' ? 'rgba(13,21,37,0.92)' : 'rgba(255,255,255,0.92)'
          : 'var(--bg2)',
        borderBottom: '1px solid var(--border)',
        padding: '0 1.5rem',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backdropFilter: 'blur(16px)',
        transition: 'background 0.3s, border-color 0.3s',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #3b9eff22, #6366f122)',
            border: '1px solid rgba(59,158,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem',
          }}>🌿</div>
          <span style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '1.2rem', fontWeight: 700,
            background: 'linear-gradient(135deg, #3b9eff, #9d7ff4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.3px',
          }}>Kshetra</span>
        </Link>

        {/* Desktop nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', '@media(max-width:768px)': { display: 'none' } }}
          className="desktop-nav">
          {NAV_LINKS.map(link => (
            <Link key={link.to} to={link.to} style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.85rem', fontWeight: 500,
              color: isActive(link.to) ? link.color : 'var(--text2)',
              background: isActive(link.to) ? `${link.color}14` : 'transparent',
              border: `1px solid ${isActive(link.to) ? `${link.color}30` : 'transparent'}`,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { if (!isActive(link.to)) { e.currentTarget.style.color = link.color; e.currentTarget.style.background = `${link.color}10`; }}}
              onMouseLeave={e => { if (!isActive(link.to)) { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.background = 'transparent'; }}}
            >{link.label}</Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Theme toggle */}
          <button onClick={toggle} title="Toggle theme" style={{
            width: '36px', height: '36px', borderRadius: '10px',
            border: '1px solid var(--border)',
            background: 'var(--bg3)',
            cursor: 'pointer', fontSize: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.2s, background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'rotate(15deg)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>

          {user ? (
            <>
              <button onClick={() => setProfileOpen(true)} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.4rem 0.75rem 0.4rem 0.4rem',
                borderRadius: '999px',
                border: '1px solid var(--border)',
                background: 'var(--bg3)',
                color: 'var(--text)',
                fontSize: '0.85rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--card2)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg3)'; }}
              >
                <div style={{
                  width: '26px', height: '26px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent), var(--purple))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.75rem', color: '#fff',
                  flexShrink: 0,
                }}>{user.name[0].toUpperCase()}</div>
                <span style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name.split(' ')[0]}
                </span>
              </button>
              <button onClick={() => { logout(); window.location.reload(); }} style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: 'transparent',
                color: 'var(--muted)',
                fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.borderColor = '#f8717133'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >Sign out</button>
            </>
          ) : (
            <button onClick={onAuthClick} style={{
              padding: '0.5rem 1.1rem',
              borderRadius: '8px', border: 'none',
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              color: '#fff', fontWeight: 600, fontSize: '0.88rem',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(59,158,255,0.25)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(59,158,255,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(59,158,255,0.25)'; }}
            >Sign in</button>
          )}

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(o => !o)} style={{
            display: 'none',
            width: '36px', height: '36px', borderRadius: '8px',
            border: '1px solid var(--border)', background: 'var(--bg3)',
            cursor: 'pointer', fontSize: '1.1rem',
            alignItems: 'center', justifyContent: 'center',
          }} className="hamburger">
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 190,
          background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
          padding: '1rem 1.5rem',
          display: 'flex', flexDirection: 'column', gap: '0.5rem',
          animation: 'fadeUp 0.2s ease',
        }}>
          {NAV_LINKS.map(link => (
            <Link key={link.to} to={link.to} style={{
              padding: '0.75rem 1rem', borderRadius: '10px',
              color: isActive(link.to) ? link.color : 'var(--text)',
              background: isActive(link.to) ? `${link.color}14` : 'var(--bg3)',
              fontSize: '0.95rem', fontWeight: 500,
              border: `1px solid ${isActive(link.to) ? `${link.color}30` : 'var(--border)'}`,
            }}>{link.label}</Link>
          ))}
        </div>
      )}

      {/* Profile sidebar */}
      {profileOpen && user && (
        <div onClick={() => setProfileOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 300,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex', justifyContent: 'flex-end',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            width: '300px', maxWidth: '90vw', height: '100%',
            background: 'var(--card)',
            borderLeft: '1px solid var(--border)',
            boxShadow: '-24px 0 80px rgba(0,0,0,0.3)',
            padding: '1.75rem',
            display: 'flex', flexDirection: 'column', gap: '1rem',
            animation: 'fadeIn 0.25s ease',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Profile</p>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '0.25rem' }}>{user.name}</h2>
              </div>
              <button onClick={() => setProfileOpen(false)} style={{
                width: '30px', height: '30px', borderRadius: '8px',
                border: '1px solid var(--border)', background: 'var(--bg3)',
                color: 'var(--muted)', cursor: 'pointer', fontSize: '0.9rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>✕</button>
            </div>

            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), var(--purple))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '1.4rem', color: '#fff',
            }}>{user.name[0].toUpperCase()}</div>

            {[
              { label: 'Email', val: user.email || 'Not provided', icon: '✉️' },
              { label: 'Mobile', val: user.mobile || 'Not provided', icon: '📱' },
            ].map(item => (
              <div key={item.label} style={{
                padding: '0.9rem 1rem', borderRadius: '12px',
                background: 'var(--bg3)', border: '1px solid var(--border)',
              }}>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.75rem' }}>{item.icon} {item.label}</p>
                <p style={{ margin: '0.3rem 0 0', color: 'var(--text)', fontSize: '0.9rem', wordBreak: 'break-all' }}>{item.val}</p>
              </div>
            ))}

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <button onClick={() => { logout(); setProfileOpen(false); window.location.reload(); }} style={{
                width: '100%', padding: '0.85rem', border: 'none', borderRadius: '12px',
                background: 'linear-gradient(135deg, #ef4444, #f97316)',
                color: '#fff', fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(239,68,68,0.25)',
              }}>Sign out</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}