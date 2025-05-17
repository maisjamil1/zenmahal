# ZenMahal Coding Guidelines

This document outlines the coding standards and best practices for the ZenMahal project. All contributors, including developers and AI agents, should adhere to these guidelines to maintain code quality and consistency.

## Table of Contents

- [Code Formatting](#code-formatting)
- [TypeScript Usage](#typescript-usage)
- [Project Structure](#project-structure)
- [Component Guidelines](#component-guidelines)
- [State Management](#state-management)
- [Server-Side Rendering](#server-side-rendering)
- [Testing](#testing)
- [Performance Considerations](#performance-considerations)

## Code Formatting

### Prettier

We use Prettier to maintain consistent code formatting. 

- **Configuration**: The project includes a `.prettierrc` file with the following settings:
  ```json
  {
    "semi": true,
    "trailingComma": "all",
    "singleQuote": false,
    "printWidth": 80,
    "tabWidth": 2,
    "bracketSpacing": true,
    "arrowParens": "always"
  }
  ```

- **Usage**:
  - Run `pnpm format` to format all files
  - Configure your IDE to format on save when possible
  - Pre-commit hooks will automatically format code

### ESLint

ESLint is configured to enforce code quality and consistency:

- Follow the rules defined in `.eslintrc.json`
- Run `pnpm lint` to check for linting issues
- Critical errors must be fixed before committing code

## TypeScript Usage

### General Rules

- Always use TypeScript for all new files
- Use explicit return types for functions, especially exported ones
- Avoid using `any` type; use proper typing or `unknown` when necessary
- Use TypeScript's utility types when appropriate (`Partial<T>`, `Pick<T>`, etc.)

### Type Definitions

- Store shared interfaces and types in `/src/lib/api/types.ts`
- Feature-specific types should be defined within their respective feature folders
- Use descriptive names for interfaces and type aliases

### Example

```typescript
// Good example
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
}

// Function with proper typing
function calculateTotal(products: Product[]): number {
  return products.reduce((total, product) => total + product.price, 0);
}

// Bad example - avoid
function processItems(items: any): any {
  // Implementation
}
```

## Project Structure

The project follows a feature-based structure to organize code logically and promote maintainability.

### Root Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── lib/                    # Shared utilities and services
└── styles/                 # Global styles
```

### App Directory

This is where the routes of the application are defined following Next.js App Router structure:

```
src/app/
├── page.tsx               # Home page
├── layout.tsx             # Root layout
├── products/
│   └── [id]/
│       └── page.tsx       # Product details page
├── search/
│   └── page.tsx           # Search page
└── cart/
    └── page.tsx           # Cart page
```

- Each page should be a server component unless it explicitly needs client-side interactivity
- Use `"use client"` directive only when necessary
- Metadata should be defined at the page level for SEO purposes

### Components Directory

The components directory is organized into distinct categories:

```
src/components/
├── features/              # Feature-specific components
│   ├── HomePage/          # Home page components
│   ├── ProductDetails/    # Product detail components
│   ├── Search/            # Search and filtering
│   │   ├── components/    # UI components
│   │   └── store/         # State management
│   └── ShoppingCart/      # Cart functionality
│       ├── components/    # UI components
│       └── store/         # State management
├── layout/                # Layout components
│   ├── AppLayout.tsx      # Main layout wrapper
│   ├── Header.tsx         # Site header
│   └── Footer.tsx         # Site footer
├── shared/                # Shared components
│   ├── Breadcrumbs.tsx    # Navigation breadcrumbs
│   └── Gallery/           # Image gallery components
└── ui/                    # Base UI components
    ├── Button.tsx         # Button component
    ├── Container.tsx      # Container component
    └── Input.tsx          # Input component
```

### Feature Structure

Each feature should follow this organizational pattern:

```
FeatureName/
├── components/            # UI components for the feature
├── store/                 # State management (if needed)
├── hooks/                 # Custom hooks (if needed)
├── utils/                 # Feature-specific utilities
└── index.tsx              # Main entry point / barrel exports
```

### Lib Directory

```
src/lib/
├── api/                   # API and data services
│   ├── productService.ts  # Product-related API methods
│   ├── categoryService.ts # Category-related API methods
│   └── types.ts           # Shared type definitions
└── utils/                 # Utility functions
    ├── formatting.ts      # Formatting utilities
    └── validation.ts      # Validation utilities
```

## Component Guidelines

### Component Creation

1. **Functional Components**: Always use functional components with hooks
2. **File Naming**: Use PascalCase for component files
3. **Component Organization**:
   - Import statements
   - Type definitions / interfaces
   - Component function
   - Helper functions (if small and component-specific)
   - Exports

### Example Component Structure

```tsx
"use client";

import { useState, useEffect } from "react";
import { Product } from "@/lib/api/types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Component logic
  
  return (
    <div 
      className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Component JSX */}
    </div>
  );
}
```

### Client vs. Server Components

- Server Components (default in Next.js 13+):
  - Use for components that don't need interactivity
  - Good for components focused on data fetching and rendering
  - Don't include browser-only APIs or React hooks

- Client Components (add `"use client"` directive):
  - Use for components that need interactivity and state
  - Required for components using hooks or browser APIs
  - Try to keep client components small and focused

## State Management

### Zustand

We use Zustand for global state management:

- Create stores in feature-specific `/store` directories
- Follow the standard Zustand pattern with typed state and actions
- Use middleware like `persist` when needed

### Store Structure

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  // State properties
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  
  // Actions
  addItem: (item: Product) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      totalItems: 0,
      totalPrice: 0,
      
      // Actions with implementation
      addItem: (product) => {
        // Implementation
      },
      
      // More actions...
    }),
    {
      name: "cart-storage", // Local storage key
    }
  )
);
```

### State Management Principles

- Use local state (useState) for component-specific state
- Use Zustand for global state or state shared across multiple components
- Break down large stores into smaller, feature-specific stores
- Handle SSR compatibility with null checks and useEffect initialization

## Server-Side Rendering

### Data Fetching

Next.js App Router supports several data fetching strategies:

1. **Server Components**:
   - Fetch data directly in server components
   - Pass data as props to client components

2. **Route Handlers**:
   - Create API routes in `app/api/` for client-side fetching

### Best Practices

- Fetch data at the highest possible level (page component when possible)
- Use loading UI and error boundaries for better UX
- Handle cases where data might be null or undefined

### Example

```tsx
// Server component (page.tsx)
export default async function ProductPage({ params }) {
  // Fetch data on the server
  const product = await productService.getProductById(params.id);
  
  // Handle not found
  if (!product) {
    notFound();
  }
  
  // Pass data to client component
  return <ProductDetailsClient product={product} />;
}
```

## Testing

All new features should include appropriate tests:

- Unit tests for utility functions
- Component tests for UI elements
- Integration tests for feature workflows

## Performance Considerations

- Minimize client-side JavaScript with server components
- Use image optimization with next/image
- Implement proper loading states and skeleton screens
- Utilize dynamic imports for code splitting
- Optimize state updates to prevent unnecessary re-renders

---

These guidelines aim to ensure code quality and consistency across the ZenMahal project. If you have questions or suggestions for improving these guidelines, please open an issue for discussion.
