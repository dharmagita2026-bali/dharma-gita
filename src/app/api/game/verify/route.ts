import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.name) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { slug, score, newMasteredIds } = body;
    const expAwarded = score * 10;

    const user = await prisma.user.findUnique({
      where: { username: session.user.name },
      select: { id: true, level: true }
    });

    if (!user) return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: user.id },
        data: { exp: { increment: expAwarded } }
      });

      await tx.quizHistory.create({
        data: {
          userId: user.id,
          score: score,
          expGained: expAwarded
        }
      });

      if (newMasteredIds && newMasteredIds.length > 0) {
        const masteryDataPayload = newMasteredIds.map((id: string) => ({
          userId: user.id,
          kidungId: id
        }));

        await tx.userKidungMastery.createMany({
          data: masteryDataPayload,
          skipDuplicates: true
        });
      }

      const materi = await tx.materi.findUnique({
        where: { slug },
        include: { kidungs: true }
      });

      if (materi) {
        const totalCategoryCount = materi.kidungs.length;
        const totalKidungIdsInMateri = materi.kidungs.map(k => k.id);

        const totalUserMasteredInThisMateri = await tx.userKidungMastery.count({
          where: {
            userId: user.id,
            kidungId: { in: totalKidungIdsInMateri }
          }
        });

        if (totalUserMasteredInThisMateri === totalCategoryCount) {
          if (user.level === materi.level) {
            await tx.user.update({
              where: { id: user.id },
              data: { level: { increment: 1 } }
            });
          }
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal menyimpan progress" }, { status: 500 });
  }
}