import { Link } from 'react-router-dom';

export default function FooterOne() {
  return (
    <footer>
      <div className="tv-footer-wrap footer-bg z-index-1 pt-130">
        <div className="tv-footer-top-area">
          <div className="container">
            <div className="tv-footer-top-area-form">
              <div className="row align-items-center">
                <div className="col-xl-5 col-12">
                  <div className="tv-footer-top-heading">
                    <h2 className="tv-spltv-text tv-spltv-in-right">
                      Subscribe to Our Newsletter
                    </h2>
                  </div>
                </div>
                <div className="col-xl-7 col-12 text-xl-end">
                  <div className="tv-footer-top-form">
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
        <div className="tv-footer-area mb-65">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-50">
                <div className="tv-footer-widget tv-footer-col-1">
                  <div className="tv-footer-widget-logo mb-30">
                    <Link to="/">
                      <img src="/assets/img/logo/AtiSunyaLogo.png" alt="" />
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
                        <a href="mailto:info@atisunya.co">
                          <i className="fa-solid fa-envelope"></i>
                          info@atisunya.co
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-50">
                <div className="tv-footer-widget tv-footer-col-2">
                  <h4 className="tv-footer-widget-title">Quick Links</h4>
                  <div className="tv-footer-widget-menu">
                    <ul>
                      <li>
                        <Link to="/about">About Us</Link>
                      </li>
                      <li>
                        <Link to="/team">Our Team</Link>
                      </li>
                      <li>
                        <Link to="/price">Pricing Plans</Link>
                      </li>
                      <li>
                        <Link to="/blog-grid">Blogs</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 mb-50">
                <div className="tv-footer-widget tv-footer-col-3 d-flex justify-content-xl-end">
                  <div>
                    <h4 className="tv-footer-widget-title">Services</h4>
                    <div className="tv-footer-widget-menu">
                      <ul>
                        <li>
                          <Link to="/service-details">UI/UX Design</Link>
                        </li>
                        <li>
                          <Link to="/service-details">App Development</Link>
                        </li>
                        <li>
                          <Link to="/service-details">Digital Marketing</Link>
                        </li>
                        <li>
                          <Link to="/service-details">Web Development</Link>
                        </li>
                        <li>
                          <Link to="/service-details">Cyber Security</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-50">
                <div className="tv-footer-widget tv-footer-col-4 d-flex justify-content-xl-end">
                  <div>
                    <h4 className="tv-footer-widget-title">Information</h4>
                    <div className="tv-footer-widget-menu">
                      <ul>
                        <li>
                          <Link to="/contact">Working Process</Link>
                        </li>
                        <li>
                          <Link to="/contact">Privacy Policy</Link>
                        </li>
                        <li>
                          <Link to="/contact">Terms & Conditions</Link>
                        </li>
                        <li>
                          <Link to="/faq">Faqs</Link>
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
                      © 2025 <a href="#">AtiSunya</a> All Rights Reserved <a href="#"></a>
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 text-end">
                  <div className="tv-footer-widget-social">
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
