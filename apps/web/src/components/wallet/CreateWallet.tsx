import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { useWallet } from "@/hooks/useWallet";
import { WalletKeyPair } from "@/lib/wallet";
import { ShieldAlert, Eye, EyeOff } from "lucide-react";

export function CreateWallet() {
  const { create } = useWallet();
  const [newWallet, setNewWallet] = useState<WalletKeyPair | null>(null);
  const [showSecret, setShowSecret] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleCreate = () => {
    const kp = create();
    setNewWallet(kp);
  };

  if (newWallet && !confirmed) {
    return (
      <Card title="Save Your Secret Key" className="max-w-lg mx-auto">
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <ShieldAlert className="text-amber-500 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-amber-800">
              Save your secret key somewhere safe. You will <strong>not</strong> be able to see it again.
              Anyone with this key has full access to your wallet.
            </p>
          </div>

          <div>
            <label className="label">Public Key</label>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <code className="text-xs font-mono text-gray-700 flex-1 break-all">{newWallet.publicKey}</code>
              <CopyButton text={newWallet.publicKey} />
            </div>
          </div>

          <div>
            <label className="label">Secret Key</label>
            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-100">
              <code className="text-xs font-mono text-red-700 flex-1 break-all">
                {showSecret ? newWallet.secretKey : "S" + "•".repeat(55)}
              </code>
              <button onClick={() => setShowSecret(!showSecret)} className="text-red-400 hover:text-red-600">
                {showSecret ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <CopyButton text={newWallet.secretKey} />
            </div>
          </div>

          <Button onClick={() => setConfirmed(true)} className="w-full" variant="primary">
            I have saved my secret key
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Create New Wallet" subtitle="Generate a fresh Stellar keypair instantly">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Create a brand-new Stellar wallet. Your keys are generated locally and never leave your browser.
        </p>
        <Button onClick={handleCreate} className="w-full">
          Generate New Wallet
        </Button>
      </div>
    </Card>
  );
}
