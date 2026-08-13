import type { Metadata } from "next";
import PostEditor from "@/components/admin/PostEditor";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function NewPostPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl text-navy">Novo post</h1>
      <div className="mt-6">
        <PostEditor post={null} />
      </div>
    </div>
  );
}
