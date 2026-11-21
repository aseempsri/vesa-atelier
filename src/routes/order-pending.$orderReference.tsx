import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { VesaGoldRule, VesaLayout } from "@/components/vesa-layout";
import { shopApi } from "@/lib/shop/api-client";
import { formatInrFromPaise } from "@/lib/shop/money";
import type { PublicOrderView } from "@/lib/shop/types";
import { buildPageHead } from "@/lib/seo";
import {
  vesaSans,
  vesaSerif,
  VESA_BODY,
  VESA_CREAM,
  VESA_GOLD,
  VESA_GOLD_SOFT,
} from "@/lib/vesa-brand";

export const Route = createFileRoute("/order-pending/$orderReference")({
  component: OrderPendingPage,
  head: ({ params }) =>
    buildPageHead({
      title: "Awaiting payment verification",
      description: "Your VESA Atelier order is awaiting payment verification.",
      path: `/order-pending/${params.orderReference}`,
      noIndex: true,
    }),
});

function OrderPendingPage() {
  const { orderReference } = Route.useParams();
  const [order, setOrder] = useState<PublicOrderView | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!shopApi.isConfigured()) {
          setError("Order API is not configured.");
          return;
        }
        const view = await shopApi.getOrder(orderReference);
        if (cancelled) return;
        setOrder(view);
      } catch {
        if (!cancelled) setError("We could not load this order.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [orderReference]);

  return (
    <VesaLayout>
      <div className="mx-auto max-w-2xl px-6 pb-16 pt-8 md:px-8 md:pb-24">
        <p
          className="uppercase"
          style={{
            fontFamily: vesaSans,
            fontSize: "0.75rem",
            letterSpacing: "0.55em",
            color: VESA_GOLD_SOFT,
          }}
        >
          Payment pending
        </p>
        <h1
          className="mt-3 text-4xl"
          style={{ fontFamily: vesaSerif, color: VESA_CREAM, fontWeight: 300 }}
        >
          Awaiting payment verification
        </h1>
        <VesaGoldRule />

        {error ? (
          <p style={{ fontFamily: vesaSerif, color: "#e8b4b4" }}>{error}</p>
        ) : !order ? (
          <p style={{ fontFamily: vesaSerif, color: VESA_BODY }}>Loading…</p>
        ) : (
          <div className="space-y-6">
            <p style={{ fontFamily: vesaSerif, color: VESA_BODY, fontSize: "1.15rem" }}>
              Thank you. Your order is recorded, but payment has not been confirmed yet. This is not
              a successful payment receipt — the atelier will verify the UPI transfer against bank
              records before fulfilling the order.
            </p>
            <p style={{ fontFamily: vesaSans, color: VESA_CREAM }}>
              Reference: <span style={{ letterSpacing: "0.08em" }}>{order.publicReference}</span>
            </p>
            <p style={{ fontFamily: vesaSans, color: VESA_BODY }}>
              Amount: {formatInrFromPaise(order.totalInPaise)}
            </p>
            <p style={{ fontFamily: vesaSerif, color: VESA_BODY }}>
              Status: {order.paymentStatus.replaceAll("_", " ")}
            </p>
          </div>
        )}

        <Link
          to="/shop"
          className="mt-10 inline-flex uppercase"
          style={{
            fontFamily: vesaSans,
            fontSize: "0.55rem",
            letterSpacing: "0.35em",
            color: VESA_GOLD,
          }}
        >
          Return to the collection
        </Link>
      </div>
    </VesaLayout>
  );
}
