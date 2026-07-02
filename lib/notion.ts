import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  created: string;
  updated: string | undefined;
}

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Notion SDK v5 queries data sources instead of databases; resolve the
// database's single data source once and reuse it.
let dataSourceId: string | undefined;
async function getDataSourceId(): Promise<string> {
  if (process.env.NOTION_DATABASE_ID === undefined) {
    throw new Error("Notion database ID is not defined.");
  }
  if (dataSourceId === undefined) {
    const database: any = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID,
    });
    dataSourceId = database.data_sources[0].id;
  }
  return dataSourceId!;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const response = await notion.dataSources.query({
    data_source_id: await getDataSourceId(),
    filter: {
      property: "Published",
      date: {
        is_not_empty: true,
      },
    },
    sorts: [
      {
        property: "Published",
        direction: "descending",
      },
    ],
  });
  const blogPosts: BlogPost[] = response.results.map((page: any) => ({
    id: page.id,
    title: page.properties.Name.title[0].plain_text,
    slug: page.properties.Slug.rich_text[0].plain_text,
    created: formatDate(page.properties.Published.date.start, false),
    updated: page.properties['Show "Last updated"'].checkbox
      ? formatDate(page.last_edited_time, true)
      : undefined,
  }));
  return blogPosts;
}

function formatDate(dateString: string, justMonthYear: boolean): string {
  const date = new Date(dateString);
  const today = new Date();
  const diff = today.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 3600 * 24));
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  if (justMonthYear) {
    if (year === today.getFullYear()) {
      return month;
    } else {
      return `${month} ${year}`;
    }
  }
  if (days == 0) return "Today";
  if (days == 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return `${month} ${year}`;
}

const n2m = new NotionToMarkdown({ notionClient: notion });

n2m.setCustomTransformer("video", async (block: any) => {
  const { video } = block as any;
  const { type } = video;
  const video_url = video[type].url;
  console.log("video url", video_url);
  return `
      <video width="320" height="240" controls>
      <source src="${video_url}" type="video/mp4">
         Your browser does not support the video tag.
     </video>
  `.trim();
});

export const getSingleBlogPost = async (slug: string) => {
  const response = await notion.dataSources.query({
    data_source_id: await getDataSourceId(),
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
  const metadata: BlogPost = {
    id: page.id,
    slug: page.properties.Slug.rich_text[0].plain_text,
    title: page.properties.Name.title[0].plain_text,
    created: formatDate(page.properties.Published.date.start, false),
    updated: page.properties['Show "Last updated"'].checkbox
      ? formatDate(page.last_edited_time, true)
      : undefined,
  };

  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  return {
    metadata: metadata,
    content: mdString.parent,
  };
};
