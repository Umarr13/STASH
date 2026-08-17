import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorage } from '../hooks/useStorage';
import { useTheme } from '../theme.jsx';
import { Plus, Moon, Sun, ChevronDown, Heart, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const SORT_OPTIONS = [
  { key: 'newest', label: 'Newest First' },
  { key: 'oldest', label: 'Oldest First' },
  { key: 'words', label: 'Most Words' },
  { key: 'edited', label: 'Recently Edited' },
];

function SwipeableCard({ idea, index, navigate, onFav, onDelete }) {
  const cardRef = useRef(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = useCallback((e) => {
    startX.current = e.touches[0].clientX;
    currentX.current = 0;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging.current || !cardRef.current) return;
    const diff = e.touches[0].clientX - startX.current;
    currentX.current = diff;
    
    // Clamp the movement
    const clamped = Math.max(-100, Math.min(100, diff));
    cardRef.current.style.transform = `translateX(${clamped}px)`;
    cardRef.current.style.transition = 'none';
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current || !cardRef.current) return;
    isDragging.current = false;

    const threshold = 70;
    
    if (currentX.current > threshold) {
      // Swiped right → Toggle favourite
      onFav(idea.id);
      cardRef.current.style.transition = 'transform 0.3s ease';
      cardRef.current.style.transform = 'translateX(0)';
    } else if (currentX.current < -threshold) {
      // Swiped left → Delete
      onDelete(idea.id);
      cardRef.current.style.transition = 'transform 0.3s ease';
      cardRef.current.style.transform = 'translateX(0)';
    } else {
      // Snap back
      cardRef.current.style.transition = 'transform 0.3s ease';
      cardRef.current.style.transform = 'translateX(0)';
    }
  }, [idea.id, onFav, onDelete]);

  return (
    <div className="swipe-container">
      <div className="swipe-action-left">
        <Heart size={20} />
        <span>Fav</span>
      </div>
      <div className="swipe-action-right">
        <Trash2 size={20} />
        <span>Delete</span>
      </div>
      <div 
        ref={cardRef}
        className="idea-card swipeable animate-entrance"
        style={{ animationDelay: `${index * 0.05}s` }}
        onClick={() => navigate(`/detail/${idea.id}`)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className={`badge ${idea.type}`}>{idea.type.toUpperCase()}</span>
            {idea.fav && <Heart size={14} fill="var(--amber)" style={{ color: 'var(--amber)' }} />}
          </div>
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

        {idea.wordCount > 0 && (
          <div style={{ marginTop: 10, fontSize: 11, color: 'var(--mut)', fontFamily: "'JetBrains Mono', monospace" }}>
            {idea.wordCount} words
          </div>
        )}
      </div>
    </div>
  );
}

export function Home() {
  const navigate = useNavigate();
  const { ideas, updateIdea, deleteIdea } = useStorage();
  const { isDark, setThemeMode } = useTheme();
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('newest');
  const [showSort, setShowSort] = useState(false);

  const filterCounts = {
    'All': ideas.length,
    'Novel Ideas': ideas.filter(i => i.type === 'novel').length,
    'Characters': ideas.filter(i => i.type === 'character').length,
    'Favourites': ideas.filter(i => i.fav).length,
  };

  const filteredIdeas = ideas
    .filter(idea => {
      if (filter === 'Novel Ideas') return idea.type === 'novel';
      if (filter === 'Characters') return idea.type === 'character';
      if (filter === 'Favourites') return idea.fav;
      return true;
    })
    .sort((a, b) => {
      switch (sort) {
        case 'oldest': return new Date(a.date) - new Date(b.date);
        case 'words': return (b.wordCount || 0) - (a.wordCount || 0);
        case 'edited': return new Date(b.lastEdited || b.date) - new Date(a.lastEdited || a.date);
        default: return new Date(b.date) - new Date(a.date); // newest
      }
    });

  const handleSwipeFav = useCallback((id) => {
    const idea = ideas.find(i => i.id === id);
    if (idea) updateIdea(id, { fav: !idea.fav });
  }, [ideas, updateIdea]);

  const handleSwipeDelete = useCallback((id) => {
    deleteIdea(id);
  }, [deleteIdea]);

  const sortLabel = SORT_OPTIONS.find(o => o.key === sort)?.label || 'Newest First';

  return (
    <div className="content-scroll">
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 20, 
        position: 'sticky', 
        top: 0, 
        backgroundColor: 'var(--bg)', 
        zIndex: 5, 
        paddingBottom: 12, 
        paddingTop: 16 
      }}>
        <h1 className="font-display" style={{ fontSize: 32, margin: 0, letterSpacing: 1 }}>STASH</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="font-display" style={{ color: 'var(--sub)', fontSize: 20 }}>{ideas.length}</span>
          <button onClick={() => setThemeMode(isDark ? 'light' : 'dark')} style={{ color: 'var(--sub)' }}>
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </header>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 12, marginBottom: 4, scrollbarWidth: 'none' }}>
        {['All', 'Novel Ideas', 'Characters', 'Favourites'].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-pill ${filter === f ? 'filter-pill-active' : ''}`}
          >
            {f}
            <span className="filter-pill-count">{filterCounts[f]}</span>
          </button>
        ))}
      </div>

      {/* Sort dropdown */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <button 
          className="sort-trigger"
          onClick={() => setShowSort(!showSort)}
        >
          <span>{sortLabel}</span>
          <ChevronDown size={16} style={{ transform: showSort ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>
        {showSort && (
          <div className="sort-dropdown animate-entrance">
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.key}
                className={`sort-option ${sort === opt.key ? 'sort-option-active' : ''}`}
                onClick={() => { setSort(opt.key); setShowSort(false); }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {filteredIdeas.length === 0 ? (
          <div className="empty-state animate-entrance">
            <div className="empty-state-icon">
              {filter === 'Favourites' ? '💛' : filter === 'Characters' ? '🎭' : '📝'}
            </div>
            <p className="empty-state-title">
              {filter === 'All' ? 'Nothing here yet' : `No ${filter.toLowerCase()}`}
            </p>
            <p className="empty-state-sub">
              {filter === 'All' 
                ? 'Tap the + button to stash a new idea' 
                : filter === 'Favourites' 
                  ? 'Heart your best ideas to see them here'
                  : `Create a ${filter === 'Characters' ? 'character' : 'novel idea'} to get started`
              }
            </p>
          </div>
        ) : (
          filteredIdeas.map((idea, index) => (
            <SwipeableCard 
              key={idea.id}
              idea={idea}
              index={index}
              navigate={navigate}
              onFav={handleSwipeFav}
              onDelete={handleSwipeDelete}
            />
          ))
        )}
      </div>

      <button className="fab" onClick={() => navigate('/capture')}>
        <Plus size={28} />
      </button>
    </div>
  );
}
