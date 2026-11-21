import { vesaSans, VESA_CREAM, VESA_GOLD, VESA_GOLD_FAINT } from "@/lib/vesa-brand";

type QuantityStepperProps = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  id?: string;
  label?: string;
};

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max,
  id,
  label = "Quantity",
}: QuantityStepperProps) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(typeof max === "number" ? Math.min(max, value + 1) : value + 1);

  return (
    <div className="inline-flex flex-col gap-1">
      <label
        htmlFor={id}
        className="uppercase"
        style={{
          fontFamily: vesaSans,
          fontSize: "0.55rem",
          letterSpacing: "0.35em",
          color: VESA_GOLD,
          paddingLeft: "0.35em",
        }}
      >
        {label}
      </label>
      <div className="inline-flex items-center border" style={{ borderColor: VESA_GOLD_FAINT }}>
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={decrease}
          disabled={value <= min}
          className="px-3 py-2 transition-opacity disabled:opacity-40"
          style={{ color: VESA_CREAM, fontFamily: vesaSans }}
        >
          −
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          aria-live="polite"
          onChange={(e) => {
            const next = Number(e.target.value);
            if (!Number.isInteger(next)) return;
            let clamped = Math.max(min, next);
            if (typeof max === "number") clamped = Math.min(max, clamped);
            onChange(clamped);
          }}
          className="w-12 border-x bg-transparent text-center outline-none"
          style={{
            borderColor: VESA_GOLD_FAINT,
            color: VESA_CREAM,
            fontFamily: vesaSans,
            fontSize: "0.85rem",
            padding: "0.5rem 0",
          }}
        />
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={increase}
          disabled={typeof max === "number" && value >= max}
          className="px-3 py-2 transition-opacity disabled:opacity-40"
          style={{ color: VESA_CREAM, fontFamily: vesaSans }}
        >
          +
        </button>
      </div>
    </div>
  );
}
