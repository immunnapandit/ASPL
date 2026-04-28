import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type BlogPost } from '../../../data/blog-posts';
import { fetchPublishedBlogPosts, formatBlogDate } from '../../../lib/blogs';

export default function BlogHomeThree() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setPosts((await fetchPublishedBlogPosts()).slice(0, 3));
      } catch {
        setPosts([]);
      }
    };

    void loadPosts();
  }, []);

  if (!posts.length) {
    return null;
  }

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
              <p>Read the latest published posts from the ASPL team.</p>
              <Link to="/blog" className="tv-btn-primary mt-50 p-relative">
                <span className="btn-wrap">
                  <span className="btn-text1">More Blogs</span>
                  <span className="btn-text2">More Blogs</span>
                </span>
              </Link>
            </div>
          </div>
          <div className="col-xxl-7 col-xl-7">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className={`single-blog-item3 ${index === posts.length - 1 ? '' : 'mb-30'} d-flex align-items-center wow itfadeUp`}
                data-wow-delay={`${0.2 + index * 0.1}s`}
              >
                <div className="thumb">
                  <Link to={`/blog/${post.slug}`}>
                    <img src={post.imageUrl} alt={post.title} />
                  </Link>
                </div>
                <div className="content">
                  <div className="meta">
                    <span className="cat">{post.authorName}</span>
                    <span className="date">{formatBlogDate(post.publishedAt)}</span>
                  </div>
                  <h4>
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h4>
                  <Link to={`/blog/${post.slug}`} className="btn3 mt-60">
                    Read More <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

