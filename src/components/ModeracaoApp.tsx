"use client";

import { useEffect, useState } from "react";

interface FlaggedPost {
  id: string;
  content: string;
  status: string;
  createdAt: string;
  author: string;
  groupName: string;
  groupSlug: string;
}

export function ModeracaoApp() {
  const [posts, setPosts] = useState<FlaggedPost[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const groupsRes = await fetch("/api/groups");
    const groupsData = await groupsRes.json();
    const allPosts: FlaggedPost[] = [];

    for (const g of groupsData.groups ?? []) {
      const res = await fetch(`/api/groups/${g.slug}/posts`);
      if (!res.ok) continue;
      const data = await res.json();
      for (const p of data.posts ?? []) {
        allPosts.push({
          ...p,
          groupName: g.name,
          groupSlug: g.slug,
        });
      }
    }

    setPosts(allPosts);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function setStatus(id: string, status: string) {
    await fetch(`/api/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  async function removePost(id: string) {
    if (!confirm("Remover publicação?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <p className="text-muted">Carregando...</p>;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        {posts.length} publicações em todos os grupos.
      </p>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li
            key={post.id}
            className={`rounded-xl border p-4 ${
              post.status !== "approved"
                ? "border-accent/30 bg-accent/5"
                : "border-border bg-surface"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium">
                  {post.author} · {post.groupName}
                </p>
                <p className="text-xs text-muted">
                  {new Date(post.createdAt).toLocaleString("pt-BR")} ·{" "}
                  Status: {post.status}
                </p>
              </div>
              <div className="flex gap-2">
                {post.status !== "approved" && (
                  <button
                    type="button"
                    onClick={() => setStatus(post.id, "approved")}
                    className="text-xs text-secondary hover:underline"
                  >
                    Aprovar
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setStatus(post.id, "flagged")}
                  className="text-xs text-muted hover:underline"
                >
                  Sinalizar
                </button>
                <button
                  type="button"
                  onClick={() => removePost(post.id)}
                  className="text-xs text-accent hover:underline"
                >
                  Remover
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm whitespace-pre-wrap">{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
