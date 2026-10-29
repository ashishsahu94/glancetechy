// lib/posts.ts - blog API helpers (usable on the server at build time and in the browser)
import { ApiError, apiGet, asItem, asList } from "./api";
import type { Post } from "./types";

export async function fetchPosts(limit = 100): Promise<Post[]> {
  try {
    return asList<Post>(await apiGet<unknown>(`/posts?limit=${limit}`));
  } catch (error) {
    console.error("Failed to load posts:", error);
    return [];
  }
}

/**
 * `strict: true` (used at build time) only turns a 404 into null and throws
 * on every other error, so a broken API fails the build.
 * Default (browser): never throws, returns null.
 */
export async function fetchPost(slug: string, { strict = false } = {}): Promise<Post | null> {
  try {
    return asItem<Post>(await apiGet<unknown>(`/posts/${encodeURIComponent(slug)}`));
  } catch (error) {
    if (strict) {
      if (error instanceof ApiError && error.status === 404) return null;
      throw error;
    }
    console.error(`Failed to load post "${slug}":`, error);
    return null;
  }
}
