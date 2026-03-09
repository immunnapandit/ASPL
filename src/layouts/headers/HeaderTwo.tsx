import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navmenu from './Navmenu';
import UseSticky from '../../hooks/UseSticky';
import SearchArea from '../../common/SearchArea';
import OffCanvasArea from '../../common/OffCanvasArea';

export default function HeaderTwo() {
  const { sticky } = UseSticky();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="tv-header-height">
        <div
          id="header-sticky"
          className={`tv-header-area header-style-2 tv-header-transparent tv-header-ptb p-relative ${sticky ? 'header-sticky' : ''}`}
        >
          <div className="container container-1750">
            <div className="p-relative header-two">
              <div className="row align-items-center">
                <div className="col-xxl-2 col-xl-2 col-6">
                  <div className="tv-header-logo">
                    <Link to="/">
                      <img src="assets/img/logo/logo-white.png" alt="" />
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
                    <button
                      onClick={() => setSearchOpen(true)}
                      className="tv-header-search search-open-btn d-none d-xxl-block"
                    >
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
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
                    <Link
                      to="/contact"
                      className="tv-btn-primary p-relative d-none d-xxl-block"
                    >
                      <span className="btn-wrap">
                        <span className="btn-text1">Get A Quote</span>
                        <span className="btn-text2">Get A Quote</span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <SearchArea searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      <OffCanvasArea menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
}
