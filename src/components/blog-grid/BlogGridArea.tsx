import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type BlogPost } from '../../data/blog-posts';
import { fetchPublishedBlogPosts, formatBlogDate } from '../../lib/blogs';

export default function BlogGridArea() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setPosts(await fetchPublishedBlogPosts());
      } catch {
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadPosts();
  }, []);

  return (
    <div className="tv-blog-area pt-130 pb-130 blog-grid">
      <div className="container">
        {isLoading ? (
          <div className="tv-blog-empty">
            <p>Loading blog posts...</p>
          </div>
        ) : null}

        {!isLoading && !posts.length ? (
          <div className="tv-blog-empty">
            <h3>No blog posts published yet</h3>
            <p>Published CMS posts will appear here in the blog grid.</p>
          </div>
        ) : null}

        <div className="row">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="col-xl-4 col-lg-4 col-md-6 wow itfadeUp"
              data-wow-duration=".9s"
              data-wow-delay={`${0.3 + index * 0.1}s`}
            >
              <div className="single-blog-item style-2 style-3 mb-30">
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
                  <Link className="read-more-btn" to={`/blog/${post.slug}`}>
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
