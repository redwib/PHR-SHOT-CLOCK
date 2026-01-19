# CueMaster - Pool Match Tracker

## Overview

CueMaster is a real-time pool match tracking application designed for serious pool players. It enables users to track scores, monitor alternating breaks, and manage match timing with precision. The application features a dark-themed "pool hall aesthetic" UI with a modern React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite with HMR support

The frontend follows a page-based structure under `client/src/pages/` with reusable components in `client/src/components/`. Custom hooks in `client/src/hooks/` handle authentication, match data fetching, and toast notifications.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful endpoints under `/api/` prefix
- **Validation**: Zod schemas for request/response validation
- **Shared Types**: API contracts defined in `shared/routes.ts` for type safety across frontend and backend

The server uses a storage abstraction pattern (`server/storage.ts`) for database operations, making it easy to swap implementations.

### Authentication
- **Method**: Replit OpenID Connect (OIDC) authentication
- **Session Management**: PostgreSQL-backed sessions using `connect-pg-simple`
- **Protected Routes**: Middleware-based route protection via `isAuthenticated`

Authentication is handled through the Replit integration in `server/replit_integrations/auth/`. Sessions are stored in the `sessions` table with a 1-week TTL.

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with Zod schema generation
- **Schema Location**: `shared/schema.ts` and `shared/models/auth.ts`

Key tables:
- `users`: User accounts (managed by Replit Auth)
- `sessions`: Authentication sessions
- `matches`: Pool match records with scores, timing, and breaker tracking

### Build System
- **Development**: Vite dev server with Express backend
- **Production**: esbuild for server bundling, Vite for client bundling
- **Output**: `dist/` directory with `dist/public/` for static assets

## External Dependencies

### Database
- PostgreSQL (required, connection via `DATABASE_URL` environment variable)
- Drizzle Kit for schema migrations (`npm run db:push`)

### Authentication
- Replit OIDC provider (`ISSUER_URL` defaults to `https://replit.com/oidc`)
- Requires `REPL_ID` and `SESSION_SECRET` environment variables

### Key npm Packages
- `@tanstack/react-query`: Server state management
- `drizzle-orm` / `drizzle-zod`: Database ORM and validation
- `express-session` / `connect-pg-simple`: Session handling
- `openid-client` / `passport`: Authentication
- `date-fns`: Date/time formatting for match clocks
- Full shadcn/ui component library (Radix UI primitives)

### Fonts (External)
- Google Fonts: Outfit (sans), Chakra Petch (display), JetBrains Mono (monospace)