import { Client } from "@notionhq/client";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  created: string;
}

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (process.env.NOTION_DATABASE_ID === undefined) {
    throw new Error("Notion database ID is not defined.");
  }
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });
  //   console.log(response.results);
  const blogPosts: BlogPost[] = response.results.map((page: any) => ({
    id: page.id,
    title: page.properties.Name.title[0].plain_text,
    slug: page.properties.Slug.rich_text[0].plain_text,
    created: formatDate(page.created_time),
  }));
  return blogPosts;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const diff = today.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 3600 * 24));

  if (days < 30) {
    const relativeDates: { [key: number]: string } = {
      0: "Today",
      1: "Yesterday",
      7: "Last week",
    };
    for (let i = 2; i < 7; i++) {
      relativeDates[i] = `${i} days ago`;
    }
    for (let i = 2; i < 4; i++) {
      relativeDates[i * 7] = `${i} weeks ago`;
    }
    return relativeDates[days] || `${Math.ceil(days / 30)} months ago`;
  } else {
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  }
}

const { NotionToMarkdown } = require("notion-to-md");
const n2m = new NotionToMarkdown({ notionClient: notion });

export const getSingleBlogPostBySlug = async (slug: string) => {
  if (process.env.NOTION_DATABASE_ID === undefined) {
    throw new Error("Notion database ID is not defined.");
  }
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: "Slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });
  const page: any = response.results[0];
  //   console.log("page2response... ", page);
  const metadata: BlogPost = {
    id: page.id,
    title: page.properties.Name.title[0].plain_text,
    slug: page.properties.Slug.rich_text[0].plain_text,
    created: formatDate(page.created_time),
  };
  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);
  return {
    metadata: metadata,
    content: mdString,
  };
};
