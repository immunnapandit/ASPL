import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type BlogPost } from '../../../data/blog-posts';
import { fetchPublishedBlogPosts, formatBlogDate } from '../../../lib/blogs';

export default function BlogHomeTwo() {
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
    <div className="tv-blog2-area pt-130 pb-130">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <div className="tv-section-title-box mb-60">
              <span className="tv-section-subtitle tv-spltv-text tv-spltv-in-right">
                Our Blogs
              </span>
              <h4 className="tv-section-title  tv-spltv-text tv-spltv-in-right">
                Recent Blog & Articles About Technology
              </h4>
            </div>
          </div>
        </div>
        <div className="row">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="col-xl-4 col-lg-4 col-md-6 wow itfadeUp"
              data-wow-delay={`${0.3 + index * 0.2}s`}
              data-wow-duration=".9s"
            >
              <div className="single-blog-item style-2">
                <Link to={`/blog/${post.slug}`} className="blog-thumb-link">
                  <img src={post.imageUrl} alt={post.title} />
                </Link>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="author">{post.authorName}</span>
                    <span className="date">{formatBlogDate(post.publishedAt)}</span>
                  </div>
                  <h2>
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <Link to={`/blog/${post.slug}`} className="read-more-btn">
                    Read More<i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

