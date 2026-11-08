/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle,
  Eye,
  GraduationCap,
  HelpCircle,
  Lock,
  Menu,
  Shield,
  Sparkles,
  Type,
  Unlock,
  Users,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react';
import { getLevelTitle, useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    profile,
    udlSettings,
    updateUDLSettings,
    activeTab,
    setActiveTab,
    isTeacherMode,
    openTeacherPinModal,
    exitTeacherMode,
    isAudioSpeaking,
    stopSpeech,
    speakText,
    notification,
    clearNotification,
    openRoleGate,
    userRole,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [tempName, setTempName] = useState(profile.name);
  const [tempSchool, setTempSchool] = useState(profile.school);
  const [tempClass, setTempClass] = useState(profile.studentClass);
  const { updateProfile } = useApp();

  const handleCycleFontSize = () => {
    const next =
      udlSettings.fontSize === 'normal'
        ? 'large'
        : udlSettings.fontSize === 'large'
        ? 'extra'
        : 'normal';
    updateUDLSettings({ fontSize: next });
  };

  const handleToggleContrast = () => {
    updateUDLSettings({ highContrast: !udlSettings.highContrast });
  };

  const handleAudioToggle = () => {
    if (isAudioSpeaking) {
      stopSpeech();
    } else {
      speakText(
        'Selamat datang di Demokrasi Quest! Platform pembelajaran interaktif Pendidikan Pancasila Bab 7. Menjadi Pelopor Pemilih Pemula dalam Demokrasi Indonesia. Satu Suara, Sejuta Makna untuk Indonesia!'
      );
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: tempName,
      school: tempSchool,
      studentClass: tempClass,
    });
    setShowProfileModal(false);
  };

  return (
    <>
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-18 right-4 z-50 max-w-md bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-3 rounded-2xl shadow-2xl border border-cyan-300 flex items-center justify-between gap-3 animate-bounce">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            onClick={clearNotification}
            className="p-1 hover:bg-white/20 rounded-full transition"
            aria-label="Tutup notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Header */}
      <header className={`sticky top-0 z-40 transition-colors duration-200 border-b ${
        udlSettings.highContrast
          ? 'bg-black border-yellow-400 text-yellow-300'
          : 'bg-slate-900/90 backdrop-blur-md border-slate-800 text-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Logo & Identity */}
          <div
            onClick={() => setActiveTab('beranda')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                  DEMOKRASI QUEST
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 border border-cyan-500/30">
                  BAB 7 KELAS XII
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block font-medium">
                "Satu Suara, Sejuta Makna untuk Indonesia"
              </p>
            </div>
          </div>

          {/* Gamification Bar (XP, Level, Badges) */}
          <div className="hidden lg:flex items-center gap-3 bg-slate-800/80 border border-slate-700/80 rounded-2xl px-3.5 py-1.5 shadow-inner">
            {/* Level */}
            <div
              onClick={() => setShowProfileModal(true)}
              className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition pr-2 border-r border-slate-700"
              title="Klik untuk ubah data diri"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xs shadow-md">
                L{profile.level}
              </div>
              <div>
                <p className="text-[11px] font-semibold text-slate-200 leading-tight">
                  {profile.name}
                </p>
                <p className="text-[10px] text-amber-300 font-bold leading-tight">
                  {getLevelTitle(profile.level)}
                </p>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="flex flex-col gap-1 w-32">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-cyan-400 flex items-center gap-0.5">
                  <Zap className="w-3 h-3 fill-cyan-400 text-cyan-400" />
                  {profile.xp} XP
                </span>
                <span className="text-slate-400">
                  {profile.level < 5 ? `${profile.level * 300} XP` : 'MAX'}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      ((profile.xp % 300) / 300) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Badges count */}
            <button
              onClick={() => setActiveTab('refleksi')}
              className="flex items-center gap-1.5 bg-slate-900/60 hover:bg-slate-700/60 text-slate-200 px-2.5 py-1 rounded-xl text-xs font-semibold border border-slate-700 transition"
              title="Lihat Lencana dan Prestasi"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>{profile.unlockedBadges.length}/5</span>
            </button>
          </div>

          {/* UDL & Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* UDL Font Size Toggle */}
            <button
              onClick={handleCycleFontSize}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700 flex items-center gap-1 text-xs font-bold"
              title={`Ukuran Teks UDL: ${udlSettings.fontSize} (Klik untuk ubah)`}
              aria-label="Ubah ukuran font"
            >
              <Type className="w-4 h-4 text-cyan-400" />
              <span className="hidden md:inline uppercase text-[10px]">
                {udlSettings.fontSize === 'normal'
                  ? 'A'
                  : udlSettings.fontSize === 'large'
                  ? 'A+'
                  : 'A++'}
              </span>
            </button>

            {/* UDL High Contrast Mode */}
            <button
              onClick={handleToggleContrast}
              className={`p-2 rounded-xl border transition flex items-center gap-1 text-xs font-semibold ${
                udlSettings.highContrast
                  ? 'bg-yellow-400 text-black border-yellow-300 shadow-lg shadow-yellow-400/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title="Mode Kontras Tinggi (Aksesibilitas UDL)"
              aria-label="Kontras tinggi"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden md:inline text-[10px]">Kontras</span>
            </button>

            {/* UDL Audio Read Aloud */}
            <button
              onClick={handleAudioToggle}
              className={`p-2 rounded-xl border transition flex items-center gap-1 text-xs font-semibold ${
                isAudioSpeaking
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title="Pembaca Suara Audio UDL (Text-to-Speech)"
              aria-label="Audio narasi"
            >
              {isAudioSpeaking ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              )}
              <span className="hidden md:inline text-[10px]">
                {isAudioSpeaking ? 'Stop Audio' : 'Audio UDL'}
              </span>
            </button>

            {/* Switch Role Gate Button */}
            <button
              onClick={openRoleGate}
              className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition flex items-center gap-1.5 border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-cyan-300 hover:text-white"
              title="Ganti Mode / Pilih Antara Mode Murid & Mode Guru"
            >
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Ganti Peran</span>
            </button>

            {/* Teacher Mode Switch */}
            {isTeacherMode ? (
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/60 rounded-2xl p-1 shadow-md shadow-amber-500/10">
                <button
                  onClick={() => setActiveTab('dashboard_guru')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'dashboard_guru'
                      ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                      : 'text-amber-300 hover:text-white'
                  }`}
                  title="Buka Dashboard Guru"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span className="hidden sm:inline">Mode Guru (Aktif)</span>
                </button>
                <button
                  onClick={exitTeacherMode}
                  className="px-2 py-1.5 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-300 text-slate-300 text-[10px] font-bold border border-slate-700 transition"
                  title="Kunci Kembali Mode Guru (Keluar ke Mode Siswa)"
                >
                  Kunci
                </button>
              </div>
            ) : (
              <button
                onClick={openTeacherPinModal}
                className="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-amber-300 hover:border-amber-400/40 shadow-sm"
                title="Masuk Mode Guru dengan Kode PIN Khusus Pendidik"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Mode Guru</span>
              </button>
            )}

            {/* Mobile Nav Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              aria-label="Menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 py-4 space-y-2">
            <div className="bg-slate-800/80 p-3 rounded-xl mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">{profile.name}</p>
                <p className="text-xs text-amber-400 font-semibold">
                  Level {profile.level}: {getLevelTitle(profile.level)} ({profile.xp} XP)
                </p>
              </div>
              <button
                onClick={() => {
                  setShowProfileModal(true);
                  setMobileMenuOpen(false);
                }}
                className="text-xs bg-blue-600 px-2.5 py-1 rounded-lg font-bold text-white"
              >
                Ubah
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
              <button
                onClick={() => { setActiveTab('beranda'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left ${activeTab === 'beranda' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                🏠 Beranda
              </button>
              <button
                onClick={() => { setActiveTab('orientasi'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left ${activeTab === 'orientasi' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                🎯 Orientasi Belajar
              </button>
              <button
                onClick={() => { setActiveTab('misi_pbl'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left ${activeTab === 'misi_pbl' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                🚀 Misi PBL (5 Tahap)
              </button>
              <button
                onClick={() => { setActiveTab('materi'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left ${activeTab === 'materi' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                📚 Jelajah Materi
              </button>
              <button
                onClick={() => { setActiveTab('investigasi'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left ${activeTab === 'investigasi' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                🔍 Investigasi Kasus
              </button>
              <button
                onClick={() => { setActiveTab('games'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left ${activeTab === 'games' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                🎮 Democracy Challenge
              </button>
              <button
                onClick={() => { setActiveTab('proyek'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left ${activeTab === 'proyek' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                🎨 Proyek Solusi
              </button>
              <button
                onClick={() => { setActiveTab('asesmen'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left ${activeTab === 'asesmen' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                📝 Asesmen & Rubrik
              </button>
              <button
                onClick={() => { setActiveTab('refleksi'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left ${activeTab === 'refleksi' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                🏅 Refleksi & Sertifikat
              </button>
              <button
                onClick={() => {
                  openRoleGate();
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl text-left flex items-center justify-between text-cyan-300 hover:bg-slate-800"
              >
                <span>🔄 Ganti Peran (Murid / Guru)</span>
              </button>
              <button
                onClick={() => {
                  if (isTeacherMode) {
                    setActiveTab('dashboard_guru');
                  } else {
                    openTeacherPinModal();
                  }
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left flex items-center justify-between ${
                  activeTab === 'dashboard_guru'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-amber-400 hover:bg-slate-800'
                }`}
              >
                <span>👨‍🏫 Dashboard Guru</span>
                {!isTeacherMode && <Lock className="w-3.5 h-3.5 text-amber-400" />}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Edit Student Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-lg text-white">Profil Peserta Didik</h3>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nama Lengkap Peserta Didik
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Kelas / Rombel
                  </label>
                  <input
                    type="text"
                    value={tempClass}
                    onChange={(e) => setTempClass(e.target.value)}
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    NISN (Nomor Induk)
                  </label>
                  <input
                    type="text"
                    value={profile.nisn}
                    onChange={(e) => updateProfile({ nisn: e.target.value })}
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nama Sekolah SMA
                </label>
                <input
                  type="text"
                  value={tempSchool}
                  onChange={(e) => setTempSchool(e.target.value)}
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>

              <p className="text-[11px] text-slate-400">
                Nama dan sekolah ini akan tercetak otomatis pada <strong>Sertifikat Pelopor Demokrasi</strong> dan lembar LKPD.
              </p>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold hover:brightness-110 shadow-lg shadow-blue-500/30 transition flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" />
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
