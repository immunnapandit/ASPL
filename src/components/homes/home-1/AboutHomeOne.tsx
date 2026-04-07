import { Link } from 'react-router-dom';

export default function AboutHomeOne() {
  return (
    <div className="tv-about-area z-index-1 p-relative pt-130 pb-130 white-bg">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-xl-5 col-lg-5">
            <div className="tv-section-title-box">
              <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                About Company
              </span>
              <h4 className="tv-section-title pb-20 tv-spltv-text tv-spltv-in-right">
                AtiSunya is a trusted Microsoft partner delivering digital solutions.
              </h4>
            </div>
          </div>
          <div className="col-xl-7 col-lg-7 text-end  ">
            <div
              className="tv-fade-anim button"
              data-fade-from="top"
              data-ease="bounce"
              data-delay=".5"
            >
              <Link to="/contact" className="tv-btn-secondary">
                <span className="btn-wrap">
                  <span className="btn-text1">Know More</span>
                  <span className="btn-text2">Know More</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="tv-about-section mt-60">
          <div className="row align-items-center">
            <div
              className="col-xl-4 col-lg-6 col-md-6 wow itfadeUp"
              data-wow-duration=".9s"
              data-wow-delay=".3s"
            >
              <div className="tv-about-left">
                <div className="single-icon-box">
                  <span>
                    <img src="assets/img/icon/about-icon-1.png" alt="" />
                  </span>
                  <div className="icon-box-content">
                    <h3>Our Mission</h3>
                    <p>
                      To drive digital transformation through reliable Microsoft-based solutions.
                    </p>
                  </div>
                </div>
                <div className="single-icon-box">
                  <span>
                    <img src="assets/img/icon/about-icon-2.png" alt="" />
                  </span>
                  <div className="icon-box-content">
                    <h3>Our Vission</h3>
                    <p>
                      To drive innovation and excellence across industries worldwide.
                    </p>
                  </div>
                </div>
                <div className="single-icon-box">
                  <span>
                    <img src="assets/img/icon/about-icon-3.png" alt="" />
                  </span>
                  <div className="icon-box-content">
                    <h3>Our Awards</h3>
                    <p>
                      Recognized for excellence in delivering Microsoft-based solutions and digital transformation services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-6 col-md-6 wow itfadeUp"
              data-wow-duration=".9s"
              data-wow-delay=".5s"
            >
              <div className="tv-about-middle">
                <img src="assets/img/about/about-1-1.png" alt="" />
                <p>
                  Honored for delivering excellence through certified expertise, trusted partnerships, and innovative technology solutions.{' '}
                </p>
              </div>
            </div>
            <div
              className="col-xl-4 d-xxl-block d-xl-block d-none col-md-6 col-sm-6 wow itfadeUp"
              data-wow-duration=".9s"
              data-wow-delay=".7s"
            >
              <div className="tv-about-right">
                <img src="assets/img/about/about-1-2.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
