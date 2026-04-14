import ChatBox from '../components/ChatBox';
import { askMedical } from '../api';
import Footer from '../components/Footer';

export default function Medical() {
  return (
    <div>
      <div style={{
        padding: '1.25rem 2rem',
        background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: '1rem',
      }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '12px',
          background: '#83185722', border: '1px solid #f472b633',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
        }}>🏥</div>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#f472b6' }}>Medical Assistant</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>Health info, alerts, hospital directions — Odisha region</p>
        </div>
      </div>
      <ChatBox
        accentColor="#f472b6"
        placeholder="e.g. What are the symptoms of dengue fever?"
        onSend={q => askMedical(q)}
        moduleKey="medical"
      />
      <Footer />
    </div>
  );
}