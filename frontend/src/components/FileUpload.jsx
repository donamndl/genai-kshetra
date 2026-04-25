import { useState, useRef } from 'react';

export default function FileUpload({ onFileSelect, accentColor = '#4f9cf9' }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [tooltip, setTooltip] = useState(false);
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf,.txt,.doc,.docx"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-upload-input"
      />

      {selectedFile ? (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.35rem',
          padding: '0.5rem 0.75rem',
          borderRadius: '10px',
          border: `1px solid ${accentColor}44`,
          background: `${accentColor}10`,
          maxWidth: '140px',
        }}>
          <span style={{ fontSize: '0.8rem' }}>📎</span>
          <span style={{
            fontSize: '0.73rem', color: 'var(--text2)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            flex: 1,
          }}>{selectedFile.name}</span>
          <button onClick={handleClear} style={{
            border: 'none', background: 'none',
            color: 'var(--muted)', cursor: 'pointer',
            padding: '0', fontSize: '0.8rem', lineHeight: 1, flexShrink: 0,
          }}>✕</button>
        </div>
      ) : (
        <label
          htmlFor="file-upload-input"
          title="Attach a file"
          style={{
            width: '42px', height: '42px',
            borderRadius: '10px',
            border: '1px solid var(--border)',
            background: 'var(--bg3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: '1rem',
            transition: 'all 0.15s',
            flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.background = `${accentColor}12`; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg3)'; }}
        >
          📎
        </label>
      )}
    </div>
  );
}