<div align="center">

# ⭐ Stellar Dev Dashboard

**The simplest way to interact with the Stellar blockchain — no code required.**

[![CI](https://github.com/yourusername/stellar-dev-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/stellar-dev-dashboard/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Good First Issues](https://img.shields.io/github/issues/yourusername/stellar-dev-dashboard/good%20first%20issue)](https://github.com/yourusername/stellar-dev-dashboard/labels/good%20first%20issue)

[Live Demo](https://stellar-dev-dashboard.vercel.app) · [Documentation](docs/) · [Report Bug](https://github.com/yourusername/stellar-dev-dashboard/issues) · [Request Feature](https://github.com/yourusername/stellar-dev-dashboard/issues/new?template=feature_request.yml)

</div>

---

## 🌍 Mission

Stellar Dev Dashboard is a **public good**. Its mission is to lower the barrier to entry for the Stellar ecosystem — enabling developers, freelancers, non-profits, and everyday users in emerging markets to access decentralized financial infrastructure without needing to write a single line of code.

We believe financial tools should be open, auditable, and free.

---

## 🔍 Problem

The Stellar blockchain is one of the fastest, cheapest, and most accessible payment networks in the world. Yet despite this, meaningful interaction still requires:

- Writing TypeScript or Python to talk to Horizon
- Understanding XDR transaction formats
- Managing keypairs manually
- Deep knowledge of SEP standards

This creates an invisible wall between ordinary users and one of the most powerful financial networks on the planet. **Stellar Dev Dashboard tears down that wall.**

---

## ✅ Solution

A clean, browser-based dashboard that lets anyone:

- Create or import a Stellar wallet in seconds
- View XLM and token balances in real-time
- Send and receive XLM with a familiar UI
- Generate shareable payment links (useful for freelancers and businesses)
- Browse their full transaction history

All cryptographic operations happen **client-side**. Your secret key never leaves your browser.

---

## 🚀 Key Features

| Feature | Description |
|---------|-------------|
| 🔐 **Client-side wallet** | Create or import wallets — keys generated locally, never sent to any server |
| 💰 **Real-time balances** | XLM and custom token balances via Horizon, auto-refreshed every 30s |
| 📤 **Send XLM** | Client-side transaction signing + submission via API proxy |
| 📥 **Receive + QR** | QR code generation for your address |
| 🔗 **Payment Links** | SEP-0007 compliant links + shareable `/pay` pages for invoicing |
| 📜 **Transaction history** | Full payment record with Stellar Expert links |
| 🧪 **Testnet support** | One-click Friendbot funding for development |
| 🏗️ **Monorepo** | Clean Next.js + Express architecture, easy to extend |

---

## 🖥️ Screenshots

```
┌────────────────────────────────────────────────────────┐
│  ⭐ Stellar Dev   Dashboard  Wallet  Send  Receive     │
│─────────────────────────────────────────────────────── │
│  Dashboard                    GABC...XYZ  [copy]       │
│                                                        │
│  ┌─── Balances ─────────────────────────────────────┐  │
│  │  [XLM]  Stellar Lumens        9,999.9999  XLM    │  │
│  │  [USDC] USD Coin                 100.0000 USDC   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  [Send ↗]    [Receive ↙]    [History 📜]               │
└────────────────────────────────────────────────────────┘
```

---

## 🏗️ Architecture

```
stellar-dev-dashboard/
├── apps/
│   ├── web/          # Next.js 14 frontend (TypeScript + Tailwind)
│   └── api/          # Express backend (proxy + Horizon integration)
├── packages/
│   ├── ui/           # Shared design tokens
│   ├── utils/        # Pure utility functions (address formatting, etc.)
│   └── config/       # Network constants (testnet / mainnet)
└── docs/             # Architecture, API, and setup guides
```

**Key design decision:** All transaction signing happens in the browser using `@stellar/stellar-sdk`. The backend only submits pre-signed XDR — it never sees or handles private keys.

See [docs/architecture.md](docs/architecture.md) for full details.

---

## ⚡ Quick Start

### Prerequisites

- Node.js 20+
- npm 9+

### Setup

```bash
# 1. Clone
git clone https://github.com/yourusername/stellar-dev-dashboard.git
cd stellar-dev-dashboard

# 2. Install
npm install

# 3. Configure
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env

# 4. Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — create a wallet, fund it with testnet XLM via Friendbot, and start sending.

See [docs/getting-started.md](docs/getting-started.md) for the full setup guide.

---

## 🤝 Contributing

We welcome all contributions — from documentation fixes to new features.

1. Browse [open issues](https://github.com/yourusername/stellar-dev-dashboard/issues)
2. Comment on one to claim it
3. Fork → branch → PR

Issues are labeled by difficulty:
- 🟢 `good first issue` — perfect for newcomers
- 🟡 `intermediate`
- 🔴 `advanced`

Read [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

---

## 🗺️ Roadmap

| Phase | Status | Focus |
|-------|--------|-------|
| Phase 1 — MVP | ✅ Complete | Wallet, send, receive, history, payment links |
| Phase 2 — Expansion | 🚧 In progress | Tokens, invoicing, CSV export, dark mode |
| Phase 3 — Advanced | 📋 Planned | Multi-sig, DEX, Anchor integration, webhooks |

See [ROADMAP.md](ROADMAP.md) for the full list.

---

## 💸 Why This Deserves Funding

Stellar Dev Dashboard is designed to be a **permanent, maintained open-source utility** for the Stellar ecosystem. Here is why continuous funding matters:

### Impact
- **Developer onboarding**: New developers joining Stellar can explore the network instantly, reducing the time from "curious" to "building" from days to minutes.
- **Financial inclusion**: In regions where banking infrastructure is limited, tools like this make XLM and stablecoin payments accessible through a simple browser.
- **Freelancer payments**: The payment link feature directly enables Stellar-native invoicing for gig workers and remote freelancers worldwide.

### Sustainability
Open source without funding dies. Continuous funding (e.g. through [Drips Network](https://www.drips.network)) enables:

- Regular dependency updates and security patches
- Feature development based on community demand
- Responsive issue triage and PR review
- Long-term maintenance of docs and onboarding materials

### Transparency
- All code is public on GitHub
- No VC funding, no token, no ads
- Funding goes directly toward maintainer time and infrastructure costs
- Quarterly public updates on development progress

---

## 🔒 Security

- Private keys **never** leave the browser
- Backend handles only signed XDR and read-only Horizon queries
- No user accounts or personal data stored
- CORS locked to configured origins
- Rate limiting on all API endpoints

Found a vulnerability? Please open a private security advisory rather than a public issue.

---

## 📄 License

MIT © [Your Name / Organization]

This software is free to use, fork, and build upon. If you benefit from it, consider contributing back or supporting via [Drips Network](https://www.drips.network).
