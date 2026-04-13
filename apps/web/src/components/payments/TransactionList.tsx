import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useTransactions } from "@/hooks/useTransactions";
import { useWallet } from "@/hooks/useWallet";
import { ArrowUpRight, ArrowDownLeft, RefreshCw } from "lucide-react";
import { clsx } from "clsx";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function TransactionList() {
  const { wallet } = useWallet();
  const { payments, loading, error, refetch } = useTransactions(wallet?.publicKey || null);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
        <button
          onClick={refetch}
          className={clsx("text-gray-400 hover:text-gray-600", loading && "animate-spin")}
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {!error && payments.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-2">📭</p>
          <p className="text-sm">No transactions yet</p>
        </div>
      )}

      <div className="space-y-2">
        {payments.map((tx) => {
          const isOutgoing = tx.from === wallet?.publicKey;
          return (
            <div key={tx.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className={clsx(
                "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
                isOutgoing ? "bg-red-100" : "bg-green-100"
              )}>
                {isOutgoing
                  ? <ArrowUpRight size={16} className="text-red-600" />
                  : <ArrowDownLeft size={16} className="text-green-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {isOutgoing ? `To: ${tx.to?.slice(0, 8)}...${tx.to?.slice(-4)}` : `From: ${tx.from?.slice(0, 8)}...${tx.from?.slice(-4)}`}
                </p>
                <p className="text-xs text-gray-500">{formatDate(tx.created_at)}</p>
              </div>
              <div className="text-right">
                <p className={clsx("text-sm font-semibold", isOutgoing ? "text-red-600" : "text-green-600")}>
                  {isOutgoing ? "-" : "+"}{tx.amount ? parseFloat(tx.amount).toFixed(4) : "—"} {tx.asset_code || "XLM"}
                </p>
                <a
                  href={`https://stellar.expert/explorer/testnet/tx/${tx.transaction_hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-stellar-accent hover:underline"
                >
                  View →
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
