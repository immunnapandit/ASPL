import { Link } from 'react-router-dom';
import Breadcrumb from '../../common/Breadcrumb';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Wrapper from '../../layouts/Wrapper';
import FooterOne from '../../layouts/footers/FooterOne';

export default function NotFound() {
  return (
    <Wrapper>
      <HeaderOne />
      <main>
        <Breadcrumb title="404 Not Found" subtitle="404 Not Found" />
        <div className="tv-error-area pt-130 pb-125">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xxl-12 col-xl-7 col-lg-7 col-md-9">
                <div
                  className="tv-error-thumb text-center mb-120 wow itfadeUp"
                  data-wow-duration=".9s"
                  data-wow-delay=".3s"
                >
                  <img src="assets/img/about/error.png" alt="" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="tv-error-content text-center">
                  <h5 className="tv-section-title pb-40 tv-spltv-text tv-spltv-in-right">
                    We’re Sorry Page Not Found
                  </h5>
                  <div
                    className="tv-fade-anim"
                    data-fade-from="top"
                    data-ease="bounce"
                    data-delay=".5"
                  >
                    <Link to="/" className="tv-btn-primary p-relative">
                      <span className="btn-wrap">
                        <span className="btn-text1">Back To Home</span>
                        <span className="btn-text2">Back To Home </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterOne />
    </Wrapper>
  );
}
