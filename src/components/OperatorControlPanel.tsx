import { Clock, Square, Volume2, X } from 'lucide-react';
import { BellSchedule } from '../types/bell';

interface OperatorControlPanelProps {
  now: Date;
  schedules: BellSchedule[];
  audioUnlocked: boolean;
  isRinging: boolean;
  toastMessage: string | null;
  onEnableAudio: () => void;
  onStopAllAudio: () => void;
  onDismissToast: () => void;
}

function getNextBellCountdown(now: Date, schedules: BellSchedule[]) {
  const activeList = schedules.filter((s) => s.active);
  if (activeList.length === 0) {
    return {
      infoText: 'Tidak ada jadwal aktif',
      countdownText: '--:--:--',
    };
  }

  let nextTarget: Date | null = null;
  let nextItem: BellSchedule | null = null;

  for (const item of activeList) {
    const [h, m] = item.time.split(':').map(Number);
    const target = new Date(now);
    target.setHours(h, m, 0, 0);
    if (target > now) {
      nextTarget = target;
      nextItem = item;
      break;
    }
  }

  if (!nextTarget || !nextItem) {
    nextItem = activeList[0];
    const [h, m] = nextItem.time.split(':').map(Number);
    nextTarget = new Date(now);
    nextTarget.setDate(nextTarget.getDate() + 1);
    nextTarget.setHours(h, m, 0, 0);
  }

  const diffSec = Math.max(0, Math.floor((nextTarget.getTime() - now.getTime()) / 1000));
  const remH = String(Math.floor(diffSec / 3600)).padStart(2, '0');
  const remM = String(Math.floor((diffSec % 3600) / 60)).padStart(2, '0');
  const remS = String(diffSec % 60).padStart(2, '0');

  return {
    infoText: `${nextItem.time.replace(':', '.')} - ${nextItem.label}`,
    countdownText: `Dalam ${remH}:${remM}:${remS}`,
  };
}

export function OperatorControlPanel({
  now,
  schedules,
  audioUnlocked,
  isRinging,
  toastMessage,
  onEnableAudio,
  onStopAllAudio,
  onDismissToast,
}: OperatorControlPanelProps) {
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');

  const formattedDate = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const { infoText, countdownText } = getNextBellCountdown(now, schedules);

  return (
    <section className="max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-md border-2 border-[#DCEFFA] p-4 mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Jam Digital Real-Time */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#0A4D7C] text-white flex items-center justify-center shadow-inner shrink-0">
            <Clock className="w-6 h-6 text-[#FBBF24]" strokeWidth={2.2} />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Waktu Sekarang (WIB)
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#0A4D7C] tabular-nums tracking-tight">
              {hh}:{mm}:{ss}
            </div>
            <div className="text-xs font-medium text-slate-600">{formattedDate}</div>
          </div>
        </div>

        {/* Countdown Bel Berikutnya */}
        <div className="bg-[#DCEFFA]/70 px-4 py-2.5 rounded-xl border border-sky-200 text-center md:text-left min-w-[205px]">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#0A4D7C]">
            Bel Berikutnya
          </div>
          <div className="text-sm font-extrabold text-[#0B192C] mt-0.5 truncate max-w-[230px]" title={infoText}>
            {infoText}
          </div>
          <div className="text-xs font-semibold text-amber-800 tabular-nums">{countdownText}</div>
        </div>

        {/* Tombol Aktivasi Audio & Kontrol */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={onEnableAudio}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm text-white shadow-sm transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A4D7C] ${
              audioUnlocked
                ? 'bg-emerald-700 hover:bg-emerald-800'
                : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            <Volume2 className="w-4 h-4 shrink-0" strokeWidth={2.5} />
            <span>{audioUnlocked ? 'Sistem Audio Aktif ✓' : 'Aktifkan Sistem Audio'}</span>
          </button>

          {isRinging && (
            <button
              type="button"
              onClick={onStopAllAudio}
              className="px-4 py-2.5 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
            >
              <Square className="w-3.5 h-3.5 fill-current shrink-0" />
              <span>Hentikan Bel</span>
            </button>
          )}
        </div>
      </div>

      {/* Baris Status Notifikasi Ringan */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="mt-3 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-between bg-sky-50 text-[#0A4D7C] border border-sky-200"
        >
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={onDismissToast}
            aria-label="Tutup notifikasi"
            className="text-slate-500 hover:text-slate-800 p-1 rounded cursor-pointer ml-3 focus-visible:outline-2 focus-visible:outline-[#0A4D7C]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </section>
  );
}
