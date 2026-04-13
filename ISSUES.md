# GitHub Issues — Stellar Dev Dashboard

Copy each issue below into GitHub Issues. Apply the listed labels.

---

## 🟢 BEGINNER (Good First Issues)

---

### Issue #1: Add loading skeleton to BalanceCard
**Labels:** `good first issue`, `ui`, `frontend`

**Description:**
Currently the balance card shows "..." while loading. Replace this with a proper animated skeleton loader for a better user experience.

**Acceptance Criteria:**
- [ ] Skeleton loader shown while `loading === true` in `useBalance`
- [ ] Skeleton has 2-3 animated pulse rows matching balance row height
- [ ] No layout shift when real data loads

---

### Issue #2: Add favicon and Open Graph meta tags
**Labels:** `good first issue`, `frontend`, `seo`

**Description:**
The app is missing a proper favicon and social preview tags. Add these to `_document.tsx` and create a basic SVG favicon.

**Acceptance Criteria:**
- [ ] SVG favicon added to `apps/web/public/`
- [ ] `<meta og:title>`, `og:description`, `og:image` added to `_document.tsx`
- [ ] Twitter card meta tags added

---

### Issue #3: Display network badge (Testnet/Mainnet) in sidebar
**Labels:** `good first issue`, `ui`, `frontend`

**Description:**
Users should always know which network they're on. Add a small badge in the sidebar footer showing "TESTNET" or "MAINNET" based on `NEXT_PUBLIC_STELLAR_NETWORK`.

**Acceptance Criteria:**
- [ ] Badge displayed in `Layout.tsx` sidebar footer
- [ ] Yellow/amber for testnet, green for mainnet
- [ ] Reads from `process.env.NEXT_PUBLIC_STELLAR_NETWORK`

---

### Issue #4: Add character counter to memo input
**Labels:** `good first issue`, `ux`, `frontend`

**Description:**
Stellar memos have a 28-character limit. Add a live character counter to the memo `Input` on the Send and Receive pages.

**Acceptance Criteria:**
- [ ] Counter shows `X / 28` below the memo field
- [ ] Counter turns red when at 28 characters
- [ ] Works in `SendForm` and `ReceivePanel`

---

### Issue #5: Add `NEXT_PUBLIC_APP_VERSION` to footer
**Labels:** `good first issue`, `frontend`

**Description:**
Add a minimal footer to the Layout component showing the app version number from `packages/config/src/index.ts`.

**Acceptance Criteria:**
- [ ] Footer shows `v0.1.0` (or current version)
- [ ] Links to GitHub repository
- [ ] Styled consistently with sidebar

---

### Issue #6: Write unit tests for `packages/utils/src/index.ts`
**Labels:** `good first issue`, `testing`

**Description:**
The utility functions (`truncateAddress`, `formatXLM`, `isValidStellarAddress`, etc.) have no tests. Add a test suite using Jest or Vitest.

**Acceptance Criteria:**
- [ ] Test file at `packages/utils/src/index.test.ts`
- [ ] All exported functions have at least 2 test cases each
- [ ] Edge cases covered (empty strings, zero amounts, invalid addresses)
- [ ] Tests pass with `npm test`

---

### Issue #7: Add copy-to-clipboard for transaction hash
**Labels:** `good first issue`, `ui`, `frontend`

**Description:**
In the transaction history list, add a copy button next to the "View →" link so users can copy the transaction hash directly.

**Acceptance Criteria:**
- [ ] `CopyButton` component used in `TransactionList.tsx`
- [ ] Copy button appears on hover or is always visible
- [ ] Toast confirmation shown on copy

---

### Issue #8: Add 404 page
**Labels:** `good first issue`, `frontend`

**Description:**
Create a custom 404 page at `apps/web/src/pages/404.tsx` that matches the app's style.

**Acceptance Criteria:**
- [ ] Page exists and renders for unknown routes
- [ ] Includes link back to Dashboard
- [ ] Styled consistently with the rest of the app

---

### Issue #9: Add `.env.example` validation on API startup
**Labels:** `good first issue`, `backend`

**Description:**
The API should warn (not crash) on startup if required environment variables are missing.

**Acceptance Criteria:**
- [ ] `src/index.ts` checks for `PORT`, `STELLAR_NETWORK`, `HORIZON_URL`
- [ ] Logs a clear warning for each missing variable
- [ ] Falls back to safe defaults where possible

---

### Issue #10: Document all exported functions in `lib/wallet.ts`
**Labels:** `good first issue`, `docs`

**Description:**
All functions in `apps/web/src/lib/wallet.ts` should have JSDoc comments describing parameters, return values, and any thrown errors.

**Acceptance Criteria:**
- [ ] Every exported function has a JSDoc block
- [ ] Parameters and return types documented
- [ ] Thrown errors documented with `@throws`

