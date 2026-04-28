import Navmenu from './Navmenu';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import UseSticky from '../../hooks/UseSticky';
import OffCanvasArea from '../../common/OffCanvasArea';
import { socialLinks } from '../../data/social-links';

export default function HeaderOne() {
  const { sticky } = UseSticky();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="tv-header-height tv-header-one">
        <div className="tv-header-top-area tv-header-top-ptb">
          <div className="container container-1750">
            <div className="row align-items-center">
              <div className="col-xl-8 col-lg-7 col-md-6 col-sm-6">
                <div className="tv-header-top-list-box">
                  <ul className="d-flex align-items-center flex-nowrap mb-0">
                    <li className="d-none d-lg-inline-block">
                      <span
                        className="d-inline-flex align-items-center flex-nowrap"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        <i className="fa-solid fa-phone"></i>
                        <a
                          href="tel:+91-80-8181-0673"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          (+91) 80-8181-0673, (+91) 82-9915-6511
                        </a>
                      </span>
                    </li>
                    <li>
                      <span
                        className="d-inline-flex align-items-center flex-nowrap"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        <i className="fa-solid fa-envelope"></i>
                        <a href="mailto:info@atisunya.co">info@atisunya.co</a>
                      </span>
                    </li>
                    <li className="d-none d-xxl-inline-block">
                      <span
                        className="d-inline-flex align-items-center flex-nowrap"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        <i className="fa-solid fa-location-dot"></i>
                        <a
                          target="_blank"
                          href="https://www.google.com/maps/@23.843848,90.3081992,17.5z?entry=ttu&amp;g_ep=EgoyMDI1MDEwMS4wIKXMDSoASAFQAw%3D%3D"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          Logix Technova, Block A-522, Sec-132 Noida
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-6 col-sm-6 d-none d-sm-block">
                <div className="tv-header-top-right d-flex align-items-center justify-content-end">
                  <div className="tv-header-top-social-box">
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="header-sticky"
          className={`tv-header-area header-style-1 tv-header-ptb p-relative ${sticky ? 'header-sticky' : ''}`}
        >
          <div className="container container-1750">
            <div className="p-relative">
              <div className="row align-items-center">
                <div className="col-xxl-2 col-xl-2 col-6">
                  <div className="tv-header-logo">
                    <Link to="/">
                      <img
                        src="/assets/img/logo/AtiSunya.png"
                        alt="AtiSunya-logo"
                      />
                    </Link>
                  </div>
                </div>
                <div className=" col-xxl-7 col-xl-7 d-none d-xl-block">
                  <div className="tv-header-menu tv-header-dropdown">
                    <nav className="tv-menu-content">
                      <Navmenu />
                    </nav>
                  </div>
                </div>
                <div className="col-xxl-3 col-xl-3 col-6">
                  <div className="tv-header-right-action d-flex justify-content-end align-items-center">
                    <Link
                      to="/contact"
                      className="tv-btn-primary d-none d-md-block"
                    >
                      <span className="btn-wrap">
                        <span className="btn-text1">Contact Us</span>
                        <span className="btn-text2">Contact Us</span>
                      </span>
                    </Link>
                    <div className="tv-header-bar">
                      <button
                        className="tv-menu-bar"
                        onClick={() => setMenuOpen(true)}
                      >
                        <span>
                          <i className="fa-solid fa-bars-staggered"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <OffCanvasArea menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
}
