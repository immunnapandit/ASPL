/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_RAZORPAY_KEY_ID?: string;
  readonly VITE_RAZORPAY_CONFIG_API_URL?: string;
  readonly VITE_RAZORPAY_ORDER_API_URL?: string;
  readonly VITE_RAZORPAY_VERIFY_API_URL?: string;
  readonly VITE_RAZORPAY_EXCHANGE_RATES_API_URL?: string;
  readonly VITE_CONTACT_API_URL?: string;
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
  image?: string;
  order_id: string;
  timeout?: number;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
    method?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
    backdrop_color?: string;
  };
  readonly?: {
    contact?: boolean;
    email?: boolean;
    name?: boolean;
  };
  retry?: {
    enabled?: boolean;
  };
  modal?: {
    backdropclose?: boolean;
    escape?: boolean;
    handleback?: boolean;
    confirm_close?: boolean;
    ondismiss?: () => void;
  };
  config?: {
    display?: {
      language?: string;
      sequence?: string[];
      blocks?: Record<
        string,
        {
          name: string;
          instruments: Array<{
            method: string;
          }>;
        }
      >;
      preferences?: {
        show_default_blocks?: boolean;
      };
    };
  };
  handler?: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void | Promise<void>;
}

interface RazorpayFailedResponse {
  error?: {
    code?: string;
    description?: string;
    reason?: string;
    source?: string;
    step?: string;
    metadata?: {
      order_id?: string;
      payment_id?: string;
    };
  };
}

interface RazorpayInstance {
  open: () => void;
  on?: (event: 'payment.failed', callback: (response: RazorpayFailedResponse) => void) => void;
}

interface Window {
  Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
}
