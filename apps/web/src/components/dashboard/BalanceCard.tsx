import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useBalance } from "@/hooks/useBalance";
import { RefreshCw } from "lucide-react";
import { clsx } from "clsx";

interface BalanceCardProps {
  publicKey: string;
}

export function BalanceCard({ publicKey }: BalanceCardProps) {
  const { balances, loading, error, refetch } = useBalance(publicKey);
  const xlm = balances.find((b) => b.asset_type === "native");
  const tokens = balances.filter((b) => b.asset_type !== "native");

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Balances</h3>
        <button
          onClick={refetch}
          className={clsx("text-gray-400 hover:text-gray-600 transition-all", loading && "animate-spin")}
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {!error && (
        <div className="space-y-3">
          {/* XLM */}
          <div className="flex items-center justify-between p-4 bg-stellar-light rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-stellar-accent rounded-full flex items-center justify-center text-white text-xs font-bold">
                XLM
              </div>
              <div>
                <p className="font-semibold text-gray-900">Stellar Lumens</p>
                <p className="text-xs text-gray-500">Native asset</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900 text-lg">
                {loading ? "..." : xlm ? parseFloat(xlm.balance).toFixed(4) : "0.0000"}
              </p>
              <p className="text-xs text-gray-500">XLM</p>
            </div>
          </div>

          {/* Tokens */}
          {tokens.map((token) => (
            <div key={`${token.asset_code}-${token.asset_issuer}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-xs font-bold">
                  {token.asset_code?.slice(0, 3)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{token.asset_code}</p>
                  <Badge variant="info">Trustline</Badge>
                </div>
              </div>
              <p className="font-semibold text-gray-900">{parseFloat(token.balance).toFixed(4)}</p>
            </div>
          ))}

          {balances.length === 0 && !loading && (
            <p className="text-sm text-gray-500 text-center py-4">
              No balances found. Fund this account to get started.
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
