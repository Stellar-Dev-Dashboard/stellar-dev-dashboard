import { useState, useEffect, useCallback } from "react";
import { getAccountPayments, PaymentRecord } from "@/services/stellar";

export function useTransactions(publicKey: string | null) {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!publicKey) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getAccountPayments(publicKey);
      setPayments(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  }, [publicKey]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { payments, loading, error, refetch: fetch };
}
