export const NETWORKS = {
  testnet: {
    name: "Testnet",
    horizonUrl: "https://horizon-testnet.stellar.org",
    passphrase: "Test SDF Network ; September 2015",
    explorerUrl: "https://stellar.expert/explorer/testnet",
    friendbotUrl: "https://friendbot.stellar.org",
  },
  mainnet: {
    name: "Mainnet",
    horizonUrl: "https://horizon.stellar.org",
    passphrase: "Public Global Stellar Network ; September 2015",
    explorerUrl: "https://stellar.expert/explorer/public",
    friendbotUrl: null,
  },
} as const;

export type Network = keyof typeof NETWORKS;

export const DEFAULT_NETWORK: Network = "testnet";

export const BASE_FEE = "100"; // stroops

export const APP_NAME = "Stellar Dev Dashboard";
export const APP_VERSION = "0.1.0";
export const GITHUB_URL = "https://github.com/yourusername/stellar-dev-dashboard";
