import { z } from "zod";

export const customerSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(254),
  phone: z
    .string()
    .trim()
    .min(8, "Enter a valid mobile number")
    .max(20, "Phone number is too long")
    .regex(/^\+?[0-9\s-]{8,20}$/, "Use digits with an optional country code"),
});

export const shippingAddressSchema = z.object({
  line1: z.string().trim().min(3, "Enter your address").max(200),
  line2: z.string().trim().max(200).optional().or(z.literal("")),
  landmark: z.string().trim().max(120).optional().or(z.literal("")),
  city: z.string().trim().min(2, "Enter your city").max(100),
  state: z.string().trim().min(2, "Enter your state").max(100),
  postalCode: z
    .string()
    .trim()
    .min(4, "Enter a valid PIN / postal code")
    .max(12)
    .regex(/^[A-Za-z0-9\s-]{4,12}$/, "Enter a valid PIN / postal code"),
  country: z.string().trim().min(2).max(56),
});

export const checkoutFormSchema = z.object({
  customer: customerSchema,
  shippingAddress: shippingAddressSchema,
  paymentMethod: z.enum(["upi_qr", "razorpay"]),
  giftMessage: z.string().trim().max(300).optional().or(z.literal("")),
  acceptPolicies: z.boolean().refine((value) => value === true, {
    message: "Please confirm you understand the order terms",
  }),
  upiReference: z.string().trim().max(64).optional().or(z.literal("")),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
