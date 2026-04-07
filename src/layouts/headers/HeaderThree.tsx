import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navmenu from './Navmenu';
import UseSticky from '../../hooks/UseSticky';
import OffCanvasArea from '../../common/OffCanvasArea';

export default function HeaderThree() {
  const { sticky } = UseSticky();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="tv-header-height  ">
        <div
          id="header-sticky"
          className={`tv-header-area header-style-3 tv-header-transparent  tv-header-ptb p-relative ${sticky ? 'tv-header-sticky' : ''}`}
        >
          <div className="container container-1750 ">
            <div className="p-relative">
              <div className="row align-items-center">
                <div className="col-xxl-2 col-xl-2 col-6">
                  <div className="tv-header-logo">
                    <Link to="/">
                      <img src="assets/img/logo/logo-white2.png" alt="" />
                    </Link>
                  </div>
                </div>
                <div className=" col-xxl-7 col-xl-7 d-none d-xl-block text-center">
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
                      className="tv-btn-primary p-relative d-none d-xxl-block"
                    >
                      <span className="btn-wrap">
                        <span className="btn-text1">Get A Quote</span>
                        <span className="btn-text2">Get A Quote</span>
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
