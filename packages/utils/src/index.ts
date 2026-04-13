export function truncateAddress(address: string, start = 6, end = 4): string {
  if (!address) return "";
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export function formatXLM(amount: string | number, decimals = 4): string {
  return parseFloat(String(amount)).toFixed(decimals);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isValidStellarAddress(address: string): boolean {
  return /^G[A-Z2-7]{55}$/.test(address);
}

export function xlmToStroops(xlm: string | number): string {
  return String(Math.round(parseFloat(String(xlm)) * 10_000_000));
}

export function stroopsToXLM(stroops: string | number): string {
  return (parseInt(String(stroops)) / 10_000_000).toFixed(7);
}
