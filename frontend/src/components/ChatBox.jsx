import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { BASE, loadHistory, saveHistory, clearHistory } from '../Api';
import VoiceInput from './VoiceInput';
import FileUpload from './FileUpload';
import ReactMarkdown from 'react-markdown';

function TypingIndicator({ accentColor }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', paddingLeft: '0.25rem' }}>
      <div style={{
        width: '30px', height: '30px', borderRadius: '50%',
        background: `${accentColor}18`, border: `1px solid ${accentColor}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0,
      }}>🌿</div>
      <div style={{
        padding: '0.65rem 0.9rem', borderRadius: '16px 16px 16px 4px',
        background: 'var(--bg3)', border: '1px solid var(--border)',
        display: 'flex', gap: '4px', alignItems: 'center',
      }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: '5px', height: '5px', borderRadius: '50%',
            background: accentColor, display: 'block',
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}

function Message({ message, accentColor }) {
  const isUser = message.role === 'user';
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      alignItems: 'flex-end',
      gap: '0.5rem',
      animation: 'fadeUp 0.2s ease',
    }}>
      {!isUser && (
        <div style={{
          width: '30px', height: '30px', borderRadius: '50%',
          background: `${accentColor}18`, border: `1px solid ${accentColor}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', flexShrink: 0,
        }}>🌿</div>
      )}
      <div style={{
        maxWidth: '72%',
        padding: '0.7rem 0.95rem',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: isUser ? `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)` : 'var(--card)',
        color: isUser ? '#fff' : 'var(--text)',
        border: isUser ? 'none' : '1px solid var(--border)',
        fontSize: '0.875rem', lineHeight: 1.7,
        boxShadow: isUser ? `0 4px 16px ${accentColor}30` : 'none',
      }}>
        {isUser ? (
          <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{message.text}</p>
        ) : (
          <div className="md-content">
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        )}
        <div style={{
          fontSize: '0.68rem', opacity: 0.5, marginTop: '5px',
          textAlign: isUser ? 'right' : 'left',
          fontFamily: 'var(--font-mono)',
        }}>
          {new Date(message.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

export default function ChatBox({
  accentColor = '#4f9cf9',
  placeholder = 'Ask your question...',
  moduleKey = 'general',
  onSend,
}) {
  const { user } = useAuth();
  const storageKey = user ? `ls-history-${user.email}-${moduleKey}` : null;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [clearing, setClearing] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    async function load() {
      if (user) {
        try {
          const response = await loadHistory(moduleKey);
          setMessages(response.data.messages || []);
        } catch { setMessages([]); }
      } else if (storageKey) {
        try { setMessages(JSON.parse(localStorage.getItem(storageKey) || '[]')); }
        catch { setMessages([]); }
      } else {
        setMessages([]);
      }
    }
    load();
  }, [user, moduleKey]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const saveChatHistory = async (nextMessages) => {
    if (user) {
      try { await saveHistory(moduleKey, nextMessages); } catch {}
    } else if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(nextMessages));
    }
  };

  const send = async () => {
    if (!input.trim() || loading) return;
    const queryText = input;
    const userMsg = { role: 'user', text: queryText, ts: Date.now() };
    const aiMsg   = { role: 'ai',   text: '',         ts: Date.now() + 1 };

    setMessages(prev => [...prev, userMsg, aiMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${BASE}/${moduleKey}/ask/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText, language: 'en' }),
      });
      if (!response.ok) throw new Error('stream-failed');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of decoder.decode(value).split('\n')) {
          if (line.startsWith('data: ')) {
            accumulated += line.slice(6);
            setMessages(prev => prev.map(m => m.ts === aiMsg.ts ? { ...m, text: accumulated } : m));
          }
        }
      }
      setMessages(prev => { saveChatHistory(prev); return prev; });

    } catch {
      try {
        if (onSend) {
          const res = await onSend(queryText);
          const text = res?.data?.response || '❌ No response received.';
          setMessages(prev => {
            const updated = prev.map(m => m.ts === aiMsg.ts ? { ...m, text } : m);
            saveChatHistory(updated);
            return updated;
          });
        } else {
          setMessages(prev => prev.map(m => m.ts === aiMsg.ts ? { ...m, text: '❌ Something went wrong.' } : m));
        }
      } catch {
        setMessages(prev => prev.map(m => m.ts === aiMsg.ts ? { ...m, text: '❌ Something went wrong.' } : m));
      }
    }

    setLoading(false);
    inputRef.current?.focus();
  };

  const handleClearHistory = async () => {
    setClearing(true);
    setMessages([]);
    if (user) { try { await clearHistory(moduleKey); } catch {} }
    if (storageKey) localStorage.removeItem(storageKey);
    setTimeout(() => setClearing(false), 300);
  };

  const isEmpty = messages.length === 0;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', width: '100%',
      background: 'var(--bg)',
    }}>
      {/* ── Thin top bar ── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0.5rem 1.5rem',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg2)',
        minHeight: '40px', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: user ? '#2dd4a0' : '#f59e0b',
            display: 'inline-block',
            boxShadow: user ? '0 0 7px #2dd4a0' : 'none',
          }} />
          <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>
            {user ? `Saving history for ${user.name}` : 'Sign in to save history'}
          </span>
        </div>
        {messages.length > 0 && (
          <button onClick={handleClearHistory} disabled={clearing} style={{
            padding: '0.25rem 0.65rem', borderRadius: '6px',
            border: '1px solid var(--border)', background: 'transparent',
            color: 'var(--muted)', fontSize: '0.72rem', cursor: 'pointer',
            transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#f8717133'; e.currentTarget.style.color = '#f87171'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
          >
            {clearing ? 'Clearing…' : 'Clear chat'}
          </button>
        )}
      </div>

      {/* ── Messages ── */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '1.5rem 1.5rem',
        display: 'flex', flexDirection: 'column', gap: '0.9rem',
        maxWidth: '860px', width: '100%', margin: '0 auto',
        boxSizing: 'border-box',
      }}>
        {isEmpty && (
          <div style={{ textAlign: 'center', marginTop: '5rem', color: 'var(--muted)', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'float 3s ease-in-out infinite' }}>💬</div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text2)', marginBottom: '0.4rem' }}>Start the conversation</p>
            <p style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{placeholder}</p>
          </div>
        )}

        {messages.map((m, i) => (
          <Message key={`${m.ts}-${i}`} message={m} accentColor={accentColor} />
        ))}

        {loading && <TypingIndicator accentColor={accentColor} />}
        <div ref={bottomRef} />
      </div>

      {/* ── Input ── */}
      <div style={{
        padding: '0.9rem 1.5rem',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg2)',
        flexShrink: 0,
      }}>
        <div style={{
          display: 'flex', gap: '0.5rem', alignItems: 'center',
          maxWidth: '860px', margin: '0 auto',
        }}>
          <FileUpload onFileSelect={(file) => console.log(file)} accentColor={accentColor} />

          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder={placeholder}
            style={{
              flex: 1, padding: '0.75rem 1rem', borderRadius: '12px',
              border: '1px solid var(--border)', background: 'var(--bg3)',
              color: 'var(--text)', fontSize: '0.9rem', outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onFocus={e => { e.target.style.borderColor = accentColor; e.target.style.boxShadow = `0 0 0 3px ${accentColor}15`; }}
            onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
          />

          <VoiceInput onTranscript={setInput} accentColor={accentColor} />

          <button
            onClick={send}
            disabled={!input.trim() || loading}
            style={{
              padding: '0.75rem 1.35rem', borderRadius: '12px',
              border: `1px solid ${!input.trim() || loading ? 'var(--border)' : 'transparent'}`,
              background: !input.trim() || loading
                ? 'var(--bg3)'
                : `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)`,
              color: !input.trim() || loading ? 'var(--muted)' : '#fff',
              fontWeight: 700, fontSize: '0.88rem',
              cursor: !input.trim() || loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s', whiteSpace: 'nowrap',
              boxShadow: !input.trim() || loading ? 'none' : `0 4px 16px ${accentColor}30`,
            }}
            onMouseEnter={e => { if (input.trim() && !loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
          >
            {loading ? '...' : 'Send →'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        .md-content p { margin: 0 0 0.5em; }
        .md-content p:last-child { margin-bottom: 0; }
        .md-content ul,.md-content ol { padding-left: 1.4em; margin: 0.4em 0; }
        .md-content li { margin-bottom: 0.2em; }
        .md-content code { font-family: var(--font-mono); font-size: 0.82em; background: rgba(255,255,255,0.07); padding: 0.1em 0.4em; border-radius: 4px; }
        .md-content pre { background: rgba(0,0,0,0.3); border-radius: 8px; padding: 0.75rem; overflow-x: auto; margin: 0.5em 0; }
        .md-content pre code { background: none; padding: 0; }
        .md-content strong { font-weight: 600; }
        .md-content h3,.md-content h4 { font-size: 0.95em; font-weight: 700; margin: 0.5em 0 0.3em; }
      `}</style>
    </div>
  );
}