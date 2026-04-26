import ChatBox from '../components/ChatBox';
import { askAgriculture } from '../api';
import Footer from '../components/Footer';

export default function Agriculture() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Module header */}
      <div style={{
        padding: '1rem 1.5rem',
        background: 'linear-gradient(135deg, #064e3b18, transparent)',
        borderBottom: '1px solid #2dd4a022',
        display: 'flex', alignItems: 'center', gap: '1rem',
        flexShrink: 0, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: '-30px', top: '-30px', width: '150px', height: '150px', background: 'radial-gradient(circle, #2dd4a00d, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{
          width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0,
          background: '#2dd4a014', border: '1px solid #2dd4a02e',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem',
          boxShadow: '0 3px 12px #2dd4a01a',
        }}>🌾</div>
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#2dd4a0', letterSpacing: '-0.2px' }}>Agriculture Assistant</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.78rem', marginTop: '0.15rem' }}>Crops, soil, weather, schemes — for farmers across India</p>
        </div>
      </div>

      {/* Chat fills remaining height */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <ChatBox
          accentColor="#2dd4a0"
          placeholder="Ask anything about agriculture..."
          onSend={q => askAgriculture(q)}
          moduleKey="agriculture"
        />
      </div>
    </div>
  );
}