import React from "react";
import Head from "next/head";
import { Layout } from "@/components/dashboard/Layout";
import { ReceivePanel } from "@/components/payments/ReceivePanel";
import { useWallet } from "@/hooks/useWallet";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ReceivePage() {
  const { wallet } = useWallet();

  return (
    <>
      <Head><title>Receive — Stellar Dev</title></Head>
      <Layout>
        <div className="space-y-6 max-w-lg">
          <h1 className="text-2xl font-bold text-gray-900">Receive XLM</h1>
          {wallet ? (
            <ReceivePanel />
          ) : (
            <Card>
              <p className="text-gray-600 mb-4">Connect a wallet first.</p>
              <Link href="/wallet"><Button>Go to Wallet</Button></Link>
            </Card>
          )}
        </div>
      </Layout>
    </>
  );
}
