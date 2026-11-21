export interface BellSchedule {
  id: string;
  time: string; // HH:MM (24-hour format)
  label: string;
  active: boolean;
  fileName: string;
}

export interface BellAudioRecord {
  id: string;
  blob: Blob;
  fileName: string;
}

export const DEFAULT_SCHEDULES: BellSchedule[] = [
  { id: 'bell-1', time: '07:30', label: 'Bel Berbunyi', active: true, fileName: '' },
  { id: 'bell-2', time: '07:40', label: 'Mulai KBM', active: true, fileName: '' },
  { id: 'bell-3', time: '08:50', label: 'Istirahat', active: true, fileName: '' },
  { id: 'bell-4', time: '09:00', label: 'Istirahat', active: true, fileName: '' },
  { id: 'bell-5', time: '09:30', label: 'Istirahat', active: true, fileName: '' },
  { id: 'bell-6', time: '09:40', label: 'Istirahat', active: true, fileName: '' },
  { id: 'bell-7', time: '10:50', label: 'Ujian Selesai', active: true, fileName: '' },
  { id: 'bell-8', time: '11:00', label: 'Ujian Selesai', active: true, fileName: '' },
];