---

## 🟡 INTERMEDIATE

---

### Issue #11: Add pagination to transaction history
**Labels:** `intermediate`, `frontend`, `ux`

**Description:**
The transaction list currently shows the last 20 payments. Add a "Load more" button that fetches the next page using Horizon's cursor-based pagination.

**Acceptance Criteria:**
- [ ] "Load more" button appears when there are more records
- [ ] Uses Horizon `cursor` param for pagination
- [ ] New records appended (not replacing existing)
- [ ] Button hidden when no more records
- [ ] Loading state shown while fetching

---

### Issue #12: Add token balance trustline management UI
**Labels:** `intermediate`, `frontend`, `stellar`

**Description:**
Users should be able to add a trustline to a token (e.g., USDC) from the Wallet page. Build a form that constructs and signs a `changeTrust` operation client-side.

**Acceptance Criteria:**
- [ ] Form accepts `asset_code` and `asset_issuer`
- [ ] Builds `changeTrust` operation using `stellar-sdk`
- [ ] Signed and submitted via `/api/payments/submit`
- [ ] Balance card updates after trustline is added
- [ ] Error handling for invalid issuers

---

### Issue #13: Add fee display before transaction submission
**Labels:** `intermediate`, `ux`, `frontend`

**Description:**
Before submitting a payment, show the estimated fee in XLM (base fee × number of operations). This helps users understand the cost.

**Acceptance Criteria:**
- [ ] Fee displayed in `SendForm` before submission
- [ ] Reads `BASE_FEE` from `packages/config`
- [ ] Converts stroops to XLM for display
- [ ] Updates dynamically if amount changes

---

### Issue #14: Add dark mode support
**Labels:** `intermediate`, `ui`, `frontend`

**Description:**
Implement a dark mode toggle using Tailwind's `dark:` variant and a toggle button in the sidebar.

**Acceptance Criteria:**
- [ ] Toggle button in sidebar saves preference to `localStorage`
- [ ] All pages and components have dark mode variants
- [ ] Respects `prefers-color-scheme` on first load
- [ ] No flash of unstyled content (FOUC)

---

### Issue #15: Export transaction history as CSV
**Labels:** `intermediate`, `frontend`, `ux`

**Description:**
Add a "Download CSV" button to the Transactions page that exports all loaded payments as a CSV file.

**Acceptance Criteria:**
- [ ] CSV includes: date, type (sent/received), amount, asset, from, to, tx hash
- [ ] File named `stellar-transactions-YYYY-MM-DD.csv`
- [ ] Download triggered by button click
- [ ] Works without any backend call

---

### Issue #16: Add `GET /api/wallet/:address/tokens` endpoint
**Labels:** `intermediate`, `backend`, `api`

**Description:**
Add a dedicated endpoint that returns only non-native (token) balances for an account, with human-readable formatting.

**Acceptance Criteria:**
- [ ] Endpoint at `GET /api/wallet/:address/tokens`
- [ ] Returns array of `{ asset_code, asset_issuer, balance }` objects
- [ ] Native XLM excluded from response
- [ ] Documented in `docs/api.md`

---

### Issue #17: Implement request caching on API responses
**Labels:** `intermediate`, `backend`, `performance`

**Description:**
Add in-memory caching (using a simple `Map` or `node-cache`) for Horizon read requests to reduce latency and rate limit exposure.

**Acceptance Criteria:**
- [ ] Cache applied to `/api/wallet/:address` and `/api/transactions/:address`
- [ ] TTL of 15 seconds for balance requests
- [ ] Cache bypassed on explicit `refresh=true` query param
- [ ] Cache size bounded (max 500 entries)

---

### Issue #18: Add mobile responsive layout
**Labels:** `intermediate`, `ui`, `frontend`

**Description:**
The sidebar-based layout doesn't work well on mobile. Implement a collapsible hamburger menu for screens smaller than `md`.

**Acceptance Criteria:**
- [ ] Hamburger icon shown on mobile
- [ ] Sidebar slides in as an overlay on mobile
- [ ] Backdrop closes sidebar on click
- [ ] All pages usable on 375px width
- [ ] No horizontal scroll on any page

---

### Issue #19: Stream real-time balance updates via Horizon SSE
**Labels:** `intermediate`, `frontend`, `stellar`

**Description:**
Replace the 30-second polling in `useBalance` with Horizon's Server-Sent Events (SSE) stream for real-time balance updates.

**Acceptance Criteria:**
- [ ] Uses `server.accounts().accountId(key).stream()` from stellar-sdk
- [ ] Balance updates without page refresh
- [ ] Stream closed on component unmount
- [ ] Fallback to polling if SSE fails

---

### Issue #20: Add Stellar Expert transaction link for mainnet vs testnet
**Labels:** `intermediate`, `frontend`

