import {
  Bold,
  Eye,
  FileText,
  Heading2,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  LayoutDashboard,
  LoaderCircle,
  LockKeyhole,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  PencilLine,
  Plus,
  Save,
  ShieldCheck,
  TextQuote,
  Trash2,
  UploadCloud,
} from 'lucide-react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { Link } from 'react-router-dom';
import {
  ADMIN_BLOG_IMAGE_UPLOAD_API_URL,
  ADMIN_BLOG_POSTS_API_URL,
} from '../../config/api';
import { type BlogPost, type BlogPostStatus } from '../../data/blog-posts';
import Wrapper from '../../layouts/Wrapper';

type BlogForm = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tagsText: string;
  authorName: string;
  imageUrl: string;
  imagePublicId: string;
  seoTitle: string;
  seoDescription: string;
  status: BlogPostStatus;
};

type BlogAdminResponse = {
  ok?: boolean;
  error?: string;
  posts?: BlogPost[];
  post?: BlogPost;
  image?: {
    url: string;
    publicId: string;
  };
};

const STORAGE_KEY = 'aspl-blog-admin-token';
const SIDEBAR_STORAGE_KEY = 'aspl-blog-cms-sidebar-hidden';

const initialForm: BlogForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'Technology',
  tagsText: '',
  authorName: '',
  imageUrl: '',
  imagePublicId: '',
  seoTitle: '',
  seoDescription: '',
  status: 'published',
};

const adminSearchParams = new URLSearchParams(window.location.search);
const initialAdminView = adminSearchParams.get('view');
const initialEditWindowPostId = adminSearchParams.get('edit');

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

function textToTags(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatAdminDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Not scheduled';
  }

  return date.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function toFormState(post?: BlogPost): BlogForm {
  if (!post) {
    return initialForm;
  }

  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    tagsText: post.tags.join(', '),
    authorName: post.authorName,
    imageUrl: post.imageUrl,
    imagePublicId: post.imagePublicId || '',
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    status: post.status,
  };
}

