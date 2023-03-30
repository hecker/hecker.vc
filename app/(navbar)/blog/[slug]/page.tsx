import type { Metadata } from "next";
import { getSingleBlogPost } from "lib/notion";
import ReactMarkdown from "react-markdown";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPostPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const blogPost = await getSingleBlogPost(slug);
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif mb-5">
        {blogPost.metadata.title}
      </h1>
      <article className="prose dark:prose-invert prose-code">
        <ReactMarkdown>{blogPost.content}</ReactMarkdown>
      </article>
    </section>
  );
}
