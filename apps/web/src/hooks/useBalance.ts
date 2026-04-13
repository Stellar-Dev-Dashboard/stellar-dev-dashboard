import { useState, useEffect, useCallback } from "react";
import { getAccountBalances, AccountBalance } from "@/services/stellar";

export function useBalance(publicKey: string | null) {
  const [balances, setBalances] = useState<AccountBalance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalances = useCallback(async () => {
    if (!publicKey) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getAccountBalances(publicKey);
      setBalances(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch balances");
    } finally {
      setLoading(false);
    }
  }, [publicKey]);

  useEffect(() => {
    fetchBalances();
    const interval = setInterval(fetchBalances, 30_000);
    return () => clearInterval(interval);
  }, [fetchBalances]);

  return { balances, loading, error, refetch: fetchBalances };
}
