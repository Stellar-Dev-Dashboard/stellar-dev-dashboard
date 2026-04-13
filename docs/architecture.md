# Architecture Overview

## System Design

Stellar Dev Dashboard is a monorepo full-stack application. It uses a thin Express backend as a proxy/security layer, while all cryptographic operations happen client-side.

```
┌─────────────────────────────────────────────────────────┐
│                    User's Browser                       │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │           Next.js Frontend (apps/web)             │  │
│  │                                                   │  │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────┐  │  │
│  │  │ Wallet   │  │ Payments │  │  Transactions  │  │  │
│  │  │  Page    │  │  Pages   │  │     Page       │  │  │
│  │  └──────────┘  └──────────┘  └────────────────┘  │  │
│  │                                                   │  │
│  │  ┌──────────────────────────────────────────────┐ │  │
│  │  │  lib/wallet.ts — keypair + signing (LOCAL)   │ │  │
│  │  └──────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
          │                              │
          │ HTTPS (signed XDR)           │ HTTPS (read-only)
          ▼                              ▼
┌──────────────────┐          ┌────────────────────────┐
│  Express API     │          │   Stellar Horizon API  │
│  (apps/api)      │──────────│  horizon-testnet.      │
│                  │          │  stellar.org           │
│  /wallet         │          └────────────────────────┘
│  /transactions   │
│  /payments/submit│
└──────────────────┘
```

## Security Model

| Operation        | Where it happens | Secret key involved |
|-----------------|-----------------|---------------------|
| Create wallet   | Browser         | Generated locally   |
| Import wallet   | Browser         | Never leaves client |
| Sign transaction| Browser         | Used locally, discarded |
| Submit XDR      | API → Horizon   | Never on server     |
| Read balances   | Browser → Horizon directly | No     |

## Data Flow: Sending a Payment

1. User enters destination, amount, and secret key in `SendForm`
2. `buildPaymentTransaction()` in `lib/wallet.ts` loads account from Horizon
3. Transaction is built and signed entirely in the browser using `@stellar/stellar-sdk`
4. Signed XDR string is sent to `POST /api/payments/submit`
5. Backend deserializes XDR (no key access) and forwards to Horizon
6. Transaction hash returned to the frontend

## Monorepo Structure

```
stellar-dev-dashboard/
├── apps/
│   ├── web/          # Next.js 14 — pages router
│   └── api/          # Express 4 — REST proxy
├── packages/
│   ├── ui/           # Shared theme tokens
│   ├── utils/        # Pure utility functions
│   └── config/       # Network constants
└── docs/             # This documentation
```
