/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertTriangle,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileCheck2,
  Flame,
  Gamepad2,
  Heart,
  HelpCircle,
  Lightbulb,
  MessageCircle,
  RotateCcw,
  Scale,
  Search,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Trophy,
  Vote,
  XCircle,
  Zap,
} from 'lucide-react';
import {
  CHALLENGE_SCENARIOS,
  FACT_CHECK_FEED,
  FICTITIOUS_CANDIDATES,
  QUIZ_QUESTIONS,
} from '../data/learningData';
import { useApp } from '../context/AppContext';

export const GameCenter: React.FC = () => {
  const {
    votedCandidateId,
    voterRationale,
    setVotedCandidate,
    factCheckAnswers,
    setFactCheckAnswer,
    challengeProgress,
    setChallengeChoice,
    summativeAnswers,
    setSummativeAnswer,
    setSummativeScore,
    addXP,
    unlockBadge,
    triggerConfetti,
    setActiveTab,
  } = useApp();

  const [activeGameTab, setActiveGameTab] = useState<
    'challenge' | 'simulation' | 'factcheck' | 'quiz'
  >('simulation');

  // State for Democracy Challenge
  const [selectedScenarioId, setSelectedScenarioId] = useState(
    CHALLENGE_SCENARIOS[0].id
  );

  // State for Smart Voter Simulation
  const [activeCandidateModal, setActiveCandidateModal] = useState<string | null>(null);
  const [tempRationale, setTempRationale] = useState(voterRationale);
  const [hasVotedBallot, setHasVotedBallot] = useState(Boolean(votedCandidateId));

  // State for Democracy Master Quiz
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // --- Handlers for Smart Voter Simulation ---
  const handleVoteCandidate = (candidateId: string) => {
    if (!tempRationale.trim()) {
      alert('Tuliskan alasan pertimbangan objektifmu terlebih dahulu sebelum mencoblos.');
      return;
    }
    setVotedCandidate(candidateId, tempRationale);
    setHasVotedBallot(true);
    triggerConfetti();
  };

  // --- Handlers for Master Quiz ---
  const handleAnswerQuiz = (qId: number, optIdx: number) => {
    if (quizSubmitted) return;
    setSummativeAnswer(qId, optIdx);
  };

  const calculateFinalQuizScore = () => {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (summativeAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });
    const finalScore = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
    setSummativeScore(finalScore);
    setQuizSubmitted(true);
    triggerConfetti();
  };

  const currentQuizQ = QUIZ_QUESTIONS[quizQuestionIndex];
  const isLastQuestion = quizQuestionIndex === QUIZ_QUESTIONS.length - 1;
  const answeredQuizCount = Object.keys(summativeAnswers).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
            <Gamepad2 className="w-4 h-4" />
            Democracy Challenge & Game Center Interaktif
          </div>
          <span className="text-xs font-semibold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-xl border border-amber-800">
            4 Mode Simulasi & Permainan
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Pusat Simulasi & Uji Keputusan Pemilih Cerdas
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Uji keberanian moral, ketelitian memverifikasi hoaks, dan rasionalitasmu dalam memilih pemimpin melalui 4 wahana interaktif tanpa bias politik partisan.
        </p>

        {/* Game Mode Switcher Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {[
            { id: 'simulation', name: 'Simulasi Pemilu', icon: Vote, badge: '3 Calon Fiktif' },
            { id: 'challenge', name: 'Democracy Challenge', icon: Flame, badge: 'Skenario Dilema' },
            { id: 'factcheck', name: 'Fact Check Game', icon: ShieldCheck, badge: 'Detektif Medsos' },
            { id: 'quiz', name: 'Master Quiz HOTS', icon: Trophy, badge: '12 Soal Kasus' },
          ].map((mode) => {
            const Icon = mode.icon;
            const isActive = activeGameTab === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveGameTab(mode.id as any)}
                className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-cyan-400 shadow-lg shadow-blue-500/25 font-bold'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/60 hover:text-white font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                  <div>
                    <p className="text-xs font-bold leading-tight">{mode.name}</p>
                    <p className="text-[10px] opacity-75">{mode.badge}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. SMART VOTER SIMULATION (3 KANDIDAT FIKTIF & BILIK SUARA) */}
      {/* ============================================================ */}
      {activeGameTab === 'simulation' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-8 shadow-2xl">
          <div className="border-b border-slate-800 pb-5 space-y-1">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Simulasi Bilik Suara TPS Digital
            </span>
            <h2 className="text-2xl font-black text-white">
              Pilkada Simulasi: Bandingkan 3 Pasangan Calon Berimbang
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
              Tidak ada kandidat yang sempurna atau otomatis paling benar. Setiap calon memiliki kelebihan program nyata dan konsekuensi anggaran/keterbatasan. Analisis secara mandiri!
            </p>
          </div>

          {/* 3 Candidates Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {FICTITIOUS_CANDIDATES.map((cand) => {
              const isSelected = votedCandidateId === cand.id;
              return (
                <div
                  key={cand.id}
                  className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-5 ${
                    isSelected
                      ? 'bg-blue-950/40 border-cyan-400 shadow-xl shadow-cyan-500/10'
                      : 'bg-slate-800/50 border-slate-700/80 hover:border-slate-600'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header Number & Avatar */}
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        {cand.number}
                      </div>
                      {isSelected && (
                        <span className="px-3 py-1 rounded-full bg-cyan-500 text-slate-950 font-extrabold text-[11px] shadow-sm flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Pilihanmu
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base text-white">{cand.name}</h3>
                      <p className="text-xs font-bold text-cyan-300 mt-0.5">{cand.tagline}</p>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {cand.background}
                    </p>

                    {/* Visi Ringkas */}
                    <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300">
                      <p className="font-bold text-amber-300 text-[11px] mb-1">Visi Utama:</p>
                      "{cand.vision}"
                    </div>

                    {/* Program Kerja Unggulan & Analisis Risiko */}
                    <div className="space-y-2 pt-1 text-xs">
                      <p className="font-bold text-slate-200">Program Prioritas & Konsekuensi:</p>
                      {cand.priorityPrograms.map((prog, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1.5"
                        >
                          <p className="font-bold text-cyan-300 text-xs">{prog.title}</p>
                          <p className="text-slate-400 text-[11px]">{prog.description}</p>
                          <div className="grid grid-cols-1 gap-1 pt-1 text-[10px]">
                            <span className="text-emerald-400">
                              <strong>Kelebihan:</strong> {prog.pros}
                            </span>
                            <span className="text-rose-400">
                              <strong>Tantangan:</strong> {prog.cons}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Rekam Jejak */}
                    <div className="text-xs space-y-1">
                      <p className="font-bold text-slate-300">Rekam Jejak Terverifikasi:</p>
                      <ul className="list-disc list-inside text-slate-400 text-[11px] space-y-0.5">
                        {cand.trackRecord.map((tr, tIdx) => (
                          <li key={tIdx}>{tr}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setActiveCandidateModal(cand.id)}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                    >
                      Buka Rincian Lengkap & Transparansi Dana &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Voting Booth & Rationalization Form */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-850 border border-slate-700 space-y-4">
            <div className="flex items-center gap-2">
              <Vote className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-base text-white">
                Bilik Suara: Berikan Suaramu dengan Alasan Rasional
              </h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tuliskan Alasan Rasional & Pertimbangan Program Mengapa Kamu Memilih Paslon Tersebut:
              </label>
              <textarea
                rows={3}
                value={tempRationale}
                onChange={(e) => setTempRationale(e.target.value)}
                placeholder="Contoh: Saya memilih Paslon Nomor 02 karena program sekolah hijau dan konseling mental sangat mendesak bagi kami, dan rekam jejak beliau bebas dari sengketa hukum..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <p className="text-xs text-slate-400">
                Pilih salah satu tombol paslon di samping untuk mencoblos secara sah:
              </p>
              <div className="flex items-center gap-2">
                {FICTITIOUS_CANDIDATES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleVoteCandidate(c.id)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ${
                      votedCandidateId === c.id
                        ? 'bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/20'
                        : 'bg-blue-600 hover:bg-blue-500 text-white'
                    }`}
                  >
                    <Vote className="w-3.5 h-3.5" />
                    Coblos Paslon {c.number}
                  </button>
                ))}
              </div>
            </div>

            {hasVotedBallot && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 flex items-center gap-3 text-emerald-300 text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  <strong>Surat Suara Sah:</strong> Kamu telah menggunakan hak pilihmu secara merdeka dan berdaulat! Lencana <strong>Smart Voter</strong> telah terbuka.
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. DEMOCRACY CHALLENGE (PENGAMBILAN KEPUTUSAN BERBASIS KASUS) */}
      {/* ============================================================ */}
      {activeGameTab === 'challenge' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-8 shadow-2xl">
          <div className="border-b border-slate-800 pb-5 space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Democracy Challenge
            </span>
            <h2 className="text-2xl font-black text-white">
              Tantangan Dilema & Konsekuensi Nyata Pemilih Muda
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
              Di kehidupan nyata, godaan suap dan tekanan sosial sering mengaburkan kejujuran. Tentukan langkahmu dan saksikan dampak etis dari pilihanmu.
            </p>
          </div>

          {/* Scenario Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHALLENGE_SCENARIOS.map((sc, idx) => {
              const isSelected = selectedScenarioId === sc.id;
              const hasChosen = challengeProgress[sc.id] !== undefined;

              return (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-600/30 border-cyan-400 text-white font-bold shadow-md'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div>
                    <span className="text-[10px] text-cyan-400 font-bold uppercase">
                      Skenario {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold mt-0.5">{sc.title}</h4>
                  </div>
                  {hasChosen && (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800">
                      Selesai
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Current Active Scenario Details */}
          {(() => {
            const sc =
              CHALLENGE_SCENARIOS.find((s) => s.id === selectedScenarioId) ||
              CHALLENGE_SCENARIOS[0];
            const currentChosenId = challengeProgress[sc.id];

            return (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase">
                    <Flame className="w-4 h-4" />
                    Lokasi: {sc.location}
                  </div>
                  <h3 className="text-xl font-black text-white">{sc.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {sc.situation}
                  </p>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-rose-300 font-semibold">
                    Dilema Kunci: {sc.dilemma}
                  </div>
                </div>

                {/* Choices */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Pilih Tindakan yang Akan Kamu Ambil:
                  </h4>
                  <div className="space-y-3">
                    {sc.choices.map((ch) => {
                      const isPicked = currentChosenId === ch.id;

                      return (
                        <div
                          key={ch.id}
                          className={`p-4 rounded-2xl border transition-all ${
                            isPicked
                              ? ch.isOptimal
                                ? 'bg-emerald-950/40 border-emerald-500 text-white'
                                : 'bg-rose-950/40 border-rose-500 text-white'
                              : 'bg-slate-800/40 border-slate-700 hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-xs sm:text-sm font-semibold">{ch.text}</p>
                            <button
                              onClick={() => {
                                setChallengeChoice(sc.id, ch.id);
                                addXP(ch.xpReward, `Keputusan Dilema: ${ch.characterImpact}`);
                              }}
                              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
                                isPicked
                                  ? 'bg-white text-slate-950 font-black'
                                  : 'bg-blue-600 hover:bg-blue-500 text-white'
                              }`}
                            >
                              {isPicked ? 'Tindakan Terpilih' : 'Pilih Ini'}
                            </button>
                          </div>

                          {/* Consequence & Impact if picked */}
                          {isPicked && (
                            <div className="mt-3 pt-3 border-t border-slate-700/80 space-y-2 text-xs animate-in fade-in">
                              <p className="leading-relaxed">
                                <strong className="text-cyan-300">Konsekuensi:</strong>{' '}
                                {ch.consequence}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-amber-300 font-bold text-[10px]">
                                  Karakter: {ch.characterImpact}
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-bold text-[10px]">
                                  +{ch.xpReward} XP Diperoleh
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. FACT CHECK GAME (SIMULASI MEDIA SOSIAL FEEDS) */}
      {/* ============================================================ */}
      {activeGameTab === 'factcheck' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-8 shadow-2xl">
          <div className="border-b border-slate-800 pb-5 space-y-1">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Detektif Cek Fakta Independen
            </span>
            <h2 className="text-2xl font-black text-white">
              Social Media Feed Cek Fakta: Fakta, Hoaks, atau Belum Terverifikasi?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
              Analisis postingan viral di bawah ini. Cari red flag, telaah sumber informasi, lalu tetapkan vonismu!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FACT_CHECK_FEED.map((post) => {
              const currentAnswer = factCheckAnswers[post.id];
              const isAnswered = currentAnswer !== undefined;

              return (
                <div
                  key={post.id}
                  className="p-5 rounded-3xl bg-slate-800/60 border border-slate-700 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Author & Platform Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={post.avatar}
                          alt={post.author}
                          className="w-10 h-10 rounded-full object-cover border border-slate-600"
                        />
                        <div>
                          <p className="text-xs font-bold text-white leading-tight">
                            {post.author}
                          </p>
                          <p className="text-[10px] text-slate-400 leading-tight">
                            {post.authorHandle} • {post.timestamp}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900 text-cyan-400 border border-slate-700">
                        {post.platform}
                      </span>
                    </div>

                    {/* Post Content */}
                    <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/60 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      {post.content}
                    </div>

                    <div className="flex items-center gap-4 text-[11px] text-slate-400">
                      <span>🔁 {post.shares} Retweet/Share</span>
                      <span>❤️ {post.likes} Likes</span>
                    </div>

                    {/* Verification & Analysis if Answered */}
                    {isAnswered && (
                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-2 text-xs animate-in fade-in">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">Vonis Resmi:</span>
                          <span
                            className={`font-black px-2.5 py-0.5 rounded-full text-[10px] ${
                              post.verdict === 'FAKTA'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : post.verdict === 'HOAKS'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}
                          >
                            {post.verdict}
                          </span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{post.explanation}</p>
                        <p className="text-[10px] text-slate-400 pt-1">
                          <strong>Sumber Resmi:</strong> {post.sourceReference}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Verdict Buttons */}
                  <div className="pt-2 border-t border-slate-700/70">
                    <p className="text-[11px] font-semibold text-slate-400 mb-2">
                      Tentukan Keputusan Verifikasimu:
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'FAKTA', color: 'emerald' },
                        { label: 'HOAKS', color: 'rose' },
                        { label: 'BELUM_TERVERIFIKASI', text: 'BELUM JELAS', color: 'amber' },
                      ].map((item) => {
                        const isChosen = currentAnswer === item.label;
                        return (
                          <button
                            key={item.label}
                            onClick={() => setFactCheckAnswer(post.id, item.label)}
                            className={`py-2 px-1 rounded-xl text-[10px] sm:text-xs font-bold transition text-center ${
                              isChosen
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-slate-900 hover:bg-slate-750 text-slate-300 border border-slate-700'
                            }`}
                          >
                            {item.text || item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. DEMOCRACY MASTER QUIZ (12 SOAL HOTS KASUS PEMILU) */}
      {/* ============================================================ */}
      {activeGameTab === 'quiz' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Democracy Master Quiz • HOTS Class XII
              </span>
              <h2 className="text-2xl font-black text-white">
                Kuis Evaluasi Kompetensi Pemilih Pemula (12 Butir Soal)
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-800 text-cyan-300 border border-slate-700">
                Terjawab: {answeredQuizCount} / {QUIZ_QUESTIONS.length}
              </span>
            </div>
          </div>

          {/* Question Number Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {QUIZ_QUESTIONS.map((q, idx) => {
              const isCurrent = quizQuestionIndex === idx;
              const isAnswered = summativeAnswers[q.id] !== undefined;

              return (
                <button
                  key={q.id}
                  onClick={() => setQuizQuestionIndex(idx)}
                  className={`w-8 h-8 rounded-xl font-bold text-xs transition flex items-center justify-center border ${
                    isCurrent
                      ? 'bg-blue-600 text-white border-cyan-400 shadow-md'
                      : isAnswered
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                      : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Current Question Screen */}
          <div className="p-6 rounded-3xl bg-slate-800/50 border border-slate-700 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 font-bold border border-blue-500/30">
                Soal Nomor {quizQuestionIndex + 1} • {currentQuizQ.topic}
              </span>
              <span className="text-slate-400 font-semibold">
                Kompetensi: {currentQuizQ.competency}
              </span>
            </div>

            {currentQuizQ.caseContext && (
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700/80 text-xs sm:text-sm text-amber-200/90 leading-relaxed italic">
                <strong>Konteks Kasus:</strong> "{currentQuizQ.caseContext}"
              </div>
            )}

            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {currentQuizQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQuizQ.options.map((opt, optIdx) => {
                const isSelected = summativeAnswers[currentQuizQ.id] === optIdx;
                const isCorrect = optIdx === currentQuizQ.correctIndex;

                let optStyle =
                  'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-750';
                if (quizSubmitted) {
                  if (isCorrect) {
                    optStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optStyle = 'bg-rose-950 border-rose-500 text-rose-200 font-bold';
                  }
                } else if (isSelected) {
                  optStyle = 'bg-blue-600/30 border-cyan-400 text-white font-bold';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleAnswerQuiz(currentQuizQ.id, optIdx)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition flex items-center justify-between gap-3 ${optStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {quizSubmitted && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Immediate explanation if quiz submitted */}
            {quizSubmitted && (
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-1 text-xs animate-in fade-in">
                <span className="font-bold text-cyan-400">Rasional Pembahasan:</span>
                <p className="text-slate-300 leading-relaxed">
                  {currentQuizQ.explanation}
                </p>
              </div>
            )}

            {/* Question Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-700/60">
              <button
                onClick={() => setQuizQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={quizQuestionIndex === 0}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition ${
                  quizQuestionIndex > 0
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    : 'opacity-30 cursor-not-allowed text-slate-600'
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Sebelumnya
              </button>

              {!isLastQuestion ? (
                <button
                  onClick={() =>
                    setQuizQuestionIndex((prev) =>
                      Math.min(QUIZ_QUESTIONS.length - 1, prev + 1)
                    )
                  }
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1 transition"
                >
                  Selanjutnya <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={calculateFinalQuizScore}
                  disabled={answeredQuizCount < QUIZ_QUESTIONS.length}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                    answeredQuizCount >= QUIZ_QUESTIONS.length
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-black shadow-lg shadow-emerald-500/25'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  <Trophy className="w-4 h-4" />
                  Kirim Jawaban & Hitung Skor Akhir
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Candidate Modal Details */}
      {activeCandidateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          {(() => {
            const cand = FICTITIOUS_CANDIDATES.find((c) => c.id === activeCandidateModal);
            if (!cand) return null;

            return (
              <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="font-extrabold text-lg text-white">
                    Profil Lengkap Paslon 0{cand.number}
                  </h3>
                  <button
                    onClick={() => setActiveCandidateModal(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-cyan-400">Nama & Gelar:</span>
                    <p className="text-white text-sm font-semibold">{cand.name}</p>
                  </div>

                  <div>
                    <span className="font-bold text-amber-300">Visi & Misi Terdaftar:</span>
                    <p className="text-slate-300 italic mb-2">"{cand.vision}"</p>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      {cand.missions.map((m, mIdx) => (
                        <li key={mIdx}>{m}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                    <span className="font-bold text-emerald-400">
                      Transparansi & Sumber Dana Kampanye:
                    </span>
                    <p className="text-slate-300">{cand.fundingTransparency}</p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setActiveCandidateModal(null)}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                  >
                    Tutup Profil
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

    </div>
  );
};
