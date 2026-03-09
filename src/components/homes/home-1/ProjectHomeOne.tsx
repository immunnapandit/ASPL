import { Link } from 'react-router-dom';

export default function ProjectHomeOne() {
  return (
    <div className="tv-project-area pt-130 pb-130">
      <div className="container">
        <div className="row  justify-content-center">
          <div className="col-12 text-center">
            <div className="tv-section-title-box mb-60">
              <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                Our Project
              </span>
              <h4 className="tv-section-title pb-20 tv-spltv-text tv-spltv-in-right">
                Tech Solutions Driving Global <br /> Connectivity
              </h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col-lg-4 col-xl-4 col-md-6 wow itfadeUp"
            data-wow-duration=".9s"
            data-wow-delay=".3s"
          >
            <div className="single-project-item mb-30">
              <img src="assets/img/project/project-1-1.png" alt="" />
              <span className="icon">
                <Link to="/project-details">
                  {' '}
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </span>
              <div className="single-project-content">
                <h3>Marketing Agency Website</h3>
                <div className="project-cat">
                  <span>Developement, </span>
                  <span>Marketing</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-xl-4 col-md-6 wow itfadeUp"
            data-wow-duration=".9s"
            data-wow-delay=".5s"
          >
            <div className="single-project-item mb-30">
              <img src="assets/img/project/project-1-2.png" alt="" />
              <span className="icon">
                <Link to="/project-details">
                  {' '}
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </span>
              <div className="single-project-content">
                <h3>Marketing Agency Website</h3>
                <div className="project-cat">
                  <span>Developement, </span>
                  <span>Marketing</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 col-xl-4 col-md-6 wow itfadeUp"
            data-wow-duration=".9s"
            data-wow-delay=".7s"
          >
            <div className="single-project-item mb-30">
              <img src="assets/img/project/project-1-3.png" alt="" />
              <span className="icon">
                <Link to="/project-details">
                  {' '}
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </span>
              <div className="single-project-content">
                <h3>Marketing Agency Website</h3>
                <div className="project-cat">
                  <span>Developement, </span>
                  <span>Marketing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center mt-30 ">
            <div
              className="tv-fade-anim"
              data-fade-from="top"
              data-ease="bounce"
              data-delay=".5"
            >
              <Link to="/project" className="tv-btn-primary">
                <span className="btn-wrap">
                  <span className="btn-text1">View Our All Works</span>
                  <span className="btn-text2">View Our All Works</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
