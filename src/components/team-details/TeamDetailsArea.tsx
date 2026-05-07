export default function TeamDetailsArea() {
  return (
    <div className="tv-team-details pt-130 pb-130">
      <div className="container">
        <div className="row">
          <div
            className="col-xl-5 col-lg-5 wow itfadeUp"
            data-wow-duration=".9s"
            data-wow-delay=".3s"
          >
            <div className="tv-team-thum-single">
              <img src="/assets/img/team/Atul.png" alt="Atul Verma" />
            </div>
          </div>
          <div className="col-xl-7 col-lg-7 wow itfadeUp">
            <div className="tv-team-single-content">
              <h2>Atul Verma</h2>
              <h6>Managing Director</h6>
              <p>
                Atul helps lead AtiSunya Private Limited with a focus on
                enterprise consulting, Microsoft Dynamics 365 delivery, and
                practical digital transformation outcomes for growing teams.
              </p>
              <div className="team-contact">
                <a href="tel:216-564-3678">
                  <i className="fa-solid fa-phone"></i>216-564-3678
                </a>
                <a href="mailto:info@atisunya.com">
                  <i className="fa-solid fa-envelope"></i>
                  info@atisunya.com
                </a>
              </div>
              <div className="tv-header-top-social-box">
                <a href="#">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a
                  href="https://in.linkedin.com/in/atulk-verma"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Atul Verma LinkedIn profile"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
              <div className="tv-progress-wrap">
                <h3>Experience Area</h3>
                <div className="tv-progress-bar-wrap">
                  <div className="tv-progress-bar-item mb-10">
                    <label>Productivity </label>
                    <div className="tv-progress-bar">
                      <div className="progress">
                        <div
                          className="progress-bar wow slideInLeft"
                          data-wow-delay=".1s"
                          data-wow-duration="2s"
                          role="progressbar"
                          data-width="90%"
                          aria-valuenow={90}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{
                            width: '90%',
                            visibility: 'visible',
                            animationDuration: '2s',
                            animationDelay: '0.1s',
                            animationName: 'slideInLeft',
                          }}
                        >
                          <span>90%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tv-progress-bar-item mb-10">
                    <label>Digital Marketing</label>
                    <div className="tv-progress-bar">
                      <div className="progress">
                        <div
                          className="progress-bar orange wow slideInLeft"
                          data-wow-delay=".1s"
                          data-wow-duration="2s"
                          role="progressbar"
                          data-width="82%"
                          aria-valuenow={82}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{
                            width: '82%',
                            visibility: 'visible',
                            animationDuration: '2s',
                            animationDelay: '0.1s',
                            animationName: 'slideInLeft',
                          }}
                        >
                          <span>82%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tv-progress-bar-item">
                    <label>Technology</label>
                    <div className="tv-progress-bar">
                      <div className="progress">
                        <div
                          className="progress-bar wow slideInLeft"
                          data-wow-delay=".1s"
                          data-wow-duration="2s"
                          role="progressbar"
                          data-width="65%"
                          aria-valuenow={58}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          style={{
                            width: '65%',
                            visibility: 'visible',
                            animationDuration: '2s',
                            animationDelay: '0.1s',
                            animationName: 'slideInLeft',
                          }}
                        >
                          <span>65%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tv-contact-form">
                <h3>Message With Me</h3>
                <form action="#">
                  <div className="tv-contact-input-wrap">
                    <div className="row gx-20">
                      <div className="col-sm-6 mb-20">
                        <div className="tv-contact-input-box">
                          <input type="text" placeholder="Name:" />
                        </div>
                      </div>
                      <div className="col-sm-6 mb-20">
                        <div className="tv-contact-input-box">
                          <input type="email" placeholder="Email:" />
                        </div>
                      </div>
                      <div className="col-sm-6 mb-20">
                        <div className="tv-contact-input-box">
                          <input type="text" placeholder="Phone:" />
                        </div>
                      </div>
                      <div className="col-sm-6 mb-20">
                        <div className="tv-contact-input-box">
                          <input type="text" placeholder="Website:" />
                        </div>
                      </div>
                      <div className="col-sm-12 mb-30">
                        <div className="tv-contact-textarea-box">
                          <textarea placeholder="Message:"></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="tv-contact-btn">
                      <button
                        type="submit"
                        className="tv-btn-primary p-relative"
                      >
                        <span className="btn-wrap">
                          <span className="btn-text1">Send Message</span>
                          <span className="btn-text2">Send Message</span>
                        </span>
                      </button>
                    </div>
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
