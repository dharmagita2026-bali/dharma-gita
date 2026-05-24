"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Question {
  kidungId: string;
  type: 'AUDIO' | 'LYRICS';
  hint: string;
  correctAnswer: string;
  choices: string[];
  isAlreadyMastered: boolean;
}

export default function GameArena() {
  const { slug } = useParams();
  const router = useRouter(); 

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  const [score, setScore] = useState(0);
  const [newMasteredIds, setNewMasteredIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function initQuizArena() {
      try {
        const res = await fetch(`/api/game/generate?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setQuestions(data.questions);
        } else {
          alert("Gagal memuat arsitektur kuis.");
          router.push('/game');
        }
      } catch (err) {
        console.error("Arena initialization error:", err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) initQuizArena();
  }, [slug, router]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [currentIndex]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF9] flex flex-col items-center justify-center space-y-4">
        <div className="text-3xl animate-spin">🌀</div>
        <div className="text-xs font-black text-[#4E342E] uppercase tracking-[0.25em] animate-pulse">
          Menyusun Bait Pertanyaan...
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#FDFBF9] flex items-center justify-center">
        <div className="text-sm font-bold text-[#8D6E63]">Tidak ada pertanyaan yang tersedia.</div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleChoiceClick = (choice: string) => {
    if (isAnswered) return;
    setSelectedChoice(choice);
    setIsAnswered(true);

    const isCorrect = choice === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      if (!currentQuestion.isAlreadyMastered) {
        setNewMasteredIds((prev) => [...prev, currentQuestion.kidungId]);
      }
    }
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setSelectedChoice(null);
      setIsAnswered(false);
      setCurrentIndex((prev) => prev + 1);
    } else {
      await handleFinishQuiz();
    }
  };

  const handleFinishQuiz = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/game/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          score,
          newMasteredIds,
          totalQuestions: questions.length
        })
      });

      if (res.ok) {
        router.refresh();
        setQuizFinished(true);
      } else {
        alert("Gagal menyimpan rekam data latihan.");
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (quizFinished) {
    const totalExpGained = score * 10;
    const isPerfect = score === questions.length;

    return (
      <div className="min-h-screen bg-[#FDFBF9] text-[#4E342E] flex items-center justify-center p-6 select-none">
        <div className="bg-white border-4 border-[#4E342E] max-w-md w-full rounded-[40px] p-10 shadow-[8px_8px_0px_0px_#4E342E] text-center space-y-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#8D6E63]">Sesi Selesai</span>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Hasil Latihan</h2>
          </div>

          <div className="bg-[#F8F5F2] border-4 border-[#4E342E] inline-flex flex-col items-center justify-center p-8 rounded-[32px] min-w-[180px] shadow-inner">
            <span className="text-5xl font-black tracking-tighter text-[#D4A017]">{score} / {questions.length}</span>
            <span className="text-[9px] font-black uppercase tracking-wider text-[#8D6E63] mt-2">Jawaban Benar</span>
          </div>

          <div className="space-y-2 bg-[#FDFBF9] border-2 border-[#D7CCC8] rounded-2xl p-4 text-sm font-bold">
            <p className="text-[#2E7D32]">+ {totalExpGained} Total Exp Didapat</p>
            {isPerfect ? (
              <p className="text-[#D4A017] text-xs uppercase font-black tracking-wider">🎉 Sempurna! Level Penguasaan Bertambah!</p>
            ) : (
              <p className="text-[#8D6E63] text-xs font-medium">Kuasai semua bait ({questions.length}/{questions.length}) untuk menaikkan tingkat kemajuan materi.</p>
            )}
          </div>

          <button 
            onClick={() => router.push('/game')}
            className="w-full p-5 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#4E342E] text-white shadow-md hover:brightness-125 transition-all duration-200 active:translate-y-0.5"
          >
            Kembali ke Dashboard Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#4E342E] p-6 md:p-12 flex flex-col justify-between">
      
      <header className="max-w-3xl w-full mx-auto flex justify-between items-center border-b-2 border-[#D7CCC8] pb-4">
        <span className="text-xs font-black uppercase tracking-widest text-[#8D6E63]">
          Pertanyaan {currentIndex + 1} dari {questions.length}
        </span>
        <span className="bg-[#4E342E] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
          Sesi Berjalan: + {score * 10} EXP
        </span>
      </header>

      <main className="max-w-3xl w-full mx-auto my-auto py-8 space-y-8">
        <div className="bg-white border-4 border-[#4E342E] rounded-[40px] p-8 md:p-12 shadow-[6px_6px_0px_0px_#4E342E] flex flex-col items-center justify-center min-h-[280px] relative overflow-hidden bg-radial from-white to-[#FDFBF9]">
          
          {currentQuestion.type === 'AUDIO' ? (
            <div className="w-full text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-[#F8F5F2] border-2 border-[#4E342E] rounded-2xl flex items-center justify-center shadow-sm text-2xl animate-pulse">
                🔊
              </div>
              <p className="text-[10px] font-black uppercase text-[#8D6E63] tracking-widest">Dengarkan Melodi Nada Lagu Di bawah ini:</p>
              <audio ref={audioRef} controls className="mx-auto w-full max-w-md accent-[#D4A017] rounded-lg">
                <source src={currentQuestion.hint} type="audio/mpeg" />
                Browser anda tidak mendukung pemutaran native audio.
              </audio>
            </div>
          ) : (
            <div className="w-full text-center space-y-4">
              <span className="text-[9px] font-black uppercase text-[#8D6E63] tracking-[0.25em] block">Sempurnakan atau Tebak Judul Bait Lirik Ini:</span>
              <blockquote className="text-xl md:text-2xl font-black italic tracking-tight text-[#4E342E] whitespace-pre-line leading-relaxed px-4">
                &quot;{currentQuestion.hint}&quot;
              </blockquote>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentQuestion.choices.map((choice, idx) => {
            let btnStyle = "bg-white border-2 border-[#4E342E] hover:bg-[#F8F5F2] text-[#4E342E] active:bg-[#F2EFEA]";
            
            if (isAnswered) {
              if (choice === currentQuestion.correctAnswer) {
                btnStyle = "bg-[#E8F5E9] border-4 border-[#2E7D32] text-[#1B5E20] font-black scale-[1.01]";
              } else if (choice === selectedChoice) {
                btnStyle = "bg-[#FFEBEE] border-4 border-[#C62828] text-[#B71C1C] opacity-80 font-black";
              } else {
                btnStyle = "bg-white border-2 border-[#E0E0E0] text-[#BDBDBD] opacity-40 cursor-not-allowed select-none";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleChoiceClick(choice)}
                className={`w-full p-5 text-left text-sm font-bold rounded-2xl transition-all duration-150 flex items-center justify-between shadow-xs ${btnStyle}`}
              >
                <span className="pr-4">{choice}</span>
                {isAnswered && choice === currentQuestion.correctAnswer && <span className="text-lg text-[#2E7D32]">✓</span>}
                {isAnswered && choice === selectedChoice && choice !== currentQuestion.correctAnswer && <span className="text-lg text-[#C62828]">✗</span>}
              </button>
            );
          })}
        </div>
      </main>

      <footer className="max-w-3xl w-full mx-auto border-t-2 border-[#D7CCC8] pt-4 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!isAnswered || submitting}
          className="px-8 py-4 bg-[#D4A017] text-white rounded-full text-[11px] font-black uppercase tracking-widest shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all active:scale-98"
        >
          {submitting ? 'Menyimpan...' : (currentIndex === questions.length - 1 ? 'Selesaikan Kuis' : 'Pertanyaan Selanjutnya →')}
        </button>
      </footer>

    </div>
  );
}