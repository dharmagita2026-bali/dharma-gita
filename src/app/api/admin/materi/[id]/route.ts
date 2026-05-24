import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await req.formData();

    const existingImagesRaw = formData.get("existingImages");
    const existingImages: string[] = existingImagesRaw ? JSON.parse(existingImagesRaw as string) : [];
    
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const level = formData.get("level");
    const infoText1 = formData.get("infoText1") as string | null;
    const infoText2 = formData.get("infoText2") as string | null;

    interface UpdateMateriPayload {
      title: string;
      slug: string;
      description: string;
      level?: number;
      infoText1?: string | null;
      infoText2?: string | null;
      imageUrls?: string[]; 
    }

    const files = formData.getAll("imageUrls") as File[];
    const uploadedUrls: string[] = [];
    
    const hasNewFiles = files.length > 0 && files[0].size > 0;
    if (hasNewFiles) {
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: "materi_images" }, 
            (error, result) => {
              if (error || !result) reject(error);
              else resolve(result);
            }
          ).end(buffer);
        });

        uploadedUrls.push(uploadResponse.secure_url);
      }
    }

    const finalImageUrls = [...existingImages, ...uploadedUrls];

    const updateData: UpdateMateriPayload = {
      title, 
      slug, 
      description, 
      level: level ? Number(level) : undefined,
      infoText1: infoText1 || null,
      infoText2: infoText2 || null,
      imageUrls: finalImageUrls, 
    };

    if (hasNewFiles && uploadedUrls.length > 0) {
      updateData.imageUrls = uploadedUrls;
    }

    const updated = await prisma.materi.update({
      where: { id },
      data: updateData,
    });
    
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Gagal update materi" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await params;
    await prisma.materi.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Gagal menghapus materi" }, { status: 500 });
  }
}