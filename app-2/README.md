# App-2 - Consumer Application

This is the **consumer application** in the Module Federation setup. It imports and uses React components from the host application (app-1).

## 🎯 Purpose

- **Consumes** the `Counter` component from app-1
- **Demonstrates** how to use remote components in a Remix application
- **Shows** TypeScript integration with remote modules

## 🏗️ Project Structure

```
app-2/
├── app/                    # Remix application directory
│   ├── components/        # Local components
│   │   └── ClientOnly.tsx # Client-only wrapper
│   ├── entry.client.tsx   # Client entry point
│   ├── entry.server.tsx   # Server entry point
│   ├── root.tsx           # Root component
│   └── routes/            # Remix routes
│       ├── _index.tsx     # Home page
│       └── counter.tsx    # Counter page (uses remote component)
├── types/                 # TypeScript declarations
│   └── remote-modules.d.ts # Remote module type definitions
├── vite.config.ts         # Vite + Module Federation config
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🚀 Development

### Prerequisites

- Node.js >= 20.0.0
- pnpm (recommended)
- **App-1 must be running** (for module federation to work)

### Installation

```bash
pnpm install
```

### Running in Development Mode

**Important:** Make sure app-1 is running first!

```bash
# Terminal 1: Start app-1 (host)
cd ../app-1 && pnpm dev

# Terminal 2: Start app-2 (consumer)
cd ../app-2 && pnpm dev
```

The application will be available at: **http://localhost:5174**

### Testing Module Federation

1. Visit the home page: http://localhost:5174
2. Visit the counter page: http://localhost:5174/counter
   - This page uses the remote Counter component from app-1

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

The application is configured to consume components from app-1:

```typescript
federation({
  name: 'app2',
  remotes: {
    app1: 'http://localhost:5173/remoteEntry.js',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
})
```

### Remote Components

- **`app1/Counter`** - Counter component imported from app-1
  - Used in: `app/routes/counter.tsx`
  - Wrapped in: `app/components/ClientOnly.tsx` for SSR compatibility

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
- `types/remote-modules.d.ts` - TypeScript declarations for remote modules
- `types.ts` - Additional type definitions

### Remix Application
- `app/root.tsx` - Root component with global styles
- `app/routes/_index.tsx` - Home page
- `app/routes/counter.tsx` - Counter page using remote component
- `app/components/ClientOnly.tsx` - Client-only wrapper for SSR
- `app/entry.client.tsx` - Client-side entry point
- `app/entry.server.tsx` - Server-side entry point

### Configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts
- `tailwind.config.ts` - Tailwind CSS configuration

## 🔧 TypeScript Integration

### Remote Module Types (`types/remote-modules.d.ts`)

```typescript
declare module 'app1/Counter' {
  const Counter: React.ComponentType<{
    initialCount?: number;
  }>;
  export default Counter;
}
```

### Usage in Components

```typescript
import { lazy } from 'react';
import type { ComponentType } from 'react';

const RemoteCounter = lazy<ComponentType<{ initialCount?: number }>>(
  () => import('app1/Counter')
);
```

## 🐛 Troubleshooting

### Common Issues

1. **Module Federation Errors:**
   - **Ensure app-1 is running** before starting app-2
   - Check that the remote entry URL is accessible: http://localhost:5173/remoteEntry.js
   - Verify the module name in the federation config matches app-1's exposed name

2. **TypeScript Errors:**
   - Make sure `types/remote-modules.d.ts` is properly configured
   - Check that the remote module types match the exposed components
   - Run `pnpm typecheck` to verify type definitions

3. **SSR Issues:**
   - Use `ClientOnly` wrapper for remote components that need client-side rendering
   - Check for hydration mismatches in the browser console

4. **Build Errors:**
   - Clear build directory: `rm -rf build/`
   - Reinstall dependencies: `pnpm install`
   - Check TypeScript errors: `pnpm typecheck`

### Debug Mode

Enable verbose logging:

```bash
DEBUG=vite:* pnpm dev
```

### Network Connectivity

Test if app-1 is accessible:

```bash
curl http://localhost:5173/remoteEntry.js
```

## 📚 Resources

- [Remix Documentation](https://remix.run/docs)
- [Module Federation Vite Plugin](https://github.com/module-federation/vite)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🔗 Related Applications

- **App-1** - Host application that provides components to this app
- **Root README** - Overall project documentation
