import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type BlogPost } from '../../../data/blog-posts';
import { fetchPublishedBlogPosts, formatBlogDate } from '../../../lib/blogs';

export default function BlogHomeOne() {
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
            <div className="tv-fade-anim button" data-fade-from="top" data-ease="bounce" data-delay=".5">
              <Link to="/blog" className="tv-btn-primary p-relative">
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
            {posts.map((post, index) => (
              <div
                key={post.id}
                className={`${index === 0 ? 'col-lg-6 col-xl-6' : 'col-lg-6 col-xl-3'} col-md-6 wow itfadeUp`}
                data-wow-duration=".9s"
                data-wow-delay={`${0.3 + index * 0.2}s`}
              >
                <div className={`single-blog-item ${index === 0 ? 'first' : ''} mb-30`}>
                  <Link to={`/blog/${post.slug}`} className="blog-thumb-link">
                    <img src={post.imageUrl} alt={post.title} />
                  </Link>
                  <div className="blog-content mt-30">
                    <div className="blog-meta">
                      <span className="author">{post.authorName}</span>
                      <span className="date">{formatBlogDate(post.publishedAt)}</span>
                    </div>
                    <h2>
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

