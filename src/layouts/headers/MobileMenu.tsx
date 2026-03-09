import { Link } from 'react-router-dom';
import { useState } from 'react';
import menu_data from '../../data/menu-data';

export default function MobileMenu() {
  // menu toggle function
  const [navTitle, setNavTitle] = useState<string>('');
  const openMobileMenu = (menu: string) => {
    if (navTitle === menu) {
      setNavTitle('');
    } else {
      setNavTitle(menu);
    }
  };

  return (
    <nav className="tv-menu-content">
      <ul>
        {menu_data.map((item, i) => (
          <li
            key={i}
            className={`${item.has_dropdown ? 'has-dropdown' : ''} ${i === 0 ? 'p-static' : ''}`}
          >
            <Link to={item.link}>
              {' '}
              {item.title}
              {item.has_dropdown && (
                <button
                  className={`dropdown-toggle-btn ${navTitle === item.title ? 'dropdown-opened' : ''}`}
                  onClick={() => openMobileMenu(item.title)}
                >
                  <i className="fal fa-angle-right"></i>
                </button>
              )}
            </Link>
            {i === 0 && (
              <div
                className="tv-submenu submenu has-home-img"
                style={{ display: navTitle === item.title ? 'block' : 'none' }}
              >
                <div className="tv-homemenu-wrapper">
                  <div className="row gx-6 row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-5">
                    <div className="col home-img">
                      <div className="home-img-thumb home-img-overly mb-20">
                        <img src="assets/img/menu/home-1.jpg" alt="" />
                        <div className="home-img-btn">
                          <a className="tv-btn-sm" href="index.html">
                            <span className="text-one">View Page</span>
                          </a>
                        </div>
                      </div>
                      <div className="home-img-content text-center">
                        <h4 className="home-img-title">
                          <a href="index.html">Home 01</a>
                        </h4>
                      </div>
                    </div>
                    <div className="col home-img">
                      <div className="home-img-thumb home-img-overly mb-20">
                        <img src="assets/img/menu/home-2.jpg" alt="" />
                        <div className="home-img-btn">
                          <a className="tv-btn-sm" href="index-2.html">
                            <span className="text-one">View Page</span>
                          </a>
                        </div>
                      </div>
                      <div className="home-img-content text-center">
                        <h4 className="home-img-title">
                          <a href="index-2.html">Home 02</a>
                        </h4>
                      </div>
                    </div>
                    <div className="col home-img">
                      <div className="home-img-thumb home-img-overly mb-20">
                        <img src="assets/img/menu/home-3.jpg" alt="" />
                        <div className="home-img-btn">
                          <a className="tv-btn-sm" href="index-3.html">
                            <span className="text-one">View Demo</span>
                          </a>
                        </div>
                      </div>
                      <div className="home-img-content text-center">
                        <h4 className="home-img-title">
                          <a href="index-3.html">Home 03</a>
                        </h4>
                      </div>
                    </div>
                    <div className="col home-img">
                      <div className="home-img-thumb home-img-overly mb-20">
                        <img src="assets/img/menu/home-4.jpg" alt="" />
                        <div className="home-img-btn">
                          <a className="tv-btn-sm" href="#">
                            <span className="text-one">Comming Soon</span>
                          </a>
                        </div>
                      </div>
                      <div className="home-img-content text-center">
                        <h4 className="home-img-title">
                          <a href="#">Comming Soon</a>
                        </h4>
                      </div>
                    </div>
                    <div className="col home-img">
                      <div className="home-img-thumb home-img-overly mb-20">
                        <img src="assets/img/menu/home-5.jpg" alt="" />
                        <div className="home-img-btn">
                          <a className="tv-btn-sm" href="#">
                            <span className="text-one">Comming Soon</span>
                          </a>
                        </div>
                      </div>
                      <div className="home-img-content text-center">
                        <h4 className="home-img-title">
                          <a href="#">Comming Soon</a>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {i !== 0 && item.has_dropdown && (
              <ul
                className="tv-submenu submenu"
                style={{ display: navTitle === item.title ? 'block' : 'none' }}
              >
                {item.sub_menus?.map((sub_item, index) => (
                  <li key={index}>
                    <Link to={sub_item.link}>{sub_item.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
