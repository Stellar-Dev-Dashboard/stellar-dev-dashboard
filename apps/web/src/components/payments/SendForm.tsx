import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useWallet } from "@/hooks/useWallet";
import { useBalance } from "@/hooks/useBalance";
import { buildPaymentTransaction } from "@/lib/wallet";
import { submitTransaction } from "@/services/stellar";
import { isValidPublicKey } from "@/lib/wallet";
import toast from "react-hot-toast";
import { ArrowUpRight, CheckCircle } from "lucide-react";

const HORIZON_URL = process.env.NEXT_PUBLIC_HORIZON_URL || "https://horizon-testnet.stellar.org";

export function SendForm() {
  const { wallet } = useWallet();
  const { refetch } = useBalance(wallet?.publicKey || null);

  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!isValidPublicKey(destination)) errs.destination = "Invalid Stellar public key";
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) errs.amount = "Enter a valid amount";
    if (!secretKey || secretKey.length < 56) errs.secretKey = "Enter your secret key to sign";
    return errs;
  };

  const handleSend = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const xdr = await buildPaymentTransaction({
        secretKey,
        destination,
        amount,
        memo: memo || undefined,
        horizonUrl: HORIZON_URL,
      });

      const result = await submitTransaction(xdr);
      setTxHash(result.hash);
      toast.success("Payment sent!");
      setDestination("");
      setAmount("");
      setMemo("");
      setSecretKey("");
      refetch();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (txHash) {
    return (
      <Card className="text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold mb-2">Payment Sent!</h3>
        <p className="text-sm text-gray-600 mb-4">Transaction hash:</p>
        <code className="text-xs font-mono bg-gray-100 p-2 rounded break-all block mb-4">{txHash}</code>
        <a
          href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-stellar-accent text-sm hover:underline"
        >
          View on Stellar Expert →
        </a>
        <br />
        <Button variant="secondary" onClick={() => setTxHash(null)} className="mt-4">
          Send Another
        </Button>
      </Card>
    );
  }

  return (
    <Card title="Send XLM" subtitle="Transfer Stellar Lumens to any address">
      <div className="space-y-4">
        <Input
          label="Recipient Address"
          placeholder="GXXXXXXXXXX..."
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          error={errors.destination}
        />
        <Input
          label="Amount (XLM)"
          type="number"
          placeholder="0.00"
          min="0"
          step="0.0000001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={errors.amount}
        />
        <Input
          label="Memo (optional)"
          placeholder="Add a note..."
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          hint="Max 28 characters"
          maxLength={28}
        />
        <Input
          label="Your Secret Key"
          type="password"
          placeholder="SABCDE..."
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          error={errors.secretKey}
          hint="Used only to sign locally. Never sent to any server."
        />
        <Button
          onClick={handleSend}
          loading={loading}
          className="w-full"
        >
          <ArrowUpRight size={16} className="mr-2" />
          Send Payment
        </Button>
      </div>
    </Card>
  );
}
