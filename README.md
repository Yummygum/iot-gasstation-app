# IOTA Gas Station

A Next.js application for IOTA gas station management.

## Tech Stack

### Core

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Package Manager**: Bun
- **Build Tool**: Turbopack

### Styling & UI

- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **Component Library**: shadcn/ui style components
- **Icons**: Lucide React
- **Theming**: next-themes

### Data & State Management

- **GraphQL Client**: Apollo Client v4
- **GraphQL Codegen**: gql.tada (type-safe GraphQL)
- **Subscriptions**: graphql-ws (WebSocket)
- **State Management**: React Context API

### Forms & Validation

- **Form Library**: @tanstack/react-form
- **Validation**: Zod

### Data Visualization & Tables

- **Charts**: Recharts
- **Tables**: @tanstack/react-table

### Utilities

- **Notifications**: Sonner (toast notifications)
- **Class Utilities**: clsx, tailwind-merge
- **Variance**: class-variance-authority

### Development Tools

- **Linting**: ESLint with flat config
- **Formatting**: Prettier
- **Type Checking**: TypeScript strict mode

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed on your system

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

### Development

Start the development server:

```bash
bun dev
```

This command automatically generates GraphQL types using `gql.tada` before starting the dev server.

Open [http://localhost:3000](http://localhost:3000) to view the application.

**Note**: If you make changes to GraphQL queries, mutations, or fragments, the types will be automatically regenerated. You can also manually regenerate types with:

```bash
bun generate-types
```

### Building

Build the application for production:

```bash
bun run build
```

### Linting

Run ESLint to check code quality:

```bash
bun lint
```

Fix auto-fixable issues:

```bash
bun lint --fix
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── ApolloWrapper.tsx   # Apollo Client provider
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Dashboard page
│   └── group/[id]/         # Group detail page
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── Chart/              # Chart components
│   ├── ClientTable/        # Client table component
│   ├── BudgetBar/          # Budget bar components
│   └── Sidebar/            # Sidebar components
├── contexts/               # React Context providers
│   ├── CurrencyContext.tsx
│   └── ExchangeRateContext.tsx
├── hooks/                  # Custom React hooks
├── lib/
│   ├── api/                # GraphQL API layer
│   │   ├── queries/        # GraphQL queries
│   │   ├── mutations/      # GraphQL mutations
│   │   ├── subscriptions/  # GraphQL subscriptions
│   │   └── fragments/      # GraphQL fragments
│   └── utils/              # Utility functions
└── types/                  # TypeScript type definitions
```

## Contributing

1. Follow the ESLint rules defined in `eslint.config.mjs`
2. Use Prettier for code formatting
3. Ensure all code passes linting before committing
