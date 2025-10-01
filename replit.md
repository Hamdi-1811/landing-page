# Presentation Landing Page Builder

## Overview

This is an AI-powered presentation landing page builder that allows users to create stunning, customizable landing pages through a visual editor with natural language editing capabilities. The application provides a component-based architecture where users can add, edit, and arrange different section types (hero, stats, products, video, gallery, text) to build presentation-style landing pages. The platform features a dark-mode builder interface with real-time preview capabilities across different device sizes, brand kit customization, and AI-assisted content editing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server with HMR support
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and caching

**UI System**
- Shadcn/ui component library (New York style) with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Dark mode as primary theme with comprehensive CSS variable system
- Responsive design with device preview modes (desktop, tablet, mobile)

**Component Architecture**
- Page-level components: Dashboard (project listing) and Editor (main builder)
- Builder components: EditorToolbar, SectionListItem, BrandKit, AIChat, PreviewFrame
- Section renderers: Dynamic component system with type-specific renderers (HeroSection, StatsSection, ProductsSection, etc.)
- Form handling with React Hook Form and Zod validation

**State Management Strategy**
- Server state cached via React Query with infinite stale time
- Local UI state managed with React hooks
- No global state management library - component composition and prop drilling for shared state

### Backend Architecture

**Server Framework**
- Express.js as HTTP server with TypeScript
- RESTful API design pattern
- Session-based architecture preparation (connect-pg-simple for session store)

**API Structure**
- `/api/projects` - CRUD operations for presentation projects
- `/api/projects/:id/sections` - Section management within projects
- `/api/ai/*` - AI-powered editing endpoints (natural language to config transformations)

**Database Layer**
- Drizzle ORM for type-safe database operations
- Neon serverless PostgreSQL as database provider
- WebSocket connection support via ws library for Neon
- Schema-driven development with migrations in `/migrations` directory

**Data Models**
- Users: Basic authentication structure (id, username, password)
- Projects: Container for presentations (name, userId, thumbnail, brandKit JSON, timestamps)
- Sections: Modular content blocks (projectId, type, label, order, config JSON, visibility flag)

### External Dependencies

**AI Integration**
- OpenAI API for natural language editing commands
- GPT-based content transformation and section configuration updates
- Structured prompts for section-specific editing (hero, stats, products, video, gallery, text)

**Database Service**
- Neon serverless PostgreSQL (via @neondatabase/serverless)
- Connection pooling with pg Pool
- Environment variable configuration (DATABASE_URL required)

**Cloud Assets**
- Logo and image uploads (implementation pending - currently interface-ready)
- Brand kit storage in JSON format within database

**Typography**
- Google Fonts: Inter (primary UI), JetBrains Mono (code/technical), Outfit, Space Grotesk (display fonts)

**Development Tools**
- Replit-specific plugins for development experience (cartographer, dev-banner, runtime error overlay)
- ESBuild for production bundling
- Drizzle Kit for database schema management

**Design References**
- Notion-inspired editor interface
- Webflow/Framer-style visual editing controls
- Linear-quality polish and micro-interactions
- Generated pages adapt modern design patterns from Apple, Stripe, Airbnb aesthetics

## Key Architectural Decisions

**Monorepo Structure**
- `/client` - React frontend application
- `/server` - Express backend API
- `/shared` - Shared TypeScript types and schemas (Drizzle schema, Zod validators)
- Unified TypeScript configuration with path aliases (@/, @shared/, @assets/)

**Type Safety**
- End-to-end type safety with shared schema definitions
- Drizzle-Zod integration for runtime validation matching database schema
- TypeScript strict mode enabled

**Styling System**
- Custom CSS variables for theming (HSL color space)
- Elevation system using overlay opacity (--elevate-1, --elevate-2)
- Responsive border radius and shadow system
- Component-level hover/active state utilities

**Content Management**
- JSON-based configuration for flexible section rendering
- Section type templates provide default structures
- AI editing modifies section configs while preserving structure

**Development Workflow**
- Hot module replacement in development
- Production build separates client bundle and server bundle
- Database schema changes via drizzle-kit push command