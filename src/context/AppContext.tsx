/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { BADGES_LIST, SEED_CLASSROOM_STUDENTS } from '../data/learningData';
import {
  DifferentiatedMode,
  LKPDData,
  StudentProfile,
  StudentRecord,
  TeacherGrading,
  UDLSettings,
} from '../types';

interface AppContextType {
  profile: StudentProfile;
  udlSettings: UDLSettings;
  lkpdData: LKPDData;
  activeTab: string;
  pblCurrentStep: number;
  votedCandidateId: string | null;
  voterRationale: string;
  factCheckAnswers: Record<string, string>;
  challengeProgress: Record<string, string>;
  miniQuizScores: Record<string, number>;
  diagnosticAnswers: Record<string, string>;
  summativeAnswers: Record<number, number>;
  reflectionResponses: {
    newUnderstanding: string;
    problemContribution: string;
    realApplication: string;
    democracyCommitment: string;
  };
  isTeacherMode: boolean;
  isTeacherPinModalOpen: boolean;
  teacherGrading: TeacherGrading;
  registeredStudents: StudentRecord[];
  preferredModality: DifferentiatedMode;
  userRole: 'murid' | 'guru' | null;
  showRoleGate: boolean;
  openRoleGate: () => void;
  closeRoleGate: () => void;
  setPreferredModality: (m: DifferentiatedMode) => void;
  registerAndEnterAsStudent: (name: string, studentClass: string, school?: string, nisn?: string) => void;
  enterAsTeacher: (pin: string) => boolean;
  updateStudentRecord: (id: string, data: Partial<StudentRecord>) => void;
  openTeacherPinModal: () => void;
  closeTeacherPinModal: () => void;
  verifyTeacherPin: (pin: string) => boolean;
  exitTeacherMode: () => void;
  updateTeacherGrading: (data: Partial<TeacherGrading>) => void;
  isAudioSpeaking: boolean;
  setActiveTab: (tab: string) => void;
  setPblCurrentStep: (step: number) => void;
  addXP: (amount: number, reason?: string) => void;
  unlockBadge: (badgeId: string) => void;
  updateProfile: (data: Partial<StudentProfile>) => void;
  updateUDLSettings: (data: Partial<UDLSettings>) => void;
  updateLKPD: (data: Partial<LKPDData>) => void;
  setVotedCandidate: (id: string, rationale: string) => void;
  setFactCheckAnswer: (postId: string, verdict: string) => void;
  setChallengeChoice: (scenarioId: string, choiceId: string) => void;
  setMiniQuizScore: (materiId: string, score: number) => void;
  setDiagnosticAnswer: (qId: string, answer: string) => void;
  setSummativeAnswer: (qId: number, answerIndex: number) => void;
  setSummativeScore: (score: number) => void;
  updateReflection: (data: Partial<AppContextType['reflectionResponses']>) => void;
  speakText: (text: string) => void;
  stopSpeech: () => void;
  triggerConfetti: () => void;
  resetProgress: () => void;
  notification: string | null;
  clearNotification: () => void;
}

const DEFAULT_PROFILE: StudentProfile = {
  name: 'Bintang Nusantara',
  school: 'SMA Negeri 1 Indonesia Merdeka',
  studentClass: 'XII MIPA 1',
  nisn: '0078912345',
  xp: 150,
  level: 1,
  streakDays: 3,
  completedSections: ['beranda'],
  unlockedBadges: ['badge-explorer'],
  diagnosticCompleted: false,
  summativeScore: null,
  pledgeSigned: false,
  pledgeDate: undefined,
};

const DEFAULT_UDL: UDLSettings = {
  fontSize: 'normal',
  highContrast: false,
  textToSpeechEnabled: true,
  simplifiedView: false,
};

