import VideoPopup from '../../../modal/VideoPopup';

export default function CtaHomeOne() {
  return (
    <div
      className="tv-cta-area pt-150"
      style={{ backgroundImage: `url(/assets/img/contact/cta-bg-1-1.png)` }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xxl-7 col-xl-6 col-lg-6 col-md-5">
            <div className="video-play-btn-area p-relative">
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
          <div className="col-xxl-5 col-xl-6 col-lg-6 col-md-7 p-relative">
            <div className="cta-form">
              <h2>Make an Appointment</h2>
              <p>Feel free to contact with us, we don't spam your email</p>
              <div className="tv-contact-select">
                <form action="#">
                  <div className="it-contact-input-box mb-20">
                    <input type="text" placeholder="Full Name *" />
                  </div>
                  <div className="it-contact-input-box mb-20">
                    <input type="email" placeholder="Email Here *" />
                  </div>
                  <div className="it-contact-input-box mb-20">
                    <select defaultValue="">
                      <option value="" disabled>
                        Select an option *
                      </option>
                      <option value="option1">Web development</option>
                      <option value="option2">Mobile APP</option>
                      <option value="option3">Graphic Design</option>
                    </select>
                  </div>
                  <div className="it-contact-textarea-box ">
                    <textarea placeholder="Your Message *"></textarea>
                  </div>
                  <div className="it-contact-sumbit-box cta">
                    <button className="tv-btn-secondary p-relative">
                      <span className="btn-wrap">
                        <span className="btn-text1">Submit Message</span>
                        <span className="btn-text2">Submit Message</span>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}