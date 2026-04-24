import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { type BlogPost } from '../../data/blog-posts';
import {
  fetchBlogComments,
  fetchPublishedBlogPost,
  fetchPublishedBlogPosts,
  formatBlogDate,
  postBlogComment,
  type BlogComment,
} from '../../lib/blogs';

type CommentFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

const initialCommentForm: CommentFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  website: '',
};

function renderInlineMarkdown(text: string) {
  const parts = text.split(/(!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return parts.map((part, index) => {
    const imageMatch = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

    if (imageMatch) {
      return (
        <img
          key={`${part}-${index}`}
          className="tv-blog-inline-image"
          src={imageMatch[2]}
          alt={imageMatch[1] || 'Blog content'}
        />
      );
    }

    if (linkMatch) {
      return (
        <a key={`${part}-${index}`} href={linkMatch[2]} target="_blank" rel="noreferrer">
          {linkMatch[1]}
        </a>
      );
    }

    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={`${part}-${index}`}>{part.slice(1, -1)}</em>;
    }

    return part;
  });
}

function renderRichBlogContent(content: string) {
  const blocks = content.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);

  return blocks.map((block, blockIndex) => {
    const imageMatch = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);

    if (imageMatch) {
      return (
        <figure key={blockIndex} className="tv-blog-content-image">
          <img src={imageMatch[2]} alt={imageMatch[1] || 'Blog content'} />
          {imageMatch[1] ? <figcaption>{imageMatch[1]}</figcaption> : null}
        </figure>
      );
    }

    if (block.startsWith('## ')) {
      return <h2 key={blockIndex}>{renderInlineMarkdown(block.slice(3))}</h2>;
    }

    if (block.startsWith('# ')) {
      return <h2 key={blockIndex}>{renderInlineMarkdown(block.slice(2))}</h2>;
    }

    if (block.startsWith('> ')) {
      return (
        <div key={blockIndex} className="blockquote">
          <p>{renderInlineMarkdown(block.replace(/^>\s?/gm, ''))}</p>
        </div>
      );
    }

    const lines = block.split(/\r?\n/);
    const isList = lines.every((line) => /^[-*]\s+/.test(line.trim()));

    if (isList) {
      return (
        <ul key={blockIndex} className="tv-blog-rich-list">
          {lines.map((line) => (
            <li key={line}>{renderInlineMarkdown(line.replace(/^[-*]\s+/, ''))}</li>
          ))}
        </ul>
      );
    }

    return <p key={blockIndex}>{renderInlineMarkdown(block)}</p>;
  });
}

type BlogDetailsAreaProps = {
  previewPost?: BlogPost;
};

