/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileSearch,
  FileText,
  Gavel,
  HelpCircle,
  MessageSquare,
  Scale,
  Search,
  ShieldAlert,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import { INVESTIGATION_CASES } from '../data/learningData';
import { useApp } from '../context/AppContext';

export const CaseInvestigation: React.FC = () => {
  const { addXP, triggerConfetti, setActiveTab, speakText } = useApp();

  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [studentAnalysis, setStudentAnalysis] = useState<Record<string, string>>({});
  const [completedCases, setCompletedCases] = useState<string[]>([]);

  const currentCase = INVESTIGATION_CASES[activeCaseIndex];
  const isCaseCompleted = completedCases.includes(currentCase.id);

  const handleSaveInvestigation = () => {
    if (!completedCases.includes(currentCase.id)) {
      setCompletedCases((prev) => [...prev, currentCase.id]);
      addXP(70, `Menuntaskan Analisis Kasus: ${currentCase.title}`);
      triggerConfetti();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-blue-800/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
            <Search className="w-4 h-4" />
            Democracy Investigation Lab • Analisis Kasus Autentik
          </div>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-800">
            {completedCases.length} dari 3 Kasus Terselesaikan
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Laboratorium Investigasi Pelanggaran & Dilema Demokrasi
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Sebagai detektif demokrasi muda, tugasmu adalah meneliti kronologi, mewawancarai saksi, menguji barang bukti, dan menentukan pasal pelanggaran hukum pemilu yang berlaku.
        </p>

        {/* Case Switcher Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {INVESTIGATION_CASES.map((c, idx) => {
            const isActive = activeCaseIndex === idx;
            const isDone = completedCases.includes(c.id);

            return (
              <button
                key={c.id}
                onClick={() => setActiveCaseIndex(idx)}
                className={`p-4 rounded-2xl text-left border transition relative flex items-center justify-between ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-cyan-400 shadow-lg shadow-blue-500/25 font-bold'
                    : isDone
                    ? 'bg-slate-800/80 text-emerald-300 border-emerald-500/40 font-semibold'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 font-medium'
                }`}
              >
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block">
                    {c.category}
                  </span>
                  <p className="text-xs font-bold leading-tight mt-0.5 line-clamp-1">
                    Kasus {idx + 1}: {c.title}
                  </p>
                </div>
                {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Case Dossier */}
      <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-8 shadow-2xl">
        
        {/* Case Title & Category Bar */}
        <div className="border-b border-slate-800 pb-5 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              Kategori: {currentCase.category}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                currentCase.urgency === 'Kritis'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              Status Urgensi: {currentCase.urgency}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {currentCase.title}
          </h2>
        </div>

        {/* 1. Kronologi Peristiwa */}
        <div className="space-y-3">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            1. Kronologi Fakta di Lapangan
          </h3>
          <div className="space-y-2">
            {currentCase.chronology.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-xs sm:text-sm text-slate-300 flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-lg bg-blue-600/30 text-cyan-300 font-extrabold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Kesaksian Saksi & Ahli */}
        <div className="space-y-3">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            2. Berita Acara Pemeriksaan Saksi & Ahli
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentCase.witnesses.map((w, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{w.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                    {w.role}
                  </span>
                </div>
                <p className="text-slate-300 italic leading-relaxed">
                  "{w.statement}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Barang Bukti yang Disita */}
        <div className="space-y-3">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-rose-400" />
            3. Analisis Bukti Penyelidikan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentCase.evidencePieces.map((ev, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300">{ev.name}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{ev.type}</span>
                </div>
                <p className="text-slate-300">{ev.description}</p>
                <p className="text-emerald-300/90 text-[11px] font-semibold pt-1 border-t border-slate-700/60">
                  Nilai Pembuktian: {ev.relevance}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Rujukan Hukum Pemilu */}
        <div className="space-y-3">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Gavel className="w-5 h-5 text-indigo-400" />
            4. Jerat Hukum & Sanksi Pidana Regulasi Terkait
          </h3>
          <div className="space-y-2.5">
            {currentCase.legalBasis.map((lb, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-200">{lb.law}</span>
                  <span className="font-extrabold text-cyan-400">{lb.pasal}</span>
                </div>
                <p className="text-rose-300 font-semibold">
                  Ancaman Sanksi: {lb.sanctions}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Rekomendasi Solusi Siswa */}
        <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-white">
              5. Rekomendasi Tindakan Pemilih Pemula Berintegritas
            </h3>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-300">
            <p className="font-bold text-cyan-300 mb-1">Rekomendasi Bawaslu / Pakar:</p>
            {currentCase.suggestedAction}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Tuliskan Analisis dan Sikapmu terhadap Kasus Ini:
            </label>
            <textarea
              rows={3}
              value={studentAnalysis[currentCase.id] || ''}
              onChange={(e) =>
                setStudentAnalysis({
                  ...studentAnalysis,
                  [currentCase.id]: e.target.value,
                })
              }
              placeholder="Jelaskan mengapa kasus ini merugikan demokrasi dan apa yang akan kamu lakukan jika menghadapinya di lingkungan sekitarmu..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveInvestigation}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/20 hover:scale-105 transition flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
              {isCaseCompleted ? 'Analisis Tersimpan (+70 XP)' : 'Simpan Analisis & Klaim 70 XP'}
            </button>
          </div>
        </div>

        {/* Navigation to games */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => setActiveTab('materi')}
            className="text-xs font-semibold text-slate-400 hover:text-white"
          >
            &larr; Kembali ke Materi
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/20 hover:scale-105 transition flex items-center gap-2"
          >
            Lanjut ke Democracy Challenge & Games <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