export default function BlogAdmin() {
  const contentTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const inlineImageInputRef = useRef<HTMLInputElement | null>(null);
  const [token, setToken] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'dashboard' | 'posts' | 'add-post'>(
    initialEditWindowPostId
      ? 'posts'
      : initialAdminView === 'posts' || initialAdminView === 'add-post'
        ? initialAdminView
        : 'dashboard'
  );
  const [formState, setFormState] = useState<BlogForm>(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');
  const [postSearch, setPostSearch] = useState('');
  const [postStatusFilter, setPostStatusFilter] = useState<'all' | BlogPostStatus>('all');
  const [postDateFilter, setPostDateFilter] = useState('all');
  const [bulkAction, setBulkAction] = useState('');
  const [selectedBulkPostIds, setSelectedBulkPostIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editWindowPostId, setEditWindowPostId] = useState(initialEditWindowPostId);

  useEffect(() => {
    const storedToken = window.localStorage.getItem(STORAGE_KEY) || '';
    if (storedToken) {
      setToken(storedToken);
      setTokenInput(storedToken);
    }
  }, []);

  useEffect(() => {
    const storedSidebarState = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);
    setIsSidebarHidden(storedSidebarState === 'true');
  }, []);

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(isSidebarHidden));
  }, [isSidebarHidden]);

  useEffect(() => {
    if (token) {
      void loadPosts(token);
    }
  }, [token]);

  useEffect(() => {
    if (editWindowPostId) {
      return;
    }

    const params = new URLSearchParams(window.location.search);

    if (activeView === 'dashboard') {
      params.delete('view');
    } else {
      params.set('view', activeView);
    }

    const nextSearch = params.toString();
    const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}${window.location.hash}`;

    window.history.replaceState(null, '', nextUrl);
  }, [activeView, editWindowPostId]);

  useEffect(() => {
    if (!editWindowPostId || !posts.length) {
      return;
    }

    const post = posts.find((item) => item.id === editWindowPostId);
    if (post) {
      setSelectedPostId(post.id);
      setFormState(toFormState(post));
      setIsPostEditorOpen(true);
      setActiveView('posts');
    }
  }, [editWindowPostId, posts]);

  const selectedPost = useMemo(
    () => posts.find((post) => post.id === selectedPostId),
    [posts, selectedPostId]
  );
  const publishedCount = posts.filter((post) => post.status === 'published').length;
  const draftCount = posts.filter((post) => post.status === 'draft').length;
  const filteredPosts = useMemo(() => {
    const query = postSearch.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesStatus = postStatusFilter === 'all' || post.status === postStatusFilter;
      const postYear = new Date(post.updatedAt || post.publishedAt || post.createdAt).getFullYear();
      const matchesDate = postDateFilter === 'all' || String(postYear) === postDateFilter;
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.slug.toLowerCase().includes(query) ||
        post.authorName.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query);

      return matchesStatus && matchesDate && matchesSearch;
    });
  }, [posts, postDateFilter, postSearch, postStatusFilter]);
  const availablePostYears = useMemo(() => {
    return Array.from(
      new Set(
        posts
          .map((post) => new Date(post.updatedAt || post.publishedAt || post.createdAt).getFullYear())
          .filter((year) => !Number.isNaN(year))
          .map(String)
      )
    ).sort((first, second) => Number(second) - Number(first));
  }, [posts]);
  const postsPerPage = 20;
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedBulkPostIds([]);
  }, [postDateFilter, postSearch, postStatusFilter]);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const setStatus = (type: 'success' | 'error', message: string) => {
    setStatusType(type);
    setStatusMessage(message);
  };

  const getAdminHeaders = (withJson = false) => {
    const headers: Record<string, string> = {
      'X-Admin-Token': token,
    };

    if (withJson) {
      headers['Content-Type'] = 'application/json';
    }

    return headers;
  };

  const loadPosts = async (adminToken: string) => {
    setIsLoading(true);
    setStatusMessage('');

    try {
      const response = await fetch(ADMIN_BLOG_POSTS_API_URL, {
        headers: {
          'X-Admin-Token': adminToken,
        },
      });
      const result = (await response.json().catch(() => null)) as BlogAdminResponse | null;

      if (!response.ok || !Array.isArray(result?.posts)) {
        throw new Error(result?.error || 'Unable to load blog CMS data.');
      }

      setPosts(result.posts);
      const nextPost = result.posts.find((post) => post.id === selectedPostId) || result.posts[0];
      setSelectedPostId(nextPost?.id || null);
      setFormState(toFormState(nextPost));
    } catch (error) {
      setStatus('error', error instanceof Error ? error.message : 'Unable to load blog CMS data.');
      setToken('');
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!tokenInput.trim()) {
      setStatus('error', 'Enter the admin password to open the blog CMS.');
      return;
    }

    const nextToken = tokenInput.trim();
    window.localStorage.setItem(STORAGE_KEY, nextToken);
    setToken(nextToken);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    const nextValue =
      event.currentTarget instanceof HTMLInputElement &&
      event.currentTarget.type === 'checkbox'
        ? event.currentTarget.checked
        : value;

    setFormState((current) => {
      const nextState = {
        ...current,
        [name]: nextValue,
      } as BlogForm;

      if (name === 'title' && !current.slug) {
        nextState.slug = slugify(value);
      }

      return nextState;
    });
  };

  const insertContentMarkup = (
    prefix: string,
    suffix = prefix,
    placeholder = 'text'
  ) => {
    const textarea = contentTextareaRef.current;
    const content = formState.content;
    const selectionStart = textarea?.selectionStart ?? content.length;
    const selectionEnd = textarea?.selectionEnd ?? content.length;
    const selectedText = content.slice(selectionStart, selectionEnd) || placeholder;
    const nextText = `${prefix}${selectedText}${suffix}`;
    const nextContent = `${content.slice(0, selectionStart)}${nextText}${content.slice(selectionEnd)}`;

    setFormState((current) => ({
      ...current,
      content: nextContent,
    }));

    window.requestAnimationFrame(() => {
      textarea?.focus();
      textarea?.setSelectionRange(
        selectionStart + prefix.length,
        selectionStart + prefix.length + selectedText.length
      );
    });
  };

  const insertListMarkup = () => {
    const textarea = contentTextareaRef.current;
    const content = formState.content;
    const selectionStart = textarea?.selectionStart ?? content.length;
    const selectionEnd = textarea?.selectionEnd ?? content.length;
    const selectedText = content.slice(selectionStart, selectionEnd);
    const nextText = selectedText
      ? selectedText
          .split(/\r?\n/)
          .map((line) => `- ${line.replace(/^[-*]\s+/, '')}`)
          .join('\n')
      : '- First point\n- Second point';
    const nextContent = `${content.slice(0, selectionStart)}${nextText}${content.slice(selectionEnd)}`;

    setFormState((current) => ({
      ...current,
      content: nextContent,
    }));

    window.requestAnimationFrame(() => {
      textarea?.focus();
      textarea?.setSelectionRange(selectionStart, selectionStart + nextText.length);
    });
  };

  const uploadImageFile = async (imageFile: File) => {
    if (!imageFile) {
      return null;
    }

    const uploadBody = new FormData();
    uploadBody.set('image', imageFile);

    const response = await fetch(ADMIN_BLOG_IMAGE_UPLOAD_API_URL, {
      method: 'POST',
      headers: getAdminHeaders(),
      body: uploadBody,
    });
    const result = (await response.json().catch(() => null)) as BlogAdminResponse | null;

    if (!response.ok || !result?.image?.url) {
      throw new Error(result?.error || 'Unable to upload this image.');
    }

    return result.image;
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputElement = event.currentTarget;
    const imageFile = inputElement.files?.[0];

    if (!imageFile) return;

    setIsUploading(true);
    setStatusMessage('');

    try {
      const image = await uploadImageFile(imageFile);
      if (!image) return;

      setFormState((current) => ({
        ...current,
        imageUrl: image.url,
        imagePublicId: image.publicId,
      }));
      setStatus('success', 'Featured image uploaded to Cloudinary.');
    } catch (error) {
      setStatus('error', error instanceof Error ? error.message : 'Unable to upload this image.');
    } finally {
      setIsUploading(false);
      inputElement.value = '';
    }
  };

  const handleInlineImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputElement = event.currentTarget;
    const imageFile = inputElement.files?.[0];

    if (!imageFile) return;

    setIsUploading(true);
    setStatusMessage('');

    try {
      const image = await uploadImageFile(imageFile);
      if (!image) return;

      insertContentMarkup('\n\n![Image](', ')\n\n', image.url);
      setStatus('success', 'Inline image uploaded and inserted into content.');
    } catch (error) {
      setStatus('error', error instanceof Error ? error.message : 'Unable to upload inline image.');
    } finally {
      setIsUploading(false);
      inputElement.value = '';
    }
  };

  const resetFormForCreate = () => {
    setEditWindowPostId(null);
    setSelectedPostId(null);
    setFormState(initialForm);
    setIsPostEditorOpen(false);
    setStatusMessage('');
    setActiveView('add-post');
  };

  const selectPost = (post: BlogPost) => {
    setSelectedPostId(post.id);
    setFormState(toFormState(post));
    setIsPostEditorOpen(true);
    setStatusMessage('');
    setActiveView('posts');
  };

  const openPostEditorWindow = (post: BlogPost) => {
    window.open(`/admin/blog?edit=${encodeURIComponent(post.id)}`, '_blank', 'noopener,noreferrer');
  };

  const switchAdminView = (view: 'dashboard' | 'posts') => {
    setEditWindowPostId(null);
    setIsPostEditorOpen(false);
    setActiveView(view);
  };

  const toggleBulkPostSelection = (postId: string) => {
    setSelectedBulkPostIds((current) =>
      current.includes(postId) ? current.filter((id) => id !== postId) : [...current, postId]
    );
  };

  const toggleCurrentPageSelection = () => {
    const pageIds = paginatedPosts.map((post) => post.id);
    const allSelected = pageIds.length > 0 && pageIds.every((id) => selectedBulkPostIds.includes(id));

    setSelectedBulkPostIds((current) =>
      allSelected
        ? current.filter((id) => !pageIds.includes(id))
        : Array.from(new Set([...current, ...pageIds]))
    );
  };

  const handleBulkApply = async () => {
    if (!bulkAction) {
      setStatus('error', 'Choose a bulk action first.');
      return;
    }

    const selectedPosts = posts.filter((post) => selectedBulkPostIds.includes(post.id));

    if (!selectedPosts.length) {
      setStatus('error', 'Select at least one post.');
      return;
    }

    if (bulkAction === 'edit') {
      if (selectedPosts.length > 1) {
        setStatus('error', 'Select one post at a time for editing.');
        return;
      }

      openPostEditorWindow(selectedPosts[0]);
      return;
    }

    if (bulkAction === 'delete') {
      if (!window.confirm(`Delete ${selectedPosts.length} selected blog post${selectedPosts.length > 1 ? 's' : ''}?`)) {
        return;
      }

      setIsSaving(true);
      setStatusMessage('');

      try {
        await Promise.all(
          selectedPosts.map(async (post) => {
            const response = await fetch(`${ADMIN_BLOG_POSTS_API_URL}/${post.id}`, {
              method: 'DELETE',
              headers: getAdminHeaders(),
            });
            const result = (await response.json().catch(() => null)) as BlogAdminResponse | null;

            if (!response.ok) {
              throw new Error(result?.error || `Unable to delete "${post.title}".`);
            }
          })
        );

        setPosts((current) => current.filter((post) => !selectedBulkPostIds.includes(post.id)));
        setSelectedBulkPostIds([]);
        setBulkAction('');
        setStatus('success', 'Selected blog posts deleted.');
      } catch (error) {
        setStatus('error', error instanceof Error ? error.message : 'Unable to delete selected posts.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.imageUrl.trim()) {
      setStatus('error', 'Please upload a featured image before publishing this post.');
      return;
    }

    const payload = {
      title: formState.title.trim(),
      slug: slugify(formState.slug || formState.title),
      excerpt: formState.excerpt.trim(),
      content: formState.content.trim(),
      category: formState.category.trim(),
      tags: textToTags(formState.tagsText),
      authorName: formState.authorName.trim(),
      imageUrl: formState.imageUrl.trim(),
      imagePublicId: formState.imagePublicId.trim(),
      seoTitle: formState.seoTitle.trim(),
      seoDescription: formState.seoDescription.trim(),
      status: formState.status,
      featured: false,
    };

    setIsSaving(true);
    setStatusMessage('');

    try {
      const isEditing = Boolean(selectedPostId);
      const endpoint = isEditing
        ? `${ADMIN_BLOG_POSTS_API_URL}/${selectedPostId}`
        : ADMIN_BLOG_POSTS_API_URL;
      const response = await fetch(endpoint, {
        method: isEditing ? 'PATCH' : 'POST',
        headers: getAdminHeaders(true),
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as BlogAdminResponse | null;

      if (!response.ok || !result?.post) {
        throw new Error(result?.error || 'Unable to save this blog post.');
      }

      const savedPost = result.post;
      setPosts((current) => [savedPost, ...current.filter((post) => post.id !== savedPost.id)]);
      setSelectedPostId(savedPost.id);
      setFormState(toFormState(savedPost));
      setActiveView('posts');
      setStatus('success', isEditing ? 'Blog post updated.' : 'Blog post created.');
    } catch (error) {
      setStatus('error', error instanceof Error ? error.message : 'Unable to save this blog post.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (postToDelete = selectedPost) => {
    if (!postToDelete || !window.confirm(`Delete "${postToDelete.title}" from the blog CMS?`)) {
      return;
    }

    setIsSaving(true);
    setStatusMessage('');

    try {
      const response = await fetch(`${ADMIN_BLOG_POSTS_API_URL}/${postToDelete.id}`, {
        method: 'DELETE',
        headers: getAdminHeaders(),
      });
      const result = (await response.json().catch(() => null)) as BlogAdminResponse | null;

      if (!response.ok) {
        throw new Error(result?.error || 'Unable to delete this blog post.');
      }

      const remainingPosts = posts.filter((post) => post.id !== postToDelete.id);
      setPosts(remainingPosts);
      if (postToDelete.id === selectedPostId && remainingPosts.length) {
        selectPost(remainingPosts[0]);
      } else if (postToDelete.id === selectedPostId) {
        resetFormForCreate();
      }
      if (postToDelete.id === selectedPostId) {
        setIsPostEditorOpen(false);
      }
      setStatus('success', 'Blog post deleted.');
    } catch (error) {
      setStatus('error', error instanceof Error ? error.message : 'Unable to delete this post.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    setTokenInput('');
    setPosts([]);
    setSelectedPostId(null);
    setFormState(initialForm);
    setIsPostEditorOpen(false);
    setActiveView('dashboard');
    setStatusMessage('');
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const openDraftPreview = () => {
    const previewKey = `aspl-blog-preview-${Date.now()}`;
    const previewPost = {
      id: selectedPostId || 'draft-preview',
      slug: formState.slug || slugify(formState.title) || 'draft-preview',
      title: formState.title || 'Untitled draft',
      excerpt: formState.excerpt,
      content: formState.content,
      category: formState.category,
      tags: textToTags(formState.tagsText),
      authorName: formState.authorName || 'Draft author',
      imageUrl: formState.imageUrl,
      imagePublicId: formState.imagePublicId,
      seoTitle: formState.seoTitle,
      seoDescription: formState.seoDescription,
      status: formState.status,
      featured: false,
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(previewKey, JSON.stringify(previewPost));
    window.open(`/blog-preview/${previewKey}`, '_blank', 'noopener,noreferrer');
  };

  const renderPostForm = (isEditing: boolean) => (
    <form onSubmit={handleSave} className="tv-blog-cms-form">
      <div className="tv-blog-cms-panel tv-blog-cms-panel--content">
        <div className="tv-blog-cms-panel__head">
          <h4>Post content</h4>
          <span>Write, format, preview, and insert media.</span>
        </div>
        <div className="tv-blog-cms-grid">
          <label>
            Title
            <input name="title" value={formState.title} onChange={handleInputChange} required />
          </label>
          <label>
            Slug
            <input name="slug" value={formState.slug} onChange={handleInputChange} required />
          </label>
        </div>
        <label>
          Excerpt
          <textarea name="excerpt" value={formState.excerpt} onChange={handleInputChange} rows={3} required />
        </label>
        <label>
          Content
          <div className="tv-blog-editor-shell">
            <div className="tv-blog-editor-toolbar" aria-label="Blog content formatting">
              <button type="button" title="Bold" onClick={() => insertContentMarkup('**', '**', 'bold text')}>
                <Bold size={16} />
              </button>
              <button type="button" title="Italic" onClick={() => insertContentMarkup('*', '*', 'italic text')}>
                <Italic size={16} />
              </button>
              <button type="button" title="Heading" onClick={() => insertContentMarkup('## ', '', 'Section heading')}>
                <Heading2 size={16} />
              </button>
              <button type="button" title="List" onClick={insertListMarkup}>
                <List size={16} />
              </button>
              <button type="button" title="Quote" onClick={() => insertContentMarkup('> ', '', 'Important quote')}>
                <TextQuote size={16} />
              </button>
              <button type="button" title="Link" onClick={() => insertContentMarkup('[', '](https://example.com)', 'link text')}>
                <LinkIcon size={16} />
              </button>
              <button type="button" title="Inline image" onClick={() => inlineImageInputRef.current?.click()} disabled={isUploading}>
                <ImageIcon size={16} />
              </button>
              <input
                ref={inlineImageInputRef}
                className="d-none"
                type="file"
                accept="image/*"
                onChange={handleInlineImageUpload}
              />
            </div>
            <div className="tv-blog-editor-grid tv-blog-editor-grid--write-only">
              <textarea
                ref={contentTextareaRef}
                name="content"
                value={formState.content}
                onChange={handleInputChange}
                rows={16}
                placeholder="Write with formatting: **bold**, *italic*, ## heading, - list item, > quote, ![alt](image-url)"
                required
              />
            </div>
          </div>
          <span className="tv-blog-editor-help">
            Use toolbar controls for rich content. Inline image uploads go to Cloudinary and are inserted where your cursor is.
          </span>
        </label>
      </div>

      <div className="tv-blog-cms-panel">
        <div className="tv-blog-cms-panel__head">
          <h4>Image and publishing</h4>
          <span>Featured image, taxonomy, visibility, and author.</span>
        </div>
        <div className="tv-blog-featured-upload">
          {formState.imageUrl ? (
            <img src={formState.imageUrl} alt="Blog preview" />
          ) : (
            <div className="tv-blog-featured-upload__placeholder">
              <ImageIcon size={22} />
            </div>
          )}
          <label>
            Featured image
            <span className="tv-blog-upload-row">
              <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
              <span>
                <UploadCloud size={16} />
                {isUploading ? 'Uploading...' : formState.imageUrl ? 'Replace image' : 'Upload image'}
              </span>
            </span>
          </label>
        </div>
        <div className="tv-blog-cms-grid">
          <label>
            Author name
            <input name="authorName" value={formState.authorName} onChange={handleInputChange} required />
          </label>
          <label>
            Category
            <input name="category" value={formState.category} onChange={handleInputChange} required />
          </label>
          <label>
            Tags
            <input name="tagsText" value={formState.tagsText} onChange={handleInputChange} placeholder="Dynamics 365, ERP, Cloud" />
          </label>
          <label>
            Status
            <select name="status" value={formState.status} onChange={handleInputChange}>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </label>
        </div>
      </div>

      <div className="tv-blog-cms-panel">
        <div className="tv-blog-cms-panel__head">
          <h4>SEO</h4>
          <span>Search result title and description.</span>
        </div>
        <label>
          SEO title
          <input name="seoTitle" value={formState.seoTitle} onChange={handleInputChange} />
        </label>
        <label>
          SEO description
          <textarea name="seoDescription" value={formState.seoDescription} onChange={handleInputChange} rows={3} />
        </label>
      </div>

      <div className="tv-blog-cms-actions">
        <button type="submit" className="tv-btn-primary" disabled={isSaving || isUploading}>
          <span className="btn-wrap">
            <span className="btn-text1">{isSaving ? 'Saving...' : isEditing ? 'Update Post' : 'Publish Post'}</span>
            <span className="btn-text2">{isSaving ? 'Saving...' : isEditing ? 'Update Post' : 'Publish Post'}</span>
          </span>
        </button>
        <button type="button" className="tv-careers-admin-ghost" onClick={resetFormForCreate}>
          <PencilLine size={16} />
          Clear form
        </button>
        <button type="button" className="tv-blog-cms-secondary-action" onClick={openDraftPreview}>
          <Eye size={16} />
          Live Preview
        </button>
      </div>
    </form>
  );

  const renderDashboard = () => (
    <div className="tv-blog-cms-dashboard">
      <div className="tv-blog-cms-metrics">
        <div className="tv-blog-cms-metric">
          <span>Total posts</span>
          <strong>{posts.length}</strong>
        </div>
        <div className="tv-blog-cms-metric">
          <span>Published</span>
          <strong>{publishedCount}</strong>
        </div>
        <div className="tv-blog-cms-metric">
          <span>Drafts</span>
          <strong>{draftCount}</strong>
        </div>
      </div>
      <div className="tv-blog-cms-panel">
        <div className="tv-blog-cms-panel__head">
          <h4>Quick actions</h4>
          <span>Create, review, and open the public blog in a new tab.</span>
        </div>
        <div className="tv-blog-cms-quick-actions">
            <button type="button" className="tv-blog-cms-primary-action" onClick={resetFormForCreate}>
              <Plus size={16} />
              Add New Post
            </button>
            <Link to="/blog" className="tv-blog-cms-secondary-action" target="_blank" rel="noreferrer">
              <Eye size={16} />
              View public blog
            </Link>
        </div>
      </div>
    </div>
  );

  const renderPosts = () => (
    <div className="tv-blog-wp-manager">
      <div className="tv-blog-wp-tabs">
        <button type="button" className={postStatusFilter === 'all' ? 'is-active' : ''} onClick={() => setPostStatusFilter('all')}>
          All <span>({posts.length})</span>
        </button>
        <button type="button" className={postStatusFilter === 'published' ? 'is-active' : ''} onClick={() => setPostStatusFilter('published')}>
          Published <span>({publishedCount})</span>
        </button>
        <button type="button" className={postStatusFilter === 'draft' ? 'is-active' : ''} onClick={() => setPostStatusFilter('draft')}>
          Draft <span>({draftCount})</span>
        </button>
      </div>

      <div className="tv-blog-wp-toolbar">
        <div className="tv-blog-wp-filters">
          <select aria-label="Bulk actions" value={bulkAction} onChange={(event) => setBulkAction(event.currentTarget.value)}>
            <option value="">Bulk actions</option>
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
          </select>
          <button type="button" className="tv-blog-wp-button" onClick={() => void handleBulkApply()} disabled={isSaving}>
            Apply
          </button>
          <select
            value={postStatusFilter}
            onChange={(event) => setPostStatusFilter(event.currentTarget.value as 'all' | BlogPostStatus)}
            aria-label="Filter by status"
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select
            value={postDateFilter}
            onChange={(event) => setPostDateFilter(event.currentTarget.value)}
            aria-label="Filter by date"
          >
            <option value="all">All dates</option>
            {availablePostYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <button type="button" className="tv-blog-wp-button" onClick={() => setPostStatusFilter('all')}>
            Filter
          </button>
        </div>
        <div className="tv-blog-wp-search">
          <input
            value={postSearch}
            onChange={(event) => setPostSearch(event.currentTarget.value)}
            placeholder="Search posts"
            aria-label="Search posts"
          />
          <button type="button" className="tv-blog-wp-button">
            Search Posts
          </button>
        </div>
      </div>

      <div className="tv-blog-wp-table-meta">
        <span>{filteredPosts.length} items</span>
        <div className="tv-blog-wp-pagination">
          <button type="button" onClick={() => setCurrentPage(1)} disabled={currentPage === 1} aria-label="First page">
            «
          </button>
          <button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1} aria-label="Previous page">
            ‹
          </button>
          <input value={currentPage} readOnly aria-label="Current page" />
          <span>of {totalPages}</span>
          <button type="button" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={currentPage === totalPages} aria-label="Next page">
            ›
          </button>
          <button type="button" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} aria-label="Last page">
            »
          </button>
        </div>
      </div>

      <div className="tv-blog-wp-table-wrap">
        <table className="tv-blog-wp-table">
          <thead>
            <tr>
              <th className="is-check">
                <input
                  type="checkbox"
                  aria-label="Select all posts"
                  checked={paginatedPosts.length > 0 && paginatedPosts.every((post) => selectedBulkPostIds.includes(post.id))}
                  onChange={toggleCurrentPageSelection}
                />
              </th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6}>
                  <div className="tv-careers-loading" role="status">
                    <LoaderCircle size={22} className="tv-spin" />
                    Loading blog posts...
                  </div>
                </td>
              </tr>
            ) : !filteredPosts.length ? (
              <tr>
                <td colSpan={6}>
                  <div className="tv-careers-admin-empty">
                    <span className="tv-careers-admin-empty__icon">
                      <FileText size={22} />
                    </span>
                    <h4>No posts found</h4>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedPosts.map((post) => (
                <tr key={post.id} className={selectedPostId === post.id ? 'is-selected' : ''}>
                  <td className="is-check">
                    <input
                      type="checkbox"
                      aria-label={`Select ${post.title}`}
                      checked={selectedBulkPostIds.includes(post.id)}
                      onChange={() => toggleBulkPostSelection(post.id)}
                    />
                  </td>
                  <td className="is-title">
                    <button type="button" onClick={() => openPostEditorWindow(post)}>
                      {post.title}
                    </button>
                    <span>{post.slug}</span>
                  </td>
                  <td>{post.authorName}</td>
                  <td>{post.category}</td>
                  <td>
                    <strong>{post.status === 'published' ? 'Published' : 'Draft'}</strong>
                    <span>{formatAdminDate(post.updatedAt || post.publishedAt || post.createdAt)}</span>
                  </td>
                  <td className="is-actions">
                    <button type="button" onClick={() => openPostEditorWindow(post)} title="Edit post">
                      <PencilLine size={15} />
                      Edit
                    </button>
                    <Link to={`/blog/${post.slug}`} target="_blank" rel="noreferrer" title="Preview post">
                      <Eye size={15} />
                      View
                    </Link>
                    <button type="button" className="is-danger" onClick={() => void handleDelete(post)} title="Delete post">
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedPost && isPostEditorOpen && editWindowPostId ? (
        <section className="tv-blog-cms-editor tv-blog-cms-editor--inline">
          <div className="tv-blog-cms-editor__header">
            <div>
              <span>Editing post</span>
              <h3>{selectedPost.title}</h3>
            </div>
            <div className="tv-blog-cms-editor__tools">
              <Link to={`/blog/${selectedPost.slug}`} target="_blank" rel="noreferrer" className="tv-blog-cms-secondary-action">
                <Eye size={16} />
                Preview
              </Link>
              <button type="button" className="tv-blog-cms-danger-action" onClick={() => void handleDelete()} disabled={isSaving}>
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
          {renderPostForm(true)}
        </section>
      ) : null}
    </div>
  );

  const currentPanelTitle =
    editWindowPostId ? 'Edit Post' : activeView === 'dashboard' ? 'Blog Dashboard' : activeView === 'posts' ? 'Manage Posts' : 'Add Blog Post';
  const content = editWindowPostId && selectedPost ? (
    <section className="tv-blog-cms-editor">
      <div className="tv-blog-cms-editor__header">
        <div>
          <span>Editing post</span>
          <h3>{selectedPost.title}</h3>
        </div>
        <div className="tv-blog-cms-editor__tools">
          <Link to={`/blog/${selectedPost.slug}`} target="_blank" rel="noreferrer" className="tv-blog-cms-secondary-action">
            <Eye size={16} />
            Preview
          </Link>
          <button type="button" className="tv-blog-cms-danger-action" onClick={() => void handleDelete()} disabled={isSaving}>
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
      {renderPostForm(true)}
    </section>
  ) : activeView === 'dashboard' ? renderDashboard() : activeView === 'posts' ? renderPosts() : (
    <section className="tv-blog-cms-editor">
      <div className="tv-blog-cms-editor__header">
        <div>
          <span>Create post</span>
          <h3>New blog post</h3>
        </div>
      </div>
      {renderPostForm(false)}
    </section>
  );

  return (
    <Wrapper>
      <main>
        <section className="tv-blog-cms-page">
          {!token ? (
            <div className="container">
              <div className="tv-blog-cms-auth">
                <div className="tv-blog-cms-auth__panel">
                  <span>
                    <ShieldCheck size={18} />
                    Secure blog admin
                  </span>
                  <h2>ASPL Blog Content Management</h2>
                  <p>
                    Manage ASPL insights from a focused editorial workspace. Draft,
                    optimize, upload media, and publish articles to the public blog
                    with consistent structure and SEO-ready details.
                  </p>
                  <ul className="tv-blog-cms-auth__list">
                    <li>Create professional posts with excerpts, categories, tags, and author details.</li>
                    <li>Upload featured or inline images directly to Cloudinary.</li>
                    <li>Maintain SEO titles and descriptions before publishing.</li>
                  </ul>
                  <form onSubmit={handleTokenSubmit} className="tv-blog-cms-auth__form">
                    <label htmlFor="admin-password">Admin password</label>
                    <div className="tv-blog-cms-auth__field">
                      <LockKeyhole size={18} />
                      <input id="admin-password" type="password" value={tokenInput} onChange={(event) => setTokenInput(event.currentTarget.value)} placeholder="Enter admin password" />
                    </div>
                    {statusMessage ? <p className={`tv-admin-status is-${statusType}`}>{statusMessage}</p> : null}
                    <button type="submit" className="tv-btn-primary">
                      <span className="btn-wrap">
                        <span className="btn-text1">Unlock CMS</span>
                        <span className="btn-text2">Unlock CMS</span>
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className={`tv-blog-cms-studio ${isSidebarHidden ? 'is-sidebar-hidden' : ''}`}>
              <aside className="tv-blog-cms-sidebar">
                <div className="tv-blog-cms-sidebar__brand">
                  <img src="/assets/img/logo/AtiSunyaLogo.png" alt="AtiSunya" />
                  <button
                    type="button"
                    className="tv-blog-cms-sidebar__toggle"
                    onClick={() => setIsSidebarHidden((current) => !current)}
                    aria-pressed={isSidebarHidden}
                    aria-label={isSidebarHidden ? 'Expand sidebar' : 'Collapse sidebar'}
                    title={isSidebarHidden ? 'Expand sidebar' : 'Collapse sidebar'}
                  >
                    {isSidebarHidden ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
                  </button>
                </div>
                <nav className="tv-blog-cms-sidebar__nav" aria-label="Blog CMS menu">
                  <button type="button" className={activeView === 'dashboard' && !editWindowPostId ? 'is-active' : ''} onClick={() => switchAdminView('dashboard')}>
                    <LayoutDashboard size={18} />
                    Dashboard
                  </button>
                  <button type="button" className={activeView === 'posts' && !editWindowPostId ? 'is-active' : ''} onClick={() => switchAdminView('posts')}>
                    <FileText size={18} />
                    Posts
                  </button>
                  <button type="button" className={activeView === 'add-post' ? 'is-active' : ''} onClick={resetFormForCreate}>
                    <Plus size={18} />
                    New Post
                  </button>
                </nav>
                <div className="tv-blog-cms-sidebar__footer">
                  <Link to="/blog" target="_blank" rel="noreferrer">
                    <Eye size={18} />
                    Open Blog
                  </Link>
                  <button type="button" onClick={handleLogout}>
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </aside>

              <section className="tv-blog-cms-main">
                <div className="tv-blog-cms-topbar">
                  <div>
                    <span>Admin Panel</span>
                    <h1>{currentPanelTitle}</h1>
                  </div>
                  <div className="tv-blog-cms-topbar__actions">
                    <Link to="/blog" target="_blank" rel="noreferrer" className="tv-blog-cms-secondary-action">
                      <Eye size={16} />
                      Public Blog
                    </Link>
                    <button type="button" className="tv-blog-cms-secondary-action" onClick={() => void loadPosts(token)}>
                      <Save size={16} />
                      Refresh
                    </button>
                    <button type="button" className="tv-blog-cms-primary-action" onClick={resetFormForCreate}>
                      <Plus size={16} />
                      New Post
                    </button>
                  </div>
                </div>

                {statusMessage ? <p className={`tv-admin-status is-${statusType}`}>{statusMessage}</p> : null}
                {content}
              </section>
            </div>
          )}
        </section>
      </main>
    </Wrapper>
  );
}
