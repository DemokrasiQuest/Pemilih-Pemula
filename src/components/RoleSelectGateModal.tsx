/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Eye,
  EyeOff,
  GraduationCap,
  KeyRound,
  Lock,
  Radio,
  School,
  Shield,
  Sparkles,
  User,
  Users,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RoleSelectGateModal: React.FC = () => {
  const {
    showRoleGate,
    closeRoleGate,
    userRole,
    profile,
    registerAndEnterAsStudent,
    enterAsTeacher,
  } = useApp();

  const [selectedRole, setSelectedRole] = useState<'murid' | 'guru'>('murid');

  // Student Form
  const [studentName, setStudentName] = useState(profile.name || '');
  const [studentClass, setStudentClass] = useState(profile.studentClass || 'XII MIPA 1');
  const [studentNisn, setStudentNisn] = useState(profile.nisn || '0078912345');
  const [studentSchool, setStudentSchool] = useState(profile.school || 'SMA Negeri 1 Indonesia Merdeka');
  const [studentError, setStudentError] = useState('');

  // Teacher Form
  const [teacherPin, setTeacherPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [teacherError, setTeacherError] = useState('');

  if (!showRoleGate) return null;

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setStudentError('Nama Lengkap wajib diisi!');
      return;
    }
    if (!studentClass.trim()) {
      setStudentError('Kelas wajib diisi!');
      return;
    }
    setStudentError('');
    registerAndEnterAsStudent(studentName, studentClass, studentSchool, studentNisn);
  };

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTeacherError('');
    const success = enterAsTeacher(teacherPin);
    if (!success) {
      setTeacherError('Kode PIN guru tidak valid. Silakan masukkan kode keamanan yang benar.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-4">
        
        {/* Glow Header Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-cyan-400 to-amber-400" />

        {/* Close button if user already had a role (modal opened via "Ganti Peran") */}
        {userRole && (
          <button
            onClick={closeRoleGate}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide">
              <Shield className="w-4 h-4 text-cyan-400" />
              PENDIDIKAN PANCASILA KELAS XII SMA • BAB 7
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              DEMOKRASI QUEST
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              "Satu Suara, Sejuta Makna untuk Indonesia" — Silakan tentukan mode akses Anda untuk memulai pembelajaran.
            </p>
          </div>

          {/* Role Choice Switcher Tabs */}
          <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700">
            <button
              type="button"
              onClick={() => setSelectedRole('murid')}
              className={`p-3.5 rounded-xl text-left transition flex items-center gap-3 ${
                selectedRole === 'murid'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 border border-cyan-400/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-750'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                selectedRole === 'murid' ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-300'
              }`}>
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-cyan-200">
                  Peserta Didik
                </span>
                <span className="font-extrabold text-sm sm:text-base">
                  Mode Murid
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('guru')}
              className={`p-3.5 rounded-xl text-left transition flex items-center gap-3 ${
                selectedRole === 'guru'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-lg shadow-amber-500/25 border border-amber-300/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-750'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                selectedRole === 'guru' ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-700 text-slate-300'
              }`}>
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className={`block text-xs font-bold uppercase tracking-wider ${
                  selectedRole === 'guru' ? 'text-slate-900' : 'text-amber-400'
                }`}>
                  Fasilitator Pembelajaran
                </span>
                <span className="font-extrabold text-sm sm:text-base">
                  Mode Guru
                </span>
              </div>
            </button>
          </div>

          {/* ================================================================= */}
          {/* TAB 1: FORM MODE MURID */}
          {/* ================================================================= */}
          {selectedRole === 'murid' && (
            <form onSubmit={handleStudentSubmit} className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-800/40 text-xs text-blue-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Identitas Murid untuk Rekap Pembelajaran Otomatis
                </div>
                <p className="text-[11px] text-slate-300">
                  Data nama dan kelas akan otomatis dicatat ke <strong>Dashboard Guru</strong>, lembar kerja penyelidikan (LKPD), dan <strong>Sertifikat Resmi Pelopor Demokrasi</strong>.
                </p>
              </div>

              {studentError && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/60 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{studentError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    Nama Lengkap Murid <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bintang Nusantara"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition shadow-inner"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    Kelas / Rombel SMA <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: XII MIPA 1 / XII IPS 2"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition shadow-inner"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <School className="w-3.5 h-3.5 text-slate-400" />
                    Nama Satuan Pendidikan (Sekolah)
                  </label>
                  <input
                    type="text"
                    value={studentSchool}
                    onChange={(e) => setStudentSchool(e.target.value)}
                    placeholder="SMA Negeri 1 Indonesia Merdeka"
                    className="w-full bg-slate-800/90 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    NISN (Nomor Induk Siswa Nasional)
                  </label>
                  <input
                    type="text"
                    value={studentNisn}
                    onChange={(e) => setStudentNisn(e.target.value)}
                    placeholder="Contoh: 0078912345"
                    className="w-full bg-slate-800/90 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Differentiated Modality Preview Notice */}
              <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700 text-xs text-slate-300 space-y-2">
                <span className="font-bold text-white text-[11px] uppercase tracking-wider block">
                  ✨ Dilengkapi Fitur Diferensiasi Pembelajaran (DUP / UDL):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-700 flex items-center gap-1.5 text-cyan-300 font-semibold">
                    <span>🎨</span> Infografis Visual
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-700 flex items-center gap-1.5 text-amber-300 font-semibold">
                    <span>📖</span> Full Artikel Teks
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-700 flex items-center gap-1.5 text-emerald-300 font-semibold">
                    <span>🎧</span> Podcast Audio
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-700 flex items-center gap-1.5 text-rose-300 font-semibold">
                    <span>🎬</span> Video YouTube
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-500/30 transition flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Masuk Sebagai Murid & Mulai Belajar</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
            </form>
          )}

          {/* ================================================================= */}
          {/* TAB 2: FORM MODE GURU (PIN 262626) */}
          {/* ================================================================= */}
          {selectedRole === 'guru' && (
            <form onSubmit={handleTeacherSubmit} className="space-y-5 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  Otorisasi Keamanan Fasilitator Pembelajaran (UKIN PPG)
                </div>
                <p className="text-[11px] text-slate-300">
                  Mode ini menyediakan akses kontrol sintaks PBL, timer kelas, kunci jawaban HOTS, rekap portofolio seluruh kelas, dan rapor individual murid.
                </p>
              </div>

              {teacherError && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/60 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{teacherError}</span>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-200">
                    Masukkan Kode PIN Guru:
                  </label>
                  <span className="text-[11px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-600/30">
                    Khusus Pendidik
                  </span>
                </div>

                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    required
                    maxLength={10}
                    placeholder="Masukkan 6 digit kode PIN guru"
                    value={teacherPin}
                    onChange={(e) => setTeacherPin(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 focus:border-amber-400 rounded-xl pl-4 pr-11 py-3 text-base font-mono tracking-widest text-center text-amber-300 placeholder-slate-500 focus:outline-none transition shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                    aria-label="Lihat PIN"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 text-xs text-slate-300 space-y-1.5">
                <span className="font-bold text-white text-[11px] block">
                  Fitur Khusus yang Dibuka di Dashboard Guru:
                </span>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400">
                  <li><strong>Rekap Data Keseluruhan</strong>: Analisis statistik kelas, distribusi gaya belajar UDL, & perolehan suara paslon.</li>
                  <li><strong>Data Perorangan Lengkap</strong>: Dossier individual, riwayat aktivitas, skor HOTS, & stasiun penilaian rubrik.</li>
                  <li><strong>Kunci Jawaban Resmi</strong>: 12 butir soal HOTS beserta pembahasan rasional ilmiah & pedagogis.</li>
                  <li><strong>Kontrol Sintaks PBL</strong>: Pengatur tahapan belajar dan Classroom Timer 5-25 menit.</li>
                </ul>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:brightness-110 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/30 transition flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Lock className="w-5 h-5 text-slate-950" />
                <span>Verifikasi Kode & Buka Dashboard Guru</span>
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
