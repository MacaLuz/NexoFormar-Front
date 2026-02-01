type UploadResult = {
  secure_url?: string;
  url?: string;
};

export async function uploadMany(files: FileList): Promise<string[]> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const folder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER;

  if (!cloudName || !uploadPreset) {
    throw new Error("Faltan variables de Cloudinary en .env.local");
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const uploads = Array.from(files)
    .slice(0, 3)
    .map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      if (folder) formData.append("folder", folder);

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Cloudinary upload failed: ${res.status} ${errText}`);
      }

      const data = (await res.json()) as UploadResult;
      const url = data.secure_url ?? data.url;
      if (!url) throw new Error("Cloudinary no devolvió URL");
      return url;
    });

  return Promise.all(uploads);
}
