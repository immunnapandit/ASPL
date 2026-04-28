import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeIndianRupee,
  Building2,
  CheckCircle2,
  CircleAlert,
  Copy,
  CreditCard,
  ExternalLink,
  Globe,
  Landmark,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  QrCode,
  ShieldAlert,
  ShieldCheck,
  User,
} from 'lucide-react';
import '../../styles/scss/layout/_pay-now.scss';

type PaymentMethod = 'card' | 'upi' | 'netbanking';

type PaymentFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  pincode: string;
  amount: string;
  currency: string;
  pan: string;
  gstn: string;
  paymentMethod: PaymentMethod;
};

type UpiDetails = {
  id: string;
  qrImageUrl: string;
  intentUrl: string;
};

type BankDetails = {
  accountName: string;
  accountNumber: string;
  ifsc: string;
  bankName: string;
  branch: string;
  accountType: string;
  micr: string;
  swiftCode: string;
};

type PaymentGatewayConfig = {
  keyId: string;
  isConfigured: boolean;
  merchantName: string;
  merchantDescription: string;
  defaultCourse: string;
  defaultAmount: number;
  defaultCurrency: string;
  supportedCurrencies: string[];
  supportedMethods: PaymentMethod[];
  themeColor: string;
  logoUrl?: string;
  supportEmail: string;
  supportPhone: string;
  supportUrl: string;
  companyPan: string;
  companyGstin: string;
  upiDetails: UpiDetails | null;
  bankDetails: BankDetails | null;
  missingConfiguration: string[];
};

type RazorpayOrderResponse = {
  id: string;
  amount: number;
  currency: string;
  merchantName?: string;
  merchantDescription?: string;
};

type VerifiedPayment = {
  id: string | null;
  orderId: string | null;
  status: string;
  method: string | null;
  amount: number | null;
  currency: string | null;
  captured: boolean | null;
};

type RazorpayVerifyResponse = {
  verified: boolean;
  payment?: VerifiedPayment;
  error?: string;
};

type ExchangeRateSnapshot = {
  base: string;
  date: string;
  rates: Record<string, number>;
  source: string;
  stale?: boolean;
  error?: string;
};

type CheckoutStatusTone = 'info' | 'success' | 'error' | 'warning';

type CheckoutStatus = {
  tone: CheckoutStatusTone;
  message: string;
};

type FieldErrors = Partial<Record<keyof PaymentFormState, string>>;

type MethodOption = {
  id: PaymentMethod;
  label: string;
  helper: string;
  icon: typeof CreditCard;
};

type CurrencyOption = {
  code: string;
  label: string;
  fractionDigits?: number;
};

const METHOD_OPTIONS: MethodOption[] = [
  {
    id: 'card',
    label: 'Card',
    helper: 'Debit / Credit - Razorpay',
    icon: CreditCard,
  },
  {
    id: 'netbanking',
    label: 'Bank Transfer',
    helper: 'Beneficiary bank details for transfer',
    icon: Landmark,
  },
  {
    id: 'upi',
    label: 'QR / UPI',
    helper: 'AtiSunya QR or UPI app payment',
    icon: QrCode,
  },
];

const DEFAULT_SUPPORTED_CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: 'INR', label: 'Indian Rupee' },
  { code: 'AUD', label: 'Australian Dollar' },
  { code: 'USD', label: 'US Dollar' },
  { code: 'EUR', label: 'Euro' },
  { code: 'GBP', label: 'British Pound Sterling' },
  { code: 'AED', label: 'UAE Dirham' },
];

const DEFAULT_SUPPORTED_CURRENCIES = DEFAULT_SUPPORTED_CURRENCY_OPTIONS.map(
  (currency) => currency.code
);
const DEFAULT_UPI_QR_IMAGE_URL = '/payments/atisunya-upi-qr.jpeg';
const CONVERSION_BASE_CURRENCY = 'INR';

const CURRENCY_OPTION_LOOKUP = new Map(
  DEFAULT_SUPPORTED_CURRENCY_OPTIONS.map((currency) => [currency.code, currency])
);

const DEFAULT_GATEWAY_CONFIG: PaymentGatewayConfig = {
  keyId: (import.meta.env.VITE_RAZORPAY_KEY_ID || '').trim(),
  isConfigured: Boolean((import.meta.env.VITE_RAZORPAY_KEY_ID || '').trim()),
  merchantName: 'AtiSunya',
  merchantDescription: 'Microsoft Certified Trainer Readiness Program',
  defaultCourse: 'Microsoft Certified Trainer Readiness',
  defaultAmount: 35400,
  defaultCurrency: 'INR',
  supportedCurrencies: DEFAULT_SUPPORTED_CURRENCIES,
  supportedMethods: ['card', 'upi', 'netbanking'],
  themeColor: '#0f52ba',
  logoUrl: '',
  supportEmail: '',
  supportPhone: '',
  supportUrl: '',
  companyPan: '',
  companyGstin: '',
  upiDetails: {
    id: '',
    qrImageUrl: DEFAULT_UPI_QR_IMAGE_URL,
    intentUrl: '',
  },
  bankDetails: null,
  missingConfiguration: [],
};

const INITIAL_FORM_STATE: PaymentFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  state: '',
  pincode: '',
  amount: String(DEFAULT_GATEWAY_CONFIG.defaultAmount),
  currency: DEFAULT_GATEWAY_CONFIG.defaultCurrency,
  pan: '',
  gstn: '',
  paymentMethod: 'card',
};

function buildApiUrl(explicitUrl: string | undefined, path: string) {
  const directUrl = explicitUrl?.trim();

  if (directUrl) {
    return directUrl;
  }

  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (configuredBaseUrl) {
    return `${configuredBaseUrl.replace(/\/+$/, '')}${normalizedPath}`;
  }

  if (typeof window !== 'undefined') {
    const isLocalhost =
      window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isLocalhost) {
      return `http://localhost:5002${normalizedPath}`;
    }

    return `${window.location.origin}${normalizedPath}`;
  }

  return `http://localhost:5002${normalizedPath}`;
}

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-razorpay-checkout="true"]'
    );

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true), { once: true });
      existingScript.addEventListener('error', () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.dataset.razorpayCheckout = 'true';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function formatCurrencyAmount(amount: number, currency: string, maximumFractionDigits = 0) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(amount);
}

function getApiErrorMessage(response: Response, fallback: string) {
  return response
    .text()
    .then((body) => {
      if (!body) {
        return fallback;
      }

      try {
        const parsed = JSON.parse(body) as { error?: string; details?: string };
        return parsed.error || parsed.details || fallback;
      } catch {
        return body;
      }
    })
    .catch(() => fallback);
}

function normaliseMethodList(methods: PaymentMethod[] | undefined) {
  const values = (methods || []).filter((method): method is PaymentMethod =>
    METHOD_OPTIONS.some((entry) => entry.id === method)
  );

  return values.length ? values : DEFAULT_GATEWAY_CONFIG.supportedMethods;
}

function normaliseCurrencyList(currencies: string[] | undefined) {
  const values = Array.from(
    new Set(
      (currencies || [])
        .map((currency) => currency.trim().toUpperCase())
        .filter(Boolean)
    )
  );

  return values.length
    ? Array.from(new Set([...values, ...DEFAULT_GATEWAY_CONFIG.supportedCurrencies]))
    : DEFAULT_GATEWAY_CONFIG.supportedCurrencies;
}

function normaliseUpiDetails(upiDetails: Partial<UpiDetails> | null | undefined) {
  if (!upiDetails || typeof upiDetails !== 'object') {
    return null;
  }

  const normalized = {
    id: upiDetails.id?.trim() || '',
    qrImageUrl: upiDetails.qrImageUrl?.trim() || DEFAULT_UPI_QR_IMAGE_URL,
    intentUrl: upiDetails.intentUrl?.trim() || '',
  } satisfies UpiDetails;

  return normalized.id || normalized.qrImageUrl || normalized.intentUrl ? normalized : null;
}

