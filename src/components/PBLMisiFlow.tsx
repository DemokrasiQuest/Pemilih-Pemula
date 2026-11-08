/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Compass,
  FileEdit,
  FolderDown,
  HelpCircle,
  Layers,
  Lightbulb,
  MessageSquare,
  Printer,
  Save,
  Search,
  Send,
  Share2,
  ShieldAlert,
  Sparkles,
  Users,
  Vote,
  Zap,
} from 'lucide-react';
import { FICTITIOUS_CANDIDATES } from '../data/learningData';
import { useApp } from '../context/AppContext';

export const PBLMisiFlow: React.FC = () => {
  const {
    pblCurrentStep,
    setPblCurrentStep,
    lkpdData,
    updateLKPD,
    addXP,
    unlockBadge,
    triggerConfetti,
    setActiveTab,
    speakText,
  } = useApp();

  // Local state for interactive polling in Tahap 1
  const [pollChoice, setPollChoice] = useState<number | null>(null);
  const [pollVotes, setPollVotes] = useState<number[]>([42, 68, 18, 9]);
  const [isPollVoted, setIsPollVoted] = useState(false);

  // Local state for quick problem inquiry form in Tahap 1
  const [initialProblemNote, setInitialProblemNote] = useState(
    lkpdData.problemStatement || ''
  );
  const [initialDrivingQ, setInitialDrivingQ] = useState(
    lkpdData.drivingQuestion || ''
  );

  // Peer review scores state for Tahap 5
  const [peerScores, setPeerScores] = useState({
    relevance: 4,
    depth: 4,
    innovation: 3,
    presentation: 4,
    feedbackNote: 'Solusi infografik sangat jelas dan langsung menyasar bahasa pergaulan anak SMA kelas XII!',
  });
  const [peerSaved, setPeerSaved] = useState(false);

  const handleVotePoll = (index: number) => {
    if (isPollVoted) return;
    setPollChoice(index);
    const updated = [...pollVotes];
    updated[index] += 1;
    setPollVotes(updated);
    setIsPollVoted(true);
    addXP(30, 'Mengikuti Polling Isu Demokrasi Kelas');
  };

  const handleSaveStep1 = () => {
    updateLKPD({
      problemStatement: initialProblemNote,
      drivingQuestion: initialDrivingQ,
    });
    addXP(50, 'Menyelesaikan Tahap 1 PBL: Orientasi Masalah');
    unlockBadge('badge-thinker');
    setPblCurrentStep(2);
  };

  const handleSaveStep2 = () => {
    addXP(50, 'Menyelesaikan Tahap 2 PBL: Organisasi Tim & Rencana LKPD');
    setPblCurrentStep(3);
  };

  const handleSaveStep3 = () => {
    addXP(70, 'Menyelesaikan Tahap 3 PBL: Penyelidikan Lab');
    unlockBadge('badge-factchecker');
    setPblCurrentStep(4);
  };

  const handleSaveStep4 = () => {
    addXP(80, 'Menyelesaikan Tahap 4 PBL: Pengembangan Proyek Solusi');
    setPblCurrentStep(5);
  };

  const handleSaveStep5 = () => {
    setPeerSaved(true);
    addXP(100, 'Menuntaskan Tahap 5 PBL: Evaluasi & Refleksi Masalah');
    unlockBadge('badge-champion');
    triggerConfetti();
  };

  const stepsList = [
    { num: 1, name: 'Orientasi Masalah', badge: 'Democracy Under Pressure' },
    { num: 2, name: 'Organisasi Belajar', badge: 'Tim & LKPD Digital' },
    { num: 3, name: 'Penyelidikan Lab', badge: 'Investigasi & Bukti' },
    { num: 4, name: 'Penyajian Solusi', badge: 'Studio Produk UDL' },
    { num: 5, name: 'Evaluasi & Refleksi', badge: 'Peer Review & Asesmen' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* PBL Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 border border-blue-800/40 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
            <Layers className="w-4 h-4" />
            Model Utama: Problem Based Learning (PBL) 5 Sintaks
          </div>
          <span className="text-xs font-semibold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-xl border border-amber-800">
            Tahap {pblCurrentStep} dari 5
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Misi Penyelidikan: Pelopor Pemilih Pemula Berintegritas
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
          <strong>Masalah Utama Autentik:</strong> "Bagaimana generasi muda dapat menjadi pelopor pemilih cerdas dan meningkatkan kualitas demokrasi Indonesia di tengah maraknya hoaks politik, politik uang, serta rendahnya kesadaran partisipasi?"
        </p>

        {/* Step Progression Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {stepsList.map((s) => {
            const isCurrent = pblCurrentStep === s.num;
            const isPassed = pblCurrentStep > s.num;
            return (
              <button
                key={s.num}
                onClick={() => setPblCurrentStep(s.num)}
                className={`p-3 rounded-2xl text-left border transition relative flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-blue-600 text-white border-cyan-400 shadow-lg shadow-blue-500/30'
                    : isPassed
                    ? 'bg-slate-800/80 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black">Tahap {s.num}</span>
                  {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div>
                  <p className="text-[11px] font-bold leading-tight mt-1">{s.name}</p>
                  <p className="text-[9px] opacity-80 truncate">{s.badge}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* TAHAP 1: ORIENTASI PESERTA DIDIK TERHADAP MASALAH */}
      {/* ============================================================ */}
      {pblCurrentStep === 1 && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Tahap 1 PBL • Orientasi Masalah
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                MISSION START: DEMOCRACY UNDER PRESSURE
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Amati fenomena krisis partisipasi, hoaks medsos, dan politik uang di sekeliling pemilih pemula.
              </p>
            </div>

            {/* Case Vignette / Breaking News Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 border border-rose-800/50 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-extrabold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                Laporan Kasus Autentik: Dilema Pemilih Pemula di Tahun Politik
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <span className="font-bold text-amber-300">1. Maraknya Hoaks Digital:</span>
                  <p className="text-slate-300">
                    52% lini masa TikTok dan X dipenuhi potongan video disinformasi berlabel "Bocoran Rahasia Calon" yang memecah belah kerukunan siswa sekolah.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <span className="font-bold text-rose-300">2. Normalisasi Politik Uang:</span>
                  <p className="text-slate-300">
                    Beredar anggapan keliru di kalangan remaja: "Ambil uangnya saja, urusan nyoblos terserah". Suap berkedok uang bensin dianggap rezeki halal.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                  <span className="font-bold text-blue-300">3. Ancaman Golput & Apatisme:</span>
                  <p className="text-slate-300">
                    Sebagian besar siswa merasa siapapun yang menang nasib hidup mereka tetap sama, padahal masa depan lapangan kerja dan beasiswa sangat bergantung pada APBD.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Polling Kelas */}
            <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/80 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Vote className="w-5 h-5 text-cyan-400" />
                    Polling Aspirasi Pemilih Pemula Kelas XII
                  </h3>
                  <p className="text-xs text-slate-400">
                    Menurut pendapatmu, manakah ancaman paling berbahaya yang merusak masa depan demokrasi Indonesia saat ini?
                  </p>
                </div>
                {isPollVoted && (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-800">
                    Suaramu Tercatat!
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {[
                  'Politik uang dan suap amplop ("Serangan Fajar") yang membodohi rakyat',
                  'Banjir hoaks, deepfake, dan ujaran kebencian di media sosial',
                  'Tingginya sikap apatis pemuda yang memilih golput dan tidak peduli',
                  'Ketidaknetralan pejabat dan penyalahgunaan fasilitas negara',
                ].map((option, idx) => {
                  const totalVotes = pollVotes.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((pollVotes[idx] / totalVotes) * 100);
                  const isSelected = pollChoice === idx;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleVotePoll(idx)}
                      disabled={isPollVoted}
                      className={`w-full p-3.5 rounded-2xl border text-left transition relative overflow-hidden flex items-center justify-between ${
                        isSelected
                          ? 'bg-blue-600/30 border-cyan-400 text-white font-bold'
                          : 'bg-slate-900/70 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {/* Vote background bar */}
                      {isPollVoted && (
                        <div
                          className="absolute inset-y-0 left-0 bg-blue-500/20 transition-all duration-700 pointer-events-none"
                          style={{ width: `${percentage}%` }}
                        />
                      )}
                      <span className="text-xs sm:text-sm relative z-10">{option}</span>
                      {isPollVoted && (
                        <span className="text-xs font-bold text-cyan-300 relative z-10 shrink-0 ml-3">
                          {percentage}% ({pollVotes[idx]} suara)
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Identifikasi Masalah & Pertanyaan Investigasi */}
            <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-700 space-y-4">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <FileEdit className="w-5 h-5 text-amber-400" />
                Lembar Identifikasi Masalah (LKPD Bagian 1)
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    1. Rumusan Masalah yang Ditemukan oleh Kelompokmu:
                  </label>
                  <textarea
                    rows={2}
                    value={initialProblemNote}
                    onChange={(e) => setInitialProblemNote(e.target.value)}
                    placeholder="Contoh: Rendahnya literasi politik dan maraknya disinformasi membuat pemilih pemula mudah terpengaruh politik uang..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    2. Pertanyaan Pemandu Penyelidikan (Driving Question):
                  </label>
                  <input
                    type="text"
                    value={initialDrivingQ}
                    onChange={(e) => setInitialDrivingQ(e.target.value)}
                    placeholder="Contoh: Bagaimana cara efektif membentengi pemilih muda dari hoaks dan politik uang melalui kampanye kreatif?"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleSaveStep1}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/25 hover:scale-105 transition flex items-center gap-2"
              >
                Simpan & Lanjut ke Tahap 2: Organisasi Tim <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAHAP 2: MENGORGANISASIKAN PESERTA DIDIK UNTUK BELAJAR */}
      {/* ============================================================ */}
      {pblCurrentStep === 2 && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Tahap 2 PBL • Organisasi Belajar
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                TEAM FORMATION & LEARNING PLAN (LKPD DIGITAL)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Bentuk kelompok penyelidikan, tentukan peran masing-masing anggota, dan susun jadwal rencana investigasi.
              </p>
            </div>

            {/* Tim & Peran Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/70 space-y-3">
                <label className="block text-xs font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  Nama Kelompok & Anggota
                </label>
                <input
                  type="text"
                  value={lkpdData.groupName}
                  onChange={(e) => updateLKPD({ groupName: e.target.value })}
                  placeholder="Nama Tim, misal: Garda Pemilih Merdeka"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-xs font-semibold focus:outline-none focus:border-cyan-400"
                />
                <textarea
                  rows={2}
                  value={lkpdData.groupMembers}
                  onChange={(e) => updateLKPD({ groupMembers: e.target.value })}
                  placeholder="Daftar nama anggota tim..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/70 space-y-3">
                <label className="block text-xs font-bold text-white flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-amber-400" />
                  Pembagian Peran Spesifik (Universal Design for Learning)
                </label>
                <textarea
                  rows={4}
                  value={lkpdData.roleDivision}
                  onChange={(e) => updateLKPD({ roleDivision: e.target.value })}
                  placeholder="1. Koordinator Riset: ... 2. Penelaah Regulasi/Hukum: ... 3. Desainer Media: ... 4. Presenter/Notulis: ..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Rencana Investigasi & Informasi yang Dibutuhkan */}
            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/70 space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-cyan-400" />
                Rencana Investigasi & Sumber Belajar yang Akan Dicari
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Langkah-Langkah Penyelidikan Kelompok:
                </label>
                <textarea
                  rows={3}
                  value={lkpdData.investigationPlan}
                  onChange={(e) => updateLKPD({ investigationPlan: e.target.value })}
                  placeholder="1. Menganalisis Pasal 523 UU No. 7/2017 tentang pidana politik uang. 2. Membedah rekam jejak 3 kandidat fiktif di lab pemilu. 3. Melakukan cek fakta pada konten TikTok yang viral."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setPblCurrentStep(1)}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali
              </button>

              <button
                onClick={handleSaveStep2}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/25 hover:scale-105 transition flex items-center gap-2"
              >
                Simpan & Lanjut ke Tahap 3: Penyelidikan Lab <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAHAP 3: MEMBIMBING PENYELIDIKAN INDIVIDUAL & KELOMPOK */}
      {/* ============================================================ */}
      {pblCurrentStep === 3 && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Tahap 3 PBL • Penyelidikan Individual & Kelompok
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                DEMOCRACY INVESTIGATION LAB
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Gunakan laboratorium riset di bawah ini untuk mengumpulkan bukti hukum, membedah 3 kandidat fiktif, dan membongkar kebohongan disinformasi.
              </p>
            </div>

            {/* Quick Access to Lab Tools */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => setActiveTab('investigasi')}
                className="p-4 rounded-2xl bg-blue-950/40 hover:bg-blue-900/40 border border-blue-800/60 text-left transition space-y-2 group"
              >
                <Search className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition" />
                <h4 className="font-bold text-sm text-white">Lab Investigasi Kasus</h4>
                <p className="text-xs text-slate-400">
                  Periksa barang bukti, saksi, dan pasal pelanggaran pemilu secara komprehensif.
                </p>
              </button>

              <button
                onClick={() => setActiveTab('games')}
                className="p-4 rounded-2xl bg-amber-950/40 hover:bg-amber-900/40 border border-amber-800/60 text-left transition space-y-2 group"
              >
                <Vote className="w-6 h-6 text-amber-400 group-hover:scale-110 transition" />
                <h4 className="font-bold text-sm text-white">Simulasi 3 Kandidat Fiktif</h4>
                <p className="text-xs text-slate-400">
                  Uji visi misi, rekam jejak, dan rasionalitas pendanaan para pasangan calon.
                </p>
              </button>

              <button
                onClick={() => setActiveTab('materi')}
                className="p-4 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-800/60 text-left transition space-y-2 group"
              >
                <BookOpen className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition" />
                <h4 className="font-bold text-sm text-white">Dasar Regulasi & Konsep</h4>
                <p className="text-xs text-slate-400">
                  Rujuk UUD 1945 Pasal 22E dan UU No. 7 Tahun 2017 tentang Pemilihan Umum.
                </p>
              </button>
            </div>

            {/* Kolom Bukti & Analisis Kelompok */}
            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/70 space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-cyan-400" />
                Catatan Temuan Bukti Penyelidikan (LKPD Bagian 3)
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Bukti-bukti Autentik yang Ditemukan oleh Tim:
                </label>
                <textarea
                  rows={4}
                  value={lkpdData.evidenceCollected}
                  onChange={(e) => updateLKPD({ evidenceCollected: e.target.value })}
                  placeholder="Contoh temuan: Ditemukan bahwa tawaran amplop melanggar Pasal 523 ayat 2 UU Pemilu dengan ancaman 4 tahun penjara. Sementara pada kandidat, program digitalisasi nomor 01 sangat bagus namun membutuhkan mitigasi disparitas internet desa..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setPblCurrentStep(2)}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali
              </button>

              <button
                onClick={handleSaveStep3}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/25 hover:scale-105 transition flex items-center gap-2"
              >
                Simpan & Lanjut ke Tahap 4: Proyek Solusi <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAHAP 4: MENGEMBANGKAN & MENYAJIKAN HASIL KARYA */}
      {/* ============================================================ */}
      {pblCurrentStep === 4 && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Tahap 4 PBL • Pengembangan & Penyajian Hasil
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                DEMOCRACY SOLUTION PROJECT (STUDIO KARYA UDL)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Pilih bentuk ekspresi karya yang paling sesuai dengan bakat timmu (Multiple Means of Action & Expression).
              </p>
            </div>

            {/* Pilihan Bentuk Produk UDL */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-white">
                Pilih Jenis Produk Solusi Pembelajaran:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { id: 'infografik', label: 'Infografik Digital', icon: '📊' },
                  { id: 'poster', label: 'Poster Kampanye', icon: '🎨' },
                  { id: 'video', label: 'Naskah Video Edukasi', icon: '🎬' },
                  { id: 'panduan', label: 'Buku Saku Pemilih', icon: '📖' },
                  { id: 'presentasi', label: 'Slide Presentasi', icon: '💻' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      updateLKPD({ solutionType: item.id as any })
                    }
                    className={`p-3 rounded-2xl border text-center transition ${
                      lkpdData.solutionType === item.id
                        ? 'bg-blue-600/30 border-cyan-400 text-white font-bold shadow-md'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{item.icon}</span>
                    <span className="text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Deskripsi Produk */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Judul Karya Solusi:
                </label>
                <input
                  type="text"
                  value={lkpdData.solutionTitle}
                  onChange={(e) => updateLKPD({ solutionTitle: e.target.value })}
                  placeholder="Misal: SERIAL INFOGRAFIK 'JARI MERDEKA: SUARA MUDA ANTI-SUAP'"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-xs sm:text-sm font-bold focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Deskripsi Narasi, Pesan Kunci, & Saluran Publikasi:
                </label>
                <textarea
                  rows={4}
                  value={lkpdData.solutionDescription}
                  onChange={(e) => updateLKPD({ solutionDescription: e.target.value })}
                  placeholder="Jelaskan isi pesan edukasi karyamu, siapa target sasarannya (teman SMA/warga), dan bagaimana karya ini disebarkan..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Link to Dedicated Studio */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-cyan-950/60 border border-cyan-800/40 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-xs text-white">Ingin Mendesain Poster Digital Sekarang?</h4>
                <p className="text-[11px] text-slate-400">
                  Gunakan Proyek Solusi Studio interaktif untuk merancang tata letak dan tipografi langsung di browser.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('proyek')}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shrink-0 transition"
              >
                Buka Studio Poster
              </button>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setPblCurrentStep(3)}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali
              </button>

              <button
                onClick={handleSaveStep4}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/25 hover:scale-105 transition flex items-center gap-2"
              >
                Simpan & Lanjut ke Tahap 5: Evaluasi & Refleksi <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAHAP 5: ANALISIS & EVALUASI PROSES PEMECAHAN MASALAH */}
      {/* ============================================================ */}
      {pblCurrentStep === 5 && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Tahap 5 PBL • Analisis & Evaluasi Solusi
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                REFLECTION & PEER EVALUATION LAB
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Evaluasi proses penyelidikan pemecahan masalah, berikan penilaian teman sebaya (Peer Review), dan refleksikan kebermaknaan belajar.
              </p>
            </div>

            {/* Ringkasan Solusi Tim */}
            <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase">
                  Ringkasan Portofolio PBL: {lkpdData.groupName}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white uppercase">
                  {lkpdData.solutionType}
                </span>
              </div>
              <h3 className="font-extrabold text-base text-white">{lkpdData.solutionTitle}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lkpdData.solutionDescription}
              </p>
            </div>

            {/* Rubrik Penilaian Teman Sebaya (Peer Assessment) */}
            <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-700/80 space-y-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Lembar Penilaian Teman Sebaya (Peer Assessment)
              </h3>
              <p className="text-xs text-slate-400">
                Nilai karya kelompok lain berdasarkan 4 kriteria utama (Skor 1 - 4):
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
                  <div className="flex justify-between font-bold text-slate-200">
                    <span>1. Ketepatan Konsep Demokrasi:</span>
                    <span className="text-cyan-400">{peerScores.relevance}/4</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={peerScores.relevance}
                    onChange={(e) =>
                      setPeerScores({ ...peerScores, relevance: parseInt(e.target.value) })
                    }
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
                  <div className="flex justify-between font-bold text-slate-200">
                    <span>2. Ketajaman Analisis Masalah:</span>
                    <span className="text-cyan-400">{peerScores.depth}/4</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={peerScores.depth}
                    onChange={(e) =>
                      setPeerScores({ ...peerScores, depth: parseInt(e.target.value) })
                    }
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
                  <div className="flex justify-between font-bold text-slate-200">
                    <span>3. Kreativitas & Kebaruan Ide:</span>
                    <span className="text-cyan-400">{peerScores.innovation}/4</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={peerScores.innovation}
                    onChange={(e) =>
                      setPeerScores({ ...peerScores, innovation: parseInt(e.target.value) })
                    }
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
                  <div className="flex justify-between font-bold text-slate-200">
                    <span>4. Komunikasi & Estetika Produk:</span>
                    <span className="text-cyan-400">{peerScores.presentation}/4</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={peerScores.presentation}
                    onChange={(e) =>
                      setPeerScores({ ...peerScores, presentation: parseInt(e.target.value) })
                    }
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Catatan Umpan Balik Konstruktif:
                </label>
                <textarea
                  rows={2}
                  value={peerScores.feedbackNote}
                  onChange={(e) =>
                    setPeerScores({ ...peerScores, feedbackNote: e.target.value })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Refleksi Proses Kelompok */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                Refleksi Proses Pemecahan Masalah oleh Kelompok:
              </label>
              <textarea
                rows={3}
                value={lkpdData.evaluationNotes}
                onChange={(e) => updateLKPD({ evaluationNotes: e.target.value })}
                placeholder="Apa pelajaran berharga yang dipetik tim saat menyusun solusi pemilih pemula ini?"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Final Action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setPblCurrentStep(4)}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4 text-cyan-400" />
                  Cetak LKPD Tim
                </button>

                <button
                  onClick={handleSaveStep5}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/25 hover:scale-105 transition flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  {peerSaved ? 'PBL Berhasil Dituntaskan (+100 XP)' : 'Klaim Penyelesaian PBL & 100 XP'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
