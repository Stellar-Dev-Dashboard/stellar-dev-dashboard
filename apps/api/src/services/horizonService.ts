import * as StellarSdk from "@stellar/stellar-sdk";
import dotenv from "dotenv";
dotenv.config();

const HORIZON_URL = process.env.HORIZON_URL || "https://horizon-testnet.stellar.org";
const NETWORK_PASSPHRASE = HORIZON_URL.includes("testnet")
  ? StellarSdk.Networks.TESTNET
  : StellarSdk.Networks.PUBLIC;

export const server = new StellarSdk.Horizon.Server(HORIZON_URL);

export interface AccountInfo {
  publicKey: string;
  balances: StellarSdk.Horizon.HorizonApi.BalanceLine[];
  sequence: string;
}

/**
 * Load account details from Horizon.
 */
export async function getAccount(publicKey: string): Promise<AccountInfo> {
  const account = await server.loadAccount(publicKey);
  return {
    publicKey,
    balances: account.balances,
    sequence: account.sequenceNumber(),
  };
}

/**
 * Fetch recent payments for an account.
 */
export async function getPayments(publicKey: string, limit = 20) {
  const response = await server
    .payments()
    .forAccount(publicKey)
    .limit(limit)
    .order("desc")
    .call();
  return response.records;
}

/**
 * Fetch recent transactions for an account.
 */
export async function getTransactions(publicKey: string, limit = 20) {
  const response = await server
    .transactions()
    .forAccount(publicKey)
    .limit(limit)
    .order("desc")
    .call();
  return response.records;
}

/**
 * Submit a signed XDR transaction to the network.
 */
export async function submitXDR(xdr: string) {
  const tx = StellarSdk.TransactionBuilder.fromXDR(xdr, NETWORK_PASSPHRASE);
  const result = await server.submitTransaction(tx);
  return { hash: result.hash, ledger: result.ledger };
}