function normaliseBankDetails(bankDetails: Partial<BankDetails> | null | undefined) {
  if (!bankDetails || typeof bankDetails !== 'object') {
    return null;
  }

  const normalized = {
    accountName: bankDetails.accountName?.trim() || '',
    accountNumber: bankDetails.accountNumber?.trim() || '',
    ifsc: bankDetails.ifsc?.trim().toUpperCase() || '',
    bankName: bankDetails.bankName?.trim() || '',
    branch: bankDetails.branch?.trim() || '',
    accountType: bankDetails.accountType?.trim() || '',
    micr: bankDetails.micr?.trim() || '',
    swiftCode: bankDetails.swiftCode?.trim().toUpperCase() || '',
  } satisfies BankDetails;

  return Object.values(normalized).some(Boolean) ? normalized : null;
}

function mergeGatewayConfig(config: Partial<PaymentGatewayConfig>) {
  const supportedCurrencies = normaliseCurrencyList(config.supportedCurrencies);
  const missingConfiguration = Array.isArray(config.missingConfiguration)
    ? config.missingConfiguration
        .map((item) => (typeof item === 'string' ? item.trim() : ''))
        .filter(Boolean)
    : DEFAULT_GATEWAY_CONFIG.missingConfiguration;
  const upiDetails =
    normaliseUpiDetails(config.upiDetails) ||
    ({
      id: '',
      qrImageUrl: DEFAULT_UPI_QR_IMAGE_URL,
      intentUrl: '',
    } satisfies UpiDetails);

  return {
    ...DEFAULT_GATEWAY_CONFIG,
    ...config,
    supportedCurrencies,
    supportedMethods: normaliseMethodList(config.supportedMethods),
    defaultCurrency:
      config.defaultCurrency?.trim().toUpperCase() ||
      supportedCurrencies[0] ||
      DEFAULT_GATEWAY_CONFIG.defaultCurrency,
    defaultAmount:
      typeof config.defaultAmount === 'number' && Number.isFinite(config.defaultAmount)
        ? config.defaultAmount
        : DEFAULT_GATEWAY_CONFIG.defaultAmount,
    keyId: config.keyId?.trim() || DEFAULT_GATEWAY_CONFIG.keyId,
    isConfigured:
      typeof config.isConfigured === 'boolean'
        ? config.isConfigured
        : Boolean(config.keyId?.trim() || DEFAULT_GATEWAY_CONFIG.keyId),
    supportEmail: config.supportEmail?.trim() || DEFAULT_GATEWAY_CONFIG.supportEmail,
    supportPhone: config.supportPhone?.trim() || DEFAULT_GATEWAY_CONFIG.supportPhone,
    supportUrl: config.supportUrl?.trim() || DEFAULT_GATEWAY_CONFIG.supportUrl,
    companyPan: config.companyPan?.trim().toUpperCase() || DEFAULT_GATEWAY_CONFIG.companyPan,
    companyGstin:
      config.companyGstin?.trim().toUpperCase() || DEFAULT_GATEWAY_CONFIG.companyGstin,
    upiDetails,
    bankDetails: normaliseBankDetails(config.bankDetails),
    missingConfiguration,
  } satisfies PaymentGatewayConfig;
}

function buildCheckoutDisplayConfig(paymentMethod: PaymentMethod) {
  return {
    display: {
      blocks: {
        preferred: {
          name: 'Preferred',
          instruments: [{ method: paymentMethod }],
        },
      },
      sequence: ['block.preferred'],
      preferences: {
        show_default_blocks: true,
      },
    },
  };
}

function buildFullName(firstName: string, lastName: string) {
  return [firstName.trim(), lastName.trim()].filter(Boolean).join(' ');
}

function isValidPostalCode(value: string) {
  return /^[A-Z0-9][A-Z0-9\s-]{2,11}$/i.test(value.trim());
}

function getCurrencyFractionDigits(currency: string) {
  return CURRENCY_OPTION_LOOKUP.get(currency.trim().toUpperCase())?.fractionDigits ?? 2;
}

function toMinorCurrencyUnit(amount: number, currency: string) {
  const fractionDigits = getCurrencyFractionDigits(currency);
  return Math.round(amount * 10 ** fractionDigits);
}

function formatCurrencyOptionLabel(currency: string) {
  const normalizedCurrency = currency.trim().toUpperCase();
  const option = CURRENCY_OPTION_LOOKUP.get(normalizedCurrency);

  return option ? `${option.code} - ${option.label}` : normalizedCurrency;
}

function sanitizeAmountInput(value: string) {
  const normalized = value.replace(/[^\d.]/g, '');
  const [whole, ...fractionParts] = normalized.split('.');

  return fractionParts.length > 0 ? `${whole}.${fractionParts.join('')}` : whole;
}

function formatEditableAmount(amount: number, currency: string) {
  if (!Number.isFinite(amount)) {
    return '';
  }

  const fractionDigits = getCurrencyFractionDigits(currency);

  if (fractionDigits === 0) {
    return String(Math.round(amount));
  }

  return amount
    .toFixed(fractionDigits)
    .replace(/(\.\d*?[1-9])0+$/u, '$1')
    .replace(/\.0+$/u, '');
}

function formatExchangeRateValue(rate: number) {
  if (!Number.isFinite(rate) || rate <= 0) {
    return '';
  }

  if (rate >= 100) {
    return rate.toFixed(2);
  }

  if (rate >= 1) {
    return rate
      .toFixed(3)
      .replace(/(\.\d*?[1-9])0+$/u, '$1')
      .replace(/\.0+$/u, '');
  }

  return rate
    .toFixed(4)
    .replace(/(\.\d*?[1-9])0+$/u, '$1')
    .replace(/\.0+$/u, '');
}

function convertAmountWithRates({
  amount,
  fromCurrency,
  toCurrency,
  baseCurrency,
  rates,
}: {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  baseCurrency: string;
  rates: Record<string, number>;
}) {
  const from = fromCurrency.trim().toUpperCase();
  const to = toCurrency.trim().toUpperCase();
  const base = baseCurrency.trim().toUpperCase();

  if (!Number.isFinite(amount)) {
    return null;
  }

  if (from === to) {
    return amount;
  }

  const amountInBase =
    from === base ? amount : rates[from] && rates[from] > 0 ? amount / rates[from] : null;

  if (amountInBase === null) {
    return null;
  }

  const converted =
    to === base ? amountInBase : rates[to] && rates[to] > 0 ? amountInBase * rates[to] : null;

  return converted === null ? null : Number(converted.toFixed(getCurrencyFractionDigits(to)));
}

function normaliseExchangeRateSnapshot(
  payload: Partial<ExchangeRateSnapshot> | null | undefined,
  fallbackBaseCurrency: string
) {
  if (!payload || typeof payload !== 'object' || !payload.rates || typeof payload.rates !== 'object') {
    return null;
  }

  const rates = Object.fromEntries(
    Object.entries(payload.rates)
      .filter(([, rate]) => typeof rate === 'number' && Number.isFinite(rate) && rate > 0)
      .map(([currency, rate]) => [currency.toUpperCase(), rate])
  );

  return {
    base: payload.base?.trim().toUpperCase() || fallbackBaseCurrency,
    date: typeof payload.date === 'string' ? payload.date : new Date().toISOString().slice(0, 10),
    rates,
    source:
      typeof payload.source === 'string' && payload.source.trim()
        ? payload.source.trim()
        : 'Frankfurter reference rates',
    stale: Boolean(payload.stale),
    error: typeof payload.error === 'string' ? payload.error : undefined,
  } satisfies ExchangeRateSnapshot;
}

