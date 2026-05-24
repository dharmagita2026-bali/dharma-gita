import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { prisma } from '@/lib/prisma';
import { calculatePrestige } from '@/lib/prestige';

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.name) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { username: session.user.name },
      select: {
        id: true,
        username: true,
        level: true,
        exp: true,
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    const rankInfo = calculatePrestige(user.exp);

    const materiList = await prisma.materi.findMany({
      orderBy: { level: 'asc' },
      include: {
        kidungs: {
          select: {
            id: true,
            masteredBy: {
              where: { userId: user.id },
              select: { id: true }
            }
          }
        }
      }
    });

    const categories = materiList.map((materi) => {
      const totalKidungs = materi.kidungs.length;
      const masteredCount = materi.kidungs.filter(
        (k) => k.masteredBy.length > 0
      ).length;

      return {
        id: materi.id,
        slug: materi.slug,
        title: materi.title,
        description: materi.description,
        level: materi.level,
        totalKidungs,
        masteredCount,
      };
    });

    return NextResponse.json({ 
      user: {
        username: user.username,
        level: user.level,
        exp: user.exp,
        rank: rankInfo 
      }, 
      categories 
    });

  } catch (error) {
    console.error("Game Dashboard API Error:", error);
    return NextResponse.json({ error: "Gagal memproses data" }, { status: 500 });
  }
}