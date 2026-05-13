import { BLOG_COMMENTS_API_BASE_URL, BLOG_POSTS_API_URL } from '../config/api';
import { type BlogPost } from '../data/blog-posts';
import { fallbackPublishedBlogPosts } from '../data/published-blog-posts';

export type BlogComment = {
  id: string;
  postSlug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  status: 'approved';
  createdAt: string;
  updatedAt: string;
};

export type BlogCommentPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  website?: string;
};

type BlogPostsResponse = {
  ok?: boolean;
  posts?: BlogPost[];
  post?: BlogPost;
  comments?: BlogComment[];
  comment?: BlogComment;
  error?: string;
};

const BLOG_REQUEST_TIMEOUT_MS = 5000;
const BLOG_POSTS_CACHE_KEY = 'aspl-published-blog-posts-cache';

function sortPublishedPosts(posts: BlogPost[]) {
  return posts
    .filter((post) => post.status === 'published')
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
}

function readCachedBlogPosts() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const cachedPosts = JSON.parse(window.localStorage.getItem(BLOG_POSTS_CACHE_KEY) || '[]');
    return Array.isArray(cachedPosts) ? (cachedPosts as BlogPost[]) : [];
  } catch {
    return [];
  }
}

function writeCachedBlogPosts(posts: BlogPost[]) {
  if (typeof window === 'undefined' || !posts.length) {
    return;
  }

  try {
    window.localStorage.setItem(BLOG_POSTS_CACHE_KEY, JSON.stringify(posts));
  } catch {
    // Cache is best-effort only; API data remains the source of truth.
  }
}

export function getCachedOrFallbackPublishedBlogPosts() {
  const cachedPosts = readCachedBlogPosts();
  return cachedPosts.length ? sortPublishedPosts(cachedPosts) : fallbackPublishedBlogPosts;
}

export function getCachedOrFallbackPublishedBlogPost(slug: string) {
  return getCachedOrFallbackPublishedBlogPosts().find((post) => post.slug === slug) || null;
}

async function fetchBlogApi(url: string, init?: RequestInit) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), BLOG_REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

export function formatBlogDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'Recently'
    : date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
}

export async function fetchPublishedBlogPosts() {
  try {
    const response = await fetchBlogApi(BLOG_POSTS_API_URL);
    const result = (await response.json().catch(() => null)) as BlogPostsResponse | null;

    if (!response.ok || !Array.isArray(result?.posts)) {
      throw new Error(result?.error || 'Unable to load blog posts.');
    }

    const posts = sortPublishedPosts(result.posts);
    writeCachedBlogPosts(posts);
    return posts;
  } catch (error) {
    const fallbackPosts = getCachedOrFallbackPublishedBlogPosts();

    if (fallbackPosts.length) {
      return fallbackPosts;
    }

    throw error;
  }
}

export async function fetchPublishedBlogPost(slug: string) {
  try {
    const response = await fetchBlogApi(`${BLOG_POSTS_API_URL}/${encodeURIComponent(slug)}`);
    const result = (await response.json().catch(() => null)) as BlogPostsResponse | null;

    if (!response.ok || !result?.post) {
      throw new Error(result?.error || 'Unable to load blog post.');
    }

    return result.post;
  } catch (error) {
    const fallbackPost = getCachedOrFallbackPublishedBlogPost(slug);

    if (fallbackPost) {
      return fallbackPost;
    }

    throw error;
  }
}

export async function fetchBlogComments(slug: string) {
  const response = await fetchBlogApi(`${BLOG_COMMENTS_API_BASE_URL}/${encodeURIComponent(slug)}/comments`);
  const result = (await response.json().catch(() => null)) as BlogPostsResponse | null;

  if (!response.ok || !Array.isArray(result?.comments)) {
    throw new Error(result?.error || 'Unable to load comments.');
  }

  return result.comments;
}

export async function postBlogComment(slug: string, payload: BlogCommentPayload) {
  const response = await fetchBlogApi(`${BLOG_COMMENTS_API_BASE_URL}/${encodeURIComponent(slug)}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const result = (await response.json().catch(() => null)) as BlogPostsResponse | null;

  if (!response.ok || !result?.comment) {
    throw new Error(result?.error || 'Unable to post comment.');
  }

  return result.comment;
}
