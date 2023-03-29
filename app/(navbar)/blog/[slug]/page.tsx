import type { Metadata } from "next";
import { getSingleBlogPostBySlug } from "lib/notion";

export const metadata: Metadata = {
  title: "Blog //",
  description: "//",
};

export default async function BlogPostPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const blogPost = await getSingleBlogPostBySlug(slug);
  return (
    <section>
      <h1 className="cursor-notion font-bold text-3xl font-serif mb-5">
        {blogPost.metadata.title}
      </h1>
      <div>{blogPost.content}</div>
    </section>
  );
}
