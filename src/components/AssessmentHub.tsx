/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  FileCheck2,
  FileQuestion,
  HelpCircle,
  Layers,
  Scale,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';
import { RUBRIK_PENILAIAN } from '../data/learningData';
import { useApp } from '../context/AppContext';

export const AssessmentHub: React.FC = () => {
  const {
    profile,
    miniQuizScores,
    factCheckAnswers,
    challengeProgress,
    diagnosticAnswers,
    summativeAnswers,
    setActiveTab,
  } = useApp();

  const [activeAssessTab, setActiveAssessTab] = useState<
    'diagnostik' | 'formatif' | 'kinerja' | 'sumatif'
  >('formatif');

  // Calculate formatif completion stats
  const miniQuizDoneCount = Object.keys(miniQuizScores).length;
  const factCheckDoneCount = Object.keys(factCheckAnswers).length;
  const challengeDoneCount = Object.keys(challengeProgress).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
            <FileCheck2 className="w-4 h-4" />
            Sistem Asesmen Terintegrasi Kurikulum Merdeka
          </div>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-800">
            Asesmen Berkesadaran & Berkelanjutan
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Pusat Asesmen Diagnostik, Formatif, Kinerja & Sumatif
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Asesmen bukan sekadar mencari nilai angka akhir, melainkan sarana refleksi untuk melihat sejauh mana pemahaman kedaulatan rakyat dan karakter pemilih berintegritas telah tertanam dalam dirimu.
        </p>

        {/* 4 Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {[
            { id: 'formatif', label: '1. Asesmen Formatif', icon: Layers, badge: 'Proses Belajar' },
            { id: 'kinerja', label: '2. Asesmen Kinerja', icon: Scale, badge: 'Rubrik Produk' },
            { id: 'sumatif', label: '3. Asesmen Sumatif', icon: Trophy, badge: '12 Soal HOTS' },
            { id: 'diagnostik', label: '4. Asesmen Diagnostik', icon: FileQuestion, badge: 'Kesiapan Awal' },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeAssessTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveAssessTab(item.id as any)}
                className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-cyan-400 shadow-lg shadow-blue-500/25 font-bold'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/60 hover:text-white font-medium'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                  <div>
                    <p className="text-xs font-bold leading-tight">{item.label}</p>
                    <p className="text-[10px] opacity-75">{item.badge}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. ASESMEN FORMATIF */}
      {/* ============================================================ */}
      {activeAssessTab === 'formatif' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Rekap Capaian Formatif Selama Pembelajaran
            </span>
            <h2 className="text-2xl font-black text-white mt-1">
              Portofolio Asesmen Formatif Berkelanjutan
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Memantau keterlibatan aktifmu dalam mini quiz materi, fact-checking, dan simulasi skenario.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Mini Quiz status */}
            <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Mini Quiz 5 Subtopik</span>
                <span className="text-xs font-bold text-cyan-400">{miniQuizDoneCount}/5</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400 rounded-full"
                  style={{ width: `${(miniQuizDoneCount / 5) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Menguji pemahaman konsep per sub-bab materi.
              </p>
            </div>

            {/* Fact Check status */}
            <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Detektif Cek Fakta</span>
                <span className="text-xs font-bold text-emerald-400">
                  {factCheckDoneCount}/5 Post
                </span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full"
                  style={{ width: `${(factCheckDoneCount / 5) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Ketelitian mendeteksi disinformasi di media sosial.
              </p>
            </div>

            {/* Challenge status */}
            <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Democracy Challenge</span>
                <span className="text-xs font-bold text-amber-400">
                  {challengeDoneCount}/2 Skenario
                </span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${(challengeDoneCount / 2) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Keteguhan moral saat menghadapi dilema politik uang.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveTab('games')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
            >
              Buka Game Center untuk Melengkapi Formatif &rarr;
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. ASESMEN KINERJA (RUBRIK PENILAIAN AUTENTIK) */}
      {/* ============================================================ */}
      {activeAssessTab === 'kinerja' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Asesmen Kinerja Produk & Proses Belajar
            </span>
            <h2 className="text-2xl font-black text-white mt-1">
              Rubrik Penilaian Autentik Karya Pemilih Cerdas
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Digunakan oleh guru dan rekan sejawat untuk menilai kualitas solusi, analisis masalah, dan orisinalitas produk.
            </p>
          </div>

          <div className="space-y-4">
            {RUBRIK_PENILAIAN.map((rubrik, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-sm text-white">
                    {idx + 1}. {rubrik.aspek}
                  </h3>
                  <span className="text-xs font-black text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-800">
                    Bobot: {rubrik.bobot}
                  </span>
                </div>
                <p className="text-xs text-slate-300 italic">{rubrik.indikator}</p>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
                    <span className="font-extrabold text-emerald-300">Skor 4 (Sangat Baik)</span>
                    <p className="text-slate-300 text-[11px] leading-snug">{rubrik.skor4}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/40 space-y-1">
                    <span className="font-extrabold text-cyan-300">Skor 3 (Baik)</span>
                    <p className="text-slate-300 text-[11px] leading-snug">{rubrik.skor3}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 space-y-1">
                    <span className="font-extrabold text-amber-300">Skor 2 (Cukup)</span>
                    <p className="text-slate-300 text-[11px] leading-snug">{rubrik.skor2}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-1">
                    <span className="font-extrabold text-rose-300">Skor 1 (Perlu Bimbingan)</span>
                    <p className="text-slate-300 text-[11px] leading-snug">{rubrik.skor1}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. ASESMEN SUMATIF */}
      {/* ============================================================ */}
      {activeAssessTab === 'sumatif' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Asesmen Sumatif Akhir Bab 7
            </span>
            <h2 className="text-2xl font-black text-white mt-1">
              Tes Evaluasi Akhir: 12 Soal Pilihan Ganda Berbasis HOTS
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Mengukur penalaran tingkat tinggi (C4, C5, C6) terkait hak dan kewajiban pemilih pemula.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="font-bold text-lg text-white">Status Asesmen Sumatifmu:</h3>
              {profile.summativeScore !== null ? (
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-cyan-400">
                    {profile.summativeScore} / 100
                  </span>
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-950/80 px-3 py-1 rounded-xl border border-emerald-800">
                    {profile.summativeScore >= 75 ? 'Tuntas Memuaskan' : 'Tuntas Cukup'}
                  </span>
                </div>
              ) : (
                <p className="text-xs text-slate-400">
                  Kamu belum menyelesaikan seluruh soal tes akhir di Game Center.
                </p>
              )}
            </div>

            <button
              onClick={() => setActiveTab('games')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/20 hover:scale-105 transition"
            >
              {profile.summativeScore !== null ? 'Buka Lembar Review Soal' : 'Mulai Tes Sumatif Sekarang'}
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. ASESMEN DIAGNOSTIK */}
      {/* ============================================================ */}
      {activeAssessTab === 'diagnostik' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Asesmen Diagnostik Awal
            </span>
            <h2 className="text-2xl font-black text-white mt-1">
              Pemetaan Kesiapan Belajar & Sikap Awal
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Melihat kondisi pengetahuan dan respon afektif peserta didik sebelum memulai materi Bab 7.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Status Diagnostik:</span>
              <span className="text-xs font-bold text-emerald-400">
                {profile.diagnosticCompleted ? 'Sudah Tuntas (+60 XP)' : 'Belum Dikerjakan'}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Pertanyaan diagnostik dapat diakses dan diperbarui sewaktu-waktu di menu <strong>Orientasi Belajar</strong>.
            </p>
            <button
              onClick={() => setActiveTab('orientasi')}
              className="text-xs font-bold text-cyan-400 hover:underline pt-1 inline-block"
            >
              Buka Halaman Orientasi Belajar &rarr;
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
