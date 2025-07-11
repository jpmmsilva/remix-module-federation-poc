# Remix Module Federation POC

This project demonstrates **Module Federation** between two Remix applications using `@module-federation/vite`. It showcases how to share React components between micro-frontends in a Remix environment.

## 🏗️ Project Structure

```
poc-remix/
├── app-1/                 # Host application (exposes components)
│   ├── app/              # Remix app directory
│   │   ├── entry.client.tsx   # Client entry point
│   │   ├── entry.server.tsx   # Server entry point
│   │   ├── root.tsx           # Root component
│   │   └── routes/            # Remix routes
│   ├── components/       # Shared components
│   │   └── counter.tsx        # Counter component (exposed)
│   ├── vite.config.ts    # Vite + Module Federation config
│   ├── package.json      # Dependencies and scripts
│   └── README.md         # App-1 documentation
├── app-2/                 # Consumer application (imports components)
│   ├── app/              # Remix app directory
│   │   ├── components/        # Local components
│   │   │   └── ClientOnly.tsx # Client-only wrapper
│   │   ├── entry.client.tsx   # Client entry point
│   │   ├── entry.server.tsx   # Server entry point
│   │   ├── root.tsx           # Root component
│   │   └── routes/            # Remix routes
│   │       ├── _index.tsx     # Home page
│   │       └── counter.tsx    # Counter page (uses remote component)
│   ├── types/            # TypeScript declarations
│   │   └── remote-modules.d.ts # Remote module type definitions
│   ├── vite.config.ts    # Vite + Module Federation config
│   ├── package.json      # Dependencies and scripts
│   └── README.md         # App-2 documentation
└── README.md             # This file
```

## 🎯 Application Roles

### App-1: Host Application
- **Purpose:** Exposes shared React components to other applications
- **Key Features:**
  - Exposes the `Counter` component for use by other applications
  - Generates the remote entry point (`remoteEntry.js`) for module federation
  - Shares common dependencies (`react`, `react-dom`) with consuming applications
- **Port:** http://localhost:5173

### App-2: Consumer Application
- **Purpose:** Consumes components from the host application (app-1)
- **Key Features:**
  - Consumes the `Counter` component from app-1
  - Demonstrates how to use remote components in a Remix application
  - Shows TypeScript integration with remote modules
- **Port:** http://localhost:5174

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 20.0.0
- **pnpm** (recommended) or npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd poc-remix
   ```

2. **Install dependencies for both applications:**
   ```bash
   # Install app-1 dependencies
   cd app-1 && pnpm install
   
   # Install app-2 dependencies
   cd ../app-2 && pnpm install
   ```

## 🛠️ Development

### Running Both Applications

1. **Start app-1 (Host) in one terminal:**
   ```bash
   cd app-1
   pnpm dev
   ```
   - App-1 will be available at: http://localhost:5173

2. **Start app-2 (Consumer) in another terminal:**
   ```bash
   cd app-2
   pnpm dev
   ```
   - App-2 will be available at: http://localhost:5174

3. **Test the module federation:**
   - Visit http://localhost:5174/counter to see the shared counter component from app-1

## 📦 Production Build

### Building Both Applications

```bash
# Build app-1
cd app-1 && pnpm build

# Build app-2
cd ../app-2 && pnpm build
```

### Running Production Servers

```bash
# Start app-1 production server
cd app-1 && pnpm start

# Start app-2 production server (in another terminal)
cd app-2 && pnpm start
```

## 🔧 Module Federation Configuration

### App-1 (Host Application) Configuration

**Vite Configuration (`app-1/vite.config.ts`):**

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

**Exposed Components:**
- **`./Counter`** - A React counter component with increment/decrement functionality
  - Location: `app-1/components/counter.tsx`
  - Features: State management, TypeScript support, Tailwind styling

### App-2 (Consumer Application) Configuration

**Vite Configuration (`app-2/vite.config.ts`):**

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

**Remote Components:**
- **`app1/Counter`** - Counter component imported from app-1
  - Used in: `app-2/app/routes/counter.tsx`
  - Wrapped in: `app-2/app/components/ClientOnly.tsx` for SSR compatibility

## 🔧 TypeScript Integration

### Remote Module Types (`app-2/types/remote-modules.d.ts`)

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

## 📦 Available Scripts

### App-1 Scripts
| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript type checking |

### App-2 Scripts
| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript type checking |

## 🎨 Styling

Both applications use **Tailwind CSS** for styling:

- **Configuration:** `tailwind.config.ts`
- **CSS File:** `app/tailwind.css`
- **PostCSS:** `postcss.config.js`

## 🔍 Key Files Breakdown

### App-1 Key Files

#### Module Federation Setup
- `vite.config.ts` - Main configuration with federation plugin
- `components/counter.tsx` - Shared counter component

#### Remix Application
- `app/root.tsx` - Root component with global styles
- `app/routes/_index.tsx` - Home page
- `app/entry.client.tsx` - Client-side entry point
- `app/entry.server.tsx` - Server-side entry point

#### Configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts
- `tailwind.config.ts` - Tailwind CSS configuration

### App-2 Key Files

#### Module Federation Setup
- `vite.config.ts` - Main configuration with federation plugin
- `types/remote-modules.d.ts` - TypeScript declarations for remote modules
- `types.ts` - Additional type definitions

#### Remix Application
- `app/root.tsx` - Root component with global styles
- `app/routes/_index.tsx` - Home page
- `app/routes/counter.tsx` - Counter page using remote component
- `app/components/ClientOnly.tsx` - Client-only wrapper for SSR
- `app/entry.client.tsx` - Client-side entry point
- `app/entry.server.tsx` - Server-side entry point

#### Configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts
- `tailwind.config.ts` - Tailwind CSS configuration

## 🎯 Features Demonstrated

- ✅ **Component Sharing:** Counter component shared between apps
- ✅ **Type Safety:** Full TypeScript support for remote modules
- ✅ **Hot Reload:** Development mode with live updates
- ✅ **Production Ready:** Optimized builds for deployment
- ✅ **SSR Support:** Server-side rendering compatibility
- ✅ **Client-Only Wrapping:** Proper handling of client-side components
- ✅ **Module Federation:** Dynamic component loading across applications

## 🐛 Troubleshooting

### Common Issues

1. **Module Federation Errors:**
   - **Ensure app-1 is running** before starting app-2
   - Check that the remote entry URL is accessible: http://localhost:5173/remoteEntry.js
   - Verify the module name in the federation config matches app-1's exposed name
   - Ensure the `@module-federation/vite` plugin is properly configured
   - Check that exposed components are correctly exported
   - Verify shared dependencies are properly configured

2. **TypeScript Errors:**
   - Make sure `app-2/types/remote-modules.d.ts` is properly configured
   - Check that the remote module types match the exposed components
   - Run `pnpm typecheck` to verify type definitions

3. **SSR Issues:**
   - Use `ClientOnly` wrapper for remote components that need client-side rendering
   - Check for hydration mismatches in the browser console

4. **Build Errors:**
   - Clear build directories: `rm -rf build/`
   - Reinstall dependencies: `pnpm install`
   - Check TypeScript errors: `pnpm typecheck`
   - Check Node.js version compatibility

5. **Development Server Issues:**
   - Check if ports 5173 and 5174 are available
   - Verify all dependencies are installed
   - Check console for error messages

6. **Runtime Errors:**
   - Check browser console for federation-related errors
   - Verify network connectivity between applications
   - Ensure shared dependencies versions match

### Debug Mode

Enable verbose logging by setting the environment variable:
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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 