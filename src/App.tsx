import './App.css'
import { useState } from 'react'
import Router from './Router'
import { BrowserRouter } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import KRISHeader from './components/KRISHeader';
//fonts
import "./assets/fonts/KPMG-BOLD ITALIC.TTF";
import "./assets/fonts/KPMG-BOLD.TTF";
import "./assets/fonts/KPMG-EXTRALIGHT ITALIC.TTF";
import "./assets/fonts/KPMG-EXTRALIGHT.TTF";
import "./assets/fonts/KPMG-LIGHT ITALIC.TTF";
import "./assets/fonts/KPMG-LIGHT.TTF";
import "./assets/fonts/KPMG-THIN ITALIC.TTF";
import "./assets/fonts/KPMG-THIN.TTF";
import { createTheme, ThemeProvider } from '@mui/material';

import type Admin from './Admin'

const theme = createTheme({
  typography: {
    fontFamily: 'Source Sans Pro'
  },
});

const HARDCODED_ADMIN: Admin = { username: "admin", displayName: "KRIS Admin", password: "admin123"};

function App() {
  const [currentUser, setCurrentUser] = useState<Admin | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleLogin = (username: string, password: string): boolean => {
    const user = HARDCODED_ADMIN.username === username && HARDCODED_ADMIN.password === password

    if (user) {
      setCurrentUser(HARDCODED_ADMIN);
      setLoginModalOpen(false);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleOpenLogin = () => {
    setLoginModalOpen(true);
  };

  const handleCloseLogin = () => {
    setLoginModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <KRISHeader currentUser={currentUser} onLogin={handleOpenLogin} onLogout={handleLogout} />
      <BrowserRouter>
        <Router currentUser={currentUser} />
      </BrowserRouter>
      <LoginModal open={loginModalOpen} onClose={handleCloseLogin} onLogin={handleLogin} />
    </ThemeProvider>
  )
}

export default App
