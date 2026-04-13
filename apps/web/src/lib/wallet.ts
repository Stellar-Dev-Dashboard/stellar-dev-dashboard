import * as StellarSdk from "@stellar/stellar-sdk";

export interface WalletKeyPair {
  publicKey: string;
  secretKey: string;
}

/**
 * Generate a brand-new random Stellar keypair.
 * The secret key NEVER leaves the client.
 */
export function createWallet(): WalletKeyPair {
  const keypair = StellarSdk.Keypair.random();
  return {
    publicKey: keypair.publicKey(),
    secretKey: keypair.secret(),
  };
}

/**
 * Import a wallet from an existing secret key.
 * Validates the secret key format before returning.
 */
export function importWallet(secretKey: string): WalletKeyPair {
  try {
    const keypair = StellarSdk.Keypair.fromSecret(secretKey.trim());
    return {
      publicKey: keypair.publicKey(),
      secretKey: keypair.secret(),
    };
  } catch {
    throw new Error("Invalid secret key. Please check and try again.");
  }
}

/**
 * Validate a Stellar public key.
 */
export function isValidPublicKey(key: string): boolean {
  try {
    StellarSdk.StrKey.decodeEd25519PublicKey(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * Build and sign a XLM payment transaction client-side.
 * Returns the signed XDR string ready to submit.
 */
export async function buildPaymentTransaction(params: {
  secretKey: string;
  destination: string;
  amount: string;
  memo?: string;
  horizonUrl: string;
}): Promise<string> {
  const { secretKey, destination, amount, memo, horizonUrl } = params;

  const keypair = StellarSdk.Keypair.fromSecret(secretKey);
  const server = new StellarSdk.Horizon.Server(horizonUrl);

  const account = await server.loadAccount(keypair.publicKey());

  let txBuilder = new StellarSdk.TransactionBuilder(account, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase:
      horizonUrl.includes("testnet")
        ? StellarSdk.Networks.TESTNET
        : StellarSdk.Networks.PUBLIC,
  })
    .addOperation(
      StellarSdk.Operation.payment({
        destination,
        asset: StellarSdk.Asset.native(),
        amount,
      })
    )
    .setTimeout(180);

  if (memo) {
    txBuilder = txBuilder.addMemo(StellarSdk.Memo.text(memo));
  }

  const transaction = txBuilder.build();
  transaction.sign(keypair);

  return transaction.toXDR();
}

/**
 * Generate a Stellar payment link (SEP-0007 style).
 */
export function generatePaymentLink(params: {
  destination: string;
  amount?: string;
  memo?: string;
  assetCode?: string;
}): string {
  const { destination, amount, memo, assetCode } = params;
  const base = "web+stellar:pay";
  const queryParams = new URLSearchParams();

  queryParams.set("destination", destination);
  if (amount) queryParams.set("amount", amount);
  if (memo) queryParams.set("memo", memo);
  if (assetCode && assetCode !== "XLM") queryParams.set("asset_code", assetCode);

  return `${base}?${queryParams.toString()}`;
}

/**
 * Generate a shareable payment URL for the dashboard receive page.
 */
export function generateShareableLink(params: {
  destination: string;
  amount?: string;
  memo?: string;
  baseUrl?: string;
}): string {
  const base = params.baseUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const query = new URLSearchParams({ to: params.destination });
  if (params.amount) query.set("amount", params.amount);
  if (params.memo) query.set("memo", params.memo);
  return `${base}/pay?${query.toString()}`;
}
