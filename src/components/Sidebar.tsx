/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Compass,
  FileCheck,
  Flame,
  Gamepad2,
  GraduationCap,
  Home,
  Layers,
  Lightbulb,
  Lock,
  Search,
  Sparkles,
  Target,
  Trophy,
  Unlock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, profile, udlSettings, isTeacherMode, openTeacherPinModal } = useApp();

  const studentItems = [
    {
      id: 'beranda',
      label: '1. Beranda',
      sublabel: 'Dashboard Petualangan',
      icon: Home,
      badge: 'Utama',
    },
    {
      id: 'orientasi',
      label: '2. Orientasi Belajar',
      sublabel: 'Deep Learning & Diagnostik',
      icon: Target,
      badge: 'Awal',
    },
    {
      id: 'misi_pbl',
      label: '3. Misi Demokrasi',
      sublabel: 'Problem Based Learning (5 Tahap)',
      icon: Layers,
      badge: 'PBL Inti',
      highlight: true,
    },
    {
      id: 'materi',
      label: '4. Jelajah Materi',
      sublabel: 'Bab 7 Pancasila Kelas XII',
      icon: BookOpen,
      badge: '5 Topik',
    },
    {
      id: 'investigasi',
      label: '5. Investigasi Kasus',
      sublabel: 'Lab Kasus Nyata Autentik',
      icon: Search,
      badge: 'Lab Riset',
    },
    {
      id: 'games',
      label: '6. Democracy Challenge',
      sublabel: 'Simulasi Pemilu & Cek Fakta',
      icon: Gamepad2,
      badge: 'Gamifikasi',
      highlight: true,
    },
    {
      id: 'proyek',
      label: '7. Proyek Solusi',
      sublabel: 'Studio Aksi Pemilih Cerdas',
      icon: Lightbulb,
      badge: 'Produk',
    },
    {
      id: 'asesmen',
      label: '8. Asesmen Terpadu',
      sublabel: 'Formatif, Kinerja, & Sumatif',
      icon: FileCheck,
      badge: '12 Soal HOTS',
    },
    {
      id: 'refleksi',
      label: '9. Refleksi & Sertifikat',
      sublabel: 'Ikrar Pemilih & Unduh Sertifikat',
      icon: Award,
      badge: 'Kelulusan',
    },
  ];

  const teacherItem = {
    id: 'dashboard_guru',
    label: '10. Dashboard Guru',
    sublabel: isTeacherMode ? 'Pusat Kontrol Terbuka' : 'Terkunci Kode 262626',
    icon: GraduationCap,
    badge: isTeacherMode ? 'Aktif' : 'PIN 262626',
  };

  return (
    <aside
      className={`hidden lg:block w-72 shrink-0 border-r transition-colors duration-200 ${
        udlSettings.highContrast
          ? 'bg-black border-yellow-400 text-yellow-300'
          : 'bg-slate-900/60 border-slate-800/80 text-slate-300'
      }`}
    >
      <div className="sticky top-20 p-4 space-y-6 max-h-[calc(100vh-5rem)] overflow-y-auto">
        {/* Student Navigation list */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">
            Modul Pembelajaran Siswa
          </p>

          {studentItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isCompleted = profile.completedSections.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 font-bold'
                    : 'hover:bg-slate-800/70 text-slate-300 hover:text-white font-medium'
                } ${item.highlight && !isActive ? 'border border-cyan-500/30 bg-cyan-950/20' : ''}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.highlight
                        ? 'bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/30'
                        : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-cyan-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-semibold leading-tight truncate">
                      {item.label}
                    </p>
                    <p
                      className={`text-[10px] truncate leading-tight ${
                        isActive ? 'text-blue-100' : 'text-slate-400'
                      }`}
                    >
                      {item.sublabel}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 pl-1">
                  {isCompleted && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  {item.badge && !isActive && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dedicated Teacher Area with Security Lock */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between px-3">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
              Portal Pendidik (Guru)
            </p>
            {!isTeacherMode && (
              <span className="text-[9px] font-bold text-amber-400 bg-amber-950/70 border border-amber-600/40 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                <Lock className="w-2.5 h-2.5" /> PIN
              </span>
            )}
          </div>

          <button
            onClick={() => {
              if (isTeacherMode) {
                setActiveTab('dashboard_guru');
              } else {
                openTeacherPinModal();
              }
            }}
            className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all duration-200 border ${
              activeTab === 'dashboard_guru'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-300 font-extrabold shadow-lg shadow-amber-500/20'
                : isTeacherMode
                ? 'bg-amber-950/20 border-amber-500/40 text-amber-300 hover:bg-amber-950/40 font-bold'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-amber-300 hover:border-amber-500/40'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  activeTab === 'dashboard_guru'
                    ? 'bg-slate-950/30 text-slate-950'
                    : isTeacherMode
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {isTeacherMode ? (
                  <GraduationCap className="w-4 h-4" />
                ) : (
                  <Lock className="w-4 h-4 text-amber-400" />
                )}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold leading-tight truncate">
                  {teacherItem.label}
                </p>
                <p
                  className={`text-[10px] truncate leading-tight ${
                    activeTab === 'dashboard_guru'
                      ? 'text-slate-900'
                      : isTeacherMode
                      ? 'text-amber-300/80'
                      : 'text-slate-500'
                  }`}
                >
                  {teacherItem.sublabel}
                </p>
              </div>
            </div>

            <span
              className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                activeTab === 'dashboard_guru'
                  ? 'bg-slate-950 text-amber-400'
                  : isTeacherMode
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {teacherItem.badge}
            </span>
          </button>
        </div>

        {/* Quest Status Mini-Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-800/90 via-slate-850 to-slate-900 border border-slate-700/80 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              Progres Misi Bab 7
            </span>
            <span className="text-xs font-extrabold text-cyan-400">
              {Math.min(100, Math.round((profile.completedSections.length / 9) * 100))}%
            </span>
          </div>

          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700 mb-3">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(100, (profile.completedSections.length / 9) * 100)}%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>{profile.completedSections.length} dari 9 Modul</span>
            <span className="text-amber-400 font-semibold">{profile.xp} XP</span>
          </div>
        </div>

        {/* Civics Spirit Card */}
        <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-800/40 text-[11px] text-blue-200 leading-relaxed">
          <p className="font-bold text-cyan-300 mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Pesan Pelopor Muda:
          </p>
          "Satu suara pemuda bernilai sama tingginya dengan suara presiden di bilik suara. Jadilah pemilih yang merdeka dari suap dan berani mengawal kebenaran!"
        </div>
      </div>
    </aside>
  );
};