function validateFormState(formState: PaymentFormState, supportedCurrencies: string[]) {
  const errors: FieldErrors = {};
  const amount = Number(formState.amount);
  const phoneDigits = formState.phone.replace(/\D/g, '');
  const amountFraction = formState.amount.split('.')[1] || '';
  const currencyFractionDigits = getCurrencyFractionDigits(formState.currency);

  if (!formState.firstName.trim()) {
    errors.firstName = 'Enter your first name.';
  }

  if (!formState.lastName.trim()) {
    errors.lastName = 'Enter your last name.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = 'Enter a valid phone number.';
  }

  if (!formState.addressLine1.trim()) {
    errors.addressLine1 = 'Enter address line 1.';
  }

  if (!formState.state.trim()) {
    errors.state = 'Enter your state or region.';
  }

  if (!formState.pincode.trim()) {
    errors.pincode = 'Enter your pincode or ZIP / postal code.';
  } else if (!isValidPostalCode(formState.pincode)) {
    errors.pincode = 'Enter a valid pincode or ZIP / postal code.';
  }

  if (!Number.isFinite(amount) || amount < 1) {
    errors.amount = 'Enter a valid amount.';
  } else if (amountFraction.length > currencyFractionDigits) {
    errors.amount =
      currencyFractionDigits === 0
        ? 'This currency does not support decimal amounts.'
        : `Use up to ${currencyFractionDigits} decimal places for ${formState.currency}.`;
  }

  if (!supportedCurrencies.includes(formState.currency.toUpperCase())) {
    errors.currency = 'Selected currency is not supported.';
  }

  if (formState.pan.trim() && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formState.pan.trim().toUpperCase())) {
    errors.pan = 'Enter a valid PAN such as ABCDE1234F.';
  }

  if (
    formState.gstn.trim() &&
    !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][A-Z0-9]Z[A-Z0-9]$/.test(
      formState.gstn.trim().toUpperCase()
    )
  ) {
    errors.gstn = 'Enter a valid GSTIN.';
  }

  if (formState.currency.toUpperCase() !== 'INR' && formState.paymentMethod !== 'card') {
    errors.paymentMethod = 'UPI and netbanking are available only for INR.';
  }

  return errors;
}

function formatPaymentMethod(method: string | null | undefined) {
  if (method === 'card') {
    return 'Card';
  }

  if (method === 'upi') {
    return 'QR / UPI';
  }

  if (method === 'netbanking') {
    return 'Bank Transfer';
  }

  return method ? method.toUpperCase() : 'Pending';
}

function getMethodOption(method: PaymentMethod) {
  return METHOD_OPTIONS.find((option) => option.id === method) || METHOD_OPTIONS[0];
}

function hasUpiFallback(upiDetails: UpiDetails | null) {
  return Boolean(upiDetails?.id || upiDetails?.qrImageUrl || upiDetails?.intentUrl);
}

function hasBankFallback(bankDetails: BankDetails | null) {
  return Boolean(
    bankDetails?.accountName ||
      bankDetails?.accountNumber ||
      bankDetails?.ifsc ||
      bankDetails?.bankName ||
      bankDetails?.branch
  );
}

function buildUpiIntentLink({
  upiId,
  merchantName,
  course,
  amount,
  currency,
}: {
  upiId: string;
  merchantName: string;
  course: string;
  amount: number;
  currency: string;
}) {
  if (!upiId.trim() || currency.toUpperCase() !== 'INR' || !Number.isFinite(amount) || amount < 1) {
    return '';
  }

  const params = new URLSearchParams({
    pa: upiId.trim(),
    pn: merchantName.trim() || 'AtiSunya',
    am: amount.toFixed(2),
    cu: currency.toUpperCase(),
    tn: course.trim() || 'Program Fee Payment',
  });

  return `upi://pay?${params.toString()}`;
}

function getCheckoutDescription({
  paymentMethod,
  isOnlineCheckoutReady,
  hasManualUpi,
  hasManualBank,
}: {
  paymentMethod: PaymentMethod;
  isOnlineCheckoutReady: boolean;
  hasManualUpi: boolean;
  hasManualBank: boolean;
}) {
  if (paymentMethod === 'card') {
    return isOnlineCheckoutReady
      ? 'Razorpay will open a secure card checkout with your details prefilled.'
      : 'Card payments need live Razorpay keys on the backend before the checkout can open.';
  }

  if (paymentMethod === 'upi') {
    if (hasManualUpi) {
      return 'Scan the AtiSunya QR code or open your UPI app using the details shown below.';
    }

    if (isOnlineCheckoutReady) {
      return 'Razorpay will show UPI apps and QR options inside the secure checkout popup.';
    }

    return 'Add UPI ID or QR details on the backend to make this option usable before checkout goes live.';
  }

  if (hasManualBank) {
    return 'Use the beneficiary bank details shown below to complete the transfer for this payment.';
  }

  if (isOnlineCheckoutReady) {
    return 'Razorpay will show supported banks and continue the bank transfer in a secure flow.';
  }

  return 'Add bank transfer details on the backend if you want a manual fallback for netbanking.';
}

function getSubmitButtonLabel({
  paymentMethod,
  isOnlineCheckoutReady,
  hasManualFallback,
  hasUpiIntent,
}: {
  paymentMethod: PaymentMethod;
  isOnlineCheckoutReady: boolean;
  hasManualFallback: boolean;
  hasUpiIntent: boolean;
}) {
  if (paymentMethod === 'upi' && hasManualFallback) {
    return hasUpiIntent ? 'Open QR / UPI' : 'View QR';
  }

  if (paymentMethod === 'netbanking' && hasManualFallback) {
    return 'View Bank Details';
  }

  if (isOnlineCheckoutReady) {
    if (paymentMethod === 'card') {
      return 'Pay by Card';
    }

    if (paymentMethod === 'upi') {
      return 'Continue to QR / UPI';
    }

    return 'Continue to Bank Transfer';
  }

  return 'Checkout Setup Needed';
}

