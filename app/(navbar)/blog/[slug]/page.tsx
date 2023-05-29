import type { Metadata } from "next";
import { getSingleBlogPost } from "lib/notion";
import Markdown from "markdown-to-jsx";
import React from "react";
import { render } from "react-dom";
import Callout from "components/notion/callout";

export const metadata: Metadata = {
  title: "Blog",
};

export const revalidate = 3600;

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
        {blogPost.metadata.updated && (
          <Callout
            text={"Last updated in " + blogPost.metadata.updated + "."}
            emoji="🗓️"
          />
        )}
        render(<Markdown>{blogPost.content}</Markdown>, document.body);
      </article>
    </section>
  );
}
