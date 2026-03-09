import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  title?: string;
  subtitle?: string;
}

export default function Breadcrumb({ title, subtitle }: BreadcrumbProps) {
  return (
    <div
      className="tv-breadcrumb-area tv-breadcrumb-overlay tv-breadcrumb-ptb z-index-1 fix p-relative"
      style={{ backgroundImage: `url(/assets/img/breadcrumb/breadcrumb.jpg)` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="tv-breadcrumb-content z-index-1 text-center">
              <div className="tv-breadcrumb-title-box">
                <h3 className="tv-breadcrumb-title tv-spltv-text tv-spltv-in-right">
                  {title}
                </h3>
              </div>
              <div className="tv-breadcrumb-list-wrap">
                <div className="tv-breadcrumb-list">
                  <span>
                    <Link to="/">Home</Link>
                  </span>
                  <span className="dvdr">
                    <svg
                      width="7"
                      height="12"
                      viewBox="0 0 7 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.47698 6.00058L0.352151 10.1253L1.53065 11.3038L6.83398 6.00058L1.53065 0.697266L0.352151 1.87577L4.47698 6.00058Z"
                        fill="#F5F6F7"
                      />
                    </svg>
                  </span>
                  <i>{subtitle}</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