export default function PayNow() {
  const [formState, setFormState] = useState<PaymentFormState>(INITIAL_FORM_STATE);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<CheckoutStatus | null>(null);
  const [gatewayConfig, setGatewayConfig] = useState<PaymentGatewayConfig>(DEFAULT_GATEWAY_CONFIG);
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastPayment, setLastPayment] = useState<VerifiedPayment | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isQrPreviewOpen, setIsQrPreviewOpen] = useState(false);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRateSnapshot | null>(null);
  const [isLoadingExchangeRates, setIsLoadingExchangeRates] = useState(false);
  const [exchangeRateError, setExchangeRateError] = useState<string | null>(null);
  const summaryRef = useRef<HTMLElement | null>(null);

  const configApiUrl = useMemo(
    () => buildApiUrl(import.meta.env.VITE_RAZORPAY_CONFIG_API_URL, '/api/razorpay/config'),
    []
  );
  const orderApiUrl = useMemo(
    () => buildApiUrl(import.meta.env.VITE_RAZORPAY_ORDER_API_URL, '/api/razorpay/order'),
    []
  );
  const verifyApiUrl = useMemo(
    () => buildApiUrl(import.meta.env.VITE_RAZORPAY_VERIFY_API_URL, '/api/razorpay/verify'),
    []
  );
  const ratesApiUrl = useMemo(
    () =>
      buildApiUrl(
        import.meta.env.VITE_RAZORPAY_EXCHANGE_RATES_API_URL,
        '/api/razorpay/exchange-rates'
      ),
    []
  );

  const amountValue = useMemo(() => Number(formState.amount || 0), [formState.amount]);
  const amountInMinorUnit = useMemo(
    () =>
      (Number.isFinite(amountValue)
        ? toMinorCurrencyUnit(amountValue, formState.currency)
        : 0),
    [amountValue, formState.currency]
  );

  const payableAmount = useMemo(
    () =>
      formatCurrencyAmount(
        Number(formState.amount || 0),
        formState.currency,
        getCurrencyFractionDigits(formState.currency)
      ),
    [formState.amount, formState.currency]
  );
  const customerFullName = useMemo(
    () => buildFullName(formState.firstName, formState.lastName),
    [formState.firstName, formState.lastName]
  );
  const selectedCurrencyLabel = useMemo(
    () => formatCurrencyOptionLabel(formState.currency),
    [formState.currency]
  );
  const isInternationalCurrency = formState.currency.toUpperCase() !== 'INR';
  const supportedQuoteCurrencies = useMemo(
    () =>
      gatewayConfig.supportedCurrencies.filter(
        (currency) => currency.trim().toUpperCase() !== CONVERSION_BASE_CURRENCY
      ),
    [gatewayConfig.supportedCurrencies]
  );
  const selectedExchangeRate = useMemo(() => {
    if (!exchangeRates || formState.currency.toUpperCase() === CONVERSION_BASE_CURRENCY) {
      return null;
    }

    return exchangeRates.rates[formState.currency.toUpperCase()] ?? null;
  }, [exchangeRates, formState.currency]);
  const exchangeRateNote = useMemo(() => {
    if (!supportedQuoteCurrencies.length) {
      return '';
    }

    if (isLoadingExchangeRates) {
      return 'Loading the latest conversion rates for international card checkout.';
    }

    if (exchangeRateError) {
      return exchangeRateError;
    }

    if (!exchangeRates) {
      return 'Latest conversion rates are not available right now.';
    }

    if (selectedExchangeRate && formState.currency.toUpperCase() !== CONVERSION_BASE_CURRENCY) {
      return `1 ${CONVERSION_BASE_CURRENCY} = ${formatExchangeRateValue(selectedExchangeRate)} ${formState.currency.toUpperCase()}. ${exchangeRates.stale ? 'Showing cached reference rates' : 'Reference rates updated'} on ${exchangeRates.date}.`;
    }

    return `Base pricing is in ${CONVERSION_BASE_CURRENCY}. Switching currency will auto-convert the current amount using ${exchangeRates.stale ? 'cached ' : ''}reference rates from ${exchangeRates.date}.`;
  }, [
    exchangeRateError,
    exchangeRates,
    formState.currency,
    isLoadingExchangeRates,
    selectedExchangeRate,
    supportedQuoteCurrencies.length,
  ]);

  const isOnlineCheckoutReady = gatewayConfig.isConfigured && Boolean(gatewayConfig.keyId);
  const hasManualUpi = hasUpiFallback(gatewayConfig.upiDetails);
  const hasManualBank = hasBankFallback(gatewayConfig.bankDetails);

  const selectedMethodOption = useMemo(
    () => getMethodOption(formState.paymentMethod),
    [formState.paymentMethod]
  );

  const checkoutDescription = useMemo(
    () =>
      getCheckoutDescription({
        paymentMethod: formState.paymentMethod,
        isOnlineCheckoutReady,
        hasManualUpi,
        hasManualBank,
      }),
    [formState.paymentMethod, hasManualBank, hasManualUpi, isOnlineCheckoutReady]
  );

  const manualUpiIntentUrl = useMemo(
    () =>
      gatewayConfig.upiDetails?.intentUrl ||
      buildUpiIntentLink({
        upiId: gatewayConfig.upiDetails?.id || '',
        merchantName: gatewayConfig.merchantName,
        course: gatewayConfig.defaultCourse,
        amount: amountValue,
        currency: formState.currency,
      }),
    [
      amountValue,
      formState.currency,
      gatewayConfig.defaultCourse,
      gatewayConfig.merchantName,
      gatewayConfig.upiDetails?.id,
      gatewayConfig.upiDetails?.intentUrl,
    ]
  );

  const hasManualFallback =
    formState.paymentMethod === 'upi'
      ? hasManualUpi
      : formState.paymentMethod === 'netbanking'
        ? hasManualBank
        : false;
  const usesManualFlow =
    (formState.paymentMethod === 'upi' && hasManualUpi) ||
    (formState.paymentMethod === 'netbanking' && hasManualBank);

  const canSubmit = !isLoadingConfig && (isOnlineCheckoutReady || hasManualFallback);

  const submitLabel = useMemo(
    () =>
      getSubmitButtonLabel({
        paymentMethod: formState.paymentMethod,
        isOnlineCheckoutReady,
        hasManualFallback,
        hasUpiIntent: Boolean(manualUpiIntentUrl),
      }),
    [formState.paymentMethod, hasManualFallback, isOnlineCheckoutReady, manualUpiIntentUrl]
  );

  const summaryBadgeTone = usesManualFlow ? 'warning' : isOnlineCheckoutReady ? 'success' : 'neutral';

  const summaryBadgeLabel = usesManualFlow
    ? 'Manual Payment Ready'
    : isOnlineCheckoutReady
      ? 'Razorpay Live'
      : 'Setup Pending';
  const checkoutChannelLabel = usesManualFlow
    ? formState.paymentMethod === 'upi'
      ? 'Manual QR'
      : 'Bank details'
    : isOnlineCheckoutReady
      ? 'Razorpay popup'
      : 'Guided fallback';

  useEffect(() => {
    let isMounted = true;

    async function loadGatewayConfig() {
      setIsLoadingConfig(true);

      try {
        const response = await fetch(configApiUrl);
        const payload = (await response.json()) as Partial<PaymentGatewayConfig>;

        if (!response.ok) {
          throw new Error('Unable to load payment configuration.');
        }

        if (!isMounted) {
          return;
        }

        const mergedConfig = mergeGatewayConfig(payload);
        setGatewayConfig(mergedConfig);
        setFormState((current) => ({
          ...current,
          amount: String(mergedConfig.defaultAmount),
          currency: mergedConfig.defaultCurrency,
          paymentMethod: mergedConfig.supportedMethods[0] || 'card',
        }));

        if (!mergedConfig.isConfigured) {
          setStatus({
            tone: 'warning',
            message:
              'Online Razorpay checkout is not live yet. Add the missing backend keys or use the manual fallback shown for UPI / bank transfer.',
          });
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setStatus({
          tone: 'warning',
          message:
            error instanceof Error ? error.message : 'Unable to load payment configuration.',
        });
      } finally {
        if (isMounted) {
          setIsLoadingConfig(false);
        }
      }
    }

    loadGatewayConfig();

    return () => {
      isMounted = false;
    };
  }, [configApiUrl]);

  useEffect(() => {
    if (!gatewayConfig.supportedMethods.includes(formState.paymentMethod)) {
      setFormState((current) => ({
        ...current,
        paymentMethod: gatewayConfig.supportedMethods[0] || 'card',
      }));
    }
  }, [formState.paymentMethod, gatewayConfig.supportedMethods]);

  useEffect(() => {
    if (formState.currency.toUpperCase() !== 'INR' && formState.paymentMethod !== 'card') {
      setFormState((current) => ({
        ...current,
        paymentMethod: 'card',
      }));
    }
  }, [formState.currency, formState.paymentMethod]);

  useEffect(() => {
    if (!supportedQuoteCurrencies.length) {
      setExchangeRates({
        base: CONVERSION_BASE_CURRENCY,
        date: new Date().toISOString().slice(0, 10),
        rates: {},
        source: 'Reference rates',
        stale: false,
      });
      setExchangeRateError(null);
      return;
    }

    let isMounted = true;
    const controller = new AbortController();

    async function loadExchangeRates() {
      setIsLoadingExchangeRates(true);
      setExchangeRateError(null);

      try {
        const loadSnapshot = async (url: string) => {
          const response = await fetch(url, {
            signal: controller.signal,
          });

          if (!response.ok) {
            throw new Error(
              await getApiErrorMessage(response, 'Unable to load exchange rates right now.')
            );
          }

          const payload = normaliseExchangeRateSnapshot(
            (await response.json()) as Partial<ExchangeRateSnapshot>,
            CONVERSION_BASE_CURRENCY
          );

          if (!payload) {
            throw new Error('Exchange rate response was invalid.');
          }

          return payload;
        };

        const internalUrl = new URL(ratesApiUrl);
        internalUrl.searchParams.set('base', CONVERSION_BASE_CURRENCY);
        internalUrl.searchParams.set('quotes', supportedQuoteCurrencies.join(','));

        const fallbackUrl = new URL('https://api.frankfurter.dev/v1/latest');
        fallbackUrl.searchParams.set('base', CONVERSION_BASE_CURRENCY);
        fallbackUrl.searchParams.set('symbols', supportedQuoteCurrencies.join(','));

        let payload: ExchangeRateSnapshot | null = null;

        try {
          payload = await loadSnapshot(internalUrl.toString());
        } catch {
          payload = await loadSnapshot(fallbackUrl.toString());
        }

        if (!isMounted || !payload) {
          return;
        }

        setExchangeRates(payload);
        setExchangeRateError(null);
      } catch (error) {
        if (!isMounted || (error instanceof DOMException && error.name === 'AbortError')) {
          return;
        }

        setExchangeRates(null);
        setExchangeRateError(
          error instanceof Error
            ? error.message
            : 'Unable to load exchange rates right now.'
        );
      } finally {
        if (isMounted) {
          setIsLoadingExchangeRates(false);
        }
      }
    }

    loadExchangeRates();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [ratesApiUrl, supportedQuoteCurrencies]);

  function scrollToSummary() {
    window.requestAnimationFrame(() => {
      summaryRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  function handleMethodSelect(method: PaymentMethod) {
    updateField('paymentMethod', method);

    if (method === 'upi' || method === 'netbanking') {
      scrollToSummary();
    }
  }

  function clearFieldErrors(fields: Array<keyof PaymentFormState>) {
    setFieldErrors((current) => {
      let hasChanges = false;
      const nextErrors = { ...current };

      for (const field of fields) {
        if (nextErrors[field]) {
          delete nextErrors[field];
          hasChanges = true;
        }
      }

      return hasChanges ? nextErrors : current;
    });
  }

  function updateField<K extends keyof PaymentFormState>(field: K, value: PaymentFormState[K]) {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));

    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[field];
      return nextErrors;
    });
  }

  function handleCurrencyChange(nextCurrencyValue: string) {
    const nextCurrency = nextCurrencyValue.trim().toUpperCase() as PaymentFormState['currency'];
    const currentCurrency = formState.currency.trim().toUpperCase();

    if (!nextCurrency || nextCurrency === currentCurrency) {
      return;
    }

    const currentAmount = Number(formState.amount);

    if (!formState.amount.trim() || !Number.isFinite(currentAmount) || currentAmount <= 0) {
      updateField('currency', nextCurrency);
      return;
    }

    if (isLoadingExchangeRates) {
      setStatus({
        tone: 'info',
        message: 'Currency rates are still loading. Please wait a moment and try again.',
      });
      return;
    }

    if (!exchangeRates) {
      setStatus({
        tone: 'warning',
        message:
          'Live conversion rates are unavailable right now, so the amount could not be converted safely. Please try again shortly or continue with INR.',
      });
      return;
    }

    const convertedAmount = convertAmountWithRates({
      amount: currentAmount,
      fromCurrency: currentCurrency,
      toCurrency: nextCurrency,
      baseCurrency: CONVERSION_BASE_CURRENCY,
      rates: exchangeRates.rates,
    });

    if (convertedAmount === null) {
      setStatus({
        tone: 'warning',
        message: `Unable to convert ${currentCurrency} to ${nextCurrency} right now. Please try again shortly.`,
      });
      return;
    }

    setFormState((current) => ({
      ...current,
      currency: nextCurrency,
      amount: formatEditableAmount(convertedAmount, nextCurrency),
      paymentMethod:
        nextCurrency !== 'INR' && current.paymentMethod !== 'card'
          ? 'card'
          : current.paymentMethod,
    }));
    clearFieldErrors(['currency', 'amount', 'paymentMethod']);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    switch (name) {
      case 'phone':
        updateField(
          'phone',
          value.replace(/[^+\d\s-]/g, '').slice(0, 20) as PaymentFormState['phone']
        );
        return;
      case 'amount':
        updateField('amount', sanitizeAmountInput(value) as PaymentFormState['amount']);
        return;
      case 'currency':
        handleCurrencyChange(value);
        return;
      case 'pincode':
        updateField(
          'pincode',
          value.toUpperCase().replace(/[^A-Z0-9\s-]/g, '').slice(0, 12) as PaymentFormState['pincode']
        );
        return;
      case 'pan':
        updateField(
          'pan',
          value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10) as PaymentFormState['pan']
        );
        return;
      case 'gstn':
        updateField(
          'gstn',
          value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 15) as PaymentFormState['gstn']
        );
        return;
      default:
        updateField(name as keyof PaymentFormState, value as PaymentFormState[keyof PaymentFormState]);
    }
  }

  function openActionUrl(url: string, openInNewTab = false) {
    if (!url.trim()) {
      return false;
    }

    if (openInNewTab && /^https?:\/\//i.test(url)) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return true;
    }

    window.location.assign(url);
    return true;
  }

  function handleManualUpiAction() {
    if (gatewayConfig.upiDetails?.qrImageUrl) {
      setStatus({
        tone: 'info',
        message: `Scan the AtiSunya QR code to pay ${payableAmount}.`,
      });
      setIsQrPreviewOpen(true);
      return;
    }

    if (manualUpiIntentUrl) {
      setStatus({
        tone: 'info',
        message:
          'Trying to open your UPI app. If nothing opens, use the QR code or UPI ID shown below.',
      });
      openActionUrl(manualUpiIntentUrl);
    }
  }

  function handleQrPreviewOpen() {
    if (!gatewayConfig.upiDetails?.qrImageUrl) {
      return;
    }

    setIsQrPreviewOpen(true);
  }

  function handleQrPreviewClose() {
    setIsQrPreviewOpen(false);
  }

  function handleQrImageOpen() {
    if (!gatewayConfig.upiDetails?.qrImageUrl) {
      return;
    }

    window.open(gatewayConfig.upiDetails.qrImageUrl, '_blank', 'noopener,noreferrer');
  }

  async function handleCopy(copyName: string, value: string) {
    if (!value.trim()) {
      return;
    }

    if (!navigator.clipboard?.writeText) {
      setStatus({
        tone: 'warning',
        message: `Clipboard access is not available. Please copy the ${copyName} manually.`,
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(copyName);
      window.setTimeout(() => {
        setCopiedKey((current) => (current === copyName ? null : current));
      }, 1600);
    } catch {
      setStatus({
        tone: 'warning',
        message: `Unable to copy the ${copyName}. Please copy it manually.`,
      });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const validationErrors = validateFormState(formState, gatewayConfig.supportedCurrencies);

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setStatus({
        tone: 'error',
        message: 'Please check the required fields.',
      });
      return;
    }

    if (formState.paymentMethod === 'upi' && hasManualUpi) {
      handleManualUpiAction();
      return;
    }

    if (formState.paymentMethod === 'netbanking' && hasManualBank) {
      setStatus({
        tone: 'info',
        message: 'Use the bank beneficiary details shown on the right to complete your transfer.',
      });
      return;
    }

    if (!gatewayConfig.keyId || !gatewayConfig.isConfigured) {
      setStatus({
        tone: 'error',
        message:
          'Online checkout is not live yet. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET on the backend to enable Razorpay.',
      });
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    setStatus({
      tone: 'info',
      message: 'Opening Razorpay checkout...',
    });

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded || !window.Razorpay) {
        throw new Error('Unable to load Razorpay Checkout.');
      }

      const orderResponse = await fetch(orderApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInMinorUnit,
          currency: formState.currency,
          course: gatewayConfig.defaultCourse,
          customer: {
            firstName: formState.firstName.trim(),
            lastName: formState.lastName.trim(),
            fullName: customerFullName,
            email: formState.email.trim(),
            phone: formState.phone.trim(),
            addressLine1: formState.addressLine1.trim(),
            addressLine2: formState.addressLine2.trim(),
            city: '',
            state: formState.state.trim(),
            pincode: formState.pincode.trim(),
            pan: formState.pan.trim(),
            gstn: formState.gstn.trim(),
            paymentMethod: formState.paymentMethod,
          },
        }),
      });

      if (!orderResponse.ok) {
        throw new Error(await getApiErrorMessage(orderResponse, 'Unable to create payment order.'));
      }

      const order = (await orderResponse.json()) as RazorpayOrderResponse;
      const RazorpayConstructor = window.Razorpay;

      const razorpay = new RazorpayConstructor({
        key: gatewayConfig.keyId,
        amount: order.amount,
        currency: order.currency,
        name: gatewayConfig.merchantName || order.merchantName || 'AtiSunya',
        description:
          gatewayConfig.merchantDescription || order.merchantDescription || 'Secure Payment',
        image: gatewayConfig.logoUrl,
        order_id: order.id,
        prefill: {
          name: customerFullName,
          email: formState.email.trim(),
          contact: formState.phone.trim(),
        },
        notes: {
          paymentMethod: formState.paymentMethod,
          course: gatewayConfig.defaultCourse,
        },
        retry: {
          enabled: true,
        },
        modal: {
          backdropclose: false,
          confirm_close: true,
          escape: true,
          handleback: true,
          ondismiss: () => {
            setStatus({
              tone: 'warning',
              message: 'Payment was not completed.',
            });
            setIsSubmitting(false);
          },
        },
        config: buildCheckoutDisplayConfig(formState.paymentMethod),
        theme: {
          color: gatewayConfig.themeColor,
        },
        handler: async (paymentResponse) => {
          setStatus({
            tone: 'info',
            message: 'Verifying payment...',
          });

          try {
            const verifyResponse = await fetch(verifyApiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(paymentResponse),
            });

            if (!verifyResponse.ok) {
              throw new Error(
                await getApiErrorMessage(verifyResponse, 'Payment verification failed.')
              );
            }

            const verification = (await verifyResponse.json()) as RazorpayVerifyResponse;

            if (!verification.verified) {
              throw new Error(verification.error || 'Payment verification failed.');
            }

            setLastPayment(verification.payment || null);
            setStatus({
              tone: 'success',
              message: 'Payment completed successfully.',
            });
          } catch (verificationError) {
            setStatus({
              tone: 'error',
              message:
                verificationError instanceof Error
                  ? verificationError.message
                  : 'Payment verification failed.',
            });
          } finally {
            setIsSubmitting(false);
          }
        },
      });

      razorpay.on?.('payment.failed', (failureResponse) => {
        setStatus({
          tone: 'error',
          message:
            failureResponse?.error?.description ||
            failureResponse?.error?.reason ||
            'Payment failed. Please try again.',
        });
        setIsSubmitting(false);
      });

      razorpay.open();
    } catch (error) {
      setStatus({
        tone: 'error',
        message: error instanceof Error ? error.message : 'Unable to start payment.',
      });
      setIsSubmitting(false);
    }
  }

  const SelectedMethodIcon = selectedMethodOption.icon;

  return (
    <section className="pn-page">
      <div className="container">
        <div className="pn-wrap">
          <div className="pn-head">
            <span className="pn-badge">Secure Payment</span>
            <h1>Complete your payment</h1>
            <p>Simple, secure, and direct payment for the selected program.</p>
          </div>

          <div className="pn-card pn-main-card">
            {status && (
              <div className={`pn-status pn-status-${status.tone}`} aria-live="polite">
                {status.tone === 'success' ? (
                  <CheckCircle2 size={18} />
                ) : status.tone === 'info' ? (
                  <LoaderCircle size={18} className={isSubmitting ? 'pn-spin' : ''} />
                ) : (
                  <ShieldAlert size={18} />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <div className="pn-layout">
              <form className="pn-form" onSubmit={handleSubmit}>
                <section className="pn-section-card">
                  <div className="pn-section-head">
                    <span className="pn-section-kicker">Enter Your Details</span>
                    <h2>Payer information</h2>
                    <p>Enter the payer details exactly as they should appear on the payment record.</p>
                  </div>

                  <div className="pn-grid">
                    <div className="pn-field">
                      <label htmlFor="firstName">First Name *</label>
                      <div className={`pn-input-shell ${fieldErrors.firstName ? 'pn-input-shell-error' : ''}`}>
                        <User size={18} />
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formState.firstName}
                          onChange={handleChange}
                          placeholder="Enter first name"
                          autoComplete="given-name"
                          required
                        />
                      </div>
                      {fieldErrors.firstName && <span className="pn-field-error">{fieldErrors.firstName}</span>}
                    </div>

                    <div className="pn-field">
                      <label htmlFor="lastName">Last Name *</label>
                      <div className={`pn-input-shell ${fieldErrors.lastName ? 'pn-input-shell-error' : ''}`}>
                        <User size={18} />
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formState.lastName}
                          onChange={handleChange}
                          placeholder="Enter last name"
                          autoComplete="family-name"
                          required
                        />
                      </div>
                      {fieldErrors.lastName && <span className="pn-field-error">{fieldErrors.lastName}</span>}
                    </div>

                    <div className="pn-field">
                      <label htmlFor="email">Email *</label>
                      <div className={`pn-input-shell ${fieldErrors.email ? 'pn-input-shell-error' : ''}`}>
                        <Mail size={18} />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="name@company.com"
                          autoComplete="email"
                          required
                        />
                      </div>
                      {fieldErrors.email && <span className="pn-field-error">{fieldErrors.email}</span>}
                    </div>

                    <div className="pn-field">
                      <label htmlFor="phone">Phone (include country code) *</label>
                      <div className={`pn-input-shell ${fieldErrors.phone ? 'pn-input-shell-error' : ''}`}>
                        <Phone size={18} />
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formState.phone}
                          onChange={handleChange}
                          placeholder="+91XXXXXXXXXX"
                          autoComplete="tel"
                          required
                        />
                      </div>
                      {fieldErrors.phone && <span className="pn-field-error">{fieldErrors.phone}</span>}
                    </div>
                  </div>
                </section>

                <section className="pn-section-card">
                  <div className="pn-section-head">
                    <span className="pn-section-kicker">Billing Address</span>
                    <h2>Address details</h2>
                    <p>Use the billing address that should be linked to this payment.</p>
                  </div>

                  <div className="pn-grid">
                    <div className="pn-field pn-field-span-2">
                      <label htmlFor="addressLine1">Address Line 1 *</label>
                      <div className={`pn-input-shell ${fieldErrors.addressLine1 ? 'pn-input-shell-error' : ''}`}>
                        <MapPin size={18} />
                        <input
                          id="addressLine1"
                          name="addressLine1"
                          type="text"
                          value={formState.addressLine1}
                          onChange={handleChange}
                          placeholder="Street address, building name"
                          autoComplete="address-line1"
                          required
                        />
                      </div>
                      {fieldErrors.addressLine1 && (
                        <span className="pn-field-error">{fieldErrors.addressLine1}</span>
                      )}
                    </div>

                    <div className="pn-field pn-field-span-2">
                      <label htmlFor="addressLine2">Address Line 2</label>
                      <div className="pn-input-shell">
                        <MapPin size={18} />
                        <input
                          id="addressLine2"
                          name="addressLine2"
                          type="text"
                          value={formState.addressLine2}
                          onChange={handleChange}
                          placeholder="Area, locality, landmark"
                          autoComplete="address-line2"
                        />
                      </div>
                    </div>

                    <div className="pn-field">
                      <label htmlFor="state">State / Region *</label>
                      <div className={`pn-input-shell ${fieldErrors.state ? 'pn-input-shell-error' : ''}`}>
                        <MapPin size={18} />
                        <input
                          id="state"
                          name="state"
                          type="text"
                          value={formState.state}
                          onChange={handleChange}
                          placeholder="Karnataka"
                          autoComplete="address-level1"
                          required
                        />
                      </div>
                      {fieldErrors.state && <span className="pn-field-error">{fieldErrors.state}</span>}
                    </div>

                    <div className="pn-field">
                      <label htmlFor="pincode">Pincode / ZIP *</label>
                      <div className={`pn-input-shell ${fieldErrors.pincode ? 'pn-input-shell-error' : ''}`}>
                        <MapPin size={18} />
                        <input
                          id="pincode"
                          name="pincode"
                          type="text"
                          value={formState.pincode}
                          onChange={handleChange}
                          placeholder="560001"
                          autoComplete="postal-code"
                          required
                        />
                      </div>
                      {fieldErrors.pincode && <span className="pn-field-error">{fieldErrors.pincode}</span>}
                    </div>
                  </div>
                </section>

                <section className="pn-section-card">
                  <div className="pn-section-head">
                    <span className="pn-section-kicker">Payment</span>
                    <h2>Amount and method</h2>
                    <p>Choose amount, currency, and how you want to complete the payment.</p>
                  </div>

                  <div className="pn-grid">
                    <div className="pn-field">
                      <label htmlFor="amount">Amount *</label>
                      <div className={`pn-input-shell ${fieldErrors.amount ? 'pn-input-shell-error' : ''}`}>
                        <BadgeIndianRupee size={18} />
                        <input
                          id="amount"
                          name="amount"
                          type="text"
                          value={formState.amount}
                          onChange={handleChange}
                          placeholder="35400"
                          inputMode="decimal"
                          required
                        />
                      </div>
                      {fieldErrors.amount && <span className="pn-field-error">{fieldErrors.amount}</span>}
                    </div>

                    <div className="pn-field">
                      <label htmlFor="currency">Currency *</label>
                      <div className={`pn-input-shell ${fieldErrors.currency ? 'pn-input-shell-error' : ''}`}>
                        <Globe size={18} />
                        <select
                          id="currency"
                          name="currency"
                          value={formState.currency}
                          onChange={handleChange}
                          required
                        >
                          {gatewayConfig.supportedCurrencies.map((currency) => (
                            <option key={currency} value={currency}>
                              {formatCurrencyOptionLabel(currency)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <span className="pn-field-helper">Common options: INR, USD, AUD, EUR, GBP and AED.</span>
                      {exchangeRateNote && (
                        <span className={exchangeRateError ? 'pn-field-error' : 'pn-field-helper'}>
                          {exchangeRateNote}
                        </span>
                      )}
                      {fieldErrors.currency && <span className="pn-field-error">{fieldErrors.currency}</span>}
                    </div>
                  </div>

                  <div className={`pn-currency-note ${isInternationalCurrency ? 'pn-currency-note-warning' : ''}`}>
                    <strong>{isInternationalCurrency ? 'International card checkout' : 'INR checkout options'}</strong>
                    <p>
                      {isInternationalCurrency
                        ? 'For non-INR currencies, the amount is auto-converted from the INR base using the latest available reference rate. Bank transfer and QR / UPI stay disabled.'
                        : 'INR is the base price. You can keep INR for card, bank transfer, or QR / UPI, or switch currency to auto-convert for international card payments.'}
                    </p>
                  </div>

                  <div className="pn-method-block">
                    <label>{isInternationalCurrency ? 'Select Payment Method *' : 'Select Payment Method (INR)'}</label>

                    <div className="pn-methods">
                      {METHOD_OPTIONS.filter((option) =>
                        gatewayConfig.supportedMethods.includes(option.id)
                      ).map((option) => {
                        const Icon = option.icon;
                        const isActive = formState.paymentMethod === option.id;
                        const isDisabled = isInternationalCurrency && option.id !== 'card';

                        return (
                          <button
                            key={option.id}
                            type="button"
                            className={`pn-method-btn ${isActive ? 'pn-method-btn-active' : ''}`}
                            onClick={() => !isDisabled && handleMethodSelect(option.id)}
                            disabled={isDisabled}
                          >
                            <Icon size={18} />
                            <span className="pn-method-copy">
                              <strong>{option.label}</strong>
                              <small>{isDisabled ? 'Available only for INR checkout' : option.helper}</small>
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pn-method-tip">
                      <span className={`pn-summary-badge pn-summary-badge-${summaryBadgeTone}`}>
                        {summaryBadgeLabel}
                      </span>
                      <p>{checkoutDescription}</p>
                    </div>

                    {fieldErrors.paymentMethod && (
                      <span className="pn-field-error">{fieldErrors.paymentMethod}</span>
                    )}
                  </div>
                </section>

                <section className="pn-section-card pn-section-card-soft">
                  <div className="pn-section-head">
                    <span className="pn-section-kicker">Optional</span>
                    <h2>Tax details</h2>
                    <p>Add PAN or GSTIN only if these details should be recorded for billing.</p>
                  </div>

                  <div className="pn-grid">
                    <div className="pn-field">
                      <label htmlFor="pan">PAN (India) - optional</label>
                      <div className={`pn-input-shell ${fieldErrors.pan ? 'pn-input-shell-error' : ''}`}>
                        <User size={18} />
                        <input
                          id="pan"
                          name="pan"
                          type="text"
                          value={formState.pan}
                          onChange={handleChange}
                          placeholder="ABCDE1234F"
                          autoComplete="off"
                        />
                      </div>
                      {fieldErrors.pan && <span className="pn-field-error">{fieldErrors.pan}</span>}
                    </div>

                    <div className="pn-field">
                      <label htmlFor="gstn">GSTN - optional</label>
                      <div className={`pn-input-shell ${fieldErrors.gstn ? 'pn-input-shell-error' : ''}`}>
                        <Building2 size={18} />
                        <input
                          id="gstn"
                          name="gstn"
                          type="text"
                          value={formState.gstn}
                          onChange={handleChange}
                          placeholder="22ABCDE1234F1Z5"
                          autoComplete="off"
                        />
                      </div>
                      {fieldErrors.gstn && <span className="pn-field-error">{fieldErrors.gstn}</span>}
                    </div>
                  </div>
                </section>

                <div className="pn-footer">
                  <div className="pn-total">
                    <span>Total</span>
                    <strong>{payableAmount}</strong>
                  </div>

                  <button
                    type="submit"
                    className={`pn-submit-btn ${!canSubmit ? 'pn-submit-btn-muted' : ''}`}
                    disabled={isSubmitting || !canSubmit}
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderCircle size={18} className="pn-spin" />
                        Please wait
                      </>
                    ) : (
                      <>
                        {submitLabel}
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <aside className="pn-summary" ref={summaryRef}>
                <div className="pn-summary-head">
                  <h3>Summary</h3>
                  <span className={`pn-summary-badge pn-summary-badge-${summaryBadgeTone}`}>
                    {summaryBadgeLabel}
                  </span>
                </div>

                <div className="pn-summary-row">
                  <span>Program</span>
                  <strong>{gatewayConfig.defaultCourse}</strong>
                </div>

                <div className="pn-summary-row">
                  <span>Customer</span>
                  <strong>{customerFullName || 'Your payer name will appear here'}</strong>
                </div>

                <div className="pn-summary-row">
                  <span>Currency</span>
                  <strong>{selectedCurrencyLabel}</strong>
                </div>

                <div className="pn-summary-row">
                  <span>Method</span>
                  <strong>{formatPaymentMethod(formState.paymentMethod)}</strong>
                </div>

                <div className="pn-summary-row">
                  <span>Checkout</span>
                  <strong>{checkoutChannelLabel}</strong>
                </div>

                <div className="pn-summary-row">
                  <span>Amount</span>
                  <strong>{payableAmount}</strong>
                </div>

                <div className="pn-detail-panel">
                  <div className="pn-method-panel-head">
                    <SelectedMethodIcon size={20} />
                    <div>
                      <strong>{selectedMethodOption.label}</strong>
                      <p>{checkoutDescription}</p>
                    </div>
                  </div>

                  {formState.paymentMethod === 'card' && (
                    <div className="pn-note-list">
                      <div className="pn-note-item">
                        <ShieldCheck size={16} />
                        <span>Visa, Mastercard, RuPay and supported international cards continue in Razorpay.</span>
                      </div>
                      <div className="pn-note-item">
                        <CheckCircle2 size={16} />
                        <span>Your form details are prefilled for a faster checkout experience.</span>
                      </div>
                      <div className="pn-note-item">
                        <CircleAlert size={16} />
                        <span>
                          {isOnlineCheckoutReady
                            ? 'The payment will stay inside the secure hosted checkout.'
                            : 'Add live backend Razorpay keys to make card checkout available.'}
                        </span>
                      </div>
                    </div>
                  )}

                  {formState.paymentMethod === 'upi' && (
                    <>
                      {gatewayConfig.upiDetails?.id && (
                        <div className="pn-copy-card">
                          <span>UPI ID</span>
                          <div className="pn-copy-row">
                            <strong>{gatewayConfig.upiDetails.id}</strong>
                            <button
                              type="button"
                              className="pn-copy-btn"
                              onClick={() => handleCopy('upi id', gatewayConfig.upiDetails?.id || '')}
                            >
                              <Copy size={14} />
                              {copiedKey === 'upi id' ? 'Copied' : 'Copy'}
                            </button>
                          </div>
                        </div>
                      )}

                      {gatewayConfig.upiDetails?.qrImageUrl ? (
                        <button
                          type="button"
                          className="pn-qr-card pn-qr-card-action"
                          onClick={handleQrPreviewOpen}
                          aria-haspopup="dialog"
                        >
                          <img
                            src={gatewayConfig.upiDetails.qrImageUrl}
                            alt="AtiSunya UPI QR code"
                          />
                          <p>
                            Click to enlarge this QR, or scan it with any UPI app to pay {payableAmount}.
                          </p>
                          <small>This uses the AtiSunya QR image shared for direct UPI payment.</small>
                        </button>
                      ) : (
                        <p className="pn-inline-note">
                          {isOnlineCheckoutReady
                            ? 'Razorpay checkout can still show UPI apps even when no manual QR is configured here.'
                            : 'Add PAYMENT_UPI_QR_IMAGE_URL to show a scannable QR code on this page.'}
                        </p>
                      )}

                      <div className="pn-action-row">
                        {gatewayConfig.upiDetails?.qrImageUrl && (
                          <button type="button" className="pn-copy-btn" onClick={handleQrImageOpen}>
                            <ExternalLink size={14} />
                            Open QR
                          </button>
                        )}

                        {manualUpiIntentUrl && (
                          <a href={manualUpiIntentUrl} className="pn-inline-link">
                            Open UPI app
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </>
                  )}

                  {formState.paymentMethod === 'netbanking' && (
                    <>
                      {hasManualBank ? (
                          <div className="pn-info-grid">
                          {gatewayConfig.bankDetails?.accountName && (
                            <div className="pn-info-card">
                              <span>Account holder</span>
                              <strong>{gatewayConfig.bankDetails.accountName}</strong>
                            </div>
                          )}

                          {gatewayConfig.bankDetails?.bankName && (
                            <div className="pn-info-card">
                              <span>Bank</span>
                              <strong>{gatewayConfig.bankDetails.bankName}</strong>
                            </div>
                          )}

                          {gatewayConfig.bankDetails?.accountNumber && (
                            <div className="pn-info-card">
                              <span>Account number</span>
                              <div className="pn-copy-row">
                                <strong>{gatewayConfig.bankDetails.accountNumber}</strong>
                                <button
                                  type="button"
                                  className="pn-copy-btn"
                                  onClick={() =>
                                    handleCopy(
                                      'account number',
                                      gatewayConfig.bankDetails?.accountNumber || ''
                                    )
                                  }
                                >
                                  <Copy size={14} />
                                  {copiedKey === 'account number' ? 'Copied' : 'Copy'}
                                </button>
                              </div>
                            </div>
                          )}

                          {gatewayConfig.bankDetails?.ifsc && (
                            <div className="pn-info-card">
                              <span>IFSC</span>
                              <div className="pn-copy-row">
                                <strong>{gatewayConfig.bankDetails.ifsc}</strong>
                                <button
                                  type="button"
                                  className="pn-copy-btn"
                                  onClick={() =>
                                    handleCopy('ifsc', gatewayConfig.bankDetails?.ifsc || '')
                                  }
                                >
                                  <Copy size={14} />
                                  {copiedKey === 'ifsc' ? 'Copied' : 'Copy'}
                                </button>
                              </div>
                            </div>
                          )}

                          {gatewayConfig.bankDetails?.branch && (
                            <div className="pn-info-card pn-info-card-span-2">
                              <span>Branch</span>
                              <strong>{gatewayConfig.bankDetails.branch}</strong>
                            </div>
                          )}

                          {gatewayConfig.bankDetails?.accountType && (
                            <div className="pn-info-card">
                              <span>Account type</span>
                              <strong>{gatewayConfig.bankDetails.accountType}</strong>
                            </div>
                          )}
                          </div>
                      ) : (
                        <p className="pn-inline-note">
                          {isOnlineCheckoutReady
                            ? 'Razorpay will show the supported bank list after you continue.'
                            : 'Add PAYMENT_BANK_ACCOUNT_NAME, PAYMENT_BANK_ACCOUNT_NUMBER, PAYMENT_BANK_IFSC, PAYMENT_BANK_NAME and PAYMENT_BANK_BRANCH for a manual fallback here.'}
                        </p>
                      )}
                    </>
                  )}
                </div>

                {(gatewayConfig.supportEmail ||
                  gatewayConfig.supportPhone ||
                  gatewayConfig.supportUrl ||
                  gatewayConfig.companyPan ||
                  gatewayConfig.companyGstin) && (
                  <div className="pn-detail-panel">
                    <div className="pn-panel-heading">
                      <Building2 size={16} />
                      <span>Support and billing</span>
                    </div>

                    <div className="pn-info-grid">
                      {gatewayConfig.supportEmail && (
                        <div className="pn-info-card">
                          <span>Support email</span>
                          <strong>
                            <a href={`mailto:${gatewayConfig.supportEmail}`}>
                              {gatewayConfig.supportEmail}
                            </a>
                          </strong>
                        </div>
                      )}

                      {gatewayConfig.supportPhone && (
                        <div className="pn-info-card">
                          <span>Support phone</span>
                          <strong>
                            <a href={`tel:${gatewayConfig.supportPhone}`}>
                              {gatewayConfig.supportPhone}
                            </a>
                          </strong>
                        </div>
                      )}

                      {gatewayConfig.companyPan && (
                        <div className="pn-info-card">
                          <span>Company PAN</span>
                          <strong>{gatewayConfig.companyPan}</strong>
                        </div>
                      )}

                      {gatewayConfig.companyGstin && (
                        <div className="pn-info-card">
                          <span>Company GSTIN</span>
                          <strong>{gatewayConfig.companyGstin}</strong>
                        </div>
                      )}

                      {gatewayConfig.supportUrl && (
                        <div className="pn-info-card pn-info-card-span-2">
                          <span>Support page</span>
                          <strong>
                            <a href={gatewayConfig.supportUrl} target="_blank" rel="noreferrer">
                              Open support page
                            </a>
                          </strong>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {lastPayment && (
                  <div className="pn-success-box">
                    <CheckCircle2 size={18} />
                    <div>
                      <strong>Payment verified</strong>
                      <p>
                        {lastPayment.id || 'Pending'} | {formatPaymentMethod(lastPayment.method)}
                      </p>
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>

          {isQrPreviewOpen && gatewayConfig.upiDetails?.qrImageUrl && (
            <div
              className="pn-modal-overlay"
              role="dialog"
              aria-modal="true"
              aria-labelledby="pn-qr-preview-title"
              onClick={handleQrPreviewClose}
            >
              <div className="pn-modal-card" onClick={(event) => event.stopPropagation()}>
                <div className="pn-modal-head">
                  <div>
                    <span className="pn-section-kicker">QR Preview</span>
                    <h4 id="pn-qr-preview-title">Scan to pay {payableAmount}</h4>
                  </div>
                  <button type="button" className="pn-modal-close" onClick={handleQrPreviewClose}>
                    Close
                  </button>
                </div>

                <div className="pn-modal-body">
                  <img
                    src={gatewayConfig.upiDetails.qrImageUrl}
                    alt="AtiSunya enlarged UPI QR code"
                  />
                  <p>
                    Scan this QR with any UPI app. If you are paying from the same device, use the
                    UPI app link or open the QR in a new tab.
                  </p>
                </div>

                <div className="pn-modal-actions">
                  <button type="button" className="pn-copy-btn" onClick={handleQrImageOpen}>
                    <ExternalLink size={14} />
                    Open QR in new tab
                  </button>

                  {manualUpiIntentUrl && (
                    <a href={manualUpiIntentUrl} className="pn-inline-link">
                      Open UPI app
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
