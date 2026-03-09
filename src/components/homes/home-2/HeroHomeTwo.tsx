import { Link } from 'react-router-dom';

export default function HeroHomeTwo() {
  return (
    <div
      className="tv-hero-area pb-130 pt-130 p-relative"
      style={{ backgroundImage: `url(/assets/img/hero/hero-bg.png)` }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6 order-1 order-xl-0 order-lg-0">
            <div className="tv-hero-banner-thumbnail mr-30">
              <img src="assets/img/hero/hero-thumb-1.png" alt="" />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 order-0  order-xl-1 order-lg-1">
            <div className="tv-hero-content">
              <h6 className="tv-hero-subtitle tv-spltv-text tv-spltv-in-right">
                Best It Company
              </h6>
              <h2 className="tv-hero-title tv-spltv-text tv-spltv-in-right">
                Best It Solution Agency For Your Business
              </h2>
              <p className="tv-spltv-text tv-spltv-in-right">
                Leverage agile frameworks to provide a robust synopsis for high
                level overviews terative approaches bring table survival.
              </p>
              <Link to="/contact" className="tv-btn-primary p-relative">
                <span className="btn-wrap">
                  <span className="btn-text1">Let's Talk With Us</span>
                  <span className="btn-text2">Let's Talk With Us</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
