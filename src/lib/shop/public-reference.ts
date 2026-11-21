/** Unguessable human-readable order reference (not a sequential DB id). */
export function generatePublicReference(randomBytes?: Uint8Array): string {
  const bytes = randomBytes ?? crypto.getRandomValues(new Uint8Array(8));
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  return `VESA-${stamp}-${hex.slice(0, 10).toUpperCase()}`;
}

export function generateOrderId(randomBytes?: Uint8Array): string {
  const bytes = randomBytes ?? crypto.getRandomValues(new Uint8Array(16));
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `ord_${hex}`;
}
