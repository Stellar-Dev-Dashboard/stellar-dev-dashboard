import React from "react";
import Head from "next/head";
import { Layout } from "@/components/dashboard/Layout";
import { TransactionList } from "@/components/payments/TransactionList";
import { useWallet } from "@/hooks/useWallet";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function TransactionsPage() {
  const { wallet } = useWallet();

  return (
    <>
      <Head><title>Transactions — Stellar Dev</title></Head>
      <Layout>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
          {wallet ? (
            <TransactionList />
          ) : (
            <Card>
              <p className="text-gray-600 mb-4">Connect a wallet to view transactions.</p>
              <Link href="/wallet"><Button>Go to Wallet</Button></Link>
            </Card>
          )}
        </div>
      </Layout>
    </>
  );
}
