import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthRoute from './components/AuthRoute';
import Home from './pages/Home';
import Coin from './pages/Coin';

const App = () => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem('tradeTheme') ?? 'Light'
  );

  const toggleTheme = () => setTheme(theme === 'Dark' ? 'Light' : 'Dark');

  useEffect(() => {
    switch (theme) {
      case 'Dark':
        document.documentElement.classList.add('dark');
        localStorage.setItem('tradeTheme', 'Dark');
        break;
      case 'Light':
        document.documentElement.classList.remove('dark');
        localStorage.setItem('tradeTheme', 'Light');
        break;
      default:
        localStorage.removeItem('tradeTheme');
        break;
    }
  }, [theme]);

  return (
    <div className="bg-[#EDF0F4] dark:bg-gray-800">
      <Router>
        <Toaster />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AuthRoute />}>
            <Route
              path="/"
              element={<Home theme={theme} toggle={toggleTheme} />}
            />
            <Route path="/:id" element={<Coin />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
