import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorage } from '../hooks/useStorage';
import { X } from 'lucide-react';

export function Capture() {
  const navigate = useNavigate();
  const { addIdea } = useStorage();
  
  const [type, setType] = useState('novel');
  const [charName, setCharName] = useState('');
  const [body, setBody] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  
  const textareaRef = useRef(null);

  useEffect(() => {
    // Autofocus
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSave = () => {
    if (!body.trim() && !charName.trim()) return;

    const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0);
    
    addIdea({
      type,
      charName: type === 'character' ? charName : null,
      body,
      tags
    });
    
    navigate(-1);
  };

  const wordCount = body.trim().split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'var(--bg)' }} className="animate-entrance">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
        <button onClick={() => navigate(-1)} style={{ color: 'var(--sub)' }}>
          <X size={28} />
        </button>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          <button
            onClick={() => setType('novel')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: 8,
              backgroundColor: type === 'novel' ? 'var(--surface2)' : 'transparent',
              border: `1px solid ${type === 'novel' ? 'var(--amber)' : 'var(--border)'}`,
              color: type === 'novel' ? 'var(--amber)' : 'var(--sub)',
              fontWeight: 600
            }}
          >
            Novel Idea
          </button>
          <button
            onClick={() => setType('character')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: 8,
              backgroundColor: type === 'character' ? 'var(--surface2)' : 'transparent',
              border: `1px solid ${type === 'character' ? 'var(--char-purple)' : 'var(--border)'}`,
              color: type === 'character' ? 'var(--char-purple)' : 'var(--sub)',
              fontWeight: 600
            }}
          >
            Character
          </button>
        </div>

        {type === 'character' && (
          <input 
            type="text"
            className="invisible-input"
            placeholder="Character Name..."
            value={charName}
            onChange={e => setCharName(e.target.value)}
            style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: 'var(--char-purple)' }}
          />
        )}

        <textarea
          ref={textareaRef}
          className="invisible-input"
          placeholder="What's the idea?"
          value={body}
          onChange={e => setBody(e.target.value)}
          style={{ 
            flex: 1, 
            fontSize: 18, 
            lineHeight: 1.6, 
            resize: 'none',
            minHeight: '40vh'
          }}
        />

        <div style={{ marginTop: 24, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
          <input
            type="text"
            className="invisible-input"
            placeholder="Tags (comma separated)..."
            value={tagsInput}
            onChange={e => setTagsInput(e.target.value)}
            style={{ fontSize: 16 }}
          />
        </div>
        
        <div style={{ marginTop: 16, color: 'var(--sub)', fontSize: 14, textAlign: 'right' }}>
          {wordCount} words
        </div>
        
        <button 
          onClick={handleSave}
          style={{ 
            marginTop: 24,
            marginBottom: 16,
            width: '100%',
            color: '#000', 
            backgroundColor: 'var(--amber)',
            padding: '16px',
            borderRadius: 12,
            fontWeight: 'bold',
            fontSize: 18,
            boxShadow: '0 4px 12px rgba(232, 168, 56, 0.3)'
          }}
        >
          Stash It
        </button>
      </div>
    </div>
  );
}
