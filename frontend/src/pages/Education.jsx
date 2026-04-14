import ChatBox from '../components/ChatBox';
import { askEducation } from '../api';
import Footer from '../components/Footer';

export default function Education() {
  return (
    <div>
      <div style={{
        padding: '1.25rem 2rem',
        background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: '1rem',
      }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '12px',
          background: '#4c1d9522', border: '1px solid #a78bfa33',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
        }}>📚</div>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#a78bfa' }}>Education Assistant</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>Simplify concepts, scholarships, exams — in your language</p>
        </div>
      </div>
      <ChatBox
        accentColor="#a78bfa"
        placeholder="e.g. Explain photosynthesis in simple Odia"
        onSend={q => askEducation(q)}
        moduleKey="education"
      />
      <Footer />
    </div>
  );
}