const DEFAULT_LKPD: LKPDData = {
  groupName: 'Kelompok 1 - Garda Demokrasi Muda',
  groupMembers: 'Bintang (Ketua), Siti (Riset), Rian (Desainer), Sarah (Notulis)',
  problemStatement: 'Rendahnya literasi pemilih pemula di era digital memicu maraknya hoaks politik dan rentan terjebak politik uang.',
  drivingQuestion: 'Bagaimana kita sebagai pelajar kelas XII dapat memelopori gerakan pemilih cerdas anti-hoaks dan tolak politik uang di sekolah serta lingkungan sekitar?',
  roleDivision: '1. Koordinator Penyelidikan: Bintang | 2. Tim Analisis Regulasi: Siti | 3. Tim Kreatif Media: Rian | 4. Tim Dokumentasi: Sarah',
  investigationPlan: '1. Mengumpulkan 3 sampel konten medsos terindikasi hoaks. 2. Mewawancarai panwaslu/guru PPKn terkait Pasal 523 UU No. 7/2017. 3. Melakukan survei sikap pemilih pada 30 siswa kelas XII.',
  evidenceCollected: 'Ditemukan bahwa 65% siswa belum mengetahui cara cek DPT online, dan 40% masih menganggap uang saku kampanye sebagai hal lumrah.',
  solutionType: 'infografik',
  solutionTitle: 'KAMPANYE DIGITAL "PEMILIH CERDAS ANTI-AMPLOP"',
  solutionDescription: 'Membuat serial infografik interaktif di Instagram OSIS dan poster cetak di mading sekolah yang membedah konsekuensi pidana politik uang dan tips 5 langkah cek fakta.',
  evaluationNotes: 'Karya berhasil dipamerkan pada musyawarah kelas dan mendapatkan apresiasi dari dewan guru.',
};

