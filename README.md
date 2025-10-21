# IOTA Gas Station

A Next.js application for IOTA gas station management.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: Bun
- **Linting**: ESLint with flat config
- **Formatting**: Prettier

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

Open [http://localhost:3000](http://localhost:3000) to view the application.

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
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
```

## Contributing

1. Follow the ESLint rules defined in `eslint.config.mjs`
2. Use Prettier for code formatting
3. Ensure all code passes linting before committing
