import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import Agriculture from './pages/Agriculture';
import Education from './pages/Education';
import Medical from './pages/Medical';
import Profile from './pages/Profile';
import './index.css';

function Layout({ onAuthClick }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sidebar onAuthClick={onAuthClick} collapsed={collapsed} onCollapse={setCollapsed} />
      <div id="main-content" style={{
        marginLeft: collapsed ? '64px' : '240px',
        minHeight: '100vh',
        transition: 'margin-left 0.25s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <Routes>
          <Route path="/"            element={<Home />}        />
          <Route path="/agriculture" element={<Agriculture />} />
          <Route path="/education"   element={<Education />}   />
          <Route path="/medical"     element={<Medical />}     />
          <Route path="/profile"     element={<Profile />}     />
        </Routes>
      </div>
      <style>{`
        @media (max-width: 768px) {
          #main-content { margin-left: 0 !important; padding-top: 52px; }
        }
      `}</style>
    </>
  );
}

export default function App() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
          <Layout onAuthClick={() => setShowAuth(true)} />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}