import { Link } from 'react-router-dom';

export default function BlogHomeTwo() {
  return (
    <div className="tv-blog2-area pt-130 pb-130 gray-bg">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <div className="tv-section-title-box mb-60">
              <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                Our Blogs
              </span>
              <h4 className="tv-section-title  tv-spltv-text tv-spltv-in-right">
                Recent Blog & Articles <br /> About Technology
              </h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col-xl-4 col-lg-4 col-md-6 wow itfadeUp"
            data-wow-delay="0.3s"
            data-wow-duration=".9s"
          >
            <div className="single-blog-item style-2">
              <img src="assets/img/blog/blog-thumb-2-1.png" alt="" />
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="author">Business solution</span>
                  <span className="date">27 May, 2024</span>
                </div>
                <h2>
                  <Link to="/blog-details">
                    Planning your Online Business Goals With a Specialist
                  </Link>
                </h2>
                <Link to="/blog-details" className="read-more-btn">
                  Read More<i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-4 col-md-6 wow itfadeUp"
            data-wow-delay="0.5s"
            data-wow-duration=".9s"
          >
            <div className="single-blog-item style-2">
              <img src="assets/img/blog/blog-thumb-2-2.png" alt="" />
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="author">Business solution</span>
                  <span className="date">27 May, 2024</span>
                </div>
                <h2>
                  <Link to="/blog-details">
                    Planning your Online Business Goals With a Specialist
                  </Link>
                </h2>
                <Link to="/blog-details" className="read-more-btn">
                  Read More<i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-4 col-md-6 wow itfadeUp"
            data-wow-delay="0.7s"
            data-wow-duration=".9s"
          >
            <div className="single-blog-item style-2">
              <img src="assets/img/blog/blog-thumb-2-3.png" alt="" />
              <div className="blog-content">
                <div className="blog-meta">
                  <span className="author">Business solution</span>
                  <span className="date">27 May, 2024</span>
                </div>
                <h2>
                  <Link to="/blog-details">
                    Planning your Online Business Goals With a Specialist
                  </Link>
                </h2>
                <Link to="/blog-details" className="read-more-btn">
                  Read More<i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
