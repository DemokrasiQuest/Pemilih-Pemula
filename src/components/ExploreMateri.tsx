/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  CheckCircle2,
  ChevronRight,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Headphones,
  HelpCircle,
  Layers,
  Lightbulb,
  Maximize2,
  Mic,
  Minimize2,
  Pause,
  Play,
  Printer,
  RotateCcw,
  Scale,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Tv,
  Volume2,
  VolumeX,
  X,
  XCircle,
  Youtube,
  Zap,
} from 'lucide-react';
import { MATERI_BAB_7 } from '../data/learningData';
import { useApp } from '../context/AppContext';
import { DifferentiatedMode } from '../types';

// Tailored rich infographic visual data for each subtopic
interface InfographicVisualData {
  stats: { value: string; label: string; icon: string }[];
  flowSteps: { step: number; title: string; tag: string; desc: string; icon: string }[];
  comparison: {
    dos: { title: string; desc: string }[];
    donts: { title: string; desc: string }[];
  };
}

const INFOGRAPHIC_DETAILS: Record<string, InfographicVisualData> = {
  'materi-a': {
    stats: [
      { value: '100%', label: 'Kedaulatan di Tangan Rakyat', icon: '👑' },
      { value: 'Sila ke-4', label: 'Musyawarah Mufakat Bermartabat', icon: '🏛️' },
      { value: '3 Pilar', label: 'Checks & Balances Kekuasaan', icon: '⚖️' },
      { value: '52%+', label: 'Proporsi Pemilih Muda Nasional', icon: '🔥' },
    ],
    flowSteps: [
      { step: 1, title: 'Kedaulatan Konstitusional', tag: 'Pasal 1 ayat 2 UUD 1945', desc: 'Kekuasaan tertinggi negara bersumber dari kehendak rakyat yang disalurkan melalui hukum.', icon: '📜' },
      { step: 2, title: 'Musyawarah Mufakat', tag: 'Jiwa Sila Keempat', desc: 'Mengutamakan integrasi gagasan dan menghormati hak minoritas tanpa tirani suara terbanyak.', icon: '🤝' },
      { step: 3, title: 'Checks & Balances', tag: 'Trias Politika', desc: 'Eksekutif, Legislatif, dan Yudikatif saling mengimbangi demi mencegah korupsi kekuasaan.', icon: '⚖️' },
      { step: 4, title: 'Kepeloporan Pelajar', tag: 'Generasi Z Kritis', desc: 'Mengawal transparansi kebijakan publik sejak di sekolah hingga forum pemilu resmi.', icon: '🚀' },
    ],
    comparison: {
      dos: [
        { title: 'Mengutamakan Musyawarah', desc: 'Menghormati perbedaan opini dan berorientasi pada kemaslahatan bersama.' },
        { title: 'Kritis Berbasis Regulasi', desc: 'Mendasarkan argumen pada konstitusi dan data empiris yang sah.' },
      ],
      donts: [
        { title: 'Tirani Mayoritas', desc: 'Memaksakan kehendak sepihak hanya karena memiliki jumlah pendukung terbanyak.' },
        { title: 'Apatis & Golput', desc: 'Menyerahkan nasib bangsa kepada pihak lain tanpa berpartisipasi aktif.' },
      ],
    },
  },
  'materi-b': {
    stats: [
      { value: '6 Asas', label: 'LUBER & JURDIL', icon: '🗳️' },
      { value: '3 Lembaga', label: 'Sinergi KPU, Bawaslu & DKPP', icon: '🏛️' },
      { value: '5 Tahun', label: 'Siklus Mandat Konstitusi', icon: '⏳' },
      { value: 'Pasal 22E', label: 'Jaminan UUD NRI 1945', icon: '📖' },
    ],
    flowSteps: [
      { step: 1, title: 'Langsung & Umum', tag: 'Asas 1 & 2', desc: 'Pemilih mencoblos tanpa perantara dan berlaku setara bagi semua warga tanpa diskriminasi.', icon: '👤' },
      { step: 2, title: 'Bebas & Rahasia', tag: 'Asas 3 & 4', desc: 'Bilik suara tertutup kain menjamin kerahasiaan tanpa intimidasi pihak luar.', icon: '🔒' },
      { step: 3, title: 'Jujur & Adil', tag: 'Asas 5 & 6', desc: 'Penghitungan transparan terbuka disaksikan saksi independen dan diawasi ketat.', icon: '⚖️' },
      { step: 4, title: 'Tinta Ungu Antikurang', tag: 'Integritas TPS', desc: 'Mencegah pemilih ganda dan menjadi simbol sah telah menunaikan kedaulatan rakyat.', icon: '💜' },
    ],
    comparison: {
      dos: [
        { title: 'Mencoblos Mandiri di Bilik', desc: 'Memastikan surat suara ditusuk sesuai hati nurani sendiri.' },
        { title: 'Mengawal Penghitungan Suara', desc: 'Mendokumentasikan plano C-Hasil di TPS sebagai saksi warga.' },
      ],
      donts: [
        { title: 'Memotret Pilihan Suara', desc: 'Dilarang membawa kamera/HP ke bilik untuk menjaga asas rahasia.' },
        { title: 'Menitipkan Hak Pilih', desc: 'Suara tidak boleh diwakilkan kepada keluarga atau tim manapun.' },
      ],
    },
  },
  'materi-c': {
    stats: [
      { value: '5 Indikator', label: 'Kriteria Pemimpin Berintegritas', icon: '🌟' },
      { value: '100% Cek', label: 'Status DPT di cekdptonline', icon: '📱' },
      { value: '0 Kasus', label: 'Bebas Korupsi & Pelanggaran Hukum', icon: '🛡️' },
      { value: '16 Digit', label: 'KTP-el Syarat Sah Memilih', icon: '🆔' },
    ],
    flowSteps: [
      { step: 1, title: 'Cek DPT Online KPU', tag: 'Langkah Verifikasi Awal', desc: 'Ketik 16 digit NIK di cekdptonline.kpu.go.id untuk memastikan lokasi TPS kamu.', icon: '🔍' },
      { step: 2, title: 'Bedah Visi & Misi', tag: 'Uji Program Kerja', desc: 'Cermati apakah janji kampanye realistis, terukur anggarannya, dan berpihak pada pendidikan.', icon: '📑' },
      { step: 3, title: 'Uji Rekam Jejak (Track Record)', tag: 'Integritas Moral', desc: 'Periksa kepatuhan LHKPN, rekam jejak kepemimpinan, dan konsistensi perkataan calon.', icon: '🔎' },
      { step: 4, title: 'Putuskan Rasional', tag: 'Bukan Fanatisme', desc: 'Memilih berdasarkan kompetensi nyata, bukan sekadar popularitas semu di media sosial.', icon: '💡' },
    ],
    comparison: {
      dos: [
        { title: 'Memeriksa LHKPN & Riwayat', desc: 'Meneliti laporan harta kekayaan dan rekam jejak pengabdian masyarakat.' },
        { title: 'Kritis Terhadap Janji Manis', desc: 'Meminta kejelasan sumber anggaran program kerja calon.' },
      ],
      donts: [
        { title: 'Memilih Karena Gimmick', desc: 'Tergiur goyangan joget medsos tanpa tahu visi misi nyatanya.' },
        { title: 'Ikut-ikutan Pilihan Teman', desc: 'Tidak memiliki pendirian rasional dan sekadar ikut arus viral.' },
      ],
    },
  },
  'materi-d': {
    stats: [
      { value: 'Pasal 523', label: 'Pidana Suap UU Pemilu No 7/2017', icon: '⚖️' },
      { value: '4 Tahun', label: 'Maksimal Penjara Politik Uang', icon: '⛓️' },
      { value: 'Rp 48 Juta', label: 'Denda Pidana Pelanggar', icon: '🚫' },
      { value: '1 Suara', label: 'Menentukan Kebijakan 5 Tahun', icon: '🎯' },
    ],
    flowSteps: [
      { step: 1, title: 'Waspada Serangan Fajar', tag: 'Modus Klasik', desc: 'Pembagian uang, sembako, atau voucher di masa tenang menjelang hari pencoblosan.', icon: '✉️' },
      { step: 2, title: 'Ketahui Kerugian Nyata', tag: 'Biaya Mahal', desc: 'Uang 100 ribu habis sehari, namun memicu korupsi anggaran sekolah dan jalan 5 tahun.', icon: '📉' },
      { step: 3, title: 'Berani Menolak Santun', tag: 'Sikap Berintegritas', desc: 'Menolak pemberian suap secara tegas: "Saya memilih dengan hati nurani, bukan uang".', icon: '✋' },
      { step: 4, title: 'Laporkan ke Bawaslu', tag: 'Aplikasi Gowaslu', desc: 'Dokumentasikan bukti dan laporkan ke Panwaslu kelurahan atau kanal resmi Bawaslu.', icon: '📢' },
    ],
    comparison: {
      dos: [
        { title: 'Tolak Uang & Tolak Calonnya', desc: 'Mencegah timses menormalisasi suap sebagai metode memenangkan pemilu.' },
        { title: 'Edukasi Keluarga & Kerabat', desc: 'Mengingatkan orang tua bahwa suap pemilu diancam pidana kurungan.' },
      ],
      donts: [
        { title: '"Ambil Uangnya, Jangan Coblos"', desc: 'Slogan keliru yang tetap memvalidasi kejahatan politik uang.' },
        { title: 'Menyimpan & Menyembunyikan', desc: 'Membiarkan operasi serangan fajar merusak demokrasi di lingkungan sendiri.' },
      ],
    },
  },
  'materi-e': {
    stats: [
      { value: '4 Tipe', label: 'Kategori Hoaks Medsos Utama', icon: '📱' },
      { value: 'S.T.O.P', label: 'Protokol Cek Fakta Digital', icon: '🛑' },
      { value: '3 Portal', label: 'CekFakta, TurnBackHoax, Kominfo', icon: '🌐' },
      { value: '100% Cermat', label: 'Verifikasi Sebelum Berbagi', icon: '🛡️' },
    ],
    flowSteps: [
      { step: 1, title: 'S - Stop Sejenak', tag: 'Tahan Emosi', desc: 'Jangan langsung terpancing kemarahan atau ketakutan saat membaca berita sensasional.', icon: '🛑' },
      { step: 2, title: 'T - Telusuri Sumber', tag: 'Periksa Media', desc: 'Periksa apakah nama media terdaftar di Dewan Pers dan mencantumkan alamat redaksi jelas.', icon: '🔎' },
      { step: 3, title: 'O - Observasi Bukti', tag: 'Reverse Image', desc: 'Gunakan Google Lens atau Yandex Image untuk melacak foto lama yang dipakai ulang.', icon: '🖼️' },
      { step: 4, title: 'P - Periksa Tanggal & Ahli', tag: 'Klarifikasi Fakta', desc: 'Cek di situs cekfakta.com atau database Mafindo sebelum membagikan ke grup WA.', icon: '✅' },
    ],
    comparison: {
      dos: [
        { title: 'Tabayyun & Verifikasi', desc: 'Selalu menguji kebenaran berita ke minimal 2 media arus utama terverifikasi.' },
        { title: 'Bagikan Klarifikasi Santun', desc: 'Membagikan link bantahan fakta saat melihat hoaks di grup percakapan.' },
      ],
      donts: [
        { title: 'Forward Tanpa Baca', desc: 'Menyebarkan narasi clickbait dengan instruksi "Sebarkan sebelum dihapus".' },
        { title: 'Menelan Mentah Deepfake AI', desc: 'Mudah tertipu oleh video atau audio tiruan kecerdasan buatan.' },
      ],
    },
  },
};

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

  // Active modality: 'visual' | 'reading' | 'audio' | 'video'
  const [activeModality, setActiveModality] = useState<DifferentiatedMode>(preferredModality || 'visual');

  // Video Mode Switch: 'youtube' | 'interactive_sim'
  const [videoPlaybackMode, setVideoPlaybackMode] = useState<'youtube' | 'interactive_sim'>('youtube');

  // In-App Simulated Video Player State
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgressSeconds, setVideoProgressSeconds] = useState(0);
  const totalVideoDurationSeconds = 300; // 5 mins

  // Fullscreen Infographic Modal
  const [isFullscreenInfographic, setIsFullscreenInfographic] = useState(false);

  // Podcast player local state
  const [isPodcastPlaying, setIsPodcastPlaying] = useState(false);

  const currentMateri = MATERI_BAB_7[activeMateriIndex];
  const currentInfographic = INFOGRAPHIC_DETAILS[currentMateri.id] || INFOGRAPHIC_DETAILS['materi-a'];
  const hasCompletedQuiz = miniQuizScores[currentMateri.id] !== undefined;

  // Video timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isVideoPlaying && videoProgressSeconds < totalVideoDurationSeconds) {
      interval = setInterval(() => {
        setVideoProgressSeconds((prev) => {
          if (prev >= totalVideoDurationSeconds - 1) {
            setIsVideoPlaying(false);
            return totalVideoDurationSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVideoPlaying, videoProgressSeconds]);

  const formatVideoTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
    setIsVideoPlaying(false);
  };

  const handleNextMateri = () => {
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    stopSpeech();
    setIsPodcastPlaying(false);
    setIsVideoPlaying(false);
    setVideoProgressSeconds(0);
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
    setIsVideoPlaying(false);
    setVideoProgressSeconds(0);
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

  // Determine active video scene based on current seconds
  const currentSceneIdx = videoProgressSeconds < 90 ? 0 : videoProgressSeconds < 200 ? 1 : 2;
  const videoScenes = [
    {
      title: 'Bagian 1: Pengantar Masalah & Konteks Lapangan',
      subtitle: `Dilema Pemilih Pemula di Era Digital (${currentMateri.code})`,
      narrator: 'Fasilitator Edukasi Pemilu',
      text: currentMateri.summary,
      highlight: 'Generasi muda adalah penentu arah masa depan bangsa!',
    },
    {
      title: 'Bagian 2: Telaah Landasan Hukum & Regulasi Konstitusi',
      subtitle: 'Membedah UU No. 7/2017 & UUD 1945',
      narrator: 'Pakar Hukum & Konstitusi',
      text: currentMateri.realLifeExample,
      highlight: 'Asas LUBER JURDIL wajib ditegakkan tanpa kompromi!',
    },
    {
      title: 'Bagian 3: Solusi Aksi Nyata Pelopor Demokrasi',
      subtitle: 'Komitmen Pemilih Muda Pancasilais Berintegritas',
      narrator: 'Duta Pemilih Cerdas',
      text: currentMateri.visualInfographic.posterTakeaway,
      highlight: 'Satu suara bermakna jutaan harapan bagi Indonesia!',
    },
  ];

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
            Silakan pilih subtopik di bawah ini, lalu pilih format media yang ingin Anda pelajari (Poster Infografis, Video YouTube, Artikel Teks, atau Podcast Suara).
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
                  setIsVideoPlaying(false);
                  setVideoProgressSeconds(0);
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
            Format yang sedang aktif: <strong className="text-cyan-300 capitalize">{activeModality}</strong>
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

          {/* 2. Video YouTube */}
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

          {/* 3. Reading */}
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

          {/* 4. Audio / Podcast */}
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
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. DYNAMIC CONTENT RENDERING BASED ON CHOSEN MODALITY */}
      {/* ========================================================================= */}
      
      {/* ------------------------------------------------------------------------- */}
      {/* A. MODALITY: VISUAL (INFOGRAFIS & POSTER EDUKASI NYATA) */}
      {/* ------------------------------------------------------------------------- */}
      {activeModality === 'visual' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Action Toolbar for Infographic */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-400" />
              <div>
                <span className="font-bold text-sm text-white block">
                  Poster Infografis Resmi: {currentMateri.code}
                </span>
                <span className="text-[11px] text-slate-400">
                  Desain grafis terstruktur untuk mempercepat pemahaman visual pemilih muda.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsFullscreenInfographic(true)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Perbesar Layar Penuh</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Cetak Poster</span>
              </button>
            </div>
          </div>

          {/* HIGH-FIDELITY VISUAL INFOGRAPHIC POSTER CANVAS */}
          <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-2 border-cyan-500/40 shadow-2xl space-y-8 overflow-hidden">
            
            {/* Poster Corner Watermark Badges */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

            {/* Poster Header */}
            <div className="text-center space-y-2 border-b border-slate-800 pb-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 text-[11px] font-black tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                POSTER INFOGRAFIS EDUKASI PEMILIH CERDAS • KELAS XII SMA
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {currentMateri.visualInfographic.title}
              </h2>
              <p className="text-xs sm:text-sm text-cyan-200/90 font-medium max-w-2xl mx-auto">
                {currentMateri.summary}
              </p>
            </div>

            {/* 1. VISUAL STATS / KEY METRICS (4 Graphic Callouts) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {currentInfographic.stats.map((st, sIdx) => (
                <div
                  key={sIdx}
                  className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 to-blue-950/40 border border-cyan-500/30 text-center space-y-1 shadow-md hover:border-cyan-400 transition group"
                >
                  <span className="text-2xl group-hover:scale-125 transition inline-block">
                    {st.icon}
                  </span>
                  <p className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono tracking-tight">
                    {st.value}
                  </p>
                  <span className="text-[11px] font-bold text-slate-300 leading-tight block">
                    {st.label}
                  </span>
                </div>
              ))}
            </div>

            {/* 2. INFOGRAPHIC FLOWCHART & STEP-BY-STEP DIAGRAM */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-cyan-400">
                <Layers className="w-4 h-4" />
                Bagan Alur Konsep & Langkah Penyelidikan Demokrasi:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {currentInfographic.flowSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 hover:border-cyan-400 transition space-y-2.5 relative flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 font-black text-sm flex items-center justify-center border border-cyan-500/40">
                          0{step.step}
                        </span>
                        <span className="text-xl">{step.icon}</span>
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-500/10 text-cyan-300 border border-cyan-500/20">
                        {step.tag}
                      </span>
                      <h4 className="font-extrabold text-sm text-white mt-1.5 group-hover:text-cyan-200 transition">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    {idx < 3 && (
                      <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-cyan-400/70 font-black">
                        &rarr;
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 3. VISUAL COMPARISON CHART (DO'S VS DON'TS) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {/* Positive Pillar */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-slate-900 border border-emerald-500/40 space-y-3 shadow-lg">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Sikap & Karakter Pelopor Pemilih Cerdas:
                </div>
                <div className="space-y-2.5">
                  {currentInfographic.comparison.dos.map((item, dIdx) => (
                    <div key={dIdx} className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/20 space-y-1">
                      <strong className="text-xs font-bold text-emerald-200 block">
                        ✓ {item.title}
                      </strong>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Negative Pillar */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-rose-950/30 to-slate-900 border border-rose-500/40 space-y-3 shadow-lg">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  Jebakan & Pelanggaran yang Harus Ditolak Keras:
                </div>
                <div className="space-y-2.5">
                  {currentInfographic.comparison.donts.map((item, dIdx) => (
                    <div key={dIdx} className="p-3 rounded-xl bg-slate-900/80 border border-rose-500/20 space-y-1">
                      <strong className="text-xs font-bold text-rose-200 block">
                        ✕ {item.title}
                      </strong>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. POSTER TAKEAWAY BANNER */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-cyan-900/40 border border-cyan-400/60 text-center space-y-2 shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                ★ PESAN KUNCI POSTER DEMOKRASI ★
              </span>
              <p className="text-sm sm:text-base font-extrabold text-white leading-relaxed max-w-3xl mx-auto">
                "{currentMateri.visualInfographic.posterTakeaway}"
              </p>
            </div>

          </div>

          {/* Quick Cross-Navigation Button to Video */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-300">
              Ingin memahami materi ini dalam format tayangan video animasi?
            </span>
            <button
              type="button"
              onClick={() => handleSwitchModality('video')}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Youtube className="w-4 h-4" />
              <span>Tonton Video Pembelajaran &rarr;</span>
            </button>
          </div>

        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* B. MODALITY: VIDEO (PEMUTAR YOUTUBE RESMI & SIMULASI INTERAKTIF) */}
      {/* ------------------------------------------------------------------------- */}
      {activeModality === 'video' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Video Player Header & Mode Selector */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Youtube className="w-4 h-4 text-rose-400" />
                  Media Video Pembelajaran Demokrasi Bab 7
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {currentMateri.youtubeVideo.title}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kanal Resmi: <strong>{currentMateri.youtubeVideo.channel}</strong> • Durasi: {currentMateri.youtubeVideo.duration}
                </p>
              </div>

              {/* Mode Switcher Buttons */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setVideoPlaybackMode('youtube')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    videoPlaybackMode === 'youtube'
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-750 border border-slate-700'
                  }`}
                >
                  <Youtube className="w-4 h-4" />
                  <span>Streaming YouTube</span>
                </button>

                <button
                  type="button"
                  onClick={() => setVideoPlaybackMode('interactive_sim')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    videoPlaybackMode === 'interactive_sim'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-750 border border-slate-700'
                  }`}
                >
                  <Tv className="w-4 h-4" />
                  <span>Simulasi Interaktif In-App</span>
                </button>
              </div>
            </div>

            {/* ============================================================= */}
            {/* 1. YOUTUBE EMBED STREAMING VIEW */}
            {/* ============================================================= */}
            {videoPlaybackMode === 'youtube' && (
              <div className="space-y-3">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl">
                  <iframe
                    src={currentMateri.youtubeVideo.embedUrl}
                    title={currentMateri.youtubeVideo.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 px-1 pt-1">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Video terkurasi resmi untuk pemilih pemula tingkat SMA
                  </span>

                  <a
                    href={currentMateri.youtubeVideo.embedUrl.replace('/embed/', '/watch?v=')}
                    target="_blank"
                    rel="noreferrer"
                    className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-bold underline transition"
                  >
                    <span>Buka Langsung di Aplikasi YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* ============================================================= */}
            {/* 2. IN-APP SIMULATED VIDEO PLAYER (ANTI-FIREWALL / GUARANTEED) */}
            {/* ============================================================= */}
            {videoPlaybackMode === 'interactive_sim' && (
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-cyan-500/40 space-y-5 shadow-2xl">
                
                {/* Active Simulated Scene Screen */}
                <div className="relative w-full aspect-video rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-inner">
                  
                  {/* Top Scene Marker */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                      {videoScenes[currentSceneIdx].title}
                    </span>
                    <span className="font-mono text-slate-400">
                      {formatVideoTime(videoProgressSeconds)} / {formatVideoTime(totalVideoDurationSeconds)}
                    </span>
                  </div>

                  {/* Scene Central Animated Canvas */}
                  <div className="my-auto text-center space-y-3 max-w-xl mx-auto">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 flex items-center justify-center mx-auto text-3xl shadow-xl shadow-cyan-500/20 animate-pulse">
                      🎬
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      {videoScenes[currentSceneIdx].subtitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                      "{videoScenes[currentSceneIdx].text}"
                    </p>
                    <div className="inline-block p-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
                      💡 {videoScenes[currentSceneIdx].highlight}
                    </div>
                  </div>

                  {/* Synchronized Subtitle Bar */}
                  <div className="p-2.5 rounded-xl bg-black/80 backdrop-blur-sm border border-slate-800 text-center text-xs text-yellow-300 font-semibold">
                    <span className="text-slate-400 mr-2">[{videoScenes[currentSceneIdx].narrator}]:</span>
                    {videoScenes[currentSceneIdx].text.slice(0, 95)}...
                  </div>
                </div>

                {/* Player Controls Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>{formatVideoTime(videoProgressSeconds)}</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setVideoProgressSeconds(0)}
                        className="text-slate-400 hover:text-white"
                        title="Putar Ulang dari Awal"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <span>Durasi Total: {formatVideoTime(totalVideoDurationSeconds)}</span>
                    </div>
                  </div>

                  {/* Scrubber Progress Bar */}
                  <div
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const percent = clickX / rect.width;
                      setVideoProgressSeconds(Math.floor(percent * totalVideoDurationSeconds));
                    }}
                    className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-700 cursor-pointer relative"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-300"
                      style={{
                        width: `${(videoProgressSeconds / totalVideoDurationSeconds) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Play / Pause Button */}
                  <div className="flex items-center justify-center pt-2">
                    <button
                      type="button"
                      onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                      className="px-6 py-2.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs transition flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
                    >
                      {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      <span>{isVideoPlaying ? 'Jeda Video' : 'Putar Video Edukasi'}</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* Video Summary Card */}
            <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 space-y-2">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                Rangkuman Intisari Video Pembelajaran:
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentMateri.youtubeVideo.videoSummary}
              </p>
            </div>

            {/* Discussion Questions */}
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

            {/* Quick Cross-Navigation Button to Infographic */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-300">
                Mau melihat poster infografis visual untuk merangkum materi ini?
              </span>
              <button
                type="button"
                onClick={() => handleSwitchModality('visual')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-cyan-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Buka Poster Infografis &rarr;</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ------------------------------------------------------------------------- */}
      {/* C. MODALITY: READING (FULL TULISAN ARTIKEL & KAJIAN REGULASI) */}
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
      {/* D. MODALITY: AUDITORI (PODCAST & DIALOG REKAMAN SUARA) */}
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

            let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-755';
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

      {/* ========================================================================= */}
      {/* 7. FULLSCREEN INFOGRAPHIC MODAL */}
      {/* ========================================================================= */}
      {isFullscreenInfographic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-5xl bg-slate-900 border-2 border-cyan-400 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-cyan-400" />
                <h3 className="font-black text-lg text-white">
                  Poster Infografis Layar Penuh: {currentMateri.visualInfographic.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  Cetak Poster
                </button>
                <button
                  onClick={() => setIsFullscreenInfographic(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Poster Canvas Inside Modal */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {currentInfographic.stats.map((st, sIdx) => (
                  <div key={sIdx} className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-center">
                    <span className="text-xl block">{st.icon}</span>
                    <strong className="text-xl font-black text-cyan-300 font-mono">{st.value}</strong>
                    <span className="text-[10px] text-slate-300 block">{st.label}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {currentInfographic.flowSteps.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
                    <span className="text-[10px] font-bold text-cyan-400 block">Langkah 0{step.step}</span>
                    <h5 className="font-bold text-xs text-white">{step.title}</h5>
                    <p className="text-[11px] text-slate-300">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-blue-950/60 border border-cyan-400/40 text-center">
                <p className="text-xs sm:text-sm font-bold text-cyan-200">
                  "{currentMateri.visualInfographic.posterTakeaway}"
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
