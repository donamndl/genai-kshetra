import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ChatBox({ onSend, accentColor = '#4f9cf9', placeholder = 'Ask your question...', moduleKey = 'general' }) {
  const { user } = useAuth();
  const storageKey = user ? `ls-history-${user.email}-${moduleKey}` : null;

  const [messages, setMessages] = useState(() => {
    if (!storageKey) return [];
    try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { return []; }
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (storageKey) localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', text: input, ts: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await onSend(input);
      setMessages(prev => [...prev, { role: 'ai', text: res.data.response, ts: Date.now() }]);
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: '❌ Something went wrong. Please try again.', ts: Date.now() }]);
    }
    setLoading(false);
  };

  const clearHistory = () => {
    setMessages([]);
    if (storageKey) localStorage.removeItem(storageKey);
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: 'calc(100vh - 130px)',
      background: 'var(--bg)',
    }}>
      {/* Header bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0.5rem 1.5rem',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg2)',
      }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
          {user
            ? `💾 History saved for ${user.name}`
            : '⚠️ Not signed in — history won\'t be saved'}
        </span>
        {messages.length > 0 && (
          <button onClick={clearHistory} style={{
            fontSize: '0.75rem', color: 'var(--muted)',
            background: 'none', border: '1px solid var(--border)',
            padding: '0.2rem 0.6rem', borderRadius: '6px',
          }}>Clear history</button>
        )}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '5rem', color: 'var(--muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💬</div>
            <p style={{ fontSize: '1rem' }}>Ask me anything — I'll answer in your language.</p>
            <p style={{ fontSize: '0.8rem', marginTop: '0.4rem', opacity: 0.6 }}>Try Hindi, Odia, or English</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {m.role === 'ai' && (
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}66)`,
                border: `1px solid ${accentColor}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', marginRight: '0.6rem', marginTop: '2px',
              }}>🌿</div>
            )}
            <div style={{
              maxWidth: '68%',
              padding: '0.85rem 1.1rem',
              borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: m.role === 'user'
                ? `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`
                : 'var(--card)',
              color: m.role === 'user' ? '#fff' : 'var(--text)',
              border: m.role === 'ai' ? '1px solid var(--border)' : 'none',
              fontSize: '0.92rem', lineHeight: 1.65,
              whiteSpace: 'pre-wrap',
              boxShadow: m.role === 'user' ? `0 4px 16px ${accentColor}33` : 'none',
            }}>{m.text}</div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: `${accentColor}22`, border: `1px solid ${accentColor}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px',
            }}>🌿</div>
            <div style={{
              padding: '0.85rem 1.1rem', borderRadius: '18px 18px 18px 4px',
              background: 'var(--card)', border: '1px solid var(--border)',
              display: 'flex', gap: '4px', alignItems: 'center',
            }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: accentColor, display: 'block',
                  animation: `bounce 1.2s ease-in-out ${i*0.2}s infinite`,
                }}/>
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: '1rem 1.5rem',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg2)',
        display: 'flex', gap: '0.75rem', alignItems: 'flex-end',
      }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder={placeholder}
          rows={1}
          style={{
            flex: 1, padding: '0.85rem 1.1rem',
            borderRadius: '14px', border: '1px solid var(--border)',
            background: 'var(--bg3)', color: 'var(--text)',
            fontSize: '0.92rem', resize: 'none', outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = accentColor}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
        <button onClick={send} disabled={loading || !input.trim()} style={{
          padding: '0.85rem 1.4rem', borderRadius: '14px', border: 'none',
          background: loading || !input.trim() ? 'var(--border)' : `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
          color: '#fff', fontWeight: 600, fontSize: '0.9rem',
          transition: 'all 0.2s',
          cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
        }}>
          {loading ? '⏳' : '→'}
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}