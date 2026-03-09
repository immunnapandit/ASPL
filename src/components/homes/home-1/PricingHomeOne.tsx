import { Link } from 'react-router-dom';

interface PricingHomeOneProps {
  style_2?: boolean;
}

export default function PricingHomeOne({ style_2 }: PricingHomeOneProps) {
  return (
    <div
      className={`pb-130   ${style_2 ? 'tv-area-section pt-130' : 'tv-pricing-area pt-228'}`}
    >
      <div className="container">
        {!style_2 && (
          <div className="row align-items-center">
            <div className="col-12 text-center">
              <div className="tv-section-title-box mb-60">
                <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                  Pricing Plan
                </span>
                <h4 className="tv-section-title tv-spltv-text tv-spltv-in-right">
                  Our Affordable Pricing Plans <br /> For IT Business
                </h4>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div
            className="col-xl-4 col-lg-6 col-md-6 wow itfadeUp"
            data-wow-duration=".9s"
            data-wow-delay=".3s"
          >
            <div className="single-price-box mb-30">
              <h4 className="price-package">Basic Plan</h4>
              <h3 className="price">
                $49 <span>/Month</span>
              </h3>
              <ul>
                <li>
                  <i className="fa-regular fa-check"></i> Advanced Analytics
                </li>
                <li>
                  <i className="fa-regular fa-check"></i> Unlimited Projects
                </li>
                <li>
                  <i className="fa-regular fa-check"></i> Priority Support{' '}
                </li>
                <li>
                  <i className="fa-regular fa-check"></i> Customizable
                  Branding{' '}
                </li>
                <li>
                  <i className="fa-regular fa-check"></i> All API Access
                </li>
              </ul>
              <div className="price-box-btn">
                <Link to="/price" className="tv-btn-primary p-relative">
                  <span className="btn-wrap">
                    <span className="btn-text1">Select This Plan</span>
                    <span className="btn-text2">Select This Plan</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-6 col-md-6 wow itfadeUp"
            data-wow-duration=".9s"
            data-wow-delay=".5s"
          >
            <div className="single-price-box mb-30 active">
              <span className="tag">popular</span>
              <h4 className="price-package">Standard plan</h4>
              <h3 className="price">
                $79 <span>/Month</span>
              </h3>
              <ul>
                <li>
                  <i className="fa-regular fa-check"></i> Advanced Analytics
                </li>
                <li>
                  <i className="fa-regular fa-check"></i> Unlimited Projects
                </li>
                <li>
                  <i className="fa-regular fa-check"></i> Priority Support{' '}
                </li>
                <li>
                  <i className="fa-regular fa-check"></i> Customizable
                  Branding{' '}
                </li>
                <li>
                  <i className="fa-regular fa-check"></i> All API Access
                </li>
              </ul>
              <div className="price-box-btn">
                <Link to="/price" className="tv-btn-primary p-relative">
                  <span className="btn-wrap">
                    <span className="btn-text1">Select This Plan</span>
                    <span className="btn-text2">Select This Plan</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-6 col-md-6 wow itfadeUp"
            data-wow-duration=".9s"
            data-wow-delay=".7s"
          >
            <div className="single-price-box mb-30">
              <h4 className="price-package">Enterprise</h4>
              <h3 className="price">
                $49 <span>/Month</span>
              </h3>
              <ul>
                <li>
                  <i className="fa-regular fa-check"></i> Advanced Analytics
                </li>
                <li>
                  <i className="fa-regular fa-check"></i> Unlimited Projects
                </li>
                <li>
                  <i className="fa-regular fa-check"></i> Priority Support{' '}
                </li>
                <li>
                  <i className="fa-regular fa-check"></i> Customizable
                  Branding{' '}
                </li>
                <li>
                  <i className="fa-regular fa-check"></i> All API Access
                </li>
              </ul>
              <div className="price-box-btn">
                <Link to="/price" className="tv-btn-primary p-relative">
                  <span className="btn-wrap">
                    <span className="btn-text1">Select This Plan</span>
                    <span className="btn-text2">Select This Plan</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
