import { useState, useEffect, useCallback } from 'react';

/**
 * Toast notification component
 * Usage: <Toast message="Saved!" type="success" onClose={() => setToast(null)} />
 */
export function Toast({ message, type = 'info', onClose, duration = 2500 }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    requestAnimationFrame(() => setVisible(true));
    
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onClose?.(), 300);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: { borderColor: 'var(--amber)', icon: '✓' },
    error: { borderColor: 'var(--danger)', icon: '✕' },
    info: { borderColor: 'var(--char-purple)', icon: 'ℹ' },
    fav: { borderColor: 'var(--amber)', icon: '♥' },
  };

  const { borderColor, icon } = typeStyles[type] || typeStyles.info;

  return (
    <div 
      className={`toast ${visible ? 'toast-visible' : ''} ${exiting ? 'toast-exit' : ''}`}
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      <span className="toast-icon" style={{ color: borderColor }}>{icon}</span>
      <span className="toast-message">{message}</span>
    </div>
  );
}

/**
 * Hook to manage toast state
 */
export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, key: Date.now() });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return { toast, showToast, hideToast };
}
