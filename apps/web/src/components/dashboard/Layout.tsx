import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  LayoutDashboard,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  History,
  LogOut,
  Zap,
} from "lucide-react";
import { clsx } from "clsx";
import { useWallet } from "@/hooks/useWallet";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/send", label: "Send", icon: ArrowUpRight },
  { href: "/receive", label: "Receive", icon: ArrowDownLeft },
  { href: "/transactions", label: "History", icon: History },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { wallet, disconnect } = useWallet();

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-stellar-blue flex flex-col fixed h-full z-10">
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
          <div className="w-8 h-8 bg-stellar-accent rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg">Stellar Dev</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                router.pathname === href
                  ? "bg-stellar-accent text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/10">
          {wallet && (
            <div className="px-4 py-3 bg-white/5 rounded-xl mb-2">
              <p className="text-xs text-white/40 mb-1">Connected wallet</p>
              <p className="text-xs text-white/80 font-mono truncate">{wallet.publicKey}</p>
            </div>
          )}
          <button
            onClick={disconnect}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 w-full transition-all"
          >
            <LogOut size={18} />
            Disconnect
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 min-h-screen">
        <div className="max-w-4xl mx-auto px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
