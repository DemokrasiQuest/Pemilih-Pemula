/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  Brain,
  CheckCircle,
  Compass,
  FileQuestion,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Target,
  Volume2,
  Zap,
} from 'lucide-react';
import { DIAGNOSTIC_QUESTIONS } from '../data/learningData';
import { useApp } from '../context/AppContext';

export const LearningOrientation: React.FC = () => {
  const {
    diagnosticAnswers,
    setDiagnosticAnswer,
    addXP,
    profile,
    updateProfile,
    setActiveTab,
    speakText,
    triggerConfetti,
  } = useApp();

  const [diagnosticSubmitted, setDiagnosticSubmitted] = useState<boolean>(
    profile.diagnosticCompleted || false
  );

  const handleSelectOption = (qId: string, opt: string) => {
    setDiagnosticAnswer(qId, opt);
  };

  const handleFinishDiagnostic = () => {
    setDiagnosticSubmitted(true);
    updateProfile({ diagnosticCompleted: true });
    addXP(60, 'Menuntaskan Asesmen Diagnostik Awal');
    triggerConfetti();
  };

  const allAnswered = DIAGNOSTIC_QUESTIONS.every((q) => diagnosticAnswers[q.id]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
            <Target className="w-4 h-4" />
            Integrasi Pembelajaran Mendalam (Deep Learning)
          </div>
          <button
            onClick={() =>
              speakText(
                'Orientasi Pembelajaran: Menjadi Pelopor Pemilih Pemula dalam Demokrasi Indonesia. Tujuan pembelajaran ini dirancang agar kamu memahami hak kedaulatan rakyat, berpikir kritis menghadapi hoaks, dan menolak politik uang demi masa depan bangsa.'
              )
            }
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 flex items-center gap-1.5 transition"
          >
            <Volume2 className="w-4 h-4" />
            Dengarkan Ringkasan
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Orientasi Pembelajaran Bab 7: Pemilih Pemula Berdaya
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Pembelajaran tidak sekadar menghafal pasal undang-undang. Di sini kamu akan mengalami proses belajar yang <strong>Berkesadaran</strong> (tahu tujuan dan makna belajar), <strong>Bermakna</strong> (terhubung langsung dengan peranmu sebagai warga negara), dan <strong>Menggembirakan</strong> (penuh interaksi nyata tanpa rasa tertekan).
        </p>
      </div>

      {/* 3 Pillars of Deep Learning Accordion / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar A: Berkesadaran */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">A. Berkesadaran (Mindful)</h3>
            <p className="text-xs text-slate-400 mt-1">
              Memahami APA yang dipelajari, MENGAPA penting, dan BAGAIMANA proses belajarmu berkembang.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-xs">
            <p className="font-bold text-cyan-300">Tujuan Pembelajaran:</p>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
              <li>Menganalisis prinsip Demokrasi Pancasila dan asas LUBER JURDIL.</li>
              <li>Mengevaluasi rekam jejak visi-misi calon secara objektif tanpa bias.</li>
              <li>Mendeteksi disinformasi pemilu menggunakan metode cek fakta mandiri.</li>
              <li>Membangun komitmen menolak segala bentuk suap politik uang.</li>
            </ul>
          </div>
        </div>

        {/* Pillar B: Bermakna */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">B. Bermakna (Meaningful)</h3>
            <p className="text-xs text-slate-400 mt-1">
              Menghubungkan teori buku dengan kehidupan nyata generasi muda Indonesia.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-xs">
            <p className="font-bold text-amber-300">Koneksi Autentik Gen Z:</p>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
              <li>Biaya kuliah PTN dan beasiswa ditentukan oleh kebijakan kepala daerah & DPR.</li>
              <li>Kualitas internet dan ruang kreatif pemuda bergantung pada komitmen APBD.</li>
              <li>Satu lembar uang suap Rp50.000 menukar nasib fasilitas publikmu selama 5 tahun.</li>
              <li>Potensi pemilih muda mencapai 52% suara nasional di TPS.</li>
            </ul>
          </div>
        </div>

        {/* Pillar C: Menggembirakan */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">C. Menggembirakan (Joyful)</h3>
            <p className="text-xs text-slate-400 mt-1">
              Belajar melalui simulasi seru, gamifikasi, investigasi tim, dan apresiasi capaian.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-xs">
            <p className="font-bold text-emerald-300">Aktivitas Menggembirakan:</p>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
              <li>Simulasi Bilik Suara TPS Digital dengan 3 kandidat berimbang.</li>
              <li>Lab Detektif Fakta Medsos (mengidentifikasi deepfake & framing).</li>
              <li>Tantangan Skenario Interaktif berhadiah XP dan Lencana.</li>
              <li>Desain poster digital dan pembuatan sertifikat resmi nama sendiri.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pertanyaan Pemantik (Essential Inquiring Questions) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">
            Pertanyaan Pemantik Berpikir Kritis
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/70 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase">
              <MessageSquare className="w-4 h-4" />
              Pemantik 1: Nilai Suara
            </div>
            <p className="text-sm font-semibold text-white">
              "Jika kamu merasa satu suaramu tidak akan mengubah apa pun, bayangkan apa yang terjadi bila jutaan pemuda lainnya berpikiran sama dan memilih golput?"
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/70 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
              <MessageSquare className="w-4 h-4" />
              Pemantik 2: Logika Suap
            </div>
            <p className="text-sm font-semibold text-white">
              "Mengapa menerima uang kampanye ('ambil uangnya jangan pilih orangnya') justru tetap menyuburkan siklus korupsi pejabat saat memimpin?"
            </p>
          </div>
        </div>
      </div>

      {/* Asesmen Diagnostik Awal Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold border border-blue-500/30 mb-2">
              <FileQuestion className="w-4 h-4" />
              Asesmen Diagnostik Non-Kognitif & Kognitif Awal
            </div>
            <h2 className="text-xl font-bold text-white">
              Cek Kesiapan Belajar & Pengalaman Demokrasimu
            </h2>
            <p className="text-xs text-slate-400">
              Jawab 4 pertanyaan refleksi awal berikut untuk memetakan titik mula belajarmu. Jawaban tidak dinilai salah/benar.
            </p>
          </div>

          {diagnosticSubmitted && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
              <CheckCircle className="w-4 h-4" />
              Diagnostik Selesai (+60 XP)
            </div>
          )}
        </div>

        <div className="space-y-6">
          {DIAGNOSTIC_QUESTIONS.map((q, idx) => {
            const currentSelected = diagnosticAnswers[q.id];
            return (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/70 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600/30 text-cyan-400 text-xs font-black flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-white">{q.prompt}</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = currentSelected === opt;
                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleSelectOption(q.id, opt)}
                        className={`p-3 rounded-xl text-left text-xs transition border flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-blue-600/30 border-cyan-400 text-white font-bold shadow-md shadow-blue-500/10'
                            : 'bg-slate-900/60 border-slate-700/70 text-slate-300 hover:bg-slate-700/50 hover:text-white'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && (
                          <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit diagnostic */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            {allAnswered
              ? 'Seluruh pertanyaan diagnostik telah terjawab!'
              : 'Silakan pilih opsi pada setiap pertanyaan di atas.'}
          </p>

          <button
            onClick={handleFinishDiagnostic}
            disabled={!allAnswered}
            className={`px-6 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
              allAnswered
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:brightness-110 shadow-blue-500/25'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
            {diagnosticSubmitted ? 'Perbarui Jawaban Diagnostik' : 'Simpan Jawaban & Klaim 60 XP'}
          </button>
        </div>
      </div>

      {/* Next Step Navigation */}
      <div className="flex justify-end">
        <button
          onClick={() => setActiveTab('misi_pbl')}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-blue-500/20 hover:scale-105 transition flex items-center gap-2"
        >
          Lanjut ke Misi Utama (PBL) <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
