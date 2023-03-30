import type { Metadata } from "next";
import Link from "next/link";
import { BlogPost, getAllBlogPosts } from "lib/notion";

export const metadata: Metadata = {
  title: "Blog",
  description: "My personal blog about software & startups.",
};

export default async function BlogPage() {
  const blogPosts: BlogPost[] = await getAllBlogPosts();
  return (
    <section>
      <h1 className="cursor-notion font-bold text-3xl font-serif mb-5">Blog</h1>
      {blogPosts.map((post) => {
        return (
          <Link
            key={post.id}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <p>{post.title}</p>
              <p className="font-mono text-sm text-neutral-500 tracking-tighter">
                {post.created}
              </p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
