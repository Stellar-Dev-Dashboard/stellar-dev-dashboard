import React from "react";
import Head from "next/head";
import { Layout } from "@/components/dashboard/Layout";
import { SendForm } from "@/components/payments/SendForm";
import { useWallet } from "@/hooks/useWallet";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function SendPage() {
  const { wallet } = useWallet();

  return (
    <>
      <Head><title>Send — Stellar Dev</title></Head>
      <Layout>
        <div className="space-y-6 max-w-lg">
          <h1 className="text-2xl font-bold text-gray-900">Send XLM</h1>
          {wallet ? (
            <SendForm />
          ) : (
            <Card>
              <p className="text-gray-600 mb-4">Connect a wallet first to send payments.</p>
              <Link href="/wallet"><Button>Go to Wallet</Button></Link>
            </Card>
          )}
        </div>
      </Layout>
    </>
  );
}
