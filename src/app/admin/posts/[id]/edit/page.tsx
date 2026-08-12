import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostById } from "@/lib/blog/queries";
import PostEditor from "@/components/admin/PostEditor";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl text-navy">Editar post</h1>
      <div className="mt-6">
        <PostEditor post={post} />
      </div>
    </div>
  );
}
