import { FormEvent, useEffect, useState } from 'react';
import { BellSchedule } from '../types/bell';

interface ScheduleModalProps {
  isOpen: boolean;
  editingSchedule: BellSchedule | null;
  onClose: () => void;
  onSave: (time: string, label: string, existingId?: string) => void;
}

export function ScheduleModal({
  isOpen,
  editingSchedule,
  onClose,
  onSave,
}: ScheduleModalProps) {
  const [time, setTime] = useState('11:30');
  const [label, setLabel] = useState('Bel Pulang');

  useEffect(() => {
    if (editingSchedule) {
      setTime(editingSchedule.time);
      setLabel(editingSchedule.label);
    } else {
      setTime('11:30');
      setLabel('Bel Pulang');
    }
  }, [editingSchedule, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!time) return;
    onSave(time, label.trim() || 'Bel Sekolah', editingSchedule?.id);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedule-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-[#DCEFFA]">
        <h3 id="schedule-modal-title" className="text-lg font-extrabold text-[#0A4D7C] mb-4">
          {editingSchedule ? 'Ubah Jam & Keterangan Bel' : 'Tambah Jadwal Bel Baru'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="schedule-time-input" className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Jam Berbunyi (Format 24 Jam)
            </label>
            <input
              id="schedule-time-input"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#0A4D7C] focus:outline-none text-lg font-extrabold text-[#0B192C] tabular-nums"
            />
          </div>
          <div>
            <label htmlFor="schedule-label-input" className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Keterangan / Nama Sesi
            </label>
            <input
              id="schedule-label-input"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Contoh: Bel Berbunyi / Mulai KBM"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#0A4D7C] focus:outline-none text-sm font-semibold text-[#0B192C]"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-sm font-bold bg-[#0A4D7C] hover:bg-sky-900 text-white shadow-sm cursor-pointer"
            >
              Simpan Jadwal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
