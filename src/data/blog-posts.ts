export type BlogPostStatus = 'published' | 'draft';

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  authorName: string;
  imageUrl: string;
  imagePublicId?: string;
  seoTitle: string;
  seoDescription: string;
  status: BlogPostStatus;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