export default function BlogDetailsArea({ previewPost }: BlogDetailsAreaProps) {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [commentForm, setCommentForm] = useState<CommentFormState>(initialCommentForm);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentStatus, setCommentStatus] = useState('');
  const [commentStatusType, setCommentStatusType] = useState<'success' | 'error'>('success');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (previewPost) {
        setPost(previewPost);
        setRecentPosts([]);
        setComments([]);
        setIsLoading(false);
        return;
      }

      if (!slug) {
        setIsLoading(false);
        return;
      }

      try {
        const [postResult, postsResult, commentsResult] = await Promise.all([
          fetchPublishedBlogPost(slug),
          fetchPublishedBlogPosts(),
          fetchBlogComments(slug),
        ]);

        setPost(postResult);
        setRecentPosts(postsResult.filter((item) => item.slug !== slug).slice(0, 3));
        setComments(commentsResult);
      } catch {
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };

    void loadPost();
  }, [previewPost, slug]);

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') {
      return '';
    }

    return window.location.href;
  }, [slug]);

  const shareLinks = useMemo(() => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(post?.title || 'ASPL Blog');

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    };
  }, [post?.title, shareUrl]);

  const handleCommentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!slug) {
      return;
    }

    setIsSubmittingComment(true);
    setCommentStatus('');

    try {
      const nextComment = await postBlogComment(slug, commentForm);
      setComments((current) => [nextComment, ...current]);
      setCommentForm(initialCommentForm);
      setCommentStatusType('success');
      setCommentStatus('Your comment has been posted.');
    } catch (error) {
      setCommentStatusType('error');
      setCommentStatus(error instanceof Error ? error.message : 'Unable to post comment.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleShareClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=720,height=560');
  };

  const updateCommentField = (field: keyof CommentFormState, value: string) => {
    setCommentForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="tv-blog-area pt-130 pb-130">
        <div className="container">
          <div className="tv-blog-empty">
            <p>Loading blog post...</p>
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
            <h3>Blog post not found</h3>
            <Link className="read-more-btn" to="/blog">
              Back to Blog<i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tv-blog-area pt-130 pb-130">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-12">
            <div className="tv-blog-list-wrap">
              <div className="tv-blog-details">
                <div className="tv-blog-details-thumb mb-40">
                  <img src={post.imageUrl} alt={post.title} />
                </div>
                <div className="tv-blog-details-meta mb-40">
                  <span>
                    <i className="fa-solid fa-calendar"></i>
                    {formatBlogDate(post.publishedAt)}
                  </span>
                  <span>
                    <i className="fa-solid fa-user"></i>
                    {post.authorName}
                  </span>
                  <span>
                    <i className="fa-solid fa-bookmark"></i>
                    {post.category}
                  </span>
                  <span>
                    <i className="fa-solid fa-message-middle"></i>
                    {comments.length} Comments
                  </span>
                </div>
                <div className="tv-blog-details-content">
                  <h1 className="blog-details-title">{post.title}</h1>
                  <p className="blog-details-excerpt">{post.excerpt}</p>
                  {renderRichBlogContent(post.content)}

                  <div className="tv-blog-details-btm d-flex align-items-center justify-content-between">
                    <div className="tags">
                      <h6>Tags: </h6>
                      {post.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className="social-share">
                      <h6>Share: </h6>
                      <button type="button" onClick={() => handleShareClick(shareLinks.facebook)} aria-label="Share on Facebook">
                        <i className="fa-brands fa-facebook-f"></i>
                      </button>
                      <button type="button" onClick={() => handleShareClick(shareLinks.twitter)} aria-label="Share on Twitter">
                        <i className="fa-brands fa-twitter"></i>
                      </button>
                      <button type="button" onClick={() => handleShareClick(shareLinks.linkedin)} aria-label="Share on LinkedIn">
                        <i className="fa-brands fa-linkedin-in"></i>
                      </button>
                      <button type="button" onClick={() => handleShareClick(shareLinks.whatsapp)} aria-label="Share on WhatsApp">
                        <i className="fa-brands fa-whatsapp"></i>
                      </button>
                    </div>
                  </div>

                  <div className="tv-blog-details-post-comment">
                    <h2>{comments.length} Comments</h2>
                    {comments.length ? (
                      <ul>
                        {comments.map((comment) => (
                          <li key={comment.id}>
                            <div className="single-comment-wrap d-flex tv-blog-comment-no-avatar">
                              <div className="comment-content">
                                <p>{comment.message}</p>
                                <h5 className="author-name">{comment.fullName}</h5>
                                <span className="comment-date">{formatBlogDate(comment.createdAt)}</span>
                                <a href="#comment-form" className="comment-reply-link">
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M9.16927 16.6693L0.835938 10.0026L9.16927 3.33594V7.5026C13.7716 7.5026 17.5026 11.2336 17.5026 15.8359C17.5026 16.0634 17.4935 16.2887 17.4756 16.5115C16.2197 14.1278 13.7176 12.5026 10.8359 12.5026H9.16927V16.6693Z"
                                      fill="#2B4DFF"
                                    />
                                  </svg>
                                  Reply
                                </a>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No comments yet. Be the first to comment.</p>
                    )}
                  </div>

                  <div className="tv-postbox-comment-form" id="comment-form">
                    <h4>Leave A Comment</h4>
                    <p>Your email address will not be published. Required fields are marked *</p>
                    <form onSubmit={handleCommentSubmit}>
                      <div className="row gx-20">
                        <div className="col-sm-6 mb-25">
                          <div className="postbox-review-input">
                            <input
                              type="text"
                              placeholder="first name"
                              value={commentForm.firstName}
                              onChange={(event) =>
                                updateCommentField('firstName', event.currentTarget.value)
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 mb-25">
                          <div className="postbox-review-input">
                            <input
                              type="text"
                              placeholder="last name"
                              value={commentForm.lastName}
                              onChange={(event) =>
                                updateCommentField('lastName', event.currentTarget.value)
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 mb-25">
                          <div className="postbox-review-input">
                            <input
                              type="email"
                              placeholder="email address"
                              value={commentForm.email}
                              onChange={(event) =>
                                updateCommentField('email', event.currentTarget.value)
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 mb-25">
                          <div className="postbox-review-input">
                            <input
                              type="text"
                              placeholder="Your Number"
                              value={commentForm.phone}
                              onChange={(event) =>
                                updateCommentField('phone', event.currentTarget.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="d-none">
                          <input
                            tabIndex={-1}
                            autoComplete="off"
                            value={commentForm.website}
                            onChange={(event) =>
                              updateCommentField('website', event.currentTarget.value)
                            }
                          />
                        </div>
                        <div className="col-12 mb-30">
                          <div className="postbox-review-textarea">
                            <textarea
                              placeholder="write here"
                              value={commentForm.message}
                              onChange={(event) =>
                                updateCommentField('message', event.currentTarget.value)
                              }
                              required
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      {commentStatus ? (
                        <p className={`tv-blog-comment-status is-${commentStatusType}`}>
                          {commentStatus}
                        </p>
                      ) : null}
                      <div className="postbox-review-button">
                        <button
                          type="submit"
                          className="tv-btn-primary d-none d-md-block"
                          disabled={isSubmittingComment}
                        >
                          <span className="btn-wrap">
                            <span className="btn-text1">
                              {isSubmittingComment ? 'Posting...' : 'Post Comment'}
                            </span>
                            <span className="btn-text2">
                              {isSubmittingComment ? 'Posting...' : 'Post Comment'}
                            </span>
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-12">
            <div className="tv-sidebar-area">
              <div className="tv-widget widget mb-30">
                <h4>Search Here</h4>
                <div className="widget-search-form">
                  <input type="search" placeholder="search" />
                  <button type="button">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </div>
              <div className="tv-widget widget mb-30">
                <h4>Recent Post</h4>
                {recentPosts.length ? (
                  recentPosts.map((item) => (
                    <div key={item.id} className="widget-latest-post d-flex">
                      <div className="widget-thumb">
                        <img src={item.imageUrl} alt={item.title} />
                      </div>
                      <div className="widget-content">
                        <h6>
                          <Link to={`/blog/${item.slug}`}>{item.title}</Link>
                        </h6>
                        <p>{formatBlogDate(item.publishedAt)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No other posts published yet.</p>
                )}
              </div>
              <div className="tv-widget widget mb-30">
                <h4>Categories</h4>
                <ul>
                  <li className="cat-item">
                    <span>{post.category}</span>
                    (01)
                  </li>
                </ul>
              </div>
              {post.tags.length ? (
                <div className="tv-widget widget mb-30">
                  <h4>Tag Cloud</h4>
                  <div className="tagcloud">
                    {post.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
