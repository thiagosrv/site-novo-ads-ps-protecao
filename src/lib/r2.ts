import { AwsClient } from "aws4fetch";

function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

function client(): AwsClient {
  return new AwsClient({
    accessKeyId: env("R2_ACCESS_KEY_ID"),
    secretAccessKey: env("R2_SECRET_ACCESS_KEY"),
    service: "s3",
    region: "auto",
  });
}

function objectUrl(key: string): string {
  return `https://${env("R2_ACCOUNT_ID")}.r2.cloudflarestorage.com/${env("R2_BUCKET_NAME")}/${key}`;
}

export function publicUrl(key: string): string {
  return `${env("R2_PUBLIC_URL").replace(/\/$/, "")}/${key}`;
}

// Recovers the object key from a previously issued public URL — used to
// delete the R2 object behind a post's cover image.
export function keyFromPublicUrl(url: string): string | null {
  const base = env("R2_PUBLIC_URL").replace(/\/$/, "");
  if (!url.startsWith(`${base}/`)) return null;
  return url.slice(base.length + 1);
}

export async function putObject(key: string, body: Blob, contentType: string): Promise<void> {
  const res = await client().fetch(objectUrl(key), {
    method: "PUT",
    body,
    headers: { "Content-Type": contentType },
  });
  if (!res.ok) {
    throw new Error(`R2 upload failed: ${res.status} ${await res.text()}`);
  }
}

export async function deleteObject(key: string): Promise<void> {
  const res = await client().fetch(objectUrl(key), { method: "DELETE" });
  if (!res.ok && res.status !== 404) {
    throw new Error(`R2 delete failed: ${res.status} ${await res.text()}`);
  }
}
