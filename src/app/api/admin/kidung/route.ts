import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const lyrics = formData.get("lyrics") as string;
    const description = formData.get("description") as string;
    const materiId = formData.get("materiId") as string;
    const audioFile = formData.get("audio") as File | null;

    if (!audioFile) {
      return NextResponse.json({ error: "File audio wajib diunggah" }, { status: 400 });
    }

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

    const newKidung = await prisma.kidung.create({
      data: {
        title,
        lyrics,
        description,
        audioUrl: uploadResponse.secure_url, 
        materiId,
      },
    });

    return NextResponse.json({ success: true, data: newKidung });
  } catch (error) {
    console.error("Kidung Upload Error:", error);
    return NextResponse.json({ error: "Gagal mengunggah kidung" }, { status: 500 });
  }
}