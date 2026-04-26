import ChatBox from '../components/ChatBox';
import { askEducation } from '../api';
import Footer from '../components/Footer';

export default function Education() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Module header */}
      <div style={{
        padding: '1rem 1.5rem',
        background: 'linear-gradient(135deg, #2d1b6918, transparent)',
        borderBottom: '1px solid #9d7ff422',
        display: 'flex', alignItems: 'center', gap: '1rem',
        flexShrink: 0, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: '-30px', top: '-30px', width: '150px', height: '150px', background: 'radial-gradient(circle, #9d7ff40d, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{
          width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0,
          background: '#9d7ff414', border: '1px solid #9d7ff42e',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem',
          boxShadow: '0 3px 12px #9d7ff41a',
        }}>📚</div>
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#9d7ff4', letterSpacing: '-0.2px' }}>Education Assistant</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.78rem', marginTop: '0.15rem' }}>Simplify concepts, scholarships, exams — in your language</p>
        </div>
      </div>

      {/* Chat fills remaining height */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <ChatBox
          accentColor="#9d7ff4"
          placeholder="Ask anything about education..."
          onSend={q => askEducation(q)}
          moduleKey="education"
        />
      </div>
    </div>
  );
}