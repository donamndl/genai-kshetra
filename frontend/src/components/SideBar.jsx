import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const MODULES = [
  { to: '/agriculture', emoji: '🌾', label: 'Agriculture', color: '#2dd4a0', key: 'agriculture' },
  { to: '/education',   emoji: '📚', label: 'Education',   color: '#9d7ff4', key: 'education'   },
  { to: '/medical',     emoji: '🏥', label: 'Medical',     color: '#f06292', key: 'medical'     },
];

const HISTORY_KEYS = [
  { key: 'general',     to: '/',            emoji: '💬' },
  { key: 'agriculture', to: '/agriculture', emoji: '🌾' },
  { key: 'education',   to: '/education',   emoji: '📚' },
  { key: 'medical',     to: '/medical',     emoji: '🏥' },
];

function getLocalHistory(email) {
  const sessions = [];
  for (const { key, to, emoji } of HISTORY_KEYS) {
    try {
      const stored = localStorage.getItem(`ls-history-${email}-${key}`);
      if (!stored) continue;
      const msgs = JSON.parse(stored);
      if (!msgs.length) continue;
      const firstUser = msgs.find(m => m.role === 'user');
      if (firstUser) {
        sessions.push({
          key, to, emoji,
          label: firstUser.text.length > 36 ? firstUser.text.slice(0, 36) + '…' : firstUser.text,
          ts: firstUser.ts || 0,
          count: msgs.filter(m => m.role === 'user').length,
        });
      }
    } catch {}
  }
  return sessions.sort((a, b) => b.ts - a.ts);
}

