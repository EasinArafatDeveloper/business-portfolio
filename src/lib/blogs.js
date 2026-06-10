import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";

const BLOG_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function cleanText(value = "") {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeAccentColor(value) {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value) ? value : "#3b82f6";
}

export function slugifyBlogText(value = "") {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatBlogDate(value) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return BLOG_DATE_FORMATTER.format(new Date());
  }

  return BLOG_DATE_FORMATTER.format(date);
}

export function estimateReadTime(content = "") {
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

export function normalizeBlogPayload(input = {}, existing = {}) {
  const title = cleanText(input.title || existing.title);
  const category = cleanText(input.category || existing.category);
  const content = cleanText(input.content || existing.content).replace(/\r\n/g, "\n");
  const providedDate = cleanText(input.date || existing.date);
  const slug = slugifyBlogText(cleanText(input.slug) || title || existing.slug || "");
  const tag = slugifyBlogText(cleanText(input.tag) || category || existing.tag || "");

  return {
    title,
    slug,
    category,
    tag,
    excerpt: cleanText(input.excerpt || existing.excerpt),
    thumbnail: cleanText(input.thumbnail || existing.thumbnail),
    author: cleanText(input.author || existing.author) || "Easin Arafat",
    readTime: cleanText(input.readTime || existing.readTime) || estimateReadTime(content),
    date: formatBlogDate(providedDate || new Date()),
    featured: Boolean(input.featured),
    accentColor: normalizeAccentColor(
      cleanText(input.accentColor || existing.accentColor) || "#3b82f6"
    ),
    content,
    status: input.status === "draft" ? "draft" : "published",
  };
}

function serializeBlog(blog) {
  if (!blog) return null;

  return {
    ...blog,
    _id: blog._id?.toString?.() || blog._id,
    createdAt: blog.createdAt ? new Date(blog.createdAt).toISOString() : null,
    updatedAt: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : null,
  };
}

export async function getBlogs({ status = "published", featured, slug, localOnly = false } = {}) {
  await dbConnect();

  const query = {};

  if (status && status !== "all") {
    query.status = status;
  }

  if (typeof featured === "boolean") {
    query.featured = featured;
  }

  if (slug) {
    query.slug = slug;
  }

  const blogs = await Blog.find(query).sort({ createdAt: -1 }).lean();
  const localBlogs = blogs.map(serializeBlog);

  if (localOnly) {
    return localBlogs;
  }

  // If a slug is provided, we check if it matches the Dev.to pattern.
  // If it's a devto article, return it in an array.
  if (slug) {
    if (localBlogs.length > 0) {
      return localBlogs;
    }
    const devToMatch = slug.match(/-(\d+)$/);
    if (devToMatch) {
      const devToBlog = await getBlogBySlug(slug, { status });
      return devToBlog ? [devToBlog] : [];
    }
    return [];
  }

  // Fetch from Dev.to API
  let devToBlogs = [];
  try {
    const headers = {
      "User-Agent": "ScaleUpWeb/1.0 (https://www.scaleupweb.xyz; admin@scaleupweb.xyz)"
    };
    
    // Concurrently fetch tech and programming categories from Dev.to API
    const [techRes, progRes] = await Promise.all([
      fetch("https://dev.to/api/articles?tag=technology&per_page=20", {
        headers,
        next: { revalidate: 3600 }
      }).catch(() => null),
      fetch("https://dev.to/api/articles?tag=programming&per_page=20", {
        headers,
        next: { revalidate: 3600 }
      }).catch(() => null)
    ]);

    const articles = [];
    const seenIds = new Set();

    const processResponse = async (res) => {
      if (res && res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          for (const item of data) {
            if (!seenIds.has(item.id)) {
              seenIds.add(item.id);
              articles.push(item);
            }
          }
        }
      }
    };

    await Promise.all([processResponse(techRes), processResponse(progRes)]);

    // Sort combined articles by published date descending
    articles.sort((a, b) => new Date(b.published_timestamp) - new Date(a.published_timestamp));

    devToBlogs = articles.map(article => {
      const firstTag = article.tag_list[0] || "Technology";
      const category = firstTag.charAt(0).toUpperCase() + firstTag.slice(1);
      
      return {
        _id: `devto-${article.id}`,
        title: article.title,
        slug: `${article.slug}-${article.id}`,
        category: category,
        tag: article.tag_list[0] || "technology",
        excerpt: article.description,
        thumbnail: article.cover_image || article.social_image || "https://images.unsplash.com/photo-1518770660439-4636190af475",
        author: article.user?.name || "Dev.to Author",
        readTime: `${article.reading_time_minutes} min read`,
        date: formatBlogDate(article.published_timestamp),
        featured: false,
        accentColor: ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"][article.id % 5],
        content: "",
        status: "published"
      };
    });
  } catch (error) {
    console.error("Failed to fetch Dev.to articles:", error);
  }

  // Filter combined if featured filter is active
  let combined = [...localBlogs, ...devToBlogs];
  if (typeof featured === "boolean") {
    combined = combined.filter(b => b.featured === featured);
  }

  return combined;
}

export async function getBlogById(id) {
  await dbConnect();
  const blog = await Blog.findById(id).lean();
  return serializeBlog(blog);
}

export async function getBlogBySlug(slug, { status = "published" } = {}) {
  await dbConnect();

  const query = { slug };

  if (status && status !== "all") {
    query.status = status;
  }

  const blog = await Blog.findOne(query).lean();
  if (blog) return serializeBlog(blog);

  // Fallback to fetch from Dev.to if slug contains an ID at the end
  const devToMatch = slug.match(/-(\d+)$/);
  if (devToMatch) {
    try {
      const id = devToMatch[1];
      const headers = {
        "User-Agent": "ScaleUpWeb/1.0 (https://www.scaleupweb.xyz; admin@scaleupweb.xyz)"
      };
      const res = await fetch(`https://dev.to/api/articles/${id}`, {
        headers,
        next: { revalidate: 3600 }
      });
      if (res.ok) {
        const article = await res.json();
        const firstTag = article.tag_list[0] || "Technology";
        const category = firstTag.charAt(0).toUpperCase() + firstTag.slice(1);
        return {
          _id: `devto-${article.id}`,
          title: article.title,
          slug: slug,
          category: category,
          tag: article.tag_list[0] || "technology",
          excerpt: article.description,
          thumbnail: article.cover_image || article.social_image || "https://images.unsplash.com/photo-1518770660439-4636190af475",
          author: article.user?.name || "Dev.to Author",
          readTime: `${article.reading_time_minutes} min read`,
          date: formatBlogDate(article.published_timestamp),
          featured: false,
          accentColor: ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"][article.id % 5],
          content: article.body_html || "",
          status: "published"
        };
      }
    } catch (e) {
      console.error("Error fetching single Dev.to article:", e);
    }
  }

  return null;
}

