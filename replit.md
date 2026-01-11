# Ratunda - Home Renovation Services Landing Page

## Overview

Ratunda is a landing page for a home renovation services company based in Indonesia. The application provides a single-page marketing website showcasing renovation services (atap bocor, dinding lembab, renovasi dapur, etc.) with an inquiry form that allows potential customers to submit service requests. The form data is stored in a PostgreSQL database for follow-up.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for Replit environment
- **Routing**: Wouter (lightweight alternative to React Router)
- **Styling**: Tailwind CSS with custom theme extending CSS variables for brand colors (purple primary, deep blue foreground, green secondary, mustard accent)
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Animations**: Framer Motion for scroll and hover effects
- **State Management**: TanStack Query (React Query) for server state
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Style**: REST endpoints with Zod schema validation
- **Development**: tsx for TypeScript execution, Vite dev server with HMR

### Data Layer
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema-to-validation integration
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Migrations**: Drizzle Kit with `db:push` command

### Project Structure
```
├── client/src/          # React frontend
│   ├── components/      # UI components (custom + shadcn)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities (queryClient, utils)
│   └── pages/           # Route components
├── server/              # Express backend
│   ├── routes.ts        # API endpoint definitions
│   ├── storage.ts       # Database operations layer
│   └── db.ts            # Database connection
├── shared/              # Shared code between client/server
│   ├── schema.ts        # Drizzle database schema
│   └── routes.ts        # API route contracts with Zod schemas
└── migrations/          # Drizzle migration files
```

### Key Design Decisions

1. **Shared Types Pattern**: Schema definitions in `shared/` are used by both frontend (form validation) and backend (database operations, API validation), ensuring type safety across the stack.

2. **Route Contracts**: `shared/routes.ts` defines API contracts with Zod schemas for input/output, enabling type-safe API calls and consistent validation.

3. **Storage Abstraction**: `server/storage.ts` provides a `DatabaseStorage` class implementing `IStorage` interface, allowing potential swapping of storage implementations.

4. **Build Strategy**: Custom `script/build.ts` bundles server dependencies (listed in allowlist) to reduce cold start times on deployment.

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema management and query building

### UI/Animation Libraries
- **Radix UI**: Full suite of accessible primitives (dialog, select, tooltip, etc.)
- **Framer Motion**: Animation library for entry effects and interactions
- **Lucide React**: Icon library

### Form Handling
- **React Hook Form**: Form state management
- **Zod**: Schema validation (shared between client and server)

### Replit-specific
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer`: Development tooling
- `@replit/vite-plugin-dev-banner`: Development environment banner