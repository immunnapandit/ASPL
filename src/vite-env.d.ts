/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RAZORPAY_KEY_ID?: string;
  readonly VITE_RAZORPAY_ORDER_API_URL?: string;
  readonly VITE_RAZORPAY_VERIFY_API_URL?: string;
  readonly VITE_CONTACT_API_URL?: string;
  readonly VITE_CAREER_API_URL?: string;
  readonly VITE_NEWSLETTER_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  method?: {
    card?: boolean;
    netbanking?: boolean;
    upi?: boolean;
  };
  handler?: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void | Promise<void>;
}

interface RazorpayInstance {
  open: () => void;
}

interface Window {
  Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
}
