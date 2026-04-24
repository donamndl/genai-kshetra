import { useState } from 'react';

export default function Footer() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');

  const submit = () => {
    if (!form.name || !form.email || !form.message) return setErr('Please fill all fields.');
    setErr('');
    // Save to localStorage (demo — would be a real API in production)
    const contacts = JSON.parse(localStorage.getItem('ls-contacts') || '[]');
    contacts.push({ ...form, ts: Date.now() });
    localStorage.setItem('ls-contacts', JSON.stringify(contacts));
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  const inp = {
    width: '100%', padding: '0.7rem 1rem',
    borderRadius: '10px', border: '1px solid var(--border)',
    background: 'var(--bg3)', color: 'var(--text)',
    fontSize: '0.88rem', outline: 'none',
  };

  return (
    <footer style={{
      background: 'var(--bg2)',
      borderTop: '1px solid var(--border)',
      padding: '3rem 2rem 1.5rem',
      marginTop: '4rem',
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '2.5rem' }}>

          {/* About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <img src="/logo.jpg" alt="Kshetra logo" style={{ width: '32px', height: '32px', borderRadius: '10px' }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.2rem', fontWeight: '600', color: 'var(--accent)' }}>Kshetra</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: '320px' }}>
              A GenAI assistant built for Bharat — answering in your language, for your region.
              Helping farmers, students, and citizens access knowledge in Hindi, Odia, and more.
            </p>
            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {['🌾 Agriculture', '📚 Education', '🏥 Medical'].map(t => (
                <span key={t} style={{
                  padding: '0.3rem 0.75rem', borderRadius: '20px',
                  border: '1px solid var(--border)',
                  fontSize: '0.78rem', color: 'var(--muted)',
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>📬 Contact Us</h3>
            {sent ? (
              <div style={{
                padding: '1.25rem', borderRadius: '12px',
                background: '#064e3b33', border: '1px solid #34d39933',
                color: 'var(--green)', fontSize: '0.9rem', textAlign: 'center',
              }}>
                ✅ Thank you! We'll get back to you soon.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  <input style={inp} placeholder="Your name" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  <input style={inp} placeholder="Email" type="email" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <textarea style={{ ...inp, resize: 'none' }} rows={3}
                  placeholder="Your message..." value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                {err && <p style={{ color: '#f87171', fontSize: '0.8rem' }}>{err}</p>}
                <button onClick={submit} style={{
                  padding: '0.65rem', borderRadius: '10px', border: 'none',
                  background: 'linear-gradient(135deg, var(--accent), #6366f1)',
                  color: '#fff', fontWeight: 600, fontSize: '0.88rem',
                }}>Send Message</button>
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
          <p style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} Kshetra. Built for Bharat 🇮🇳
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
            Powered by Groq · LangChain · FastAPI · React
          </p>
        </div>
      </div>
    </footer>
  );
}