import { useState } from 'react';
import { Link } from 'react-router-dom';

type Plan = {
  title: string;
  description: string;
  price: string;
};

export default function PricingHomeThree() {
  const [activeTab, setActiveTab] = useState<'monthly' | 'yearly'>('monthly');

  const monthlyPlans: Plan[] = [
    {
      title: 'Basic Plan',
      description:
        'Easily create reusable payment links that you can share with your customers through email Easily',
      price: '$19',
    },
    {
      title: 'Premium Plan',
      description:
        'Easily create reusable payment links that you can share with your customers through email Easily',
      price: '$50',
    },
    {
      title: 'Gold Plan',
      description:
        'Easily create reusable payment links that you can share with your customers through email Easily',
      price: '$39',
    },
  ];

  const yearlyPlans: Plan[] = [
    {
      title: 'Basic Plan',
      description:
        'Easily create reusable payment links that you can share with your customers through email Easily',
      price: '$190',
    },
    {
      title: 'Premium Plan',
      description:
        'Easily create reusable payment links that you can share with your customers through email Easily',
      price: '$500',
    },
    {
      title: 'Gold Plan',
      description:
        'Easily create reusable payment links that you can share with your customers through email Easily',
      price: '$390',
    },
  ];

  const featuresMonthly = [
    { name: 'Executive Consultancy', available: true },
    { name: 'Remuneration Handling', available: true },
    { name: 'Company Formation', available: true },
    { name: 'Always-On Support', available: true },
    { name: 'Personal Habitat Advisory', available: false },
    { name: 'Elite Assistance', available: false },
    { name: 'Tailored Solutions', available: false },
  ];

  const featuresYearly = featuresMonthly; // same features, can modify if needed

  return (
    <div
      className="tv-pricing-area-tab section-bg gray-bg pt-130 pb-130"
      style={{ backgroundImage: 'url(/assets/img/breadcrumb/price-bg.png)' }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <div className="tv-section-title-box mb-60">
              <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                Pricing Plan
              </span>
              <h4 className="tv-section-title pb-20 tv-spltv-text tv-spltv-in-right">
                Our Affordable Pricing Plans <br /> For IT Business
              </h4>
            </div>
          </div>
        </div>

        <div className="tv-pricing-tab-wrap">
          <div className="row">
            {/* LEFT TAB FEATURES */}
            <div className="col-xxl-4 col-xl-4 col-lg-5">
              <div className="tv-pricing-tab-left">
                <ul className="nav nav-price mb-3">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'monthly' ? 'active' : ''}`}
                      onClick={() => setActiveTab('monthly')}
                    >
                      Monthly
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'yearly' ? 'active' : ''}`}
                      onClick={() => setActiveTab('yearly')}
                    >
                      Yearly
                    </button>
                  </li>
                </ul>

                <div className="price-content-wrap">
                  <ul className="price-list-item">
                    {(activeTab === 'monthly'
                      ? featuresMonthly
                      : featuresYearly
                    ).map((f, i) => (
                      <li key={i}>
                        <i
                          className={`fa-solid ${f.available ? 'fa-check' : 'fa-xmark'}`}
                        ></i>{' '}
                        {f.name}
                      </li>
                    ))}
                  </ul>
                  <Link to="/price" className="tv-btn-primary p-relative">
                    <span className="btn-wrap">
                      <span className="btn-text1">Select This Plan</span>
                      <span className="btn-text2">Select This Plan</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT TAB PLANS */}
            <div className="col-xxl-8 col-xl-8 col-lg-7">
              <div className="tv-pricing-tab-right">
                {(activeTab === 'monthly' ? monthlyPlans : yearlyPlans).map(
                  (plan, idx) => (
                    <div
                      key={idx}
                      className="single-price-box-wrap d-flex align-items-center wow itfadeUp"
                      data-wow-delay={`.${2 + idx * 1}s`}
                    >
                      <div>
                        <h4>{plan.title}</h4>
                        <p>{plan.description}</p>
                      </div>
                      <div>
                        <h2
                          className="price"
                          style={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                          }}
                        >
                          {' '}
                          <span>{plan.price}</span>{' '}
                          {activeTab === 'monthly' ? '/Month' : ' /Year'}{' '}
                        </h2>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
