# ZenMahal - Modern E-commerce Web Application

## 🌐 Live Demo

Explore the live demo: [zenmahal.vercel.app](https://zenmahal.vercel.app/)


## 🚀 Setup Instructions

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/maisjamil1/zenmahal
   cd zenmahal
   ```

2. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

## 🏗️ Architecture Decisions

### Package Manager: pnpm

We chose pnpm for its significant advantages:

- **Disk space efficiency**: pnpm uses a content-addressable store that avoids duplication of packages across projects.
- **Performance**: pnpm is notably faster than npm and yarn for installations.
- **Strict dependency resolution**: pnpm creates a non-flat node_modules structure that prevents access to packages not explicitly declared as dependencies.
- **Workspace support**: pnpm has excellent monorepo support with its workspace feature.

### State Management: Zustand

Zustand was selected as our state management solution for several reasons:

- **Simplicity**: Zustand has a minimal API with a straightforward learning curve.
- **Performance**: It's optimized for performance with minimal re-renders.
- **Middleware support**: Supports middleware for features like persistence, which we use for cart functionality.
- **TypeScript support**: Excellent TypeScript integration for type safety.
- **Zero dependencies**: Lightweight with no external dependencies.
- **React hooks integration**: Works seamlessly with React hooks.

Zustand allows us to avoid the boilerplate and complexity of Redux while maintaining powerful state management capabilities.

### Server-Side Rendering

We leverage Next.js App Router and React Server Components for:

- **SEO optimization**: Server-rendered content is fully indexable by search engines.
- **Performance**: Faster initial page loads and Time to First Contentful Paint (FCP).
- **Data fetching at the server**: Reduces client-side network requests.
- **Progressive enhancement**: Core functionality works even before JavaScript loads.

## 📂 Project Structure

The project follows a feature-based folder structure for better organization and scalability:

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── features/           # Feature-specific components
│   │   ├── HomePage/       # Home page components
│   │   ├── ProductDetails/ # Product detail components
│   │   ├── Search/         # Search and filtering components
│   │   ├── ShoppingCart/   # Shopping cart components
│   │   └── ...
│   ├── layout/             # Layout components (header, footer)
│   ├── shared/             # Shared/reusable components
│   └── ui/                 # Base UI components
├── lib/
│   ├── api/                # API services and types
│   └── utils/              # Utility functions
└── styles/                 # Global styles
```

### Feature-Based Organization

Our project is organized around features rather than technologies. This approach provides several benefits:

- **Cohesion**: Related code stays together, making it easier to understand and modify features.
- **Isolation**: Features are self-contained, reducing unintended side effects when making changes.
- **Scalability**: New features can be added without disrupting existing ones.
- **Team collaboration**: Teams can work on different features with minimal conflicts.
- **Testing**: Feature-based organization facilitates more focused testing.

## 🛒 Shopping Cart Feature

The shopping cart is implemented as a completely self-contained feature, making it a perfect example of our feature-based architecture.

### Cart Structure

```
src/components/features/ShoppingCart/
├── components/
│   ├── AddToCartHandler.tsx  # Component for adding products to cart
│   ├── CartItem.tsx          # Individual cart item display
│   ├── CartSummary.tsx       # Cart totals and checkout button
│   └── ...
├── store/
│   └── useCartStore.ts       # Zustand store with persistence
└── index.tsx                 # Main cart page component
```

### Implementation Details

- **Self-contained state**: The cart uses its own Zustand store with the persist middleware to save cart state in localStorage.
- **SSR compatibility**: The implementation handles hydration issues by using `useState` and `useEffect` for client-side initialization.
- **Encapsulation**: The cart feature exposes only necessary interfaces, hiding implementation details.
- **Reusable components**: Components like `AddToCartHandler` can be used throughout the application without coupling to specific pages.

### Cart State Management

The cart state is managed through a dedicated Zustand store with:

- **Persistence**: Cart items persist across page refreshes and browser sessions.
- **Type safety**: Full TypeScript integration ensures type safety for cart operations.
- **Optimized rendering**: Components only re-render when relevant parts of the state change.
- **Atomic operations**: Clear, atomic actions for adding, removing, and updating cart items.

## 📱 Responsive Design

The application is fully responsive, providing optimal user experiences across devices:

- Mobile-first approach with Tailwind CSS
- Responsive product cards and image galleries
- Skeleton loading states designed for each viewport size
- Mobile menu and filter toggles for smaller screens
