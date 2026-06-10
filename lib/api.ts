const BASE_URL = process.env.NEX

function getToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("admin_token") || "";
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

// ─── AUTH ─────────────────────────────────────────────────
export async function loginAdmin(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

// ─── BLOGS ────────────────────────────────────────────────
export async function getBlogs() {
  const res = await fetch("/api/blogs", {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export async function getBlogById(id: string) {
  const res = await fetch(`/api/blogs/${id}`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Blog not found");
  return res.json();
}

export async function createBlog(data: BlogPayload) {
  const res = await fetch("/api/blogs", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create blog");
  return res.json();
}

export async function updateBlog(id: string, data: BlogPayload) {
  const res = await fetch(`/api/blogs/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update blog");
  return res.json();
}

export async function deleteBlog(id: string) {
  const res = await fetch(`/api/blogs/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to delete blog");
  return res.json();
}



export async function getPublicBlogs() {
  const res = await fetch("/api/blogs/public", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export async function getPublicBlogBySlug(slug: string) {
  const res = await fetch(`/api/blogs/public/${slug}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Blog not found");
  return res.json();
}

// ─── TYPES ────────────────────────────────────────────────
export type BlogPayload = {
  title: string;
  content: string;
  category: string;
  image?: string;
  status: "draft" | "published";
  slug?: string;
};

export type Blog = BlogPayload & {
  _id: string;
  createdAt: string;
};
