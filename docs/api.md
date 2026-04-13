# API Reference

Base URL: `http://localhost:3001` (dev) | `https://your-api.com` (prod)

---

## Health Check

### `GET /health`

Returns API and network status.

**Response:**
```json
{
  "status": "ok",
  "network": "testnet"
}
```

---

## Wallet

### `GET /api/wallet/:address`

Fetch account balances and info from Horizon.

**Parameters:**
- `address` — Stellar public key (G...)

**Response:**
```json
{
  "publicKey": "GABC...",
  "sequence": "123456789",
  "balances": [
    { "asset_type": "native", "balance": "9999.9999900" },
    { "asset_type": "credit_alphanum4", "asset_code": "USDC", "balance": "100.0000000" }
  ]
}
```

**Errors:**
- `400` — Missing address
- `500` — Account not found or Horizon error

---

## Transactions

### `GET /api/transactions/:address`

Fetch recent transactions.

**Query params:**
- `limit` (optional, default 20)

**Response:**
```json
{
  "transactions": [...],
  "count": 20
}
```

### `GET /api/transactions/:address/payments`

Fetch recent payment operations (more granular than transactions).

**Response:**
```json
{
  "payments": [
    {
      "id": "...",
      "type": "payment",
      "created_at": "2024-01-01T00:00:00Z",
      "from": "GABC...",
      "to": "GXYZ...",
      "amount": "10.0000000",
      "asset_type": "native",
      "transaction_hash": "abc123..."
    }
  ],
  "count": 1
}
```

---

## Payments

### `POST /api/payments/submit`

Submit a signed XDR transaction to the Stellar network.

**Body:**
```json
{
  "xdr": "AAAAAgAAAAA..."
}
```

**Response (success):**
```json
{
  "hash": "abc123...",
  "ledger": 12345678
}
```

**Response (failure):**
```json
{
  "error": "Transaction failed",
  "details": { ... }
}
```

---

## Error Format

All errors follow:
```json
{
  "error": "Human-readable message"
}
```
