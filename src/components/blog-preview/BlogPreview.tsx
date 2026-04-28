import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { type BlogPost } from '../../data/blog-posts';
import BlogDetailsArea from '../blog-details/BlogDetailsArea';

export default function BlogPreview() {
  const { previewKey } = useParams();
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    if (!previewKey) {
      setPost(null);
      return;
    }

    try {
      const rawPost =
        window.localStorage.getItem(previewKey) ||
        window.sessionStorage.getItem(previewKey);
      setPost(rawPost ? (JSON.parse(rawPost) as BlogPost) : null);
    } catch {
      setPost(null);
    }
  }, [previewKey]);

  if (post === undefined) {
    return (
      <div className="tv-blog-area pt-130 pb-130">
        <div className="container">
          <div className="tv-blog-empty">
            <p>Loading preview...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="tv-blog-area pt-130 pb-130">
        <div className="container">
          <div className="tv-blog-empty">
            <h3>Preview not found</h3>
            <p>Open preview again from the Blog CMS editor.</p>
            <Link to="/admin/blog" className="read-more-btn">
              Back to CMS<i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <BlogDetailsArea previewPost={post} />;
}
