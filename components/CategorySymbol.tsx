type Kind = "pharmacy" | "market" | "school" | "mosque";

export default function CategorySymbol({ kind }: { kind: Kind }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="60" cy="60" r="52" strokeWidth="1" opacity=".25" />
      <circle cx="60" cy="60" r="41" strokeWidth="1" opacity=".25" />
      {kind === "pharmacy" && <>
        <rect x="34" y="40" width="52" height="48" rx="7" />
        <path d="M44 40v-8h32v8M60 51v26M47 64h26M39 89h42" />
        <path d="M42 27h36" strokeWidth="1.5" opacity=".55" />
      </>}
      {kind === "market" && <>
        <path d="M34 52h52l-4 37H38l-4-37ZM31 52l6-21h46l6 21M47 31v21m13-21v21m13-21v21" />
        <path d="M50 89V68h20v21" />
        <path d="M30 58c6 6 12 6 18 0 6 6 12 6 18 0 6 6 12 6 18 0" strokeWidth="1.5" opacity=".65" />
      </>}
      {kind === "school" && <>
        <path d="M26 48 60 30l34 18v42H26V48ZM34 48h52M41 59h11v12H41V59Zm27 0h11v12H68V59ZM54 90V77h12v13" />
        <path d="M60 30V20m0 0h14" />
      </>}
      {kind === "mosque" && <>
        <path d="M33 89V58c0-15 12-18 27-31 15 13 27 16 27 31v31H33ZM28 89h64M47 89V72c0-7 6-12 13-12s13 5 13 12v17" />
        <path d="M22 89V41m0 0-5-5 5-5 5 5-5 5Zm76 48V41m0 0-5-5 5-5 5 5-5 5Z" />
      </>}
    </svg>
  );
}
