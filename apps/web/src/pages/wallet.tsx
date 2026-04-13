import React, { useState } from "react";
import Head from "next/head";
import { Layout } from "@/components/dashboard/Layout";
import { CreateWallet } from "@/components/wallet/CreateWallet";
import { ImportWallet } from "@/components/wallet/ImportWallet";
import { useWallet } from "@/hooks/useWallet";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Button } from "@/components/ui/Button";
import { fundTestnetAccount } from "@/services/stellar";
import toast from "react-hot-toast";

export default function WalletPage() {
  const { wallet } = useWallet();
  const [tab, setTab] = useState<"create" | "import">("create");
  const [funding, setFunding] = useState(false);

  const handleFundTestnet = async () => {
    if (!wallet) return;
    setFunding(true);
    try {
      await fundTestnetAccount(wallet.publicKey);
      toast.success("Testnet account funded with 10,000 XLM!");
    } catch {
      toast.error("Funding failed. Account may already be funded.");
    } finally {
      setFunding(false);
    }
  };

  return (
    <>
      <Head><title>Wallet — Stellar Dev</title></Head>
      <Layout>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>

          {wallet ? (
            <div className="space-y-4">
              <Card title="Active Wallet">
                <div className="space-y-3">
                  <div>
                    <label className="label">Public Address</label>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <code className="text-xs font-mono text-gray-700 flex-1 break-all">{wallet.publicKey}</code>
                      <CopyButton text={wallet.publicKey} />
                    </div>
                  </div>
                  {process.env.NEXT_PUBLIC_STELLAR_NETWORK === "testnet" && (
                    <Button onClick={handleFundTestnet} loading={funding} variant="secondary" size="sm">
                      Fund with Testnet XLM (Friendbot)
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant={tab === "create" ? "primary" : "secondary"}
                  onClick={() => setTab("create")}
                  size="sm"
                >
                  Create New
                </Button>
                <Button
                  variant={tab === "import" ? "primary" : "secondary"}
                  onClick={() => setTab("import")}
                  size="sm"
                >
                  Import Existing
                </Button>
              </div>
              {tab === "create" ? <CreateWallet /> : <ImportWallet />}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
