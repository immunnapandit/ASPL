import { Link } from 'react-router-dom';
export default function FooterTwo() {
  return (
    <footer>
      <div
        className="tv-footer-wrap sytle-2 footer-bg z-index-1 pt-130"
        style={{ backgroundImage: 'url(assets/img/footer/footer-bg-2-1.png)' }}
      >
        <div className="tv-footer-area mb-65">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-50">
                <div className="tv-footer-widget tv-footer-col-1">
                  <div className="tv-footer-widget-logo mb-30">
                    <Link to="/">
                      <img src="assets/img/logo/logo-white2.png" alt="" />
                    </Link>
                  </div>
                  <div className="tv-footer-widget-text">
                    <p>
                      Each demo built with Teba will look different. You can
                      customize almost anythin appearance of your website with
                      only a few.
                    </p>
                  </div>
                  <div className="tv-footer-widget-contact-info">
                    <ul>
                      <li>
                        <a href="">
                          <i className="fa-solid fa-phone"></i>123-456-7890
                        </a>
                      </li>
                      <li>
                        <a href="mailto:techor@example.com">
                          <i className="fa-solid fa-envelope"></i>
                          techor@example.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-50">
                <div className="tv-footer-widget tv-footer-col-2">
                  <h4 className="tv-footer-widget-title">Quick Links</h4>
                  <div className="tv-footer-widget-menu">
                    <ul>
                      <li>
                        <a href="#">About Us</a>
                      </li>
                      <li>
                        <a href="#">Our Team</a>
                      </li>
                      <li>
                        <a href="#">Pricing Plans</a>
                      </li>
                      <li>
                        <a href="#">Blogs</a>
                      </li>
                      <li>
                        <a href="#">Contact Us</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 mb-50">
                <div className="tv-footer-widget tv-footer-col-3 d-flex justify-content-xl-end">
                  <div>
                    <h4 className="tv-footer-widget-title">Services</h4>
                    <div className="tv-footer-widget-menu">
                      <ul>
                        <li>
                          <a href="#">UI/UX Design</a>
                        </li>
                        <li>
                          <a href="#">App Development</a>
                        </li>
                        <li>
                          <a href="#">Digital Marketing</a>
                        </li>
                        <li>
                          <a href="#">Web Development</a>
                        </li>
                        <li>
                          <a href="#">Cyber Security</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-50">
                <div className="tv-footer-widget tv-footer-col-4 d-flex justify-content-xl-end">
                  <div>
                    <h4 className="tv-footer-widget-title">Information</h4>
                    <div className="tv-footer-widget-menu">
                      <ul>
                        <li>
                          <a href="#">Working Process</a>
                        </li>
                        <li>
                          <a href="#">Privacy Policy</a>
                        </li>
                        <li>
                          <a href="#">Terms & Conditions</a>
                        </li>
                        <li>
                          <a href="#">Faqs</a>
                        </li>
                      </ul>
                    </div>
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
                      © 2025 <a href="#">Techor</a>All Rights Reserved, Created
                      by <a href="#">HurrayTheme</a>
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
  );
}
