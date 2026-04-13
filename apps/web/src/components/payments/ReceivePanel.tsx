import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CopyButton } from "@/components/ui/CopyButton";
import { generatePaymentLink, generateShareableLink } from "@/lib/wallet";
import { useWallet } from "@/hooks/useWallet";
import { Link2 } from "lucide-react";

export function ReceivePanel() {
  const { wallet } = useWallet();
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  if (!wallet) return null;

  const sep7Link = generatePaymentLink({
    destination: wallet.publicKey,
    amount: amount || undefined,
    memo: memo || undefined,
  });

  const shareLink = generateShareableLink({
    destination: wallet.publicKey,
    amount: amount || undefined,
    memo: memo || undefined,
  });

  return (
    <div className="space-y-6">
      <Card title="Your Address" subtitle="Share this to receive payments">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-white rounded-2xl shadow-inner border border-gray-100">
            <QRCodeSVG value={wallet.publicKey} size={180} level="H" includeMargin />
          </div>
          <div className="flex items-center gap-2 w-full p-3 bg-gray-50 rounded-lg">
            <code className="text-xs font-mono text-gray-700 flex-1 break-all">{wallet.publicKey}</code>
            <CopyButton text={wallet.publicKey} />
          </div>
        </div>
      </Card>

      <Card title="Payment Link Generator" subtitle="Create a pre-filled payment request">
        <div className="space-y-4">
          <Input
            label="Requested Amount (XLM)"
            type="number"
            placeholder="Optional"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Input
            label="Memo"
            placeholder="Optional note for payer"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            maxLength={28}
          />

          <div className="space-y-3">
            <div>
              <label className="label flex items-center gap-1">
                <Link2 size={12} /> SEP-0007 Link
              </label>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <code className="text-xs font-mono text-gray-600 flex-1 break-all">{sep7Link}</code>
                <CopyButton text={sep7Link} />
              </div>
            </div>

            <div>
              <label className="label flex items-center gap-1">
                <Link2 size={12} /> Shareable URL
              </label>
              <div className="flex items-center gap-2 p-3 bg-stellar-light rounded-lg">
                <code className="text-xs font-mono text-gray-700 flex-1 break-all">{shareLink}</code>
                <CopyButton text={shareLink} />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
