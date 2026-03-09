import { Link } from 'react-router-dom';

export default function BlogHomeThree() {
  return (
    <div className="tv-blog-area tv-blog-area3 pt-130 pb-130">
      <div className="container">
        <div className="row">
          <div className="col-xxl-5 col-xl-5">
            <div className="tv-section-title-box ">
              <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                Our Blogs
              </span>
              <h4 className="tv-section-title tv-spltv-text tv-spltv-in-right">
                Recent Blog & Articles About Technology
              </h4>
              <p>
                Monotonectally synergize granular markets and front market
                Collaboratively strat fomediarie.
              </p>
              <a
                href="blog-grid.html"
                className="tv-btn-primary mt-50 p-relative"
              >
                <span className="btn-wrap">
                  <span className="btn-text1">More Blogs</span>
                  <span className="btn-text2">More Blogs</span>
                </span>
              </a>
            </div>
          </div>
          <div className="col-xxl-7 col-xl-7">
            <div
              className="single-blog-item3 mb-30 d-flex align-items-center wow itfadeUp"
              data-wow-delay=".2s"
            >
              <div className="thumb">
                <img src="assets/img/blog/blog-3-1.png" alt="" />
              </div>
              <div className="content">
                <div className="meta">
                  <span className="cat">Business solution</span>
                  <span className="date">27 May, 2024</span>
                </div>
                <h4>
                  <Link to="/blog-details">
                    Blockchain Beyond Crypto IT Applications Industries
                  </Link>
                </h4>
                <Link to="/blog-details" className="btn3 mt-60">
                  Read More <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div
              className="single-blog-item3 mb-30 d-flex align-items-center wow itfadeUp"
              data-wow-delay=".3s"
            >
              <div className="thumb">
                <img src="assets/img/blog/blog-3-2.png" alt="" />
              </div>
              <div className="content">
                <div className="meta">
                  <span className="cat">Business solution</span>
                  <span className="date">27 May, 2024</span>
                </div>
                <h4>
                  <Link to="/blog-details">
                    Blockchain Beyond Crypto IT Applications Industries
                  </Link>
                </h4>
                <Link to="/blog-details" className="btn3 mt-60">
                  Read More <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div
              className="single-blog-item3 d-flex align-items-center wow itfadeUp"
              data-wow-delay=".3s"
            >
              <div className="thumb">
                <img src="assets/img/blog/blog-3-3.png" alt="" />
              </div>
              <div className="content">
                <div className="meta">
                  <span className="cat">Business solution</span>
                  <span className="date">27 May, 2024</span>
                </div>
                <h4>
                  <Link to="/blog-details">
                    Blockchain Beyond Crypto IT Applications Industries
                  </Link>
                </h4>
                <Link to="/blog-details" className="btn3 mt-60">
                  Read More <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
