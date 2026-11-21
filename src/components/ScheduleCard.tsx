import { ChangeEvent, useEffect, useState } from 'react';
import { Trash2, Upload } from 'lucide-react';
import { BellSchedule } from '../types/bell';

interface ScheduleCardProps {
  schedule: BellSchedule;
  isRinging: boolean;
  onOpenEdit: (schedule: BellSchedule) => void;
  onTriggerBell: (id: string) => void;
  onStopBell: () => void;
  onToggleActive: (id: string) => void;
  onUpdateLabel: (id: string, label: string) => void;
  onUploadAudio: (id: string, file: File) => void;
  onRemoveAudio: (id: string) => void;
  onDeleteSchedule: (id: string) => void;
}

export function ScheduleCard({
  schedule,
  isRinging,
  onOpenEdit,
  onTriggerBell,
  onStopBell,
  onToggleActive,
  onUpdateLabel,
  onUploadAudio,
  onRemoveAudio,
  onDeleteSchedule,
}: ScheduleCardProps) {
  const [draftLabel, setDraftLabel] = useState(schedule.label);

  useEffect(() => {
    setDraftLabel(schedule.label);
  }, [schedule.label]);

  const formattedTime = schedule.time.replace(':', '.');
  const hasAudio = Boolean(schedule.fileName);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadAudio(schedule.id, file);
    }
    e.target.value = '';
  };

  const commitLabel = () => {
    const trimmed = draftLabel.trim() || 'Bel Sekolah';
    setDraftLabel(trimmed);
    if (trimmed !== schedule.label) {
      onUpdateLabel(schedule.id, trimmed);
    }
  };

  return (
    <div
      className={`rounded-2xl p-4 transition-all border-2 shadow-sm relative ${
        isRinging
          ? 'card-ringing scale-[1.01]'
          : schedule.active
            ? 'bg-[#DCEFFA]/95 border-[#BBDDF8] hover:border-[#0A4D7C]/40'
            : 'bg-slate-100/90 border-slate-200 opacity-70'
      }`}
    >
      {/* Baris Atas: Jam Besar Tebal, Keterangan & Ikon Lonceng Emas */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenEdit(schedule)}
              title="Klik untuk ubah jam"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B192C] hover:text-[#0A4D7C] transition tabular-nums cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-[#0A4D7C]"
            >
              {formattedTime}
            </button>
            {isRinging && (
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800">
                · Berbunyi
              </span>
            )}
          </div>

          <input
            type="text"
            value={draftLabel}
            onChange={(e) => setDraftLabel(e.target.value)}
            onBlur={commitLabel}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.currentTarget.blur();
              }
            }}
            aria-label={`Keterangan jadwal ${formattedTime}`}
            className="mt-0.5 w-full bg-transparent text-sm sm:text-base font-bold text-[#0B192C] border-b border-transparent hover:border-sky-400 focus:border-[#0A4D7C] focus:bg-white/80 focus:px-1.5 rounded outline-none transition"
          />
        </div>

        {/* Ikon Lonceng Emas */}
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => (isRinging ? onStopBell() : onTriggerBell(schedule.id))}
            title={isRinging ? 'Klik untuk hentikan bel' : 'Klik untuk tes bunyi bel'}
            aria-label={isRinging ? `Hentikan bel ${formattedTime}` : `Tes bunyi bel ${formattedTime}`}
            className="p-1 rounded-xl hover:bg-white/60 transition cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0A4D7C]"
          >
            <svg
              className={`w-10 h-10 sm:w-11 sm:h-11 drop-shadow-sm ${isRinging ? 'animate-bell-ring' : ''}`}
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="32" cy="10" r="4" fill="#D97706" />
              <path
                d="M32 13C20.5 13 14 21.5 14 33V43L9 48V51H55V48L50 43V33C50 21.5 43.5 13 32 13Z"
                fill="#FBBF24"
              />
              <path d="M32 13C39 13 45 20 45 33V43L50 48V51H32V13Z" fill="#F59E0B" />
              <path d="M25 51C25 54.866 28.134 58 32 58C35.866 58 39 54.866 39 51H25Z" fill="#B45309" />
              <ellipse cx="24" cy="28" rx="2.5" ry="7" transform="rotate(15 24 28)" fill="#FEF3C7" opacity="0.75" />
            </svg>
          </button>
        </div>
      </div>

      {/* Baris Tengah: Info Audio Terunggah & Sakelar Aktif */}
      <div className="mt-3 pt-2.5 border-t border-sky-200/80 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <span
            className={`truncate font-semibold ${hasAudio ? 'text-[#0A4D7C]' : 'text-slate-700'}`}
            title={hasAudio ? schedule.fileName : 'Nada Bel Standar (Belum unggah MP3)'}
          >
            {hasAudio ? `Audio: ${schedule.fileName}` : 'Bel Standar (Default)'}
          </span>
        </div>

        <label
          className="inline-flex items-center cursor-pointer shrink-0"
          title="Aktifkan/Nonaktifkan jadwal ini"
        >
          <input
            type="checkbox"
            checked={schedule.active}
            onChange={() => onToggleActive(schedule.id)}
            aria-label={`Aktifkan jadwal ${formattedTime}`}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-slate-300 peer-focus-visible:ring-2 peer-focus-visible:ring-[#0A4D7C] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0A4D7C] relative" />
        </label>
      </div>

      {/* Baris Bawah: Unggah Audio, Test Putar, Reset & Hapus Jadwal */}
      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        <label className="flex-1 min-w-[115px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#0A4D7C] hover:bg-sky-900 text-white text-xs font-bold cursor-pointer transition shadow-2xs whitespace-nowrap">
          <Upload className="w-3.5 h-3.5 shrink-0" strokeWidth={2.3} />
          <span>{hasAudio ? 'Ganti Audio' : 'Unggah Audio'}</span>
          <input type="file" accept="audio/*" onChange={handleFileChange} className="hidden" />
        </label>

        {isRinging ? (
          <button
            type="button"
            onClick={onStopBell}
            className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1 whitespace-nowrap shrink-0"
            title="Hentikan suara bel"
          >
            <span>■ Stop</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onTriggerBell(schedule.id)}
            className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1 whitespace-nowrap shrink-0"
            title="Putar suara bel sekarang"
          >
            <span>▶ Putar</span>
          </button>
        )}

        {hasAudio && (
          <button
            type="button"
            onClick={() => onRemoveAudio(schedule.id)}
            className="px-2.5 py-2 rounded-xl bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold transition cursor-pointer whitespace-nowrap shrink-0"
            title="Hapus file audio unggahan"
          >
            Reset
          </button>
        )}

        <button
          type="button"
          onClick={() => onDeleteSchedule(schedule.id)}
          aria-label={`Hapus jadwal ${formattedTime}`}
          title="Hapus jadwal jam ini"
          className="p-2 rounded-xl bg-white/85 hover:bg-rose-100 text-slate-600 hover:text-rose-700 transition cursor-pointer shrink-0"
        >
          <Trash2 className="w-3.5 h-3.5" strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}
