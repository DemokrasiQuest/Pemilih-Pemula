/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Eye,
  FileText,
  Headphones,
  HelpCircle,
  Lightbulb,
  Maximize2,
  Mic,
  Pause,
  Play,
  RotateCcw,
  Scale,
  Share2,
  Sparkles,
  Tv,
  Volume2,
  VolumeX,
  XCircle,
  Youtube,
  Zap,
} from 'lucide-react';
import { MATERI_BAB_7 } from '../data/learningData';
import { useApp } from '../context/AppContext';
import { DifferentiatedMode } from '../types';

export const ExploreMateri: React.FC = () => {
  const {
    miniQuizScores,
    setMiniQuizScore,
    speakText,
    stopSpeech,
    isAudioSpeaking,
    setActiveTab,
    triggerConfetti,
    preferredModality,
    setPreferredModality,
    profile,
  } = useApp();

  const [activeMateriIndex, setActiveMateriIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Active modality inside current materi: 'visual' | 'reading' | 'audio' | 'video'
  const [activeModality, setActiveModality] = useState<DifferentiatedMode>(preferredModality || 'visual');

  // Podcast player local state
  const [isPodcastPlaying, setIsPodcastPlaying] = useState(false);
  const [currentScriptIndex, setCurrentScriptIndex] = useState(0);

  const currentMateri = MATERI_BAB_7[activeMateriIndex];
  const hasCompletedQuiz = miniQuizScores[currentMateri.id] !== undefined;

  const handleSelectOption = (idx: number) => {
    if (quizSubmitted || hasCompletedQuiz) return;
    setSelectedQuizOption(idx);
  };

  const handleCheckQuiz = () => {
    if (selectedQuizOption === null) return;
    setQuizSubmitted(true);
    const isCorrect = selectedQuizOption === currentMateri.miniQuiz.correctIndex;
    if (isCorrect) {
      setMiniQuizScore(currentMateri.id, 100);
      triggerConfetti();
    } else {
      setMiniQuizScore(currentMateri.id, 50);
    }
  };

  const handleSwitchModality = (mode: DifferentiatedMode) => {
    setActiveModality(mode);
    setPreferredModality(mode);
    stopSpeech();
    setIsPodcastPlaying(false);
  };

  const handleNextMateri = () => {
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    stopSpeech();
    setIsPodcastPlaying(false);
    if (activeMateriIndex < MATERI_BAB_7.length - 1) {
      setActiveMateriIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab('investigasi');
    }
  };

  const handlePrevMateri = () => {
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    stopSpeech();
    setIsPodcastPlaying(false);
    if (activeMateriIndex > 0) {
      setActiveMateriIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePlayPodcastScript = () => {
    if (isAudioSpeaking || isPodcastPlaying) {
      stopSpeech();
      setIsPodcastPlaying(false);
    } else {
      setIsPodcastPlaying(true);
      // Combine script lines for narration
      const fullNarration = currentMateri.podcastAudio.script
        .map((line) => `${line.speaker}: ${line.text}`)
        .join('. ');
      speakText(
        `Episode Podcast Demokrasi: ${currentMateri.podcastAudio.episodeTitle}. Dipandu oleh ${currentMateri.podcastAudio.hosts}. ${fullNarration}`
      );
    }
  };

  const handleReadAloudMateri = () => {
    if (isAudioSpeaking) {
      stopSpeech();
    } else {
      const summaryText = `${currentMateri.code}: ${currentMateri.title}. ${currentMateri.summary}. Contoh nyata: ${currentMateri.realLifeExample}`;
      speakText(summaryText);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* ========================================================================= */}
      {/* 1. TOP BANNER & 5 SUBTOPIK SELECTOR */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
            <BookOpen className="w-4 h-4" />
            Jelajah Materi Kurikulum Merdeka • Bab 7
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReadAloudMateri}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition ${
                isAudioSpeaking
                  ? 'bg-rose-600 text-white border-rose-400 animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border-slate-700'
              }`}
            >
              {isAudioSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              {isAudioSpeaking ? 'Hentikan Audio' : 'Dengarkan Ringkasan UDL'}
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Menjadi Pelopor Pemilih Pemula dalam Demokrasi Indonesia
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed mt-1">
            Pilih subtopik di bawah ini, lalu pilih <strong>Gaya Belajar Diferensiasi</strong> yang paling nyaman bagi Anda (Visual, Membaca Teks, Podcast Audio, atau Video YouTube).
          </p>
        </div>

        {/* 5 Subtopik Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {MATERI_BAB_7.map((m, idx) => {
            const isActive = activeMateriIndex === idx;
            const isCompleted = miniQuizScores[m.id] !== undefined;

            return (
              <button
                key={m.id}
                onClick={() => {
                  setActiveMateriIndex(idx);
                  setSelectedQuizOption(null);
                  setQuizSubmitted(false);
                  stopSpeech();
                  setIsPodcastPlaying(false);
                }}
                className={`p-3 rounded-2xl text-left border transition relative flex flex-col justify-between ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-cyan-400 shadow-lg shadow-blue-500/20'
                    : isCompleted
                    ? 'bg-slate-800/80 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase">
                    {m.code}
                  </span>
                  {isCompleted && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </div>
                <p className="text-xs font-bold leading-tight mt-1 line-clamp-2">
                  {m.title}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DIFFERENTIATED LEARNING MODALITY BAR (DIFERENSIASI PEMBELAJARAN) */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Pilihan Media Pembelajaran Berdiferensiasi (DUP / UDL):
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Preferensi saat ini: <strong className="text-cyan-300 capitalize">{activeModality}</strong> (otomatis terekam ke Rapor Guru)
          </span>
        </div>

        {/* 4 Differentiated Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {/* 1. Visual */}
          <button
            type="button"
            onClick={() => handleSwitchModality('visual')}
            className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
              activeModality === 'visual'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-300 shadow-md shadow-blue-500/20'
                : 'bg-slate-800/70 hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              activeModality === 'visual' ? 'bg-white/20 text-white' : 'bg-blue-500/10 text-cyan-400'
            }`}>
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-cyan-200">
                Gaya Visual
              </span>
              <span className="font-bold text-xs sm:text-sm">
                Infografis & Poster
              </span>
            </div>
          </button>

          {/* 2. Reading */}
          <button
            type="button"
            onClick={() => handleSwitchModality('reading')}
            className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
              activeModality === 'reading'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white border-amber-300 shadow-md shadow-amber-500/20'
                : 'bg-slate-800/70 hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              activeModality === 'reading' ? 'bg-white/20 text-white' : 'bg-amber-500/10 text-amber-400'
            }`}>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-amber-200">
                Suka Membaca
              </span>
              <span className="font-bold text-xs sm:text-sm">
                Full Artikel & Regulasi
              </span>
            </div>
          </button>

          {/* 3. Audio / Podcast */}
          <button
            type="button"
            onClick={() => handleSwitchModality('audio')}
            className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
              activeModality === 'audio'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-300 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800/70 hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              activeModality === 'audio' ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-400'
            }`}>
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-emerald-200">
                Gaya Auditori
              </span>
              <span className="font-bold text-xs sm:text-sm">
                Podcast & Narasi Suara
              </span>
            </div>
          </button>

          {/* 4. Video YouTube */}
          <button
            type="button"
            onClick={() => handleSwitchModality('video')}
            className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
              activeModality === 'video'
                ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white border-rose-300 shadow-md shadow-rose-500/20'
                : 'bg-slate-800/70 hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              activeModality === 'video' ? 'bg-white/20 text-white' : 'bg-rose-500/10 text-rose-400'
            }`}>
              <Youtube className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-rose-200">
                Audio-Visual
              </span>
              <span className="font-bold text-xs sm:text-sm">
                Video Edukasi YouTube
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. DYNAMIC CONTENT RENDERING BASED ON CHOSEN MODALITY */}
      {/* ========================================================================= */}
      
      {/* ------------------------------------------------------------------------- */}
      {/* A. MODALITY: VISUAL (INFOGRAFIS & POSTER BAGAN) */}
      {/* ------------------------------------------------------------------------- */}
      {activeModality === 'visual' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-8 shadow-2xl animate-in fade-in duration-200">
          <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-cyan-400" />
                Format Visual • Infografis & Pemetaan Konsep
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {currentMateri.visualInfographic.title}
              </h2>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-cyan-950/80 text-cyan-300 font-bold text-xs border border-cyan-800 self-start sm:self-auto">
              {currentMateri.visualInfographic.badge}
            </span>
          </div>

          {/* Visual Concept Map Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentMateri.visualInfographic.conceptMap.map((card, cIdx) => (
              <div
                key={cIdx}
                className="p-5 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900 border border-slate-700/80 space-y-2.5 relative overflow-hidden group hover:border-cyan-400 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 border border-cyan-500/30">
                    {card.tag}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-cyan-400 transition">
                    #0{cIdx + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Infographic Poster Takeaway Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/60 via-indigo-950/60 to-cyan-950/60 border border-cyan-500/40 space-y-3">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Pesan Kunci Poster Edukasi (Takeaway Visual):
            </div>
            <p className="text-sm sm:text-base text-white font-medium italic leading-relaxed">
              "{currentMateri.visualInfographic.posterTakeaway}"
            </p>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* B. MODALITY: READING (FULL TULISAN ARTIKEL & KAJIAN REGULASI) */}
      {/* ------------------------------------------------------------------------- */}
      {activeModality === 'reading' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-8 shadow-2xl animate-in fade-in duration-200">
          <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-400" />
                Format Membaca Komprehensif • Telaah Konstitusi & Regulasi
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {currentMateri.readingArticle.fullTitle}
              </h2>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-amber-950/80 text-amber-300 font-bold text-xs border border-amber-800 self-start sm:self-auto">
              ⏱ Estimasi Waktu Baca: {currentMateri.readingArticle.readingTime}
            </span>
          </div>

          {/* Constitutional Law Basis Cards */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400" />
              Landasan Konstitusional & Yuridis:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentMateri.readingArticle.constitutionalBasis.map((law, lIdx) => (
                <div
                  key={lIdx}
                  className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/40 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-amber-300">{law.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-900/50 text-amber-200">
                      {law.pasal}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 italic">
                    "{law.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Reading Sections */}
          <div className="space-y-6">
            {currentMateri.readingArticle.sections.map((sec, sIdx) => (
              <div
                key={sIdx}
                className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-3"
              >
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-extrabold flex items-center justify-center">
                    {sIdx + 1}
                  </span>
                  {sec.heading}
                </h3>

                <div className="space-y-2.5">
                  {sec.paragraphs.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {sec.citation && (
                  <div className="pt-2 text-[11px] text-slate-400 italic border-t border-slate-700/60">
                    Sumber Rujukan: {sec.citation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* C. MODALITY: AUDITORI (PODCAST & DIALOG REKAMAN SUARA) */}
      {/* ------------------------------------------------------------------------- */}
      {activeModality === 'audio' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-8 shadow-2xl animate-in fade-in duration-200">
          <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Headphones className="w-4 h-4 text-emerald-400" />
                Format Auditori • Podcast Suara Demokrasi Pelajar
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {currentMateri.podcastAudio.episodeTitle}
              </h2>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 font-bold text-xs border border-emerald-800 self-start sm:self-auto">
              🎙 Host: {currentMateri.podcastAudio.hosts} • Durasi: {currentMateri.podcastAudio.duration}
            </span>
          </div>

          {/* Interactive Podcast Audio Player Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/50 via-slate-900 to-teal-950/50 border border-emerald-600/40 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handlePlayPodcastScript}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-slate-950 font-black shadow-xl transition cursor-pointer ${
                    isPodcastPlaying
                      ? 'bg-rose-500 hover:bg-rose-400 text-white animate-pulse'
                      : 'bg-emerald-400 hover:bg-emerald-300 text-slate-950'
                  }`}
                  aria-label={isPodcastPlaying ? 'Jeda Podcast' : 'Putar Podcast'}
                >
                  {isPodcastPlaying ? (
                    <Pause className="w-7 h-7" />
                  ) : (
                    <Play className="w-7 h-7 ml-1" />
                  )}
                </button>

                <div>
                  <h3 className="font-extrabold text-base text-white">
                    {isPodcastPlaying ? 'Sedang Memutar Audio Podcast...' : 'Siap Diputar (Web Audio Speech)'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {currentMateri.podcastAudio.summary}
                  </p>
                </div>
              </div>

              {/* Visual Audio Frequency Bars Simulation */}
              <div className="flex items-end gap-1 h-8 px-3 py-1 rounded-xl bg-slate-950/60 border border-slate-800">
                {[40, 70, 100, 60, 90, 45, 80, 95, 55, 75, 85, 30].map((h, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isPodcastPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'
                    }`}
                    style={{ height: isPodcastPlaying ? `${h}%` : '25%' }}
                  />
                ))}
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
              <span>Fitur Text-to-Speech Inklusif (UDL) Bahasa Indonesia</span>
              <span className="text-emerald-400 font-semibold">Tersinkronisasi Otomatis</span>
            </div>
          </div>

          {/* Full Podcast Dialogue Script */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Mic className="w-4 h-4 text-emerald-400" />
              Transkrip Skrip Dialog Lengkap Podcast:
            </h3>

            <div className="space-y-3">
              {currentMateri.podcastAudio.script.map((line, sIdx) => (
                <div
                  key={sIdx}
                  className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-1 hover:border-emerald-500/40 transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-emerald-300">
                      {line.speaker}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      ({line.role})
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    "{line.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* D. MODALITY: VIDEO (MEDIA VIDEO YOUTUBE TERINTEGRASI) */}
      {/* ------------------------------------------------------------------------- */}
      {activeModality === 'video' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-8 shadow-2xl animate-in fade-in duration-200">
          <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <Youtube className="w-4 h-4 text-rose-400" />
                Format Audio-Visual • Video Pembelajaran YouTube Terintegrasi
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {currentMateri.youtubeVideo.title}
              </h2>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-rose-950/80 text-rose-300 font-bold text-xs border border-rose-800 self-start sm:self-auto">
              📺 Channel: {currentMateri.youtubeVideo.channel} • Durasi: {currentMateri.youtubeVideo.duration}
            </span>
          </div>

          {/* YouTube Video Embed Player */}
          <div className="space-y-3">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl">
              <iframe
                src={currentMateri.youtubeVideo.embedUrl}
                title={currentMateri.youtubeVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Pemutar Video Pembelajaran Terkurasi untuk Siswa SMA</span>
              <a
                href={currentMateri.youtubeVideo.embedUrl.replace('/embed/', '/watch?v=')}
                target="_blank"
                rel="noreferrer"
                className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
              >
                <span>Buka di YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Video Summary Takeaway */}
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-2">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-400" />
              Rangkuman Intisari Video Pembelajaran:
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentMateri.youtubeVideo.videoSummary}
            </p>
          </div>

          {/* Discussion Questions from Video */}
          <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-800/40 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-rose-300 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-rose-400" />
              Pertanyaan Diskusi Kritis Pasca Menonton:
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
              {currentMateri.youtubeVideo.discussionQuestions.map((q, qIdx) => (
                <li key={qIdx} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. REAL-LIFE CONTEXTUAL EXAMPLE */}
      {/* ========================================================================= */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/30 to-slate-900 border border-amber-800/40 space-y-2">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <Lightbulb className="w-4 h-4" />
          Contoh Kontekstual Nyata untuk Pelajar SMA:
        </div>
        <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
          "{currentMateri.realLifeExample}"
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 5. MINI QUIZ INTERAKTIF PER SUBTOPIK */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-base text-white">
              Mini Quiz Pemahaman ({currentMateri.code})
            </h3>
          </div>
          {hasCompletedQuiz && (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-xl border border-emerald-800">
              Nilai: {miniQuizScores[currentMateri.id]}/100
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm font-semibold text-slate-200">
          {currentMateri.miniQuiz.question}
        </p>

        <div className="space-y-2.5">
          {currentMateri.miniQuiz.options.map((opt, optIdx) => {
            const isSelected = selectedQuizOption === optIdx;
            const isCorrect = optIdx === currentMateri.miniQuiz.correctIndex;
            const showResult = quizSubmitted || hasCompletedQuiz;

            let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-750';
            if (showResult) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
              }
            } else if (isSelected) {
              btnStyle = 'bg-blue-600/30 border-cyan-400 text-white font-bold';
            }

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition flex items-center justify-between gap-3 ${btnStyle}`}
              >
                <span>{opt}</span>
                {showResult && isCorrect && (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Quiz Action / Explanation */}
        {!hasCompletedQuiz && !quizSubmitted ? (
          <button
            type="button"
            disabled={selectedQuizOption === null}
            onClick={handleCheckQuiz}
            className={`w-full py-3 rounded-2xl font-bold text-xs transition flex items-center justify-center gap-2 ${
              selectedQuizOption !== null
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:brightness-110 cursor-pointer shadow-lg shadow-blue-500/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Periksa Jawaban Quiz (+50 XP)</span>
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800 text-xs text-blue-200 space-y-1">
            <span className="font-bold text-cyan-300">Penjelasan Rasional Kunci Jawaban:</span>
            <p className="text-slate-300">{currentMateri.miniQuiz.explanation}</p>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 6. BOTTOM NAVIGATION (PREV & NEXT SUBTOPIK) */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
        <button
          type="button"
          disabled={activeMateriIndex === 0}
          onClick={handlePrevMateri}
          className={`px-5 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition ${
            activeMateriIndex === 0
              ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
              : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Subtopik Sebelumnya</span>
        </button>

        <span className="text-xs text-slate-400">
          Subtopik {activeMateriIndex + 1} dari {MATERI_BAB_7.length}
        </span>

        <button
          type="button"
          onClick={handleNextMateri}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold hover:brightness-110 shadow-lg shadow-blue-500/30 transition flex items-center gap-2"
        >
          <span>
            {activeMateriIndex < MATERI_BAB_7.length - 1
              ? 'Lanjut Subtopik Berikutnya'
              : 'Menuju Lab Investigasi Kasus'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
