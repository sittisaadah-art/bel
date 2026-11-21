/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { ArRohmahHeader } from './components/ArRohmahHeader';
import { MemphisBackground } from './components/MemphisBackground';
import { OperatorControlPanel } from './components/OperatorControlPanel';
import { ScheduleCard } from './components/ScheduleCard';
import { ScheduleModal } from './components/ScheduleModal';
import { BellSchedule } from './types/bell';
import {
  deleteAudioFromDB,
  getAudioFromDB,
  loadSchedulesFromStorage,
  saveAudioToDB,
  saveSchedulesToStorage,
  sortSchedules,
} from './utils/audioDb';
import { startFallbackChime, unlockAudioSystem } from './utils/audioEngine';

export default function App() {
  const [schedules, setSchedules] = useState<BellSchedule[]>(() => loadSchedulesFromStorage());
  const [now, setNow] = useState<Date>(() => new Date());
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [activeRingingId, setActiveRingingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<BellSchedule | null>(null);

  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const activeObjectUrlRef = useRef<string | null>(null);
  const stopChimeRef = useRef<(() => void) | null>(null);
  const lastTriggeredKeyRef = useRef<string>('');
  const schedulesRef = useRef<BellSchedule[]>(schedules);

  useEffect(() => {
    schedulesRef.current = schedules;
  }, [schedules]);

  const stopAllAudio = useCallback(() => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current.currentTime = 0;
      activeAudioRef.current = null;
    }
    if (activeObjectUrlRef.current) {
      URL.revokeObjectURL(activeObjectUrlRef.current);
      activeObjectUrlRef.current = null;
    }
    if (stopChimeRef.current) {
      stopChimeRef.current();
      stopChimeRef.current = null;
    }
    setActiveRingingId(null);
  }, []);

  const playFallbackForSchedule = useCallback(
    (scheduleId: string) => {
      try {
        stopChimeRef.current = startFallbackChime(() => {
          stopAllAudio();
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Audio gagal diputar.';
        setToastMessage(`Gagal memutar nada bel (${scheduleId}): ${message}`);
        setActiveRingingId(null);
      }
    },
    [stopAllAudio],
  );

  const triggerBell = useCallback(
    async (scheduleId: string) => {
      const item = schedulesRef.current.find((s) => s.id === scheduleId);
      if (!item) return;

      stopAllAudio();
      setActiveRingingId(scheduleId);
      setToastMessage(`Bel ${item.time.replace(':', '.')} (${item.label}) sedang berbunyi!`);

      try {
        const record = await getAudioFromDB(scheduleId);
        if (record && record.blob) {
          const url = URL.createObjectURL(record.blob);
          const audio = new Audio(url);
          activeObjectUrlRef.current = url;
          activeAudioRef.current = audio;

          audio.onended = () => {
            stopAllAudio();
          };
          audio.onerror = () => {
            if (activeObjectUrlRef.current) {
              URL.revokeObjectURL(activeObjectUrlRef.current);
              activeObjectUrlRef.current = null;
            }
            activeAudioRef.current = null;
            playFallbackForSchedule(scheduleId);
          };

          await audio.play();
        } else {
          playFallbackForSchedule(scheduleId);
        }
      } catch {
        // Fallback ke Web Audio API jika file audio atau autoplay terblokir
        playFallbackForSchedule(scheduleId);
      }
    },
    [playFallbackForSchedule, stopAllAudio],
  );

  // Tick jam real-time setiap 500ms & cek jadwal otomatis
  useEffect(() => {
    const tick = () => {
      const current = new Date();
      setNow(current);

      const hh = String(current.getHours()).padStart(2, '0');
      const mm = String(current.getMinutes()).padStart(2, '0');
      const ss = current.getSeconds();
      const currentHM = `${hh}:${mm}`;

      // Picu pada awal menit (detik 0-1) agar tidak terlewat saat tab browser melambat
      if (ss <= 1) {
        const triggerKey = `${current.toDateString()}-${currentHM}`;
        if (lastTriggeredKeyRef.current !== triggerKey) {
          const matched = schedulesRef.current.find((s) => s.active && s.time === currentHM);
          if (matched) {
            lastTriggeredKeyRef.current = triggerKey;
            void triggerBell(matched.id);
          }
        }
      }
    };

    tick();
    const timer = window.setInterval(tick, 500);
    return () => {
      window.clearInterval(timer);
    };
  }, [triggerBell]);

  // Bersihkan audio saat unmount
  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, [stopAllAudio]);

  const handleEnableAudio = async () => {
    try {
      await unlockAudioSystem();
      setAudioUnlocked(true);
      setToastMessage('Sistem audio aktif! Bel akan berbunyi otomatis sesuai jadwal.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Tidak dapat mengaktifkan audio.';
      setToastMessage(`Gagal mengaktifkan audio browser: ${message}`);
    }
  };

  const updateSchedules = (updater: (prev: BellSchedule[]) => BellSchedule[]) => {
    setSchedules((prev) => {
      const next = sortSchedules(updater(prev));
      saveSchedulesToStorage(next);
      return next;
    });
  };

  const handleToggleActive = (id: string) => {
    updateSchedules((prev) => prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item)));
  };

  const handleUpdateLabel = (id: string, newLabel: string) => {
    updateSchedules((prev) => prev.map((item) => (item.id === id ? { ...item, label: newLabel } : item)));
  };

  const handleUploadAudio = async (id: string, file: File) => {
    try {
      await saveAudioToDB(id, file, file.name);
      const target = schedulesRef.current.find((s) => s.id === id);
      updateSchedules((prev) => prev.map((item) => (item.id === id ? { ...item, fileName: file.name } : item)));
      const timeDisplay = target ? target.time.replace(':', '.') : '';
      setToastMessage(`Audio "${file.name}" berhasil dipasang untuk jam ${timeDisplay}.`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error penyimpanan lokal.';
      setToastMessage(`Gagal menyimpan file audio: ${message}`);
    }
  };

  const handleRemoveAudio = async (id: string) => {
    try {
      await deleteAudioFromDB(id);
      updateSchedules((prev) => prev.map((item) => (item.id === id ? { ...item, fileName: '' } : item)));
      if (activeRingingId === id) {
        stopAllAudio();
      }
      setToastMessage('Audio kustom dihapus, kembali ke nada bel standar.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal menghapus audio.';
      setToastMessage(message);
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    if (schedules.length <= 1) {
      setToastMessage('Minimal harus ada 1 jadwal bel.');
      return;
    }
    if (activeRingingId === id) {
      stopAllAudio();
    }
    await deleteAudioFromDB(id);
    updateSchedules((prev) => prev.filter((item) => item.id !== id));
    setToastMessage('Jadwal bel dihapus.');
  };

  const handleSaveModal = (time: string, label: string, existingId?: string) => {
    if (existingId) {
      updateSchedules((prev) =>
        prev.map((item) => (item.id === existingId ? { ...item, time, label } : item)),
      );
    } else {
      const newItem: BellSchedule = {
        id: `bell-${Date.now()}`,
        time,
        label,
        active: true,
        fileName: '',
      };
      updateSchedules((prev) => [...prev, newItem]);
    }
    setModalOpen(false);
    setEditingSchedule(null);
    setToastMessage('Jadwal bel berhasil disimpan.');
  };

  return (
    <div className="min-h-screen relative">
      <MemphisBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
        <ArRohmahHeader />

        <OperatorControlPanel
          now={now}
          schedules={schedules}
          audioUnlocked={audioUnlocked}
          isRinging={activeRingingId !== null}
          toastMessage={toastMessage}
          onEnableAudio={handleEnableAudio}
          onStopAllAudio={stopAllAudio}
          onDismissToast={() => setToastMessage(null)}
        />

        <main className="max-w-3xl mx-auto lg:mx-0 lg:ml-6 xl:ml-10">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm sm:text-base font-extrabold text-[#0A4D7C] uppercase tracking-wide">
              Jadwal Bel Otomatis &amp; Unggah Audio
            </h2>
            <button
              type="button"
              onClick={() => {
                setEditingSchedule(null);
                setModalOpen(true);
              }}
              className="text-xs font-bold px-3.5 py-2 rounded-lg bg-[#0A4D7C] hover:bg-sky-900 text-white transition flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap shrink-0"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span>Tambah Jam</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schedules.map((item) => (
              <ScheduleCard
                key={item.id}
                schedule={item}
                isRinging={activeRingingId === item.id}
                onOpenEdit={(sched) => {
                  setEditingSchedule(sched);
                  setModalOpen(true);
                }}
                onTriggerBell={(id) => void triggerBell(id)}
                onStopBell={stopAllAudio}
                onToggleActive={handleToggleActive}
                onUpdateLabel={handleUpdateLabel}
                onUploadAudio={(id, file) => void handleUploadAudio(id, file)}
                onRemoveAudio={(id) => void handleRemoveAudio(id)}
                onDeleteSchedule={(id) => void handleDeleteSchedule(id)}
              />
            ))}
          </div>
        </main>

        <footer className="max-w-3xl mx-auto lg:mx-0 lg:ml-6 xl:ml-10 mt-6 text-center md:text-left text-xs text-slate-600 font-medium bg-white/85 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-slate-200/80">
          <strong>Tips Operator:</strong> Klik <em>&ldquo;Aktifkan Sistem Audio&rdquo;</em> saat halaman dibuka agar
          browser mengizinkan bel berbunyi otomatis. File audio yang diunggah pada tiap jam tersimpan otomatis di
          browser Anda.
        </footer>
      </div>

      <ScheduleModal
        isOpen={modalOpen}
        editingSchedule={editingSchedule}
        onClose={() => {
          setModalOpen(false);
          setEditingSchedule(null);
        }}
        onSave={handleSaveModal}
      />
    </div>
  );
}
