/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  Download,
  Image,
  Layers,
  Layout,
  Lightbulb,
  Palette,
  Printer,
  Save,
  Share2,
  Sparkles,
  Type,
  Vote,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProjectStudio: React.FC = () => {
  const {
    lkpdData,
    updateLKPD,
    profile,
    addXP,
    unlockBadge,
    triggerConfetti,
    setActiveTab,
  } = useApp();

  // Poster builder interactive state
  const [posterTitle, setPosterTitle] = useState(
    lkpdData.solutionTitle || 'SUARA MUDA: CERDAS, KRITIS, TOLAK SUAP!'
  );
  const [posterTagline, setPosterTagline] = useState(
    '1 Suaramu Menentukan 5 Tahun Arah Masa Depan Indonesia'
  );
  const [pillar1, setPillar1] = useState('1. Cek Rekam Jejak & Visi Misi Calon');
  const [pillar2, setPillar2] = useState('2. Tolak Keras Serangan Fajar & Politik Uang');
  const [pillar3, setPillar3] = useState('3. Saring Sebelum Sharing: Berantas Hoaks');
  const [posterTheme, setPosterTheme] = useState<'cyan' | 'amber' | 'rose' | 'emerald'>('cyan');
  const [callToAction, setCallToAction] = useState(
    'Ayo Hadir ke TPS & Gunakan Hak Pilihmu Secara Merdeka!'
  );
  const [isSaved, setIsSaved] = useState(false);

  const themeStyles = {
    cyan: {
      bg: 'from-slate-950 via-blue-950 to-indigo-950 border-cyan-500/50',
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      accent: 'text-cyan-400',
    },
    amber: {
      bg: 'from-slate-950 via-amber-950 to-slate-900 border-amber-500/50',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      accent: 'text-amber-400',
    },
    rose: {
      bg: 'from-slate-950 via-rose-950 to-slate-900 border-rose-500/50',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      accent: 'text-rose-400',
    },
    emerald: {
      bg: 'from-slate-950 via-emerald-950 to-slate-900 border-emerald-500/50',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      accent: 'text-emerald-400',
    },
  };

  const handleSavePoster = () => {
    updateLKPD({
      solutionTitle: posterTitle,
      solutionDescription: `${posterTagline} • Pilar: ${pillar1} | ${pillar2} | ${pillar3} • Ajakan: ${callToAction}`,
    });
    setIsSaved(true);
    addXP(80, 'Merancang Poster Solusi Kampanye Demokrasi');
    unlockBadge('badge-champion');
    triggerConfetti();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-800/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
            <Lightbulb className="w-4 h-4" />
            Studio Proyek Solusi Pemilih Pemula (UDL Action & Expression)
          </div>
          <span className="text-xs font-semibold text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-xl border border-cyan-800">
            Karya Kampanye Edukasi
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Studio Pembuatan Media Kampanye Pemilih Cerdas
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Rancang media komunikasi visual interaktif untuk mengedukasi teman sebaya di sekolah. Sesuaikan judul, pesan kunci 3 pilar aksi, dan warna tema kampanye secara instan.
        </p>
      </div>

      {/* 2 Columns: Poster Builder Controls & Live Poster Canvas Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Customization Controls */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-cyan-400" />
              Editor Media Kampanye
            </h3>
            <span className="text-[10px] font-bold text-slate-400">Prinsip UDL</span>
          </div>

          {/* Theme Palette */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Pilih Warna Tema Visual:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'cyan', label: 'Elektrik', color: 'bg-cyan-500' },
                { id: 'amber', label: 'Inspiratif', color: 'bg-amber-500' },
                { id: 'rose', label: 'Tegas', color: 'bg-rose-500' },
                { id: 'emerald', label: 'Integritas', color: 'bg-emerald-500' },
              ].map((th) => (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => setPosterTheme(th.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                    posterTheme === th.id
                      ? 'bg-slate-800 border-white text-white font-bold'
                      : 'bg-slate-900/70 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full ${th.color}`} />
                  <span className="text-[10px]">{th.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Headline / Judul Utama Poster:
              </label>
              <input
                type="text"
                value={posterTitle}
                onChange={(e) => setPosterTitle(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-bold focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Sub-tagline / Pesan Inti:
              </label>
              <input
                type="text"
                value={posterTagline}
                onChange={(e) => setPosterTagline(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Pilar Aksi 1:
              </label>
              <input
                type="text"
                value={pillar1}
                onChange={(e) => setPillar1(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Pilar Aksi 2:
              </label>
              <input
                type="text"
                value={pillar2}
                onChange={(e) => setPillar2(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Pilar Aksi 3:
              </label>
              <input
                type="text"
                value={pillar3}
                onChange={(e) => setPillar3(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Ajakan Tindakan (Call to Action):
              </label>
              <input
                type="text"
                value={callToAction}
                onChange={(e) => setCallToAction(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-semibold focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={handleSavePoster}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 hover:brightness-110 transition flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaved ? 'Poster Tersimpan di Portofolio (+80 XP)' : 'Simpan Poster ke LKPD & Klaim 80 XP'}
            </button>
            <button
              onClick={() => window.print()}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              Cetak Poster Kampanye
            </button>
          </div>
        </div>

        {/* Right Column: Live Poster Canvas Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Pratinjau Langsung Poster Digital:</span>
            <span className="text-emerald-400">Siap Dipublikasikan</span>
          </div>

          <div
            className={`p-8 sm:p-12 rounded-3xl bg-gradient-to-br ${themeStyles[posterTheme].bg} border-2 shadow-2xl space-y-8 text-center relative overflow-hidden`}
          >
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Top Badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest border ${themeStyles[posterTheme].badge}`}
              >
                <Vote className="w-4 h-4" />
                Gerakan Pelopor Pemilih Pemula SMA Kelas XII
              </div>

              {/* Poster Headline */}
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase leading-snug">
                {posterTitle}
              </h2>

              <p className="text-sm sm:text-base text-slate-200 max-w-lg mx-auto font-medium">
                "{posterTagline}"
              </p>

              {/* 3 Pillars in Poster */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
                <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 space-y-1">
                  <p className="font-bold text-xs text-white leading-snug">{pillar1}</p>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 space-y-1">
                  <p className="font-bold text-xs text-white leading-snug">{pillar2}</p>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 space-y-1">
                  <p className="font-bold text-xs text-white leading-snug">{pillar3}</p>
                </div>
              </div>

              {/* Call to Action Banner in Poster */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600/80 to-indigo-600/80 border border-white/20 text-white font-extrabold text-xs sm:text-sm shadow-lg">
                📢 {callToAction}
              </div>

              {/* Sign-off & Creator */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-300 gap-2">
                <div>
                  Karya Tim: <strong>{lkpdData.groupName}</strong> ({profile.name})
                </div>
                <div className="opacity-80">
                  {profile.school} • Pendidikan Pancasila Bab 7
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
