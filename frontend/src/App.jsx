import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import Agriculture from './pages/Agriculture';
import Education from './pages/Education';
import Medical from './pages/Medical';
import Profile from './pages/Profile';
import './index.css';

export default function App() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar onAuthClick={() => setShowAuth(true)} />
          {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
          <Routes>
            <Route path="/"            element={<Home />}        />
            <Route path="/agriculture" element={<Agriculture />} />
            <Route path="/education"   element={<Education />}   />
            <Route path="/medical"     element={<Medical />}     />
            <Route path="/profile"     element={<Profile />}     />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}