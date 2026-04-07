import { Link } from 'react-router-dom';
import menu_data from '../../data/menu-data';

export default function Navmenu() {
  return (
    <ul>
      {menu_data.map((item, i) => (
        <li
          key={i}
          className={`${item.has_dropdown ? 'has-dropdown' : ''} ${
            i === 0 ? 'p-static' : ''
          }`}
        >
          <Link to={item.link}>{item.title}</Link>

          {/* ✅ HOME MEGA MENU (unchanged) */}
          {i === 0 && (
            <div className="tv-submenu submenu has-home-img">
              <div className="tv-homemenu-wrapper">
                <div className="row gx-6 row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-5">
                  {item.sub_menus?.map((sub_item, index) => (
                    <div key={index} className="col home-img">
                      <div className="home-img-thumb home-img-overly mb-20">
                        <img src={sub_item.img} alt="" />
                        <div className="home-img-btn">
                          <Link className="tv-btn-sm" to={sub_item.link}>
                            <span className="text-one">View Page</span>
                          </Link>
                        </div>
                      </div>
                      <div className="home-img-content text-center">
                        <h4 className="home-img-title">
                          <Link to={sub_item.link}>{sub_item.title}</Link>
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ✅ NORMAL DROPDOWN (UPDATED WITH 3 LEVEL) */}
          {i !== 0 && item.has_dropdown && (
            <ul className="tv-submenu submenu">
              {item.sub_menus?.map((sub_item, index) => (
                <li
                  key={index}
                  className={sub_item.sub_menus ? 'has-dropdown' : ''}
                >
                  <Link to={sub_item.link}>
                    {sub_item.title}
                    {sub_item.sub_menus && ' '}
                  </Link>

                  {/* ✅ 3rd LEVEL */}
                  {sub_item.sub_menus && (
                    <ul className="tv-submenu submenu">
                      {sub_item.sub_menus.map((child, i) => (
                        <li key={i}>
                          <Link to={child.link}>{child.title}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}