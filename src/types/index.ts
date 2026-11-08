/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UDLFontSize = 'normal' | 'large' | 'extra';

export interface UDLSettings {
  fontSize: UDLFontSize;
  highContrast: boolean;
  textToSpeechEnabled: boolean;
  simplifiedView: boolean;
}

export interface Badge {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  requiredXP: number;
}

export interface StudentProfile {
  name: string;
  school: string;
  studentClass: string;
  nisn: string;
  xp: number;
  level: number;
  streakDays: number;
  completedSections: string[];
  unlockedBadges: string[];
  diagnosticCompleted: boolean;
  summativeScore: number | null;
  pledgeSigned: boolean;
  pledgeDate?: string;
}

export interface LKPDData {
  groupName: string;
  groupMembers: string;
  problemStatement: string;
  drivingQuestion: string;
  roleDivision: string;
  investigationPlan: string;
  evidenceCollected: string;
  solutionType: 'poster' | 'infografik' | 'video' | 'panduan' | 'presentasi';
  solutionTitle: string;
  solutionDescription: string;
  evaluationNotes: string;
}

export interface TeacherGrading {
  rubricScores: {
    konsep: number;
    analisis: number;
    solusi: number;
    komunikasi: number;
  };
  attitudeScore: number;
  notes: string;
  finalScore: number;
  gradedBy: string;
  gradedDate?: string;
  pblUnlockedMaxStep: number;
}

export interface Candidate {
  id: string;
  number: number;
  name: string;
  nickname: string;
  avatar: string;
  tagline: string;
  background: string;
  vision: string;
  missions: string[];
  priorityPrograms: {
    title: string;
    description: string;
    pros: string;
    cons: string;
  }[];
  trackRecord: string[];
  fundingTransparency: string;
}

export interface FactCheckItem {
  id: string;
  platform: 'X (Twitter)' | 'Instagram' | 'TikTok' | 'WhatsApp Group';
  author: string;
  authorHandle: string;
  avatar: string;
  timestamp: string;
  content: string;
  shares: string;
  likes: string;
  verdict: 'FAKTA' | 'HOAKS' | 'BELUM_TERVERIFIKASI';
  explanation: string;
  verificationSteps: string[];
  redFlags: string[];
  sourceReference: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  caseContext?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  competency: string; // e.g. "C4 - Analisis Kasus Pemilu"
  topic: string;
}

export interface ChallengeScenario {
  id: string;
  title: string;
  situation: string;
  location: string;
  dilemma: string;
  choices: {
    id: string;
    text: string;
    isOptimal: boolean;
    consequence: string;
    feedback: string;
    xpReward: number;
    characterImpact: string;
  }[];
}

export interface MateriSection {
  heading: string;
  text?: string;
  keyHighlight?: string;
  points?: string[];
}

export interface MateriItem {
  id: string;
  code: string;
  title: string;
  summary: string;
  duration: string;
  content: MateriSection[];
  realLifeExample: string;
  // Differentiated Learning Modalities
  visualInfographic: {
    title: string;
    badge: string;
    conceptMap: { title: string; description: string; tag: string }[];
    posterTakeaway: string;
  };
  readingArticle: {
    fullTitle: string;
    readingTime: string;
    sections: { heading: string; paragraphs: string[]; citation?: string }[];
    constitutionalBasis: { title: string; pasal: string; quote: string }[];
  };
  podcastAudio: {
    episodeTitle: string;
    hosts: string;
    duration: string;
    summary: string;
    script: { speaker: string; role: string; text: string }[];
  };
  youtubeVideo: {
    title: string;
    channel: string;
    embedUrl: string;
    duration: string;
    videoSummary: string;
    discussionQuestions: string[];
  };
  miniQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export type DifferentiatedMode = 'visual' | 'reading' | 'audio' | 'video';

export interface StudentRecord {
  id: string;
  name: string;
  studentClass: string;
  nisn: string;
  school: string;
  registeredAt: string;
  lastActive: string;
  xp: number;
  level: number;
  diagnosticDone: boolean;
  summativeScore: number | null;
  votedCandidate: string | null;
  voterRationale: string;
  preferredModality: DifferentiatedMode;
  lkpdGroupName: string;
  lkpdSolutionType: string;
  lkpdSolutionTitle: string;
  pledgeSigned: boolean;
  teacherGrade?: number;
  teacherNotes?: string;
  completedSectionsCount: number;
}

export interface InvestigationCase {
  id: string;
  title: string;
  category: 'Politik Uang' | 'Hoaks & Disinformasi' | 'Apatisme Pemilih (Golput)' | 'Netralitas Aparatur';
  urgency: 'Tinggi' | 'Kritis' | 'Sedang';
  chronology: string[];
  witnesses: { name: string; role: string; statement: string }[];
  evidencePieces: { name: string; type: string; description: string; relevance: string }[];
  legalBasis: { law: string; pasal: string; sanctions: string }[];
  guidingQuestions: string[];
  suggestedAction: string;
}
