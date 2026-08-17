# Changelog

All notable changes to this project will be documented in this file.

## [0.0.2] - Phase 2 (The List)

### Added
- **Search Screen**: Full-text search across idea body, character names, and tags with live filtering and highlighted matches.
- **Favourites Screen**: Dedicated view showing only hearted ideas with item count header.
- **Sort Options**: Sort ideas by newest, oldest, word count, or recently edited with a dropdown picker.
- **Filter Counts**: Filter pills now display the number of ideas in each category.
- **Edit Flow**: Tap the pencil icon on any idea to edit body, character name, and tags inline.
- **Delete Confirmation**: Custom modal dialog with backdrop blur instead of browser `confirm()`.
- **Swipe Actions**: Swipe cards right to favourite, left to delete (touch gesture).
- **Toast Notifications**: Lightweight animated toast system for save/favourite/delete confirmations.
- **Empty States**: Rich themed empty states with animated emoji for each screen and filter.
- **Word Count Display**: Cards now show word count; Detail screen shows count in monospace.
- **Last Edited Timestamp**: Detail screen shows when an idea was last modified.

### Changed
- **App Icon**: Replaced default Capacitor icon with custom STASH logo across all Android mipmap densities.
- **PWA Manifest**: Added `manifest.json` with proper icon references for "Add to Home Screen" installs.
- **FAB Button**: Now uses gradient background with enhanced shadow.
- **Capture Screen**: Refactored type toggle buttons with CSS classes; added disabled state to save button.
- **Stash Button**: Upgraded to gradient amber style with disabled state.

### Removed
- Unused scaffold files (`react.svg`, `vite.svg`, `hero.png`).
- Unused dependencies (`tailwind-merge`, `clsx`, `uuid`).

## [0.0.1] - Phase 1 (The Core)

### Added
- **Project Structure**: Initialized React + Vite workspace with Capacitor for Android native builds.
- **Design System**: Implemented adaptive day/night theme with custom CSS tokens. Automatically switches based on time of day (6 AM–7 PM light, else dark).
- **Typography**: Integrated Barlow Condensed (display), Inter (body), and JetBrains Mono (code) from Google Fonts.
- **Local Storage**: Built `useStorage` hook with `stash_v1` localStorage schema for persistent idea storage.
- **Home Screen**: Idea listing with filter pills (All, Novel Ideas, Characters, Favourites) and floating action button.
- **Capture Screen**: Full-screen idea capture with type selector (Novel/Character), auto-focus, tag input, and word count.
- **Detail Screen**: Idea detail view with favourite toggle, delete action, and tag display.
- **CI/CD**: GitHub Actions workflow for automated signed APK builds on push to `main`.
