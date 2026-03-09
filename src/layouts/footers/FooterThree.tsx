import { Link } from 'react-router-dom';

export default function FooterThree() {
  return (
    <>
      <footer>
        <div className="tv-footer-wrap footer-wrap-3 footer-bg z-index-1 pt-130">
          <div className="tv-footer-top">
            <div className="container">
              <div className="tv-footer-top-area">
                <div className="row align-items-center">
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                    <div className="tv-footer-top-left widget">
                      <h1 className="tv-spltv-text tv-spltv-in-right">
                        Let’s Work Together.
                      </h1>
                      <ul>
                        <li>
                          <a href="#">Menu</a>
                        </li>
                        <li>
                          <a href="#">Page</a>
                        </li>
                        <li>
                          <a href="#">About</a>
                        </li>
                        <li>
                          <a href="#">Contact</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 wow itfadeUp"
                    data-wow-delay=".2s"
                  >
                    <div className="tv-footer-top-right widget">
                      <p>
                        Monotonectally synergize granular markets and front
                        market Collaboratively visualize strat fomediaries after
                        based after models, Synergistically task.
                      </p>
                      <Link
                        to="/contact "
                        className="tv-btn-primary mt-74 p-relative"
                      >
                        <span className="btn-wrap">
                          <span className="btn-text1">Let’s Work With Us</span>
                          <span className="btn-text2">Let’s Work With Us</span>
                        </span>
                      </Link>
                      <ul>
                        <li>
                          <a href="#">Terms & Conditions</a>
                        </li>
                        <li>
                          <a href="#">Privacy Policy</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tv-copyright-area ">
            <div className="container">
              <div className="tv-copyright-border">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="tv-copyright-left text-center text-lg-start">
                      <p className="mb-0">
                        Copyright © 2025 Hurraytheme. All rights reserved.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 text-end">
                    <div className="tv-footer-widget-social style-2">
                      <a href="#">
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                      <a href="#">
                        <i className="fa-brands fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                      <a href="#">
                        <i className="fa-brands fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
