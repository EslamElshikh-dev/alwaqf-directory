type AreaKind = "alwaqf" | "almarashda" | "alqalamina" | "jazirat-alhamoudi";

export default function AreaScene({ kind }: { kind: AreaKind }) {
  return <svg className="area-scene" viewBox="0 0 520 160" fill="none" stroke="var(--scene-line)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="426" cy="35" r="20" fill="var(--scene-accent)" stroke="none" opacity=".82" />
    <path d="M12 143c68-26 114-25 166-6 51 19 95 21 149-5 64-31 119-26 181-3" strokeWidth="1.2" opacity=".46" />
    {kind === "alwaqf" && <>
      <path d="M34 128V83l30-17 30 17v45M44 93h13v15H44m26-15h13v15H70M29 128h74" fill="var(--scene-fill)" />
      <path d="M117 128V59l29-16 29 16v69M128 73h12v16h-12m24-16h12v16h-12m-30 39h60" fill="var(--scene-fill)" />
      <path d="M195 128V43l35-20 35 20v85M208 59h13v16h-13m30-16h13v16h-13m-30 13h13v16h-13m30-16h13v16h-13" fill="var(--scene-fill)" />
      <path d="M284 128V72l31-18 31 18v56M297 85h11v14h-11m25-14h11v14h-11M365 128V91l25-14 25 14v37" fill="var(--scene-fill)" />
      <path d="M11 129h486M269 128h15m64 0h17m55 0h74" stroke="var(--scene-accent)" opacity=".88" />
      <path d="M110 143c28-13 53-14 79-3s55 14 86 0c25-12 51-13 77-4" stroke="var(--scene-water)" strokeWidth="5" opacity=".72" />
    </>}
    {kind === "almarashda" && <>
      <path d="M15 126c59-23 115-23 164-5s93 20 143 2c55-20 107-19 184 4" fill="var(--scene-fill)" />
      <path d="M47 111V78l31-19 31 19v33M57 84h11v14H57m27-14h11v14H84m-42 13h73M138 112V69l30-18 30 18v43m-50-30h11v15h-11m24-15h11v15h-11m-39 15h70" fill="var(--scene-fill)" />
      <path d="M231 116V88l25-15 25 15v28m-41-18h10v12h-10m19-12h10v12h-10m-43 6h69" fill="var(--scene-fill)" />
      <path d="M344 120V45m0 9c-14-19-28-20-44-11m44 11c5-20 20-28 38-25m-38 25c21-10 36-7 44 6m-44-6c-16-4-28 4-34 17" strokeWidth="3" />
      <path d="M441 126V63m0 7c-10-14-21-16-33-9m33 9c4-15 15-21 29-19m-29 19c15-7 27-4 33 5" strokeWidth="2.5" />
      <path d="M22 140c59-18 114-16 166 2m29 2c84-24 141-23 215 1" stroke="var(--scene-accent)" strokeWidth="1.6" opacity=".7" />
    </>}
    {kind === "alqalamina" && <>
      <path d="M16 118c82-25 144-17 205 8 73 30 159 20 284-8" fill="var(--scene-fill)" />
      <path d="M27 143c73-25 133-22 194 0m40 4c91-29 172-23 244-2M34 129c82-22 142-19 195 1" stroke="var(--scene-accent)" strokeWidth="1.6" opacity=".72" />
      <path d="M85 116V78l30-19 30 19v38m-50-28h11v14H95m24-14h11v14h-11m-40 14h72" fill="var(--scene-fill)" />
      <path d="M164 118V87l27-16 27 16v31m-43-21h10v13h-10m19-13h10v13h-10m-35 8h64" fill="var(--scene-fill)" />
      <path d="M261 124V65l35-21 35 21v59M273 76h13v16h-13m31-16h13v16h-13m-48 32h80" fill="var(--scene-fill)" />
      <path d="M379 121V55m0 8c-11-18-25-21-42-14m42 14c6-18 18-24 34-22m-34 22c20-8 32-6 41 6" strokeWidth="3" />
      <path d="M453 122V82m0 7c-8-11-17-13-26-7m26 7c4-12 14-16 25-14" strokeWidth="2.5" />
    </>}
    {kind === "jazirat-alhamoudi" && <>
      <path d="M6 121c53-16 103-14 151 2 56 18 115 18 171 0 57-18 119-19 186-4M6 136c61-16 112-13 160 3 54 17 108 16 162-2 61-19 121-19 186-4" stroke="var(--scene-water)" strokeWidth="4" opacity=".75" />
      <path d="M102 113c42-27 91-37 145-29 58 9 106 31 161 22 27-4 51-12 75-16-20 21-49 33-83 37-54 8-106-15-154-21-52-7-94 4-144 7Z" fill="var(--scene-fill)" />
      <path d="M176 98V72l23-14 23 14v27m-38-18h9v11h-9m17-11h9v11h-9M251 104V67l26-15 26 15v38m-42-28h10v13h-10m18-13h10v13h-10" fill="var(--scene-fill)" />
      <path d="M344 109V49m0 8c-11-15-23-18-37-11m37 11c4-16 16-22 31-20m-31 20c17-8 30-6 38 5M126 109V78m0 7c-8-11-17-13-27-7m27 7c3-12 13-16 24-14" strokeWidth="2.8" />
      <circle cx="445" cy="75" r="3" fill="var(--scene-accent)" stroke="none" /><path d="M427 75h-16m33 10-12 8" strokeWidth="1.4" opacity=".7" />
    </>}
  </svg>;
}
