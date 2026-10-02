const palettes = [
  ["#d2bb82", "#a8cfb1", "#f3dba7"],
  ["#c9ad83", "#b5d6c4", "#eac895"],
  ["#dfbd91", "#a8cdbd", "#f1d29d"],
  ["#c8b987", "#b9d7ba", "#f4d9a5"],
  ["#d9b490", "#a7d0c8", "#efcc9c"],
  ["#d3bf8a", "#a8c9b7", "#f3daa8"],
  ["#d6ad83", "#b5d3b8", "#f0d29b"],
  ["#c7b58b", "#a6cfc2", "#e9ce9e"],
  ["#d0b888", "#bad4aa", "#f4d6a0"],
  ["#d5b08b", "#a6c9b9", "#f1d1a1"],
] as const;

function House({ x, y, height, roof, accent }: { x: number; y: number; height: number; roof: string; accent: boolean }) {
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M0 ${19 - height} 23 ${5 - height} 48 ${19 - height} 25 ${33 - height}Z`} fill={roof} stroke="#e8e6c7" strokeWidth="1.5" />
    <path d={`M0 ${19 - height} 25 ${33 - height}V32L0 18Z`} fill={accent ? "#b38353" : "#789b82"} stroke="#d7e3ca" strokeWidth="1.2" />
    <path d={`M25 ${33 - height} 48 ${19 - height}V18L25 32Z`} fill={accent ? "#e2b86f" : "#c1d5ad"} stroke="#e7ead2" strokeWidth="1.2" />
    <path d="M31 29V15l9-5v14M6 9V-2l8 4v13" fill="none" stroke="#345d4b" strokeWidth="1.5" opacity=".65" />
    <path d="M18 32v-15l-9-5v15" fill="none" stroke="#dce8d2" strokeWidth="1.3" opacity=".8" />
  </g>;
}

export default function NeighborhoodScene({ index }: { index: number }) {
  const [roof, foliage, sun] = palettes[index % palettes.length];
  const houses = Array.from({ length: 7 }, (_, place) => ({
    x: 31 + place * 68 + ((index * 13 + place * 17) % 22),
    y: 209 + ((index * 11 + place * 13) % 4) * 10,
    height: 36 + ((index * 19 + place * 7) % 4) * 10,
  }));
  const trees = Array.from({ length: 6 }, (_, place) => ({
    x: 32 + place * 87 + ((index * 23 + place * 11) % 20),
    y: 295 + ((index * 13 + place * 17) % 3) * 8,
    size: 8 + ((index + place) % 3) * 2,
  }));

  return <svg className="neighborhood-scene" viewBox="0 0 560 370" fill="none" aria-hidden="true">
    <circle cx={410 - (index % 4) * 34} cy={83 + (index % 3) * 13} r="31" fill={sun} opacity=".9" />
    <path d="M16 257c105-65 185-48 280-20s163-9 249-42M3 285c113-72 202-53 290-21s174-9 257-47" stroke="#e3e9cf" strokeWidth="1.3" opacity=".28" />
    <path d="M14 316c92-23 164-30 235-9 85 26 172 9 297-26" stroke={foliage} strokeWidth="21" strokeLinecap="round" opacity=".15" />
    <path d={`M10 ${285 + index % 4 * 5}C115 230 154 269 244 275S390 230 550 267`} stroke="#d9c18c" strokeWidth="10" strokeLinecap="round" opacity=".52" />
    <path d={`M10 ${285 + index % 4 * 5}C115 230 154 269 244 275S390 230 550 267`} stroke="#f3e5be" strokeWidth="1.3" strokeDasharray="5 9" opacity=".7" />
    {houses.map((house, place) => <House key={place} {...house} roof={roof} accent={place === (index * 3 + 2) % 7} />)}
    {trees.map((tree, place) => <g key={place} transform={`translate(${tree.x} ${tree.y})`}>
      <path d="M0 8V-6" stroke="#d1c895" strokeWidth="2" />
      <circle cy="-10" r={tree.size} fill={foliage} opacity=".8" />
      <circle cx="-4" cy="-12" r={tree.size / 2} fill="#dce7c0" opacity=".7" />
    </g>)}
    <path d="M15 331c111-17 174-7 257 11 86 19 163 6 273-20" stroke="#b8d4ba" strokeWidth="2" opacity=".62" />
    <path d="M31 349h80m25 0h30m281-19h55" stroke="#e9d49e" strokeWidth="2" opacity=".62" />
  </svg>;
}
