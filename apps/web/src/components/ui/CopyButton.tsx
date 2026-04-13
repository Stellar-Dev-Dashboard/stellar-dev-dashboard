import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import toast from "react-hot-toast";
import { clsx } from "clsx";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function CopyButton({ text, label, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={clsx(
        "inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors",
        className
      )}
      title="Copy to clipboard"
    >
      {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
      {label && <span>{copied ? "Copied!" : label}</span>}
    </button>
  );
}
