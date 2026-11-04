"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { ArrowRight } from "@phosphor-icons/react";
import ScrollReveal from "./ScrollReveal";

type Blog = {
  _id: string;
  title: string;
  banner: string;
  createdAt: string;
};

export default function LatestNews() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await axios.get("/api/blogs");
        const fetched = (response.data.blog ?? []) as Blog[];
        const sorted = [...fetched]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 3);
        if (!cancelled) setBlogs(sorted);
      } catch {
        if (!cancelled) setBlogs([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!loading && blogs.length === 0) return null;

  return (
    <ScrollReveal
      as="section"
      id="insights"
      aria-labelledby="insights-heading"
      className="scroll-mt-28 bg-white px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[680px]">
            <h2
              id="insights-heading"
              className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              From the blog
            </h2>
          </div>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity duration-300 ease-motion hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            View all articles
            <ArrowRight weight="bold" className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        {loading ? (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <li
                key={item}
                className="overflow-hidden rounded-2xl border border-border"
              >
                <div className="aspect-[16/10] animate-pulse bg-muted" />
                <div className="space-y-3 p-4">
                  <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <li key={blog._id}>
                <Link
                  href={`/blogs/${blog._id}`}
                  className="group block overflow-hidden rounded-2xl border border-border transition-transform duration-500 ease-motion hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={blog.banner || "/placeholder.svg"}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-700 ease-motion group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground">
                      {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <h3 className="mt-2 text-base font-medium text-foreground text-balance">
                      {blog.title}
                    </h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ScrollReveal>
  );
}
