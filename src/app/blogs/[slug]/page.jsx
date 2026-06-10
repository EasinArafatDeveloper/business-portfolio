import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, User, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { getBlogBySlug, getBlogs } from "@/lib/blogs";
import ReadingProgressBar from "@/app/component/ReadingProgressBar";

export const dynamic = "force-dynamic";

function renderListItemContent(line, accentColor) {
  const match = line.match(/^- \*\*(.+?)\*\*:? ?(.*)/);

  if (match) {
    return (
      <span>
        <strong className="text-white">{match[1]}:</strong>{" "}
        <span>{match[2]}</span>
      </span>
    );
  }

  return line.replace(/^- /, "");
}

function parseContent(content = "") {
  const lines = content.split("\n");
  const blocks = [];
  let unorderedList = [];
  let orderedList = [];

  const flushLists = () => {
    if (unorderedList.length > 0) {
      blocks.push({ type: "ul", items: unorderedList });
      unorderedList = [];
    }

    if (orderedList.length > 0) {
      blocks.push({ type: "ol", items: orderedList });
      orderedList = [];
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      flushLists();
      blocks.push({ type: "space" });
      return;
    }

    if (line.startsWith("## ")) {
      flushLists();
      blocks.push({ type: "h2", text: line.replace("## ", "") });
      return;
    }

    if (line.startsWith("### ")) {
      flushLists();
      blocks.push({ type: "h3", text: line.replace("### ", "") });
      return;
    }

    if (line.startsWith("- ")) {
      unorderedList.push(line);
      return;
    }

    if (/^\d+\.\s/.test(line)) {
      orderedList.push(line.replace(/^\d+\.\s/, ""));
      return;
    }

    flushLists();
    blocks.push({ type: "p", text: line });
  });

  flushLists();
  return blocks;
}

function getAuthorInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "AU";
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) return {};

  const url = `https://www.scaleupweb.xyz/blogs/${slug}`;

  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url,
      type: "article",
      publishedTime: new Date(blog.date).toISOString(),
      authors: [blog.author],
      images: [
        {
          url: blog.thumbnail,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.thumbnail],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const allPublishedBlogs = await getBlogs({ status: "published" });
  const related = allPublishedBlogs
    .filter((item) => item.tag === blog.tag && item.slug !== blog.slug)
    .slice(0, 2);
  const contentBlocks = parseContent(blog.content);
  const authorInitials = getAuthorInitials(blog.author);

  return (
    <div className="min-h-screen w-full bg-[#050709] text-white relative">
      {/* Dynamic Scroll Progress Bar */}
      <ReadingProgressBar accentColor={blog.accentColor} />

      {/* Floating Navigation Button */}
      <div className="mx-auto max-w-4xl px-6 pt-8">
        <Link
          href="/blogs"
          className="group inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-all duration-300 hover:border-white/10 hover:bg-white/10"
        >
          <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" /> Back to Articles
        </Link>
      </div>

      {/* Article Info Header */}
      <header className="mx-auto max-w-4xl px-6 pt-12 pb-8">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider border"
          style={{
            background: `${blog.accentColor}10`,
            color: blog.accentColor,
            borderColor: `${blog.accentColor}30`,
          }}
        >
          <Sparkles size={12} style={{ color: blog.accentColor }} /> {blog.category}
        </span>

        <h1 className="mt-6 text-3xl font-black leading-tight text-white md:text-5xl lg:text-6xl tracking-tight">
          {blog.title}
        </h1>

        {/* Dynamic Author & Metadata Row */}
        <div className="mt-8 flex items-center gap-4 border-t border-white/5 pt-8">
          <div 
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-md font-extrabold border"
            style={{
              background: `${blog.accentColor}15`,
              color: blog.accentColor,
              borderColor: `${blog.accentColor}30`,
            }}
          >
            {authorInitials}
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <span>{blog.author}</span>
              <span className="h-1 w-1 rounded-full bg-neutral-700" />
              <span className="text-neutral-500 font-normal">Author</span>
            </div>
            <div className="mt-1 flex items-center gap-4 text-xs text-neutral-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} /> {blog.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} /> {blog.readTime}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Contained Cover Image with Glowing Shadow Overlay */}
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-[24px] border border-white/10 bg-[#0f1015] shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            priority
            className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050709]/80 via-transparent to-transparent opacity-80" />
        </div>
      </div>

      {/* Article Body Content */}
      <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
        {/* Quote-style Excerpt Block */}
        <div
          className="relative mb-12 rounded-2xl border-l-4 py-6 pl-8 pr-6 overflow-hidden"
          style={{
            borderColor: blog.accentColor,
            background: `linear-gradient(90deg, ${blog.accentColor}12 0%, transparent 100%)`,
          }}
        >
          <div className="absolute top-2 right-4 text-white/5 font-serif text-8xl pointer-events-none select-none leading-none">“</div>
          <p className="relative z-10 text-lg md:text-xl italic leading-relaxed text-neutral-200 font-medium">
            {blog.excerpt}
          </p>
        </div>

        {/* Content Blocks */}
        <div className="max-w-none space-y-6 blog-content-wrapper">
          {blog.content.trim().startsWith("<") ? (
            <div 
              className="rich-text-content"
              dangerouslySetInnerHTML={{ __html: blog.content }} 
            />
          ) : (
            contentBlocks.map((block, index) => {
              if (block.type === "h2") {
                return (
                  <h2 key={index} className="mb-4 mt-12 text-3xl font-extrabold text-white tracking-tight border-b border-white/5 pb-2">
                    {block.text}
                  </h2>
                );
              }

              if (block.type === "h3") {
                return (
                  <h3
                    key={index}
                    className="mb-3 mt-8 text-2xl font-bold tracking-tight"
                    style={{ color: blog.accentColor }}
                  >
                    {block.text}
                  </h3>
                );
              }

              if (block.type === "ul") {
                return (
                  <ul key={index} className="space-y-4 my-6">
                    {block.items.map((item, itemIndex) => (
                      <li
                        key={`${index}-${itemIndex}`}
                        className="flex gap-3 text-lg leading-relaxed text-neutral-300"
                      >
                        <span
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: blog.accentColor }}
                        />
                        <span>{renderListItemContent(item, blog.accentColor)}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              if (block.type === "ol") {
                return (
                  <ol key={index} className="space-y-4 my-6 pl-6 text-lg leading-relaxed text-neutral-300 list-decimal">
                    {block.items.map((item, itemIndex) => (
                      <li key={`${index}-${itemIndex}`} className="pl-2">
                        {item}
                      </li>
                    ))}
                  </ol>
                );
              }

              if (block.type === "space") {
                return <div key={index} className="h-4" />;
              }

              return (
                <p key={index} className="text-lg leading-relaxed text-neutral-300 mb-6">
                  {block.text}
                </p>
              );
            })
          )}
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .rich-text-content {
            color: #d1d5db;
            line-height: 1.8;
            font-size: 1.125rem;
          }
          .rich-text-content h1, .rich-text-content h2, .rich-text-content h3, .rich-text-content h4 {
            color: white;
            font-weight: 800;
            margin-top: 3rem;
            margin-bottom: 1.25rem;
            line-height: 1.25;
            letter-spacing: -0.025em;
          }
          .rich-text-content h1 { font-size: 2.5rem; }
          .rich-text-content h2 { 
            font-size: 1.875rem; 
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding-bottom: 0.5rem;
          }
          .rich-text-content h3 { font-size: 1.5rem; color: ${blog.accentColor}; }
          
          .rich-text-content p {
            margin-bottom: 1.75rem;
          }
          
          .rich-text-content ul {
            list-style: none;
            padding-left: 0;
            margin-bottom: 1.75rem;
          }
          .rich-text-content ul li {
            position: relative;
            padding-left: 1.75rem;
            margin-bottom: 0.75rem;
          }
          .rich-text-content ul li::before {
            content: "•";
            color: ${blog.accentColor};
            font-weight: bold;
            position: absolute;
            left: 0.5rem;
            top: 0;
            font-size: 1.25rem;
            line-height: 1.75rem;
          }

          .rich-text-content ol {
            margin-bottom: 1.75rem;
            padding-left: 1.5rem;
            list-style-type: decimal;
          }
          .rich-text-content ol li {
            margin-bottom: 0.75rem;
            padding-left: 0.5rem;
          }

          .rich-text-content li {
            margin-bottom: 0.5rem;
          }

          .rich-text-content b, .rich-text-content strong {
            color: white;
            font-weight: 700;
          }

          .rich-text-content img {
            max-width: 100%;
            height: auto;
            border-radius: 1.5rem;
            margin: 3rem 0;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          }

          .rich-text-content a {
            color: ${blog.accentColor};
            text-decoration: none;
            border-bottom: 2px solid ${blog.accentColor}40;
            font-weight: 600;
            transition: all 0.3s ease;
          }
          .rich-text-content a:hover {
            color: white;
            border-bottom-color: white;
            background-color: ${blog.accentColor}15;
          }

          .rich-text-content blockquote {
            border-left: 4px solid ${blog.accentColor};
            background: linear-gradient(90deg, ${blog.accentColor}08 0%, transparent 100%);
            padding: 1.5rem 2rem;
            font-style: italic;
            border-radius: 0 1rem 1rem 0;
            margin: 2.5rem 0;
            color: #e5e7eb;
          }

          .rich-text-content code {
            background: rgba(255, 255, 255, 0.06);
            color: ${blog.accentColor};
            padding: 0.2rem 0.4rem;
            border-radius: 0.375rem;
            font-size: 0.9em;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            border: 1px solid rgba(255, 255, 255, 0.05);
            word-break: break-all;
          }
          
          .rich-text-content pre {
            background: #090a0f;
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 1rem;
            padding: 1.5rem;
            overflow-x: auto;
            margin: 2.5rem 0;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
          }
          .rich-text-content pre code {
            background: transparent;
            color: #e5e7eb;
            padding: 0;
            border: none;
            font-size: 0.95em;
            word-break: normal;
          }
        ` }} />

        <div className="mb-10 mt-14 border-t border-white/8" />

        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600/30 text-lg font-bold text-blue-400">
            {authorInitials}
          </div>
          <div>
            <p className="font-bold text-white">{blog.author}</p>
            <p className="text-sm text-neutral-400">
              {blog._id?.toString().startsWith("devto-")
                ? "Technology contributor sharing insights via Dev.to."
                : "Published from the ScaleUp Web admin content panel."}
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 pb-24 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-white">Related Articles</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item._id || item.slug}
                href={`/blogs/${item.slug}`}
                className="group relative block"
              >
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 transition-all duration-300 hover:border-white/20">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-1 bg-white/5 p-5">
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: item.accentColor }}
                    >
                      {item.category}
                    </span>
                    <h3 className="mt-2 line-clamp-2 font-bold leading-snug text-white transition-colors group-hover:text-blue-300">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-neutral-500">
                      {item.readTime} · {item.date}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
