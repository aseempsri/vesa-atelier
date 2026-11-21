import type { MoneyPaise } from "./types";

/** Assert a value is a non-negative integer suitable for INR paise. */
export function assertPaise(value: unknown, label = "amount"): MoneyPaise {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
    throw new Error(`${label} must be a non-negative integer (paise)`);
  }
  return value;
}

export function isValidPaise(value: unknown): value is MoneyPaise {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

/** Format paise as Indian Rupees display string, e.g. ₹1,499. */
export function formatInrFromPaise(paise: MoneyPaise): string {
  assertPaise(paise, "paise");
  const rupees = paise / 100;
  return `₹${rupees.toLocaleString("en-IN", {
    minimumFractionDigits: paise % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export function sumPaise(values: MoneyPaise[]): MoneyPaise {
  let total = 0;
  for (const value of values) {
    total += assertPaise(value);
  }
  return total;
}

export function multiplyPaise(unit: MoneyPaise, quantity: number): MoneyPaise {
  assertPaise(unit, "unit");
  if (!Number.isInteger(quantity) || quantity < 0) {
    throw new Error("quantity must be a non-negative integer");
  }
  return unit * quantity;
}
