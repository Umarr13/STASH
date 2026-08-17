import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStorage } from '../hooks/useStorage';
import { ArrowLeft, Search as SearchIcon, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function Search() {
  const navigate = useNavigate();
  const { ideas } = useStorage();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Autofocus search input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const normalizedQuery = query.toLowerCase().trim();

  const results = normalizedQuery.length === 0 ? [] : ideas.filter(idea => {
    const bodyMatch = idea.body?.toLowerCase().includes(normalizedQuery);
    const nameMatch = idea.charName?.toLowerCase().includes(normalizedQuery);
    const tagMatch = idea.tags?.some(tag => tag.toLowerCase().includes(normalizedQuery));
    return bodyMatch || nameMatch || tagMatch;
  });

  // Highlight matched text
  const highlightText = (text, highlight) => {
    if (!highlight || !text) return text;
    const parts = text.split(new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? <mark key={i} className="search-highlight">{part}</mark>
        : part
    );
  };

  return (
    <div className="content-scroll animate-entrance">
      {/* Search Bar */}
      <div className="search-bar">
        <button onClick={() => navigate(-1)} className="search-back-btn">
          <ArrowLeft size={22} />
        </button>
        <SearchIcon size={18} className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder="Search ideas, characters, tags..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {query && (
          <button onClick={() => setQuery('')} className="search-clear-btn">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Results */}
      {normalizedQuery.length === 0 ? (
        <div className="search-empty-state">
          <div className="search-empty-icon">🔍</div>
          <p className="search-empty-title">Find your stashed ideas</p>
          <p className="search-empty-sub">Search by content, character name, or tag</p>
        </div>
      ) : results.length === 0 ? (
        <div className="search-empty-state animate-entrance">
          <div className="search-empty-icon">🤷</div>
          <p className="search-empty-title">No matches found</p>
          <p className="search-empty-sub">Try different keywords or check your spelling</p>
        </div>
      ) : (
        <>
          <div className="search-results-count">
            {results.length} result{results.length !== 1 ? 's' : ''}
          </div>
          <div className="search-results">
            {results.map((idea, index) => (
              <div 
                key={idea.id}
                className="idea-card animate-entrance"
                style={{ animationDelay: `${index * 0.04}s` }}
                onClick={() => navigate(`/detail/${idea.id}`)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span className={`badge ${idea.type}`}>{idea.type.toUpperCase()}</span>
                  <span style={{ color: 'var(--sub)', fontSize: 12 }}>
                    {formatDistanceToNow(new Date(idea.date), { addSuffix: true })}
                  </span>
                </div>
                
                {idea.type === 'character' && idea.charName && (
                  <h3 style={{ marginBottom: 8, color: 'var(--char-purple)', fontSize: 16 }}>
                    {highlightText(idea.charName, normalizedQuery)}
                  </h3>
                )}
                
                <p style={{ 
                  display: '-webkit-box', 
                  WebkitLineClamp: 2, 
                  WebkitBoxOrient: 'vertical', 
                  overflow: 'hidden',
                  lineHeight: 1.5,
                  color: 'var(--text)',
                  fontSize: 14
                }}>
                  {highlightText(idea.body, normalizedQuery)}
                </p>

                {idea.tags && idea.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                    {idea.tags.map(tag => (
                      <span key={tag} style={{ 
                        fontSize: 11, 
                        color: tag.toLowerCase().includes(normalizedQuery) ? 'var(--amber)' : 'var(--sub)', 
                        backgroundColor: 'var(--surface2)', 
                        padding: '2px 8px', 
                        borderRadius: 4 
                      }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
