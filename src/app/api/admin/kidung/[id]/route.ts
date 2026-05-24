import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
    
    const title = formData.get("title") as string;
    const lyrics = formData.get("lyrics") as string;
    const description = formData.get("description") as string;
    const audioFile = formData.get("audio") as File | null;

    let audioUrl = undefined;

    if (audioFile && audioFile.size > 0) {
      const arrayBuffer = await audioFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "audio_kidung", resource_type: "auto" },
          (error, result) => {
            if (error || !result) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });
      audioUrl = uploadResponse.secure_url;
    }

    const updated = await prisma.kidung.update({
      where: { id },
      data: {
        title,
        lyrics,
        description,
        ...(audioUrl && { audioUrl }),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Gagal update kidung" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.kidung.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Gagal menghapus kidung" }, { status: 500 });
  }
}