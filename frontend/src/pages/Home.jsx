import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { askGeneral } from '../api';
import { useAuth } from '../context/AuthContext';

const modules = [
  {
    path: '/agriculture',
    emoji: '🌾',
    title: 'Agriculture',
    desc: 'Crop advice, soil health, weather alerts, pesticide guidance, and government farming schemes — region-aware.',
    color: '#2dd4a0',
    bg: 'linear-gradient(135deg, #064e3b18, #0d2e2218)',
    border: '#2dd4a022',
    glow: 'rgba(45,212,160,0.12)',
  },
  {
    path: '/education',
    emoji: '📚',
    title: 'Education',
    desc: 'Simplify textbook concepts with local examples, find scholarships, understand exam syllabi in simple language.',
    color: '#9d7ff4',
    bg: 'linear-gradient(135deg, #2d1b6918, #1a0d4518)',
    border: '#9d7ff422',
    glow: 'rgba(157,127,244,0.12)',
  },
  {
    path: '/medical',
    emoji: '🏥',
    title: 'Medical',
    desc: 'Health alerts, vaccination reminders, disease outbreak info, and hospital directions for your area.',
    color: '#f06292',
    bg: 'linear-gradient(135deg, #4a0a2418, #2d071618)',
    border: '#f0629222',
    glow: 'rgba(240,98,146,0.12)',
  },
];

const stats = [
  { value: '3', label: 'Expert Modules', icon: '🎯' },
  { value: '10+', label: 'Languages', icon: '🗣️' },
  { value: '24/7', label: 'Available', icon: '⚡' },
  { value: '100%', label: 'Free', icon: '🆓' },
];

