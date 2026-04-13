import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "@/components/dashboard/Layout";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { useWallet } from "@/hooks/useWallet";
import { ArrowUpRight, ArrowDownLeft, History, Wallet } from "lucide-react";

export default function DashboardPage() {
  const { wallet } = useWallet();

  if (!wallet) {
    return (
      <>
        <Head><title>Stellar Dev Dashboard</title></Head>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stellar-blue to-stellar-purple">
          <div className="text-center text-white max-w-md px-4">
            <div className="text-6xl mb-6">⭐</div>
            <h1 className="text-4xl font-bold mb-4">Stellar Dev Dashboard</h1>
            <p className="text-white/70 mb-8 text-lg">
              The simplest way to interact with the Stellar blockchain. No coding required.
            </p>
            <Link href="/wallet">
              <Button size="lg" className="bg-stellar-accent hover:bg-purple-600">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head><title>Dashboard — Stellar Dev</title></Head>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-gray-500 font-mono">{wallet.publicKey.slice(0, 12)}...{wallet.publicKey.slice(-6)}</p>
              <CopyButton text={wallet.publicKey} />
            </div>
          </div>

          <BalanceCard publicKey={wallet.publicKey} />

          <div className="grid grid-cols-3 gap-4">
            <Link href="/send">
              <Card className="text-center hover:border-stellar-accent cursor-pointer transition-colors group">
                <ArrowUpRight size={24} className="mx-auto mb-2 text-stellar-accent group-hover:scale-110 transition-transform" />
                <p className="text-sm font-semibold text-gray-700">Send</p>
              </Card>
            </Link>
            <Link href="/receive">
              <Card className="text-center hover:border-stellar-accent cursor-pointer transition-colors group">
                <ArrowDownLeft size={24} className="mx-auto mb-2 text-stellar-accent group-hover:scale-110 transition-transform" />
                <p className="text-sm font-semibold text-gray-700">Receive</p>
              </Card>
            </Link>
            <Link href="/transactions">
              <Card className="text-center hover:border-stellar-accent cursor-pointer transition-colors group">
                <History size={24} className="mx-auto mb-2 text-stellar-accent group-hover:scale-110 transition-transform" />
                <p className="text-sm font-semibold text-gray-700">History</p>
              </Card>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
