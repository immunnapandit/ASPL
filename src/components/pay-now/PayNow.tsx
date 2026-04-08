import { useMemo, useState } from 'react';
import {
  BadgeIndianRupee,
  Building2,
  CheckCircle2,
  CreditCard,
  Mail,
  MapPinned,
  Phone,
  ShieldCheck,
  User,
} from 'lucide-react';
import '../../styles/scss/layout/_pay-now.scss';

type PaymentFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  pincode: string;
  pan: string;
  gstn: string;
  amount: string;
  currency: 'INR' | 'USD' | 'EUR' | 'GBP';
  course: string;
  paymentMethod: 'card' | 'bank_transfer' | 'qr_upi';
};

type RazorpayOrderResponse = {
  id: string;
  amount: number;
  currency: string;
};

type RazorpayVerifyResponse = {
  verified: boolean;
  payment?: {
    id?: string;
    status?: string;
    method?: string;
  };
  error?: string;
};

const defaultAmount = '35400';

const initialFormState: PaymentFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  state: '',
  pincode: '',
  pan: '',
  gstn: '',
  amount: defaultAmount,
  currency: 'INR',
  course: 'Microsoft Certified Trainer Readiness',
  paymentMethod: 'card',
};

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

export default function PayNow() {
  const [formState, setFormState] = useState<PaymentFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const orderApiUrl = import.meta.env.VITE_RAZORPAY_ORDER_API_URL;
  const verifyApiUrl = import.meta.env.VITE_RAZORPAY_VERIFY_API_URL;

  const amountInPaise = useMemo(() => {
    const parsed = Number(formState.amount || 0);
    return Number.isFinite(parsed) ? Math.round(parsed * 100) : 0;
  }, [formState.amount]);

  const payableAmount = useMemo(
    () =>
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: formState.currency,
        maximumFractionDigits: 0,
      }).format(Number(formState.amount || 0)),
    [formState.amount, formState.currency]
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage('');

    const fullName = `${formState.firstName} ${formState.lastName}`.trim();

    if (!razorpayKey) {
      setStatusMessage('Missing Razorpay key. Add VITE_RAZORPAY_KEY_ID to your environment.');
      return;
    }

    if (!orderApiUrl) {
      setStatusMessage(
        'Missing order API URL. Add VITE_RAZORPAY_ORDER_API_URL to create Razorpay orders.'
      );
      return;
    }

    if (!verifyApiUrl) {
      setStatusMessage(
        'Missing verify API URL. Add VITE_RAZORPAY_VERIFY_API_URL to verify payments.'
      );
      return;
    }

    if (!amountInPaise) {
      setStatusMessage('Please enter a valid payment amount.');
      return;
    }

    setIsSubmitting(true);

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        throw new Error('Unable to load Razorpay checkout.');
      }

      const RazorpayConstructor = window.Razorpay;

      if (!RazorpayConstructor) {
        throw new Error('Razorpay checkout is unavailable.');
      }

      const response = await fetch(orderApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: formState.currency,
          course: formState.course,
          customer: {
            firstName: formState.firstName,
            lastName: formState.lastName,
            fullName,
            email: formState.email,
            phone: formState.phone,
            address: formState.address,
            state: formState.state,
            pincode: formState.pincode,
            pan: formState.pan,
            gstn: formState.gstn,
            paymentMethod: formState.paymentMethod,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create Razorpay order.');
      }

      const order: RazorpayOrderResponse = await response.json();

      const methodOptions =
        formState.paymentMethod === 'bank_transfer'
          ? { netbanking: true, card: false, upi: false }
          : formState.paymentMethod === 'qr_upi'
            ? { upi: true, netbanking: false, card: false }
            : { card: true, netbanking: false, upi: false };

      const razorpay = new RazorpayConstructor({
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: 'AtiSunya',
        description: `${formState.course} payment`,
        order_id: order.id,
        prefill: {
          name: fullName,
          email: formState.email,
          contact: formState.phone,
        },
        notes: {
          course: formState.course,
          address: formState.address,
          state: formState.state,
          pincode: formState.pincode,
          pan: formState.pan || 'Not provided',
          gstn: formState.gstn || 'Not provided',
          paymentMethod: formState.paymentMethod,
        },
        method: methodOptions,
        theme: {
          color: '#2563eb',
        },
        handler: async (paymentResponse) => {
          setStatusMessage('Payment received. Verifying securely...');

          try {
            const verifyResponse = await fetch(verifyApiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(paymentResponse),
            });

            const verification: RazorpayVerifyResponse = await verifyResponse.json();

            if (!verifyResponse.ok || !verification.verified) {
              throw new Error(verification.error || 'Payment verification failed.');
            }

            setStatusMessage(
              `Payment verified successfully. Payment ID: ${verification.payment?.id || 'N/A'}`
            );
          } catch (verificationError) {
            const message =
              verificationError instanceof Error
                ? verificationError.message
                : 'Payment verification failed.';
            setStatusMessage(message);
          }
        },
      });

      razorpay.open();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong while starting payment.';
      setStatusMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pn-page">
      <div className="container">
        <div className="pn-shell">
          <div className="pn-header">
            <span className="pn-badge">Secure Payment</span>
            <h1>Complete your MCT program payment</h1>
            <p>
              Fill in your details and continue to Razorpay checkout to pay for your Microsoft
              Certified Trainer readiness program.
            </p>
          </div>

          <div className="row g-4 align-items-start">
            <div className="col-xl-7 col-lg-7 col-12">
              <div className="pn-card pn-form-card">
                <form className="pn-form" onSubmit={handleSubmit}>
                  <div className="pn-grid">
                    <div className="pn-field">
                      <label htmlFor="firstName">First Name *</label>
                      <div className="pn-input-shell">
                        <User size={18} />
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formState.firstName}
                          onChange={handleChange}
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                    </div>

                    <div className="pn-field">
                      <label htmlFor="lastName">Last Name *</label>
                      <div className="pn-input-shell">
                        <User size={18} />
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formState.lastName}
                          onChange={handleChange}
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>

                    <div className="pn-field">
                      <label htmlFor="email">Email *</label>
                      <div className="pn-input-shell">
                        <Mail size={18} />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                    </div>

                    <div className="pn-field">
                      <label htmlFor="phone">Phone *</label>
                      <div className="pn-input-shell">
                        <Phone size={18} />
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formState.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>

                    <div className="pn-field">
                      <label htmlFor="address">Address *</label>
                      <div className="pn-input-shell">
                        <MapPinned size={18} />
                        <input
                          id="address"
                          name="address"
                          type="text"
                          value={formState.address}
                          onChange={handleChange}
                          placeholder="Enter your address"
                          required
                        />
                      </div>
                    </div>

                    <div className="pn-field">
                      <label htmlFor="state">State *</label>
                      <div className="pn-input-shell">
                        <MapPinned size={18} />
                        <input
                          id="state"
                          name="state"
                          type="text"
                          value={formState.state}
                          onChange={handleChange}
                          placeholder="Enter your state"
                          required
                        />
                      </div>
                    </div>

                    <div className="pn-field">
                      <label htmlFor="pincode">Pincode *</label>
                      <div className="pn-input-shell">
                        <MapPinned size={18} />
                        <input
                          id="pincode"
                          name="pincode"
                          type="text"
                          value={formState.pincode}
                          onChange={handleChange}
                          placeholder="Enter your pincode"
                          required
                        />
                      </div>
                    </div>

                    <div className="pn-field">
                      <label htmlFor="pan">PAN (India)</label>
                      <div className="pn-input-shell">
                        <ShieldCheck size={18} />
                        <input
                          id="pan"
                          name="pan"
                          type="text"
                          value={formState.pan}
                          onChange={handleChange}
                          placeholder="Enter your PAN number"
                        />
                      </div>
                    </div>

                    <div className="pn-field">
                      <label htmlFor="gstn">GSTN</label>
                      <div className="pn-input-shell">
                        <Building2 size={18} />
                        <input
                          id="gstn"
                          name="gstn"
                          type="text"
                          value={formState.gstn}
                          onChange={handleChange}
                          placeholder="Enter your GSTN"
                        />
                      </div>
                    </div>

                    <div className="pn-field">
                      <label htmlFor="amount">Amount *</label>
                      <div className="pn-input-shell">
                        <BadgeIndianRupee size={18} />
                        <input
                          id="amount"
                          name="amount"
                          type="number"
                          min="1"
                          step="1"
                          value={formState.amount}
                          onChange={handleChange}
                          placeholder="Enter amount"
                          required
                        />
                      </div>
                    </div>

                    <div className="pn-field">
                      <label htmlFor="currency">Currency *</label>
                      <div className="pn-input-shell">
                        <BadgeIndianRupee size={18} />
                        <select
                          id="currency"
                          name="currency"
                          value={formState.currency}
                          onChange={handleChange}
                          required
                        >
                          <option value="INR">Indian Rupee (INR)</option>
                          <option value="USD">US Dollar (USD)</option>
                          <option value="EUR">Euro (EUR)</option>
                          <option value="GBP">British Pound (GBP)</option>
                        </select>
                      </div>
                    </div>

                    <div className="pn-field">
                      <label htmlFor="paymentMethod">Payment Method *</label>
                      <div className="pn-input-shell">
                        <CreditCard size={18} />
                        <select
                          id="paymentMethod"
                          name="paymentMethod"
                          value={formState.paymentMethod}
                          onChange={handleChange}
                          required
                        >
                          <option value="card">Card (Debit/Credit) - Razorpay</option>
                          <option value="bank_transfer">Bank Transfer</option>
                          <option value="qr_upi">QR / UPI</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pn-footer">
                    <div>
                      <strong>Payable amount</strong>
                      <p>{payableAmount}</p>
                    </div>
                    <button type="submit" className="pn-submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? 'Preparing Payment...' : 'Proceed to Razorpay'}
                    </button>
                  </div>

                  {statusMessage && <p className="pn-status">{statusMessage}</p>}
                </form>
              </div>
            </div>

            <div className="col-xl-5 col-lg-5 col-12">
              <div className="pn-card pn-summary-card">
                <h3>Payment summary</h3>
                <div className="pn-summary-row">
                  <span>Program</span>
                  <strong>MCT Readiness</strong>
                </div>
                <div className="pn-summary-row">
                  <span>Format</span>
                  <strong>Online / Hybrid / Onsite</strong>
                </div>
                <div className="pn-summary-row">
                  <span>Currency</span>
                  <strong>{formState.currency}</strong>
                </div>
                <div className="pn-summary-row">
                  <span>Payment method</span>
                  <strong>
                    {formState.paymentMethod === 'card'
                      ? 'Card (Debit/Credit) - Razorpay'
                      : formState.paymentMethod === 'bank_transfer'
                        ? 'Bank Transfer'
                        : 'QR / UPI'}
                  </strong>
                </div>
                <div className="pn-summary-row pn-summary-row-total">
                  <span>Total</span>
                  <strong>{payableAmount}</strong>
                </div>

                <div className="pn-points">
                  <div>
                    <CheckCircle2 size={18} />
                    <span>Secure Razorpay checkout</span>
                  </div>
                  <div>
                    <CheckCircle2 size={18} />
                    <span>Order created dynamically from your backend</span>
                  </div>
                  <div>
                    <CheckCircle2 size={18} />
                    <span>Ready for webhook-based payment verification</span>
                  </div>
                </div>

                <div className="pn-note">
                  Add `VITE_RAZORPAY_KEY_ID`, `VITE_RAZORPAY_ORDER_API_URL`, and
                  `VITE_RAZORPAY_VERIFY_API_URL` in your Vite environment before using live
                  payments.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
