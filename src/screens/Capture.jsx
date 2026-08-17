import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorage } from '../hooks/useStorage';
import { useGlobalToast } from '../App';
import { X } from 'lucide-react';

export function Capture() {
  const navigate = useNavigate();
  const { addIdea } = useStorage();
  const showToast = useGlobalToast();
  
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
    
    showToast?.('Idea stashed!', 'success');
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
            className={`type-toggle ${type === 'novel' ? 'type-toggle-active-novel' : ''}`}
          >
            Novel Idea
          </button>
          <button
            onClick={() => setType('character')}
            className={`type-toggle ${type === 'character' ? 'type-toggle-active-char' : ''}`}
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
        
        <div style={{ marginTop: 16, color: 'var(--sub)', fontSize: 14, textAlign: 'right', fontFamily: "'JetBrains Mono', monospace" }}>
          {wordCount} words
        </div>
        
        <button 
          onClick={handleSave}
          className="stash-btn"
          disabled={!body.trim() && !charName.trim()}
        >
          Stash It
        </button>
      </div>
    </div>
  );
}
