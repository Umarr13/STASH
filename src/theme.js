import { createContext, useContext, useEffect, useState } from 'react';

// Design system tokens as requested
export const tokens = {
  night: {
    '--bg': '#0C0C0C',
    '--surface': '#161616',
    '--surface2': '#1E1E1E',
    '--border': '#2A2A2A',
    '--text': '#F0EEE8',
    '--sub': '#666666',
    '--mut': '#3A3A3A',
    '--amber': '#E8A838',
    '--amber-dim': 'rgba(232,168,56,0.12)',
    '--char-purple': '#A070E0',
    '--char-purple-dim': 'rgba(160,112,224,0.12)',
    '--danger': '#DC3232',
  },
  day: {
    '--bg': '#F8F6F1',
    '--surface': '#FFFFFF',
    '--surface2': '#F2F0EB',
    '--border': '#E8E4DC',
    '--text': '#1A1814',
    '--sub': '#9A9488',
    '--mut': '#E0DCD4',
    '--amber': '#E8A838',
    '--amber-dim': 'rgba(232,168,56,0.12)',
    '--char-purple': '#A070E0',
    '--char-purple-dim': 'rgba(160,112,224,0.12)',
    '--danger': '#DC3232',
  }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('auto'); // 'auto', 'dark', 'light'
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Determine active theme
    let activeDark = true;
    if (themeMode === 'auto') {
      const hour = new Date().getHours();
      // 6am - 7pm (19:00) -> light mode, otherwise dark mode
      activeDark = hour < 6 || hour >= 19;
    } else {
      activeDark = themeMode === 'dark';
    }
    
    setIsDark(activeDark);
    
    // Apply tokens
    const activeTokens = activeDark ? tokens.night : tokens.day;
    const root = document.documentElement;
    
    Object.entries(activeTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
