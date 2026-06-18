"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserAvatar } from "@/components/UserAvatar";

interface Post {
  id: string;
  content: string;
  createdAt: string;
  author: string;
  authorAvatar?: string | null;
  canModerate?: boolean;
  status?: string;
}

interface GroupData {
  slug: string;
  name: string;
  description: string;
  rules: string | null;
  memberCount: number;
  isMember: boolean;
  posts: Post[];
}

export function GrupoApp({ slug }: { slug: string }) {
  const [group, setGroup] = useState<GroupData | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [posting, setPosting] = useState(false);

  async function load() {
    const res = await fetch(`/api/groups/${slug}`);
    const data = await res.json();
    if (res.ok) setGroup(data.group);
    setLoading(false);
  }

  useEffect(() => {
    let active = true;
    fetch(`/api/groups/${slug}`)
      .then((response) => response.json().then((data) => ({ ok: response.ok, data })))
      .then(({ ok, data }) => {
        if (!active) return;
        if (ok) setGroup(data.group);
        setLoading(false);
      })
      .catch(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  async function joinGroup() {
    const res = await fetch(`/api/groups/${slug}`, { method: "POST" });
    if (res.ok) load();
    else {
      const d = await res.json();
      setError(d.error ?? "Erro ao entrar no grupo.");
    }
  }

  async function submitPost(e: React.FormEvent) {
    e.preventDefault();
    setPosting(true);
    setError("");
    const res = await fetch(`/api/groups/${slug}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    if (res.ok) {
      setContent("");
      load();
    } else {
      setError(data.error ?? "Erro ao publicar.");
    }
    setPosting(false);
  }

  async function removePost(id: string) {
    if (!confirm("Remover esta publicação?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <p className="text-muted">Carregando...</p>;
  if (!group) return <p className="text-accent">Grupo não encontrado.</p>;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">{group.name}</h1>
        <p className="mt-2 text-muted">{group.description}</p>
        <p className="mt-2 text-sm text-muted">
          {group.memberCount} membros
        </p>
        {group.rules && (
          <div className="mt-4 rounded-xl bg-surface-2 p-4 text-sm text-muted">
            <strong className="text-foreground">Regras:</strong> {group.rules}
          </div>
        )}
      </header>

      {!group.isMember ? (
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">
            Participe do grupo para publicar e interagir.
          </p>
          <button
            type="button"
            onClick={joinGroup}
            className="mt-3 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Participar do grupo
          </button>
          {error && (
            <p className="mt-2 text-sm text-accent">
              {error}{" "}
              <Link href="/entrar" className="underline">
                Fazer login
              </Link>
            </p>
          )}
        </div>
      ) : (
        <form onSubmit={submitPost} className="space-y-3">
          <label htmlFor="post" className="text-sm font-medium">
            Compartilhe com respeito (sem automedicação ou promessa de cura)
          </label>
          <textarea
            id="post"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Como você está hoje? O que gostaria de compartilhar?"
            className="w-full rounded-xl border border-border px-3 py-2.5 text-sm resize-y"
          />
          {error && <p className="text-sm text-accent">{error}</p>}
          <button
            type="submit"
            disabled={posting || !content.trim()}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
          >
            Publicar
          </button>
        </form>
      )}

      <section>
        <h2 className="text-lg font-semibold">Publicações recentes</h2>
        {group.posts.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            Nenhuma publicação ainda. Seja a primeira pessoa a compartilhar.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {group.posts.map((post) => (
              <li
                key={post.id}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <UserAvatar name={post.author} src={post.authorAvatar} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">{post.author}</p>
                      <p className="text-xs text-muted">{new Date(post.createdAt).toLocaleString("pt-BR")}</p>
                    </div>
                  </div>
                  {post.canModerate && (
                    <button
                      type="button"
                      onClick={() => removePost(post.id)}
                      className="text-xs text-muted hover:text-accent"
                    >
                      Remover
                    </button>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
