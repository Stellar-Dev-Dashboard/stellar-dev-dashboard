import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useWallet } from "@/hooks/useWallet";

export function ImportWallet() {
  const { importFromSecret } = useWallet();
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");

  const handleImport = () => {
    if (!secret.trim()) {
      setError("Please enter a secret key");
      return;
    }
    setError("");
    importFromSecret(secret.trim());
  };

  return (
    <Card title="Import Wallet" subtitle="Use your existing Stellar secret key">
      <div className="space-y-4">
        <Input
          label="Secret Key"
          type="password"
          placeholder="SABCDE..."
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          error={error}
          hint="Your secret key starts with 'S' and is 56 characters long"
        />
        <Button onClick={handleImport} className="w-full">
          Import Wallet
        </Button>
      </div>
    </Card>
  );
}
