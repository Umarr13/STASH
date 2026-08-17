import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStorage } from '../hooks/useStorage';
import { ArrowLeft, Heart, Trash2, Edit3, Check, X } from 'lucide-react';
import { format } from 'date-fns';

export function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ideas, updateIdea, deleteIdea } = useStorage();
  
  const idea = ideas.find(i => i.id === Number(id));

  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState('');
  const [editCharName, setEditCharName] = useState('');
  const [editTags, setEditTags] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (idea) {
      setEditBody(idea.body || '');
      setEditCharName(idea.charName || '');
      setEditTags(idea.tags ? idea.tags.join(', ') : '');
    }
  }, [idea]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      // Place cursor at end
      textareaRef.current.selectionStart = textareaRef.current.value.length;
    }
  }, [isEditing]);

  if (!idea) {
    return (
      <div style={{ padding: 20, color: 'var(--sub)' }}>
        Idea not found. <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const toggleFav = () => {
    updateIdea(idea.id, { fav: !idea.fav });
  };

  const handleDelete = () => {
    deleteIdea(idea.id);
    navigate('/');
  };

  const handleSaveEdit = () => {
    const tags = editTags.split(',').map(t => t.trim()).filter(t => t.length > 0);
    updateIdea(idea.id, {
      body: editBody,
      charName: idea.type === 'character' ? editCharName : idea.charName,
      tags
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditBody(idea.body || '');
    setEditCharName(idea.charName || '');
    setEditTags(idea.tags ? idea.tags.join(', ') : '');
    setIsEditing(false);
  };

  const wordCount = (isEditing ? editBody : idea.body || '').trim().split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'var(--bg)' }} className="animate-entrance">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
        <button onClick={() => navigate(-1)} style={{ color: 'var(--sub)' }}>
          <ArrowLeft size={28} />
        </button>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {isEditing ? (
            <>
              <button onClick={handleCancelEdit} style={{ color: 'var(--sub)' }}>
                <X size={24} />
              </button>
              <button onClick={handleSaveEdit} className="detail-save-btn">
                <Check size={20} />
                <span>Save</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} style={{ color: 'var(--sub)' }}>
                <Edit3 size={24} />
              </button>
              <button onClick={toggleFav} style={{ color: idea.fav ? 'var(--amber)' : 'var(--sub)' }}>
                <Heart size={24} fill={idea.fav ? 'var(--amber)' : 'none'} />
              </button>
              <button onClick={() => setShowDeleteConfirm(true)} style={{ color: 'var(--danger)' }}>
                <Trash2 size={24} />
              </button>
            </>
          )}
        </div>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span className={`badge ${idea.type}`}>{idea.type.toUpperCase()}</span>
          <span style={{ color: 'var(--sub)', fontSize: 14 }}>
            {format(new Date(idea.date), 'MMM d, yyyy - h:mm a')}
          </span>
        </div>

        {idea.type === 'character' && (
          isEditing ? (
            <input 
              type="text"
              className="invisible-input"
              placeholder="Character Name..."
              value={editCharName}
              onChange={e => setEditCharName(e.target.value)}
              style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: 'var(--char-purple)' }}
            />
          ) : (
            idea.charName && (
              <h2 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: 'var(--char-purple)' }}>
                {idea.charName}
              </h2>
            )
          )
        )}

        {isEditing ? (
          <textarea
            ref={textareaRef}
            className="invisible-input"
            value={editBody}
            onChange={e => setEditBody(e.target.value)}
            style={{ 
              fontSize: 18, 
              lineHeight: 1.6, 
              resize: 'none',
              minHeight: '40vh',
              color: 'var(--text)',
              whiteSpace: 'pre-wrap'
            }}
          />
        ) : (
          <div style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text)', whiteSpace: 'pre-wrap', marginBottom: 40 }}>
            {idea.body}
          </div>
        )}

        {/* Word count */}
        <div style={{ 
          color: 'var(--sub)', 
          fontSize: 13, 
          textAlign: 'right', 
          marginTop: 12, 
          marginBottom: 24,
          fontFamily: "'JetBrains Mono', monospace"
        }}>
          {wordCount} words
        </div>

        {/* Tags section */}
        {isEditing ? (
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
            <h4 style={{ color: 'var(--sub)', marginBottom: 8, fontSize: 13, textTransform: 'uppercase' }}>Tags</h4>
            <input
              type="text"
              className="invisible-input"
              placeholder="Tags (comma separated)..."
              value={editTags}
              onChange={e => setEditTags(e.target.value)}
              style={{ fontSize: 16 }}
            />
          </div>
        ) : (
          idea.tags && idea.tags.length > 0 && (
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
              <h4 style={{ color: 'var(--sub)', marginBottom: 12, fontSize: 13, textTransform: 'uppercase' }}>Tags</h4>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {idea.tags.map(tag => (
                  <span key={tag} style={{ fontSize: 14, color: 'var(--text)', backgroundColor: 'var(--surface2)', padding: '6px 12px', borderRadius: 6 }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )
        )}

        {/* Last edited */}
        {idea.lastEdited && idea.lastEdited !== idea.date && (
          <div style={{ 
            marginTop: 24, 
            paddingTop: 16, 
            borderTop: '1px solid var(--border)', 
            color: 'var(--sub)', 
            fontSize: 12,
            fontStyle: 'italic'
          }}>
            Last edited: {format(new Date(idea.lastEdited), 'MMM d, yyyy - h:mm a')}
          </div>
        )}
      </div>

      {/* Delete Confirmation Overlay */}
      {showDeleteConfirm && (
        <div className="delete-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="delete-modal animate-entrance" onClick={e => e.stopPropagation()}>
            <div className="delete-modal-icon">🗑️</div>
            <h3 className="delete-modal-title">Delete this idea?</h3>
            <p className="delete-modal-sub">This action cannot be undone.</p>
            <div className="delete-modal-actions">
              <button className="delete-modal-cancel" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
              <button className="delete-modal-confirm" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
