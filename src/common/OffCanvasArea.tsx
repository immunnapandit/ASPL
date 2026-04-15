import { Link } from 'react-router-dom';
import MobileMenu from '../layouts/headers/MobileMenu';

interface OffCanvasAreaProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OffCanvasArea({
  menuOpen,
  setMenuOpen,
}: OffCanvasAreaProps) {
  return (
    <>
      <div className="tv-offcanvas-area">
        <div className={`itoffcanvas ${menuOpen ? 'opened' : ''}`}>
          <div className="itoffcanvas__close-btn">
            <button onClick={() => setMenuOpen(false)} className="close-btn">
              <i className="fal fa-times"></i>
            </button>
          </div>
          <div className="itoffcanvas__logo">
            <Link to="/">
              <img src="../../assets/img/logo/AtiSunyaLogo.png" alt="" />
            </Link>
          </div>
          <div className="itoffcanvas__text">
            <p>
              Delivering innovative ERP, CRM, Azure, and Power Platform
              services to help businesses accelerate digital transformation and
              achieve measurable success.
            </p>
          </div>
          <div className="tv-menu-mobile d-xl-none">
            <MobileMenu />
          </div>
          <div className="itoffcanvas__info">
            <h3 className="offcanva-title">Get In Touch</h3>
            <div className="tv-info-wrapper mb-20 d-flex align-items-center">
              <div className="itoffcanvas__info-icon">
                <a href="#">
                  <i className="fal fa-envelope"></i>
                </a>
              </div>
              <div className="itoffcanvas__info-address">
                <span>Email</span>
                <a href="mailto:info@atisunya.co">info@atisunya.co</a>
              </div>
            </div>
            <div className="tv-info-wrapper mb-20 d-flex align-items-center">
              <div className="itoffcanvas__info-icon">
                <a href="#">
                  <i className="fal fa-phone-alt"></i>
                </a>
              </div>
              <div className="itoffcanvas__info-address">
                <span>Phone</span>
                <a href="tel:(+91) 80-8181-0673">(+91) 80-8181-0673</a>
              </div>
            </div>
            <div className="tv-info-wrapper mb-20 d-flex align-items-center">
              <div className="itoffcanvas__info-icon">
                <a href="#">
                  <i className="fas fa-map-marker-alt"></i>
                </a>
              </div>
              <div className="itoffcanvas__info-address">
                <span>Location</span>
                <a
                  href="htits://www.google.com/maps/@37.4801311,22.8928877,3z"
                  target="_blank"
                >
                  Logix Technova,Block A, Sec-132 Noida{' '}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`body-overlay ${menuOpen ? 'apply' : ''}`}
        onClick={() => setMenuOpen(false)}
      ></div>
    </>
  );
}
