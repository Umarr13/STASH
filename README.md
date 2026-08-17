# STASH 🎒

Stash is a mobile-first idea capture app designed specifically for fiction writers. Writers can instantly stash novel ideas, first lines, and character concepts before they disappear, and later export them as fully structured documents to continue writing on a PC.

## Features (v0.0.2)

- 📝 **Instant Capture** — Stash novel ideas and characters in seconds with a full-screen editor
- 🔍 **Full-Text Search** — Search across all ideas, character names, and tags with highlighted matches
- 💛 **Favourites** — Heart your best ideas and find them in a dedicated Favourites tab
- 🔄 **Sort & Filter** — Sort by newest, oldest, word count, or recently edited
- ✏️ **Inline Editing** — Edit any idea directly in the detail view
- 👆 **Swipe Actions** — Swipe right to favourite, left to delete
- 🌙 **Adaptive Theme** — Automatic day/night mode that follows your clock (6 AM–7 PM → light)
- 📱 **Offline First** — All data stored locally in `localStorage`, no account needed
- 🏷️ **Tags** — Organize ideas with comma-separated tags
- 🔔 **Toast Notifications** — Animated confirmations for save, delete, and favourite actions

## Tech Stack

- **React** — UI framework (minimal dependencies)
- **Vite** — Build tool
- **Capacitor** — Native Android wrapper
- **localStorage** — Persistent data storage (all phases)
- **GitHub Actions** — Automated signed APK builds

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Sync with Android
npx cap sync android
```

## Download

Check the [Releases](https://github.com/Umarr13/STASH/releases) page for the latest APK.

## Roadmap

| Phase | Version | Status |
|-------|---------|--------|
| Phase 1 — The Core | 0.0.1 | ✅ Complete |
| Phase 2 — The List | 0.0.2 | ✅ Complete |
| Phase 3 — Character Builder | 0.0.3 | 🔲 Planned |
| Phase 4 — Voice & Rich Input | 0.0.4 | 🔲 Planned |
| Phase 5 — Notebooks | 0.0.5 | 🔲 Planned |

## License

All rights reserved © 2026 Omar Rashid Lone
