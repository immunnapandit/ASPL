import { Link } from 'react-router-dom';

export default function CtaHomeThree() {
  return (
    <div
      className="tv-cta-area pb-130 pt-130"
      style={{ backgroundImage: 'url(/assets/img/contact/cta-bg-3-1.png)' }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col text-center">
            <div className="cta-content">
              <h1 className="text-white">
                Start Your Free 14-Day Trial Today!
              </h1>
              <p>
                Join over 13,000 teams streamlining project management and
                remote collaboration effortlessly.
              </p>
              <Link to="/contact" className="tv-btn-primary p-relative">
                <span className="btn-wrap">
                  <span className="btn-text1">Get Started Now</span>
                  <span className="btn-text2">Get Started Now</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
