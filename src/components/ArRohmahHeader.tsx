export function ArRohmahHeader() {
  return (
    <header className="flex flex-col items-center text-center mb-5">
      {/* Logo Vektor Resmi AR-ROHMAH BOGOR */}
      <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-2xl shadow-sm border border-sky-100 mb-3">
        <svg className="w-12 h-14 sm:w-14 sm:h-16 shrink-0" viewBox="0 0 100 120" fill="none" aria-hidden="true">
          <path d="M50 2L54.5 11.5L64 16L54.5 20.5L50 30L45.5 20.5L36 16L45.5 11.5Z" fill="#F59E0B" />
          <path d="M18 32H34V37H23V92L50 108L77 92V37H66V32H82V95L50 114L18 95V32Z" fill="#0A4D7C" />
          <rect x="28" y="34" width="6" height="44" fill="#0A4D7C" />
          <rect x="38" y="30" width="6" height="44" fill="#0A4D7C" />
          <rect x="47" y="26" width="6" height="42" fill="#0A4D7C" />
          <rect x="56" y="30" width="6" height="44" fill="#0A4D7C" />
          <rect x="66" y="34" width="6" height="44" fill="#0A4D7C" />
          <path d="M27 81L46 72V77L27 86V81Z" fill="#F59E0B" />
          <path d="M73 81L54 72V77L73 86V81Z" fill="#F59E0B" />
          <path d="M50 71L55 82L52 84V102H48V84L45 82L50 71Z" fill="#0A4D7C" />
          <circle cx="50" cy="83" r="1.8" fill="#FFFFFF" />
          <path d="M27 88L47 98V104L27 93V88Z" fill="#0A4D7C" />
          <path d="M73 88L53 98V104L73 93V88Z" fill="#0A4D7C" />
        </svg>

        <div className="text-left">
          <div className="flex items-center font-extrabold text-xl sm:text-2xl tracking-tight text-[#0A4D7C] leading-none">
            <span>AR</span>
            <svg className="w-3.5 h-3.5 mx-0.5 text-[#F59E0B]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0L15 9L24 12L15 15L12 24L9 15L0 12L9 9Z" />
            </svg>
            <span>R</span>
            <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0A4D7C] text-white mx-0.5">
              <span className="w-2.5 h-2.5 rotate-45 bg-white block" />
            </span>
            <span>HMAH</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-extrabold text-lg sm:text-xl tracking-wide text-[#F59E0B] leading-none">BOGOR</span>
            <span className="h-6 w-[1.5px] bg-[#0A4D7C]" />
            <span className="text-[10px] font-bold text-[#0A4D7C] leading-tight">
              International Islamic
              <br />
              Boarding School
            </span>
          </div>
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B192C] uppercase text-balance">
        BELL OTOMATIS PSAS
      </h1>
      <p className="text-base sm:text-xl font-extrabold text-[#0B192C] tracking-wide mt-0.5 uppercase">
        SMP - SMA AR-ROHMAH BOGOR
      </p>
    </header>
  );
}
