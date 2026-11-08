/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertCircle,
  GraduationCap,
  KeyRound,
  Lock,
  ShieldCheck,
  Unlock,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TeacherPinModal: React.FC = () => {
  const { isTeacherPinModalOpen, closeTeacherPinModal, verifyTeacherPin } = useApp();
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isTeacherPinModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = verifyTeacherPin(pinInput);
    if (!success) {
      setErrorMsg('Kode akses guru tidak valid. Pastikan Anda memasukkan kode PIN yang benar.');
    } else {
      setPinInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative overflow-hidden space-y-6">
        {/* Glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">
                Akses Mode Guru & Pengawas
              </h3>
              <p className="text-xs text-amber-300 font-semibold">
                Khusus Guru Pendidikan Pancasila (UKIN PPG)
              </p>
            </div>
          </div>
          <button
            onClick={closeTeacherPinModal}
            className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational context */}
        <p className="text-xs text-slate-300 leading-relaxed">
          Untuk menjaga objektivitas pembelajaran, kontrol penilaian, kunci jawaban pedagogis, dan pengaturan alur PBL hanya dapat diakses oleh Guru Fasilitator melalui kode verifikasi 6 digit.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5">
              Masukkan Kode PIN Keamanan Guru:
            </label>
            <div className="relative">
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                autoFocus
                placeholder="••••••"
                className="w-full bg-slate-950 border-2 border-slate-700 focus:border-amber-400 rounded-2xl px-4 py-3 text-center text-2xl font-mono tracking-widest text-amber-300 focus:outline-none transition"
              />
              <KeyRound className="w-5 h-5 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 flex items-center gap-2 text-rose-300 text-xs animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={closeTeacherPinModal}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-95 transition flex items-center gap-1.5"
            >
              <Unlock className="w-4 h-4" />
              Buka Kontrol Guru
            </button>
          </div>
        </form>

        <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Keamanan terintegrasi: Siswa diarahkan menyelesaikan penugasan di Mode Siswa.</span>
        </div>
      </div>
    </div>
  );
};
