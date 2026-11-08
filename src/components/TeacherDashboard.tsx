/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle,
  CheckCircle2,
  Clock,
  Compass,
  Download,
  FileCheck2,
  FileSearch,
  FileSpreadsheet,
  FileText,
  Filter,
  FolderDown,
  GraduationCap,
  HelpCircle,
  KeyRound,
  Layers,
  Lock,
  Maximize2,
  Minimize2,
  Monitor,
  Pause,
  PieChart,
  Play,
  Printer,
  RotateCcw,
  Save,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Unlock,
  User,
  UserCheck,
  Users,
  Volume2,
  X,
  Zap,
} from 'lucide-react';
import {
  MATERI_BAB_7,
  QUIZ_QUESTIONS,
  RUBRIK_PENILAIAN,
} from '../data/learningData';
import { useApp } from '../context/AppContext';
import { StudentRecord } from '../types';

export const TeacherDashboard: React.FC = () => {
  const {
    profile,
    lkpdData,
    miniQuizScores,
    pblCurrentStep,
    setPblCurrentStep,
    setActiveTab,
    speakText,
    isTeacherMode,
    openTeacherPinModal,
    exitTeacherMode,
    teacherGrading,
    updateTeacherGrading,
    verifyTeacherPin,
    registeredStudents,
    updateStudentRecord,
  } = useApp();

  // Active Teacher Tab
  const [activeTeacherSection, setActiveTeacherSection] = useState<
    'fasilitasi' | 'penilaian' | 'kunci_jawaban' | 'rekap_kelas'
  >('rekap_kelas');

  // Sub-view inside Rekap: 'keseluruhan' | 'perorangan'
  const [rekapSubView, setRekapSubView] = useState<'keseluruhan' | 'perorangan'>('keseluruhan');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(() => {
    return registeredStudents[0]?.id || 'std-001';
  });
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('ALL');
  const [individualSavedNotice, setIndividualSavedNotice] = useState(false);

  // Local state for PIN if locked on page
  const [pagePinInput, setPagePinInput] = useState('');
  const [pagePinError, setPagePinError] = useState('');

  // Classroom Timer State
  const [timerSeconds, setTimerSeconds] = useState(15 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPresenterMode, setIsPresenterMode] = useState(false);

  // Teacher Grading Station Local State
  const [rubricScores, setRubricScores] = useState({
    konsep: teacherGrading.rubricScores.konsep,
    analisis: teacherGrading.rubricScores.analisis,
    solusi: teacherGrading.rubricScores.solusi,
    komunikasi: teacherGrading.rubricScores.komunikasi,
  });
  const [attitudeScore, setAttitudeScore] = useState(teacherGrading.attitudeScore);
  const [teacherNotes, setTeacherNotes] = useState(teacherGrading.notes);
  const [pblClassLimit, setPblClassLimit] = useState(teacherGrading.pblUnlockedMaxStep);
  const [gradingSaved, setGradingSaved] = useState(false);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      speakText('Waktu kegiatan pembelajaran dan penyelidikan kelas telah berakhir!');
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds, speakText]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSetTimerPreset = (minutes: number) => {
    setIsTimerRunning(false);
    setTimerSeconds(minutes * 60);
  };

  const handleUnlockWithPin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = verifyTeacherPin(pagePinInput);
    if (!success) {
      setPagePinError('Kode PIN tidak valid! Masukkan kode keamanan guru.');
    } else {
      setPagePinInput('');
      setPagePinError('');
    }
  };

  const handleSaveTeacherGrading = () => {
    // Rubric average 1-4 converted to 100 scale: ((sum / 16) * 70) + (attitude * 0.3)
    const rubricAvg =
      ((rubricScores.konsep +
        rubricScores.analisis +
        rubricScores.solusi +
        rubricScores.komunikasi) /
        16) *
      70;
    const finalScore = Math.round(rubricAvg + attitudeScore * 0.3);

    updateTeacherGrading({
      rubricScores,
      attitudeScore,
      notes: teacherNotes,
      finalScore,
      pblUnlockedMaxStep: pblClassLimit,
      gradedDate: new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    });
    setGradingSaved(true);
    setTimeout(() => setGradingSaved(false), 3000);
  };

  // Slides for Projector / Presentation Mode
  const projectorSlides = [
    {
      title: 'Tujuan Pembelajaran Bab 7',
      subtitle: 'Pendidikan Pancasila Fase F (Kelas XII SMA) • Kurikulum Merdeka',
      content: [
        'Menganalisis hakikat Demokrasi Pancasila dan prinsip kedaulatan rakyat.',
        'Mengevaluasi pelaksanaan asas Pemilu LUBER JURDIL dalam kehidupan berbangsa.',
        'Mengidentifikasi rekam jejak visi dan misi kandidat secara objektif tanpa bias.',
        'Menangkal disinformasi politik dan menolak keras politik uang (suap amplop).',
      ],
      footnote: 'Model: Problem Based Learning (PBL) • Pendekatan: Deep Learning & UDL',
    },
    {
      title: 'Sintaks 1: Orientasi Masalah Autentik',
      subtitle: 'MISSION START: DEMOCRACY UNDER PRESSURE',
      content: [
        'Fakta Lapangan: Generasi Z & Milenial mendominasi 52% suara nasional di TPS.',
        'Ancaman Demokrasi: Maraknya hoaks medsos, deepfake AI, dan suap uang bensin.',
        'Driving Question: "Bagaimana kita memelopori gerakan pemilih cerdas anti-suap di lingkungan sekolah?"',
      ],
      footnote: 'Aktivitas Kelas: Polling kelas & Perumusan masalah di LKPD Digital Sintaks 1',
    },
    {
      title: 'Sintaks 2 & 3: Pembagian Tim & Penyelidikan Lab',
      subtitle: 'TEAM FORMATION & DEMOCRACY INVESTIGATION LAB',
      content: [
        'Bagi peran dalam kelompok: Koordinator, Peneliti Regulasi, Desainer Media, Notulis.',
        'Kaji Pasal 523 UU No. 7/2017 tentang larangan pidana politik uang (ancaman 4 tahun).',
        'Simulasi Bilik Suara: Uji komparasi 3 pasangan calon fiktif secara objektif.',
      ],
      footnote: 'Alat: Lab Investigasi Bukti, Fact Check Medsos, & Bilik Suara TPS Digital',
    },
    {
      title: 'Sintaks 4 & 5: Penyajian Solusi & Evaluasi Kelas',
      subtitle: 'DEMOCRACY SOLUTION & PEER EVALUATION',
      content: [
        'Penyajian karya solusi UDL (Poster Kampanye / Infografik / Naskah Edukasi).',
        'Penilaian teman sebaya (Peer Assessment) menggunakan rubrik 4 kriteria.',
        'Penandatanganan Ikrar Pelopor Pemilih Cerdas & Verifikasi Sertifikat Kelulusan.',
      ],
      footnote: 'Penilaian Kinerja: Rubrik Autentik Kemendikbudristek Kurikulum Merdeka',
    },
  ];

  // =========================================================================
  // IF NOT AUTHENTICATED AS TEACHER -> SHOW TEACHER SECURITY GATE
  // =========================================================================
  if (!isTeacherMode) {
    return (
      <div className="py-12 max-w-xl mx-auto animate-in fade-in duration-300">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border-2 border-amber-500/50 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-600/40">
              Area Khusus Pendidik
            </span>
            <h2 className="text-2xl font-black text-white">
              Portal Guru & Pengawas Terkunci
            </h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Halaman ini memuat instrumen penilaian autentik, kontrol tahapan kelas, timer interaktif, dan kunci jawaban resmi. Masukkan kode otorisasi 6 digit untuk melanjutkan.
            </p>
          </div>

          <form onSubmit={handleUnlockWithPin} className="space-y-4 max-w-sm mx-auto">
            <div>
              <input
                type="password"
                maxLength={6}
                value={pagePinInput}
                onChange={(e) => {
                  setPagePinInput(e.target.value);
                  if (pagePinError) setPagePinError('');
                }}
                autoFocus
                placeholder="Kode PIN (6 Digit)"
                className="w-full bg-slate-950 border-2 border-slate-700 focus:border-amber-400 rounded-2xl px-4 py-3 text-center text-2xl font-mono tracking-widest text-amber-300 focus:outline-none transition"
              />
            </div>

            {pagePinError && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 flex items-center justify-center gap-2 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>{pagePinError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 hover:brightness-110 transition flex items-center justify-center gap-1.5"
            >
              <Unlock className="w-4 h-4" /> Buka Akses Guru
            </button>
          </form>

          <div className="pt-2">
            <button
              onClick={() => setActiveTab('beranda')}
              className="text-xs text-slate-400 hover:text-white underline"
            >
              &larr; Kembali ke Mode Siswa (Beranda)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // IF AUTHENTICATED AS TEACHER -> SHOW FULL TEACHER SUITE
  // =========================================================================
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Teacher Verified Header Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-amber-950/50 to-slate-900 border-2 border-amber-500/50 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/40">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Mode Guru Terverifikasi (Akses Fasilitator Aktif)
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300 hidden sm:inline">
              Fasilitator: <strong>{teacherGrading.gradedBy}</strong>
            </span>
            <button
              onClick={exitTeacherMode}
              className="px-3.5 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-700/60 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              Kunci & Keluar ke Mode Siswa
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Pusat Kontrol Pembelajaran & Penilaian Pendidik
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Instrumen pengajaran kelas XII Bab 7: Menjadi Pelopor Pemilih Pemula dalam Demokrasi Indonesia. Terintegrasi untuk pelaksanaan praktik mengajar, asesmen formatif-kinerja, dan penilaian Uji Kinerja (UKIN PPG).
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsPresenterMode(!isPresenterMode)}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition"
            >
              <Monitor className="w-4 h-4" />
              {isPresenterMode ? 'Tutup Proyektor' : 'Slide Proyektor Kelas'}
            </button>
          </div>
        </div>

        {/* Teacher Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {[
            {
              id: 'fasilitasi',
              label: '1. Fasilitasi PBL & Timer',
              icon: Layers,
              badge: 'Kontrol Kelas',
            },
            {
              id: 'penilaian',
              label: '2. Stasiun Input Nilai Guru',
              icon: Scale,
              badge: 'Rubrik & Rapor',
            },
            {
              id: 'kunci_jawaban',
              label: '3. Kunci Jawaban Resmi',
              icon: FileSearch,
              badge: 'Khusus Guru',
            },
            {
              id: 'rekap_kelas',
              label: '4. Rekapitulasi & Dokumen',
              icon: FileCheck2,
              badge: 'Cetak UKIN PPG',
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTeacherSection === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTeacherSection(tab.id as any)}
                className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-300 font-extrabold shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <div>
                    <p className="text-xs font-bold leading-tight">{tab.label}</p>
                    <p className="text-[10px] opacity-80">{tab.badge}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. FASILITASI PBL, PENGATUR AKSES KELAS & TIMER INTERAKTIF */}
      {/* ========================================================================= */}
      {activeTeacherSection === 'fasilitasi' && (
        <div className="space-y-6">
          {/* Classroom Projector Slide Screen */}
          {isPresenterMode && (
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 border-2 border-amber-400 shadow-2xl space-y-6 relative animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest">
                  <Monitor className="w-4 h-4" />
                  Layar Tayang Proyektor Kelas (Slide {currentSlideIndex + 1} / {projectorSlides.length})
                </div>
                <button
                  onClick={() => setIsPresenterMode(false)}
                  className="text-xs font-bold text-slate-400 hover:text-white px-3 py-1 rounded-lg bg-slate-800"
                >
                  Tutup Layar
                </button>
              </div>

              <div className="space-y-4 py-4">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block">
                  {projectorSlides[currentSlideIndex].subtitle}
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  {projectorSlides[currentSlideIndex].title}
                </h2>

                <div className="space-y-3 pt-2">
                  {projectorSlides[currentSlideIndex].content.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-sm sm:text-base text-slate-200 flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-slate-400 pt-3 italic">
                  {projectorSlides[currentSlideIndex].footnote}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentSlideIndex === 0}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                    currentSlideIndex > 0 ? 'bg-slate-800 text-white' : 'opacity-40 text-slate-600'
                  }`}
                >
                  &larr; Slide Sebelumnya
                </button>

                <button
                  onClick={() =>
                    setCurrentSlideIndex((prev) =>
                      Math.min(projectorSlides.length - 1, prev + 1)
                    )
                  }
                  disabled={currentSlideIndex === projectorSlides.length - 1}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold ${
                    currentSlideIndex < projectorSlides.length - 1
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'opacity-40 text-slate-600'
                  }`}
                >
                  Slide Selanjutnya &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Interactive Activity Timer */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Manajemen Waktu Penyelidikan
                </span>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
                  <Clock className="w-5 h-5 text-amber-400" />
                  Timer Interaktif Kegiatan Kelas
                </h3>
              </div>

              {/* Timer display */}
              <div className="flex items-center gap-4">
                <div className="text-4xl sm:text-5xl font-mono font-black text-amber-300 tracking-wider bg-slate-950 px-6 py-2 rounded-2xl border border-slate-800 shadow-inner">
                  {formatTimer(timerSeconds)}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`p-3 rounded-2xl font-bold transition flex items-center gap-1.5 ${
                      isTimerRunning
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                    }`}
                    title={isTimerRunning ? 'Jeda Timer' : 'Mulai Timer'}
                  >
                    {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-slate-950" />}
                  </button>

                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds(15 * 60);
                    }}
                    className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    title="Reset Timer ke 15 Menit"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Timer Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800 text-xs">
              <span className="text-slate-400 font-semibold mr-2">Durasi Tahapan:</span>
              {[
                { label: '5m: Orientasi Masalah', mins: 5 },
                { label: '10m: Bentuk Kelompok & LKPD', mins: 10 },
                { label: '15m: Investigasi Lab & Fakta', mins: 15 },
                { label: '25m: Desain Proyek Solusi', mins: 25 },
                { label: '20m: Presentasi & Peer Review', mins: 20 },
              ].map((preset) => (
                <button
                  key={preset.mins}
                  onClick={() => handleSetTimerPreset(preset.mins)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 font-medium transition"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Teacher PBL Step Controller */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-400" />
                  Pengatur & Panduan Sintaks Problem Based Learning (PBL)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Klik tahapan untuk langsung memindahkan tampilan siswa ke tahapan tersebut.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-300 bg-amber-950/80 px-3 py-1 rounded-xl border border-amber-600/40">
                Tahap {pblCurrentStep} Aktif
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                {
                  step: 1,
                  title: 'Tahap 1: Orientasi',
                  desc: 'Bahas berita viral, fasilitasi polling kelas, dan rumuskan driving question.',
                },
                {
                  step: 2,
                  title: 'Tahap 2: Organisasi',
                  desc: 'Bagi 4 peran tim di LKPD Digital, pastikan jadwal rencana penyelidikan terisi.',
                },
                {
                  step: 3,
                  title: 'Tahap 3: Penyelidikan',
                  desc: 'Bimbing telaah Pasal 523 UU Pemilu, lab cek fakta medsos, & bilik 3 paslon.',
                },
                {
                  step: 4,
                  title: 'Tahap 4: Solusi Produk',
                  desc: 'Arahkan pilihan media (poster, infografik, naskah video) sesuai minat UDL.',
                },
                {
                  step: 5,
                  title: 'Tahap 5: Evaluasi',
                  desc: 'Fasilitasi presentasi kelas, peer review, dan penandatanganan ikrar pemilih.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  onClick={() => {
                    setPblCurrentStep(item.step);
                    setActiveTab('misi_pbl');
                  }}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-2 ${
                    pblCurrentStep === item.step
                      ? 'bg-blue-950/60 border-cyan-400 text-white shadow-md'
                      : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-cyan-400">
                      {item.title}
                    </span>
                    <p className="text-xs text-slate-300 mt-1 leading-snug">{item.desc}</p>
                  </div>
                  <span className="text-[10px] font-bold text-amber-400 pt-1">
                    Buka Sintaks Ini &rarr;
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. STASIUN INPUT NILAI RUBRIK & RAPOR GURU */}
      {/* ========================================================================= */}
      {activeTeacherSection === 'penilaian' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Stasiun Penilaian Otentik Guru (UKIN PPG)
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                Input Nilai Kinerja & Karakter Peserta Didik
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Nilai yang disimpan guru akan langsung memperbarui status kelulusan di sertifikat dan lembar LKPD siswa.
              </p>
            </div>

            {gradingSaved && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-bold animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                Nilai Berhasil Disimpan & Tersinkron!
              </div>
            )}
          </div>

          {/* Student Profile Quick Reference */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Nama Siswa / Kelompok:</span>
              <strong className="text-white">{profile.name}</strong> ({lkpdData.groupName})
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Kelas / Sekolah:</span>
              <strong className="text-slate-200">{profile.studentClass} • {profile.school}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Skor Master Quiz HOTS:</span>
              <strong className="text-cyan-400">{profile.summativeScore !== null ? `${profile.summativeScore}/100` : 'Belum Selesai'}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Jenis Produk Solusi:</span>
              <strong className="text-amber-400 uppercase">{lkpdData.solutionType}</strong>
            </div>
          </div>

          {/* 4 Rubric Input Sliders */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              Penilaian Aspek Kinerja Produk & Proses (Skor 1 - 4):
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-2">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>1. Ketepatan Konsep Demokrasi & Regulasi</span>
                  <span className="text-cyan-400">{rubricScores.konsep} / 4</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={rubricScores.konsep}
                  onChange={(e) =>
                    setRubricScores({ ...rubricScores, konsep: parseInt(e.target.value) })
                  }
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <p className="text-[11px] text-slate-400">
                  {rubricScores.konsep === 4
                    ? 'Sangat menguasai asas LUBER JURDIL dan pasal hukum pemilu.'
                    : rubricScores.konsep === 3
                    ? 'Menguasai konsep dasar dengan baik.'
                    : 'Cukup memahami, butuh bimbingan pasal.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-2">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>2. Ketajaman Analisis Masalah & Berpikir Kritis</span>
                  <span className="text-cyan-400">{rubricScores.analisis} / 4</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={rubricScores.analisis}
                  onChange={(e) =>
                    setRubricScores({ ...rubricScores, analisis: parseInt(e.target.value) })
                  }
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <p className="text-[11px] text-slate-400">
                  {rubricScores.analisis === 4
                    ? 'Analisis tajam membongkar hoaks dan suap amplop.'
                    : rubricScores.analisis === 3
                    ? 'Mampu menemukan akar masalah dengan bukti yang baik.'
                    : 'Analisis masih di tingkat permukaan.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-2">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>3. Kualitas & Kebaruan Solusi Kampanye</span>
                  <span className="text-cyan-400">{rubricScores.solusi} / 4</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={rubricScores.solusi}
                  onChange={(e) =>
                    setRubricScores({ ...rubricScores, solusi: parseInt(e.target.value) })
                  }
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <p className="text-[11px] text-slate-400">
                  {rubricScores.solusi === 4
                    ? 'Solusi sangat aplikatif dan inspiratif bagi remaja SMA.'
                    : rubricScores.solusi === 3
                    ? 'Solusi terstruktur dan realistis dilaksanakan.'
                    : 'Solusi masih normatif.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-2">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>4. Komunikasi, Estetika & Kolaborasi Tim</span>
                  <span className="text-cyan-400">{rubricScores.komunikasi} / 4</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={rubricScores.komunikasi}
                  onChange={(e) =>
                    setRubricScores({ ...rubricScores, komunikasi: parseInt(e.target.value) })
                  }
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <p className="text-[11px] text-slate-400">
                  {rubricScores.komunikasi === 4
                    ? 'Desain visual memukau, bahasa santun, kerja tim solid.'
                    : rubricScores.komunikasi === 3
                    ? 'Penyajian rapi dan komunikatif.'
                    : 'Format produk perlu dirapikan kembali.'}
                </p>
              </div>
            </div>
          </div>

          {/* Nilai Sikap & Catatan Evaluasi Guru */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-2">
              <label className="block text-xs font-bold text-white">
                Nilai Sikap Profil Pelajar Pancasila (0 - 100):
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={attitudeScore}
                onChange={(e) => setAttitudeScore(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-amber-300 font-black text-xl text-center focus:outline-none focus:border-amber-400"
              />
              <span className="text-[11px] text-slate-400 block text-center">
                Integritas, Bernalar Kritis, Gotong Royong
              </span>
            </div>

            <div className="md:col-span-2 p-4 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-2">
              <label className="block text-xs font-bold text-white">
                Catatan Umpan Balik Guru Fasilitator:
              </label>
              <textarea
                rows={3}
                value={teacherNotes}
                onChange={(e) => setTeacherNotes(e.target.value)}
                placeholder="Tuliskan catatan apresiasi atau rekomendasi penguatan karakter bagi peserta didik..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Action to Save */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="text-xs text-slate-400">
              Nilai Akhir Rapor Terkalkulasi: <strong className="text-emerald-400 text-sm">{teacherGrading.finalScore} / 100</strong>
            </div>

            <button
              onClick={handleSaveTeacherGrading}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/25 hover:brightness-110 transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Simpan Penilaian Guru ke Rapor Siswa
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. KUNCI JAWABAN RESMI & KISI-KISI PEDAGOGIS HOTS (KHUSUS GURU) */}
      {/* ========================================================================= */}
      {activeTeacherSection === 'kunci_jawaban' && (
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                Dokumen Rahasia Guru • Kunci Jawaban & Pembahasan Pedagogis
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                Kunci Jawaban Master Quiz HOTS (12 Butir Soal) & Mini Quiz
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Hanya dapat diakses melalui otorisasi pendidik untuk memudahkan penilaian guru saat supervisi UKIN PPG.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {QUIZ_QUESTIONS.map((q, idx) => (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-2 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-extrabold text-cyan-300">
                    Soal Nomor {idx + 1}: {q.topic}
                  </span>
                  <span className="font-bold text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-600/40">
                    Level Kognitif: {q.competency}
                  </span>
                </div>

                {q.caseContext && (
                  <p className="text-slate-400 italic">
                    Konteks Kasus: "{q.caseContext}"
                  </p>
                )}

                <p className="text-white font-semibold">{q.question}</p>

                <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 font-bold space-y-1">
                  <span>
                    ✓ Kunci Jawaban Benar: Opsi {String.fromCharCode(65 + q.correctIndex)} — "{q.options[q.correctIndex]}"
                  </span>
                  <p className="text-slate-300 font-normal text-[11px] pt-1">
                    <strong>Rasional Pembahasan Ilmiah:</strong> {q.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. REKAPITULASI HASIL BELAJAR MURID (KESELURUHAN & PERORANGAN LENGKAP) */}
      {/* ========================================================================= */}
      {activeTeacherSection === 'rekap_kelas' && (() => {
        const candidateLookup: Record<string, { number: number; name: string; avatar: string }> = {
          'kandidat-01': {
            number: 1,
            name: 'Dr. Arya Pratama & Maya Indraswari',
            avatar: '👨‍💼👩‍💻',
          },
          'kandidat-02': {
            number: 2,
            name: 'Siti Rahmawati, S.Pd. & Budi Santoso',
            avatar: '👩‍🏫👨‍🌾',
          },
          'kandidat-03': {
            number: 3,
            name: 'H. Iskandar Zulkarnain & Putri Wulandari',
            avatar: '👨‍⚖️👩‍⚕️',
          },
        };

        const totalStudents = registeredStudents.length;
        const validSummative = registeredStudents.filter((s) => s.summativeScore !== null);
        const avgSummative =
          validSummative.length > 0
            ? Math.round(
                validSummative.reduce((acc, s) => acc + (s.summativeScore || 0), 0) /
                  validSummative.length
              )
            : 0;

        const validTeacherGrades = registeredStudents.filter((s) => s.teacherGrade !== undefined);
        const avgTeacherGrade =
          validTeacherGrades.length > 0
            ? Math.round(
                validTeacherGrades.reduce((acc, s) => acc + (s.teacherGrade || 0), 0) /
                  validTeacherGrades.length
              )
            : 90;

        const pledgeCount = registeredStudents.filter((s) => s.pledgeSigned).length;
        const pledgePercent = totalStudents > 0 ? Math.round((pledgeCount / totalStudents) * 100) : 0;
        const totalXPAll = registeredStudents.reduce((acc, s) => acc + s.xp, 0);

        // Modality counts
        const countVisual = registeredStudents.filter((s) => s.preferredModality === 'visual').length;
        const countReading = registeredStudents.filter((s) => s.preferredModality === 'reading').length;
        const countAudio = registeredStudents.filter((s) => s.preferredModality === 'audio').length;
        const countVideo = registeredStudents.filter((s) => s.preferredModality === 'video').length;

        // Candidate votes count
        const votePaslon1 = registeredStudents.filter((s) => s.votedCandidate === 'kandidat-01').length;
        const votePaslon2 = registeredStudents.filter((s) => s.votedCandidate === 'kandidat-02').length;
        const votePaslon3 = registeredStudents.filter((s) => s.votedCandidate === 'kandidat-03').length;
        const totalVotes = votePaslon1 + votePaslon2 + votePaslon3;

        // Filtered students for overall table
        const filteredStudents = registeredStudents.filter((s) => {
          const matchClass =
            selectedClassFilter === 'ALL' || s.studentClass === selectedClassFilter;
          const matchSearch =
            s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
            s.nisn.includes(studentSearch) ||
            s.lkpdGroupName.toLowerCase().includes(studentSearch.toLowerCase());
          return matchClass && matchSearch;
        });

        // Currently selected student for individual dossier
        const currentSelectedStudent =
          registeredStudents.find((s) => s.id === selectedStudentId) || registeredStudents[0];

        const handleSaveSelectedStudentGrade = (
          grade: number,
          notes: string
        ) => {
          if (!currentSelectedStudent) return;
          updateStudentRecord(currentSelectedStudent.id, {
            teacherGrade: grade,
            teacherNotes: notes,
          });
          if (currentSelectedStudent.name === profile.name) {
            updateTeacherGrading({
              finalScore: grade,
              notes,
            });
          }
          setIndividualSavedNotice(true);
          setTimeout(() => setIndividualSavedNotice(false), 3000);
        };

        const uniqueClasses = Array.from(new Set(registeredStudents.map((s) => s.studentClass)));

        return (
          <div className="space-y-6">
            
            {/* Header with Sub-view Switcher Tabs */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                    <FileSpreadsheet className="w-4 h-4" />
                    Pusat Rekapitulasi Pembelajaran Guru • Bab 7
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                    Rekapitulasi Portofolio & Evaluasi Siswa
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Pilih antara analisis statistik keseluruhan kelas atau buka rapor dossier perorangan secara lengkap.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4 text-cyan-400" />
                    <span>Cetak Laporan Resmi</span>
                  </button>
                </div>
              </div>

              {/* Subview Navigation Tabs (Keseluruhan vs Perorangan) */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setRekapSubView('keseluruhan')}
                  className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer ${
                    rekapSubView === 'keseluruhan'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20 border border-cyan-400/50'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>1. Data Secara Keseluruhan (Analisis Kelas)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRekapSubView('perorangan')}
                  className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer ${
                    rekapSubView === 'perorangan'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-lg shadow-amber-500/20 border border-amber-300/50'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>2. Data Perorangan Secara Lengkap (Dossier Rapor)</span>
                </button>
              </div>
            </div>

            {/* =============================================================== */}
            {/* VIEW A: DATA SECARA KESELURUHAN (CLASS-WIDE ANALYTICS) */}
            {/* =============================================================== */}
            {rekapSubView === 'keseluruhan' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* 5 Class-Wide Key Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Total Murid</span>
                    <p className="text-2xl font-black text-white">{totalStudents} Siswa</p>
                    <span className="text-[10px] text-cyan-400 flex items-center gap-1 font-semibold">
                      <Users className="w-3 h-3" /> Terdaftar di Sistem
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Rata-rata Master Quiz</span>
                    <p className="text-2xl font-black text-cyan-400">{avgSummative} / 100</p>
                    <span className="text-[10px] text-slate-400">12 Soal HOTS (C4-C6)</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Rata-rata Rapor Guru</span>
                    <p className="text-2xl font-black text-amber-400">{avgTeacherGrade} / 100</p>
                    <span className="text-[10px] text-amber-300/80">Rubrik 4 Aspek + Sikap</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Ikrar Pemilih Sah</span>
                    <p className="text-2xl font-black text-emerald-400">{pledgePercent}%</p>
                    <span className="text-[10px] text-emerald-300">
                      {pledgeCount} dari {totalStudents} Siswa
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1 col-span-2 lg:col-span-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Total XP Kelas</span>
                    <p className="text-2xl font-black text-indigo-300">{totalXPAll} XP</p>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-cyan-400" /> Gamifikasi Aktif
                    </span>
                  </div>
                </div>

                {/* 2 Analytical Charts: Modality Distribution & Voting Simulation */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  
                  {/* Chart 1: Differentiated Modalities Distribution */}
                  <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="font-bold text-sm text-white flex items-center gap-2">
                          <PieChart className="w-4 h-4 text-cyan-400" />
                          Distribusi Gaya Belajar Diferensiasi (DUP / UDL)
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Pilihan media pembelajaran yang diakses peserta didik kelas XII.
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                        N = {totalStudents}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {/* Visual */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-cyan-300 flex items-center gap-1.5">
                            🎨 Visual (Infografis & Poster)
                          </span>
                          <span className="text-white font-mono">
                            {countVisual} siswa ({totalStudents > 0 ? Math.round((countVisual / totalStudents) * 100) : 0}%)
                          </span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                            style={{
                              width: `${totalStudents > 0 ? (countVisual / totalStudents) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Reading */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-amber-300 flex items-center gap-1.5">
                            📖 Membaca (Artikel Teks & Regulasi)
                          </span>
                          <span className="text-white font-mono">
                            {countReading} siswa ({totalStudents > 0 ? Math.round((countReading / totalStudents) * 100) : 0}%)
                          </span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-500"
                            style={{
                              width: `${totalStudents > 0 ? (countReading / totalStudents) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Auditory */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-emerald-300 flex items-center gap-1.5">
                            🎧 Auditori (Podcast & Narasi Suara)
                          </span>
                          <span className="text-white font-mono">
                            {countAudio} siswa ({totalStudents > 0 ? Math.round((countAudio / totalStudents) * 100) : 0}%)
                          </span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                            style={{
                              width: `${totalStudents > 0 ? (countAudio / totalStudents) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Video */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-rose-300 flex items-center gap-1.5">
                            🎬 Video (Media Pembelajaran YouTube)
                          </span>
                          <span className="text-white font-mono">
                            {countVideo} siswa ({totalStudents > 0 ? Math.round((countVideo / totalStudents) * 100) : 0}%)
                          </span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-rose-500 to-red-400 rounded-full transition-all duration-500"
                            style={{
                              width: `${totalStudents > 0 ? (countVideo / totalStudents) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chart 2: Voting Simulation Tally */}
                  <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="font-bold text-sm text-white flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-amber-400" />
                          Rekapitulasi Suara Simulasi Pemilu Siswa
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Pilihan calon pemimpin berdasarkan telaah visi misi objektif.
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                        {totalVotes} Suara Masuk
                      </span>
                    </div>

                    <div className="space-y-3">
                      {/* Paslon 1 */}
                      <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-blue-500/20 text-cyan-300 text-[10px] font-black flex items-center justify-center">
                              01
                            </span>
                            Dr. Arya Pratama & Maya Indraswari
                          </span>
                          <span className="font-mono text-cyan-300 font-bold">
                            {votePaslon1} suara ({totalVotes > 0 ? Math.round((votePaslon1 / totalVotes) * 100) : 0}%)
                          </span>
                        </div>
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                            style={{
                              width: `${totalVotes > 0 ? (votePaslon1 / totalVotes) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Paslon 2 */}
                      <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-black flex items-center justify-center">
                              02
                            </span>
                            Siti Rahmawati, S.Pd. & Budi Santoso
                          </span>
                          <span className="font-mono text-emerald-300 font-bold">
                            {votePaslon2} suara ({totalVotes > 0 ? Math.round((votePaslon2 / totalVotes) * 100) : 0}%)
                          </span>
                        </div>
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                            style={{
                              width: `${totalVotes > 0 ? (votePaslon2 / totalVotes) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Paslon 3 */}
                      <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-black flex items-center justify-center">
                              03
                            </span>
                            H. Iskandar Zulkarnain & Putri Wulandari
                          </span>
                          <span className="font-mono text-amber-300 font-bold">
                            {votePaslon3} suara ({totalVotes > 0 ? Math.round((votePaslon3 / totalVotes) * 100) : 0}%)
                          </span>
                        </div>
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full transition-all duration-500"
                            style={{
                              width: `${totalVotes > 0 ? (votePaslon3 / totalVotes) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search & Class Filter Bar */}
                <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari nama siswa, NISN, atau kelompok PBL..."
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-400 font-semibold">Filter Kelas:</span>
                    <select
                      value={selectedClassFilter}
                      onChange={(e) => setSelectedClassFilter(e.target.value)}
                      className="bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-400"
                    >
                      <option value="ALL">Semua Kelas ({totalStudents})</option>
                      {uniqueClasses.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Comprehensive Class-wide Table */}
                <div className="rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-800/90 text-slate-300 font-bold border-b border-slate-700 uppercase tracking-wider text-[11px]">
                        <tr>
                          <th className="p-3.5">Nama Murid</th>
                          <th className="p-3.5">Kelas & NISN</th>
                          <th className="p-3.5">Gaya Belajar (DUP)</th>
                          <th className="p-3.5">Diagnostik</th>
                          <th className="p-3.5">Master Quiz</th>
                          <th className="p-3.5">Pilihan Paslon</th>
                          <th className="p-3.5">Nilai Rapor</th>
                          <th className="p-3.5">Ikrar</th>
                          <th className="p-3.5 text-center">Aksi Guru</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80">
                        {filteredStudents.map((s) => {
                          const candidateInfo = s.votedCandidate
                            ? candidateLookup[s.votedCandidate]
                            : null;
                          const finalCalc = Math.round(
                            ((s.summativeScore || 85) + (s.teacherGrade || 90)) / 2
                          );

                          return (
                            <tr key={s.id} className="hover:bg-slate-800/50 transition">
                              <td className="p-3.5 font-bold text-white">
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-full bg-blue-500/20 text-cyan-300 flex items-center justify-center font-bold text-[11px]">
                                    {s.name.charAt(0)}
                                  </div>
                                  <div>
                                    <span>{s.name}</span>
                                    <span className="block text-[10px] text-slate-400 font-normal">
                                      {s.lkpdGroupName}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              <td className="p-3.5 text-slate-300">
                                <span>{s.studentClass}</span>
                                <span className="block text-[10px] text-slate-500 font-mono">
                                  NISN: {s.nisn}
                                </span>
                              </td>

                              <td className="p-3.5">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${
                                    s.preferredModality === 'visual'
                                      ? 'bg-blue-500/10 text-cyan-300 border-cyan-500/30'
                                      : s.preferredModality === 'reading'
                                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                                      : s.preferredModality === 'audio'
                                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                                      : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                                  }`}
                                >
                                  {s.preferredModality}
                                </span>
                              </td>

                              <td className="p-3.5">
                                {s.diagnosticDone ? (
                                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                                    <CheckCircle className="w-3.5 h-3.5" /> Tuntas
                                  </span>
                                ) : (
                                  <span className="text-slate-500">Belum</span>
                                )}
                              </td>

                              <td className="p-3.5 font-bold text-cyan-400 font-mono">
                                {s.summativeScore !== null ? `${s.summativeScore} / 100` : '-'}
                              </td>

                              <td className="p-3.5">
                                {candidateInfo ? (
                                  <span className="text-amber-300 font-semibold text-[11px] flex items-center gap-1">
                                    <span>Paslon 0{candidateInfo.number}</span>
                                  </span>
                                ) : (
                                  <span className="text-slate-500">-</span>
                                )}
                              </td>

                              <td className="p-3.5 font-black text-emerald-400 text-sm">
                                {finalCalc}
                              </td>

                              <td className="p-3.5">
                                {s.pledgeSigned ? (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                                    Sah
                                  </span>
                                ) : (
                                  <span className="text-slate-500 text-[10px]">Belum</span>
                                )}
                              </td>

                              <td className="p-3.5 text-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedStudentId(s.id);
                                    setRekapSubView('perorangan');
                                    window.scrollTo({ top: 300, behavior: 'smooth' });
                                  }}
                                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-cyan-500 text-white font-bold text-[11px] transition shadow cursor-pointer"
                                >
                                  Buka Dossier &rarr;
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* =============================================================== */}
            {/* VIEW B: DATA PERORANGAN SECARA LENGKAP (INDIVIDUAL DOSSIER) */}
            {/* =============================================================== */}
            {rekapSubView === 'perorangan' && currentSelectedStudent && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* Student Selector Dropdown Bar */}
                <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-amber-400" />
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Pilih Peserta Didik untuk Ditampilkan Rapor Lengkapnya:
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Menampilkan portofolio, pilihan paslon, hasil tes, dan stasiun penilaian guru.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedStudentId}
                      onChange={(e) => setSelectedStudentId(e.target.value)}
                      className="bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-amber-400 min-w-56"
                    >
                      {registeredStudents.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.studentClass})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {individualSavedNotice && (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                    <CheckCircle className="w-4 h-4" />
                    Penilaian dan catatan guru untuk {currentSelectedStudent.name} berhasil disimpan!
                  </div>
                )}

                {/* Printable Individual Report Dossier */}
                <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/95 border border-slate-800 space-y-8 shadow-2xl">
                  
                  {/* Official Dossier Header */}
                  <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-400">
                        <GraduationCap className="w-4 h-4" />
                        BERKAS PORTOFOLIO INDIVIDUAL SISWA (UKIN PPG)
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                        {currentSelectedStudent.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {currentSelectedStudent.school} • Kelas {currentSelectedStudent.studentClass} • NISN: {currentSelectedStudent.nisn}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-slate-400 block font-mono">
                        Terdaftar: {currentSelectedStudent.registeredAt}
                      </span>
                      <span className="text-xs font-bold text-cyan-400">
                        Status: {currentSelectedStudent.lastActive}
                      </span>
                    </div>
                  </div>

                  {/* 4 Detail Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    
                    {/* 1. Modality & XP */}
                    <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-2">
                      <span className="text-[10px] font-extrabold uppercase text-cyan-400 block">
                        Preferensi Belajar (DUP)
                      </span>
                      <p className="text-base font-black text-white capitalize">
                        {currentSelectedStudent.preferredModality}
                      </p>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        Level {currentSelectedStudent.level} • {currentSelectedStudent.xp} XP Terkumpul
                      </p>
                    </div>

                    {/* 2. Diagnostic */}
                    <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-2">
                      <span className="text-[10px] font-extrabold uppercase text-emerald-400 block">
                        Asesmen Diagnostik Awal
                      </span>
                      <p className="text-base font-black text-white">
                        {currentSelectedStudent.diagnosticDone ? 'Tuntas Diselesaikan' : 'Belum'}
                      </p>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        Kesiapan pengetahuan pemilih pemula terpetakan.
                      </p>
                    </div>

                    {/* 3. Master Quiz HOTS */}
                    <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-2">
                      <span className="text-[10px] font-extrabold uppercase text-amber-400 block">
                        Master Quiz HOTS (12 Soal)
                      </span>
                      <p className="text-base font-black text-amber-300 font-mono">
                        {currentSelectedStudent.summativeScore !== null
                          ? `${currentSelectedStudent.summativeScore} / 100`
                          : 'Sedang Berlangsung'}
                      </p>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        Kognitif C4-C6 Analisis Kasus Pemilu
                      </p>
                    </div>

                    {/* 4. Ikrar */}
                    <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/80 space-y-2">
                      <span className="text-[10px] font-extrabold uppercase text-rose-400 block">
                        Sertifikat & Ikrar
                      </span>
                      <p className="text-base font-black text-white">
                        {currentSelectedStudent.pledgeSigned ? 'Terbit & Sah' : 'Menunggu Ikrar'}
                      </p>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        Komitmen tolak suap & cek fakta medsos
                      </p>
                    </div>

                  </div>

                  {/* LKPD & Solusi Proyek Siswa */}
                  <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/70 space-y-2">
                    <span className="text-[10px] font-extrabold uppercase text-cyan-400 tracking-wider">
                      Proyek Penyelidikan Problem Based Learning (PBL):
                    </span>
                    <h4 className="text-base font-bold text-white">
                      "{currentSelectedStudent.lkpdSolutionTitle || 'PROYEK KAMPANYE PEMILIH CERDAS'}"
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
                      <span>Kelompok: <strong>{currentSelectedStudent.lkpdGroupName}</strong></span>
                      <span>•</span>
                      <span>Format Media: <strong className="uppercase text-amber-300">{currentSelectedStudent.lkpdSolutionType}</strong></span>
                    </div>
                  </div>

                  {/* Simulasi Bilik Suara & Rasionalisasi Pilihan */}
                  <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-800/40 space-y-2">
                    <span className="text-[10px] font-extrabold uppercase text-cyan-300 tracking-wider">
                      Pilihan Simulasi Bilik Suara & Rasionalisasi Siswa:
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      Calon yang Dipilih: {currentSelectedStudent.votedCandidate ? candidateLookup[currentSelectedStudent.votedCandidate]?.name || currentSelectedStudent.votedCandidate : 'Belum Memilih'}
                    </p>
                    {currentSelectedStudent.voterRationale && (
                      <p className="text-xs text-slate-300 italic bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                        "{currentSelectedStudent.voterRationale}"
                      </p>
                    )}
                  </div>

                  {/* Teacher Rubric & Notes Form for This Selected Student */}
                  <div className="p-6 rounded-3xl bg-slate-850 border border-slate-700/90 space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                      <h4 className="font-bold text-sm text-white flex items-center gap-2">
                        <Scale className="w-4 h-4 text-amber-400" />
                        Stasiun Input Penilaian Guru Khusus untuk: {currentSelectedStudent.name}
                      </h4>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        Nilai Saat Ini: {currentSelectedStudent.teacherGrade || 90} / 100
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Nilai Akhir Rapor Guru (0 - 100):
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          defaultValue={currentSelectedStudent.teacherGrade || 90}
                          id={`teacher-grade-input-${currentSelectedStudent.id}`}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-emerald-300 font-black text-lg focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Catatan Umpan Balik Guru Fasilitator:
                        </label>
                        <textarea
                          rows={2}
                          defaultValue={currentSelectedStudent.teacherNotes || 'Peserta didik sangat aktif dan menunjukkan integritas pemilih cerdas.'}
                          id={`teacher-notes-input-${currentSelectedStudent.id}`}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          const gradeInput = document.getElementById(
                            `teacher-grade-input-${currentSelectedStudent.id}`
                          ) as HTMLInputElement;
                          const notesInput = document.getElementById(
                            `teacher-notes-input-${currentSelectedStudent.id}`
                          ) as HTMLTextAreaElement;
                          const gradeVal = parseInt(gradeInput?.value) || 90;
                          const notesVal = notesInput?.value || '';
                          handleSaveSelectedStudentGrade(gradeVal, notesVal);
                        }}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs hover:brightness-110 shadow-lg shadow-amber-500/20 transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Simpan Penilaian Siswa Ini</span>
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        );
      })()}

    </div>
  );
};
