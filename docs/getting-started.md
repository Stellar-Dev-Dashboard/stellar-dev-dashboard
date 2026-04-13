# Getting Started

## Prerequisites

- Node.js 20+
- npm 9+
- A modern browser

## 1. Clone the repository

```bash
git clone https://github.com/yourusername/stellar-dev-dashboard.git
cd stellar-dev-dashboard
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment

```bash
# Frontend
cp apps/web/.env.example apps/web/.env.local

# Backend
cp apps/api/.env.example apps/api/.env
```

Edit `apps/web/.env.local`:
```
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Edit `apps/api/.env`:
```
PORT=3001
STELLAR_NETWORK=testnet
HORIZON_URL=https://horizon-testnet.stellar.org
CORS_ORIGIN=http://localhost:3000
```

## 4. Run in development

```bash
# Run both frontend and backend together
npm run dev

# Or run separately
npm run dev:web   # http://localhost:3000
npm run dev:api   # http://localhost:3001
```

## 5. Create a test wallet

1. Open http://localhost:3000
2. Click **Get Started**
3. Click **Generate New Wallet**
4. Save your secret key
5. Click **I have saved my secret key**
6. Go to **Wallet** → click **Fund with Testnet XLM (Friendbot)**
7. You now have 10,000 testnet XLM to experiment with!

## 6. Send a test payment

1. Get a second testnet address from https://laboratory.stellar.org
2. Go to **Send** page
3. Enter the destination, amount, your secret key
4. Submit

## Production Build

```bash
npm run build
```

## Running on Mainnet

Change the environment variables:

```
NEXT_PUBLIC_STELLAR_NETWORK=mainnet
NEXT_PUBLIC_HORIZON_URL=https://horizon.stellar.org
```

⚠️ On mainnet, transactions use real XLM. Always test on testnet first.
