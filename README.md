# STASH 🎒

Stash is a mobile-first idea capture app designed specifically for fiction writers. Writers can instantly stash novel ideas, first lines, and character concepts before they disappear, and later export them as fully structured documents to continue writing on their PC.

Built as an offline-first app using React and Capacitor, it features dynamic adaptive day/night theming, zero-friction captures, and persistent local storage.

## Features

- **Blazing Fast Capture**: Full-screen capture for Novel Ideas, Characters, and First Lines.
- **Adaptive Theming**: Beautiful Day/Night modes that transition seamlessly based on device time.
- **Offline First**: All ideas are saved securely to your device's local storage.
- **Dynamic Filtering**: Quickly filter by type or favourites.
- *(Coming Soon)* Sync via Supabase, Markdown/Word Exports, and Idea Linking.

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Vanilla CSS (CSS Variables for tokens)
- **Native Wrapper**: Capacitor (Android)
- **State/Storage**: React Hooks + LocalStorage
- **CI/CD**: GitHub Actions (Automated APK builds)

## How to Build Locally

### Prerequisites
- Node.js (v18+)
- Android Studio (for native Android testing)

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/Umarr13/STASH.git
   cd STASH
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Run the development server
   ```bash
   npm run dev
   ```
4. Build for Android
   ```bash
   npm run build
   npx cap sync android
   npx cap open android
   ```

## Downloads
Automated APK builds are attached to [GitHub Releases](../../releases) whenever code is pushed to `main`.
