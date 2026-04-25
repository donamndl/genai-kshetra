import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { to: '/',            emoji: '🏠', label: 'Home',        color: '#3b9eff' },
  { to: '/agriculture', emoji: '🌾', label: 'Agriculture', color: '#2dd4a0' },
  { to: '/education',   emoji: '📚', label: 'Education',   color: '#9d7ff4' },
  { to: '/medical',     emoji: '🏥', label: 'Medical',     color: '#f06292' },
];

// Pull chat history from localStorage for each module
function useChatHistories(user) {
  const [histories, setHistories] = useState({});

  useEffect(() => {
    const modules = ['general', 'agriculture', 'education', 'medical'];
    const result = {};
    modules.forEach(mod => {
      const key = user ? `ls-history-${user.email}-${mod}` : null;
      if (!key) return;
      try {
        const msgs = JSON.parse(localStorage.getItem(key) || '[]');
        // Get last user message as preview
        const lastUser = [...msgs].reverse().find(m => m.role === 'user');
        if (lastUser) result[mod] = { preview: lastUser.text, count: msgs.length };
      } catch {}
    });
    setHistories(result);
  }, [user]);

  return histories;
}

export default function Sidebar({ onAuthClick }) {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const histories = useChatHistories(user);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname === path;

  const SIDEBAR_W = collapsed ? '64px' : '240px';

  const moduleLabels = {
    general: { emoji: '💬', label: 'General', color: '#3b9eff' },
    agriculture: { emoji: '🌾', label: 'Agriculture', color: '#2dd4a0' },
    education: { emoji: '📚', label: 'Education', color: '#9d7ff4' },
    medical: { emoji: '🏥', label: 'Medical', color: '#f06292' },
  };

  const historyEntries = Object.entries(histories);

  return (
    <>
      {/* ── Mobile top bar ── */}
      <div style={{
        display: 'none', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
        height: '52px', background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
        alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem',
      }} className="mobile-topbar">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem' }}>🌿</span>
          <span style={{
            fontWeight: 700, fontSize: '1.1rem',
            background: 'linear-gradient(135deg, #3b9eff, #9d7ff4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Kshetra</span>
        </Link>
        <button onClick={() => setMobileOpen(o => !o)} style={{
          width: '36px', height: '36px', borderRadius: '8px',
          border: '1px solid var(--border)', background: 'var(--bg3)',
          cursor: 'pointer', fontSize: '1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{mobileOpen ? '✕' : '☰'}</button>
      </div>

      {/* ── Sidebar ── */}
      <aside style={{
        position: 'fixed', top: 0, left: 0, bottom: 0,
        width: SIDEBAR_W,
        background: 'var(--bg2)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        zIndex: 100,
        transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
      }} className="sidebar">

        {/* ── Top: logo + collapse ── */}
        <div style={{
          height: '56px', flexShrink: 0,
          display: 'flex', alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: collapsed ? '0' : '0 0.75rem 0 1rem',
          borderBottom: '1px solid var(--border)',
        }}>
          {!collapsed && (
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #3b9eff22, #9d7ff422)',
                border: '1px solid rgba(59,158,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem',
              }}>🌿</div>
              <span style={{
                fontWeight: 700, fontSize: '1.05rem', letterSpacing: '-0.3px',
                background: 'linear-gradient(135deg, #3b9eff, #9d7ff4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Kshetra</span>
            </Link>
          )}
          <button onClick={() => setCollapsed(c => !c)} title={collapsed ? 'Expand' : 'Collapse'} style={{
            width: '28px', height: '28px', borderRadius: '6px',
            border: '1px solid var(--border)', background: 'transparent',
            color: 'var(--muted)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem',
            flexShrink: 0,
            transition: 'background 0.15s, color 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.color = 'var(--text)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted)'; }}
          >
            {collapsed ? '›' : '‹'}
          </button>
        </div>

        {/* ── Nav links ── */}
        <div style={{ padding: '0.6rem 0.5rem', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          {NAV_LINKS.map(link => {
            const active = isActive(link.to);
            return (
              <Link key={link.to} to={link.to} title={collapsed ? link.label : ''} style={{
                display: 'flex', alignItems: 'center',
                gap: collapsed ? '0' : '0.65rem',
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: collapsed ? '0.6rem' : '0.6rem 0.75rem',
                borderRadius: '10px',
                color: active ? link.color : 'var(--text2)',
                background: active ? `${link.color}12` : 'transparent',
                border: `1px solid ${active ? `${link.color}25` : 'transparent'}`,
                fontSize: '0.875rem', fontWeight: active ? 600 : 400,
                marginBottom: '2px',
                transition: 'all 0.15s',
                textDecoration: 'none',
                overflow: 'hidden',
              }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.color = link.color; }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text2)'; }}}
              >
                <span style={{ fontSize: '1rem', flexShrink: 0 }}>{link.emoji}</span>
                {!collapsed && <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{link.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* ── History ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
          {!collapsed && (
            <>
              <p style={{
                fontSize: '0.68rem', color: 'var(--muted)',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                padding: '0.5rem 0.75rem 0.35rem',
              }}>
                {user ? 'Recent chats' : 'History'}
              </p>

              {!user ? (
                <div style={{
                  padding: '1rem 0.75rem', borderRadius: '10px',
                  background: 'var(--bg3)', border: '1px solid var(--border)',
                  margin: '0.25rem 0',
                }}>
                  <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                    Sign in to see your chat history across all modules.
                  </p>
                  <button onClick={onAuthClick} style={{
                    width: '100%', padding: '0.55rem',
                    borderRadius: '8px', border: 'none',
                    background: 'linear-gradient(135deg, #3b9eff, #6366f1)',
                    color: '#fff', fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer',
                  }}>Sign in</button>
                </div>
              ) : historyEntries.length === 0 ? (
                <div style={{ padding: '0.75rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                    No chats yet. Start a conversation!
                  </p>
                </div>
              ) : (
                historyEntries.map(([mod, data]) => {
                  const m = moduleLabels[mod];
                  const navTo = mod === 'general' ? '/' : `/${mod}`;
                  return (
                    <button key={mod} onClick={() => navigate(navTo)} style={{
                      width: '100%', textAlign: 'left',
                      padding: '0.6rem 0.75rem', borderRadius: '10px',
                      border: '1px solid transparent',
                      background: 'transparent',
                      cursor: 'pointer', marginBottom: '2px',
                      transition: 'all 0.15s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontSize: '0.78rem' }}>{m.emoji}</span>
                        <span style={{ fontSize: '0.73rem', fontWeight: 600, color: m.color }}>{m.label}</span>
                        <span style={{
                          marginLeft: 'auto', fontSize: '0.65rem',
                          background: `${m.color}18`, color: m.color,
                          padding: '0.1rem 0.4rem', borderRadius: '999px',
                        }}>{data.count}</span>
                      </div>
                      <p style={{
                        margin: 0, fontSize: '0.77rem', color: 'var(--muted)',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>{data.preview}</p>
                    </button>
                  );
                })
              )}
            </>
          )}

          {/* Collapsed: show history dots */}
          {collapsed && user && historyEntries.map(([mod]) => {
            const m = moduleLabels[mod];
            const navTo = mod === 'general' ? '/' : `/${mod}`;
            return (
              <button key={mod} onClick={() => navigate(navTo)} title={m.label} style={{
                width: '100%', padding: '0.6rem 0',
                display: 'flex', justifyContent: 'center',
                border: 'none', background: 'transparent', cursor: 'pointer',
                fontSize: '1rem', borderRadius: '8px',
                transition: 'background 0.15s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >{m.emoji}</button>
            );
          })}
        </div>

        {/* ── Bottom: theme + profile ── */}
        <div style={{
          padding: '0.5rem',
          borderTop: '1px solid var(--border)',
          flexShrink: 0,
          display: 'flex', flexDirection: 'column', gap: '2px',
        }}>
          {/* Theme toggle */}
          <button onClick={toggle} title="Toggle theme" style={{
            display: 'flex', alignItems: 'center',
            gap: collapsed ? '0' : '0.65rem',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '0.6rem' : '0.6rem 0.75rem',
            borderRadius: '10px', border: 'none',
            background: 'transparent', color: 'var(--text2)',
            fontSize: '0.875rem', cursor: 'pointer',
            transition: 'background 0.15s',
            width: '100%',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>{theme === 'dark' ? '🌙' : '☀️'}</span>
            {!collapsed && <span style={{ whiteSpace: 'nowrap' }}>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>}
          </button>

          {/* Profile / Sign in */}
          {user ? (
            <button onClick={() => setProfileOpen(true)} title={collapsed ? user.name : ''} style={{
              display: 'flex', alignItems: 'center',
              gap: collapsed ? '0' : '0.65rem',
              justifyContent: collapsed ? 'center' : 'flex-start',
              padding: collapsed ? '0.5rem' : '0.5rem 0.75rem',
              borderRadius: '10px', border: '1px solid transparent',
              background: 'transparent', color: 'var(--text)',
              fontSize: '0.875rem', cursor: 'pointer',
              transition: 'all 0.15s', width: '100%',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
            >
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent), var(--purple))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.8rem', color: '#fff', flexShrink: 0,
              }}>{user.name[0].toUpperCase()}</div>
              {!collapsed && (
                <div style={{ textAlign: 'left', overflow: 'hidden' }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '0.82rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</p>
                  <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email || user.mobile || ''}</p>
                </div>
              )}
            </button>
          ) : (
            <button onClick={onAuthClick} title={collapsed ? 'Sign in' : ''} style={{
              display: 'flex', alignItems: 'center',
              gap: collapsed ? '0' : '0.65rem',
              justifyContent: collapsed ? 'center' : 'flex-start',
              padding: collapsed ? '0.6rem' : '0.6rem 0.75rem',
              borderRadius: '10px', border: 'none',
              background: 'linear-gradient(135deg, #3b9eff, #6366f1)',
              color: '#fff', fontSize: '0.875rem', fontWeight: 600,
              cursor: 'pointer', width: '100%',
            }}>
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>👤</span>
              {!collapsed && <span>Sign in</span>}
            </button>
          )}
        </div>
      </aside>

      {/* ── Profile modal ── */}
      {profileOpen && user && (
        <div onClick={() => setProfileOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 400,
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            width: '360px', maxWidth: '90vw',
            background: 'var(--card)', borderRadius: '20px',
            border: '1px solid var(--border)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
            padding: '1.75rem',
            animation: 'fadeUp 0.25s ease',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>My Profile</h2>
              <button onClick={() => setProfileOpen(false)} style={{
                width: '30px', height: '30px', borderRadius: '8px',
                border: '1px solid var(--border)', background: 'var(--bg3)',
                color: 'var(--muted)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem',
              }}>✕</button>
            </div>

            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent), var(--purple))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '1.3rem', color: '#fff', flexShrink: 0,
              }}>{user.name[0].toUpperCase()}</div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '1rem', margin: 0 }}>{user.name}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: '0.2rem 0 0' }}>
                  {user.email || user.mobile || 'No contact info'}
                </p>
              </div>
            </div>

            {/* Info rows */}
            {[
              { icon: '✉️', label: 'Email', val: user.email || 'Not provided' },
              { icon: '📱', label: 'Mobile', val: user.mobile || 'Not provided' },
            ].map(item => (
              <div key={item.label} style={{
                padding: '0.75rem 1rem', borderRadius: '10px',
                background: 'var(--bg3)', border: '1px solid var(--border)',
                marginBottom: '0.6rem',
              }}>
                <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--muted)' }}>{item.icon} {item.label}</p>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.88rem', color: 'var(--text)', wordBreak: 'break-all' }}>{item.val}</p>
              </div>
            ))}

            <button onClick={() => { logout(); setProfileOpen(false); window.location.reload(); }} style={{
              marginTop: '0.75rem', width: '100%', padding: '0.8rem',
              border: 'none', borderRadius: '12px',
              background: 'linear-gradient(135deg, #ef4444, #f97316)',
              color: '#fff', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(239,68,68,0.2)',
            }}>Sign out</button>
          </div>
        </div>
      )}

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 290,
          background: 'rgba(0,0,0,0.5)',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            width: '240px', height: '100%',
            background: 'var(--bg2)', borderRight: '1px solid var(--border)',
            padding: '1rem 0.75rem',
            display: 'flex', flexDirection: 'column', gap: '0.25rem',
            paddingTop: '4.5rem',
          }}>
            {NAV_LINKS.map(link => (
              <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} style={{
                display: 'flex', alignItems: 'center', gap: '0.65rem',
                padding: '0.7rem 0.85rem', borderRadius: '10px',
                color: isActive(link.to) ? link.color : 'var(--text)',
                background: isActive(link.to) ? `${link.color}12` : 'transparent',
                fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none',
              }}>{link.emoji} {link.label}</Link>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .sidebar { display: none !important; }
          .mobile-topbar { display: flex !important; }
        }
      `}</style>
    </>
  );
}