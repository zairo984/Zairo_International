const randomId = (length = 7) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
};

function env(name: string, fallbackName?: string) {
  return (
    process.env[name] ||
    (fallbackName ? process.env[fallbackName] : undefined) ||
    ""
  ).replace(/\/$/, "");
}

export function getBunnyConfig() {
  const storageUrl = env("BUNNY_STORAGE_URL", "NEXT_PUBLIC_BUNNY_STORAGE_URL");
  const storageZone = env(
    "BUNNY_STORAGE_ZONE",
    "NEXT_PUBLIC_BUNNY_STORAGE_ZONE",
  );
  const accessKey = env("BUNNY_ACCESS_KEY", "NEXT_PUBLIC_BUNNY_ACCESS_KEY");
  const cdnUrl =
    env("BUNNY_CDN_URL", "NEXT_PUBLIC_BUNNY_CDN_URL") ||
    "https://vacationsaga.b-cdn.net";

  if (!storageUrl || !storageZone || !accessKey) {
    throw new Error(
      "Bunny storage is not configured. Set BUNNY_STORAGE_URL, BUNNY_STORAGE_ZONE, and BUNNY_ACCESS_KEY.",
    );
  }

  return { storageUrl, storageZone, accessKey, cdnUrl };
}

export async function uploadToBunny(
  file: File,
  folder: "Photos" | "Resumes",
): Promise<string> {
  const { storageUrl, storageZone, accessKey, cdnUrl } = getBunnyConfig();
  const safeName = file.name.replace(/[^\w.\-]+/g, "_");
  const fileName = `${randomId(7)}${safeName}`;
  const uploadUrl = `${storageUrl}/${storageZone}/${folder}/${fileName}`;

  const upload = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      AccessKey: accessKey,
      "Content-Type": file.type || "application/octet-stream",
    },
    body: await file.arrayBuffer(),
  });

  if (!upload.ok) {
    const detail = (await upload.text()).slice(0, 200);
    throw new Error(
      `Failed to upload ${folder === "Photos" ? "photo" : "resume"} (${upload.status})${detail ? `: ${detail}` : "."}`,
    );
  }

  const publicUrl = `${cdnUrl}/${folder}/${fileName}`;
  const expectedPrefix = `${cdnUrl}/${folder}/`;
  if (!publicUrl.startsWith(expectedPrefix)) {
    throw new Error(
      `Upload produced an unexpected ${folder} URL. Expected prefix ${expectedPrefix}`,
    );
  }

  return publicUrl;
}