export default function Sidebar({ onAuthClick, collapsed, setCollapsed }) {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [history, setHistory] = useState([]);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    if (user?.email) setHistory(getLocalHistory(user.email));
    else setHistory([]);
  }, [user, location.pathname]);

  const W = collapsed ? 60 : 256;

  return (
    <>
      <aside style={{
        width: `${W}px`,
        minWidth: `${W}px`,
        height: '100vh',
        position: 'sticky',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg2)',
        borderRight: '1px solid var(--border)',
        transition: 'width 0.22s cubic-bezier(0.4,0,0.2,1), min-width 0.22s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
        zIndex: 100,
        flexShrink: 0,
      }}>

        {/* ── Logo + collapse toggle ── */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: '0 0.75rem',
          height: '56px',
          borderBottom: '1px solid var(--border)',
          gap: '0.5rem',
          flexShrink: 0,
        }}>
          {!collapsed && (
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', minWidth: 0 }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                background: 'linear-gradient(135deg, #3b9eff22, #6366f122)',
                border: '1px solid rgba(59,158,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem',
              }}>🌿</div>
              <span style={{
                fontFamily: "'Sora', sans-serif", fontSize: '1.05rem', fontWeight: 700,
                background: 'linear-gradient(135deg, #3b9eff, #9d7ff4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                letterSpacing: '-0.3px', whiteSpace: 'nowrap',
              }}>Kshetra</span>
            </Link>
          )}
          {collapsed && (
            <Link to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #3b9eff22, #6366f122)',
                border: '1px solid rgba(59,158,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.95rem',
              }}>🌿</div>
            </Link>
          )}
          <button onClick={() => setCollapsed(c => !c)} style={{
            width: '26px', height: '26px', borderRadius: '6px', flexShrink: 0,
            border: '1px solid var(--border)', background: 'transparent',
            color: 'var(--muted)', cursor: 'pointer', fontSize: '0.7rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; }}
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? '▶' : '◀'}
          </button>
        </div>

        {/* ── New Chat ── */}
        <div style={{ padding: '0.6rem 0.6rem 0.3rem', flexShrink: 0 }}>
          <button onClick={() => navigate('/')} style={{
            width: '100%',
            padding: collapsed ? '0.55rem 0' : '0.55rem 0.7rem',
            borderRadius: '9px', border: '1px solid var(--border)',
            background: 'var(--bg3)', color: 'var(--text2)',
            fontSize: '0.81rem', fontWeight: 500, cursor: 'pointer',
            display: 'flex', alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: '0.5rem', transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'rgba(59,158,255,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.background = 'var(--bg3)'; }}
            title="New chat"
          >
            <span style={{ fontSize: '0.9rem' }}>✏️</span>
            {!collapsed && <span>New Chat</span>}
          </button>
        </div>

        {/* ── Modules nav ── */}
        <div style={{ padding: '0 0.6rem', flexShrink: 0 }}>
          {!collapsed && (
            <p style={{ fontSize: '0.63rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0.6rem 0.4rem 0.3rem' }}>
              Modules
            </p>
          )}
          {collapsed && <div style={{ height: '0.5rem' }} />}
          {MODULES.map(m => {
            const active = isActive(m.to);
            return (
              <Link key={m.to} to={m.to} style={{
                display: 'flex', alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                gap: '0.6rem',
                padding: collapsed ? '0.55rem 0' : '0.5rem 0.7rem',
                borderRadius: '8px', textDecoration: 'none',
                color: active ? m.color : 'var(--text2)',
                background: active ? `${m.color}12` : 'transparent',
                border: `1px solid ${active ? `${m.color}22` : 'transparent'}`,
                fontSize: '0.82rem', fontWeight: active ? 600 : 400,
                transition: 'all 0.14s', marginBottom: '2px',
              }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.color = 'var(--text)'; }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text2)'; }}}
                title={collapsed ? m.label : undefined}
              >
                <span style={{ fontSize: '0.95rem', flexShrink: 0 }}>{m.emoji}</span>
                {!collapsed && <span style={{ whiteSpace: 'nowrap' }}>{m.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* ── Divider ── */}
        <div style={{ height: '1px', background: 'var(--border)', margin: '0.5rem 0.75rem', flexShrink: 0 }} />

        {/* ── Chat History (scrollable) ── */}
        {!collapsed ? (
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 0.6rem', minHeight: 0 }}>
            <p style={{ fontSize: '0.63rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0.1rem 0.4rem 0.4rem' }}>
              History
            </p>

            {!user ? (
              <div style={{
                padding: '0.9rem 0.75rem', borderRadius: '10px',
                background: 'var(--bg3)', border: '1px solid var(--border)',
                textAlign: 'center',
              }}>
                <p style={{ fontSize: '0.74rem', color: 'var(--muted)', lineHeight: 1.55, marginBottom: '0.7rem' }}>
                  Sign in to save and view your chat history
                </p>
                <button onClick={onAuthClick} style={{
                  padding: '0.4rem 0.9rem', borderRadius: '7px', border: 'none',
                  background: 'linear-gradient(135deg, var(--accent), #6366f1)',
                  color: '#fff', fontSize: '0.73rem', fontWeight: 600, cursor: 'pointer',
                }}>Sign in</button>
              </div>
            ) : history.length === 0 ? (
              <p style={{ fontSize: '0.75rem', color: 'var(--muted)', padding: '0.1rem 0.4rem', lineHeight: 1.6 }}>
                Your conversations will appear here.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                {history.map(h => (
                  <Link key={h.key} to={h.to} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.5rem 0.6rem', borderRadius: '7px',
                    textDecoration: 'none', color: isActive(h.to) ? 'var(--text)' : 'var(--text2)',
                    background: isActive(h.to) ? 'var(--bg3)' : 'transparent',
                    border: `1px solid ${isActive(h.to) ? 'var(--border)' : 'transparent'}`,
                    transition: 'all 0.12s', fontSize: '0.78rem',
                  }}
                    onMouseEnter={e => { if (!isActive(h.to)) { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.color = 'var(--text)'; }}}
                    onMouseLeave={e => { if (!isActive(h.to)) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text2)'; }}}
                  >
                    <span style={{ fontSize: '0.8rem', flexShrink: 0, opacity: 0.65 }}>{h.emoji}</span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{h.label}</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--muted)', flexShrink: 0, background: 'var(--bg3)', padding: '0.1rem 0.35rem', borderRadius: '4px', border: '1px solid var(--border)' }}>
                      {h.count}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ flex: 1 }} />
        )}

        {/* ── Bottom controls ── */}
        <div style={{
          borderTop: '1px solid var(--border)',
          padding: '0.6rem',
          display: 'flex', flexDirection: 'column', gap: '2px',
          flexShrink: 0,
        }}>
          {/* Theme toggle */}
          <button onClick={toggle} style={{
            width: '100%', padding: collapsed ? '0.55rem 0' : '0.5rem 0.7rem',
            borderRadius: '8px', border: '1px solid transparent',
            background: 'transparent', color: 'var(--text2)',
            fontSize: '0.81rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            gap: '0.6rem', transition: 'all 0.14s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text2)'; }}
            title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          >
            <span style={{ fontSize: '0.95rem', flexShrink: 0 }}>{theme === 'dark' ? '🌙' : '☀️'}</span>
            {!collapsed && <span>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>}
          </button>

          {/* Profile / Sign in */}
          {user ? (
            <button onClick={() => setProfileOpen(true)} style={{
              width: '100%', padding: collapsed ? '0.55rem 0' : '0.5rem 0.7rem',
              borderRadius: '8px', border: '1px solid transparent',
              background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: '0.65rem', transition: 'all 0.14s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
              title={user.name}
            >
              <div style={{
                width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, var(--accent), var(--purple))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.7rem', color: '#fff',
              }}>{user.name[0].toUpperCase()}</div>
              {!collapsed && (
                <div style={{ textAlign: 'left', minWidth: 0, flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.email || user.mobile || 'Logged in'}
                  </div>
                </div>
              )}
            </button>
          ) : (
            <button onClick={onAuthClick} style={{
              width: '100%', padding: collapsed ? '0.55rem 0' : '0.55rem 0.7rem',
              borderRadius: '8px', border: 'none',
              background: 'linear-gradient(135deg, var(--accent), #6366f1)',
              color: '#fff', fontSize: '0.81rem', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: '0.55rem', boxShadow: '0 2px 10px rgba(59,158,255,0.2)',
            }} title="Sign in">
              <span style={{ fontSize: '0.95rem' }}>👤</span>
              {!collapsed && <span>Sign in</span>}
            </button>
          )}
        </div>
      </aside>

      {/* ── Profile popup (slides up from bottom-left) ── */}
      {profileOpen && user && (
        <div onClick={() => setProfileOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 400,
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            position: 'absolute',
            bottom: 0, left: `${W}px`,
            width: '290px',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '16px 16px 0 0',
            boxShadow: '0 -8px 40px rgba(0,0,0,0.25)',
            padding: '1.25rem',
            display: 'flex', flexDirection: 'column', gap: '0.85rem',
            animation: 'slideUp 0.22s cubic-bezier(0.34,1.56,0.64,1)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Your profile</h3>
              <button onClick={() => setProfileOpen(false)} style={{
                width: '26px', height: '26px', borderRadius: '6px',
                border: '1px solid var(--border)', background: 'var(--bg3)',
                color: 'var(--muted)', cursor: 'pointer', fontSize: '0.8rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>✕</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, var(--accent), var(--purple))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '1rem', color: '#fff',
              }}>{user.name[0].toUpperCase()}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user.name}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{user.email || user.mobile}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {[
                { label: 'Email', val: user.email || '—' },
                { label: 'Mobile', val: user.mobile || '—' },
              ].map(item => (
                <div key={item.label} style={{
                  padding: '0.6rem 0.75rem', borderRadius: '9px',
                  background: 'var(--bg3)', border: '1px solid var(--border)',
                }}>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.65rem', marginBottom: '0.15rem' }}>{item.label}</p>
                  <p style={{ margin: 0, color: 'var(--text)', fontSize: '0.8rem', wordBreak: 'break-all' }}>{item.val}</p>
                </div>
              ))}
            </div>

            <button onClick={() => { logout(); setProfileOpen(false); window.location.reload(); }} style={{
              width: '100%', padding: '0.7rem', border: 'none', borderRadius: '9px',
              background: 'linear-gradient(135deg, #ef4444, #f97316)',
              color: '#fff', fontWeight: 700, fontSize: '0.84rem', cursor: 'pointer',
              boxShadow: '0 3px 12px rgba(239,68,68,0.2)',
            }}>Sign out</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}