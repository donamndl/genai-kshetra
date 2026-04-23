import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import VoiceInput from './VoiceInput';
import FileUpload from './FileUpload';
import ReactMarkdown from 'react-markdown';

// Typing Indicator
function TypingIndicator({ accentColor }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem' }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%',
        background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}66)`,
        border: `1px solid ${accentColor}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>🌿</div>

      <div style={{ display: 'flex', gap: '4px' }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: accentColor,
            animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`
          }} />
        ))}
      </div>
    </div>
  );
}

// Message Component
function Message({ message, accentColor, isUser }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start'
    }}>
      {!isUser && (
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}66)`,
          border: `1px solid ${accentColor}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginRight: '0.5rem'
        }}>🌿</div>
      )}

      <div style={{
        maxWidth: '70%',
        padding: '0.85rem 1rem',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: isUser ? accentColor : 'var(--card)',
        color: isUser ? '#fff' : 'var(--text)',
        border: isUser ? 'none' : '1px solid var(--border)'
      }}>
        <ReactMarkdown>{message.text}</ReactMarkdown>

        <div style={{ fontSize: '0.7rem', opacity: 0.6, marginTop: '4px' }}>
          {new Date(message.ts).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export default function ChatBox({
  accentColor = '#4f9cf9',
  placeholder = 'Ask your question...',
  moduleKey = 'general'
}) {
  const { user } = useAuth();
  const storageKey = user ? `ls-history-${user.email}-${moduleKey}` : null;

  const [messages, setMessages] = useState(() => {
    if (!storageKey) return [];
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Save history
  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, storageKey]);

  // Send message
  const send = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', text: input, ts: Date.now() };
    const aiMsg = { role: 'ai', text: '', ts: Date.now() };

    setMessages(prev => [...prev, userMsg, aiMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/general/ask/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input, language: 'en' }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            accumulated += line.slice(6);

            setMessages(prev =>
              prev.map(m =>
                m.ts === aiMsg.ts ? { ...m, text: accumulated } : m
              )
            );
          }
        }
      }
    } catch {
      setMessages(prev =>
        prev.map(m =>
          m.ts === aiMsg.ts
            ? { ...m, text: '❌ Something went wrong.' }
            : m
        )
      );
    }

    setLoading(false);
  };

  const clearHistory = () => {
    setMessages([]);
    if (storageKey) localStorage.removeItem(storageKey);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 130px)'
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
        borderBottom: '1px solid var(--border)'
      }}>
        <span style={{ fontSize: '0.8rem' }}>
          {user ? `💾 ${user.name}` : '⚠️ Not signed in'}
        </span>

        {messages.length > 0 && (
          <button onClick={clearHistory}>Clear</button>
        )}
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '5rem' }}>
            <p>💬 Ask anything</p>
          </div>
        )}

        {messages.map(m => (
          <Message
            key={m.ts}
            message={m}
            accentColor={accentColor}
            isUser={m.role === 'user'}
          />
        ))}

        {loading && <TypingIndicator accentColor={accentColor} />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        padding: '1rem',
        borderTop: '1px solid var(--border)'
      }}>
        <FileUpload onFileSelect={(file) => console.log(file)} />

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder={placeholder}
          style={{ flex: 1 }}
        />

        <VoiceInput onTranscript={setInput} />

        <button onClick={send} disabled={!input.trim() || loading}>
          {loading ? '...' : 'Send'}
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