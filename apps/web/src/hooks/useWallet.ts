import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createWallet, importWallet, WalletKeyPair } from "@/lib/wallet";
import toast from "react-hot-toast";

interface WalletState {
  wallet: WalletKeyPair | null;
  isLocked: boolean;
  create: () => WalletKeyPair;
  importFromSecret: (secret: string) => void;
  disconnect: () => void;
  lock: () => void;
  unlock: () => void;
}

export const useWallet = create<WalletState>()(
  persist(
    (set) => ({
      wallet: null,
      isLocked: false,

      create: () => {
        const kp = createWallet();
        set({ wallet: kp, isLocked: false });
        toast.success("New wallet created!");
        return kp;
      },

      importFromSecret: (secret: string) => {
        try {
          const kp = importWallet(secret);
          set({ wallet: kp, isLocked: false });
          toast.success("Wallet imported successfully!");
        } catch (err: unknown) {
          toast.error(err instanceof Error ? err.message : "Import failed");
        }
      },

      disconnect: () => {
        set({ wallet: null, isLocked: false });
        toast("Wallet disconnected", { icon: "👋" });
      },

      lock: () => set({ isLocked: true }),
      unlock: () => set({ isLocked: false }),
    }),
    {
      name: "sdd-wallet-storage",
      // Only persist public key, never secret key
      partialize: (state) =>
        state.wallet ? { wallet: { publicKey: state.wallet.publicKey, secretKey: "" } } : {},
    }
  )
);
