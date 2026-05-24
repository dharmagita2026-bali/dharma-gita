import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const level = Number(formData.get("level")) || 1;
    const infoText1 = formData.get("infoText1") as string | null;
    const infoText2 = formData.get("infoText2") as string | null;

    const files = formData.getAll("imageUrls") as File[];
    const imageUrls: string[] = [];

    for (const file of files) {
      if (file && file.size > 0) {
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

        imageUrls.push(uploadResponse.secure_url);
      }
    }

    const newMateri = await prisma.materi.create({
      data: { 
        title, 
        slug, 
        description, 
        level,
        infoText1: infoText1 || null,
        infoText2: infoText2 || null,
        imageUrls: imageUrls, 
      },
    });
    
    return NextResponse.json(newMateri);
  } catch (error) {
    console.error("Create error:", error);
    return NextResponse.json({ error: "Gagal membuat materi" }, { status: 500 });
  }
}