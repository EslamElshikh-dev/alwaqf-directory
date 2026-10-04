type MethodKind = "source" | "location" | "publish";

export default function MethodIllustration({ kind }: { kind: MethodKind }) {
  if (kind === "source") return <svg className="method-illustration" viewBox="0 0 360 150" fill="none" aria-hidden="true">
    <path d="M24 119c59-49 95-16 146-40 49-23 83-13 161-57" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 8" opacity=".4" />
    <circle cx="39" cy="116" r="5" fill="currentColor" opacity=".35" /><circle cx="319" cy="30" r="5" fill="currentColor" opacity=".35" />
    <rect x="111" y="19" width="101" height="112" rx="11" fill="#f4ecd9" stroke="currentColor" strokeWidth="1.8" opacity=".85" transform="rotate(8 111 19)" />
    <rect x="91" y="17" width="105" height="113" rx="11" fill="#fffdf5" stroke="currentColor" strokeWidth="2" />
    <path d="M110 45h35m-35 15h64m-64 13h52m-52 13h38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".45" />
    <path d="M110 105h32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".3" />
    <circle cx="215" cy="81" r="30" fill="#e3eee3" stroke="currentColor" strokeWidth="3" />
    <path d="m236 103 22 22" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
    <path d="M205 82h21m-16-9 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity=".8" />
    <path d="m72 36 4-9 4 9 9 4-9 4-4 9-4-9-9-4 9-4Zm208 43 3-6 3 6 6 3-6 3-3 6-3-6-6-3 6-3Z" fill="currentColor" opacity=".55" />
  </svg>;

  if (kind === "location") return <svg className="method-illustration" viewBox="0 0 360 150" fill="none" aria-hidden="true">
    <path d="M20 112c62-50 83-37 137-28 55 10 88 42 182-24" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 8" opacity=".42" />
    <path d="m83 40 63-15 69 18 61-18v85l-61 18-69-18-63 15V40Z" fill="#fffaf0" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="m146 25v85m69-67v85" stroke="currentColor" strokeWidth="1.5" opacity=".43" />
    <path d="M98 99c36-34 60-21 83-18 33 4 52-19 79-27" stroke="currentColor" strokeWidth="2.5" strokeDasharray="5 6" strokeLinecap="round" opacity=".65" />
    <circle cx="111" cy="93" r="5" fill="currentColor" opacity=".55" /><circle cx="250" cy="58" r="5" fill="currentColor" opacity=".55" />
    <path d="M188 16c-17 0-29 12-29 28 0 21 29 48 29 48s29-27 29-48c0-16-12-28-29-28Z" fill="#e3ba77" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="188" cy="44" r="10" fill="#fff9e9" stroke="currentColor" strokeWidth="2" />
    <path d="m53 62 4-8 4 8 8 4-8 4-4 8-4-8-8-4 8-4Zm239 42 3-6 3 6 6 3-6 3-3 6-3-6-6-3 6-3Z" fill="currentColor" opacity=".55" />
  </svg>;

  return <svg className="method-illustration" viewBox="0 0 360 150" fill="none" aria-hidden="true">
    <path d="M25 107c68-52 104-23 152-28 61-7 95-24 155-58" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 8" opacity=".4" />
    <rect x="100" y="22" width="139" height="108" rx="13" fill="#fffdf5" stroke="currentColor" strokeWidth="2.5" />
    <path d="M121 49h65m-65 14h53m-53 14h37m-37 30h39" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".4" />
    <path d="M239 48h20v48l-10-8-10 8V48Z" fill="#c2d9bd" stroke="currentColor" strokeWidth="2" />
    <circle cx="226" cy="96" r="32" fill="#e7bd78" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="226" cy="96" r="25" stroke="#fff7dc" strokeWidth="1.5" opacity=".85" />
    <path d="m213 96 9 9 17-20" stroke="#fffdf1" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m63 46 4-9 4 9 9 4-9 4-4 9-4-9-9-4 9-4Zm234 55 3-7 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" fill="currentColor" opacity=".55" />
    <circle cx="52" cy="118" r="5" fill="currentColor" opacity=".35" /><circle cx="314" cy="28" r="5" fill="currentColor" opacity=".35" />
  </svg>;
}
