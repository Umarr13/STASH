# Changelog

All notable changes to this project will be documented in this file.

## [0.0.1] - Phase 1 (The Core)

### Added
- **Project Structure**: Initialized React + Vite workspace with Capacitor for Android native builds.
- **Design System**: Implemented Adaptive Day/Night theme Engine (auto-switches based on 6am/7pm).
- **Core State Management**: Added `useStorage` hook for offline-first persistent saving to `localStorage` (schema `stash_v1`).
- **Home Screen**: 
  - Sticky header with idea count and manual theme toggle.
  - Tab filters for 'All', 'Novel Ideas', 'Characters', and 'Favourites'.
  - Responsive idea cards with badges and relative timestamps.
  - Floating Action Button (FAB) for quick capture.
- **Capture Screen**: 
  - Full-screen distraction-free input area.
  - Live character/word counter.
  - Support for Novel Ideas and Character Types (with dynamic Name field).
  - Tags input.
- **Detail Screen**:
  - Full idea reading view.
  - Ability to favourite ideas.
  - Ability to securely delete ideas.
- **CI/CD**: Fully automated GitHub Actions workflow to build and sign Android APKs on push to main.
