export function ReportIllustration() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EAF2F6] to-[#F8FAFC]"></div>

      {/* Main report element */}
      <div className="absolute right-[10%] top-[15%] h-[60%] w-[40%] rounded-lg bg-[#F1F5F9] shadow-xl">
        {/* Report header */}
        <div className="absolute left-[5%] right-[5%] top-[5%] h-[10%] rounded bg-[#64748B]"></div>

        {/* Report content lines */}
        <div className="absolute left-[5%] right-[40%] top-[20%] h-[3%] rounded bg-[#64748B]/70"></div>
        <div className="absolute left-[5%] right-[50%] top-[26%] h-[3%] rounded bg-[#64748B]/70"></div>
        <div className="absolute left-[5%] right-[30%] top-[32%] h-[3%] rounded bg-[#64748B]/70"></div>
        <div className="absolute left-[5%] right-[60%] top-[38%] h-[3%] rounded bg-[#64748B]/70"></div>

        {/* Chart area */}
        <div className="absolute bottom-[15%] left-[5%] right-[5%] top-[45%] rounded bg-[#2483A1]/20"></div>
      </div>

      {/* Bar chart */}
      <div className="absolute bottom-[15%] right-[15%] flex h-[25%] w-[20%] items-end gap-2">
        <div className="h-[90%] w-6 rounded-t-md bg-[#F87171]"></div>
        <div className="h-[75%] w-6 rounded-t-md bg-[#31E2EF]"></div>
        <div className="h-[60%] w-6 rounded-t-md bg-[#31E2EF]"></div>
        <div className="h-[45%] w-6 rounded-t-md bg-[#CBD5E1]"></div>
        <div className="h-[80%] w-6 rounded-t-md bg-[#4ADE80]"></div>
      </div>

      {/* Magnifying glass */}
      <div className="absolute left-[25%] top-[35%]">
        <div className="relative h-20 w-20">
          <div className="absolute h-12 w-12 rounded-full border-4 border-[#020617]"></div>
          <div className="absolute bottom-1 right-1 h-10 w-3 rotate-45 rounded-full bg-[#31E2EF]"></div>
        </div>
      </div>

      {/* Plant element */}
      <div className="absolute bottom-[10%] left-[10%]">
        <div className="relative h-24 w-16">
          <div className="absolute bottom-0 h-8 w-4 rounded-full bg-[#31E2EF]"></div>
          <div className="absolute bottom-8 h-16 w-8 rounded-full bg-[#22C55E]"></div>
          <div className="absolute bottom-6 left-6 h-14 w-10 rounded-full bg-[#22C55E]"></div>
        </div>
      </div>

      {/* Character silhouette */}
      <div className="absolute bottom-[25%] left-[40%]">
        <div className="relative h-24 w-16">
          <div className="absolute top-0 h-8 w-8 rounded-full bg-[#FFAC99]"></div>
          <div className="absolute top-8 h-16 w-12 rounded-md bg-[#94A3B8]"></div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-[20%] left-[60%] h-[30%] w-[15%] rounded-lg bg-[#CBD5E1]/30 transform rotate-12"></div>
      <div className="absolute right-[5%] top-[20%] h-[10%] w-[10%] rounded-full bg-[#68E1FD]/30"></div>
    </div>
  )
}
