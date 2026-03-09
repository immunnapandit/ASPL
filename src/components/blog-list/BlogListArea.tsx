import { Link } from 'react-router-dom';

export default function BlogListArea() {
  return (
    <div className="tv-blog-area pt-130 pb-130">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-12">
            <div className="tv-blog-list-wrap">
              <div
                className="single-blog-item blog-list first mb-30 wow itfadeUp"
                data-wow-duratoin=".9s"
                data-wow-delay=".3s"
              >
                <img src="assets/img/blog/blog-list-thum-1.png" alt="" />
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="author">Business solution</span>
                    <span className="date">27 May, 2024</span>
                  </div>
                  <h2>
                    <Link to="/blog-details">
                      Boost your Startup Business With our Digital Agency
                    </Link>
                  </h2>
                  <p>
                    Each demo built with Teba will look different. You can
                    customize almost anything in appearance of your website with
                    only a few clicks.{' '}
                  </p>
                  <Link className="read-more-btn" to="/blog-details">
                    Read More<i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
              <div
                className="single-blog-item blog-list first mb-30 wow itfadeUp"
                data-wow-duratoin=".9s"
                data-wow-delay=".5s"
              >
                <img src="assets/img/blog/blog-list-thum-2.png" alt="" />
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="author">Business solution</span>
                    <span className="date">27 May, 2024</span>
                  </div>
                  <h2>
                    <Link to="/blog-details">
                      Boost your Startup Business With our Digital Agency
                    </Link>
                  </h2>
                  <p>
                    Each demo built with Teba will look different. You can
                    customize almost anything in appearance of your website with
                    only a few clicks.{' '}
                  </p>
                  <Link className="read-more-btn" to="/blog-details">
                    Read More<i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
              <div
                className="single-blog-item blog-list first mb-30 wow itfadeUp"
                data-wow-duratoin=".9s"
                data-wow-delay=".7s"
              >
                <img src="assets/img/blog/blog-list-thum-3.png" alt="" />
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="author">Business solution</span>
                    <span className="date">27 May, 2024</span>
                  </div>
                  <h2>
                    <Link to="/blog-details">
                      Data Backup and Recovery Best Practices Small
                    </Link>
                  </h2>
                  <p>
                    Each demo built with Teba will look different. You can
                    customize almost anything in appearance of your website with
                    only a few clicks.{' '}
                  </p>
                  <Link className="read-more-btn" to="/blog-details">
                    Read More<i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
              <div className="tv-pagination mt-80">
                <nav>
                  <ul>
                    <li>
                      <a href="#">1</a>
                    </li>
                    <li>
                      <a href="#">2</a>
                    </li>
                    <li className="current">
                      <a href="#">3</a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa-solid fa-angle-right"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-12">
            <div className="tv-sidebar-area">
              <div
                className="tv-widget widget mb-30 wow itfadeUp"
                data-wow-duratoin=".9s"
                data-wow-delay=".3s"
              >
                <h4>Search Here</h4>
                <div className="widget-search-form">
                  <input type="search" placeholder="search" />
                  <button type="button">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </div>
              <div
                className="tv-widget widget mb-30  wow-itfadeUp"
                data-wow-duratoin=".9s"
                data-wow-delay=".3s"
              >
                <h4>Categories</h4>
                <ul>
                  <li className="cat-item">
                    <a href="">Technology</a>
                    (03)
                  </li>
                  <li className="cat-item">
                    <a href="">Apps Development </a>
                    (01)
                  </li>
                  <li className="cat-item">
                    <a href="">Business</a>
                    (05)
                  </li>
                  <li className="cat-item">
                    <a href="">Social Marketing</a>
                    (02)
                  </li>
                  <li className="cat-item">
                    <a href="">Business Intelligence</a>
                    (04)
                  </li>
                </ul>
              </div>
              <div
                className="tv-widget widget mb-30  wow itfadeUp"
                data-wow-duratoin=".9s"
                data-wow-delay=".3s"
              >
                <h4>Recent Post</h4>
                <div className="widget-latest-post d-flex">
                  <div className="widget-thumb">
                    <img src="assets/img/blog/blog-grid-1-1.png" alt="" />
                  </div>
                  <div className="widget-content">
                    <h6>
                      <Link to="/blog-details">
                        Boost your startup business with our digital agency
                      </Link>
                    </h6>
                    <p>26 June 2024</p>
                  </div>
                </div>
                <div className="widget-latest-post d-flex">
                  <div className="widget-thumb">
                    <img src="assets/img/blog/blog-grid-1-2.png" alt="" />
                  </div>
                  <div className="widget-content">
                    <h6>
                      <Link to="/blog-details">
                        Boost your startup business with our digital agency
                      </Link>
                    </h6>
                    <p>26 June 2024</p>
                  </div>
                </div>
                <div className="widget-latest-post d-flex">
                  <div className="widget-thumb">
                    <img src="assets/img/blog/blog-grid-1-3.png" alt="" />
                  </div>
                  <div className="widget-content">
                    <h6>
                      <Link to="/blog-details">
                        Boost your startup business with our digital agency
                      </Link>
                    </h6>
                    <p>26 June 2024</p>
                  </div>
                </div>
              </div>
              <div
                className="tv-widget widget mb-30  wow itfadeUp"
                data-wow-duratoin=".9s"
                data-wow-delay=".3s"
              >
                <h4>Tag Cloud</h4>
                <div className="tagcloud">
                  <a href="#">Brand</a>
                  <a href="#">Business</a>
                  <a href="#"> Development</a>
                  <a href="#"> Marketing</a>
                  <a href="#">SaaS</a>
                  <a href="#">Technology</a>
                  <a href="#">Startup</a>
                  <a href="#">Services</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
