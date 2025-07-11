# App-1 - Host Application

This is the **host application** in the Module Federation setup. It exposes shared React components that can be consumed by other applications (like app-2).

## 🎯 Purpose

- **Exposes** the `Counter` component for use by other applications
- **Generates** the remote entry point (`remoteEntry.js`) for module federation
- **Shares** common dependencies (`react`, `react-dom`) with consuming applications

## 🏗️ Project Structure

```
app-1/
├── app/                    # Remix application directory
│   ├── entry.client.tsx   # Client entry point
│   ├── entry.server.tsx   # Server entry point
│   ├── root.tsx           # Root component
│   └── routes/            # Remix routes
├── components/            # Shared components
│   └── counter.tsx        # Counter component (exposed)
├── vite.config.ts         # Vite + Module Federation config
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🚀 Development

### Prerequisites

- Node.js >= 20.0.0
- pnpm (recommended)

### Installation

```bash
pnpm install
```

### Running in Development Mode

```bash
pnpm dev
```

The application will be available at: **http://localhost:5173**

### Building for Production

```bash
pnpm build
```

### Running Production Build

```bash
pnpm start
```

## 🔧 Module Federation Configuration

### Vite Configuration (`vite.config.ts`)

The application is configured to expose the Counter component:

```typescript
federation({
  name: 'app1',
  exposes: {
    './Counter': './components/counter.tsx',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
})
```

### Exposed Components

- **`./Counter`** - A React counter component with increment/decrement functionality
  - Location: `components/counter.tsx`
  - Features: State management, TypeScript support, Tailwind styling

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript type checking |

## 🎨 Styling

This application uses **Tailwind CSS** for styling:

- **Configuration:** `tailwind.config.ts`
- **CSS File:** `app/tailwind.css`
- **PostCSS:** `postcss.config.js`

## 🔍 Key Files

### Module Federation Setup
- `vite.config.ts` - Main configuration with federation plugin
- `components/counter.tsx` - Shared counter component

### Remix Application
- `app/root.tsx` - Root component with global styles
- `app/routes/_index.tsx` - Home page
- `app/entry.client.tsx` - Client-side entry point
- `app/entry.server.tsx` - Server-side entry point

### Configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts
- `tailwind.config.ts` - Tailwind CSS configuration

## 🐛 Troubleshooting

### Common Issues

1. **Module Federation Errors:**
   - Ensure the `@module-federation/vite` plugin is properly configured
   - Check that exposed components are correctly exported
   - Verify shared dependencies are properly configured

2. **Build Errors:**
   - Clear build directory: `rm -rf build/`
   - Reinstall dependencies: `pnpm install`
   - Check TypeScript errors: `pnpm typecheck`

3. **Development Server Issues:**
   - Check if port 5173 is available
   - Verify all dependencies are installed
   - Check console for error messages

### Debug Mode

Enable verbose logging:

```bash
DEBUG=vite:* pnpm dev
```

## 📚 Resources

- [Remix Documentation](https://remix.run/docs)
- [Module Federation Vite Plugin](https://github.com/module-federation/vite)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🔗 Related Applications

- **App-2** - Consumer application that imports components from this app
- **Root README** - Overall project documentation
