import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const modules = [
  {
    path: '/agriculture',
    emoji: '🌾',
    title: 'Agriculture',
    desc: 'Crop advice, soil health, weather alerts, pesticide guidance, and government farming schemes — all for your region.',
    color: '#34d399',
    bg: '#064e3b22',
    border: '#34d39933',
  },
  {
    path: '/education',
    emoji: '📚',
    title: 'Education',
    desc: 'Simplify textbook concepts with local examples, find scholarships, understand exam syllabi in simple language.',
    color: '#a78bfa',
    bg: '#4c1d9522',
    border: '#a78bfa33',
  },
  {
    path: '/medical',
    emoji: '🏥',
    title: 'Medical',
    desc: 'Health alerts, vaccination reminders, disease outbreak info, and directions to the nearest hospitals in your area.',
    color: '#f472b6',
    bg: '#83185722',
    border: '#f472b633',
  },
];

const stats = [
  { value: '3', label: 'Modules' },
  { value: '10+', label: 'Languages' },
  { value: '24/7', label: 'Available' },
  { value: '100%', label: 'Free' },
];

export default function Home() {
  const chatRef = useRef(null);
  const modulesRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: '90vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '4rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse, #4f9cf915 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.35rem 1rem', borderRadius: '20px',
          border: '1px solid var(--border)', background: 'var(--bg2)',
          fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '1.75rem',
        }}>
          <span style={{ color: '#34d399' }}>●</span> GenAI for Localized Knowledge
        </div>

        <h1 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          lineHeight: 1.1, letterSpacing: '-1px',
          marginBottom: '1.25rem', maxWidth: '800px',
        }}>
          India's Knowledge, Reimagined Through AI
        </h1>

        <p style={{
          color: 'var(--muted)', fontSize: '1.1rem',
          lineHeight: 1.7, maxWidth: '560px', marginBottom: '2.5rem',
        }}>
          Kshetra is a bilingual AI assistant for farmers, students, and citizens of India —
          answering questions in Hindi, Odia, Hinglish, and more.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => chatRef.current?.scrollIntoView({ behavior: 'smooth' })} style={{
            padding: '0.85rem 2rem', borderRadius: '12px', border: 'none',
            background: 'linear-gradient(135deg, var(--accent), #6366f1)',
            color: '#fff', fontWeight: 600, fontSize: '1rem',
            boxShadow: '0 8px 24px #4f9cf933',
          }}>Start chatting →</button>
          <button onClick={() => modulesRef.current?.scrollIntoView({ behavior: 'smooth' })} style={{
            padding: '0.85rem 2rem', borderRadius: '12px',
            border: '1px solid var(--border)', background: 'var(--bg2)',
            color: 'var(--text)', fontWeight: 500, fontSize: '1rem',
          }}>Explore modules</button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '2rem', marginTop: '4rem',
          flexWrap: 'wrap', justifyContent: 'center',
        }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--accent)' }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.2rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* General Chat Section */}
      <section ref={chatRef} style={{
        padding: '3rem 2rem',
        maxWidth: '860px', margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2rem', marginBottom: '0.5rem' }}>
            Ask anything
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
            General queries about government schemes, local info, civic services — in any language.
          </p>
        </div>

        {/* Inline general chatbox */}
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
      <section ref={modulesRef} style={{
        padding: '3rem 2rem 1rem',
        maxWidth: '1000px', margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2rem', marginBottom: '0.5rem' }}>
            Specialized modules
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>
            Domain-tuned AI for agriculture, education, and health — region-aware and in your language.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {modules.map(m => (
            <div key={m.path} onClick={() => navigate(m.path)}
              style={{
                background: m.bg, border: `1px solid ${m.border}`,
                borderRadius: '20px', padding: '2rem',
                cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${m.color}22`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{m.emoji}</div>
              <h3 style={{ color: m.color, fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.6rem' }}>{m.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.65 }}>{m.desc}</p>
              <div style={{ marginTop: '1.25rem', color: m.color, fontSize: '0.85rem', fontWeight: 600 }}>
                Open module →
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Inline general chat for homepage
import { useState, useRef as useRef2 } from 'react';
import { askGeneral } from '../api';
import { useAuth } from '../context/AuthContext';

function GeneralChatInline() {
  const { user } = useAuth();
  const storageKey = user ? `ls-history-${user.email}-general` : null;
  const [messages, setMessages] = useState(() => {
    if (!storageKey) return [];
    try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { return []; }
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef2(null);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', text: input };
    setMessages(p => [...p, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await askGeneral(input);
      const aiMsg = { role: 'ai', text: res.data.response };
      const next = [...messages, userMsg, aiMsg];
      setMessages(p => [...p, aiMsg]);
      if (storageKey) localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      setMessages(p => [...p, { role: 'ai', text: '❌ Something went wrong.' }]);
    }
    setLoading(false);
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
        padding: '0.5rem 1rem', fontSize: '0.78rem',
        color: 'var(--muted)', borderBottom: '1px solid var(--border)',
        background: 'var(--bg2)',
      }}>
        {user ? `💾 History saved · ${user.name}` : '⚠️ Sign in to save history'}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--muted)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💬</div>
            <p style={{ fontSize: '0.9rem' }}>Ask about government schemes, local services, laws...</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '70%', padding: '0.75rem 1rem',
              borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: m.role === 'user' ? 'linear-gradient(135deg, #4f9cf9, #6366f1)' : 'var(--bg3)',
              color: m.role === 'user' ? '#fff' : 'var(--text)',
              border: m.role === 'ai' ? '1px solid var(--border)' : 'none',
              fontSize: '0.88rem', lineHeight: 1.6, whiteSpace: 'pre-wrap',
            }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: '4px', padding: '0.75rem 1rem', width: 'fit-content', background: 'var(--bg3)', borderRadius: '16px', border: '1px solid var(--border)' }}>
            {[0,1,2].map(i => <span key={i} style={{ width:'6px',height:'6px',borderRadius:'50%',background:'var(--accent)',display:'block',animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite` }}/>)}
          </div>
        )}
        <div ref={bottomRef}/>
      </div>
      <div style={{ display: 'flex', gap: '0.6rem', padding: '0.85rem 1rem', borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <input value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&send()}
          placeholder="e.g. What is PM Kisan Yojana? (Hindi/Odia/English)"
          style={{ flex:1, padding:'0.7rem 1rem', borderRadius:'10px', border:'1px solid var(--border)', background:'var(--bg3)', color:'var(--text)', fontSize:'0.88rem', outline:'none' }}/>
        <button onClick={send} disabled={loading||!input.trim()} style={{ padding:'0.7rem 1.2rem', borderRadius:'10px', border:'none', background:loading||!input.trim()?'var(--border)':'linear-gradient(135deg,#4f9cf9,#6366f1)', color:'#fff', fontWeight:600 }}>→</button>
      </div>
      <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}`}</style>
    </div>
  );
}