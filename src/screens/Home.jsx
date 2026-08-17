import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorage } from '../hooks/useStorage';
import { useTheme } from '../theme';
import { Plus, Moon, Sun } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function Home() {
  const navigate = useNavigate();
  const { ideas } = useStorage();
  const { isDark, setThemeMode } = useTheme();
  const [filter, setFilter] = useState('All'); // All, Novel Ideas, Characters, Favourites

  const filteredIdeas = ideas.filter(idea => {
    if (filter === 'Novel Ideas') return idea.type === 'novel';
    if (filter === 'Characters') return idea.type === 'character';
    if (filter === 'Favourites') return idea.fav;
    return true;
  });

  return (
    <div className="content-scroll">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, position: 'sticky', top: 0, backgroundColor: 'var(--bg)', zIndex: 5, paddingBottom: 16, paddingTop: 16 }}>
        <h1 className="font-display" style={{ fontSize: 32, margin: 0, letterSpacing: 1 }}>STASH</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="font-display" style={{ color: 'var(--sub)', fontSize: 20 }}>{ideas.length}</span>
          <button onClick={() => setThemeMode(isDark ? 'light' : 'dark')} style={{ color: 'var(--sub)' }}>
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 16, marginBottom: 16, scrollbarWidth: 'none' }}>
        {['All', 'Novel Ideas', 'Characters', 'Favourites'].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '6px 16px',
              borderRadius: 20,
              backgroundColor: filter === f ? 'var(--text)' : 'transparent',
              color: filter === f ? 'var(--bg)' : 'var(--sub)',
              border: `1px solid ${filter === f ? 'transparent' : 'var(--border)'}`,
              whiteSpace: 'nowrap',
              fontWeight: 500
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {filteredIdeas.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--sub)', marginTop: 60 }} className="animate-entrance">
            <p style={{ fontSize: 18, marginBottom: 8 }}>Nothing here yet.</p>
            <p style={{ fontSize: 14 }}>Tap the + button to stash a new {filter !== 'All' ? filter.toLowerCase() : 'idea'}.</p>
          </div>
        ) : (
          filteredIdeas.map((idea, index) => (
            <div 
              key={idea.id} 
              className="idea-card animate-entrance"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => navigate(`/detail/${idea.id}`)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span className={`badge ${idea.type}`}>{idea.type.toUpperCase()}</span>
                <span style={{ color: 'var(--sub)', fontSize: 12 }}>
                  {formatDistanceToNow(new Date(idea.date), { addSuffix: true })}
                </span>
              </div>
              
              {idea.type === 'character' && idea.charName && (
                <h3 style={{ marginBottom: 8, color: 'var(--char-purple)' }}>{idea.charName}</h3>
              )}
              
              <p style={{ 
                display: '-webkit-box', 
                WebkitLineClamp: 3, 
                WebkitBoxOrient: 'vertical', 
                overflow: 'hidden',
                lineHeight: 1.5,
                color: 'var(--text)'
              }}>
                {idea.body}
              </p>

              {idea.tags && idea.tags.length > 0 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                  {idea.tags.map(tag => (
                    <span key={tag} style={{ fontSize: 12, color: 'var(--sub)', backgroundColor: 'var(--surface2)', padding: '2px 8px', borderRadius: 4 }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <button className="fab" onClick={() => navigate('/capture')}>
        <Plus size={28} />
      </button>
    </div>
  );
}
