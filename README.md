# 5levels - Problem Solving Framework

A React TypeScript application that helps you work through problems using a structured 5-level thinking framework, deployed on Cloudflare Workers.

🚀 **Live Demo**: [https://5levels.coscient.workers.dev](https://5levels.coscient.workers.dev)

## What is 5levels?

The 5levels framework helps you approach problems systematically:

1. **Level 1**: Problem Identification - Clearly state the problem
2. **Level 2**: Problem Recognition - Diagnose the root cause
3. **Level 3**: Multiple Solutions - Research and propose several solutions
4. **Level 4**: Recommended Solution - Analyze options and recommend the best approach
5. **Level 5**: Solution Implemented - Report on results and learnings

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Radix UI components
- **PDF Generation**: jsPDF
- **Deployment**: Cloudflare Workers with static assets
- **Development**: ESLint + TypeScript strict mode

## Features

- ✨ Interactive problem-solving framework with 5 structured levels
- 📱 Responsive design that works on all devices
- 📄 Export your problem-solving process as PDF
- 🎨 Modern UI with Tailwind CSS and Radix UI components
- ⚡ Fast global delivery via Cloudflare Workers edge network
- 💾 Local storage to save your progress

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Cloudflare account (for deployment)

### Local Development

```bash
# Install dependencies
npm install

# Start development server (React app)
npm run dev

# Or start Workers development server
npx wrangler dev
```

### Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment to Cloudflare Workers

```bash
# Deploy to Cloudflare Workers
npx wrangler deploy
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (Radix UI)
│   └── SimpleHeader.tsx # App header
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── App.tsx             # Main application component
├── main.tsx            # React entry point
└── worker.ts           # Cloudflare Workers entry point
```

## How to Use

1. **Visit the app**: Go to [https://5levels.coscient.workers.dev](https://5levels.coscient.workers.dev)
2. **Choose your level**: Start with Level 1 or jump to any level
3. **Fill in your thoughts**: Use the text areas to work through each level
4. **Export as PDF**: Generate a PDF of your complete problem-solving process
5. **Save locally**: Your progress is automatically saved in your browser

## Cloudflare Workers Configuration

This project uses Cloudflare Workers with static assets to serve the React application globally. The Workers entry point (`src/worker.ts`) handles:

- Static asset serving from the `dist` directory
- SPA routing (serving `index.html` for all routes)
- Future API endpoints (extensible)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
