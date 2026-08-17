import { useState, useEffect } from 'react';

const STORAGE_KEY = 'stash_v1';

export const useStorage = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse Stash data', e);
      }
    }
    // Default initial schema
    return {
      ideas: [],
      notebooks: [],
      settings: {
        themeOverride: 'auto',
        fontSize: 'medium',
        streakCount: 0,
        lastActiveDate: new Date().toISOString(),
        totalIdeas: 0,
        supabaseConnected: false
      }
    };
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addIdea = (ideaInput) => {
    const newIdea = {
      id: Date.now(),
      type: ideaInput.type || 'novel', // 'novel' | 'character' | 'firstline'
      body: ideaInput.body || '',
      charName: ideaInput.charName || null,
      charAge: null,
      charAppearance: null,
      charMotivation: null,
      charArc: null,
      tags: ideaInput.tags || [],
      fav: false,
      pinned: false,
      archived: false,
      rating: null,
      note: null,
      linkedIds: [],
      notebookId: null,
      plotStatus: null,
      voiceNoteUri: null,
      wordCount: (ideaInput.body || '').trim().split(/\s+/).filter(w => w.length > 0).length,
      date: new Date().toISOString(),
      lastEdited: new Date().toISOString(),
      exportInclude: true
    };

    setData(prev => ({
      ...prev,
      ideas: [newIdea, ...prev.ideas]
    }));
  };

  const updateIdea = (id, updates) => {
    setData(prev => ({
      ...prev,
      ideas: prev.ideas.map(idea => 
        idea.id === id 
          ? { 
              ...idea, 
              ...updates, 
              lastEdited: new Date().toISOString(),
              wordCount: updates.body !== undefined 
                ? updates.body.trim().split(/\s+/).filter(w => w.length > 0).length 
                : idea.wordCount
            } 
          : idea
      )
    }));
  };

  const deleteIdea = (id) => {
    setData(prev => ({
      ...prev,
      ideas: prev.ideas.filter(idea => idea.id !== id)
    }));
  };
  
  const updateSettings = (updates) => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...updates }
    }));
  };

  return {
    data,
    ideas: data.ideas,
    settings: data.settings,
    addIdea,
    updateIdea,
    deleteIdea,
    updateSettings
  };
};
