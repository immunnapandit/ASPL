import VideoPopup from '../../../modal/VideoPopup';

export default function HeroHomeThree() {
  return (
    <div
      className="tv-hero-area tv-hero-two pb-130 pt-130 p-relative"
      style={{ backgroundImage: 'url(assets/img/hero/hero-bg-2.png)' }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6 col-lg-6">
            <div className="tv-hero-content">
              <h6 className="tv-hero-subtitle tv-spltv-text tv-spltv-in-right">
                Best It Company
              </h6>
              <h2 className="tv-hero-title tv-spltv-text tv-spltv-in-right">
                Revolutionizing the Future with Innovation
              </h2>
              <p className="tv-spltv-text tv-spltv-in-right">
                Leverage agile frameworks to provide a robust synopsis for high
                level overviews terative approaches bring table survival.
              </p>
              <div className="tv-hero-btn-wrap d-flex align-items-center">
                <a href="contact.html" className="tv-btn-primary p-relative">
                  <span className="btn-wrap">
                    <span className="btn-text1">Let's Talk With Us</span>
                    <span className="btn-text2">Let's Talk With Us</span>
                  </span>
                </a>
                <div className="tv-video-icon">
                  <VideoPopup>
                    <a
                      style={{ cursor: 'pointer' }}
                      className="popup-video ripple-white"
                    >
                      <span>
                        <svg
                          width="21"
                          height="24"
                          viewBox="0 0 21 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.9005 10.6854C21.2395 11.4541 21.2395 13.3857 19.9005 14.1544L3.23761 23.7201C1.90428 24.4856 0.241875 23.523 0.241875 21.9856L0.241875 2.85419C0.241875 1.31677 1.90428 0.354247 3.23761 1.11968L19.9005 10.6854Z"
                            fill="#fff"
                          ></path>
                        </svg>
                      </span>
                    </a>
                  </VideoPopup>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 order-1">
            <div className="tv-hero-banner-thumbnail mr-30">
              <img src="assets/img/hero/hero-thumb-2.jpeg" alt="" />
              <div className="experience-wrapper">
                <div className="experience-content">
                  <h2>18+</h2>
                  <p>
                    Years of <span>Experience</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
