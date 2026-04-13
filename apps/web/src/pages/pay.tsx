import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";

export default function PayPage() {
  const router = useRouter();
  const { to, amount, memo } = router.query as { to?: string; amount?: string; memo?: string };

  if (!to) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Invalid payment link.</p>
      </div>
    );
  }

  const stellarLink = `web+stellar:pay?destination=${to}${amount ? `&amount=${amount}` : ""}${memo ? `&memo=${memo}` : ""}`;

  return (
    <>
      <Head><title>Pay — Stellar Dev</title></Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-sm w-full space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Payment Request</h1>
            <p className="text-gray-500 text-sm mt-1">Scan or copy the address below</p>
          </div>

          <Card>
            <div className="flex flex-col items-center gap-4">
              <QRCodeSVG value={stellarLink} size={160} level="H" includeMargin />
              <div className="w-full space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">To</span>
                  <div className="flex items-center gap-1">
                    <code className="text-xs">{to.slice(0, 10)}...{to.slice(-6)}</code>
                    <CopyButton text={to} />
                  </div>
                </div>
                {amount && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-semibold">{amount} XLM</span>
                  </div>
                )}
                {memo && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Memo</span>
                    <span>{memo}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Link href={stellarLink}>
            <Button className="w-full">Open in Stellar Wallet</Button>
          </Link>
          <p className="text-center text-xs text-gray-400">
            Powered by{" "}
            <Link href="/" className="text-stellar-accent hover:underline">Stellar Dev Dashboard</Link>
          </p>
        </div>
      </div>
    </>
  );
}
