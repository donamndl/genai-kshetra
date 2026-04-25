import ChatBox from '../components/ChatBox';
import { askMedical } from '../api';
import Footer from '../components/Footer';

function ModuleHeader({ emoji, title, subtitle, color, bg, border }) {
  return (
    <div style={{
      padding: '1.5rem 2rem',
      background: bg,
      borderBottom: `1px solid ${border}`,
      display: 'flex', alignItems: 'center', gap: '1.25rem',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', right: '-40px', top: '-40px',
        width: '180px', height: '180px',
        background: `radial-gradient(circle, ${color}10, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        width: '50px', height: '50px', borderRadius: '14px', flexShrink: 0,
        background: `${color}14`, border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.5rem', boxShadow: `0 4px 16px ${color}20`,
      }}>{emoji}</div>
      <div>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color, letterSpacing: '-0.2px' }}>{title}</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginTop: '0.2rem' }}>{subtitle}</p>
      </div>
    </div>
  );
}

export default function Medical() {
  return (
    <div>
      <ModuleHeader
        emoji="🏥"
        title="Medical Assistant"
        subtitle="Health info, alerts, hospital directions — Odisha region"
        color="#f06292"
        bg="linear-gradient(135deg, #4a0a2418, transparent)"
        border="#f0629222"
      />
      <ChatBox
        accentColor="#f06292"
        placeholder="e.g. What are the symptoms of dengue fever?"
        onSend={q => askMedical(q)}
        moduleKey="medical"
      />
      <Footer />
    </div>
  );
}