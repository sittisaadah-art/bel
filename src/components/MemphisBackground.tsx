export function MemphisBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Latar Biru Langit Sisi Kanan */}
      <svg className="absolute top-0 right-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <path
          d="M980,0 L1440,0 L1440,900 L820,900 C880,730 1050,650 1020,440 C990,230 1120,120 980,0 Z"
          fill="#E3F2FD"
        />
        {/* Siluet Gedung Sekolah Ar-Rohmah Lembut di Kanan */}
        <g opacity="0.45" fill="#BBDDF8">
          <rect x="1030" y="210" width="130" height="220" rx="6" />
          <polygon points="1020,210 1095,165 1170,210" />
          <rect x="1050" y="235" width="22" height="28" rx="3" fill="#E3F2FD" />
          <rect x="1084" y="235" width="22" height="28" rx="3" fill="#E3F2FD" />
          <rect x="1118" y="235" width="22" height="28" rx="3" fill="#E3F2FD" />
          <rect x="1050" y="280" width="22" height="28" rx="3" fill="#E3F2FD" />
          <rect x="1084" y="280" width="22" height="28" rx="3" fill="#E3F2FD" />
          <rect x="1118" y="280" width="22" height="28" rx="3" fill="#E3F2FD" />
          <rect x="1050" y="325" width="22" height="28" rx="3" fill="#E3F2FD" />
          <rect x="1084" y="325" width="22" height="28" rx="3" fill="#E3F2FD" />
          <rect x="1118" y="325" width="22" height="28" rx="3" fill="#E3F2FD" />
          <rect x="1175" y="275" width="240" height="165" rx="6" />
          <rect x="1200" y="300" width="28" height="35" rx="3" fill="#E3F2FD" />
          <rect x="1245" y="300" width="28" height="35" rx="3" fill="#E3F2FD" />
          <rect x="1290" y="300" width="28" height="35" rx="3" fill="#E3F2FD" />
          <rect x="1335" y="300" width="28" height="35" rx="3" fill="#E3F2FD" />
        </g>
      </svg>

      {/* Gelombang Abstrak Sudut Kiri Atas */}
      <svg className="absolute -top-6 -left-6 w-72 h-56 sm:w-96 sm:h-64" viewBox="0 0 400 260" fill="none">
        <path d="M0,0 L360,0 C310,95 210,70 150,145 C90,220 40,210 0,250 Z" fill="#0A4D7C" />
        <path d="M0,45 C75,55 110,120 75,185 C45,235 15,245 0,255 Z" fill="#F59E0B" />
      </svg>

      {/* Gelombang Abstrak Sudut Kanan Atas */}
      <svg className="absolute -top-4 -right-4 w-72 h-60 sm:w-96 sm:h-72" viewBox="0 0 400 280" fill="none">
        <path d="M60,0 L400,0 L400,240 C310,235 285,150 205,120 C125,90 110,35 60,0 Z" fill="#F59E0B" />
        <path d="M185,0 L400,0 L400,190 C335,175 315,115 260,80 C215,50 200,20 185,0 Z" fill="#0A4D7C" />
      </svg>

      {/* Gelombang Abstrak Sudut Kiri Bawah */}
      <svg className="absolute -bottom-6 -left-6 w-80 h-60 sm:w-[440px] sm:h-72" viewBox="0 0 440 280" fill="none">
        <path d="M0,40 C95,65 115,165 215,190 C315,215 365,240 410,280 L0,280 Z" fill="#F59E0B" />
        <path d="M0,155 C60,175 85,235 155,280 L0,280 Z" fill="#0A4D7C" />
      </svg>

      {/* Gelombang Abstrak Sudut Kanan Bawah */}
      <svg className="absolute -bottom-6 -right-6 w-80 h-64 sm:w-[460px] sm:h-80" viewBox="0 0 460 320" fill="none">
        <path d="M460,40 C340,65 300,165 190,195 C95,220 55,275 30,320 L460,320 Z" fill="#0A4D7C" />
        <path d="M460,135 C385,155 360,235 285,320 L460,320 Z" fill="#F59E0B" opacity="0.9" />
      </svg>

      {/* Elemen Dekoratif Memphis */}
      <div className="hidden md:block absolute top-3 left-[58%] w-24 h-24 rounded-full memphis-stripes opacity-85" />
      <div className="hidden lg:block absolute top-[38%] -left-10 w-32 h-32 rounded-full memphis-stripes opacity-85" />
      <div className="hidden md:block absolute -bottom-10 left-[23%] w-28 h-28 rounded-full memphis-stripes opacity-85" />

      {/* Cincin Lingkaran Oranye & Biru */}
      <div className="hidden sm:block absolute top-6 left-[13%] w-7 h-7 rounded-full border-4 border-[#F59E0B]" />
      <div className="hidden sm:flex absolute top-28 left-[5%] w-7 h-7 rounded-full border-2 border-[#0A4D7C] items-center justify-center">
        <div className="w-4 h-4 rounded-full border-2 border-[#0A4D7C]" />
      </div>
      <div className="hidden lg:block absolute top-14 right-[20%] w-6 h-6 rounded-full border-4 border-[#0A4D7C]" />
      <div className="hidden lg:block absolute top-24 right-[26%] w-6 h-6 rounded-full border-4 border-[#F59E0B]" />

      {/* Bintang 4 Sudut Oranye & Biru */}
      <svg className="hidden sm:block absolute top-14 left-[20%] w-6 h-6 text-[#0A4D7C]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2Z" />
      </svg>
      <svg className="hidden sm:block absolute top-8 left-[48%] w-6 h-6 text-[#F59E0B]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2Z" />
      </svg>
      <svg className="hidden sm:block absolute top-44 left-[10%] w-6 h-6 text-[#F59E0B]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2Z" />
      </svg>

      {/* Zigzag Memphis */}
      <svg className="hidden md:block absolute top-20 left-[3%] w-24 h-6" viewBox="0 0 100 20" fill="none">
        <polyline
          points="0,15 12,5 24,15 36,5 48,15 60,5 72,15 84,5 96,15"
          stroke="#F59E0B"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg className="hidden lg:block absolute top-14 left-[55%] w-28 h-8" viewBox="0 0 110 30" fill="none">
        <polyline
          points="0,12 12,4 24,12 36,4 48,12 60,4 72,12 84,4 96,12"
          stroke="#F59E0B"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="0,24 12,16 24,24 36,16 48,24 60,16 72,24 84,16 96,24"
          stroke="#0A4D7C"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Ikon Lonceng Klasik Dekoratif Kanan Atas */}
      <svg className="hidden xl:block absolute top-6 right-6 w-32 h-32 drop-shadow-md" viewBox="0 0 140 140" fill="none">
        <rect x="52" y="88" width="54" height="36" rx="8" fill="#1E3A5F" />
        <circle cx="75" cy="64" r="34" fill="#F59E0B" />
        <circle cx="75" cy="64" r="26" fill="#FBBF24" />
        <circle cx="75" cy="64" r="6" fill="#FEF3C7" />
        <line x1="108" y1="64" x2="124" y2="54" stroke="#1E3A5F" strokeWidth="5" strokeLinecap="round" />
        <circle cx="126" cy="53" r="6" fill="#E2E8F0" />
        <path d="M35,38 C24,52 24,76 35,90" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        <path d="M24,28 C10,48 10,80 24,100" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
      </svg>

      {/* Ikon Lonceng Klasik Dekoratif Kanan Bawah */}
      <svg className="hidden xl:block absolute bottom-4 right-5 w-28 h-28" viewBox="0 0 140 140" fill="none">
        <g transform="rotate(-15 70 70)">
          <rect x="52" y="88" width="54" height="32" rx="8" fill="#1E3A5F" />
          <circle cx="75" cy="64" r="32" fill="#F59E0B" />
          <circle cx="75" cy="64" r="24" fill="#FBBF24" />
          <circle cx="75" cy="64" r="5" fill="#FEF3C7" />
          <path d="M35,38 C24,52 24,76 35,90" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
          <path d="M24,28 C10,48 10,80 24,100" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>

      {/* Siswi Kiri Bawah (Seragam SMP Biru Dongker + Hijab Putih + Buku Oranye) */}
      <svg className="hidden 2xl:block fixed bottom-0 left-3 w-48 h-80 z-0" viewBox="0 0 200 340" fill="none">
        <path d="M55,225 L135,225 L148,340 L42,340 Z" fill="#13293D" />
        <path d="M58,132 C58,118 132,118 132,132 L140,230 L50,230 Z" fill="#0A4D7C" />
        <path d="M58,134 L38,195 L68,205 L75,160" fill="#0A4D7C" />
        <path d="M132,134 L152,195 L118,205 L112,160" fill="#0A4D7C" />
        <path d="M54,75 C54,42 136,42 136,75 L146,162 C118,176 72,176 44,162 Z" fill="#F8FAFC" />
        <path d="M54,158 C80,170 110,170 136,158" stroke="#CBD5E1" strokeWidth="2" />
        <path d="M72,72 C72,54 118,54 118,72 L118,96 C118,112 72,112 72,96 Z" fill="#FDBA8C" />
        <circle cx="86" cy="83" r="2.8" fill="#1E293B" />
        <circle cx="106" cy="83" r="2.8" fill="#1E293B" />
        <path d="M91,97 Q97,103 103,97" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="74" y="162" width="46" height="58" rx="4" fill="#EA580C" />
        <rect x="78" y="166" width="38" height="10" rx="2" fill="#FEF3C7" />
        <circle cx="72" cy="195" r="8" fill="#FDBA8C" />
        <circle cx="118" cy="195" r="8" fill="#FDBA8C" />
      </svg>

      {/* Grup 5 Siswi SMP & SMA di Sisi Kanan Bawah */}
      <svg className="hidden xl:block fixed bottom-0 right-16 w-[430px] h-[470px] z-0" viewBox="0 0 460 500" fill="none">
        <path d="M90,270 C30,240 20,170 55,145 C90,175 105,220 90,270 Z" fill="#0A4D7C" />
        <path d="M85,295 C25,295 5,245 25,215 C65,225 85,255 85,295 Z" fill="#F59E0B" />
        <path d="M75,470 C20,440 5,375 35,345 C75,375 88,425 75,470 Z" fill="#FBBF24" />
        <path d="M65,495 C15,490 -5,445 15,415 C50,425 65,460 65,495 Z" fill="#0A4D7C" />

        {/* SISWI 1 */}
        <g transform="translate(75, 65)">
          <path d="M35,165 L105,165 L115,310 L25,310 Z" fill="#13293D" />
          <path d="M35,88 C35,75 105,75 105,88 L112,170 L28,170 Z" fill="#0A4D7C" />
          <path d="M102,92 L152,115 L145,128 L98,112 Z" fill="#0A4D7C" />
          <circle cx="155" cy="121" r="7" fill="#FDBA8C" />
          <path d="M34,42 C34,12 106,12 106,42 L114,115 C90,126 50,126 26,115 Z" fill="#F8FAFC" />
          <path d="M52,38 C52,22 92,22 92,38 L92,58 C92,72 52,72 52,58 Z" fill="#FDBA8C" />
          <circle cx="66" cy="47" r="2.4" fill="#1E293B" />
          <circle cx="82" cy="47" r="2.4" fill="#1E293B" />
          <path d="M70,58 Q75,63 80,58" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
          <rect x="52" y="108" width="38" height="48" rx="3" fill="#FACC15" />
        </g>

        {/* SISWI 2 */}
        <g transform="translate(215, 55)">
          <path d="M35,165 L105,165 L115,310 L25,310 Z" fill="#13293D" />
          <path d="M38,92 L-15,72 L-10,86 L35,110 Z" fill="#0A4D7C" />
          <circle cx="-18" cy="78" r="7" fill="#FDBA8C" />
          <path d="M35,88 C35,75 105,75 105,88 L112,170 L28,170 Z" fill="#1D6396" />
          <path d="M40,100 L100,100 M40,115 L100,115 M40,130 L100,130 M40,145 L100,145" stroke="#93C5FD" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M34,42 C34,12 106,12 106,42 L114,115 C90,126 50,126 26,115 Z" fill="#F8FAFC" />
          <path d="M48,38 C48,22 88,22 88,38 L88,58 C88,72 48,72 48,58 Z" fill="#FDBA8C" />
          <circle cx="60" cy="47" r="2.4" fill="#1E293B" />
          <circle cx="76" cy="47" r="2.4" fill="#1E293B" />
          <path d="M64,58 Q69,63 74,58" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
          <rect x="44" y="108" width="36" height="46" rx="3" fill="#EA580C" />
        </g>

        {/* SISWI 3 */}
        <g transform="translate(325, 85)">
          <path d="M35,165 L100,165 L108,290 L28,290 Z" fill="#13293D" />
          <path d="M35,92 L5,68 L14,60 L42,88 Z" fill="#F59E0B" />
          <circle cx="8" cy="62" r="6.5" fill="#FDBA8C" />
          <path d="M35,88 C35,75 100,75 100,88 L106,170 L28,170 Z" fill="#D97706" />
          <rect x="33" y="112" width="68" height="55" fill="#1E3A5F" opacity="0.85" />
          <path d="M38,122 L96,122 M38,136 L96,136 M38,150 L96,150" stroke="#FBBF24" strokeWidth="2" strokeDasharray="5 3" />
          <path d="M34,42 C34,12 100,12 100,42 L108,112 C85,122 50,122 26,112 Z" fill="#F8FAFC" />
          <path d="M46,38 C46,22 84,22 84,38 L84,58 C84,72 46,72 46,58 Z" fill="#FDBA8C" />
          <circle cx="57" cy="47" r="2.4" fill="#1E293B" />
          <circle cx="72" cy="47" r="2.4" fill="#1E293B" />
          <path d="M60,58 Q65,63 70,58" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
          <polygon points="10,125 55,132 95,125 88,142 52,146 16,140" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        </g>

        {/* SISWI 4 */}
        <g transform="translate(45, 215)">
          <path d="M35,175 L108,175 L118,295 L25,295 Z" fill="#13293D" />
          <path d="M35,95 C35,80 108,80 108,95 L116,180 L28,180 Z" fill="#0A4D7C" />
          <path d="M104,102 L148,125 L142,138 L100,120 Z" fill="#0A4D7C" />
          <circle cx="150" cy="131" r="7" fill="#FDBA8C" />
          <path d="M34,44 C34,12 108,12 108,44 L116,122 C90,134 50,134 26,122 Z" fill="#F8FAFC" />
          <path d="M52,40 C52,24 94,24 94,40 L94,62 C94,76 52,76 52,62 Z" fill="#FDBA8C" />
          <circle cx="67" cy="50" r="2.6" fill="#1E293B" />
          <circle cx="84" cy="50" r="2.6" fill="#1E293B" />
          <path d="M71,62 Q76,67 81,62" stroke="#9A3412" strokeWidth="2.2" strokeLinecap="round" />
          <rect x="48" y="114" width="40" height="52" rx="4" fill="#EA580C" />
        </g>

        {/* SISWI 5 */}
        <g transform="translate(185, 210)">
          <path d="M35,175 L110,175 L120,295 L25,295 Z" fill="#13293D" />
          <path d="M105,102 L148,74 L156,86 L112,120 Z" fill="#F59E0B" />
          <circle cx="155" cy="78" r="7" fill="#FDBA8C" />
          <path d="M35,95 C35,80 110,80 110,95 L118,180 L28,180 Z" fill="#1E3A5F" />
          <path d="M40,105 L105,105 M40,122 L105,122 M40,139 L105,139 M40,156 L105,156" stroke="#F59E0B" strokeWidth="3" strokeDasharray="6 4" />
          <path d="M34,44 C34,12 110,12 110,44 L118,122 C92,134 52,134 26,122 Z" fill="#F8FAFC" />
          <path d="M48,40 C48,24 90,24 90,40 L90,62 C90,76 48,76 48,62 Z" fill="#FDBA8C" />
          <circle cx="60" cy="50" r="2.6" fill="#1E293B" />
          <circle cx="77" cy="50" r="2.6" fill="#1E293B" />
          <path d="M64,62 Q69,68 74,62" stroke="#9A3412" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
