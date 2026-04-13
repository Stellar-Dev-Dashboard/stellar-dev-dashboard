# Contributing to Stellar Dev Dashboard

Thank you for your interest in contributing! This project thrives on community involvement.

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/stellar-dev-dashboard.git
   cd stellar-dev-dashboard
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Set up** environment (see [docs/getting-started.md](docs/getting-started.md))
5. **Run** the dev server:
   ```bash
   npm run dev
   ```

## Finding Issues to Work On

Browse issues by difficulty:

- 🟢 [`good first issue`](https://github.com/yourusername/stellar-dev-dashboard/labels/good%20first%20issue) — great for newcomers
- 🟡 [`intermediate`](https://github.com/yourusername/stellar-dev-dashboard/labels/intermediate) — requires some Stellar/Next.js knowledge
- 🔴 [`advanced`](https://github.com/yourusername/stellar-dev-dashboard/labels/advanced) — architecture-level contributions

Comment on an issue before starting to avoid duplicate work.

## Branching Strategy

```
main          — stable, production-ready
develop       — integration branch
feature/xxx   — your feature branch
fix/xxx       — bug fix branch
```

Always branch from `develop`:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name
```

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add multi-sig transaction support
fix: correct balance display for zero amounts
docs: update API reference for /wallet endpoint
chore: upgrade stellar-sdk to v13
refactor: extract payment link logic to utils
```

## Pull Request Process

1. Keep PRs focused — one feature/fix per PR
2. Include a clear description of what changed and why
3. Reference the issue number: `Closes #42`
4. Ensure the build passes (`npm run build`)
5. Add or update tests if relevant

## Coding Guidelines

### TypeScript
- Use strict typing — avoid `any`
- Prefer `interface` over `type` for object shapes
- Export named exports, not default where possible in packages

### React / Next.js
- Use functional components and hooks
- Keep components small and single-purpose
- Co-locate component styles with component files

### Stellar Integration
- **Never** accept or store secret keys on the backend
- All signing must happen client-side in `lib/wallet.ts`
- Use `@stellar/stellar-sdk` for all Stellar operations
- Always handle Horizon 404 (unfunded accounts) gracefully

### File Naming
- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Utilities: `camelCase.ts`

## Project Structure Reminder

```
apps/web/src/
  pages/        — Next.js pages (routes)
  components/   — React components
  hooks/        — Custom React hooks
  services/     — External API calls (Horizon)
  lib/          — Pure business logic (wallet, crypto)
  styles/       — Global CSS

apps/api/src/
  routes/       — Express route definitions
  controllers/  — Request handlers
  services/     — Horizon integration logic
  middleware/   — Auth, validation, error handling
```

## Community

- Open an issue for questions or proposals
- Be respectful and constructive in all interactions
- We follow the [Contributor Covenant](https://www.contributor-covenant.org/)
