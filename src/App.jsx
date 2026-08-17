import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home } from './screens/Home';
import { Capture } from './screens/Capture';
import { Detail } from './screens/Detail';
import { Search, Heart, Home as HomeIcon } from 'lucide-react';

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  
  if (location.pathname === '/capture' || location.pathname.startsWith('/detail')) return null;

  return (
    <div className="bottom-nav">
      <button 
        className={`bottom-nav-item ${location.pathname === '/' ? 'active' : ''}`}
        onClick={() => navigate('/')}
      >
        <HomeIcon size={24} />
        <span>Home</span>
      </button>
      <button 
        className={`bottom-nav-item ${location.pathname === '/search' ? 'active' : ''}`}
        onClick={() => navigate('/search')}
      >
        <Search size={24} />
        <span>Search</span>
      </button>
      <button 
        className={`bottom-nav-item ${location.pathname === '/favs' ? 'active' : ''}`}
        onClick={() => navigate('/favs')}
      >
        <Heart size={24} />
        <span>Favs</span>
      </button>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <div className="screen-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/capture" element={<Capture />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/search" element={<div style={{padding: 20}}>Search placeholder</div>} />
          <Route path="/favs" element={<div style={{padding: 20}}>Favs placeholder</div>} />
        </Routes>
        <BottomNav />
      </div>
    </HashRouter>
  );
}

export default App;
