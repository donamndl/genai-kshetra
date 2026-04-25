// Agriculture.jsx
import ChatBox from '../components/ChatBox';
import { askAgriculture } from '../api';
import Footer from '../components/Footer';

export default function Agriculture() {
  return (
    <div>
      <ModuleHeader
        emoji="🌾"
        title="Agriculture Assistant"
        subtitle="Crops, soil, weather, schemes — for farmers across India"
        color="#2dd4a0"
        bg="linear-gradient(135deg, #064e3b18, transparent)"
        border="#2dd4a022"
      />
      <ChatBox
        accentColor="#2dd4a0"
        placeholder="e.g. Which crops should I grow in Kharif season in Odisha?"
        onSend={q => askAgriculture(q)}
        moduleKey="agriculture"
      />
      <Footer />
    </div>
  );
}

// ── Shared header component ────────────────────────────────────────────────────
function ModuleHeader({ emoji, title, subtitle, color, bg, border }) {
  return (
    <div style={{
      padding: '1.5rem 2rem',
      background: bg,
      borderBottom: `1px solid ${border}`,
      display: 'flex', alignItems: 'center', gap: '1.25rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle background glow */}
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
        fontSize: '1.5rem',
        boxShadow: `0 4px 16px ${color}20`,
      }}>{emoji}</div>

      <div>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color, letterSpacing: '-0.2px' }}>{title}</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginTop: '0.2rem' }}>{subtitle}</p>
      </div>
    </div>
  );
}