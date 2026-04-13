import * as StellarSdk from "@stellar/stellar-sdk";
import axios from "axios";

const HORIZON_URL =
  process.env.NEXT_PUBLIC_HORIZON_URL || "https://horizon-testnet.stellar.org";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const server = new StellarSdk.Horizon.Server(HORIZON_URL);

export interface AccountBalance {
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
  balance: string;
}

export interface Transaction {
  id: string;
  hash: string;
  created_at: string;
  source_account: string;
  memo?: string;
  fee_charged: string;
  operation_count: number;
  successful: boolean;
}

export interface PaymentRecord {
  id: string;
  type: string;
  created_at: string;
  from?: string;
  to?: string;
  amount?: string;
  asset_type: string;
  asset_code?: string;
  transaction_hash: string;
}

/**
 * Fetch account balances directly from Horizon.
 */
export async function getAccountBalances(publicKey: string): Promise<AccountBalance[]> {
  try {
    const account = await server.loadAccount(publicKey);
    return account.balances as AccountBalance[];
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      throw new Error("Account not found. It may not be funded yet.");
    }
    throw new Error("Failed to load account balances.");
  }
}

/**
 * Fetch recent payments for an account.
 */
export async function getAccountPayments(publicKey: string, limit = 20): Promise<PaymentRecord[]> {
  const response = await server
    .payments()
    .forAccount(publicKey)
    .limit(limit)
    .order("desc")
    .call();

  return response.records.map((r: StellarSdk.Horizon.ServerApi.PaymentOperationRecord) => ({
    id: r.id,
    type: r.type,
    created_at: r.created_at,
    from: (r as any).from,
    to: (r as any).to,
    amount: (r as any).amount,
    asset_type: (r as any).asset_type,
    asset_code: (r as any).asset_code,
    transaction_hash: r.transaction_hash,
  }));
}

/**
 * Fetch recent transactions for an account.
 */
export async function getAccountTransactions(publicKey: string, limit = 20): Promise<Transaction[]> {
  const response = await server
    .transactions()
    .forAccount(publicKey)
    .limit(limit)
    .order("desc")
    .call();

  return response.records.map((r) => ({
    id: r.id,
    hash: r.hash,
    created_at: r.created_at,
    source_account: r.source_account,
    memo: r.memo,
    fee_charged: r.fee_charged,
    operation_count: r.operation_count,
    successful: r.successful,
  }));
}

/**
 * Submit a signed XDR transaction via the backend proxy.
 */
export async function submitTransaction(signedXDR: string): Promise<{ hash: string }> {
  const response = await axios.post(`${API_URL}/api/payments/submit`, { xdr: signedXDR });
  return response.data;
}

/**
 * Fund a testnet account using Friendbot.
 */
export async function fundTestnetAccount(publicKey: string): Promise<void> {
  const response = await fetch(
    `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`
  );
  if (!response.ok) throw new Error("Friendbot funding failed.");
}
