import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { listPosts } from "@/lib/blog/queries";
import { StatusToggleButton, DeletePostButton } from "./PostRowActions";

export const metadata: Metadata = { robots: { index: false, follow: false } };

function SeoScoreBadge({ score }: { score: number | null }) {
  if (score === null) {
    return (
      <span className="rounded-full bg-graphite/10 px-2.5 py-1 text-xs font-mono text-graphite/50">
        —
      </span>
    );
  }
  const tone =
    score >= 80
      ? "bg-green-100 text-green-700"
      : score >= 50
        ? "bg-amber-100 text-amber-700"
        : "bg-red-100 text-red-700";
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-mono font-semibold ${tone}`}>
      {score}
    </span>
  );
}

function StatusBadge({ status }: { status: "draft" | "published" }) {
  return status === "published" ? (
    <span className="rounded-full bg-tech-blue/10 px-2.5 py-1 text-xs font-medium text-tech-blue">
      Publicado
    </span>
  ) : (
    <span className="rounded-full bg-graphite/10 px-2.5 py-1 text-xs font-medium text-graphite/60">
      Rascunho
    </span>
  );
}

export default async function AdminPostsPage() {
  const posts = await listPosts();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl text-navy">Posts</h1>
          <p className="mt-1 text-sm text-graphite/60">
            {posts.length} post{posts.length === 1 ? "" : "s"} no total.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="press-scale-only inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow to-yellow-dark px-5 py-2.5 font-heading text-sm font-semibold text-navy shadow-sm"
        >
          <Plus size={16} />
          Novo post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-navy/15 bg-white p-10 text-center">
          <p className="text-graphite/60">Nenhum post ainda.</p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-navy/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-xs uppercase tracking-wide text-graphite/50">
              <tr>
                <th className="px-4 py-3 font-medium">Título</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">SEO</th>
                <th className="px-4 py-3 font-medium">Atualizado</th>
                <th className="px-4 py-3 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy">{post.title}</p>
                    <p className="text-xs text-graphite/50">/blog/{post.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="px-4 py-3">
                    <SeoScoreBadge score={post.seoScore} />
                  </td>
                  <td className="px-4 py-3 text-graphite/60">
                    {new Date(post.updatedAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <StatusToggleButton id={post.id} status={post.status} />
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="press-feedback rounded-full p-2 text-graphite/40 hover:bg-tech-blue/10 hover:text-tech-blue"
                        aria-label={`Editar ${post.title}`}
                      >
                        <Pencil size={16} />
                      </Link>
                      <DeletePostButton id={post.id} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