const DEFAULT_TEACHER_GRADING: TeacherGrading = {
  rubricScores: {
    konsep: 4,
    analisis: 4,
    solusi: 4,
    komunikasi: 4,
  },
  attitudeScore: 95,
  notes: 'Peserta didik menunjukkan kemampuan analisis kritis yang sangat baik dalam membedah kasus politik uang dan hoaks politik. Solusi kampanye sangat inovatif dan komunikatif.',
  finalScore: 96,
  gradedBy: 'Dra. Hj. Sri Wahyuni, M.Pd.',
  gradedDate: '8 November 2026',
  pblUnlockedMaxStep: 5,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('demokrasi_quest_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [udlSettings, setUdlSettings] = useState<UDLSettings>(() => {
    const saved = localStorage.getItem('demokrasi_quest_udl');
    return saved ? JSON.parse(saved) : DEFAULT_UDL;
  });

  const [lkpdData, setLkpdData] = useState<LKPDData>(() => {
    const saved = localStorage.getItem('demokrasi_quest_lkpd');
    return saved ? JSON.parse(saved) : DEFAULT_LKPD;
  });

  const [activeTab, setActiveTabState] = useState<string>(() => {
    return localStorage.getItem('demokrasi_quest_tab') || 'beranda';
  });

  const [pblCurrentStep, setPblCurrentStep] = useState<number>(1);
  const [votedCandidateId, setVotedCandidateId] = useState<string | null>(() => {
    return localStorage.getItem('demokrasi_quest_voted') || null;
  });
  const [voterRationale, setVoterRationale] = useState<string>(() => {
    return localStorage.getItem('demokrasi_quest_voter_rationale') || '';
  });

  const [factCheckAnswers, setFactCheckAnswers] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('demokrasi_quest_factchecks');
    return saved ? JSON.parse(saved) : {};
  });

  const [challengeProgress, setChallengeProgress] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('demokrasi_quest_challenges');
    return saved ? JSON.parse(saved) : {};
  });

  const [miniQuizScores, setMiniQuizScores] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('demokrasi_quest_miniquiz');
    return saved ? JSON.parse(saved) : {};
  });

  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('demokrasi_quest_diag');
    return saved ? JSON.parse(saved) : {};
  });

  const [summativeAnswers, setSummativeAnswers] = useState<Record<number, number>>(() => {
    const saved = localStorage.getItem('demokrasi_quest_sum_answers');
    return saved ? JSON.parse(saved) : {};
  });

  const [reflectionResponses, setReflectionResponses] = useState({
    newUnderstanding: 'Saya memahami bahwa pemilih pemula memiliki kekuatan elektoral lebih dari 52% suara nasional, sehingga suara kita sangat menentukan arah kebijakan pendidikan dan masa depan Indonesia.',
    problemContribution: 'Melalui kelompok PBL, kami mengidentifikasi cara verifikasi hoaks dan mengampanyekan tolak politik uang di lingkungan sekolah.',
    realApplication: 'Saya akan mengecek status NIK di cekdptonline.kpu.go.id, datang ke TPS tepat waktu, dan berani menolak segala bentuk suap atau serangan fajar.',
    democracyCommitment: 'Berkomitmen menjadi pemilih cerdas, kritis, bermartabat, berintegritas tinggi, dan menjadi teladan bagi teman sebaya.',
  });

  const [isTeacherMode, setIsTeacherMode] = useState<boolean>(() => {
    return sessionStorage.getItem('demokrasi_quest_teacher_auth') === 'true';
  });
  const [isTeacherPinModalOpen, setIsTeacherPinModalOpen] = useState<boolean>(false);
  const [teacherGrading, setTeacherGrading] = useState<TeacherGrading>(() => {
    const saved = localStorage.getItem('demokrasi_quest_teacher_grading');
    return saved ? JSON.parse(saved) : DEFAULT_TEACHER_GRADING;
  });
  const [isAudioSpeaking, setIsAudioSpeaking] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const [preferredModality, setPreferredModalityState] = useState<DifferentiatedMode>(() => {
    return (localStorage.getItem('demokrasi_quest_modality') as DifferentiatedMode) || 'visual';
  });

  const [userRole, setUserRole] = useState<'murid' | 'guru' | null>(() => {
    return (localStorage.getItem('demokrasi_quest_user_role') as 'murid' | 'guru' | null) || null;
  });

  const [showRoleGate, setShowRoleGate] = useState<boolean>(() => {
    return !localStorage.getItem('demokrasi_quest_user_role');
  });

  const [registeredStudents, setRegisteredStudents] = useState<StudentRecord[]>(() => {
    const saved = localStorage.getItem('demokrasi_quest_all_students');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // fallback
      }
    }
    return SEED_CLASSROOM_STUDENTS;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('demokrasi_quest_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('demokrasi_quest_udl', JSON.stringify(udlSettings));
  }, [udlSettings]);

  useEffect(() => {
    localStorage.setItem('demokrasi_quest_lkpd', JSON.stringify(lkpdData));
  }, [lkpdData]);

  useEffect(() => {
    localStorage.setItem('demokrasi_quest_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (votedCandidateId) localStorage.setItem('demokrasi_quest_voted', votedCandidateId);
    if (voterRationale) localStorage.setItem('demokrasi_quest_voter_rationale', voterRationale);
  }, [votedCandidateId, voterRationale]);

  useEffect(() => {
    localStorage.setItem('demokrasi_quest_factchecks', JSON.stringify(factCheckAnswers));
  }, [factCheckAnswers]);

  useEffect(() => {
    localStorage.setItem('demokrasi_quest_challenges', JSON.stringify(challengeProgress));
  }, [challengeProgress]);

  useEffect(() => {
    localStorage.setItem('demokrasi_quest_miniquiz', JSON.stringify(miniQuizScores));
  }, [miniQuizScores]);

  useEffect(() => {
    localStorage.setItem('demokrasi_quest_diag', JSON.stringify(diagnosticAnswers));
  }, [diagnosticAnswers]);

  useEffect(() => {
    localStorage.setItem('demokrasi_quest_sum_answers', JSON.stringify(summativeAnswers));
  }, [summativeAnswers]);

  useEffect(() => {
    localStorage.setItem('demokrasi_quest_all_students', JSON.stringify(registeredStudents));
  }, [registeredStudents]);

  // Synchronize active student data into registeredStudents whenever student activities occur
  useEffect(() => {
    setRegisteredStudents((prev) => {
      const idx = prev.findIndex((s) => s.name.toLowerCase() === profile.name.toLowerCase());
      if (idx >= 0) {
        const existing = prev[idx];
        const updatedStudent: StudentRecord = {
          ...existing,
          name: profile.name,
          studentClass: profile.studentClass,
          nisn: profile.nisn,
          school: profile.school,
          xp: profile.xp,
          level: profile.level,
          diagnosticDone: profile.diagnosticCompleted,
          summativeScore: profile.summativeScore,
          votedCandidate: votedCandidateId,
          voterRationale: voterRationale,
          preferredModality: preferredModality,
          lkpdGroupName: lkpdData.groupName,
          lkpdSolutionType: lkpdData.solutionType,
          lkpdSolutionTitle: lkpdData.solutionTitle,
          pledgeSigned: profile.pledgeSigned,
          completedSectionsCount: profile.completedSections.length,
          lastActive: 'Aktif saat ini',
        };
        const nextList = [...prev];
        nextList[idx] = updatedStudent;
        return nextList;
      }
      return prev;
    });
  }, [
    profile.name,
    profile.studentClass,
    profile.nisn,
    profile.school,
    profile.xp,
    profile.level,
    profile.diagnosticCompleted,
    profile.summativeScore,
    profile.pledgeSigned,
    profile.completedSections.length,
    votedCandidateId,
    voterRationale,
    preferredModality,
    lkpdData.groupName,
    lkpdData.solutionType,
    lkpdData.solutionTitle,
  ]);

  const clearNotification = () => setNotification(null);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#3b82f6', '#f59e0b', '#10b981', '#ec4899'],
      });
    } catch {
      // ignore
    }
  };

  const addXP = (amount: number, reason?: string) => {
    setProfile((prev) => {
      const newXP = prev.xp + amount;
      // Calculate level: Level 1 (0-299), Level 2 (300-599), Level 3 (600-899), Level 4 (900-1199), Level 5 (1200+)
      const newLevel = Math.min(5, Math.floor(newXP / 300) + 1);

      // Check badge thresholds
      const currentBadges = [...prev.unlockedBadges];
      BADGES_LIST.forEach((badge) => {
        if (newXP >= badge.requiredXP && !currentBadges.includes(badge.id)) {
          currentBadges.push(badge.id);
          setNotification(`🎉 Lencana Terbuka: ${badge.title} (+XP Milestone!)`);
          triggerConfetti();
        }
      });

      if (newLevel > prev.level) {
        setNotification(`🌟 Naik Level! Kamu sekarang Level ${newLevel}: ${getLevelTitle(newLevel)}!`);
        triggerConfetti();
      } else if (reason) {
        setNotification(`+${amount} XP: ${reason}`);
      }

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        unlockedBadges: currentBadges,
      };
    });
  };

  const unlockBadge = (badgeId: string) => {
    setProfile((prev) => {
      if (prev.unlockedBadges.includes(badgeId)) return prev;
      const b = BADGES_LIST.find((x) => x.id === badgeId);
      if (b) {
        setNotification(`🏆 Lencana Baru Diraih: ${b.title}!`);
        triggerConfetti();
      }
      return {
        ...prev,
        unlockedBadges: [...prev.unlockedBadges, badgeId],
      };
    });
  };

  const openTeacherPinModal = () => setIsTeacherPinModalOpen(true);
  const closeTeacherPinModal = () => setIsTeacherPinModalOpen(false);

  const openRoleGate = () => setShowRoleGate(true);
  const closeRoleGate = () => setShowRoleGate(false);

  const setPreferredModality = (m: DifferentiatedMode) => {
    setPreferredModalityState(m);
    localStorage.setItem('demokrasi_quest_modality', m);
    setRegisteredStudents((prev) =>
      prev.map((s) =>
        s.name.toLowerCase() === profile.name.toLowerCase()
          ? { ...s, preferredModality: m }
          : s
      )
    );
  };

  const registerAndEnterAsStudent = (
    name: string,
    studentClass: string,
    school?: string,
    nisn?: string
  ) => {
    const cleanName = name.trim();
    const cleanClass = studentClass.trim();
    const cleanSchool = school?.trim() || profile.school || 'SMA Negeri 1 Indonesia Merdeka';
    const cleanNisn = nisn?.trim() || profile.nisn || '0078912345';

    setProfile((prev) => ({
      ...prev,
      name: cleanName,
      studentClass: cleanClass,
      school: cleanSchool,
      nisn: cleanNisn,
    }));

    setUserRole('murid');
    localStorage.setItem('demokrasi_quest_user_role', 'murid');
    setShowRoleGate(false);

    // Record into registeredStudents
    const now = new Date();
    const nowStr = `${now.toLocaleDateString('id-ID')}, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

    setRegisteredStudents((prev) => {
      const existingIdx = prev.findIndex((s) => s.name.toLowerCase() === cleanName.toLowerCase());
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          name: cleanName,
          studentClass: cleanClass,
          school: cleanSchool,
          nisn: cleanNisn,
          lastActive: 'Aktif saat ini',
        };
        return updated;
      }
      const newRecord: StudentRecord = {
        id: `std-${Date.now().toString().slice(-4)}`,
        name: cleanName,
        studentClass: cleanClass,
        nisn: cleanNisn,
        school: cleanSchool,
        registeredAt: nowStr,
        lastActive: 'Aktif saat ini',
        xp: profile.xp,
        level: profile.level,
        diagnosticDone: profile.diagnosticCompleted,
        summativeScore: profile.summativeScore,
        votedCandidate: votedCandidateId,
        voterRationale: voterRationale,
        preferredModality: preferredModality,
        lkpdGroupName: lkpdData.groupName,
        lkpdSolutionType: lkpdData.solutionType,
        lkpdSolutionTitle: lkpdData.solutionTitle,
        pledgeSigned: profile.pledgeSigned,
        teacherGrade: teacherGrading.finalScore,
        teacherNotes: teacherGrading.notes,
        completedSectionsCount: profile.completedSections.length,
      };
      return [newRecord, ...prev];
    });

    setNotification(`🎓 Selamat datang, ${cleanName} (${cleanClass})! Mode Murid siap digunakan.`);
    triggerConfetti();
  };

  const enterAsTeacher = (pin: string): boolean => {
    if (pin.trim() === '262626') {
      setIsTeacherMode(true);
      sessionStorage.setItem('demokrasi_quest_teacher_auth', 'true');
      setUserRole('guru');
      localStorage.setItem('demokrasi_quest_user_role', 'guru');
      setShowRoleGate(false);
      setIsTeacherPinModalOpen(false);
      setActiveTabState('dashboard_guru');
      setNotification('🔓 Akses Guru Terverifikasi (Kode: 262626). Selamat bertugas, Guru Fasilitator!');
      triggerConfetti();
      return true;
    }
    return false;
  };

  const updateStudentRecord = (id: string, data: Partial<StudentRecord>) => {
    setRegisteredStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...data } : s))
    );
  };

  const verifyTeacherPin = (pin: string): boolean => {
    if (pin.trim() === '262626') {
      setIsTeacherMode(true);
      sessionStorage.setItem('demokrasi_quest_teacher_auth', 'true');
      setUserRole('guru');
      localStorage.setItem('demokrasi_quest_user_role', 'guru');
      setIsTeacherPinModalOpen(false);
      setShowRoleGate(false);
      setActiveTabState('dashboard_guru');
      setNotification('🔓 Akses Guru Terverifikasi (Kode: 262626). Selamat bertugas, Guru Fasilitator!');
      triggerConfetti();
      return true;
    }
    return false;
  };

  const exitTeacherMode = () => {
    setIsTeacherMode(false);
    sessionStorage.removeItem('demokrasi_quest_teacher_auth');
    if (activeTab === 'dashboard_guru') {
      setActiveTabState('beranda');
    }
    setNotification('🔒 Mode Guru berhasil dikunci kembali. Beralih ke Mode Siswa.');
  };

  const updateTeacherGrading = (data: Partial<TeacherGrading>) => {
    setTeacherGrading((prev) => {
      const updated = { ...prev, ...data };
      localStorage.setItem('demokrasi_quest_teacher_grading', JSON.stringify(updated));
      return updated;
    });
    setNotification('✓ Nilai dan Catatan Fasilitasi Guru Berhasil Disimpan!');
  };

  const setActiveTab = (tab: string) => {
    // If student attempts to access teacher dashboard without auth, prompt PIN modal
    if (tab === 'dashboard_guru' && !isTeacherMode) {
      openTeacherPinModal();
      return;
    }

    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setProfile((prev) => {
      if (!prev.completedSections.includes(tab)) {
        return {
          ...prev,
          completedSections: [...prev.completedSections, tab],
        };
      }
      return prev;
    });
  };

  const updateProfile = (data: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...data }));
  };

  const updateUDLSettings = (data: Partial<UDLSettings>) => {
    setUdlSettings((prev) => ({ ...prev, ...data }));
  };

  const updateLKPD = (data: Partial<LKPDData>) => {
    setLkpdData((prev) => ({ ...prev, ...data }));
  };

  const setVotedCandidate = (id: string, rationale: string) => {
    setVotedCandidateId(id);
    setVoterRationale(rationale);
    addXP(100, 'Memberikan Suara Cerdas Berbasis Visi Misi');
    unlockBadge('badge-smartvoter');
  };

  const setFactCheckAnswer = (postId: string, verdict: string) => {
    setFactCheckAnswers((prev) => ({ ...prev, [postId]: verdict }));
    addXP(40, 'Menyelesaikan Analisis Cek Fakta');
  };

  const setChallengeChoice = (scenarioId: string, choiceId: string) => {
    setChallengeProgress((prev) => ({ ...prev, [scenarioId]: choiceId }));
  };

  const setMiniQuizScore = (materiId: string, score: number) => {
    setMiniQuizScores((prev) => ({ ...prev, [materiId]: score }));
    addXP(50, 'Menjawab Mini Quiz Materi');
  };

  const setDiagnosticAnswer = (qId: string, answer: string) => {
    setDiagnosticAnswers((prev) => ({ ...prev, [qId]: answer }));
  };

  const setSummativeAnswer = (qId: number, answerIndex: number) => {
    setSummativeAnswers((prev) => ({ ...prev, [qId]: answerIndex }));
  };

  const setSummativeScore = (score: number) => {
    setProfile((prev) => ({
      ...prev,
      summativeScore: score,
    }));
    addXP(score * 10, 'Menyelesaikan Asesmen Sumatif Akhir');
  };

  const updateReflection = (data: Partial<AppContextType['reflectionResponses']>) => {
    setReflectionResponses((prev) => ({ ...prev, ...data }));
  };

  // Text-To-Speech function using browser Web Speech API (UDL accessibility)
  const speakText = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (!text) {
      setIsAudioSpeaking(false);
      return;
    }
    const cleanText = text.replace(/[#*_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95;
    utterance.onstart = () => setIsAudioSpeaking(true);
    utterance.onend = () => setIsAudioSpeaking(false);
    utterance.onerror = () => setIsAudioSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsAudioSpeaking(false);
  };

  const resetProgress = () => {
    localStorage.clear();
    setProfile(DEFAULT_PROFILE);
    setUdlSettings(DEFAULT_UDL);
    setLkpdData(DEFAULT_LKPD);
    setActiveTabState('beranda');
    setPblCurrentStep(1);
    setVotedCandidateId(null);
    setVoterRationale('');
    setFactCheckAnswers({});
    setChallengeProgress({});
    setMiniQuizScores({});
    setDiagnosticAnswers({});
    setSummativeAnswers({});
    setNotification('Progres belajar telah diatur ulang.');
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        udlSettings,
        lkpdData,
        activeTab,
        pblCurrentStep,
        votedCandidateId,
        voterRationale,
        factCheckAnswers,
        challengeProgress,
        miniQuizScores,
        diagnosticAnswers,
        summativeAnswers,
        reflectionResponses,
        isTeacherMode,
        isTeacherPinModalOpen,
        teacherGrading,
        registeredStudents,
        preferredModality,
        userRole,
        showRoleGate,
        openRoleGate,
        closeRoleGate,
        setPreferredModality,
        registerAndEnterAsStudent,
        enterAsTeacher,
        updateStudentRecord,
        openTeacherPinModal,
        closeTeacherPinModal,
        verifyTeacherPin,
        exitTeacherMode,
        updateTeacherGrading,
        isAudioSpeaking,
        setActiveTab,
        setPblCurrentStep,
        addXP,
        unlockBadge,
        updateProfile,
        updateUDLSettings,
        updateLKPD,
        setVotedCandidate,
        setFactCheckAnswer,
        setChallengeChoice,
        setMiniQuizScore,
        setDiagnosticAnswer,
        setSummativeAnswer,
        setSummativeScore,
        updateReflection,
        speakText,
        stopSpeech,
        triggerConfetti,
        resetProgress,
        notification,
        clearNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

export function getLevelTitle(level: number): string {
  switch (level) {
    case 1:
      return 'Pemilih Pemula Awam';
    case 2:
      return 'Warga Kritis Pancasilais';
    case 3:
      return 'Pengawal Demokrasi Digital';
    case 4:
      return 'Duta Pemilih Cerdas Mandiri';
    case 5:
      return 'Pelopor Demokrasi Indonesia';
    default:
      return 'Pejuang Demokrasi';
  }
}
