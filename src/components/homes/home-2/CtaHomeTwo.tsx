import VideoPopup from '../../../modal/VideoPopup';

export default function CtaHomeTwo() {
  return (
    <div
      className="tv-cta2-area  footer-bg"
      style={{ backgroundImage: `url(/assets/img/contact/mask-bg.png)` }}
    >
      <div
        className="bg-img pb-130 pt-130"
        style={{ backgroundImage: `url(/assets/img/contact/cta-bg-2-1.png)` }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="tv-cta2-left">
                <div className="video-play">
                  <div className="play-icon ripple-white">
                    <VideoPopup>
                      <a className="popup-video " style={{ cursor: 'pointer' }}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.6 5.2C8.45143 5.08857 8.27477 5.02072 8.08981 5.00404C7.90484 4.98736 7.71889 5.02252 7.55279 5.10557C7.38668 5.18863 7.24698 5.31629 7.14935 5.47427C7.05171 5.63225 7 5.81429 7 6V18C7 18.1857 7.05171 18.3678 7.14935 18.5257C7.24698 18.6837 7.38668 18.8114 7.55279 18.8944C7.71889 18.9775 7.90484 19.0126 8.08981 18.996C8.27477 18.9793 8.45143 18.9114 8.6 18.8L16.6 12.8C16.7242 12.7069 16.825 12.5861 16.8944 12.4472C16.9639 12.3084 17 12.1552 17 12C17 11.8448 16.9639 11.6916 16.8944 11.5528C16.825 11.4139 16.7242 11.2931 16.6 11.2L8.6 5.2Z"
                            fill="white"
                          ></path>
                        </svg>
                      </a>
                    </VideoPopup>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="tv-cta2-right">
                <h2 className="tv-spltv-text tv-spltv-in-right">
                  Subscribe to Our Newsletter
                </h2>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </p>
                <div className="tv-newsletter-form">
                  <form action="#">
                    <input
                      type="email"
                      placeholder="Enter Your Email"
                      required
                    />
                    <button className="tv-btn-primary p-relative">
                      <span className="btn-wrap">
                        <span className="btn-text1">Submit Now</span>
                        <span className="btn-text2">Submit Now</span>
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
