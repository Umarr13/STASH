import { createContext, useContext } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home } from './screens/Home';
import { Capture } from './screens/Capture';
import { Detail } from './screens/Detail';
import { Search } from './screens/Search';
import { Favourites } from './screens/Favourites';
import { Toast, useToast } from './components/Toast';
import { Search as SearchIcon, Heart, Home as HomeIcon } from 'lucide-react';

// Global toast context
const ToastContext = createContext(null);
export const useGlobalToast = () => useContext(ToastContext);

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Hide bottom nav on capture, detail, and search screens
  if (location.pathname === '/capture' || location.pathname.startsWith('/detail') || location.pathname === '/search') {
    return null;
  }

  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/search', icon: SearchIcon, label: 'Search' },
    { path: '/favs', icon: Heart, label: 'Favs' },
  ];

  return (
    <div className="bottom-nav">
      {navItems.map(({ path, icon: Icon, label }) => (
        <button 
          key={path}
          className={`bottom-nav-item ${location.pathname === path ? 'active' : ''}`}
          onClick={() => navigate(path)}
        >
          <Icon size={22} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

function App() {
  const { toast, showToast, hideToast } = useToast();

  return (
    <ToastContext.Provider value={showToast}>
      <HashRouter>
        <div className="screen-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/capture" element={<Capture />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favs" element={<Favourites />} />
          </Routes>
          <BottomNav />
          
          {/* Global Toast */}
          {toast && (
            <Toast 
              key={toast.key}
              message={toast.message} 
              type={toast.type} 
              onClose={hideToast} 
            />
          )}
        </div>
      </HashRouter>
    </ToastContext.Provider>
  );
}

export default App;
