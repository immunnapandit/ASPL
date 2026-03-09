import { Link } from 'react-router-dom';

export default function BlogHomeOne() {
  return (
    <div className="tv-blog-area pt-130 pb-130">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-xl-6 col-lg-6">
            <div className="tv-section-title-box">
              <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                Our Blogs
              </span>
              <h4 className="tv-section-title pb-20 tv-spltv-text tv-spltv-in-right">
                Recent Blog & Articles <br /> About Technology
              </h4>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 text-end">
            <div
              className="tv-fade-anim button"
              data-fade-from="top"
              data-ease="bounce"
              data-delay=".5"
            >
              <Link to="/blog-details" className="tv-btn-primary p-relative">
                <span className="btn-wrap">
                  <span className="btn-text1">View All Posts</span>
                  <span className="btn-text2">View All Posts</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="tv-blog-wrap mt-60">
          <div className="row">
            <div
              className="col-lg-6 col-xl-6 col-md-6 wow itfadeUp"
              data-wow-duration=".9s"
              data-wow-delay=".3s"
            >
              <div className="single-blog-item first mb-30">
                <img src="assets/img/blog/blog-thumb-1.png" alt="" />
                <div className="blog-content mt-30">
                  <div className="blog-meta">
                    <span className="author">Alom Khan</span>
                    <span className="date">27 May, 2024</span>
                  </div>
                  <h2>
                    <Link to="/blog-details">
                      Boost your Startup Business With our Digital Agency
                    </Link>
                  </h2>
                </div>
              </div>
            </div>
            <div
              className="col-lg-6 col-xl-3 col-md-6 wow itfadeUp"
              data-wow-duration=".9s"
              data-wow-delay=".5s"
            >
              <div className="single-blog-item mb-30">
                <img src="assets/img/blog/blog-thumb-2.png" alt="" />
                <div className="blog-content mt-30">
                  <div className="blog-meta">
                    <span className="author">Alom Khan</span>
                    <span className="date">27 May, 2024</span>
                  </div>
                  <h2>
                    <Link to="/blog-details">
                      Planning your Online Business Goals With a Specialist
                    </Link>
                  </h2>
                </div>
              </div>
            </div>
            <div
              className="col-lg-6 col-xl-3 col-md-6 wow itfadeUp"
              data-wow-duration=".9s"
              data-wow-delay=".7s"
            >
              <div className="single-blog-item mb-30">
                <img src="assets/img/blog/blog-thumb-3.png" alt="" />
                <div className="blog-content mt-30">
                  <div className="blog-meta">
                    <span className="author">Alom Khan</span>
                    <span className="date">27 May, 2024</span>
                  </div>
                  <h2>
                    <Link to="/blog-details">
                      Including Animation In Your Design System
                    </Link>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
