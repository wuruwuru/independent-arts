import { defineCollection } from "astro:content";
import { newsSchema } from "./schemas/news";
import { Marble } from "@usemarble/sdk";

const newsCollection = defineCollection({
  loader: async () => {
    const key = import.meta.env.MARBLE_API_KEY;
    if (!key) {
      return [];
    }

    try {
      const marble = new Marble({ apiKey: key });
      // Public Marble keys can read published posts, but not drafts. Requesting
      // all posts makes Marble return 403 and leaves the collection empty.
      const { result } = await marble.posts.list({
        status: "published",
        format: "html",
        limit: 100,
      });

      // https://docs.astro.build/en/reference/content-loader-reference/#loader-types
      return result.posts.map((post) => ({
        ...post,
        fields: post.fields ?? {},
      }));
    } catch (err) {
      console.error(
        "[content/news] Marble posts.list() failed; building with no news entries.",
        err
      );
      return [];
    }
  },
  schema: newsSchema,
});

export const collections = { news: newsCollection };
