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
                <a href="tel:(+91) 80-8181-0673,(+91) 82-9915-6511">(+91) 80-8181-0673, (+91) 82-9915-6511
                </a>
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
                  href="https://www.google.com/maps/dir//AtiSunya+Private+Limited,+LOGIX+TECHNOVA,+A522,+Block+B,+Sector+132,+Noida,+Uttar+Pradesh+201304/@28.5134549,77.3898596,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x390ce928dd54fc73:0x531361528b9b0680!2m2!1d77.3793737!2d28.5085151?entry=ttu&g_ep=EgoyMDI2MDQyMC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                >
                  A-522, Tower-A, Logix Technova, Sec-132, Noida{' '}
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
