# Xinx Music v2.0

A modern music streaming web application built with Nuxt 4, featuring a custom audio player with waveform visualization. This is the second version of the Xinx Music platform, showcasing the electronic music catalog of my music as the artist Xinx.

## Features

- **Modern Audio Player**: Custom-built audio player with play/pause, next/previous, shuffle, and repeat functionality
- **Waveform Visualization**: Real-time audio waveform display using WaveSurfer.js
- **Responsive Design**: Mobile-first design with TailwindCSS for optimal viewing on all devices
- **Rich Music Catalog**: Comprehensive collection of Xinx's electronic music including albums, singles, and remixes
- **Album Artwork**: High-quality album artwork for each track
- **Vue 3 Composition API**: Built with the latest Vue 3 features and Composition API
- **TypeScript Support**: Full TypeScript integration for type safety
- **Server-Side Rendering**: Nuxt 4 for optimal SEO and performance

## Tech Stack

### Core Framework
- **Nuxt 4**: Meta-framework for Vue.js with SSR capabilities
- **Vue 3**: Progressive JavaScript framework with Composition API
- **TypeScript**: Type-safe JavaScript development

### Styling & UI
- **TailwindCSS v4**: Utility-first CSS framework with the latest version
- **@tailwindcss/vite**: Vite plugin for TailwindCSS integration
- **@nuxt/fonts**: Font optimization and management

### Audio & Media
- **WaveSurfer.js v7**: Audio waveform visualization library
- **Custom Audio Components**: Purpose-built audio player components

### Development Tools
- **ESLint**: Code linting with @nuxt/eslint integration
- **Prettier**: Code formatting with TailwindCSS plugin
- **Vite**: Fast build tool and development server

## Project Structure

```
├── app/
│   ├── app.vue                    # Root application component
│   ├── assets/
│   │   └── css/
│   │       └── tailwind.css       # TailwindCSS styles
│   ├── components/
│   │   ├── AudioPlayer.vue        # Main audio player component
│   │   ├── MusicPlayer.vue        # Music player interface
│   │   └── icon/                  # SVG icon components
│   │       ├── Back.vue
│   │       ├── Forward.vue
│   │       ├── Play.vue
│   │       ├── Pause.vue
│   │       ├── Shuffle.vue
│   │       ├── Repeat.vue
│   │       └── ...
│   └── utils/
│       └── music.ts               # Music data and TypeScript types
├── public/
│   ├── artwork/                   # Album artwork images
│   ├── font/                      # Custom fonts (GeistMono)
│   └── favicon.ico
├── nuxt.config.ts                 # Nuxt configuration
├── package.json                   # Dependencies and scripts
└── tsconfig.json                  # TypeScript configuration
```

## Music Catalog

The application features an extensive catalog of Xinx's electronic music:

### Albums
- **End of Time** (5 tracks)
- **Close Your Eyes and Listen** (5 tracks)

### Singles
- 27+ original electronic tracks covering various subgenres
- Includes tracks like "Air Raid", "Brain Storm", "Crazy Clown Factory", "Insecticide", and many more

### Remixes
- Official remixes of tracks by other artists
- Notable remixes include "Requiem for a Dream", "Halo 4 - Nemesis", and "Oxymoron"

## Installation

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Configuration

### Nuxt Configuration
The project uses modern Nuxt 4 configuration with:
- TailwindCSS integration via Vite plugin
- ESLint and Fonts modules
- Development tools enabled

### TypeScript
Full TypeScript support with custom type definitions for the music catalog structure.

### Audio Integration
WaveSurfer.js is integrated for advanced audio visualization and playback controls.

## License

This project is a personal music portfolio website for Xinx Music.

## Links

- [Nuxt 4 Documentation](https://nuxt.com/docs/getting-started/introduction)
- [Vue 3 Documentation](https://v3.vuejs.org/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [WaveSurfer.js Documentation](https://wavesurfer.xyz/)

For more information about deployment, check out the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment).
