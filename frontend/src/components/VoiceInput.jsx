import { useState, useRef } from 'react';

export default function VoiceInput({ onTranscript, accentColor = '#4f9cf9' }) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US'; // Change to support multiple languages

    recognitionRef.current.onstart = () => setIsListening(true);
    recognitionRef.current.onend = () => setIsListening(false);
    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
    };
    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <button
      onClick={isListening ? stopListening : startListening}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.4rem',
        padding: '0.75rem 0.95rem',
        borderRadius: '999px',
        background: isListening ? '#f97373' : accentColor,
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        minWidth: '52px',
        minHeight: '52px',
        fontSize: '0.95rem',
        fontWeight: 700,
        boxShadow: isListening ? '0 10px 24px rgba(249,115,115,0.25)' : '0 10px 24px rgba(79,156,249,0.2)',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease',
      }}
      title={isListening ? 'Stop voice capture' : 'Start voice capture'}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
    >
      <span style={{ fontSize: '1.1rem' }}>
        {isListening ? '⏹️' : '🎙️'}
      </span>
      <span style={{ display: 'none' }}>
        {isListening ? 'Stop listening' : 'Voice input'}
      </span>
    </button>
  );
}