export default function Home() {
  const chatRef = useRef(null);
  const modulesRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: '92vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '5rem 1.5rem 4rem',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background orbs */}
        <div style={{
          position: 'absolute', top: '10%', left: '15%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(59,158,255,0.07) 0%, transparent 70%)',
          pointerEvents: 'none', borderRadius: '50%',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '15%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(157,127,244,0.07) 0%, transparent 70%)',
          pointerEvents: 'none', borderRadius: '50%',
          filter: 'blur(40px)',
        }} />

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.4rem 1.1rem', borderRadius: '999px',
          border: '1px solid rgba(59,158,255,0.2)',
          background: 'rgba(59,158,255,0.06)',
          fontSize: '0.78rem', fontWeight: 500, color: 'var(--accent)',
          marginBottom: '2rem', letterSpacing: '0.03em',
          animation: 'fadeUp 0.5s ease forwards',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#2dd4a0',
            boxShadow: '0 0 8px #2dd4a0',
            display: 'inline-block',
          }} />
          GenAI for Localized Knowledge · Built for Bharat
        </div>

        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 'clamp(2.8rem, 7vw, 5rem)',
          lineHeight: 1.08, letterSpacing: '-1.5px',
          marginBottom: '1.5rem', maxWidth: '780px',
          animation: 'fadeUp 0.55s ease 0.1s both',
        }}>
          India's Knowledge,{' '}
          <span style={{
            background: 'linear-gradient(135deg, #3b9eff 20%, #9d7ff4 80%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Reimagined
          </span>{' '}
          Through AI
        </h1>

        <p style={{
          color: 'var(--text2)', fontSize: '1.05rem',
          lineHeight: 1.75, maxWidth: '520px', marginBottom: '2.75rem',
          fontWeight: 400,
          animation: 'fadeUp 0.55s ease 0.2s both',
        }}>
          Kshetra is a bilingual AI assistant for farmers, students, and citizens of India —
          answering questions in Hindi, Odia, Hinglish, and more.
        </p>

        <div style={{
          display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center',
          animation: 'fadeUp 0.55s ease 0.3s both',
        }}>
          <button onClick={() => chatRef.current?.scrollIntoView({ behavior: 'smooth' })} style={{
            padding: '0.85rem 2rem', borderRadius: '12px', border: 'none',
            background: 'linear-gradient(135deg, #3b9eff, #6366f1)',
            color: '#fff', fontWeight: 600, fontSize: '0.95rem',
            boxShadow: '0 8px 28px rgba(59,158,255,0.3)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(59,158,255,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(59,158,255,0.3)'; }}
          >Start chatting →</button>
          <button onClick={() => modulesRef.current?.scrollIntoView({ behavior: 'smooth' })} style={{
            padding: '0.85rem 2rem', borderRadius: '12px',
            border: '1px solid var(--border)',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(8px)',
            color: 'var(--text)', fontWeight: 500, fontSize: '0.95rem',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'rgba(59,158,255,0.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
          >Explore modules</button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '1rem', marginTop: '5rem',
          flexWrap: 'wrap', justifyContent: 'center',
          animation: 'fadeUp 0.55s ease 0.4s both',
        }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              textAlign: 'center',
              padding: '1.25rem 1.75rem',
              borderRadius: '16px',
              background: 'var(--card)',
              border: '1px solid var(--border)',
              minWidth: '110px',
              transition: 'transform 0.2s, border-color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'var(--border2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              <div style={{ fontSize: '1.3rem', marginBottom: '0.25rem' }}>{s.icon}</div>
              <div style={{
                fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent)',
                fontFamily: "'Sora', sans-serif", letterSpacing: '-0.5px',
              }}>{s.value}</div>
              <div style={{ fontSize: '0.73rem', color: 'var(--muted)', marginTop: '0.15rem', letterSpacing: '0.02em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* General Chat Section */}
      <section ref={chatRef} style={{ padding: '2rem 1.5rem 4rem', maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: '0.6rem' }}>
            General Assistant
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2.2rem', marginBottom: '0.6rem' }}>
            Ask anything
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: '0.92rem', maxWidth: '400px', margin: '0 auto' }}>
            Government schemes, local info, civic services — in any language.
          </p>
        </div>

        <div style={{
          background: 'var(--card)', borderRadius: '20px',
          border: '1px solid var(--border)',
          overflow: 'hidden', boxShadow: 'var(--shadow)',
          height: '520px',
        }}>
          <GeneralChatInline />
        </div>
      </section>

      {/* Modules Section */}
      <section ref={modulesRef} style={{ padding: '1rem 1.5rem 2rem', maxWidth: '1040px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)', marginBottom: '0.6rem' }}>
            Specialized AI
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2.2rem', marginBottom: '0.6rem' }}>
            Specialized modules
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: '0.92rem' }}>
            Domain-tuned AI for agriculture, education, and health — region-aware and in your language.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.25rem' }}>
          {modules.map(m => (
            <div key={m.path} onClick={() => navigate(m.path)} style={{
              background: m.bg,
              border: `1px solid ${m.border}`,
              borderRadius: '20px', padding: '2rem',
              cursor: 'pointer',
              transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s',
              position: 'relative', overflow: 'hidden',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 20px 50px ${m.glow}`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Subtle corner gradient */}
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '80px', height: '80px',
                background: `radial-gradient(circle at top right, ${m.color}18, transparent 70%)`,
                pointerEvents: 'none',
              }} />

              <div style={{
                width: '50px', height: '50px', borderRadius: '14px',
                background: `${m.color}18`, border: `1px solid ${m.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', marginBottom: '1.25rem',
              }}>{m.emoji}</div>

              <h3 style={{ color: m.color, fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.6rem', letterSpacing: '-0.2px' }}>
                {m.title}
              </h3>
              <p style={{ color: 'var(--text2)', fontSize: '0.86rem', lineHeight: 1.7 }}>{m.desc}</p>
              <div style={{
                marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem',
                color: m.color, fontSize: '0.82rem', fontWeight: 600,
              }}>
                Open module
                <span style={{ transition: 'transform 0.2s' }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ── Inline general chat ────────────────────────────────────────────────────────
function GeneralChatInline() {
  const { user } = useAuth();
  const storageKey = user ? `ls-history-${user.email}-general` : null;
  const [messages, setMessages] = useState(() => {
    if (!storageKey) return [];
    try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { return []; }
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const suggestions = ['What is PM Kisan Yojana?', 'How to apply for Aadhar card?', 'Ration card eligibility?'];

  const send = async (text) => {
    const q = text || input;
    if (!q.trim() || loading) return;
    const userMsg = { role: 'user', text: q };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const res = await askGeneral(q);
      const aiMsg = { role: 'ai', text: res.data.response };
      const final = [...next, aiMsg];
      setMessages(final);
      if (storageKey) localStorage.setItem(storageKey, JSON.stringify(final));
    } catch {
      setMessages(p => [...p, { role: 'ai', text: '❌ Something went wrong. Please try again.' }]);
    }
    setLoading(false);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Status bar */}
      <div style={{
        padding: '0.6rem 1.25rem', fontSize: '0.75rem',
        color: 'var(--muted)', borderBottom: '1px solid var(--border)',
        background: 'var(--bg2)', display: 'flex', alignItems: 'center', gap: '0.5rem',
      }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: user ? '#2dd4a0' : '#f59e0b', display: 'inline-block', flexShrink: 0 }} />
        {user ? `History saved · ${user.name}` : 'Sign in to save history'}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem', color: 'var(--muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', animation: 'float 3s ease-in-out infinite' }}>💬</div>
            <p style={{ fontSize: '0.88rem', marginBottom: '1.25rem', color: 'var(--text2)' }}>Ask about government schemes, local services, laws...</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {suggestions.map(s => (
                <button key={s} onClick={() => send(s)} style={{
                  padding: '0.45rem 0.85rem', borderRadius: '999px',
                  border: '1px solid var(--border)', background: 'var(--bg3)',
                  color: 'var(--text2)', fontSize: '0.78rem', cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}
                >{s}</button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', gap: '0.5rem', alignItems: 'flex-end' }}>
            {m.role === 'ai' && (
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b9eff22, #6366f122)',
                border: '1px solid rgba(59,158,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0,
              }}>🌿</div>
            )}
            <div style={{
              maxWidth: '72%', padding: '0.7rem 1rem',
              borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: m.role === 'user' ? 'linear-gradient(135deg, #3b9eff, #6366f1)' : 'var(--bg3)',
              color: m.role === 'user' ? '#fff' : 'var(--text)',
              border: m.role === 'ai' ? '1px solid var(--border)' : 'none',
              fontSize: '0.87rem', lineHeight: 1.65, whiteSpace: 'pre-wrap',
              animation: 'fadeUp 0.2s ease',
            }}>{m.text}</div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: '4px', padding: '0.6rem 0.9rem', width: 'fit-content', background: 'var(--bg3)', borderRadius: '16px', border: '1px solid var(--border)', marginLeft: '38px' }}>
            {[0,1,2].map(i => <span key={i} style={{ width:'5px',height:'5px',borderRadius:'50%',background:'var(--accent)',display:'block',animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite` }}/>)}
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: '0.5rem', padding: '0.85rem', borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <input value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&send()}
          placeholder="e.g. What is PM Kisan Yojana? (Hindi/Odia/English)"
          style={{
            flex:1, padding:'0.7rem 1rem', borderRadius:'10px',
            border:'1px solid var(--border)', background:'var(--bg3)',
            color:'var(--text)', fontSize:'0.88rem', outline:'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
        <button onClick={() => send()} disabled={loading||!input.trim()} style={{
          padding:'0.7rem 1.2rem', borderRadius:'10px', border:'none',
          background: loading||!input.trim() ? 'var(--border)' : 'linear-gradient(135deg,#3b9eff,#6366f1)',
          color: loading||!input.trim() ? 'var(--muted)' : '#fff',
          fontWeight: 600, fontSize: '0.9rem', cursor: loading||!input.trim() ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s', whiteSpace: 'nowrap',
        }}>
          {loading ? '...' : 'Send →'}
        </button>
      </div>
    </div>
  );
}