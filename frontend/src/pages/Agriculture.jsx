import ChatBox from '../components/ChatBox';
import { askAgriculture } from '../api';
import Footer from '../components/Footer';

export default function Agriculture() {
  return (
    <div>
      <div style={{
        padding: '1.25rem 2rem',
        background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: '1rem',
      }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '12px',
          background: '#064e3b33', border: '1px solid #34d39933',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
        }}>🌾</div>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#34d399' }}>Agriculture Assistant</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>Crops, soil, weather, schemes — for Odisha farmers</p>
        </div>
      </div>
      <ChatBox
        accentColor="#34d399"
        placeholder="e.g. Which crops should I grow in Kharif season in Odisha?"
        onSend={q => askAgriculture(q)}
        moduleKey="agriculture"
      />
      <Footer />
    </div>
  );
}