import { useState } from 'react';
import { Link } from 'react-router-dom';

const MODULES = [
  { to: '/agriculture', emoji: '🌾', label: 'Agriculture', color: '#2dd4a0' },
  { to: '/education',   emoji: '📚', label: 'Education',   color: '#9d7ff4' },
  { to: '/medical',     emoji: '🏥', label: 'Medical',     color: '#f06292' },
];

export default function Footer() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');

  const submit = () => {
    if (!form.name || !form.email || !form.message) return setErr('Please fill all fields.');
    setErr('');
    const contacts = JSON.parse(localStorage.getItem('ls-contacts') || '[]');
    contacts.push({ ...form, ts: Date.now() });
    localStorage.setItem('ls-contacts', JSON.stringify(contacts));
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  const inp = {
    width: '100%', padding: '0.65rem 0.9rem',
    borderRadius: '10px', border: '1px solid var(--border)',
    background: 'var(--bg3)', color: 'var(--text)',
    fontSize: '0.85rem', outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'var(--font)',
  };

  return (
    <footer style={{
      background: 'var(--bg2)',
      borderTop: '1px solid var(--border)',
      padding: '3.5rem 1.5rem 1.5rem',
      marginTop: '5rem',
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #3b9eff22, #6366f122)',
                border: '1px solid rgba(59,158,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
              }}>🌿</div>
              <span style={{
                fontFamily: "'Sora', sans-serif", fontSize: '1.2rem', fontWeight: 700,
                background: 'linear-gradient(135deg, #3b9eff, #9d7ff4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Kshetra</span>
            </Link>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.75, maxWidth: '300px', marginBottom: '1.5rem' }}>
              A GenAI assistant built for Bharat — answering in your language, for your region.
              Helping farmers, students, and citizens access knowledge in Hindi, Odia, and more.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {MODULES.map(m => (
                <Link key={m.to} to={m.to} style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  fontSize: '0.83rem', color: 'var(--muted)',
                  transition: 'color 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = m.color; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; }}
                >
                  <span>{m.emoji}</span> {m.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text)' }}>
              📬 Contact Us
            </h3>
            {sent ? (
              <div style={{
                padding: '1.5rem', borderRadius: '14px',
                background: '#064e3b22', border: '1px solid #2dd4a022',
                color: 'var(--green)', fontSize: '0.88rem', textAlign: 'center',
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</div>
                Thank you! We'll get back to you soon.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  <input style={inp} placeholder="Your name" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                  <input style={inp} placeholder="Email" type="email" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
                <textarea style={{ ...inp, resize: 'vertical', minHeight: '90px' }} rows={3}
                  placeholder="Your message..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
                {err && <p style={{ color: '#f87171', fontSize: '0.78rem' }}>{err}</p>}
                <button onClick={submit} style={{
                  padding: '0.7rem', borderRadius: '10px', border: 'none',
                  background: 'linear-gradient(135deg, var(--accent), #6366f1)',
                  color: '#fff', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(59,158,255,0.2)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(59,158,255,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(59,158,255,0.2)'; }}
                >Send Message →</button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '1.25rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <p style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>
            © {new Date().getFullYear()} Kshetra · Built for Bharat 🇮🇳
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>
            Powered by Groq · LangChain · FastAPI · React
          </p>
        </div>
      </div>
    </footer>
  );
}