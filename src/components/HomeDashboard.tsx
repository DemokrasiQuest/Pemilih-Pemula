/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Compass,
  FileCheck2,
  Flame,
  Gamepad2,
  Layers,
  Lightbulb,
  Play,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Vote,
  Zap,
} from 'lucide-react';
import { BADGES_LIST } from '../data/learningData';
import { getLevelTitle, useApp } from '../context/AppContext';

export const HomeDashboard: React.FC = () => {
  const {
    profile,
    setActiveTab,
    udlSettings,
    speakText,
    triggerConfetti,
    resetProgress,
  } = useApp();

  const handleStartAdventure = () => {
    setActiveTab('misi_pbl');
    triggerConfetti();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 border border-blue-800/40 p-6 sm:p-10 shadow-2xl">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              Pendidikan Pancasila Kelas XII • Bab 7
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              SIAP MENJADI{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-200 bg-clip-text text-transparent">
                PELOPOR DEMOKRASI?
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              Jelajahi dunia demokrasi, pecahkan tantangan, dan buktikan bahwa generasi muda mampu menjadi pemilih cerdas untuk masa depan Indonesia. Kuasai asas LUBER JURDIL, tangkal hoaks politik, dan tolak politik uang!
            </p>

            {/* CTA Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleStartAdventure}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                MULAI PETUALANGAN (MISI PBL)
              </button>

              <button
                onClick={() => setActiveTab('materi')}
                className="px-5 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition flex items-center gap-2 hover:text-white"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                JELAJAHI MATERI BAB 7
              </button>

              <button
                onClick={() => setActiveTab('games')}
                className="px-5 py-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-sm border border-amber-500/30 transition flex items-center gap-2"
              >
                <Vote className="w-4 h-4 text-amber-400" />
                SIMULASI BILIK SUARA
              </button>
            </div>
          </div>

          {/* Gamified Citizen Profile Card in Hero */}
          <div className="lg:col-span-4">
            <div className="p-5 rounded-3xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 shadow-2xl relative space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center font-black text-slate-950 text-base shadow-lg shadow-amber-500/20">
                    L{profile.level}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{profile.name}</h3>
                    <p className="text-xs text-amber-400 font-medium">
                      {getLevelTitle(profile.level)}
                    </p>
                    <p className="text-[10px] text-slate-400">{profile.school}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-xs font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-xl border border-cyan-800">
                  <Zap className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                  {profile.xp} XP
                </span>
              </div>

              {/* Level XP Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Progres Menuju Level {Math.min(5, profile.level + 1)}</span>
                  <span className="text-white font-bold">{profile.xp % 300} / 300 XP</span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(100, ((profile.xp % 300) / 300) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Badges preview */}
              <div className="pt-1">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    Lencana Demokrasi ({profile.unlockedBadges.length}/5)
                  </span>
                  <button
                    onClick={() => setActiveTab('refleksi')}
                    className="text-[11px] text-cyan-400 hover:underline"
                  >
                    Semua
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {BADGES_LIST.map((b) => {
                    const isUnlocked = profile.unlockedBadges.includes(b.id);
                    return (
                      <div
                        key={b.id}
                        className={`aspect-square rounded-xl flex items-center justify-center border transition relative group cursor-pointer ${
                          isUnlocked
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 shadow-sm'
                            : 'bg-slate-800/40 border-slate-800 text-slate-600'
                        }`}
                        title={`${b.name}: ${b.title} (${isUnlocked ? 'Terbuka' : 'Terkunci: ' + b.requiredXP + ' XP'})`}
                      >
                        <Award className="w-4 h-4" />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Partisipasi Belajar:</span>
                <span className="font-bold text-emerald-400">
                  {Math.round((profile.completedSections.length / 9) * 100)}% Tuntas
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Strategic Pillars of Deep Learning & PBL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Problem Based Learning */}
        <div
          onClick={() => setActiveTab('misi_pbl')}
          className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group shadow-lg hover:shadow-blue-500/10 space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition">
            <Layers className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Model Utama
              </span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition" />
            </div>
            <h3 className="font-bold text-lg text-white">Problem Based Learning</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pecahkan masalah nyata: hoaks politik, amplop politik uang, dan apatisme suara pemuda melalui 5 tahapan investigasi terpadu.
            </p>
          </div>
          <div className="pt-2 text-xs font-semibold text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
            Buka Misi PBL <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Deep Learning */}
        <div
          onClick={() => setActiveTab('orientasi')}
          className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group shadow-lg hover:shadow-cyan-500/10 space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Prinsip Belajar
              </span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition" />
            </div>
            <h3 className="font-bold text-lg text-white">Pembelajaran Mendalam</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Berkesadaran (tujuan jelas), Bermakna (koneksi nyata Gen Z), dan Menggembirakan (interaktif gamified tanpa rasa takut gagal).
            </p>
          </div>
          <div className="pt-2 text-xs font-semibold text-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all">
            Lihat Orientasi & Diagnostik <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: UDL Inclusivity */}
        <div
          onClick={() => setActiveTab('games')}
          className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group shadow-lg hover:shadow-amber-500/10 space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Simulasi Interaktif
              </span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition" />
            </div>
            <h3 className="font-bold text-lg text-white">Democracy Challenge</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mainkan simulasi bilik suara dengan 3 kandidat fiktif berimbang, lab cek fakta media sosial, dan 12 kuis HOTS pemilu berintegritas.
            </p>
          </div>
          <div className="pt-2 text-xs font-semibold text-amber-400 flex items-center gap-1 group-hover:gap-2 transition-all">
            Mulai Permainan <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Differentiated Learning Showcase Bar (DUP / UDL) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-slate-900 border border-indigo-800/40 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Diferensiasi Pembelajaran Bab 7 (Desain Universal untuk Pembelajaran / UDL)
            </div>
            <h3 className="text-xl font-bold text-white mt-1.5">
              Pilih Gaya Belajar Favoritmu untuk Menguasai Materi
            </h3>
            <p className="text-xs text-slate-300">
              Setiap subtopik dirancang dalam 4 representasi materi fleksibel yang otomatis tersinkronisasi ke laporan guru:
            </p>
          </div>
          <button
            onClick={() => setActiveTab('materi')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-cyan-500 text-white font-bold text-xs transition shadow-md self-start sm:self-auto cursor-pointer"
          >
            Buka Materi Berdiferensiasi &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          <div
            onClick={() => setActiveTab('materi')}
            className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 hover:border-cyan-400 transition cursor-pointer space-y-1.5 group"
          >
            <div className="text-2xl">🎨</div>
            <h4 className="font-bold text-xs text-white group-hover:text-cyan-300 transition">
              Infografis Visual
            </h4>
            <p className="text-[11px] text-slate-400 leading-snug">
              Bagan konsep arsitektur demokrasi & poster infografik untuk tipe visual.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('materi')}
            className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 hover:border-amber-400 transition cursor-pointer space-y-1.5 group"
          >
            <div className="text-2xl">📖</div>
            <h4 className="font-bold text-xs text-white group-hover:text-amber-300 transition">
              Full Tulisan & Regulasi
            </h4>
            <p className="text-[11px] text-slate-400 leading-snug">
              Kajian mendalam pasal UUD 1945 & UU No. 7/2017 bagi yang gemar membaca.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('materi')}
            className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 hover:border-emerald-400 transition cursor-pointer space-y-1.5 group"
          >
            <div className="text-2xl">🎧</div>
            <h4 className="font-bold text-xs text-white group-hover:text-emerald-300 transition">
              Podcast Suara Edukasi
            </h4>
            <p className="text-[11px] text-slate-400 leading-snug">
              Rekaman audio dialog interaktif murid & guru untuk gaya belajar auditori.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('materi')}
            className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 hover:border-rose-400 transition cursor-pointer space-y-1.5 group"
          >
            <div className="text-2xl">🎬</div>
            <h4 className="font-bold text-xs text-white group-hover:text-rose-300 transition">
              Video YouTube Terintegrasi
            </h4>
            <p className="text-[11px] text-slate-400 leading-snug">
              Tayangan video kurasi dengan rangkuman inti dan pertanyaan diskusi kritis.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Quest Matrix: 5 PBL Steps */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-400" />
              Peta Misi Problem Based Learning (PBL) Bab 7
            </h2>
            <p className="text-xs text-slate-400">
              Selesaikan 5 tahapan pemecahan masalah autentik untuk meraih predikat Pelopor Pemilih Cerdas
            </p>
          </div>
          <button
            onClick={() => setActiveTab('misi_pbl')}
            className="text-xs font-bold px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition self-start sm:self-auto"
          >
            Buka Alur Lengkap PBL &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            {
              step: 1,
              title: 'Orientasi Masalah',
              desc: 'Pahami dilema pemilih muda, hoaks, & suap',
              badge: 'Kasus Autentik',
            },
            {
              step: 2,
              title: 'Organisasi Belajar',
              desc: 'Bentuk tim, bagi peran, isi LKPD digital',
              badge: 'Tim & Peran',
            },
            {
              step: 3,
              title: 'Penyelidikan Lab',
              desc: 'Analisis bukti hukum & 3 kandidat fiktif',
              badge: 'Lab Riset',
            },
            {
              step: 4,
              title: 'Proyek Solusi',
              desc: 'Buat poster/infografik kampanye cerdas',
              badge: 'Karya Nyata',
            },
            {
              step: 5,
              title: 'Evaluasi & Refleksi',
              desc: 'Peer assessment & Ikrar Duta Pemilih',
              badge: 'Sertifikat',
            },
          ].map((item) => (
            <div
              key={item.step}
              onClick={() => setActiveTab('misi_pbl')}
              className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 transition cursor-pointer group flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-cyan-400 font-extrabold text-xs flex items-center justify-center">
                    {item.step}
                  </span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                    {item.badge}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-white group-hover:text-cyan-300 transition">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {item.desc}
                </p>
              </div>
              <div className="text-[10px] font-bold text-cyan-400 flex items-center gap-1">
                Jalankan Misi &rarr;
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Progress / Data Management Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Progres tersimpan otomatis di perangkatmu (Local Storage). Tidak memerlukan login server.</span>
        </div>
        <button
          onClick={() => {
            if (window.confirm('Apakah kamu yakin ingin mengulang seluruh progres belajar dari awal?')) {
              resetProgress();
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-rose-500/10 text-rose-400 border border-rose-500/20 transition font-semibold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Progres Belajar
        </button>
      </div>

    </div>
  );
};
