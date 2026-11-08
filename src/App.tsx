/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AssessmentHub } from './components/AssessmentHub';
import { CaseInvestigation } from './components/CaseInvestigation';
import { ExploreMateri } from './components/ExploreMateri';
import { GameCenter } from './components/GameCenter';
import { HomeDashboard } from './components/HomeDashboard';
import { LearningOrientation } from './components/LearningOrientation';
import { Navbar } from './components/Navbar';
import { PBLMisiFlow } from './components/PBLMisiFlow';
import { ProjectStudio } from './components/ProjectStudio';
import { ReflectionCertificate } from './components/ReflectionCertificate';
import { RoleSelectGateModal } from './components/RoleSelectGateModal';
import { Sidebar } from './components/Sidebar';
import { TeacherDashboard } from './components/TeacherDashboard';
import { TeacherPinModal } from './components/TeacherPinModal';
import { AppProvider, useApp } from './context/AppContext';

const AppContent: React.FC = () => {
  const { activeTab, udlSettings } = useApp();

  // Handle UDL font sizing
  const fontSizeClass =
    udlSettings.fontSize === 'large'
      ? 'text-lg'
      : udlSettings.fontSize === 'extra'
      ? 'text-xl'
      : 'text-base';

  const highContrastClass = udlSettings.highContrast
    ? 'bg-black text-yellow-300'
    : 'bg-slate-950 text-slate-100';

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${highContrastClass} ${fontSizeClass}`}
    >
      {/* Initial Welcome & Role Selector Gate (Mode Murid & Mode Guru) */}
      <RoleSelectGateModal />

      {/* Top Navbar */}
      <Navbar />

      {/* Teacher Authentication PIN Modal (Code: 262626) */}
      <TeacherPinModal />

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Dynamic Main Body Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {activeTab === 'beranda' && <HomeDashboard />}
          {activeTab === 'orientasi' && <LearningOrientation />}
          {activeTab === 'misi_pbl' && <PBLMisiFlow />}
          {activeTab === 'materi' && <ExploreMateri />}
          {activeTab === 'investigasi' && <CaseInvestigation />}
          {activeTab === 'games' && <GameCenter />}
          {activeTab === 'proyek' && <ProjectStudio />}
          {activeTab === 'asesmen' && <AssessmentHub />}
          {activeTab === 'refleksi' && <ReflectionCertificate />}
          {activeTab === 'dashboard_guru' && <TeacherDashboard />}
        </main>
      </div>

      {/* Footer */}
      <footer className="no-print border-t border-slate-800 bg-slate-900/60 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-slate-300">
            DEMOKRASI QUEST • "Satu Suara, Sejuta Makna untuk Indonesia"
          </p>
          <p className="text-[11px] text-slate-500">
            Media Pembelajaran Interaktif Pendidikan Pancasila SMA Kelas XII Bab 7: Menjadi Pelopor Pemilih Pemula dalam Demokrasi Indonesia.
            <br />
            Kurikulum Merdeka • Pendekatan Pembelajaran Mendalam (Deep Learning) & Desain Universal untuk Pembelajaran (UDL) • Model Problem Based Learning (PBL).
          </p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
