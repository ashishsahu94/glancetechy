"use client";
// components/blog/BlogGrid.tsx
// Home aur /blog dono jagah yahi grid use hota hai. Scroll pe cards ek-ek karke aate hain.
import { useEffect, useRef, useState } from "react";
import BlogCard from "./BlogCard";
import type { Post } from "@/lib/types";

export default function BlogGrid({ posts }: { posts: Post[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <BlogCard
          key={post.slug}
          post={post}
          className={shown ? "animate-reveal" : "opacity-0"}
          style={{ animationDelay: `${(i % 3) * 150}ms` }}
        />
      ))}
    </div>
  );
}