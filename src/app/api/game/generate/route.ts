import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { prisma } from '@/lib/prisma';

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.name) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: "Slug diperlukan" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username: session.user.name },
      select: { id: true }
    });

    if (!user) return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });

    const materi = await prisma.materi.findUnique({
      where: { slug },
      include: { kidungs: true }
    });

    if (!materi || materi.kidungs.length === 0) {
      return NextResponse.json({ error: "Materi tidak ditemukan atau belum memiliki Kidung." }, { status: 404 });
    }

    const userMasteryRecords = await prisma.userKidungMastery.findMany({
      where: { userId: user.id },
      select: { kidungId: true }
    });

    const masteredIds = userMasteryRecords.map(m => m.kidungId);
    const unmasteredKidungs = materi.kidungs.filter(k => !masteredIds.includes(k.id));
    const allKidungsPool = materi.kidungs;

    let targets = [...unmasteredKidungs];
    
    const targetSize = Math.min(10, allKidungsPool.length);

    if (targets.length > targetSize) {
      targets = shuffleArray(targets).slice(0, targetSize);
    } else if (targets.length < targetSize) {
      const masteredFillers = allKidungsPool.filter(k => masteredIds.includes(k.id));
      const paddedFillers = shuffleArray(masteredFillers).slice(0, targetSize - targets.length);
      targets = [...targets, ...paddedFillers];
    }

    targets = shuffleArray(targets);

    const compiledQuestions = targets.map((kidung) => {
      const questionType = Math.random() > 0.5 ? 'AUDIO' : 'LYRICS';
      let promptHint = '';

      if (questionType === 'AUDIO') {
        promptHint = kidung.audioUrl;
      } else {
        const lines = kidung.lyrics ? kidung.lyrics.split('\n').filter(l => l.trim().length > 0) : [];
        if (lines.length >= 2) {
          const startIdx = Math.floor(Math.random() * (lines.length - 1));
          promptHint = `${lines[startIdx]}\n${lines[startIdx + 1]}`;
        } else {
          promptHint = lines[0] || kidung.title;
        }
      }

      const otherOptions = allKidungsPool.filter(k => k.id !== kidung.id);
      const maxDistractorsNeeded = Math.min(3, otherOptions.length);
      const randomDistractors = shuffleArray(otherOptions).slice(0, maxDistractorsNeeded).map(k => k.title);
      const choiceOptions = shuffleArray([kidung.title, ...randomDistractors]);

      return {
        kidungId: kidung.id,
        type: questionType,
        hint: promptHint,
        correctAnswer: kidung.title,
        choices: choiceOptions,
        isAlreadyMastered: masteredIds.includes(kidung.id) 
      };
    });

    return NextResponse.json({ questions: compiledQuestions });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal memproses kuis" }, { status: 500 });
  }
}