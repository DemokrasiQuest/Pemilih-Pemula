/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Award,
  CheckCircle,
  CheckCircle2,
  Download,
  Flame,
  Home,
  Layers,
  Printer,
  RotateCcw,
  Save,
  Shield,
  ShieldCheck,
  Sparkles,
  Trophy,
  Vote,
  Zap,
} from 'lucide-react';
import { BADGES_LIST } from '../data/learningData';
import { getLevelTitle, useApp } from '../context/AppContext';

export const ReflectionCertificate: React.FC = () => {
  const {
    profile,
    updateProfile,
    teacherGrading,
    reflectionResponses,
    updateReflection,
    addXP,
    unlockBadge,
    triggerConfetti,
    resetProgress,
    setActiveTab,
  } = useApp();

  const [isSaved, setIsSaved] = useState(false);
  const [showPledgeSuccess, setShowPledgeSuccess] = useState(profile.pledgeSigned);

  const handleSignPledge = () => {
    const today = new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    updateProfile({
      pledgeSigned: true,
      pledgeDate: today,
    });
    setShowPledgeSuccess(true);
    addXP(100, 'Menandatangani Ikrar Pelopor Pemilih Cerdas');
    unlockBadge('badge-champion');
    triggerConfetti();
  };

  const handleSaveReflection = () => {
    setIsSaved(true);
    addXP(50, 'Menyimpan Refleksi Akhir Pembelajaran');
    triggerConfetti();
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 border border-blue-800/40 shadow-2xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
          <Trophy className="w-4 h-4 text-amber-400" />
          Puncak Prestasi & Refleksi Pembelajaran
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          YOU ARE A DEMOCRACY CHAMPION!
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Selamat! Kamu telah menuntaskan seluruh petualangan pembelajaran Bab 7 Pendidikan Pancasila. Buktikan komitmenmu sebagai generasi muda yang merdeka, berintegritas, dan tidak dapat dibeli dengan materi.
        </p>

        {/* Milestone Statistics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">
              Total XP Dikumpulkan
            </span>
            <span className="text-2xl font-black text-cyan-400">{profile.xp} XP</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">
              Level Karakter
            </span>
            <span className="text-2xl font-black text-amber-400">Level {profile.level}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">
              Lencana Diraih
            </span>
            <span className="text-2xl font-black text-emerald-400">
              {profile.unlockedBadges.length} / 5
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">
              Skor Sumatif
            </span>
            <span className="text-2xl font-black text-blue-400">
              {profile.summativeScore !== null ? `${profile.summativeScore}%` : 'Tuntas'}
            </span>
          </div>
        </div>
      </div>

      {/* Badges Showcase Gallery */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="font-bold text-base text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          Koleksi 5 Lencana Kehormatan Demokrasi
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {BADGES_LIST.map((b) => {
            const isUnlocked = profile.unlockedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border text-center transition space-y-2 ${
                  isUnlocked
                    ? 'bg-amber-500/10 border-amber-500/40 text-white shadow-md'
                    : 'bg-slate-800/40 border-slate-800 text-slate-600'
                }`}
              >
                <div
                  className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center text-xl ${
                    isUnlocked
                      ? 'bg-gradient-to-tr from-amber-400 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xs leading-snug">{b.title}</h4>
                  <p className="text-[10px] opacity-75 mt-0.5">{b.name}</p>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full inline-block bg-slate-800 text-slate-300">
                  {isUnlocked ? '✓ Diraih' : `${b.requiredXP} XP`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 Pertanyaan Refleksi Mendalam (Deep Learning Refleksi) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Lembar Refleksi Pembelajaran Mendalam Peserta Didik
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Renungkan perjalanan belajarmu untuk mengukuhkan kesadaran kewarganegaraan.
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-white mb-1">
              1. Apa pemahaman dan sudut pandang baru yang kamu peroleh dari Bab 7 ini?
            </label>
            <textarea
              rows={2}
              value={reflectionResponses.newUnderstanding}
              onChange={(e) =>
                updateReflection({ newUnderstanding: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block font-bold text-white mb-1">
              2. Apa kontribusi nyata kelompokmu dalam memecahkan masalah hoaks dan politik uang?
            </label>
            <textarea
              rows={2}
              value={reflectionResponses.problemContribution}
              onChange={(e) =>
                updateReflection({ problemContribution: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block font-bold text-white mb-1">
              3. Bagaimana kamu akan menerapkan pemahaman ini saat hari pemungutan suara tiba?
            </label>
            <textarea
              rows={2}
              value={reflectionResponses.realApplication}
              onChange={(e) =>
                updateReflection({ realApplication: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block font-bold text-white mb-1">
              4. Apa ikrar dan komitmen moral pribadimu untuk menjaga demokrasi Indonesia?
            </label>
            <textarea
              rows={2}
              value={reflectionResponses.democracyCommitment}
              onChange={(e) =>
                updateReflection({ democracyCommitment: e.target.value })
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSaveReflection}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition"
          >
            <Save className="w-4 h-4" />
            {isSaved ? 'Refleksi Tersimpan (+50 XP)' : 'Simpan Refleksi & Klaim 50 XP'}
          </button>
        </div>
      </div>

      {/* Kartu Komitmen / Ikrar Pelopor Demokrasi */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border-2 border-amber-500/40 space-y-5 text-center shadow-xl">
        <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
          <Vote className="w-7 h-7" />
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
          Ikrar Pelopor Pemilih Muda Indonesia
        </h3>

        <div className="p-6 rounded-2xl bg-black/40 border border-amber-500/20 max-w-2xl mx-auto space-y-3 text-xs sm:text-sm text-amber-100 font-semibold leading-relaxed">
          <p>
            "Dengan rahmat Tuhan Yang Maha Esa dan kesadaran penuh sebagai warga negara berdaulat, saya berikrar:"
          </p>
          <p className="text-base sm:text-lg text-white font-extrabold italic">
            "Aku siap menjadi pelopor pemilih cerdas, kritis, bertanggung jawab, dan berintegritas. Menolak politik uang, melawan disinformasi, dan mengawal masa depan Indonesia!"
          </p>
          {profile.pledgeSigned && (
            <p className="text-[11px] text-amber-300 pt-2 border-t border-amber-500/20">
              Ditandatangani secara digital oleh: <strong>{profile.name}</strong> ({profile.school}) pada {profile.pledgeDate || 'Hari Ini'}.
            </p>
          )}
        </div>

        {!profile.pledgeSigned ? (
          <button
            onClick={handleSignPledge}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 hover:scale-105 transition"
          >
            ✍️ TANDATANGANI IKRAR SECARA DIGITAL (+100 XP)
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-extrabold text-xs">
            <CheckCircle2 className="w-4 h-4" />
            Ikrar Resmi Sah & Berlaku
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* SERTIFIKAT KELULUSAN RESMI SIAP CETAK (PRINT-READY) */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            Sertifikat Kelulusan Resmi Pelopor Demokrasi
          </h3>
          <button
            onClick={handlePrintCertificate}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/25 transition"
          >
            <Printer className="w-4 h-4" />
            Cetak / Download PDF Sertifikat
          </button>
        </div>

        {/* Printable Certificate Frame */}
        <div
          id="certificate-print-area"
          className="p-8 sm:p-14 rounded-3xl bg-slate-900 border-4 border-amber-400/80 text-white space-y-6 relative overflow-hidden shadow-2xl print:bg-white print:text-black print:border-amber-600"
        >
          {/* Ornate corner borders */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400" />

          {/* Certificate Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-amber-400 font-black text-xs uppercase tracking-widest">
              <Shield className="w-5 h-5" />
              PENDIDIKAN PANCASILA KELAS XII SMA • KURIKULUM MERDEKA
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white print:text-black uppercase">
              SERTIFIKAT PENGHARGAAN
            </h2>
            <p className="text-xs text-slate-400 print:text-slate-600">
              Nomor Registrasi: DQ-BAB7-{profile.nisn || '2026'}-XII
            </p>
          </div>

          <div className="text-center space-y-2 max-w-xl mx-auto">
            <p className="text-xs text-slate-300 print:text-slate-700">Diberikan secara terhormat kepada:</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-cyan-300 print:text-blue-900 underline decoration-amber-400">
              {profile.name}
            </h3>
            <p className="text-xs text-slate-300 print:text-slate-700">
              NISN: {profile.nisn || '0078912345'} • Kelas: {profile.studentClass} • {profile.school}
            </p>
          </div>

          <div className="text-center text-xs sm:text-sm text-slate-200 print:text-slate-800 max-w-2xl mx-auto leading-relaxed">
            Atas keberhasilannya menuntaskan seluruh tahapan pembelajaran mendalam <strong>Problem Based Learning</strong> pada <strong>Bab 7: Menjadi Pelopor Pemilih Pemula dalam Demokrasi Indonesia</strong> dengan predikat kompetensi keunggulan:
          </div>

          {/* Competency badge title in certificate */}
          <div className="p-4 rounded-2xl bg-slate-800/80 print:bg-slate-100 border border-amber-400/50 max-w-md mx-auto text-center space-y-1">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
              Gelar Kehormatan Kewarganegaraan:
            </span>
            <p className="text-lg font-black text-white print:text-slate-900">
              {getLevelTitle(profile.level)} ({profile.xp} Total XP)
            </p>
          </div>

          {/* Signature and Verification Footer */}
          <div className="pt-8 border-t border-slate-800 print:border-slate-300 grid grid-cols-2 gap-8 text-center text-xs">
            <div>
              <p className="text-slate-400 print:text-slate-600">Guru Fasilitator Pendidikan Pancasila</p>
              <div className="h-12 flex items-center justify-center font-serif text-sm italic text-cyan-300 print:text-blue-900">
                [Tanda Tangan Terverifikasi]
              </div>
              <p className="font-bold text-white print:text-black">{teacherGrading.gradedBy}</p>
              <p className="text-[10px] text-slate-400 print:text-slate-600">NIP. 19780512 200501 2 004</p>
            </div>

            <div>
              <p className="text-slate-400 print:text-slate-600">
                Ditetapkan Pada Tanggal: {profile.pledgeDate || '8 November 2026'}
              </p>
              <div className="h-12 flex items-center justify-center">
                <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  QR/BARCODE VALIDATED
                </span>
              </div>
              <p className="font-bold text-white print:text-black">Demokrasi Quest Indonesia</p>
              <p className="text-[10px] text-slate-400 print:text-slate-600">Platform Pembelajaran Terpadu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
        <button
          onClick={() => setActiveTab('beranda')}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition"
        >
          <Home className="w-4 h-4" /> Kembali ke Beranda
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (window.confirm('Ingin mengulang simulasi dan materi dari awal?')) {
                resetProgress();
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/40 text-rose-300 border border-rose-800/50 font-bold text-xs flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-4 h-4" /> Ulangi Pembelajaran
          </button>

          <button
            onClick={handlePrintCertificate}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-blue-500/25 transition"
          >
            <Printer className="w-4 h-4" /> Cetak Sertifikat
          </button>
        </div>
      </div>

    </div>
  );
};
