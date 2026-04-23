import { useState } from 'react';

export default function FileUpload({ onFileSelect, accentColor = '#4f9cf9' }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*,.pdf,.txt,.doc,.docx"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        style={{
          padding: '0.5rem',
          borderRadius: '6px',
          background: accentColor,
          color: '#fff',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        📎 Attach File
      </label>
      {selectedFile && (
        <div style={{ marginTop: '0.5rem', fontSize: '12px', color: 'var(--muted)' }}>
          Selected: {selectedFile.name}
        </div>
      )}
    </div>
  );
}