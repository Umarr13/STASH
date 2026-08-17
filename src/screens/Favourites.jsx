import { useNavigate } from 'react-router-dom';
import { useStorage } from '../hooks/useStorage';
import { Heart } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function Favourites() {
  const navigate = useNavigate();
  const { ideas } = useStorage();
  
  const favIdeas = ideas.filter(idea => idea.fav);

  return (
    <div className="content-scroll">
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 24, 
        position: 'sticky', 
        top: 0, 
        backgroundColor: 'var(--bg)', 
        zIndex: 5, 
        paddingBottom: 16, 
        paddingTop: 16 
      }}>
        <h1 className="font-display" style={{ fontSize: 28, margin: 0, letterSpacing: 1 }}>
          <Heart size={22} fill="var(--amber)" style={{ color: 'var(--amber)', marginRight: 10, verticalAlign: 'middle' }} />
          Favourites
        </h1>
        <span className="font-display" style={{ color: 'var(--sub)', fontSize: 20 }}>{favIdeas.length}</span>
      </header>

      {favIdeas.length === 0 ? (
        <div className="empty-state animate-entrance">
          <div className="empty-state-icon">💛</div>
          <p className="empty-state-title">No favourites yet</p>
          <p className="empty-state-sub">Tap the heart icon on any idea to add it here</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {favIdeas.map((idea, index) => (
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
          ))}
        </div>
      )}
    </div>
  );
}
