import ChatBox from '../components/ChatBox';
import { askMedical } from '../api';
import Footer from '../components/Footer';

export default function Medical() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Module header */}
      <div style={{
        padding: '1rem 1.5rem',
        background: 'linear-gradient(135deg, #4a0a2418, transparent)',
        borderBottom: '1px solid #f0629222',
        display: 'flex', alignItems: 'center', gap: '1rem',
        flexShrink: 0, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: '-30px', top: '-30px', width: '150px', height: '150px', background: 'radial-gradient(circle, #f062920d, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{
          width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0,
          background: '#f0629214', border: '1px solid #f062922e',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem',
          boxShadow: '0 3px 12px #f062921a',
        }}>🏥</div>
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f06292', letterSpacing: '-0.2px' }}>Medical Assistant</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.78rem', marginTop: '0.15rem' }}>Health info, alerts, hospital directions — Odisha region</p>
        </div>
      </div>

      {/* Chat fills remaining height */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <ChatBox
          accentColor="#f06292"
          placeholder="Ask anything about medical..."
          onSend={q => askMedical(q)}
          moduleKey="medical"
        />
      </div>
    </div>
  );
}