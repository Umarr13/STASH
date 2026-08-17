import { useParams, useNavigate } from 'react-router-dom';
import { useStorage } from '../hooks/useStorage';
import { ArrowLeft, Heart, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ideas, updateIdea, deleteIdea } = useStorage();
  
  const idea = ideas.find(i => i.id === Number(id));

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
    if (window.confirm("Are you sure you want to delete this idea? This cannot be undone.")) {
      deleteIdea(idea.id);
      navigate('/');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'var(--bg)' }} className="animate-entrance">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
        <button onClick={() => navigate(-1)} style={{ color: 'var(--sub)' }}>
          <ArrowLeft size={28} />
        </button>
        <div style={{ display: 'flex', gap: 16 }}>
          <button onClick={toggleFav} style={{ color: idea.fav ? 'var(--amber)' : 'var(--sub)' }}>
            <Heart size={28} fill={idea.fav ? 'var(--amber)' : 'none'} />
          </button>
          <button onClick={handleDelete} style={{ color: 'var(--danger)' }}>
            <Trash2 size={28} />
          </button>
        </div>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span className={`badge ${idea.type}`}>{idea.type.toUpperCase()}</span>
          <span style={{ color: 'var(--sub)', fontSize: 14 }}>
            {format(new Date(idea.date), 'MMM d, yyyy - h:mm a')}
          </span>
        </div>

        {idea.type === 'character' && idea.charName && (
          <h2 style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 24, color: 'var(--char-purple)' }}>
            {idea.charName}
          </h2>
        )}

        <div style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text)', whiteSpace: 'pre-wrap', marginBottom: 40 }}>
          {idea.body}
        </div>

        {idea.tags && idea.tags.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
            <h4 style={{ color: 'var(--sub)', marginBottom: 12, fontSize: 14, textTransform: 'uppercase' }}>Tags</h4>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {idea.tags.map(tag => (
                <span key={tag} style={{ fontSize: 14, color: 'var(--text)', backgroundColor: 'var(--surface2)', padding: '6px 12px', borderRadius: 6 }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
