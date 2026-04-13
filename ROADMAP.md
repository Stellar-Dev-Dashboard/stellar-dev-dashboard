# Roadmap

## Phase 1 — MVP (Current)

**Goal:** A working, self-hostable Stellar wallet interface usable without writing code.

- [x] Create and import Stellar wallets (client-side keypair generation)
- [x] Display XLM and token balances via Horizon
- [x] Send XLM with client-side signing
- [x] Receive page with QR code generation
- [x] Transaction/payment history viewer
- [x] SEP-0007 payment link generation
- [x] Shareable `/pay` page for payment requests
- [x] Testnet Friendbot funding
- [x] Express API proxy for transaction submission
- [x] CI/CD pipeline with GitHub Actions

## Phase 2 — Expansion

**Goal:** Make the tool useful for freelancers and small teams receiving payments.

- [ ] Multi-account support (switch between wallets)
- [ ] Token trustline management (add/remove trustlines)
- [ ] USDC and other stablecoin support
- [ ] CSV export of transaction history
- [ ] Invoice / payment request templates
- [ ] Customizable payment link landing page (logo, description)
- [ ] Memo type support (text, ID, hash)
- [ ] Fee estimation display before signing
- [ ] Mobile-responsive layout improvements
- [ ] Dark mode

## Phase 3 — Advanced Features

**Goal:** Enterprise-grade and developer tooling features.

- [ ] Multi-signature transaction builder (threshold accounts)
- [ ] Stellar DEX integration (order placement, asset swaps)
- [ ] Claimable balance support
- [ ] Stellar Anchor integration (SEP-24 / SEP-31 deposits and withdrawals)
- [ ] Batch payments (send to multiple addresses at once)
- [ ] Wallet analytics dashboard (spending trends, balance history)
- [ ] Passkey / hardware wallet signing support
- [ ] Developer API key system for white-label embedding
- [ ] Internationalization (i18n) for 10+ languages
- [ ] Webhooks for payment events

## Contributing to the Roadmap

Have a feature idea? [Open an issue](https://github.com/yourusername/stellar-dev-dashboard/issues/new?template=feature_request.yml) tagged `enhancement`. Popular community requests are fast-tracked.