**Description:**
Transaction links in `TransactionList.tsx` are hardcoded to testnet. Make them dynamic based on `NEXT_PUBLIC_STELLAR_NETWORK`.

**Acceptance Criteria:**
- [ ] Link uses `NETWORKS` config from `packages/config`
- [ ] Testnet → `https://stellar.expert/explorer/testnet/tx/...`
- [ ] Mainnet → `https://stellar.expert/explorer/public/tx/...`
- [ ] Applied consistently in `TransactionList` and post-send confirmation

---

## 🔴 ADVANCED

---

### Issue #21: Build multi-signature transaction builder
**Labels:** `advanced`, `stellar`, `frontend`

**Description:**
Stellar supports multi-signature accounts where N-of-M signers must sign a transaction. Build a UI that allows construction and collection of signatures for multi-sig transactions.

**Acceptance Criteria:**
- [ ] UI to build a transaction and export unsigned XDR
- [ ] UI to import and sign XDR from another signer
- [ ] Display current signers and threshold
- [ ] Submit once threshold is met
- [ ] Documented in `docs/`

---

### Issue #22: Integrate SEP-24 anchor deposit/withdrawal flow
**Labels:** `advanced`, `stellar`, `backend`

**Description:**
Implement a basic SEP-24 (Interactive Anchor) flow allowing users to deposit/withdraw via an anchor (e.g., MoneyGram, AnchorUSD).

**Acceptance Criteria:**
- [ ] User can select a known anchor
- [ ] App fetches anchor TOML and SEP-24 info endpoint
- [ ] Redirect flow to anchor's interactive deposit/withdraw page
- [ ] Transaction watcher polls for completion
- [ ] Documented end-to-end in `docs/`

---

### Issue #23: Build batch payment feature (fan-out transactions)
**Labels:** `advanced`, `stellar`, `frontend`

**Description:**
Allow users to upload a CSV of recipients and amounts, and submit them as a single multi-operation transaction (up to 100 operations per transaction).

**Acceptance Criteria:**
- [ ] CSV uploader accepting `address,amount,memo` format
- [ ] Preview table before submission
- [ ] Builds transaction with multiple `payment` operations
- [ ] Handles > 100 recipients by splitting into multiple transactions
- [ ] Results shown per-transaction after submission

---

### Issue #24: Add Passkey / WebAuthn signing support
**Labels:** `advanced`, `security`, `frontend`

**Description:**
Allow users to protect their stored secret key with a device passkey (WebAuthn). The key is encrypted with a passkey-derived key and stored in `localStorage`.

**Acceptance Criteria:**
- [ ] Secret key encrypted before storage using WebAuthn-derived symmetric key
- [ ] Passkey prompt shown when signing a transaction
- [ ] Works on supported browsers (Chrome, Safari, Firefox)
- [ ] Graceful fallback to password-based entry
- [ ] Security model documented

---

### Issue #25: Build embeddable payment button widget
**Labels:** `advanced`, `frontend`, `product`

**Description:**
Create a standalone embeddable JavaScript snippet that merchants can drop into any website to add a Stellar pay button. Clicking it opens a modal with QR code and payment details.

**Acceptance Criteria:**
- [ ] Single `<script>` tag embed with `data-` attributes for destination, amount, memo
- [ ] Opens a lightweight modal (no full-page redirect)
- [ ] QR code and deep link shown in modal
- [ ] Polls for payment completion via Horizon SSE
- [ ] Shows confirmation when payment detected
- [ ] Works without any backend (pure frontend widget)
- [ ] Available at `/widget.js` from the web app
- [ ] Documented in `docs/widget.md`

---

### Issue #26: Add analytics dashboard (balance history chart)
**Labels:** `advanced`, `frontend`, `data`

**Description:**
Add a balance history chart to the Dashboard page by reconstructing balance over time from transaction history using `recharts` or `chart.js`.

**Acceptance Criteria:**
- [ ] Line chart showing XLM balance over last 30 days
- [ ] Data computed from payment history (not a separate API)
- [ ] Chart is responsive
- [ ] Tooltip shows date and balance on hover
- [ ] Loading/empty states handled

---

### Issue #27: Add webhook support for incoming payments
**Labels:** `advanced`, `backend`

**Description:**
Allow users to register a webhook URL that gets called whenever a new payment is received. The API subscribes to Horizon SSE for the account and forwards events.

**Acceptance Criteria:**
- [ ] `POST /api/webhooks` to register a URL for an account
- [ ] Horizon payment stream started for registered accounts
- [ ] HTTP POST sent to registered URL on new payment
- [ ] HMAC-SHA256 signature included in request header
- [ ] Webhook retried up to 3 times on failure
- [ ] `DELETE /api/webhooks/:id` to remove registration
- [ ] Documented in `docs/api.md`
